
// Lưu trữ tham chiếu function để removeEventListener chính xác
let scrollHandler = null;
let clickHandler = null;
let autoCloseTimer = null; // Timer cho việc tự động đóng

export const FloatingToc = {
    // Render khung HTML
    renderContainer: () => {
        // STYLE GIỮ NGUYÊN: 
        // - Vị trí dọc: top-1/2 (giữa màn hình).
        // - Vị trí ngang (Desktop): md:right-[34.5rem].
        // - Vị trí ngang (Mobile): right-2.
        
        // FIX: Thêm 'pointer-events-none' vào container cha để click xuyên qua vùng trống
        // Thêm 'pointer-events-auto' vào button và panel để vẫn click được vào chúng
        return `
        <div id="floating-toc-container" class="fixed top-1/2 -translate-y-1/2 right-2 md:right-[34.5rem] z-40 transition-all duration-500 opacity-0 invisible translate-x-full font-sans flex flex-row-reverse items-center gap-3 pointer-events-none">
            
            <!-- BUTTON TRIGGER -->
            <button id="floating-toc-btn" onclick="window.FloatingToc.toggle()" class="pointer-events-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 w-12 h-12 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-white/50 dark:border-gray-600 hover:border-green-200 dark:hover:border-green-800 transition-all flex items-center justify-center relative z-50 group transform hover:scale-105 active:scale-95">
                <!-- ICON -->
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h.01M4 12h.01M4 18h.01" stroke-width="3"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6h10M10 12h10M10 18h10"></path>
                </svg>
            </button>

            <!-- PANEL NỘI DUNG -->
            <div id="floating-toc-panel" class="pointer-events-auto w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-5 transform scale-0 origin-right transition-transform duration-300 max-h-[60vh] overflow-y-auto custom-scrollbar mr-1">
                <h4 class="font-bold text-gray-800 dark:text-white mb-4 text-xs uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 pb-3 flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Mục lục bài viết
                </h4>
                <ul class="space-y-3 text-sm" id="floating-toc-list"></ul>
            </div>
        </div>`;
    },

    // Khởi tạo logic
    init: () => {
        // 1. Dọn dẹp sạch sẽ trước khi init
        FloatingToc.cleanup();

        // Helper: Hàm bắt đầu đếm ngược đóng panel
        const startAutoClose = () => {
            if (autoCloseTimer) clearTimeout(autoCloseTimer);
            autoCloseTimer = setTimeout(() => {
                const panel = document.getElementById('floating-toc-panel');
                if (panel && !panel.classList.contains('scale-0')) {
                    panel.classList.add('scale-0');
                }
            }, 4000); // 4 giây (trong khoảng 3-5s như yêu cầu)
        };

        // Helper: Hàm đóng panel ngay lập tức
        const closePanelImmediate = () => {
            const panel = document.getElementById('floating-toc-panel');
            if (panel) panel.classList.add('scale-0');
            if (autoCloseTimer) clearTimeout(autoCloseTimer);
        };

        // 2. Expose hàm toggle ra window
        window.FloatingToc = {
            toggle: () => {
                const panel = document.getElementById('floating-toc-panel');
                if (!panel) return;
                
                const isClosed = panel.classList.contains('scale-0');
                if (isClosed) {
                    // Mở ra
                    panel.classList.remove('scale-0');
                    startAutoClose(); // Bắt đầu đếm ngược
                } else {
                    // Đóng lại
                    panel.classList.add('scale-0');
                    if (autoCloseTimer) clearTimeout(autoCloseTimer);
                }
            }
        };

        const container = document.getElementById('floating-toc-container');
        const list = document.getElementById('floating-toc-list');
        const panel = document.getElementById('floating-toc-panel');
        const blogContent = document.querySelector('.blog-content');

        // Nếu không đủ điều kiện thì dừng
        if (!container || !list || !blogContent || !panel) return;

        // 3. Xử lý sự kiện Hover vào Panel: Dừng đếm ngược để người dùng đọc
        panel.addEventListener('mouseenter', () => {
            if (autoCloseTimer) clearTimeout(autoCloseTimer);
        });

        // 4. Xử lý sự kiện Hover ra khỏi Panel: Tiếp tục đếm ngược
        panel.addEventListener('mouseleave', () => {
             if (!panel.classList.contains('scale-0')) {
                 startAutoClose();
             }
        });

        // 5. Tạo mục lục từ thẻ H2, H3
        const headers = blogContent.querySelectorAll('h2, h3');
        if (headers.length === 0) {
            container.remove();
            return;
        }

        list.innerHTML = '';
        headers.forEach((header, index) => {
            if (!header.id) {
                const slug = header.textContent
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');
                header.id = `ftoc-${slug}-${index}`;
            }

            const li = document.createElement('li');
            const isH3 = header.tagName === 'H3';
            li.className = isH3 
                ? "ml-4 pl-3 border-l-2 border-gray-100 dark:border-gray-700 hover:border-green-500 transition-colors" 
                : "mt-3 first:mt-0";
            
            // Logic click: Scroll tới nơi + Highlight + Đóng panel
            const anchor = document.createElement('a');
            anchor.href = `#${header.id}`;
            anchor.className = `block py-0.5 ${isH3 ? 'text-gray-500 dark:text-gray-400 font-normal text-xs' : 'text-gray-800 dark:text-gray-200 font-bold'} hover:text-green-600 dark:hover:text-green-400 transition-colors line-clamp-2 leading-relaxed`;
            anchor.textContent = header.textContent;
            
            anchor.onclick = (e) => {
                e.preventDefault();
                const target = document.getElementById(header.id);
                if(target) {
                    target.scrollIntoView({behavior: 'smooth', block: 'start'});
                    
                    // --- HIỆU ỨNG ĐÈN LED CHẠY ---
                    // Reset class
                    target.classList.remove('highlight-scan');
                    
                    // FIX: Delay 600ms để chờ cuộn xong mới bắt đầu hiệu ứng
                    setTimeout(() => {
                        target.classList.add('highlight-scan');
                    }, 600);
                    
                    // Tự động xóa class sau khi animation chạy xong (2.5s + dư chút)
                    setTimeout(() => target.classList.remove('highlight-scan'), 3500);
                }
                closePanelImmediate(); // Đóng ngay lập tức cho mượt
            };

            li.appendChild(anchor);
            list.appendChild(li);
        });

        // 6. Định nghĩa Handler cho sự kiện Scroll
        scrollHandler = () => {
            if (!document.body.contains(container)) {
                FloatingToc.cleanup(); 
                return;
            }
            
            const rect = blogContent.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            const triggerPoint = absoluteTop; 

            if (window.scrollY > triggerPoint) {
                container.classList.remove('opacity-0', 'invisible', 'translate-x-full');
            } else {
                container.classList.add('opacity-0', 'invisible', 'translate-x-full');
                closePanelImmediate(); // Ẩn nút thì đóng luôn panel
            }
        };

        // 7. Định nghĩa Handler cho sự kiện Click (đóng panel khi click ra ngoài)
        clickHandler = (e) => {
            if (container && !container.contains(e.target)) {
                closePanelImmediate();
            }
        };

        // 8. Gán sự kiện
        window.addEventListener('scroll', scrollHandler);
        document.addEventListener('click', clickHandler);
        
        scrollHandler();
    },

    // Hàm dọn dẹp sự kiện
    cleanup: () => {
        if (autoCloseTimer) {
            clearTimeout(autoCloseTimer);
            autoCloseTimer = null;
        }
        if (scrollHandler) {
            window.removeEventListener('scroll', scrollHandler);
            scrollHandler = null;
        }
        if (clickHandler) {
            document.removeEventListener('click', clickHandler);
            clickHandler = null;
        }
        if (window.FloatingToc) delete window.FloatingToc;
    }
};
