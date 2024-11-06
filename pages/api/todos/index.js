import { todos } from "@/data/todos";

export default function handler(req, res) {
    const { username } = req.query;
  
    if (req.method === 'GET') {
      return res.status(200).json(todos[username] || []);
    }
    res.status(405).json({ message: "Method not allowed" });
  }
