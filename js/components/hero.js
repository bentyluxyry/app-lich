
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
        'TU_VI': { name: 'Tử Vi', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        'THAN_SO_HOC': { name: 'Thần Số', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        'PHONG_THUY': { name: 'Phong Thủy', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
        'VAN_KHAN': { name: 'Văn Khấn', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        'LE_TET': { name: 'Lễ Tết', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' }
    };
    return map[code] || { name: 'Tin Tức', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
};

/**
 * Render Hero Section
 * @param {string[]} filterCategories - Mảng các mã danh mục để lọc (VD: ['TU_VI', 'THAN_SO_HOC']). Nếu null thì lấy tất cả.
 * @param {string} sectionTitle - Tiêu đề hiển thị (VD: "Tin Mới Nhất" hoặc "Tiêu Điểm Tử Vi")
 */
export const renderHeroSection = (filterCategories = null, sectionTitle = "Tin Mới Nhất") => {
    let allPosts = BlogService.getAllPosts();
    
    // 1. Lọc theo danh mục nếu có yêu cầu (Cho các trang con)
    if (filterCategories && filterCategories.length > 0) {
        allPosts = allPosts.filter(p => filterCategories.includes(p.category));
    }

    // Guard: Nếu không có bài nào
    if (!allPosts || allPosts.length === 0) return '';

    // 2. Sắp xếp toàn bộ theo thời gian mới nhất trước
    const sortedPosts = [...allPosts].sort((a, b) => parseDate(b.date) - parseDate(a.date));

    // 3. Logic chọn 3 bài Hero (Ưu tiên Featured -> Mới nhất)
    let heroItems = sortedPosts.filter(p => p.featured === true);

    // Nếu thiếu, lấy bù bài thường
    if (heroItems.length < 3) {
        const others = sortedPosts.filter(p => p.featured !== true);
        const uniqueOthers = others.filter(o => !heroItems.find(h => h.id === o.id));
        heroItems = [...heroItems, ...uniqueOthers].slice(0, 3);
    } else {
        heroItems = heroItems.slice(0, 3);
    }

    // Guard: Nếu vẫn không đủ bài (ít nhất phải có 1 bài)
    if (heroItems.length < 1) return '';

    const mainPost = heroItems[0];
    const subPost1 = heroItems[1] || mainPost; 
    const subPost2 = heroItems[2] || subPost1;

    // 4. Lấy danh sách Sidebar (Loại trừ 3 bài Hero)
    const heroIds = heroItems.map(p => p.id);
    const sidebarPosts = sortedPosts.filter(p => !heroIds.includes(p.id)).slice(0, 6); // Lấy 6 bài cho vừa vặn

    return `
    <div class="mb-10 font-sans">
        <!-- 
           Sử dụng grid với items-stretch để đảm bảo các cột CÓ CÙNG CHIỀU CAO 
        -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            <!-- CỘT 1: BÀI CHÍNH (Chiếm 6/12) -->
            <div class="lg:col-span-6 group cursor-pointer h-full" onclick="app.viewPost('${mainPost.slug}')">
                <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 h-full">
                    <img src="${mainPost.image}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="${mainPost.title}">
                    
                    <!-- Overlay Gradient -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    <!-- Nội dung -->
                    <div class="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                        <div class="flex items-center gap-2 mb-3">
                             <span class="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider">Nổi bật</span>
                             <span class="text-gray-300 text-xs font-medium pl-2 border-l border-gray-500">${mainPost.date}</span>
                        </div>
                        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 group-hover:text-green-300 transition-colors drop-shadow-md pr-4">
                            ${mainPost.title}
                        </h2>
                        <p class="text-gray-200 text-sm md:text-base line-clamp-2 hidden md:block opacity-90 max-w-xl font-medium">
                            ${mainPost.excerpt}
                        </p>
                    </div>
                </div>
            </div>

            <!-- CỘT 2: 2 BÀI PHỤ (Chiếm 3/12) -->
            <div class="lg:col-span-3 flex flex-col gap-5 h-full">
                
                <!-- Sub 1 -->
                <div class="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-gray-100 dark:border-gray-700 min-h-[160px]" onclick="app.viewPost('${subPost1.slug}')">
                    <img src="${subPost1.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${subPost1.title}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-5 w-full">
                         <span class="text-[10px] font-bold text-green-300 uppercase mb-1 block tracking-wide">${getCatMeta(subPost1.category).name}</span>
                         <h3 class="text-base font-bold text-white leading-snug group-hover:underline decoration-green-400 underline-offset-2 line-clamp-2 shadow-black drop-shadow-sm">
                            ${subPost1.title}
                         </h3>
                    </div>
                </div>

                <!-- Sub 2 -->
                <div class="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-gray-100 dark:border-gray-700 min-h-[160px]" onclick="app.viewPost('${subPost2.slug}')">
                    <img src="${subPost2.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${subPost2.title}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-5 w-full">
                         <span class="text-[10px] font-bold text-green-300 uppercase mb-1 block tracking-wide">${getCatMeta(subPost2.category).name}</span>
                         <h3 class="text-base font-bold text-white leading-snug group-hover:underline decoration-green-400 underline-offset-2 line-clamp-2 shadow-black drop-shadow-sm">
                            ${subPost2.title}
                         </h3>
                    </div>
                </div>

            </div>

            <!-- CỘT 3: DANH SÁCH (Chiếm 3/12) -->
            <div class="lg:col-span-3 h-[400px] lg:h-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors">
                <div class="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-700/30">
                    <h3 class="font-black text-gray-800 dark:text-white uppercase text-xs tracking-wider flex items-center gap-2">
                        <span class="relative flex h-2 w-2">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        ${sectionTitle}
                    </h3>
                </div>
                
                <!-- List -->
                <div class="overflow-y-auto custom-scrollbar flex-1 p-0">
                    <div class="divide-y divide-dashed divide-gray-100 dark:divide-gray-700">
                        ${sidebarPosts.map((post) => {
                            const meta = getCatMeta(post.category);
                            return `
                            <div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer group" onclick="app.viewPost('${post.slug}')">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-[10px] font-bold ${meta.color} bg-white dark:bg-gray-900 dark:border-gray-600 px-2 py-0.5 rounded border border-gray-100 uppercase tracking-wide">
                                        ${meta.name}
                                    </span>
                                    <span class="text-[10px] text-gray-400 dark:text-gray-500 font-mono">${post.date.substring(0, 5)}</span>
                                </div>
                                <h4 class="text-sm font-bold text-gray-800 dark:text-gray-200 leading-snug group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-3">
                                    ${post.title}
                                </h4>
                            </div>
                        `}).join('')}
                    </div>
                </div>
            </div>

        </div>
    </div>
    `;
};
