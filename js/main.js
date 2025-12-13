
// --- GLOBAL ERROR HANDLER (Fix lỗi trắng trang) ---
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global Error:", message, source, lineno);
    const app = document.getElementById('app');
    if (app && app.innerHTML.trim() === '') {
        app.innerHTML = `
            <div class="p-8 text-center bg-red-50 text-red-600 rounded-lg border border-red-200 m-4">
                <h3 class="text-xl font-bold mb-2">Đã xảy ra lỗi khởi động ứng dụng!</h3>
                <p class="text-sm mb-4">Vui lòng kiểm tra lại kết nối hoặc tải lại trang.</p>
                <code class="block bg-white p-2 rounded text-xs text-left overflow-auto border border-gray-200">
                    ${message} <br> tại: ${source}:${lineno}
                </code>
                <button onclick="location.reload()" class="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Tải lại trang</button>
            </div>
        `;
    }
};

// IMPORTS
import { initAI, generateContent, setApiKey } from './ai.js';
import { getDayInfo } from './calendar.js';
import { renderBlogList, renderBlogDetail } from './blog.js'; 
import { BlogService } from './service.js';
import { renderFortune, handleFortuneCheck } from './fortune.js';
import { renderHeroSection } from './components/hero.js'; 
import { UserService } from './user.js'; 
import { renderLogos } from './components/logo.js'; 
import { FloatingToc } from './components/floatingToc.js';
import { renderHome } from './components/home.js';
import { renderTuViPage, handleZodiacClick, closeZodiacModal, handleZodiacChat } from './components/tuvi.js';
import { renderHomeSidebar, renderTuViSidebar, renderPhongThuySidebar, renderNumerologySidebar, renderPostSidebar } from './components/sidebar.js';
import { renderNumerology, handleNumerologySubmit } from './components/numerology.js';
import { renderTopBar, renderNav, renderMobileMenu, GROUP_MAPPING } from './components/navigation.js';

// --- STATE ---
const state = {
  currentView: 'HOME',
  date: new Date(),
  viewingPost: null,
  currentCategory: null, 
  currentGroup: null,    
  isMenuOpen: false,
  countdownInterval: null,
  chatHistory: [],
  currentUser: null,
  isUserMenuOpen: false,
  viewTimer: null 
};

// --- HELPERS ---
const updateMetaDescription = (content) => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute("content", content);
    }
};

const cancelViewTimer = () => {
    if (state.viewTimer) {
        clearTimeout(state.viewTimer);
        state.viewTimer = null;
    }
};

const startCountdown = () => {
    if (state.countdownInterval) clearInterval(state.countdownInterval);
    const tetDate = new Date('2026-02-17T00:00:00').getTime();

    const update = () => {
        const now = new Date().getTime();
        const dist = tetDate - now;
        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);

        const ids = ['timer-home', 'timer-post'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = dist < 0 ? "CHÚC MỪNG NĂM MỚI!" : `<span class="font-mono text-2xl md:text-3xl font-bold">${d}</span> ngày <span class="font-mono">${h}:${m}:${s}</span>`;
        });

        const widgetEl = document.getElementById('widget-countdown-days');
        if (widgetEl) widgetEl.innerText = dist < 0 ? "0" : d;

        const dEl = document.getElementById('t-d');
        if (dEl && dist >= 0) {
             dEl.innerText = d;
             document.getElementById('t-h').innerText = h.toString().padStart(2, '0');
             document.getElementById('t-m').innerText = m.toString().padStart(2, '0');
             document.getElementById('t-s').innerText = s.toString().padStart(2, '0');
        }
    };
    update();
    state.countdownInterval = setInterval(update, 1000);
};

// --- CONTROLLER ---
const app = {
    init: () => {
        try {
            app.initTheme(); 
            initAI();
            renderLogos();
            try { state.currentUser = UserService.getCurrentUser(); } catch (e) { }

            document.addEventListener('click', (e) => {
                const container = document.getElementById('user-menu-container');
                const dropdown = document.getElementById('user-menu-dropdown');
                if (container && !container.contains(e.target) && dropdown && !dropdown.classList.contains('hidden')) {
                    app.closeUserMenu();
                }
            });

            // --- BROWSER BACK BUTTON SUPPORT (POPSTATE) ---
            window.onpopstate = function(event) {
                // Tắt audio khi back trình duyệt
                if (window.appSpeech) window.appSpeech.cleanup();
                app.handleUrlRoute();
            };

            // Initial Route
            app.handleUrlRoute();

        } catch (e) {
            console.error("Critical Init Error:", e);
            const main = document.getElementById('app');
            if(main) main.innerHTML = `<div class="p-8 text-center text-red-500">Lỗi khởi động ứng dụng: ${e.message}</div>`;
        }
    },

    handleUrlRoute: () => {
        const path = window.location.pathname; 
        const searchParams = new URLSearchParams(window.location.search);
        
        const pathSegments = path.split('/').filter(Boolean);
        const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
        const isGitHubPages = path.includes('/app-lich'); 

        // Reset state
        state.viewingPost = null;
        state.currentCategory = null;
        state.currentGroup = null;

        // 1. Ưu tiên Query Params (Cho GitHub Pages)
        if (searchParams.get('view')) {
            const view = searchParams.get('view');
            state.currentView = view;
            
            if (view === 'BLOG') {
                const slug = searchParams.get('slug');
                const cat = searchParams.get('cat');
                const group = searchParams.get('group');
                
                if (slug) {
                    const post = BlogService.getPostBySlug(slug);
                    if (post) state.viewingPost = post;
                } else if (cat) {
                    state.currentCategory = cat;
                } else if (group) {
                    state.currentGroup = group;
                }
            }
        } 
        // 2. Ưu tiên Clean URL (Hosting thường)
        else if (lastSegment && lastSegment !== 'index.html' && lastSegment !== 'app-lich') {
            const postBySlug = BlogService.getPostBySlug(lastSegment);
            if (postBySlug) {
                state.currentView = 'BLOG';
                state.viewingPost = postBySlug;
            } else {
                const staticMap = {
                    'lich-van-nien': 'CALENDAR',
                    'tro-ly-ai': 'ASSISTANT',
                    'boi-tinh-duyen': 'LOVE',
                    'than-so-hoc': 'NUMEROLOGY',
                    'kien-thuc': 'BLOG'
                };
                if (staticMap[lastSegment]) {
                    state.currentView = staticMap[lastSegment];
                } else {
                    state.currentView = 'HOME'; // Mặc định về Home nếu 404
                }
            }
        } else {
            state.currentView = 'HOME';
        }

        // Render sau khi xác định state
        app.render();
        renderNav(state.currentView);
        renderMobileMenu(state.currentView, state.currentUser);
        app.updateAuthUI(); 
    },

    initTheme: () => {
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },

    toggleTheme: () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        renderLogos();
    },

    render: () => {
        const main = document.getElementById('app');
        if (!main) return;
        
        try {
            if(FloatingToc && typeof FloatingToc.cleanup === 'function') FloatingToc.cleanup();
            
            main.innerHTML = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            renderTopBar();

            // QUAN TRỌNG: Giảm xuống pt-14 (56px) để sát header hơn (header h-14)
            const containerClass = "pt-14 md:pt-0 animate-fade-in";

            if (state.currentView === 'HOME') {
                document.title = "Hôm nay ngày mấy âm lịch? Xem Ngày Tốt Xấu Hôm Nay";
                updateMetaDescription("Tra cứu lịch âm dương hôm nay, xem ngày tốt xấu, giờ hoàng đạo và đổi ngày dương sang âm nhanh chóng, chính xác nhất năm 2025.");
                
                main.innerHTML = renderHome(state.date, 'HOME');
                setTimeout(startCountdown, 100);

            } else if (state.currentView === 'CALENDAR' || state.currentView === 'DAILY') {
                document.title = "Lịch Vạn Niên 2025 - Tra Cứu Lịch Âm Dương Chính Xác";
                updateMetaDescription("Lịch Vạn Niên 2025 đầy đủ chi tiết. Xem lịch tháng, lịch ngày, ngày tốt xấu, sao hạn, nhị thập bát tú.");
                
                main.innerHTML = renderHome(state.date, 'CALENDAR');
                setTimeout(startCountdown, 100);
                setTimeout(() => {
                    const id = state.currentView === 'CALENDAR' ? 'calendar-view-container' : 'daily-section';
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);

            } else if (state.currentView === 'BLOG') {
                if (state.viewingPost) {
                    // SEO cho bài viết
                    document.title = `${state.viewingPost.title} - Lịch Việt AI`;
                    updateMetaDescription(state.viewingPost.excerpt || state.viewingPost.title);
                    
                    main.innerHTML = `
                        <div class="${containerClass} grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                            <div class="lg:col-span-9">${renderBlogDetail(state.viewingPost)}</div>
                            <div class="lg:col-span-3">${renderPostSidebar(BlogService.getRelatedPosts(state.viewingPost.id))}</div>
                        </div>
                        ${FloatingToc.renderContainer()}
                    `;
                    setTimeout(() => FloatingToc.init(), 100);
                    setTimeout(startCountdown, 200);

                } else {
                    if (state.currentCategory === 'TU_VI') {
                        document.title = "Tử Vi 12 Con Giáp Năm 2026 (Bính Ngọ) - Luận Giải Chi Tiết";
                        updateMetaDescription("Xem bói tử vi trọn đời 2026, tra cứu vận hạn tam tai, sao chiếu mệnh và tài lộc cho 12 con giáp năm Bính Ngọ.");
                        main.innerHTML = `<div class="${containerClass}">${renderTuViPage()}</div>`;
                        return;
                    }

                    let posts = [], title = "Tất cả bài viết", heroHTML = '', sidebarRenderer = renderHomeSidebar;

                    if (state.currentCategory) {
                        posts = BlogService.getPostsByCategory(state.currentCategory);
                        const meta = { 'THAN_SO_HOC': "Thần Số Học", 'PHONG_THUY': "Phong Thủy", 'VAN_KHAN': "Văn Khấn", 'LE_TET': "Lễ Tết" };
                        title = meta[state.currentCategory] || "Danh Mục";
                        document.title = `${title} - Kiến Thức Hay`;
                        updateMetaDescription(`Tổng hợp bài viết hay nhất về ${title}, giúp bạn có thêm kiến thức bổ ích trong cuộc sống.`);
                        
                        heroHTML = renderHeroSection([state.currentCategory], `Tiêu Điểm: ${title}`);
                        if (state.currentCategory === 'PHONG_THUY') sidebarRenderer = renderPhongThuySidebar;

                    } else if (state.currentGroup) {
                        const groupData = GROUP_MAPPING[state.currentGroup];
                        if (groupData) {
                            posts = BlogService.getPostsByCategories(groupData.categories);
                            title = groupData.label;
                            document.title = `${title} - Tổng Hợp`;
                            updateMetaDescription(`Chuyên mục ${title} - Cập nhật những thông tin mới nhất và chính xác nhất.`);
                            
                            heroHTML = renderHeroSection(groupData.categories, `Tiêu Điểm: ${groupData.label}`);
                            if (state.currentGroup === 'TU_VI_GROUP') sidebarRenderer = renderTuViSidebar;
                            else if (state.currentGroup === 'PHONG_THUY_GROUP') sidebarRenderer = renderPhongThuySidebar;
                        }
                    } else {
                        document.title = "Kiến Thức Phong Thủy & Tử Vi - Blog Lịch Việt";
                        updateMetaDescription("Blog Lịch Việt - Kho tàng kiến thức về phong thủy, tử vi, thần số học và văn hóa Việt Nam.");
                        
                        posts = BlogService.getAllPosts();
                        heroHTML = renderHeroSection(null, "Tin Mới Nhất");
                    }
                    
                    main.innerHTML = `
                        <div class="${containerClass}">
                            ${heroHTML}
                            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div class="lg:col-span-9">${renderBlogList(posts, title)}</div>
                                <div class="lg:col-span-3">${sidebarRenderer()}</div>
                            </div>
                        </div>
                    `;
                }

            } else if (state.currentView === 'LOVE') {
                document.title = "Bói Tình Duyên AI - Xem Mức Độ Hợp Nhau";
                updateMetaDescription("Công cụ bói tình duyên online sử dụng AI. Xem mức độ hợp nhau giữa bạn và người ấy, nhận lời khuyên tình yêu thú vị.");
                main.innerHTML = `<div class="${containerClass} max-w-4xl mx-auto">${renderFortune()}</div>`;

            } else if (state.currentView === 'NUMEROLOGY') {
                document.title = "Tra Cứu Thần Số Học Online - Luận Giải Chi Tiết Số Chủ Đạo";
                updateMetaDescription("Công cụ tra cứu Thần số học Pitago miễn phí. Tính số chủ đạo, biểu đồ ngày sinh và khám phá ý nghĩa cuộc đời bạn.");
                main.innerHTML = `
                    <div class="${containerClass} grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                        <div class="lg:col-span-9">${renderNumerology()}</div>
                        <div class="lg:col-span-3">${renderNumerologySidebar()}</div>
                    </div>
                `;

            } else if (state.currentView === 'ASSISTANT') {
                document.title = "Trợ Lý AI - Hỏi Đáp Phong Thủy & Lịch Việt";
                updateMetaDescription("Chat với Trợ lý AI thông minh về lịch vạn niên, ngày tốt xấu, phong thủy và tử vi. Giải đáp mọi thắc mắc nhanh chóng.");
                main.innerHTML = `
                <div class="${containerClass} max-w-4xl mx-auto flex flex-col h-[calc(100vh-100px)]">
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full">
                        <div class="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white font-bold shrink-0">Trợ Lý AI Thông Thái</div>
                        <div id="chat-box" class="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-900">
                            ${state.chatHistory.map(msg => `
                                <div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}">
                                    <div class="max-w-[80%] px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-gray-200'}">
                                        ${msg.text}
                                    </div>
                                </div>
                            `).join('')}
                            <div id="loading-indicator" class="hidden flex justify-start"><div class="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg text-xs italic text-gray-500">AI đang nhập...</div></div>
                        </div>
                        <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2 shrink-0">
                            <input id="chat-input" class="flex-1 border rounded-full px-4 py-2 focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-600" placeholder="Nhập câu hỏi..." onkeydown="if(event.key==='Enter') app.sendMessage()">
                            <button onclick="app.sendMessage()" class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">Gửi</button>
                        </div>
                    </div>
                </div>`;
            }

        } catch (err) {
            console.error("Render Error:", err);
            main.innerHTML = `<div class="p-8 text-center bg-red-50 text-red-600 rounded-lg">Đã có lỗi hiển thị: ${err.message}</div>`;
        }
    },

    loadVideo: (wrapper, videoId) => {
        wrapper.classList.add('playing'); 
        wrapper.innerHTML = `
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
            ></iframe>
        `;
    },

    navigate: (view) => {
        cancelViewTimer();
        // STOP AUDIO KHI CHUYỂN TRANG
        if (window.appSpeech) window.appSpeech.cleanup();

        state.currentView = view;
        state.viewingPost = null;
        state.currentCategory = null;
        state.currentGroup = null;
        app.closeMenu();
        
        const staticMap = {
            'CALENDAR': 'lich-van-nien',
            'ASSISTANT': 'tro-ly-ai',
            'LOVE': 'boi-tinh-duyen',
            'NUMEROLOGY': 'than-so-hoc',
            'HOME': ''
        };
        const path = staticMap[view] !== undefined ? staticMap[view] : '';
        const isGitHubPages = window.location.pathname.includes('/app-lich');
        const newUrl = isGitHubPages ? `?view=${view}` : (path ? `/${path}` : '/');

        window.history.pushState({}, '', newUrl);
        app.render();
        renderNav(view);
        renderMobileMenu(view, state.currentUser);
    },
    
    viewPost: (slugOrId) => {
        // STOP AUDIO KHI XEM BÀI MỚI
        if (window.appSpeech) window.appSpeech.cleanup();

        let post;
        if (typeof slugOrId === 'string' && isNaN(slugOrId)) {
            post = BlogService.getPostBySlug(slugOrId);
        } else {
            post = BlogService.getPostById(slugOrId);
        }
        if (post) {
            cancelViewTimer();
            state.viewingPost = post;
            state.currentView = 'BLOG';
            app.closeMenu();
            
            const isGitHubPages = window.location.pathname.includes('/app-lich');
            const newUrl = isGitHubPages ? `?view=BLOG&slug=${post.slug}` : `/${post.slug}`;

            window.history.pushState({}, '', newUrl);
            app.render();
            renderNav(state.currentView);
            renderMobileMenu(state.currentView, state.currentUser);
        }
    },
    
    filterBlog: (category) => {
        cancelViewTimer();
        // STOP AUDIO KHI CHUYỂN DANH MỤC
        if (window.appSpeech) window.appSpeech.cleanup();

        state.currentView = 'BLOG';
        state.viewingPost = null;
        state.currentCategory = category;
        state.currentGroup = null; 
        app.closeMenu();
        
        const isGitHubPages = window.location.pathname.includes('/app-lich');
        const newUrl = isGitHubPages ? `?view=BLOG&cat=${category}` : `/?cat=${category}`;

        window.history.pushState({}, '', newUrl);
        app.render();
        renderNav(state.currentView);
        renderMobileMenu(state.currentView, state.currentUser);
    },

    filterGroup: (groupId) => {
        cancelViewTimer();
        if (window.appSpeech) window.appSpeech.cleanup();

        state.currentView = 'BLOG';
        state.viewingPost = null;
        state.currentCategory = null; 
        state.currentGroup = groupId;
        app.closeMenu();
        
        const isGitHubPages = window.location.pathname.includes('/app-lich');
        const newUrl = isGitHubPages ? `?view=BLOG&group=${groupId}` : `/?group=${groupId}`;

        window.history.pushState({}, '', newUrl);
        app.render();
        renderNav(state.currentView);
        renderMobileMenu(state.currentView, state.currentUser);
    },

    // Quay lại danh sách bài viết (Giả lập Back Button)
    backToBlog: () => {
        cancelViewTimer();
        // STOP AUDIO KHI BACK
        if (window.appSpeech) window.appSpeech.cleanup();
        
        // Nếu trình duyệt có lịch sử, dùng back() để trải nghiệm tự nhiên
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback nếu người dùng mở trực tiếp link bài viết (không có lịch sử)
            state.viewingPost = null;
            
            // Logic quay lại đúng danh mục hoặc trang chủ
            if (state.currentCategory) {
                app.filterBlog(state.currentCategory);
            } else if (state.currentGroup) {
                app.filterGroup(state.currentGroup);
            } else {
                app.navigate('HOME');
            }
        }
    },

    changeDate: (d) => { state.date.setDate(state.date.getDate() + d); app.render(); },
    changeMonth: (d) => { state.date.setMonth(state.date.getMonth() + d); state.date.setDate(1); app.render(); },
    selectDate: (iso) => { state.date = new Date(iso); app.render(); document.getElementById('daily-section')?.scrollIntoView({behavior:'smooth'}) },
    
    toggleMenu: () => { 
        const m = document.getElementById('mobile-menu');
        const overlay = document.getElementById('menu-overlay');
        if (m.classList.contains('-translate-x-full')) {
            m.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            app.closeMenu();
        }
    },
    
    closeMenu: () => {
        const m = document.getElementById('mobile-menu');
        const overlay = document.getElementById('menu-overlay');
        if (m && !m.classList.contains('-translate-x-full')) {
             m.classList.add('-translate-x-full');
             overlay.classList.add('hidden');
        }
    },

    toggleSubMenu: (id) => {
        const sub = document.getElementById(`m-sub-${id}`);
        const icon = document.getElementById(`m-icon-${id}`);
        if(sub) {
            if(sub.classList.contains('max-h-0')) {
                sub.classList.remove('max-h-0', 'hidden');
                sub.classList.add('max-h-[500px]');
                if(icon) icon.innerHTML = '-'; 
            } else {
                sub.classList.add('max-h-0');
                sub.classList.remove('max-h-[500px]');
                if(icon) icon.innerHTML = '+'; 
            }
        }
    },

    toggleSearch: () => { 
        const modal = document.getElementById('search-modal');
        if (modal) {
            modal.classList.toggle('hidden');
            if (!modal.classList.contains('hidden')) setTimeout(() => document.getElementById('search-input')?.focus(), 100);
        }
    },

    handleSearchInput: (k) => {
        const container = document.getElementById('search-results');
        if (!k.trim()) {
            container.classList.add('hidden');
            return;
        }
        const res = BlogService.searchPosts(k);
        container.classList.remove('hidden');
        container.innerHTML = res.length ? res.map(p => `
            <div onclick="app.viewPost('${p.slug}'); app.toggleSearch()" class="flex items-start gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors">
                <img src="${p.image}" class="w-12 h-12 object-cover rounded flex-shrink-0">
                <div>
                    <div class="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">${p.title}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">${p.excerpt}</div>
                </div>
            </div>
        `).join('') : '<div class="text-gray-500 p-4 text-center text-sm">Không tìm thấy kết quả</div>';
    },

    toggleLogin: () => { document.getElementById('login-modal')?.classList.toggle('hidden'); },
    toggleUserMenu: () => { document.getElementById('user-menu-dropdown')?.classList.toggle('hidden'); },
    closeUserMenu: () => { document.getElementById('user-menu-dropdown')?.classList.add('hidden'); },

    updateAuthUI: () => {
        const container = document.getElementById('desktop-auth-container');
        if (!container) return;
        if (state.currentUser) {
            container.innerHTML = `
                <div id="user-menu-container" class="relative">
                    <button onclick="app.toggleUserMenu()" class="flex items-center gap-3 focus:outline-none hover:opacity-100">
                        <span class="text-sm font-bold text-gray-700 dark:text-gray-200 hidden lg:block">Hi, ${state.currentUser.name}</span>
                        <img src="${state.currentUser.avatar}" class="w-9 h-9 rounded-full border border-gray-200 object-cover">
                    </button>
                    <div id="user-menu-dropdown" class="hidden absolute right-0 top-full mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                        <button onclick="app.logout()" class="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold">Đăng xuất</button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `<button onclick="app.toggleLogin()" class="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">Đăng nhập</button>`;
        }
        renderMobileMenu(state.currentView, state.currentUser);
    },

    loginGoogle: async () => {
        document.getElementById('login-loading').classList.remove('hidden');
        state.currentUser = await UserService.loginWithGoogle();
        document.getElementById('login-loading').classList.add('hidden');
        app.updateAuthUI(); app.toggleLogin();
    },
    loginFacebook: async () => {
        document.getElementById('login-loading').classList.remove('hidden');
        state.currentUser = await UserService.loginWithFacebook();
        document.getElementById('login-loading').classList.add('hidden');
        app.updateAuthUI(); app.toggleLogin();
    },
    logout: () => {
        if(confirm('Đăng xuất?')) { UserService.logout(); state.currentUser = null; app.updateAuthUI(); window.location.reload(); }
    },
    toggleFooter: (id) => {
        const el = document.getElementById(id);
        const icon = document.getElementById('icon-' + id);
        if (el) {
            el.classList.toggle('hidden');
            if(icon) icon.innerText = el.classList.contains('hidden') ? '+' : '-';
        }
    },
    sendMessage: async () => {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if(!text) return;
        state.chatHistory.push({role: 'user', text});
        app.render(); 
        document.getElementById('loading-indicator').classList.remove('hidden');
        const reply = await generateContent(text);
        state.chatHistory.push({role: 'model', text: reply});
        app.render();
    },
    handleFortuneCheck: handleFortuneCheck,
    handleNumerologySubmit: handleNumerologySubmit,
    handleZodiacClick: handleZodiacClick,
    handleZodiacChat: handleZodiacChat, 
    closeZodiacModal: closeZodiacModal,
    saveApiKey: () => { const k = document.getElementById('api-key-input').value; if(setApiKey(k)) app.render(); },
    handleUserAction: () => app.toggleMenu()
};

window.app = app;
app.init();
