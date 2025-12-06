
// Service quản lý lượt xem THẬT (Sử dụng CountAPI)
// Dữ liệu được lưu trên server của CountAPI, đồng bộ giữa mọi người dùng.

// Namespace duy nhất cho ứng dụng của bạn (đừng thay đổi chuỗi này để giữ dữ liệu)
const NAMESPACE = 'lich-van-nien-ai-2025-prod';
const BASE_URL = 'https://api.countapi.xyz';

export const ViewService = {
    /**
     * Lấy lượt xem của bài viết từ Server
     * @param {number|string} postId 
     * @returns {Promise<string>}
     */
    getViews: async (postId) => {
        try {
            // Gọi API lấy thông tin (action: get)
            const response = await fetch(`${BASE_URL}/get/${NAMESPACE}/post_${postId}`);
            const data = await response.json();
            return ViewService.formatViews(data.value || 0);
        } catch (error) {
            console.warn('Không lấy được lượt xem:', error);
            return '---'; // Trả về placeholder nếu lỗi
        }
    },

    /**
     * Tăng lượt xem cho bài viết (Gọi khi người dùng vào đọc)
     * @param {number|string} postId 
     */
    incrementView: async (postId) => {
        try {
            // Gọi API tăng lượt xem (action: hit)
            // 'hit' sẽ tự động tăng giá trị lên 1 và trả về giá trị mới
            await fetch(`${BASE_URL}/hit/${NAMESPACE}/post_${postId}`);
        } catch (error) {
            console.warn('Lỗi tăng lượt xem:', error);
        }
    },

    /**
     * Format số view (VD: 1200 -> 1.2k)
     */
    formatViews: (num) => {
        if (!num) return '0';
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
};
