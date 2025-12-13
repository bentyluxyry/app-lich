
import { getDayInfo } from '../calendar.js';

// --- ICONS (SVG Strings) ---
const ICONS = {
    HOME: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`,
    CALENDAR: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`,
    TU_VI: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>`,
    PHONG_THUY: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>`,
    TIEN_ICH: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`,
    CHEVRON_DOWN: `<svg class="w-3 h-3 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`
};

// --- MENU DATA ---
// Group Mapping vẫn giữ để hỗ trợ SEO sidebar, nhưng Menu chính sẽ dùng link trực tiếp
export const GROUP_MAPPING = {
    'TU_VI_GROUP': {
        label: 'Tử Vi & Số Mệnh',
        categories: ['TU_VI', 'THAN_SO_HOC'] 
    },
    'PHONG_THUY_GROUP': {
        label: 'Phong Thủy & Khám Phá',
        categories: ['PHONG_THUY', 'VAN_KHAN', 'LE_TET']
    }
};

export const MENU_ITEMS = [
    { 
        id: 'HOME', 
        label: 'Trang Chủ', 
        type: 'link', 
        icon: ICONS.HOME,
        action: "app.navigate('HOME')" 
    },
    { 
        id: 'CALENDAR', 
        label: 'Lịch Vạn Niên', 
        type: 'link', 
        icon: ICONS.CALENDAR,
        action: "app.navigate('CALENDAR')" 
    },
    { 
        id: 'KNOWLEDGE', 
        label: 'Kiến Thức', 
        type: 'dropdown',
        icon: ICONS.PHONG_THUY,
        items: [
            // Thay đổi logic: Gọi trực tiếp filterBlog để chỉ hiện bài của 1 danh mục duy nhất
            { label: 'Tử Vi 12 Con Giáp', action: "app.filterBlog('TU_VI')", icon: '🔮' },
            { label: 'Phong Thủy Đời Sống', action: "app.filterBlog('PHONG_THUY')", icon: '🏡' },
            { label: 'Thần Số Học', action: "app.navigate('NUMEROLOGY')", icon: '🔢' },
            { label: 'Văn Khấn Cổ Truyền', action: "app.filterBlog('VAN_KHAN')", icon: '🙏' },
            { label: 'Lễ Tết & Sự Kiện', action: "app.filterBlog('LE_TET')", icon: '🧨' }
        ]
    },
    { 
        id: 'TOOLS', 
        label: 'Tiện Ích', 
        type: 'dropdown',
        icon: ICONS.TIEN_ICH,
        items: [
            { label: 'Trợ Lý AI Chat', action: "app.navigate('ASSISTANT')", icon: '🤖' },
            { label: 'Bói Tình Duyên', action: "app.navigate('LOVE')", icon: '💘' },
            { label: 'Xem Ngày Tốt', action: "app.navigate('HOME')", icon: '📅' }
        ]
    }
];

// --- RENDERERS ---

export const renderTopBar = () => {
    const el = document.getElementById('top-bar');
    if (!el) return;
    const now = new Date();
    const lunarInfo = getDayInfo(now);
    el.innerHTML = `
        <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex justify-between items-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-4">
                <span>📅 Hôm nay: ${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} - Âm lịch: ${lunarInfo.lunar.day}/${lunarInfo.lunar.month}</span>
            </div>
            <div class="hidden md:flex gap-6">
                <a href="#" class="hover:text-green-600 cursor-pointer transition flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Giới thiệu
                </a>
                <a href="mailto:contact@lichviet.ai" class="hover:text-green-600 cursor-pointer transition flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    Liên hệ
                </a>
            </div>
        </div>
    `;
};

export const renderNav = (currentView) => {
    const el = document.getElementById('desktop-menu');
    if (!el) return;
    
    el.innerHTML = MENU_ITEMS.map(item => {
        let isActive = currentView === item.id;
        // Logic Active mở rộng
        if (item.id === 'KNOWLEDGE' && ['TU_VI', 'PHONG_THUY', 'VAN_KHAN', 'LE_TET', 'THAN_SO_HOC', 'BLOG', 'NUMEROLOGY', 'PHONG_THUY_GROUP'].includes(currentView)) isActive = true;
        if (item.id === 'TOOLS' && ['ASSISTANT', 'LOVE'].includes(currentView)) isActive = true;
        
        if (item.type === 'link') {
            return `
                <button onclick="${item.action}" class="group relative px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 font-medium text-sm ${isActive ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800'}">
                    ${item.icon}
                    <span>${item.label}</span>
                    ${isActive ? '<span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5 bg-green-500 rounded-full"></span>' : ''}
                </button>
            `;
        } else if (item.type === 'dropdown') {
            return `
                <div class="relative group h-full flex items-center px-1">
                    <button class="flex items-center gap-1.5 px-3 py-2 rounded-full font-medium text-sm transition-all duration-300 ${isActive ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800'}">
                        ${item.icon}
                        <span>${item.label}</span>
                        ${ICONS.CHEVRON_DOWN}
                    </button>
                    
                    <!-- Dropdown Panel -->
                    <div class="absolute left-0 top-full pt-4 w-64 hidden group-hover:block z-50 animate-fade-in origin-top-left transform transition-all duration-200">
                        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div class="py-2 grid gap-1">
                                ${item.items.map(sub => `
                                    <a onclick="${sub.action}" class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-700 dark:hover:text-green-400 cursor-pointer transition-colors border-l-4 border-transparent hover:border-green-500">
                                        <span class="text-lg bg-gray-100 dark:bg-gray-700 p-1.5 rounded-md group-hover:bg-white transition-colors">${sub.icon}</span>
                                        <span class="font-medium">${sub.label}</span>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');
};

export const renderMobileMenu = (currentView, currentUser) => {
    const el = document.getElementById('mobile-menu');
    if (!el) return;

    el.innerHTML = `
        <div class="p-5 flex items-center justify-between border-b border-gray-800 bg-[#151515]">
             <div class="font-bold text-lg text-white flex items-center gap-2">
                <span class="bg-green-600 text-white p-1 rounded">☰</span> Menu
             </div>
             <button onclick="app.closeMenu()" class="text-gray-400 hover:text-white bg-gray-800 p-1 rounded-full transition"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
        </div>
        <div class="flex-1 overflow-y-auto py-4 bg-[#1a1a1a]">
            <nav class="space-y-1 px-3">
                ${MENU_ITEMS.map(item => {
                    if (item.type === 'link') {
                        return `
                        <a onclick="${item.action}" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${currentView === item.id ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-800'} cursor-pointer">
                            <span class="${currentView === item.id ? 'text-white' : 'text-gray-400'}">${item.icon}</span>
                            ${item.label}
                        </a>`;
                    } else {
                        return `
                        <div class="space-y-1 pt-2">
                            <div class="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                ${item.icon} ${item.label}
                            </div>
                            <div class="space-y-1 pl-2 border-l border-gray-700 ml-4">
                                ${item.items.map(sub => `
                                    <a onclick="${sub.action}" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:text-green-400 hover:bg-gray-800/50 cursor-pointer transition-all">
                                        <span>${sub.icon}</span> ${sub.label}
                                    </a>
                                `).join('')}
                            </div>
                        </div>`;
                    }
                }).join('')}
            </nav>
        </div>
        
        <div class="p-4 border-t border-gray-800 bg-[#151515]">
            ${currentUser ? `
                <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700">
                    <img src="${currentUser.avatar}" class="w-10 h-10 rounded-full border-2 border-green-500">
                    <div class="flex-1 min-w-0">
                        <div class="text-white font-bold text-sm truncate">${currentUser.name}</div>
                        <div class="text-gray-500 text-xs cursor-pointer hover:text-red-400 mt-0.5 flex items-center gap-1" onclick="app.logout()">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            Đăng xuất
                        </div>
                    </div>
                </div>
            ` : `
                <button onclick="app.toggleLogin(); app.closeMenu()" class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-3.5 rounded-xl transition font-bold shadow-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                    Đăng nhập ngay
                </button>
            `}
        </div>
    `;
};
