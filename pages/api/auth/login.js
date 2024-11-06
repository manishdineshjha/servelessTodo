import { users } from "@/data/users"

export default function handler(req,res){
    if(req.method==="POST"){
        const {username,password} =req.body;

        const user= users[username];
        if(user && user.password===password){
            return res.status(200).json({message:"Login Done",username})
        }
        return res.status(401).json({message:"unauthorized"})
    }
    res.status(405).json({message:"Method not allowed"})
}