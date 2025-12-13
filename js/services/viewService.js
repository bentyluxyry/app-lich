
// Service quản lý lượt xem (Self-hosted Logic)
// Chế độ: Đếm thực tế (Local Storage) - Không dùng view ảo.

const STORAGE_KEY = 'BLOG_VIEW_TRACKING';

export const ViewService = {
    /**
     * Lấy lượt xem (Đồng bộ, trả về kết quả ngay lập tức)
     * @param {number|string} postId 
     * @returns {string} Số lượt xem đã format
     */
    getViews: (postId) => {
        const id = parseInt(postId);
        if (isNaN(id)) return '0';

        // 1. View nền (Base View): Đặt bằng 0 theo yêu cầu
        // Trước đây dòng này dùng công thức random để tạo view ảo.
        const baseViews = 0; 

        // 2. Lấy số lần người dùng hiện tại đã xem (Lưu LocalStorage)
        const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const userViews = storage[id] || 0;

        // 3. Tổng hợp
        const total = baseViews + userViews;
        return ViewService.formatViews(total);
    },

    /**
     * Tăng lượt xem (Lưu vào LocalStorage)
     */
    incrementView: (postId) => {
        const id = parseInt(postId);
        if (isNaN(id)) return;

        const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const current = storage[id] || 0;
        
        storage[id] = current + 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    },

    /**
     * Format số: 1500 -> 1.5k
     */
    formatViews: (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
};
