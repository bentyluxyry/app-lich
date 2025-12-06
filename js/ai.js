import { GoogleGenAI } from "@google/genai";

let aiClient = null;

// Khởi tạo AI khi tải trang
export function initAI() {
    const key = localStorage.getItem('GEMINI_API_KEY') || window.process?.env?.API_KEY || '';
    if (key) {
        try {
            aiClient = new GoogleGenAI({ apiKey: key });
        } catch (e) {
            console.error("Lỗi khởi tạo AI:", e);
        }
    }
}

// Kiểm tra đã có Key chưa
export function hasApiKey() {
    return !!(localStorage.getItem('GEMINI_API_KEY') || (aiClient));
}

// Lưu Key mới
export function setApiKey(key) {
    if (!key) return false;
    try {
        localStorage.setItem('GEMINI_API_KEY', key);
        aiClient = new GoogleGenAI({ apiKey: key });
        alert("Đã lưu API Key thành công!");
        return true;
    } catch (e) {
        alert("API Key không hợp lệ");
        return false;
    }
}

// Hàm gọi AI chính
export async function generateContent(prompt, context = '') {
    if (!aiClient) {
        // Thử khởi tạo lại nếu localStorage có
        const key = localStorage.getItem('GEMINI_API_KEY');
        if(key) aiClient = new GoogleGenAI({ apiKey: key });
        else return "⚠️ Vui lòng nhập API Key để sử dụng tính năng này.";
    }

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${context}\n\nUser: ${prompt}`,
            config: {
                systemInstruction: "Bạn là trợ lý ảo của ứng dụng Lịch Vạn Niên. Hãy trả lời ngắn gọn, thân thiện, tập trung vào phong thủy, ngày giờ tốt xấu và văn hóa Việt Nam. Tránh trả lời dài dòng không cần thiết."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        if (error.message.includes('API key')) {
             return "⚠️ API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại.";
        }
        return "Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau.";
    }
}