// pages/api/todos/add.js
import { todos } from "@/data/todos";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, title, description } = req.body;
    if (!todos[username]) {
      todos[username] = [];
    }

    const newTodo = {
      id: `${username}-${Date.now()}`,
      title,
      description,
      completed: false,
    };

    todos[username].push(newTodo);
    return res.status(201).json(newTodo);
  }

  res.status(405).json({ message: "Method not allowed" });
}
