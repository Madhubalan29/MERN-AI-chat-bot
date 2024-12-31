import axios from 'axios';
export const generateResponse = async (messages) => {
    const url = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
    const response = await axios.post(url, { inputs: [{ content: "hello", role: "user" }] }, {
        headers: {
            'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`
        }
    });
    return response.data;
};
//# sourceMappingURL=hugfacebot.js.map