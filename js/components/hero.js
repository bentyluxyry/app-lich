
import { BlogService } from '../service.js';

// Helper: Chuyển đổi chuỗi ngày "dd/mm/yyyy" thành đối tượng Date
const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    try {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        }
    } catch (e) { return new Date(0); }
    return new Date(0);
};

// Helper: Lấy tên danh mục ngắn gọn và màu sắc
const getCatMeta = (code) => {
    const map = {
        'TU_VI': { name: 'Tử Vi', color: 'bg-purple-600', text: 'text-purple-600' },
        'THAN_SO_HOC': { name: 'Thần Số', color: 'bg-indigo-600', text: 'text-indigo-600' },
        'PHONG_THUY': { name: 'Phong Thủy', color: 'bg-green-600', text: 'text-green-600' },
        'VAN_KHAN': { name: 'Văn Khấn', color: 'bg-amber-600', text: 'text-amber-600' },
        'LE_TET': { name: 'Lễ Tết', color: 'bg-red-600', text: 'text-red-600' }
    };
    return map[code] || { name: 'Tin Tức', color: 'bg-blue-600', text: 'text-blue-600' };
};

/**
 * Render Hero Section (Full Width Design)
 */
export const renderHeroSection = (filterCategories = null, sectionTitle = "Tin Mới Nhất") => {
    let allPosts = BlogService.getAllPosts();
    
    // 1. Lọc theo danh mục nếu có
    if (filterCategories && filterCategories.length > 0) {
        allPosts = allPosts.filter(p => filterCategories.includes(p.category));
    }

    if (!allPosts || allPosts.length === 0) return '';

    // 2. Sắp xếp: Ưu tiên Featured, sau đó đến Mới nhất
    const sortedPosts = [...allPosts].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return parseDate(b.date) - parseDate(a.date);
    });

    // Lấy 1 bài chính (Big Hero) và 3 bài phụ (Sub Hero)
    const mainPost = sortedPosts[0];
    const subPosts = sortedPosts.slice(1, 4); // Lấy bài 2, 3, 4

    // Xử lý ảnh bài chính (thêm ../ nếu cần)
    const mainImg = BlogService.resolveImagePath(mainPost.image);
    const mainCat = getCatMeta(mainPost.category);

    return `
    <div class="mb-12 font-sans animate-fade-in">
        <!-- 1. BIG HERO POST (FULL WIDTH) -->
        <div class="relative w-full h-[400px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden group cursor-pointer shadow-xl mb-6" onclick="app.viewPost('${mainPost.slug}')">
            <!-- Background Image -->
            <img src="${mainImg}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="${mainPost.title}">
            
            <!-- Gradient Overlay (Darken bottom) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <!-- Content -->
            <div class="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-12 flex flex-col justify-end">
                <div class="flex items-center gap-3 mb-3 animate-slide-up">
                    <span class="${mainCat.color} text-white text-xs font-bold px-3 py-1 rounded shadow-sm uppercase tracking-wider">
                        ${mainCat.name}
                    </span>
                    <span class="text-gray-300 text-xs font-medium flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        ${mainPost.date}
                    </span>
                </div>
                
                <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 group-hover:text-green-300 transition-colors drop-shadow-lg max-w-4xl animate-slide-up" style="animation-delay: 0.1s;">
                    ${mainPost.title}
                </h2>
                
                <p class="hidden md:block text-gray-200 text-base md:text-lg opacity-90 max-w-2xl line-clamp-2 animate-slide-up" style="animation-delay: 0.2s;">
                    ${mainPost.excerpt}
                </p>
            </div>
        </div>

        <!-- 2. SUB HERO POSTS (GRID 3) -->
        ${subPosts.length > 0 ? `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${subPosts.map((post, idx) => {
                const img = BlogService.resolveImagePath(post.image);
                const cat = getCatMeta(post.category);
                return `
                <div class="flex flex-col gap-3 group cursor-pointer" onclick="app.viewPost('${post.slug}')">
                    <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                        <img src="${img}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${post.title}">
                        <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        <div class="absolute top-2 left-2">
                             <span class="bg-white/90 dark:bg-black/80 backdrop-blur-sm ${cat.text} text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase">
                                ${cat.name}
                             </span>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-bold text-lg text-gray-800 dark:text-white leading-snug group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                            ${post.title}
                        </h3>
                        <div class="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span>${post.date}</span>
                        </div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
        ` : ''}
        
        <div class="mt-8 border-b border-gray-200 dark:border-gray-700"></div>
    </div>
    `;
};
