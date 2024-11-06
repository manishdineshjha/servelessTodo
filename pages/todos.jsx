import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const router = useRouter();
  const username =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;

  useEffect(() => {
    if (!username) {
      router.push("/login");
      return;
    }
    const fetchTodos = async () => {
      const res = await fetch(`/api/todos?username=${username}`);
      setTodos(await res.json());
    };
    fetchTodos();
  }, [username]);

  const addOrUpdateTodo = async () => {
    if (editingTodo) {
      const res = await fetch("/api/todos/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          id: editingTodo.id,
          title,
          description,
          completed: editingTodo.completed,
        }),
      });
      const updatedTodo = await res.json();
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      setEditingTodo(null);
    } else {
      const res = await fetch("/api/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, title, description }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
    }
    setTitle("");
    setDescription("");
  };

  const toggleComplete = async (id, completed) => {
    const res = await fetch("/api/todos/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, id, completed: !completed }),
    });
    const updatedTodo = await res.json();
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id) => {
    await fetch("/api/todos/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, id }),
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">My Todos</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Logout
      </button>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addOrUpdateTodo();
          }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            {editingTodo ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      </div>

      <ul className="w-full max-w-lg">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`p-4 mb-2 rounded shadow-md ${
              todo.completed ? "bg-green-200" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3
                  className={`text-xl font-semibold ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                <p className="text-gray-700">{todo.description}</p>
              </div>
              {!todo.completed ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleComplete(todo.id, todo.completed)}
                    className="text-green-500"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => startEditing(todo)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <span className="text-green-700 font-semibold">
                  Completed Task
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
