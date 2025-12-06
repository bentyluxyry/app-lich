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
    
    // Lấy bài viết liên quan
    getRelatedPosts: (currentId) => {
        const current = posts.find(p => p.id === currentId);
        if (!current) return posts.slice(0, 5);
        
        let related = posts.filter(p => p.category === current.category && p.id !== currentId);
        if (related.length < 5) {
            const others = posts.filter(p => p.category !== current.category && p.id !== currentId);
            related = [...related, ...others];
        }
        return related.slice(0, 5);
    },

    getSiteContext: () => {
        // Context cho AI
        return `Danh sách các bài viết hiện có: ${posts.map(p => p.title).join(', ')}.`;
    }
};