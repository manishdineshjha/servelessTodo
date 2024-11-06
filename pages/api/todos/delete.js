import { todos } from "@/data/todos";
export default function handler(req, res) {
    if (req.method === 'DELETE') {
      const { username, id } = req.body;
      todos[username] = todos[username].filter(todo => todo.id !== id);
      res.status(200).json({ message: 'Todo deleted' });
    }
  }