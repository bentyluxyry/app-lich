import { initAI, generateContent, setApiKey, hasApiKey } from './ai.js';
import { getDayInfo, generateMonthGrid, formatWeekDay, renderDailyDetailHTML, renderCalendarGridHTML } from './calendar.js';
import { renderBlogList, renderBlogDetail } from './blog.js';
import { BlogService } from './service.js';
import { renderFortune, handleFortuneCheck } from './fortune.js';
import { renderHeroSection } from './components/hero.js'; // IMPORT MODULE MỚI

// --- CONFIGURATION ---
// Định nghĩa mối quan hệ giữa các danh mục con và nhóm cha để xử lý Breadcrumb và Filter
const GROUP_MAPPING = {
    'FENGSHUI_GROUP': {
        label: 'Phong Thủy - Tử Vi',
        categories: ['TU_VI', 'THAN_SO_HOC', 'PHONG_THUY']
    },
    'CULTURE_GROUP': {
        label: 'Văn Hóa & Blog',
        categories: ['VAN_KHAN', 'LE_TET']
    }
};

// Hàm tìm Group ID dựa trên Category ID
const findGroupByCat = (catId) => {
    for (const [groupId, data] of Object.entries(GROUP_MAPPING)) {
        if (data.categories.includes(catId)) return { groupId, label: data.label };
    }
    return null; // Mặc định hoặc không thuộc nhóm nào
};

// --- STATE ---
const state = {
  currentView: 'HOME',
  date: new Date(),
  viewingPost: null,
  currentCategory: null, // Đang xem 1 danh mục cụ thể (vd: Thần số học)
  currentGroup: null,    // Đang xem 1 nhóm danh mục (vd: Phong Thủy - Tử Vi)
  isMenuOpen: false,
  countdownInterval: null,
  chatHistory: []
};

// --- HELPERS ---
const startCountdown = () => {
    if (state.countdownInterval) clearInterval(state.countdownInterval);
    
    // Tết Bính Ngọ: 17/02/2026
    const tetDate = new Date('2026-02-17T00:00:00').getTime();

    const update = () => {
        const now = new Date().getTime();
        const dist = tetDate - now;
        
        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);

        // 1. Cập nhật cho các hiển thị dạng text đơn giản (Home, Bài cũ)
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

        // 2. Cập nhật cho Bài viết 11 (Giao diện Banner Hộp)
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

// --- COMPONENT GENERATORS ---
const getRelatedPostsHTML = (postId) => {
    const relatedPosts = BlogService.getRelatedPosts(postId);
    return `
        <div class="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden">
            <div class="border-l-4 border-green-600 px-4 py-3 bg-green-50 border-b border-green-100">
                <h3 class="font-bold text-green-800 uppercase text-sm tracking-wider">Bài viết liên quan</h3>
            </div>
            <div class="divide-y divide-gray-100">
                ${relatedPosts.map(p => `
                    <div class="p-3 hover:bg-gray-50 transition cursor-pointer flex gap-3 group" onclick="app.viewPost('${p.slug}')">
                        <img src="${p.image}" class="w-20 h-16 object-cover rounded-md flex-shrink-0">
                        <div>
                            <h4 class="text-sm font-medium text-gray-800 group-hover:text-green-600 line-clamp-2 leading-snug">${p.title}</h4>
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

    // Thay đổi: Giảm padding header từ px-4 xuống px-3, nội dung từ p-4 xuống p-3
    return `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="border-l-4 border-green-600 px-3 py-3 bg-gray-50 border-b border-gray-100">
                <h3 class="font-bold text-gray-800 uppercase text-sm tracking-wider">Dịch Vụ Chuyên Gia</h3>
            </div>
            <div class="divide-y divide-gray-50">
                ${services.map(s => `
                    <div class="p-3 flex items-center gap-3 hover:bg-green-50 transition cursor-pointer group" onclick="app.navigate('KNOWLEDGE')">
                        <img src="${s.img}" class="w-16 h-12 object-cover rounded-md shadow-sm group-hover:scale-105 transition">
                        <div>
                            <h4 class="font-bold text-gray-800 text-sm group-hover:text-green-700">${s.title}</h4>
                            <p class="text-xs text-gray-500 mt-0.5">${s.sub}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

const getAIWidgetHTML = () => {
    // Thay đổi: Giảm padding từ p-5 xuống p-4
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
    // 1. GỌI COMPONENT HERO SECTION MỚI
    const heroHTML = renderHeroSection();

    return `
        <!-- HERO SECTION (Đưa lên đầu) -->
        ${heroHTML}

        <!-- Tet Banner (Giữ lại nhưng bên dưới) -->
        <div class="mb-8 rounded-2xl overflow-hidden shadow-md bg-red-600 text-white relative">
             <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
             <div class="p-6 md:p-10 text-center relative z-10">
                 <h2 class="text-2xl md:text-3xl font-bold uppercase mb-2 text-yellow-300 drop-shadow-md">Sắp đến Tết Bính Ngọ 2026</h2>
                 <div id="timer-home" class="text-white text-lg md:text-2xl mt-2">Đang tải...</div>
             </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-8 space-y-8">
                <div id="daily-section">
                    <div class="flex items-center gap-2 mb-4 border-l-4 border-green-600 pl-3"><h2 class="text-xl font-bold text-gray-800 uppercase">Lịch Ngày</h2></div>
                    ${renderDailyDetailHTML(state.date)}
                </div>
                <div id="calendar-view-container">
                    <div class="flex items-center gap-2 mb-4 border-l-4 border-green-600 pl-3"><h2 class="text-xl font-bold text-gray-800 uppercase">Lịch Tháng</h2></div>
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
        initAI();
        const params = new URLSearchParams(window.location.search);
        const view = params.get('view');
        const slug = params.get('slug');
        
        if (view) {
            state.currentView = view;
            if (view === 'BLOG' && slug) {
                state.viewingPost = BlogService.getPostBySlug(slug);
            }
        }
        
        app.render();
        renderNav();
        renderMobileMenu();
    },

    render: () => {
        const main = document.getElementById('app');
        main.innerHTML = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        renderTopBar();

        if (state.currentView === 'HOME' || state.currentView === 'CALENDAR' || state.currentView === 'DAILY') {
            main.innerHTML = renderHome();
            setTimeout(startCountdown, 100);
            
            // Logic cuộn trang tự động dựa vào View
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
                let posts = [];
                let title = "Tất cả bài viết";

                if (state.currentCategory) {
                    // Lọc 1 danh mục
                    posts = BlogService.getPostsByCategory(state.currentCategory);
                    if(state.currentCategory === 'TU_VI') title = "Tử Vi";
                    else if(state.currentCategory === 'THAN_SO_HOC') title = "Thần Số Học";
                    else if(state.currentCategory === 'PHONG_THUY') title = "Phong Thủy - Xem Ngày Tốt";
                    else if(state.currentCategory === 'VAN_KHAN') title = "Văn Khấn Cổ Truyền";
                    else if(state.currentCategory === 'LE_TET') title = "Ngày Lễ Tết";
                } else if (state.currentGroup) {
                    // Lọc theo nhóm danh mục (Cha)
                    const groupData = GROUP_MAPPING[state.currentGroup];
                    if (groupData) {
                        posts = BlogService.getPostsByCategories(groupData.categories);
                        title = groupData.label;
                    }
                } else {
                    // Lấy hết
                    posts = BlogService.getAllPosts();
                }

                main.innerHTML = renderBlogList(posts, title);
            }
        } else if (state.currentView === 'LOVE') {
            main.innerHTML = `<div class="max-w-4xl mx-auto">${renderFortune()}</div>`;
        } else if (state.currentView === 'ASSISTANT') {
            main.innerHTML = renderAssistantLayout();
            const box = document.getElementById('chat-box');
            if(box) box.scrollTop = box.scrollHeight;
        } else if (state.currentView === 'KNOWLEDGE') {
             state.currentView = 'BLOG';
             state.currentCategory = null;
             state.currentGroup = null;
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
            state.viewingPost = post;
            state.currentView = 'BLOG';
            // Khi xem bài viết, reset filter để breadcrumb tính toán lại dựa trên post hiện tại
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
    
    // Lọc theo 1 danh mục con (vd: Tử Vi)
    filterBlog: (category) => {
        state.currentView = 'BLOG';
        state.viewingPost = null;
        state.currentCategory = category;
        state.currentGroup = null; // Reset group
        
        app.closeMenu();
        app.render();
        renderNav();
        renderMobileMenu();
    },

    // Lọc theo nhóm cha (vd: Phong Thủy - Tử Vi)
    filterGroup: (groupId) => {
        state.currentView = 'BLOG';
        state.viewingPost = null;
        state.currentCategory = null; // Reset category con
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
            // Open
            m.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            // Close
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

    // Xử lý đóng mở Footer trên Mobile
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

    // Scroll xuống Footer (cho menu Liên hệ)
    scrollToFooter: () => {
        document.getElementById('main-footer').scrollIntoView({ behavior: 'smooth' });
    },

    toggleSubMenu: (id) => {
        const sub = document.getElementById(`m-sub-${id}`);
        const arrow = document.getElementById(`m-arrow-${id}`);
        if(sub) {
            if(sub.classList.contains('max-h-0')) {
                sub.classList.remove('max-h-0', 'hidden');
                sub.classList.add('max-h-[500px]');
                if(arrow) arrow.style.transform = 'rotate(180deg)';
            } else {
                sub.classList.add('max-h-0');
                sub.classList.remove('max-h-[500px]');
                if(arrow) arrow.style.transform = 'rotate(0deg)';
            }
        }
    },

    toggleSearch: () => { document.getElementById('search-modal').classList.toggle('hidden'); document.getElementById('search-input').focus(); },
    handleSearchInput: (k) => {
        const res = BlogService.searchPosts(k);
        document.getElementById('search-results').innerHTML = res.length ? res.map(p => `<div onclick="app.viewPost('${p.slug}'); app.toggleSearch()" class="p-2 hover:bg-gray-100 cursor-pointer border-b">${p.title}</div>`).join('') : '<div class="text-gray-500 p-2">Không tìm thấy</div>';
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

// Cấu trúc Menu
const menuStructure = [
    { id: 'HOME', label: 'Trang chủ' },
    { 
        id: 'CALENDAR_GROUP', label: 'Lịch', 
        children: [
            { id: 'DAILY', label: 'Lịch Ngày', type: 'view' },
            { id: 'CALENDAR', label: 'Lịch Tháng', type: 'view' },
            { id: 'PHONG_THUY', label: 'Xem Ngày Tốt Xấu', type: 'filter' }
        ]
    },
    {
        id: 'FENGSHUI_GROUP', 
        label: 'Phong Thủy - Tử Vi',
        directAction: "app.filterGroup('FENGSHUI_GROUP')", // Click vào cha hiển thị tất cả
        children: [
            { id: 'LOVE', label: 'Bói Tình Duyên', type: 'view' },
            { id: 'TU_VI', label: 'Tử Vi', type: 'filter' },
            { id: 'THAN_SO_HOC', label: 'Thần Số Học', type: 'filter' },
            { id: 'PHONG_THUY', label: 'Phong Thủy Nhà Ở', type: 'filter' }
        ]
    },
    {
        id: 'CULTURE_GROUP', 
        label: 'Văn Hóa & Blog', 
        directAction: "app.filterGroup('CULTURE_GROUP')", // Click vào cha hiển thị tất cả
        children: [
            { id: 'VAN_KHAN', label: 'Văn Khấn Cổ Truyền', type: 'filter' },
            { id: 'LE_TET', label: 'Ngày Lễ Tết', type: 'filter' },
            { id: 'BLOG', label: 'Tất cả bài viết', type: 'view' }
        ]
    },
    {
        id: 'TOOLS_GROUP', label: 'Công Cụ',
        children: [
            { id: 'ASSISTANT', label: 'Trợ Lý AI', type: 'view' }
        ]
    }
];

function renderNav() {
     const desktopMenu = document.getElementById('desktop-menu');
     if(!desktopMenu) return;

     desktopMenu.innerHTML = menuStructure.map(item => {
         let isActive = false;
         
         // --- LOGIC HIGHLIGHT MỚI (CHẶT CHẼ HƠN) ---
         
         // 1. Nếu đang chọn đúng Nhóm cha (click vào tên nhóm)
         if (item.id === state.currentGroup) {
             isActive = true;
         } 
         // 2. Nếu không chọn nhóm, kiểm tra các con
         else if (item.children) {
             isActive = item.children.some(c => {
                 // Ưu tiên 1: Đang xem bài viết chi tiết
                 // -> Highlight nếu danh mục của bài viết thuộc nhóm này
                 if (state.viewingPost) {
                     return c.type === 'filter' && c.id === state.viewingPost.category;
                 }

                 // Ưu tiên 2: Đang lọc theo Danh mục cụ thể
                 // -> Highlight nếu danh mục đang chọn thuộc nhóm này
                 if (state.currentCategory) {
                     return c.type === 'filter' && c.id === state.currentCategory;
                 }

                 // Ưu tiên 3: Chỉ là View chung (vd: Trang chủ, Lịch) 
                 // -> Highlight nếu View ID trùng khớp VÀ không đang xem bài viết/category nào khác
                 // (Điều kiện này giúp tránh việc 'BLOG' trong nhóm Văn Hóa sáng lên khi đang xem 'Tử Vi' thuộc nhóm Phong Thủy)
                 if (c.type === 'view' && state.currentView === c.id) {
                     return !state.currentCategory && !state.viewingPost;
                 }

                 return false;
             });
         } 
         // 3. Menu đơn lẻ (không con)
         else if (item.id === state.currentView) {
             isActive = true;
         }
         
         if (item.children) {
             const clickAttr = item.directAction ? `onclick="${item.directAction}"` : '';
             
             return `
                <div class="relative group h-full flex items-center">
                    <div ${clickAttr} class="px-3 py-2 rounded-lg cursor-pointer font-medium transition flex items-center gap-1 ${isActive ? 'text-green-700 font-bold' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}">
                        ${item.label} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <div class="absolute top-full left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden hidden group-hover:block z-50 animate-fade-in">
                        ${item.children.map(sub => {
                            const handler = sub.type === 'view' ? `app.navigate('${sub.id}')` : `app.filterBlog('${sub.id}')`;
                            return `<div onclick="this.parentElement.style.display='none'; ${handler}" class="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer border-b border-gray-50 last:border-none font-medium">${sub.label}</div>`;
                        }).join('')}
                    </div>
                </div>`;
         }
         return `<div onclick="app.navigate('${item.id}')" class="px-4 py-2 rounded-lg cursor-pointer font-medium transition ${isActive ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}">${item.label}</div>`;
     }).join('') + `<button onclick="app.toggleSearch()" class="ml-2 p-2 text-gray-400 hover:text-green-600 bg-gray-50 rounded-full hover:bg-green-50 transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>`;
}

function renderMobileMenu() {
    const m = document.getElementById('mobile-menu');
    if (!m) return;
    
    // Header của Sidebar Menu
    let html = `
    <div class="bg-[#1a1a1a] text-white p-4 flex justify-between items-center shadow-md">
        <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-green-600 rounded flex items-center justify-center font-bold text-lg">L</div>
            <span class="font-bold text-lg tracking-tight">LịchViệt.AI</span>
        </div>
        <button onclick="app.closeMenu()" class="text-gray-400 hover:text-white p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
    </div>
    <div class="bg-gray-100 p-4 border-b border-gray-200">
         <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
             </div>
             <div>
                 <div class="font-bold text-gray-800 text-sm">Xin chào, Khách</div>
                 <div class="text-xs text-green-600 cursor-pointer">Đăng nhập / Đăng ký</div>
             </div>
         </div>
    </div>
    <div class="flex-1 overflow-y-auto">
        <div class="py-2">
    `;

    // Render danh sách menu
    html += menuStructure.map(item => {
        if (item.children) {
            const textClick = item.directAction 
                ? `${item.directAction}; app.closeMenu()` 
                : `app.toggleSubMenu('${item.id}')`;
            
            return `
            <div class="border-b border-gray-100 last:border-none">
                <div class="flex justify-between items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition" onclick="${textClick}">
                    <span class="font-bold text-gray-800 text-sm">${item.label}</span>
                    <span onclick="event.stopPropagation(); app.toggleSubMenu('${item.id}')" class="p-2 -mr-2 text-gray-400">
                        <svg id="m-arrow-${item.id}" class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                </div>
                <div id="m-sub-${item.id}" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-gray-50">
                    ${item.children.map(sub => {
                         const handler = sub.type === 'view' ? `app.navigate('${sub.id}')` : `app.filterBlog('${sub.id}')`;
                         return `<div onclick="${handler}; app.closeMenu()" class="block pl-8 pr-4 py-3 text-sm font-medium text-gray-600 hover:text-green-700 cursor-pointer border-t border-gray-100/50">${sub.label}</div>`;
                    }).join('')}
                </div>
            </div>`;
        }
        return `
        <div onclick="app.navigate('${item.id}'); app.closeMenu()" class="border-b border-gray-100 last:border-none px-4 py-3 font-bold text-gray-800 text-sm hover:bg-gray-50 cursor-pointer">
            ${item.label}
        </div>`;
    }).join('');

    html += `
        </div>
        <div class="p-4 mt-2">
            <button onclick="app.scrollToFooter(); app.closeMenu()" class="w-full border border-gray-300 rounded-lg py-2 text-sm text-gray-600 font-medium hover:border-green-500 hover:text-green-600 transition">Liên hệ & Hỗ trợ</button>
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
                        <button onclick="${tag.action}" class="px-3 py-1 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-green-600 hover:border-green-200 transition whitespace-nowrap">
                            ${tag.label}
                        </button>
                    `).join('')}
                </div>
    `;

    let breadcrumbHTML = '';
    
    // --- LOGIC BREADCRUMB MỚI ---
    if (state.currentView !== 'HOME') {
        breadcrumbHTML = `
            <div class="flex items-center gap-2 text-xs md:text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                <a onclick="app.navigate('HOME')" class="cursor-pointer hover:text-green-600 flex items-center gap-1">
                    <svg class="w-3.5 h-3.5 mb-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    Trang chủ
                </a>
        `;

        if (state.currentView === 'CALENDAR' || state.currentView === 'DAILY') {
            breadcrumbHTML += ` <span class="text-gray-300">»</span> <span class="text-gray-700 font-medium">Lịch Vạn Niên</span>`;
        } else if (state.currentView === 'ASSISTANT') {
            breadcrumbHTML += ` <span class="text-gray-300">»</span> <span class="text-gray-700 font-medium">Công Cụ</span> <span class="text-gray-300">»</span> <span class="text-gray-700 font-medium">Trợ Lý AI</span>`;
        } else if (state.currentView === 'LOVE') {
            breadcrumbHTML += ` <span class="text-gray-300">»</span> <a onclick="app.filterGroup('FENGSHUI_GROUP')" class="cursor-pointer hover:text-green-600">Phong Thủy - Tử Vi</a> <span class="text-gray-300">»</span> <span class="text-gray-700 font-medium">Bói Tình Duyên</span>`;
        } else if (state.currentView === 'BLOG') {
             // 1. Xác định Danh mục & Nhóm cha
             let activeCat = state.currentCategory;
             let activeGroup = state.currentGroup;

             // Nếu đang xem bài viết, lấy category từ bài viết
             if (state.viewingPost && !activeCat) {
                 activeCat = state.viewingPost.category;
             }

             // Nếu có category, tìm Group cha của nó
             let groupInfo = null;
             if (activeCat) {
                 groupInfo = findGroupByCat(activeCat);
             } else if (activeGroup) {
                 groupInfo = GROUP_MAPPING[activeGroup];
                 groupInfo.groupId = activeGroup; // Gán ID để dùng lại action
             } else {
                 // Trường hợp "Tất cả bài viết" hoặc không thuộc nhóm nào
                 groupInfo = { label: 'Văn Hóa & Blog', groupId: 'CULTURE_GROUP' }; 
             }

             // 2. Render Breadcrumb Nhóm Cha
             if (groupInfo) {
                 // Nếu biết Group ID thì click vào sẽ filter theo group đó
                 const groupAction = groupInfo.groupId || (findGroupByCat(activeCat)?.groupId);
                 const action = groupAction ? `app.filterGroup('${groupAction}')` : `app.navigate('BLOG')`;
                 
                 breadcrumbHTML += ` <span class="text-gray-300">»</span> <a onclick="${action}" class="cursor-pointer hover:text-green-600">${groupInfo.label}</a>`;
             }

             // 3. Render Breadcrumb Danh mục con (nếu đang filter hoặc xem bài viết)
             if (activeCat) {
                 let catName = "Danh mục";
                 if(activeCat === 'TU_VI') catName = "Tử Vi";
                 else if(activeCat === 'THAN_SO_HOC') catName = "Thần Số Học";
                 else if(activeCat === 'PHONG_THUY') catName = "Phong Thủy";
                 else if(activeCat === 'VAN_KHAN') catName = "Văn Khấn";
                 else if(activeCat === 'LE_TET') catName = "Ngày Lễ Tết";
                 
                 breadcrumbHTML += ` <span class="text-gray-300">»</span> <span onclick="app.filterBlog('${activeCat}')" class="cursor-pointer hover:text-green-600">${catName}</span>`;
             }

             // 4. Render Tên bài viết
             if (state.viewingPost) {
                 breadcrumbHTML += ` <span class="text-gray-300">»</span> <span class="text-gray-900 font-medium truncate max-w-[150px] md:max-w-xs block" title="${state.viewingPost.title}">${state.viewingPost.title}</span>`;
             }
        }
        breadcrumbHTML += `</div>`;
    }

    trendHTML += `
            </div>
            ${breadcrumbHTML ? `<div class="mt-2 pt-2 border-t border-gray-100">${breadcrumbHTML}</div>` : ''}
        </div>
    `;

    container.innerHTML = trendHTML;
}

function renderAssistantLayout() {
    const msgs = state.chatHistory.map(msg => `<div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}"><div class="chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-model'}">${msg.text}</div></div>`).join('');
    return `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
         <div class="lg:col-span-8">
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-[600px] flex flex-col">
                <div class="bg-green-600 p-4 text-white font-bold flex items-center justify-between">
                    <div class="flex items-center gap-2"><span class="text-2xl">🤖</span><div><div>Trợ Lý AI</div><div class="text-xs text-green-100 font-normal">Gemini Pro</div></div></div>
                    <button onclick="app.resetApiKey()" class="text-xs bg-green-700 px-3 py-1.5 rounded">Cài đặt Key</button>
                </div>
                ${!hasApiKey() ? `<div class="flex-1 flex flex-col items-center justify-center p-8 text-center"><h3 class="font-bold mb-2">Yêu cầu API Key</h3><input id="api-key-input" type="password" class="border p-2 rounded w-full max-w-sm mb-3" placeholder="API Key..."><button onclick="app.saveApiKey()" class="bg-green-600 text-white px-4 py-2 rounded">Lưu</button></div>` : 
                `<div id="chat-box" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">${msgs}<div id="loading-indicator" class="hidden text-center text-gray-400 text-sm">Đang nhập...</div></div><div class="p-4 border-t flex gap-2"><input id="chat-input" class="flex-1 border rounded-full px-4 py-2" onkeydown="if(event.key==='Enter') app.sendMessage()"><button onclick="app.sendMessage()" class="bg-green-600 text-white p-2 rounded-full">Gửi</button></div>`}
            </div>
         </div>
         <div class="lg:col-span-4">${renderSidebar()}</div>
    </div>`;
}

window.app = app;
app.init();