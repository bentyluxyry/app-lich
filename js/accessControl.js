
import { UserService } from './user.js';

export const AccessControl = {
    /**
     * Kiểm tra xem User có được xem bài viết này không
     * @param {Object} post - Đối tượng bài viết
     * @returns {boolean}
     */
    canViewPost: (post) => {
        // 1. Nếu bài viết không phải Premium -> Ai cũng xem được
        if (!post.isPremium) return true;

        // 2. Nếu là bài Premium -> Phải đăng nhập mới xem được
        const user = UserService.getCurrentUser();
        return !!user;
    },

    /**
     * Trả về HTML hiển thị khi nội dung bị khóa
     */
    getLockScreenHTML: (post) => {
        return `
            <div class="relative w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden p-8 text-center my-8">
                <!-- Hiệu ứng mờ nền (giả lập văn bản bị che) -->
                <div class="absolute inset-0 select-none opacity-10 pointer-events-none overflow-hidden text-left p-4 text-sm text-gray-800 dark:text-gray-400" style="filter: blur(4px);">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                    <p>Nội dung này dành riêng cho thành viên đăng ký. Vui lòng đăng nhập để xem chi tiết tử vi và các thông tin quan trọng khác.</p>
                </div>

                <div class="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
                    <div class="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-3xl mb-2 shadow-sm">
                        🔒
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white">Nội dung dành cho thành viên</h3>
                    <p class="text-gray-600 dark:text-gray-300 max-w-md mx-auto">Bài viết <strong>"${post.title}"</strong> chứa thông tin chuyên sâu. Vui lòng đăng nhập để đọc tiếp hoàn toàn miễn phí.</p>
                    
                    <button onclick="app.toggleLogin()" class="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                        Đăng nhập để xem ngay
                    </button>
                    <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">Đăng nhập nhanh bằng Google hoặc Facebook</p>
                </div>
            </div>
        `;
    }
};
