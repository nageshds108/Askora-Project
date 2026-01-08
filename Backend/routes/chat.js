import express from "express";
import Thread from "../Models/Thread.js";
import APIResponse from "../utils/OpenRouterRES.js";
import getOpenAIAPIResponse  from "../utils/openAPI.js";



const router = express.Router();


router.post("/thread", async (req, res) => {
 try{
    const thread = new Thread({
        title: "XYZ",
        threadId: "XYZ"
 });
    const response=await thread.save();
    res.send(response);
} catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ error: "Internal server error" });
 }});


router.get("/threads", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        res.json(threads);
    } catch (error) {
        console.error("Error fetching Chats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        let thread = await Thread.findOne({ threadId });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json(thread);
    } catch (error) {
        console.error("Error fetching Chat:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const result = await Thread.findOneAndDelete({ threadId });
        if (!result) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        console.error("Error deleting Chat:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/chat", async (req, res) => {
    let { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: "threadId and message are required" });
    }

    try {
        let thread = await Thread.findOne({ threadId });
        if (!thread) {
            thread= new Thread({
                 threadId,
                  title: message,
                  messages: [{role: "user",content: message}]
             });
        }else{
            thread.messages.push({ role: "user", content: message });
        }

        const reply = await APIResponse(message)
        thread.messages.push({ role: "assistant", content: reply });
        thread.updatedAt = new Date();

        await thread.save();
        res.json({ reply: reply });
    } catch (error) {
        console.error("Error processing chat:", error);
        res.status(500).json({ error: "Internal server error" });
    }});



 export default router;