import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/user.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    const apiKey = "AIzaSyA4mbW76Cjkr3InwEoMkHz01R4VPFZzfdw"; // Replace with your actual API key
    try {
        // Find user by ID and verify
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        // Prepare chat history for the Gemini API
        const chats = user.chats.map(({ role, content }) => ({
            role,
            parts: [{ text: content }], // Gemini API expects content wrapped in parts array
        }));
        // Add the new user message
        chats.push({ role: "user", parts: [{ text: message }] });
        user.chats.push({ content: message, role: "user" });
        console.log("Chat History before new message:", chats);
        // Initialize the Gemini API
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Specify the appropriate Gemini model
        // Start a chat session with the user's chat history
        const chatSession = model.startChat({
            generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            },
            history: chats,
        });
        // Send the new user message to the Gemini API
        const result = await chatSession.sendMessage(message);
        const responseContent = result.response.text(); // Get the generated assistant response
        // Save the assistant's response to the user's chat history
        user.chats.push({ content: responseContent, role: "model" });
        await user.save();
        // Return the updated chat history
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("Signup first asshole");
        }
        return res.status(201).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deletechats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("Signup first asshole");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(201).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map