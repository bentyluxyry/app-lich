
// File này chỉ chứa các hàm Render giao diện cho Blog
export function renderBlogList(posts, title = "Kiến Thức Phong Thủy") {
    if (posts.length === 0) return `<div class="text-center py-10 text-gray-500">Chưa có bài viết nào trong mục này.</div>`;
    
    return `
        <div class="space-y-6">
            <div class="text-center py-6">
                <h1 class="text-3xl font-bold text-green-800">${title}</h1>
                <p class="text-gray-600 mt-2">Cập nhật những thông tin hữu ích mỗi ngày</p>
            </div>
            
            <!-- GRID LAYOUT: 3 cột -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${posts.map(post => `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group h-full">
                        <div class="h-48 overflow-hidden relative cursor-pointer" onclick="app.viewPost('${post.slug}')">
                            <img src="${post.image}" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                            <div class="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow">${post.date}</div>
                        </div>
                        <div class="p-5 flex-1 flex flex-col">
                            <div class="text-xs font-bold text-green-600 mb-1 uppercase tracking-wide">
                                ${post.category === 'TU_VI' ? 'Tử Vi' : post.category === 'THAN_SO_HOC' ? 'Thần Số Học' : 'Phong Thủy'}
                            </div>
                            <h3 onclick="app.viewPost('${post.slug}')" class="font-bold text-lg text-gray-800 mb-2 hover:text-green-600 cursor-pointer line-clamp-2 leading-tight">
                                ${post.title}
                            </h3>
                            <p class="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 text-justify">
                                ${post.excerpt}
                            </p>
                            <button onclick="app.viewPost('${post.slug}')" class="text-green-600 font-semibold text-sm hover:underline self-start flex items-center gap-1">
                                Xem chi tiết <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

export function renderBlogDetail(post) {
    // THAY ĐỔI QUAN TRỌNG:
    // 1. Sử dụng 'aspect-video' thay vì h-64/h-96 để giữ đúng tỷ lệ 16:9 của ảnh.
    // 2. Ảnh sẽ tự động co giãn theo chiều rộng của cột (col-span-8), tạo cảm giác xem như Youtube.
    return `
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in h-full">
             
             <!-- KHUNG ẢNH CHÍNH TỶ LỆ 16:9 -->
             <div class="w-full aspect-video relative group">
                 <img src="${post.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                 
                 <!-- Gradient overlay giúp chữ nổi bật hơn -->
                 <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                 
                 <!-- Nút quay lại -->
                 <button onclick="app.backToBlog()" class="absolute top-4 left-4 bg-black/30 hover:bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full transition flex items-center gap-2 text-sm font-bold z-20 border border-white/20">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Quay lại
                 </button>

                 <!-- Tiêu đề đè lên ảnh (Giao diện tạp chí/Youtube) -->
                 <div class="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10">
                     <div class="flex items-center gap-3 mb-3">
                        <span class="text-xs font-bold bg-green-600 text-white px-3 py-1 rounded shadow-sm tracking-wider uppercase">
                             ${post.date}
                        </span>
                        <span class="text-gray-200 text-xs font-medium border-l border-gray-400 pl-3">
                            ${post.author || 'Ban Biên Tập'}
                        </span>
                     </div>
                     <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight font-serif text-white drop-shadow-lg">
                        ${post.title}
                     </h1>
                 </div>
             </div>

             <!-- NỘI DUNG BÀI VIẾT -->
             <!-- FIX: Giảm padding từ p-4 xuống p-2 (8px) theo yêu cầu -->
             <div class="p-2 md:p-8 blog-content max-w-none">
                 ${post.content}
                 <div class="blog-quote mt-8">"Vận mệnh nằm trong tay ta, phong thủy chỉ là trợ lực."</div>
             </div>
        </div>
    `;
}