// pages/api/todos/update.js
import { todos } from "@/data/todos";

export default function handler(req, res) {
  if (req.method === "PUT") {
    const {
      username,
      id,
      title = null,
      description = null,
      completed,
    } = req.body;

    const userTodos = todos[username];
    if (!userTodos) {
      return res.status(404).json({ message: "User not found" });
    }

    const todoIndex = userTodos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    userTodos[todoIndex] = {
      ...userTodos[todoIndex],
      ...(title !== null && { title }),
      ...(description !== null && { description }),
      completed,
    };

    return res.status(200).json(userTodos[todoIndex]);
  }

  res.status(405).json({ message: "Method not allowed" });
}
