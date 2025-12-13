
// Dịch vụ quản lý User (Mô phỏng Authentication)

export const UserService = {
    // Kiểm tra xem user đã đăng nhập chưa (Lấy từ LocalStorage)
    getCurrentUser: () => {
        const userJson = localStorage.getItem('CURRENT_USER');
        return userJson ? JSON.parse(userJson) : null;
    },

    // Giả lập Đăng nhập/Đăng ký qua Google
    loginWithGoogle: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Đây là dữ liệu giả lập trả về từ Google
                const mockUser = {
                    id: 'google_123456',
                    name: 'Người dùng Google',
                    email: 'user@gmail.com',
                    avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c', // Ảnh mặc định Google
                    provider: 'Google'
                };
                localStorage.setItem('CURRENT_USER', JSON.stringify(mockUser));
                resolve(mockUser);
            }, 1500); // Giả vờ đợi 1.5s
        });
    },

    // Giả lập Đăng nhập qua Facebook
    loginWithFacebook: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Đây là dữ liệu giả lập trả về từ Facebook
                const mockUser = {
                    id: 'fb_987654',
                    name: 'Người dùng Facebook',
                    email: 'user@facebook.com',
                    avatar: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=123&height=100&width=100&ext=123', // Ảnh giả
                    provider: 'Facebook'
                };
                localStorage.setItem('CURRENT_USER', JSON.stringify(mockUser));
                resolve(mockUser);
            }, 1500);
        });
    },

    // Đăng xuất
    logout: () => {
        localStorage.removeItem('CURRENT_USER');
    }
};
