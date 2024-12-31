import axios from "axios";
const HF_API_URL = 'https://api-inference.huggingface.co/models/distilgpt2';
const HF_API_KEY = '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';
export const getChatResponse = async (messages) => {
    // Convert messages to a single prompt, alternating roles
    const prompt = messages[0].map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n') + '\nAssistant:';
    try {
        const response = await axios.post(HF_API_URL, { inputs: prompt }, { headers: { Authorization: `Bearer ${HF_API_KEY}` } });
        return response.data[0].generated_text; // Model's response as the assistant
    }
    catch (error) {
        console.error('Error fetching response from Hugging Face:', error.response ? error.response.data : error);
        return 'Error: Unable to fetch response.';
    }
};
//# sourceMappingURL=hfbot.js.map