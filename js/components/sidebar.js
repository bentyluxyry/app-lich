
import { BlogService } from '../service.js';
import { getDayInfo } from '../calendar.js';

// --- CÁC WIDGET DÙNG CHUNG ---

const widgetQuote = () => `
    <div class="glass-card rounded-xl p-6 relative overflow-hidden shadow-sm mb-6 group transition-all duration-300 hover:shadow-lg">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/10 dark:to-orange-900/10 z-0 transition-opacity group-hover:opacity-100"></div>
        <div class="relative z-10">
            <h4 class="text-yellow-800 dark:text-yellow-500 font-bold uppercase text-xs tracking-wider mb-3 flex items-center gap-2">
               <span class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
               Lời hay ý đẹp
            </h4>
            <p class="text-gray-800 dark:text-gray-200 font-serif italic leading-relaxed">
              "Hạnh phúc không phải là đích đến, mà là hành trình chúng ta đang đi."
            </p>
        </div>
         <div class="absolute -bottom-4 -right-4 text-yellow-500/10 dark:text-yellow-500/10 z-0 transform group-hover:scale-110 transition-transform duration-500">
           <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.55228 16 10 15.5523 10 15V9C10 8.44772 9.55228 8 9 8H5C4.44772 8 4 8.44772 4 9V18C4 19.6569 5.34315 21 7 21H14.017ZM21 21L21 18C21 16.8954 20.1046 16 19 16H15.983C16.5353 16 16.983 15.5523 16.983 15V9C16.983 8.44772 16.5353 8 15.983 8H12.017C11.4647 8 11.017 8.44772 11.017 9V18C11.017 19.6569 12.3601 21 14.017 21H21Z" /></svg>
        </div>
    </div>
`;

const widgetMiniCalendar = () => {
    const today = new Date();
    const info = getDayInfo(today);
    
    return `
    <div class="glass-card rounded-xl overflow-hidden shadow-md mb-6 border border-green-200 dark:border-green-800">
        <div class="bg-gradient-to-r from-green-600 to-teal-600 p-3 flex justify-between items-center text-white">
            <span class="font-bold text-sm uppercase tracking-wide">Hôm nay</span>
            <span class="text-xs opacity-90">${info.lunar.yearName}</span>
        </div>
        <div class="p-4 flex items-center justify-between bg-white dark:bg-gray-800">
            <!-- Dương Lịch -->
            <div class="text-center w-1/2 border-r border-gray-100 dark:border-gray-700 pr-2">
                <div class="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Dương Lịch</div>
                <div class="text-4xl font-bold text-green-600 dark:text-green-400 font-serif leading-none mb-1">${info.gregorian.getDate()}</div>
                <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Tháng ${info.gregorian.getMonth() + 1}</div>
            </div>
            
            <!-- Âm Lịch -->
            <div class="text-center w-1/2 pl-2">
                <div class="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Âm Lịch</div>
                <div class="text-4xl font-bold text-yellow-600 dark:text-yellow-500 font-serif leading-none mb-1">${info.lunar.day}</div>
                <div class="text-sm font-medium text-gray-600 dark:text-gray-300">Tháng ${info.lunar.month}</div>
            </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900/50 p-2 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
            Ngày ${info.lunar.dayName}
        </div>
    </div>
    `;
};

const widgetServices = () => `
    <div class="glass-card p-4 rounded-xl shadow-sm mb-6 transition-all duration-300 hover:shadow-md">
        <div class="flex items-center gap-2 mb-4 border-l-4 border-green-600 pl-3">
           <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase tracking-tight">Dịch vụ nổi bật</h3>
        </div>
        <div class="space-y-3">
            <div onclick="app.navigate('KNOWLEDGE')" class="flex items-center gap-3 p-2 rounded-lg cursor-pointer group hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all">
                <div class="w-10 h-10 bg-green-100/50 dark:bg-green-900/30 rounded-lg flex-shrink-0 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">💍</div>
                <div class="flex-1">
                    <h4 class="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">Xem ngày cưới hỏi</h4>
                </div>
            </div>
            <div onclick="app.navigate('KNOWLEDGE')" class="flex items-center gap-3 p-2 rounded-lg cursor-pointer group hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all">
                <div class="w-10 h-10 bg-green-100/50 dark:bg-green-900/30 rounded-lg flex-shrink-0 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🏠</div>
                <div class="flex-1">
                    <h4 class="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">Xem ngày làm nhà</h4>
                </div>
            </div>
            <div onclick="app.navigate('KNOWLEDGE')" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700/50 text-center cursor-pointer group">
                 <span class="text-green-600 dark:text-green-400 font-bold text-xs group-hover:underline inline-flex items-center gap-1">
                    Xem tất cả dịch vụ <span class="group-hover:translate-x-1 transition-transform">→</span>
                 </span>
            </div>
        </div>
    </div>
`;

const widgetCountdown = () => `
    <div onclick="app.viewPost(11)" class="glass-card bg-gradient-to-br from-red-600 to-red-800 dark:from-red-800 dark:to-red-900 rounded-xl shadow-lg p-4 text-white relative overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group mb-6 border border-red-500/30">
         <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         
         <!-- HOA MAI & HOA ĐÀO DECORATION -->
         <div class="absolute -top-2 -right-2 z-0 opacity-90 pointer-events-none flex flex-col items-end">
            <div class="text-3xl animate-sway origin-top-right flower-mai drop-shadow-md">🌼</div>
            <div class="text-xl animate-sway animation-delay-500 mr-4 -mt-2 flower-dao drop-shadow-md">🌸</div>
            <div class="text-lg animate-sway animation-delay-1000 flower-mai drop-shadow-md">🌼</div>
         </div>
         <div class="absolute bottom-1 left-2 z-0 opacity-80 pointer-events-none">
             <div class="text-2xl animate-sway animation-delay-500 flower-dao drop-shadow-md">🌸</div>
         </div>

         <div class="relative z-10 flex items-center gap-4">
            <div class="bg-yellow-400/20 p-3 rounded-lg backdrop-blur-md group-hover:scale-110 transition-transform shadow-inner border border-yellow-400/30">
               <span class="text-2xl animate-pulse">🧧</span>
            </div>
            <div>
               <div class="text-yellow-200 text-xs uppercase font-bold mb-1 opacity-90 tracking-wide">Sắp đến Tết</div>
               <div class="font-bold text-lg text-white drop-shadow-md font-serif">Bính Ngọ 2026</div>
               <div class="text-red-100 text-xs font-medium mt-1 group-hover:text-white transition-colors">
                  Còn <span id="widget-countdown-days" class="font-bold text-yellow-300 text-xl mx-1">--</span> ngày
               </div>
            </div>
         </div>
    </div>
`;

// --- HÀM RENDER RIÊNG CHO TỪNG LOẠI SIDEBAR ---

export const renderHomeSidebar = () => {
    return `
        <div class="animate-fade-in font-sans space-y-6">
            ${widgetServices()}
            ${widgetQuote()}
            ${widgetCountdown()}
        </div>
    `;
};

export const renderTuViSidebar = () => {
    const posts = BlogService.getPostsByCategory('TU_VI').slice(0, 5);
    
    const postListHTML = posts.length ? `
        <ul class="space-y-3">
            ${posts.map(p => `
                <li onclick="app.viewPost('${p.slug}')" class="flex gap-3 cursor-pointer group p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all">
                     <div class="w-16 h-12 flex-shrink-0 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">🔮</div>
                     <div class="flex-1">
                        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-2 transition-colors">${p.title}</h4>
                     </div>
                </li>
            `).join('')}
        </ul>
    ` : '<p class="text-sm text-gray-500 italic">Đang cập nhật...</p>';

    return `
        <div class="animate-fade-in font-sans space-y-6">
            <div class="glass-card p-4 rounded-xl shadow-sm border-l-4 border-l-purple-500">
                <div class="flex items-center gap-2 mb-4">
                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase tracking-tight">Tử Vi Nổi Bật</h3>
                </div>
                ${postListHTML}
            </div>
            
            ${widgetQuote()}
        </div>
    `;
};

export const renderPhongThuySidebar = () => {
    const posts = BlogService.getPostsByCategory('PHONG_THUY').slice(0, 5);

    const postListHTML = posts.length ? `
        <ul class="space-y-3">
            ${posts.map(p => {
                // FIX: Sử dụng resolveImagePath cho sidebar
                const imgPath = BlogService.resolveImagePath(p.image);
                return `
                <li onclick="app.viewPost('${p.slug}')" class="flex gap-3 cursor-pointer group p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
                     <div class="w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                        <img src="${imgPath}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                     </div>
                     <div class="flex-1">
                        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 line-clamp-2 transition-colors">${p.title}</h4>
                     </div>
                </li>
            `}).join('')}
        </ul>
    ` : '<p class="text-sm text-gray-500 italic">Đang cập nhật...</p>';

    return `
        <div class="animate-fade-in font-sans space-y-6">
             <div class="glass-card p-4 rounded-xl shadow-sm border-l-4 border-l-green-500">
                <div class="flex items-center gap-2 mb-4">
                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase tracking-tight">Kiến thức Phong Thủy</h3>
                </div>
                ${postListHTML}
            </div>

            <div class="glass-card bg-green-50/50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200/50 dark:border-green-800/30 relative overflow-hidden">
                <div class="absolute top-0 right-0 text-green-500/10 text-6xl font-serif">❝</div>
                <h4 class="font-bold text-green-800 dark:text-green-400 mb-2 relative z-10">Mẹo nhỏ</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 italic relative z-10">"Để hút tài lộc, hãy giữ cho lối vào nhà luôn sạch sẽ, thoáng đãng và có đủ ánh sáng."</p>
            </div>
        </div>
    `;
};

export const renderNumerologySidebar = () => {
    const posts = BlogService.getPostsByCategory('THAN_SO_HOC');
    
    // Tự động render list bài viết Thần số học từ DB (Bao gồm cả bài số 1 mới thêm)
    const content = posts.length > 0 ? posts.map(p => `
        <li onclick="app.viewPost('${p.slug}')" class="group cursor-pointer">
            <div class="flex items-start gap-3 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all">
                <span class="text-xl group-hover:scale-110 transition-transform">🔢</span>
                <div>
                    <h4 class="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${p.title}</h4>
                </div>
            </div>
        </li>
    `).join('') : `
        <li class="text-sm text-gray-500 italic p-2">Đang cập nhật bài viết về các con số...</li>
    `;

    return `
        <div class="animate-fade-in font-sans">
             <div class="glass-card p-5 rounded-xl shadow-sm border-l-4 border-l-indigo-500">
                <div class="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-gray-700/50 pb-2">
                    <span class="text-2xl animate-bounce">📚</span>
                    <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">Khám phá các con số</h3>
                </div>
                <ul class="space-y-1">
                    ${content}
                </ul>
            </div>
        </div>
    `;
};

export const renderPostSidebar = (relatedPosts = []) => {
    if (!relatedPosts || relatedPosts.length === 0) return renderHomeSidebar();

    return `
        <div class="animate-fade-in font-sans space-y-6">
            <div class="glass-card p-4 rounded-xl shadow-sm">
                <div class="flex items-center gap-2 mb-4 border-l-4 border-green-600 pl-3">
                   <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase tracking-tight">Bài viết liên quan</h3>
                </div>
                <div class="space-y-4">
                    ${relatedPosts.map(p => {
                        // FIX: Sử dụng resolveImagePath cho sidebar bài viết liên quan
                        const imgPath = BlogService.resolveImagePath(p.image);
                        return `
                        <div class="flex gap-3 group cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all" onclick="app.viewPost('${p.slug}')">
                            <div class="w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden relative shadow-sm">
                                <img src="${imgPath}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                            </div>
                            <div class="flex-1">
                                <h4 class="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 line-clamp-2 leading-snug transition-colors">${p.title}</h4>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
            
            ${widgetQuote()}
            ${widgetMiniCalendar()}
        </div>
    `;
};
