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
        'TU_VI': { name: 'Tử Vi', color: 'text-purple-600', bg: 'bg-purple-50' },
        'THAN_SO_HOC': { name: 'Thần Số', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        'PHONG_THUY': { name: 'Phong Thủy', color: 'text-green-600', bg: 'bg-green-50' },
        'VAN_KHAN': { name: 'Văn Khấn', color: 'text-amber-600', bg: 'bg-amber-50' },
        'LE_TET': { name: 'Lễ Tết', color: 'text-red-600', bg: 'bg-red-50' }
    };
    return map[code] || { name: 'Tin Tức', color: 'text-blue-600', bg: 'bg-blue-50' };
};

export const renderHeroSection = () => {
    const allPosts = BlogService.getAllPosts();
    // 1. Kiểm tra dữ liệu đầu vào (Safe guard)
    if (!allPosts || !Array.isArray(allPosts) || allPosts.length === 0) return '';

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

    // Guard: Nếu vẫn không đủ bài
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
            <!-- Aspect-video giữ tỷ lệ 16:9, đây là cột quy định chiều cao cho cả hàng trên Desktop -->
            <div class="lg:col-span-6 group cursor-pointer h-full" onclick="app.viewPost('${mainPost.slug}')">
                <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-gray-100 h-full">
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
            <!-- Flex col + h-full để giãn đều theo chiều cao của Cột 1 -->
            <div class="lg:col-span-3 flex flex-col gap-5 h-full">
                
                <!-- Sub 1: flex-1 để chiếm 50% chiều cao -->
                <div class="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-gray-100 min-h-[160px]" onclick="app.viewPost('${subPost1.slug}')">
                    <img src="${subPost1.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${subPost1.title}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-5 w-full">
                         <span class="text-[10px] font-bold text-green-300 uppercase mb-1 block tracking-wide">${getCatMeta(subPost1.category).name}</span>
                         <h3 class="text-base font-bold text-white leading-snug group-hover:underline decoration-green-400 underline-offset-2 line-clamp-2 shadow-black drop-shadow-sm">
                            ${subPost1.title}
                         </h3>
                    </div>
                </div>

                <!-- Sub 2: flex-1 để chiếm 50% chiều cao -->
                <div class="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-gray-100 min-h-[160px]" onclick="app.viewPost('${subPost2.slug}')">
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

            <!-- CỘT 3: TIN MỚI NHẤT (Chiếm 3/12) -->
            <!-- h-full để bằng chiều cao Cột 1 -->
            <div class="lg:col-span-3 h-[400px] lg:h-full bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 class="font-black text-gray-800 uppercase text-xs tracking-wider flex items-center gap-2">
                        <span class="relative flex h-2 w-2">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Tin Mới Nhất
                    </h3>
                </div>
                
                <!-- List -->
                <div class="overflow-y-auto custom-scrollbar flex-1 p-0">
                    <div class="divide-y divide-dashed divide-gray-100">
                        ${sidebarPosts.map((post) => {
                            const meta = getCatMeta(post.category);
                            return `
                            <div class="p-4 hover:bg-gray-50 transition cursor-pointer group" onclick="app.viewPost('${post.slug}')">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-[10px] font-bold ${meta.color} bg-white px-2 py-0.5 rounded border border-gray-100 uppercase tracking-wide">
                                        ${meta.name}
                                    </span>
                                    <span class="text-[10px] text-gray-400 font-mono">${post.date.substring(0, 5)}</span>
                                </div>
                                <!-- TĂNG CỠ CHỮ Ở ĐÂY: text-sm font-bold -->
                                <h4 class="text-sm font-bold text-gray-800 leading-snug group-hover:text-green-600 transition-colors line-clamp-3">
                                    ${post.title}
                                </h4>
                            </div>
                        `}).join('')}
                    </div>
                </div>
                
                <div class="p-3 border-t border-gray-100 text-center bg-gray-50/30">
                     <button onclick="app.navigate('BLOG')" class="text-xs font-bold text-gray-500 uppercase hover:text-green-600 transition flex items-center justify-center gap-1 w-full">
                        Xem tất cả tin <span class="text-lg leading-none">›</span>
                     </button>
                </div>
            </div>

        </div>
    </div>
    `;
};