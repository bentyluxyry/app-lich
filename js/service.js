
import { posts } from './db.js';

export const BlogService = {
    getAllPosts: () => posts,
    
    getPostById: (id) => posts.find(p => p.id === parseInt(id)),
    
    // Lấy bài viết theo Slug
    getPostBySlug: (slug) => posts.find(p => p.slug === slug),
    
    // Tìm kiếm
    searchPosts: (kw) => posts.filter(p => p.title.toLowerCase().includes(kw.toLowerCase())),
    
    // Lọc theo danh mục đơn
    getPostsByCategory: (cat) => posts.filter(p => p.category === cat),

    // NEW: Lọc theo danh sách nhiều danh mục (cho menu cha)
    getPostsByCategories: (categories) => posts.filter(p => categories.includes(p.category)),
    
    // Lấy bài viết liên quan (Strict Mode: Chỉ lấy cùng danh mục)
    getRelatedPosts: (currentId) => {
        const current = posts.find(p => p.id === currentId);
        if (!current) return [];
        
        // CHỈ LẤY BÀI CÙNG DANH MỤC
        const related = posts.filter(p => p.category === current.category && p.id !== currentId);
        
        return related.slice(0, 5);
    },

    getSiteContext: () => {
        return `Danh sách các bài viết hiện có: ${posts.map(p => p.title).join(', ')}.`;
    },

    // --- FIX PATH ẢNH CHO CLEAN URL ---
    // Hàm này kiểm tra nếu ảnh là link nội bộ (img/...) thì tự động thêm ../ nếu đang ở trang con
    resolveImagePath: (path) => {
        if (!path || typeof path !== 'string') return '';
        
        // Nếu là ảnh online (http) hoặc data base64 hoặc đã là tuyệt đối (/) thì giữ nguyên
        if (path.startsWith('http') || path.startsWith('/') || path.startsWith('data:')) return path;
        
        const segments = window.location.pathname.split('/').filter(s => s.length > 0);
        const isGitHubPages = window.location.pathname.includes('/app-lich');
        
        let depth = segments.length;
        if (isGitHubPages) depth -= 1; // Trừ đi folder tên repo
        
        // Nếu dùng query params (?view=...) thì đang ở root thực tế, depth = 0
        if (window.location.search.includes('view=')) depth = 0;

        if (depth > 0) {
            // Thêm ../ tương ứng với độ sâu của URL
            return '../'.repeat(depth) + path;
        }
        return path;
    }
};
