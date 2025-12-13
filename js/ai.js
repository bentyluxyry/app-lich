
import { GoogleGenAI } from "@google/genai";

let aiClient = null;

// Khởi tạo AI khi tải trang
export function initAI() {
    let key = null;

    // Ưu tiên 1: Lấy từ cấu hình code (Hardcoded / Dev Mode)
    // Cập nhật logic: Nếu key là chuỗi placeholder thì coi như chưa có
    if (typeof window.process !== 'undefined' && window.process.env && window.process.env.API_KEY) {
        const envKey = window.process.env.API_KEY;
        if (envKey && envKey !== "PASTE_YOUR_API_KEY_HERE" && envKey.length > 10) {
            key = envKey;
        }
    }

    // Ưu tiên 2: Lấy từ LocalStorage (Người dùng nhập thủ công)
    if (!key) {
        key = localStorage.getItem('GEMINI_API_KEY');
    }

    if (key) {
        try {
            aiClient = new GoogleGenAI({ apiKey: key });
            console.log("AI Client đã được khởi tạo thành công.");
        } catch (e) {
            console.error("Lỗi khởi tạo AI:", e);
        }
    } else {
        console.warn("Chưa có API Key hợp lệ. Tính năng AI sẽ bị hạn chế.");
    }
}

// Kiểm tra đã có Key chưa
export function hasApiKey() {
    return !!aiClient;
}

// Lưu Key mới (Dành cho trường hợp người dùng muốn override key hardcode)
export function setApiKey(key) {
    if (!key || key.length < 10) {
        alert("API Key không hợp lệ (quá ngắn).");
        return false;
    }
    try {
        localStorage.setItem('GEMINI_API_KEY', key);
        aiClient = new GoogleGenAI({ apiKey: key });
        // alert("Đã lưu API Key thành công!"); // Bỏ alert để trải nghiệm mượt hơn
        return true;
    } catch (e) {
        alert("Lỗi khi lưu API Key.");
        return false;
    }
}

// Hàm gọi AI chính
export async function generateContent(prompt, context = '') {
    if (!aiClient) {
        // Thử init lại lần cuối
        initAI();
        if(!aiClient) {
             return "⚠️ Chưa có API Key. Vui lòng nhập Key để sử dụng tính năng này.";
        }
    }

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${context}\n\nUser: ${prompt}`,
            config: {
                systemInstruction: "Bạn là trợ lý ảo của ứng dụng Lịch Vạn Niên. Hãy trả lời ngắn gọn, thân thiện, tập trung vào phong thủy, ngày giờ tốt xấu và văn hóa Việt Nam."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        // Trả về chuỗi đặc biệt để FE nhận biết lỗi Key
        if ((error.message && error.message.includes('API key')) || error.status === 403 || error.status === 400) {
             return "⚠️ API Key không hợp lệ hoặc đã hết hạn.";
        }
        return "Xin lỗi, hệ thống đang bận hoặc kết nối mạng không ổn định. Vui lòng thử lại sau.";
    }
}
