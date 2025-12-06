
// Service quản lý lượt xem (Giả lập database bằng LocalStorage)
// Mỗi bài viết sẽ có một lượng view ngẫu nhiên ban đầu để nhìn cho "xôm tụ"
// Khi người dùng bấm vào xem, view sẽ tăng thật và lưu lại.

const STORAGE_KEY = 'BLOG_VIEW_COUNTS';

// Tạo số view giả lập ban đầu dựa trên ID bài viết (để số view cố định không đổi mỗi lần F5)
const getBaseViews = (id) => {
    // Thuật toán giả lập: ID * 123 + hằng số
    // Ví dụ: ID 1 => 543 view, ID 2 => 890 view...
    const seed = id * 168 + 350; 
    return seed;
};

export const ViewService = {
    /**
     * Lấy lượt xem của bài viết
     * @param {number} postId 
     * @returns {string} Số lượt xem đã format (vd: 1.2k)
     */
    getViews: (postId) => {
        const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        
        // Lấy view thật từ storage, nếu chưa có thì dùng view giả lập
        let realViews = storedData[postId];
        
        if (!realViews) {
            realViews = getBaseViews(postId);
        }

        return ViewService.formatViews(realViews);
    },

    /**
     * Tăng lượt xem cho bài viết
     * @param {number} postId 
     */
    incrementView: (postId) => {
        const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        
        let currentViews = storedData[postId];
        if (!currentViews) {
            currentViews = getBaseViews(postId);
        }

        // Tăng 1 view
        storedData[postId] = currentViews + 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
    },

    /**
     * Format số view (VD: 1200 -> 1.2k)
     */
    formatViews: (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
};
