import { initAI, generateContent, setApiKey, hasApiKey } from './ai.js';
import { getDayInfo, generateMonthGrid, formatWeekDay, renderDailyDetailHTML, renderCalendarGridHTML } from './calendar.js';
import { renderBlogList, renderBlogDetail, updatePostViewsUI } from './blog.js'; // Import thêm updatePostViewsUI
import { BlogService } from './service.js';
import { renderFortune, handleFortuneCheck } from './fortune.js';
import { renderHeroSection } from './components/hero.js'; 
import { UserService } from './user.js'; 
import { renderLogos } from './components/logo.js'; // Import component Logo
import { ViewService } from './services/viewService.js'; // Import ViewService

// --- CONFIGURATION ---
const GROUP_MAPPING = {
    'TU_VI_GROUP': {
        label: 'Tử Vi & Số Mệnh',
        categories: ['TU_VI', 'THAN_SO_HOC'] // Bói Tình Duyên là view riêng
    },
    'PHONG_THUY_GROUP': {
        label: 'Phong Thủy & Khám Phá',
        categories: ['PHONG_THUY', 'VAN_KHAN', 'LE_TET']
    },
    'TOOLS_GROUP': {
        label: 'Trợ Lý & Công Cụ',
        categories: [] // Nhóm này chủ yếu là tính năng (AI, Calendar)
    }
};

const findGroupByCat = (catId) => {
    for (const [groupId, data] of Object.entries(GROUP_MAPPING)) {
        if (data.categories.includes(catId)) return { groupId, label: data.label };
    }
    return null; 
};

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
  isUserMenuOpen: false 
};

// --- HELPERS (Giữ nguyên) ---
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

        const textIds = ['timer-home', 'timer-post'];
        textIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (dist < 0) {
                el.innerHTML = "CHÚC MỪNG NĂM MỚI!";
            } else {
                el.innerHTML = `<span class="font-mono text-2xl md:text-3xl font-bold">${d}</span> ngày <span class="font-mono">${h}:${m}:${s}</span>`;
            }
        });

        const dEl = document.getElementById('t-d');
        if (dEl) {
             if (dist < 0) {
                 const container = document.getElementById('tet-timer-display');
                 if(container) container.innerHTML = '<div class="text-yellow-300 font-bold text-2xl animate-pulse">CHÚC MỪNG NĂM MỚI!</div>';
             } else {
                 dEl.innerText = d;
                 document.getElementById('t-h').innerText = h.toString().padStart(2, '0');
                 document.getElementById('t-m').innerText = m.toString().padStart(2, '0');
                 document.getElementById('t-s').innerText = s.toString().padStart(2, '0');
             }
        }
    };
    update();
    state.countdownInterval = setInterval(update, 1000);
};

// --- COMPONENT GENERATORS (Sidebar Widgets) ---
const getRelatedPostsHTML = (postId) => {
    const relatedPosts = BlogService.getRelatedPosts(postId);
    return `
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-green-200 dark:border-green-800 overflow-hidden">
            <div class="border-l-4 border-green-600 px-4 py-3 bg-green-50 dark:bg-green-900/30 border-b border-green-100 dark:border-green-800">
                <h3 class="font-bold text-green-800 dark:text-green-300 uppercase text-sm tracking-wider">Bài viết liên quan</h3>
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
                ${relatedPosts.map(p => `
                    <div class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer flex gap-3 group" onclick="app.viewPost('${p.slug}')">
                        <img src="${p.image}" class="w-20 h-16 object-cover rounded-md flex-shrink-0">
                        <div>
                            <h4 class="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 line-clamp-2 leading-snug">${p.title}</h4>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

const getServicesHTML = () => {
    const services = [
        { img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=100&h=100&fit=crop", title: "Xem ngày cưới hỏi", sub: "Hạnh phúc trăm năm" },
        { img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=100&h=100&fit=crop", title: "Xem ngày mua xe", sub: "Vạn dặm bình an" },
        { img: "https://images.unsplash.com/photo-1560518883-ce09059ee971?w=100&h=100&fit=crop", title: "Xem ngày làm nhà", sub: "An cư lạc nghiệp" },
        { img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100&h=100&fit=crop", title: "Xem ngày khai trương", sub: "Hồng phát tài lộc" }
    ];
    return `
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="border-l-4 border-green-600 px-3 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                <h3 class="font-bold text-gray-800 dark:text-gray-100 uppercase text-sm tracking-wider">Dịch Vụ Chuyên Gia</h3>
            </div>
            <div class="divide-y divide-gray-50 dark:divide-gray-700">
                ${services.map(s => `
                    <div class="p-3 flex items-center gap-3 hover:bg-green-50 dark:hover:bg-gray-700 transition cursor-pointer group" onclick="app.filterBlog('PHONG_THUY')">
                        <img src="${s.img}" class="w-16 h-12 object-cover rounded-md shadow-sm group-hover:scale-105 transition">
                        <div>
                            <h4 class="font-bold text-gray-800 dark:text-gray-200 text-sm group-hover:text-green-700 dark:group-hover:text-green-400">${s.title}</h4>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${s.sub}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

const getAIWidgetHTML = () => {
    return `
        <div class="bg-gradient-to-br from-green-600 to-teal-700 rounded-xl shadow-lg p-4 text-white relative overflow-hidden">
             <div class="relative z-10">
                <h3 class="font-bold text-lg mb-2 flex items-center gap-2"><span class="animate-pulse">✨</span> Trợ Lý AI</h3>
                <p class="text-green-100 text-sm mb-4">Hỏi đáp nhanh về ngày giờ tốt xấu, phong thủy.</p>
                <button onclick="app.navigate('ASSISTANT')" class="bg-white text-green-700 px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-gray-100 transition w-full">Chat ngay</button>
             </div>
             <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        </div>
    `;
};

const renderSidebar = () => {
    let sidebarHTML = '<div class="space-y-6">';
    if (state.currentView === 'BLOG' && state.viewingPost) {
        sidebarHTML += getRelatedPostsHTML(state.viewingPost.id);
    }
    sidebarHTML += getServicesHTML();
    sidebarHTML += getAIWidgetHTML();
    sidebarHTML += '</div>';
    return sidebarHTML;
};

const renderHome = () => {
    // Trang chủ hiển thị Hero tổng hợp (Tất cả danh mục)
    const heroHTML = renderHeroSection(null, "Tin Mới Nhất");
    return `
        ${heroHTML}
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-8 space-y-8">
                <div id="daily-section">
                    <div class="flex items-center gap-2 mb-4 border-l-4 border-green-600 pl-3"><h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 uppercase">Lịch Ngày</h2></div>
                    ${renderDailyDetailHTML(state.date)}
                </div>
                <div id="calendar-view-container">
                    <div class="flex items-center gap-2 mb-4 border-l-4 border-green-600 pl-3"><h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 uppercase">Lịch Tháng</h2></div>
                    ${renderCalendarGridHTML(state.date)}
                </div>
            </div>
            <div class="lg:col-span-4">${renderSidebar()}</div>
        </div>
    `;
};

// --- CONTROLLER ---
const app = {
    init: () => {
        app.initTheme(); // Khởi tạo theme
        initAI();
        renderLogos(); // Hiển thị Logo
        state.currentUser = UserService.getCurrentUser();

        document.addEventListener('click', (e) => {
            const container = document.getElementById('user-menu-container');
            const dropdown = document.getElementById('user-menu-dropdown');
            if (container && !container.contains(e.target) && dropdown && !dropdown.classList.contains('hidden')) {
                app.closeUserMenu();
            }
        });

        const params = new URLSearchParams(window.location.search);
        const view = params.get('view');
        const slug = params.get('slug');
        
        if (view) {
            state.currentView = view;
            if (view === 'BLOG' && slug) {
                state.viewingPost = BlogService.getPostBySlug(slug);
                // Nếu view ngay bài viết từ URL, cũng cần tăng view
                if(state.viewingPost) ViewService.incrementView(state.viewingPost.id);
            }
        }
        
        app.render();
        renderNav();
        renderMobileMenu();
        app.updateAuthUI(); 
    },

    // --- LOGIC THEME ---
    initTheme: () => {
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },

    toggleTheme: () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        renderLogos(); // Render lại logo khi đổi theme (cho Desktop Header)
    },

    render: () => {
        const main = document.getElementById('app');
        main.innerHTML = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        renderTopBar();
        app.updateBottomNavState(); // Update active state cho menu dưới

        if (state.currentView === 'HOME') {
            main.innerHTML = renderHome();
            setTimeout(startCountdown, 100);
        } else if (state.currentView === 'CALENDAR' || state.currentView === 'DAILY') {
            // View chỉ hiển thị lịch (Dùng lại bố cục trang chủ nhưng scroll xuống lịch)
            main.innerHTML = renderHome();
            setTimeout(startCountdown, 100);
            setTimeout(() => {
                if (state.currentView === 'CALENDAR') {
                    const el = document.getElementById('calendar-view-container');
                    if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else if (state.currentView === 'DAILY') {
                    const el = document.getElementById('daily-section');
                    if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);

        } else if (state.currentView === 'BLOG') {
            if (state.viewingPost) {
                main.innerHTML = `
                <div class="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="lg:col-span-8">
                        ${renderBlogDetail(state.viewingPost)}
                    </div>
                    <div class="lg:col-span-4">
                        ${renderSidebar()}
                    </div>
                </div>`;
                if(document.getElementById('timer-post') || document.getElementById('t-d')) setTimeout(startCountdown, 100);
            } else {
                // LOGIC HIỂN THỊ DANH SÁCH BÀI VIẾT (Có thể kèm Hero theo nhóm)
                let posts = [];
                let title = "Tất cả bài viết";
                let heroHTML = '';

                if (state.currentCategory) {
                    posts = BlogService.getPostsByCategory(state.currentCategory);
                    const meta = {
                        'TU_VI': "Tử Vi & Vận Hạn",
                        'THAN_SO_HOC': "Thần Số Học",
                        'PHONG_THUY': "Phong Thủy Nhà Ở & Đời Sống",
                        'VAN_KHAN': "Văn Khấn Cổ Truyền",
                        'LE_TET': "Ngày Lễ Tết & Sự Kiện"
                    };
                    title = meta[state.currentCategory] || "Danh Mục";
                    // Khi xem 1 category cụ thể, render hero chỉ cho category đó
                    heroHTML = renderHeroSection([state.currentCategory], `Tiêu Điểm: ${title}`);

                } else if (state.currentGroup) {
                    const groupData = GROUP_MAPPING[state.currentGroup];
                    if (groupData) {
                        posts = BlogService.getPostsByCategories(groupData.categories);
                        title = groupData.label;
                        // Render Hero cho Group đó
                        heroHTML = renderHeroSection(groupData.categories, `Tiêu Điểm: ${groupData.label}`);
                    }
                } else {
                    posts = BlogService.getAllPosts();
                    heroHTML = renderHeroSection(null, "Tin Mới Nhất");
                }
                
                main.innerHTML = `
                    ${heroHTML}
                    ${renderBlogList(posts, title)}
                `;
            }
            // Gọi hàm cập nhật View sau khi render HTML xong
            setTimeout(() => updatePostViewsUI(), 100);

        } else if (state.currentView === 'LOVE') {
            main.innerHTML = `<div class="max-w-4xl mx-auto">${renderFortune()}</div>`;
        } else if (state.currentView === 'ASSISTANT') {
            main.innerHTML = renderAssistantLayout();
            const box = document.getElementById('chat-box');
            if(box) box.scrollTop = box.scrollHeight;
        } else if (state.currentView === 'KNOWLEDGE') {
             // Fallback cho link cũ
             state.currentView = 'BLOG';
             state.currentGroup = 'PHONG_THUY_GROUP';
             app.render();
        }
    },

    navigate: (view) => {
        state.currentView = view;
        state.viewingPost = null;
        state.currentCategory = null;
        state.currentGroup = null;
        app.closeMenu();
        const url = new URL(window.location);
        url.searchParams.set('view', view);
        url.searchParams.delete('slug');
        window.history.pushState({}, '', url);
        app.render();
        renderNav();
        renderMobileMenu();
    },
    
    viewPost: (slugOrId) => {
        let post;
        if (typeof slugOrId === 'string' && isNaN(slugOrId)) {
            post = BlogService.getPostBySlug(slugOrId);
        } else {
            post = BlogService.getPostById(slugOrId);
        }
        if (post) {
            // TĂNG LƯỢT XEM KHI MỞ BÀI VIẾT (GỌI API REAL)
            ViewService.incrementView(post.id);

            state.viewingPost = post;
            state.currentView = 'BLOG';
            state.currentCategory = null; 
            state.currentGroup = null;
            app.closeMenu();
            const url = new URL(window.location);
            url.searchParams.set('view', 'BLOG');
            url.searchParams.set('slug', post.slug);
            window.history.pushState({}, '', url);
            app.render();
            renderNav();
            renderMobileMenu();
        }
    },
    
    filterBlog: (category) => {
        state.currentView = 'BLOG';
        state.viewingPost = null;
        state.currentCategory = category;
        state.currentGroup = null; 
        app.closeMenu();
        app.render();
        renderNav();
        renderMobileMenu();
    },

    filterGroup: (groupId) => {
        state.currentView = 'BLOG';
        state.viewingPost = null;
        state.currentCategory = null; 
        state.currentGroup = groupId;
        app.closeMenu();
        app.render();
        renderNav();
        renderMobileMenu();
    },

    backToBlog: () => {
        state.viewingPost = null;
        const url = new URL(window.location);
        url.searchParams.delete('slug');
        window.history.pushState({}, '', url);
        app.render();
        renderNav(); 
        renderMobileMenu();
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

    // --- USER ACTIONS ---
    // Mới: Xử lý khi bấm vào icon User ở Header hoặc Tab Cá Nhân ở BottomNav
    handleUserAction: () => {
        // Mở drawer bên trái (có chứa thông tin user và nút đăng nhập)
        app.toggleMenu();
    },

    // Mới: Cập nhật màu sắc cho Bottom Nav (Dark Navy Theme)
    updateBottomNavState: () => {
        const ids = ['nav-home', 'nav-tu-vi', 'nav-phong-thuy', 'nav-ai', 'nav-user'];
        const activeClass = 'text-green-400'; // Active = Xanh sáng trên nền tối
        const inactiveClass = 'text-gray-400'; // Inactive = Xám

        ids.forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.classList.remove(activeClass);
                el.classList.add(inactiveClass);
            }
        });

        let activeId = 'nav-home';
        if (state.currentGroup === 'TU_VI_GROUP') activeId = 'nav-tu-vi';
        else if (state.currentGroup === 'PHONG_THUY_GROUP') activeId = 'nav-phong-thuy';
        else if (state.currentView === 'ASSISTANT') activeId = 'nav-ai';
        // Tab Cá nhân không bao giờ active lâu, chỉ mở menu

        const activeEl = document.getElementById(activeId);
        if(activeEl) {
            activeEl.classList.remove(inactiveClass);
            activeEl.classList.add(activeClass);
        }
    },

    // --- USER MENU ---
    toggleLogin: () => {
        const modal = document.getElementById('login-modal');
        if (modal) modal.classList.toggle('hidden');
    },

    toggleUserMenu: () => {
        const dropdown = document.getElementById('user-menu-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    },

    closeUserMenu: () => {
        const dropdown = document.getElementById('user-menu-dropdown');
        if (dropdown) {
            dropdown.classList.add('hidden');
        }
    },

    updateAuthUI: () => {
        const container = document.getElementById('desktop-auth-container');
        if (!container) return;

        if (state.currentUser) {
            container.innerHTML = `
                <div id="user-menu-container" class="relative">
                    <button onclick="app.toggleUserMenu()" class="flex items-center gap-3 focus:outline-none transition opacity-90 hover:opacity-100">
                        <span class="text-sm font-bold text-gray-700 dark:text-gray-200 hidden lg:block select-none">Hi, ${state.currentUser.name}</span>
                        <img src="${state.currentUser.avatar}" class="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-600 object-cover shadow-sm">
                    </button>
                    <div id="user-menu-dropdown" class="hidden absolute right-0 top-full mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 animate-fade-in z-50 overflow-hidden">
                        <div class="p-4 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30">
                            <div class="font-bold text-gray-800 dark:text-white truncate">${state.currentUser.name}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400 truncate">${state.currentUser.email || 'Thành viên'}</div>
                        </div>
                        <div class="border-t border-gray-100 dark:border-gray-700">
                            <button onclick="app.logout()" class="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <button onclick="app.toggleLogin()" class="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-bold transition shadow-md">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Đăng nhập
                </button>
            `;
        }
        renderMobileMenu();
    },

    loginGoogle: async () => {
        document.getElementById('login-loading').classList.remove('hidden');
        const user = await UserService.loginWithGoogle();
        document.getElementById('login-loading').classList.add('hidden');
        state.currentUser = user;
        app.updateAuthUI();
        app.toggleLogin(); 
        app.render(); 
        alert(`Chào mừng ${user.name} đã quay trở lại!`);
    },

    loginFacebook: async () => {
        document.getElementById('login-loading').classList.remove('hidden');
        const user = await UserService.loginWithFacebook();
        document.getElementById('login-loading').classList.add('hidden');
        state.currentUser = user;
        app.updateAuthUI();
        app.toggleLogin(); 
        app.render(); 
        alert(`Kết nối Facebook thành công! Chào ${user.name}.`);
    },

    logout: () => {
        if(confirm('Bạn có chắc muốn đăng xuất?')) {
            UserService.logout();
            state.currentUser = null;
            app.updateAuthUI();
            location.reload(); 
        }
    },

    // --- CÁC HÀM UI KHÁC ---
    toggleFooter: (id) => {
        const el = document.getElementById(id);
        const icon = document.getElementById('icon-' + id);
        if (el) {
            if (el.classList.contains('hidden')) {
                el.classList.remove('hidden');
                if(icon) icon.innerText = '-';
            } else {
                el.classList.add('hidden');
                if(icon) icon.innerText = '+';
            }
        }
    },

    scrollToFooter: () => {
        document.getElementById('main-footer').scrollIntoView({ behavior: 'smooth' });
    },

    toggleSubMenu: (id) => {
        const sub = document.getElementById(`m-sub-${id}`);
        const icon = document.getElementById(`m-icon-${id}`);
        if(sub) {
            if(sub.classList.contains('max-h-0')) {
                sub.classList.remove('max-h-0', 'hidden');
                sub.classList.add('max-h-[500px]');
                if(icon) {
                    icon.innerHTML = '-'; 
                    icon.classList.add('text-green-500');
                }
            } else {
                sub.classList.add('max-h-0');
                sub.classList.remove('max-h-[500px]');
                if(icon) {
                    icon.innerHTML = '+'; 
                    icon.classList.remove('text-green-500');
                }
            }
        }
    },

    toggleSearch: () => { 
        const modal = document.getElementById('search-modal');
        const input = document.getElementById('search-input');
        const results = document.getElementById('search-results');
        
        modal.classList.toggle('hidden');
        
        if (!modal.classList.contains('hidden')) {
            // Khi mở: Focus vào input
            setTimeout(() => input.focus(), 100);
        } else {
            // Khi đóng: Reset
            input.value = '';
            results.classList.add('hidden');
            results.innerHTML = '';
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
        
        if (res.length) {
            container.innerHTML = res.map(p => `
                <div onclick="app.viewPost('${p.slug}'); app.toggleSearch()" class="flex items-start gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors">
                    <img src="${p.image}" class="w-12 h-12 object-cover rounded flex-shrink-0">
                    <div>
                        <div class="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">${p.title}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">${p.excerpt}</div>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<div class="text-gray-500 dark:text-gray-400 p-4 text-center text-sm italic">Không tìm thấy kết quả phù hợp</div>';
        }
    },

    saveApiKey: () => { const k = document.getElementById('api-key-input').value; if(setApiKey(k)) app.render(); },
    resetApiKey: () => { localStorage.removeItem('GEMINI_API_KEY'); location.reload(); },
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
    handleFortuneCheck: handleFortuneCheck
};

// Cấu trúc Menu MỚI
const menuStructure = [
    { id: 'HOME', label: 'Trang chủ' },
    {
        id: 'TU_VI_GROUP', 
        label: 'Tử Vi & Số Mệnh',
        directAction: "app.filterGroup('TU_VI_GROUP')", 
        children: [
            { id: 'TU_VI', label: 'Tử Vi 2025', type: 'filter' },
            { id: 'THAN_SO_HOC', label: 'Thần Số Học', type: 'filter' },
            { id: 'LOVE', label: 'Bói Tình Duyên', type: 'view' }
        ]
    },
    { 
        id: 'PHONG_THUY_GROUP', 
        label: 'Phong Thủy & Khám Phá', 
        directAction: "app.filterGroup('PHONG_THUY_GROUP')", 
        children: [
            { id: 'PHONG_THUY', label: 'Xem Ngày Tốt Xấu', type: 'filter' }, // Dùng chung filter Phong Thủy
            { id: 'PHONG_THUY', label: 'Phong Thủy Nhà Ở', type: 'filter' },
            { id: 'VAN_KHAN', label: 'Văn Khấn Cổ Truyền', type: 'filter' }
        ]
    },
    {
        id: 'TOOLS_GROUP', 
        label: 'Trợ Lý & Công Cụ',
        children: [
            { id: 'ASSISTANT', label: 'Trợ Lý AI Chat', type: 'view' },
            { id: 'CALENDAR', label: 'Đổi Ngày Âm Dương', type: 'view' }
        ]
    }
];

function renderNav() {
     const desktopMenu = document.getElementById('desktop-menu');
     if(!desktopMenu) return;

     desktopMenu.innerHTML = menuStructure.map(item => {
         let isActive = false;
         if (item.id === state.currentGroup) {
             isActive = true;
         } else if (item.children) {
             isActive = item.children.some(c => {
                 if (state.viewingPost) {
                     return c.type === 'filter' && c.id === state.viewingPost.category;
                 }
                 if (state.currentCategory) {
                     return c.type === 'filter' && c.id === state.currentCategory;
                 }
                 if (c.type === 'view' && state.currentView === c.id) {
                     return true;
                 }
                 return false;
             });
         } else if (item.id === state.currentView) {
             isActive = true;
         }
         
         if (item.children) {
             const clickAttr = item.directAction ? `onclick="${item.directAction}"` : '';
             return `
                <div class="relative group h-full flex items-center">
                    <div ${clickAttr} class="px-3 py-2 rounded-lg cursor-pointer font-medium transition flex items-center gap-1 ${isActive ? 'text-green-700 dark:text-green-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-700'}">
                        ${item.label} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <div class="absolute top-full left-0 mt-0 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl rounded-lg overflow-hidden hidden group-hover:block z-50 animate-fade-in">
                        ${item.children.map(sub => {
                            const handler = sub.type === 'view' ? `app.navigate('${sub.id}')` : `app.filterBlog('${sub.id}')`;
                            return `<div onclick="this.parentElement.style.display='none'; ${handler}" class="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-700 dark:hover:text-green-400 cursor-pointer border-b border-gray-50 dark:border-gray-700 last:border-none font-medium">${sub.label}</div>`;
                        }).join('')}
                    </div>
                </div>`;
         }
         return `<div onclick="app.navigate('${item.id}')" class="px-4 py-2 rounded-lg cursor-pointer font-medium transition ${isActive ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-700'}">${item.label}</div>`;
     }).join('') + `<button onclick="app.toggleSearch()" class="ml-2 p-2 text-gray-400 dark:text-gray-300 hover:text-green-600 bg-gray-50 dark:bg-gray-700 rounded-full hover:bg-green-50 transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>`;
}

function renderMobileMenu() {
    const m = document.getElementById('mobile-menu');
    if (!m) return;
    
    // Header Dark Mode
    let html = `
    <!-- Header -->
    <div class="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div class="flex items-center gap-2">
             <div class="w-8 h-8 bg-green-600 rounded text-white flex items-center justify-center font-bold text-lg">L</div>
             <span class="font-bold text-xl text-green-700 dark:text-green-400 tracking-tight">LịchViệt.AI</span>
        </div>
        <div class="flex items-center gap-3">
            <button onclick="app.toggleTheme()" class="text-gray-500 dark:text-yellow-400">
               <svg id="m-icon-sun" class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
               <svg id="m-icon-moon" class="w-6 h-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            </button>
            <button onclick="app.closeMenu()" class="text-gray-800 dark:text-white hover:text-red-500 transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
    </div>

    <div class="bg-[#1a1a1a] dark:bg-black flex-1 overflow-y-auto text-white">
        
        <!-- USER INFO ON MOBILE MENU -->
        <div class="p-5 border-b border-gray-800">
            ${state.currentUser ? `
                <div class="flex items-center gap-3">
                    <img src="${state.currentUser.avatar}" class="w-12 h-12 rounded-full border-2 border-green-600 object-cover">
                    <div>
                        <div class="font-bold text-white text-lg">${state.currentUser.name}</div>
                        <div onclick="app.logout()" class="text-xs text-red-400 cursor-pointer hover:underline flex items-center gap-1 mt-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> 
                            Đăng xuất
                        </div>
                    </div>
                </div>
            ` : `
                <button onclick="app.toggleLogin(); app.closeMenu()" class="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow hover:bg-green-700 transition">
                    Đăng nhập ngay
                </button>
            `}
        </div>

        <!-- Social Icons (Mô phỏng Unitheme) -->
        <div class="px-5 py-6 flex gap-3 border-b border-gray-800">
            <!-- Facebook -->
            <a href="https://www.facebook.com/trang-cua-ban" target="_blank" class="w-10 h-10 rounded bg-[#252525] flex items-center justify-center hover:bg-[#1877F2] transition text-gray-400 hover:text-white" title="Facebook">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <!-- TikTok -->
            <a href="https://www.tiktok.com/@kenh-cua-ban" target="_blank" class="w-10 h-10 rounded bg-[#252525] flex items-center justify-center hover:bg-black hover:border hover:border-gray-700 transition text-gray-400 hover:text-white" title="TikTok">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.88-2.91 6.52-1.78 1.63-4.15 2.51-6.55 2.52-2.5-.02-4.96-1.05-6.66-2.92S-.25 15.98 0 13.52c.24-2.46 1.4-4.8 3.23-6.44a8.68 8.68 0 0 1 2.7-1.53v4.43c-.7.16-1.37.49-1.92.95a4.29 4.29 0 0 0-1.48 3.27 4.29 4.29 0 0 0 2.96 4.1 4.29 4.29 0 0 0 4.6-2.09c.75-1.19.98-2.61.9-4v-12.2z"/></svg>
            </a>
            <!-- YouTube -->
            <a href="https://www.youtube.com/@kenh-cua-ban" target="_blank" class="w-10 h-10 rounded bg-[#252525] flex items-center justify-center hover:bg-[#FF0000] transition text-gray-400 hover:text-white" title="YouTube">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <!-- Zalo -->
            <a href="https://zalo.me/sdt-cua-ban" target="_blank" class="w-10 h-10 rounded bg-[#252525] flex items-center justify-center hover:bg-[#0068FF] transition text-gray-400 hover:text-white font-bold text-xs" title="Zalo">
                Zalo
            </a>
        </div>

        <!-- Menu List -->
        <div class="flex flex-col">
    `;

    // Render danh sách menu (giữ nguyên logic)
    html += menuStructure.map(item => {
        if (item.children) {
            const textClick = item.directAction 
                ? `${item.directAction}; app.closeMenu()` 
                : `app.toggleSubMenu('${item.id}')`;
            
            return `
            <div class="border-b border-gray-800">
                <div class="flex justify-between items-center px-5 py-4 cursor-pointer hover:bg-[#252525] transition select-none group" onclick="${textClick}">
                    <span class="font-bold text-sm uppercase tracking-wider">${item.label}</span>
                    <span onclick="event.stopPropagation(); app.toggleSubMenu('${item.id}')" class="text-gray-500 text-lg leading-none font-light group-hover:text-white w-6 text-center" id="m-icon-${item.id}">+</span>
                </div>
                <div id="m-sub-${item.id}" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-[#202020]">
                    ${item.children.map(sub => {
                         const handler = sub.type === 'view' ? `app.navigate('${sub.id}')` : `app.filterBlog('${sub.id}')`;
                         return `<div onclick="${handler}; app.closeMenu()" class="block pl-8 pr-5 py-3 text-sm text-gray-400 hover:text-green-500 hover:pl-10 transition-all cursor-pointer border-t border-gray-800/50">${sub.label}</div>`;
                    }).join('')}
                </div>
            </div>`;
        }
        return `
        <div onclick="app.navigate('${item.id}'); app.closeMenu()" class="border-b border-gray-800 px-5 py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#252525] cursor-pointer transition">
            ${item.label}
        </div>`;
    }).join('');

    html += `
        </div>
        <div class="p-6 text-center text-xs text-gray-600 mt-4">
            &copy; 2025 Lịch Vạn Niên & Trợ Lý AI.<br>Powered by Google Gemini.
        </div>
    </div>`;
    
    m.innerHTML = html;
}

function renderTopBar() {
    const container = document.getElementById('top-bar');
    if (!container) return;
    const tags = [
        { label: "# Tết Bính Ngọ 2026", action: "app.viewPost('tet-2026-la-ngay-nao-em-nguoc-con-bao-nhieu-ngay')" },
        { label: "# Tử vi 2025", action: "app.filterBlog('TU_VI')" },
        { label: "# Văn khấn", action: "app.filterBlog('VAN_KHAN')" },
        { label: "# Sao Thái Bạch", action: "app.toggleSearch(); document.getElementById('search-input').value='sao'; app.handleSearchInput('sao')" }
    ];

    let trendHTML = `
        <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div class="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                    <div class="flex items-center gap-1 text-red-600 font-bold whitespace-nowrap text-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        Xu hướng:
                    </div>
                    ${tags.map(tag => `
                        <button onclick="${tag.action}" class="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-green-600 dark:hover:text-green-400 hover:border-green-200 transition whitespace-nowrap">
                            ${tag.label}
                        </button>
                    `).join('')}
                </div>
    `;

    let breadcrumbHTML = '';
    if (state.currentView !== 'HOME') {
        breadcrumbHTML = `
            <div class="flex items-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                <a onclick="app.navigate('HOME')" class="cursor-pointer hover:text-green-600 flex items-center gap-1">
                    <svg class="w-3.5 h-3.5 mb-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    Trang chủ
                </a>
        `;
        if (state.currentView === 'CALENDAR' || state.currentView === 'DAILY') {
            breadcrumbHTML += ` <span class="text-gray-300 dark:text-gray-600">»</span> <span class="text-gray-700 dark:text-gray-300 font-medium">Lịch Vạn Niên</span>`;
        } else if (state.currentView === 'ASSISTANT') {
            breadcrumbHTML += ` <span class="text-gray-300 dark:text-gray-600">»</span> <span class="text-gray-700 dark:text-gray-300 font-medium">Trợ Lý & Công Cụ</span> <span class="text-gray-300 dark:text-gray-600">»</span> <span class="text-gray-700 dark:text-gray-300 font-medium">Trợ Lý AI</span>`;
        } else if (state.currentView === 'LOVE') {
            breadcrumbHTML += ` <span class="text-gray-300 dark:text-gray-600">»</span> <a onclick="app.filterGroup('TU_VI_GROUP')" class="cursor-pointer hover:text-green-600">Tử Vi & Số Mệnh</a> <span class="text-gray-300 dark:text-gray-600">»</span> <span class="text-gray-700 dark:text-gray-300 font-medium">Bói Tình Duyên</span>`;
        } else if (state.currentView === 'BLOG') {
             let activeCat = state.currentCategory;
             let activeGroup = state.currentGroup;
             if (state.viewingPost && !activeCat) {
                 activeCat = state.viewingPost.category;
             }
             let groupInfo = null;
             if (activeCat) {
                 groupInfo = findGroupByCat(activeCat);
             } else if (activeGroup) {
                 groupInfo = GROUP_MAPPING[activeGroup];
                 groupInfo.groupId = activeGroup; 
             } else {
                 groupInfo = { label: 'Khám Phá', groupId: 'PHONG_THUY_GROUP' }; 
             }
             if (groupInfo) {
                 const groupAction = groupInfo.groupId || (findGroupByCat(activeCat)?.groupId);
                 const action = groupAction ? `app.filterGroup('${groupAction}')` : `app.navigate('BLOG')`;
                 breadcrumbHTML += ` <span class="text-gray-300 dark:text-gray-600">»</span> <a onclick="${action}" class="cursor-pointer hover:text-green-600">${groupInfo.label}</a>`;
             }
             if (activeCat) {
                 let catName = "Danh mục";
                 if(activeCat === 'TU_VI') catName = "Tử Vi";
                 else if(activeCat === 'THAN_SO_HOC') catName = "Thần Số Học";
                 else if(activeCat === 'PHONG_THUY') catName = "Phong Thủy";
                 else if(activeCat === 'VAN_KHAN') catName = "Văn Khấn";
                 else if(activeCat === 'LE_TET') catName = "Ngày Lễ Tết";
                 breadcrumbHTML += ` <span class="text-gray-300 dark:text-gray-600">»</span> <span onclick="app.filterBlog('${activeCat}')" class="cursor-pointer hover:text-green-600">${catName}</span>`;
             }
             if (state.viewingPost) {
                 breadcrumbHTML += ` <span class="text-gray-300 dark:text-gray-600">»</span> <span class="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[150px] md:max-w-xs block" title="${state.viewingPost.title}">${state.viewingPost.title}</span>`;
             }
        }
        breadcrumbHTML += `</div>`;
    }
    trendHTML += `
            </div>
            ${breadcrumbHTML ? `<div class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">${breadcrumbHTML}</div>` : ''}
        </div>
    `;
    container.innerHTML = trendHTML;
}

function renderAssistantLayout() {
    // Layout giữ nguyên
    const msgs = state.chatHistory.map(msg => `<div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}"><div class="chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-model'}">${msg.text}</div></div>`).join('');
    return `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
         <div class="lg:col-span-8">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-[600px] flex flex-col">
                <div class="bg-green-600 dark:bg-green-700 p-4 text-white font-bold flex items-center justify-between">
                    <div class="flex items-center gap-2"><span class="text-2xl">🤖</span><div><div>Trợ Lý AI</div><div class="text-xs text-green-100 font-normal">Gemini Pro</div></div></div>
                    <button onclick="app.resetApiKey()" class="text-xs bg-green-700 dark:bg-green-800 px-3 py-1.5 rounded">Cài đặt Key</button>
                </div>
                ${!hasApiKey() ? `<div class="flex-1 flex flex-col items-center justify-center p-8 text-center"><h3 class="font-bold mb-2 dark:text-white">Yêu cầu API Key</h3><input id="api-key-input" type="password" class="border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded w-full max-w-sm mb-3" placeholder="API Key..."><button onclick="app.saveApiKey()" class="bg-green-600 text-white px-4 py-2 rounded">Lưu</button></div>` : 
                `<div id="chat-box" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">${msgs}<div id="loading-indicator" class="hidden text-center text-gray-400 text-sm">Đang nhập...</div></div><div class="p-4 border-t dark:border-gray-700 flex gap-2"><input id="chat-input" class="flex-1 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full px-4 py-2" onkeydown="if(event.key==='Enter') app.sendMessage()"><button onclick="app.sendMessage()" class="bg-green-600 text-white p-2 rounded-full">Gửi</button></div>`}
            </div>
         </div>
         <div class="lg:col-span-4">${renderSidebar()}</div>
    </div>`;
}

window.app = app;
app.init();