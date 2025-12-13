
import { AccessControl } from './accessControl.js';
import { BlogService } from './service.js';

// --- TRÌNH ĐỌC BÀI VIẾT (TEXT TO SPEECH) ---
const SpeechPlayer = {
    synth: window.speechSynthesis,
    queue: [],          
    currentIndex: 0,
    isPlaying: false,
    isPaused: false,
    currentUtterance: null,
    playerElementId: 'audio-player-bar',

    // Kích hoạt từ nút "Nghe bài viết"
    start: () => {
        // Luôn khởi tạo lại để lấy nội dung mới nhất
        SpeechPlayer.init();
        SpeechPlayer.play();
    },

    init: () => {
        // Reset trạng thái
        SpeechPlayer.synth.cancel();
        SpeechPlayer.queue = [];
        SpeechPlayer.currentIndex = 0;

        const titleEl = document.getElementById('post-title-speech');
        const contentEl = document.getElementById('post-content-speech');

        if (!titleEl || !contentEl) return;

        // Xử lý DOM
        SpeechPlayer.processElementNodes(titleEl);
        SpeechPlayer.processElementNodes(contentEl);
    },

    processElementNodes: (element) => {
        if (!element) return;
        const skipTags = ['SCRIPT', 'STYLE', 'SVG', 'BUTTON', 'FIGCAPTION'];
        if (skipTags.includes(element.tagName) || element.classList.contains('toc-container')) return;

        const nodes = Array.from(element.childNodes);
        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue.trim();
                if (text.length > 0) {
                    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
                    if (sentences) {
                        const fragment = document.createDocumentFragment();
                        sentences.forEach(sentence => {
                            if (sentence.trim().length === 0) return;
                            const span = document.createElement('span');
                            span.className = 'speech-segment transition-all duration-300 rounded px-0.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700';
                            span.textContent = sentence;
                            span.onclick = (e) => {
                                e.stopPropagation();
                                const idx = SpeechPlayer.queue.findIndex(i => i.element === span);
                                if(idx !== -1) SpeechPlayer.jumpTo(idx);
                            };
                            SpeechPlayer.queue.push({ text: sentence.trim(), element: span });
                            fragment.appendChild(span);
                            if (!sentence.match(/[.!?]$/)) fragment.appendChild(document.createTextNode(' '));
                        });
                        node.replaceWith(fragment);
                    }
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                SpeechPlayer.processElementNodes(node);
            }
        });
    },

    play: () => {
        if (SpeechPlayer.queue.length === 0) return;

        if (SpeechPlayer.isPaused) {
            SpeechPlayer.synth.resume();
            SpeechPlayer.isPaused = false;
            SpeechPlayer.isPlaying = true;
            SpeechPlayer.updateUI(true);
            return;
        }

        if (!SpeechPlayer.isPlaying) {
            SpeechPlayer.isPlaying = true;
            // QUAN TRỌNG: Đưa thanh player ra body để thoát khỏi mọi container
            SpeechPlayer.movePlayerToBody();
            // Show player immediately
            SpeechPlayer.showPlayer();
            SpeechPlayer.speakNextChunk();
        }
        SpeechPlayer.updateUI(true);
    },

    speakNextChunk: () => {
        SpeechPlayer.clearHighlight();

        if (SpeechPlayer.currentIndex >= SpeechPlayer.queue.length) {
            SpeechPlayer.isPlaying = false;
            SpeechPlayer.currentIndex = 0;
            SpeechPlayer.updateUI(false);
            setTimeout(() => SpeechPlayer.stop(), 3000); 
            return;
        }

        if (!SpeechPlayer.isPlaying) {
            SpeechPlayer.updateUI(false);
            return;
        }

        const item = SpeechPlayer.queue[SpeechPlayer.currentIndex];
        
        if (item.element) {
            item.element.classList.add('bg-yellow-300', 'text-gray-900', 'shadow-sm');
            item.element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }

        const utterance = new SpeechSynthesisUtterance(item.text);
        utterance.lang = 'vi-VN';
        utterance.rate = 1.0;

        utterance.onend = () => {
            if (SpeechPlayer.isPlaying && !SpeechPlayer.isPaused) {
                SpeechPlayer.currentIndex++;
                SpeechPlayer.speakNextChunk();
            }
        };

        utterance.onerror = (e) => {
            console.error("Speech Error", e);
            SpeechPlayer.currentIndex++;
            if (SpeechPlayer.isPlaying) SpeechPlayer.speakNextChunk();
        };

        SpeechPlayer.currentUtterance = utterance;
        SpeechPlayer.synth.speak(utterance);
    },

    clearHighlight: () => {
        const actives = document.querySelectorAll('.speech-segment.bg-yellow-300');
        actives.forEach(el => el.classList.remove('bg-yellow-300', 'text-gray-900', 'shadow-sm'));
    },

    jumpTo: (index) => {
        SpeechPlayer.synth.cancel();
        SpeechPlayer.currentIndex = index;
        SpeechPlayer.isPlaying = true;
        SpeechPlayer.isPaused = false;
        SpeechPlayer.updateUI(true);
        SpeechPlayer.movePlayerToBody();
        SpeechPlayer.showPlayer();
        SpeechPlayer.speakNextChunk();
    },

    pause: () => {
        if (SpeechPlayer.isPlaying && !SpeechPlayer.isPaused) {
            SpeechPlayer.synth.pause();
            SpeechPlayer.isPaused = true;
            SpeechPlayer.updateUI(false);
        }
    },

    stop: (hideUI = true) => {
        SpeechPlayer.isPlaying = false;
        SpeechPlayer.isPaused = false;
        SpeechPlayer.clearHighlight();
        SpeechPlayer.currentIndex = 0;
        SpeechPlayer.synth.cancel();
        SpeechPlayer.updateUI(false);
        if (hideUI) SpeechPlayer.hidePlayer();
    },

    toggle: () => {
        if (SpeechPlayer.isPaused || !SpeechPlayer.isPlaying) {
            SpeechPlayer.play();
        } else {
            SpeechPlayer.pause();
        }
    },

    // --- DOM MANIPULATION ---
    movePlayerToBody: () => {
        const bar = document.getElementById(SpeechPlayer.playerElementId);
        if (bar && bar.parentElement !== document.body) {
            document.body.appendChild(bar);
        }
    },

    cleanup: () => {
        SpeechPlayer.stop();
        const bar = document.getElementById(SpeechPlayer.playerElementId);
        if (bar) bar.remove();
    },

    showPlayer: () => {
        const bar = document.getElementById(SpeechPlayer.playerElementId);
        if (bar) bar.classList.remove('-translate-y-full');
    },

    hidePlayer: () => {
        const bar = document.getElementById(SpeechPlayer.playerElementId);
        if (bar) bar.classList.add('-translate-y-full');
    },

    updateUI: (isPlaying) => {
        const btnIcon = document.getElementById('audio-play-icon');
        const statusText = document.getElementById('audio-status-text');
        if (!btnIcon) return;
        
        if (isPlaying) {
            // Icon Pause (Hai gạch dọc đậm)
            btnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 9v6m4-6v6" />`; 
            if(statusText) statusText.innerText = "Đang đọc...";
        } else {
            // Icon Play (Tam giác đậm)
            btnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
            if(statusText) statusText.innerText = "Đã tạm dừng";
        }
    }
};

window.appSpeech = SpeechPlayer;


function processContentWithTOC(htmlContent) {
    if (!htmlContent) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headers = doc.querySelectorAll('h2, h3');

    if (headers.length === 0) return htmlContent;

    const tocContainer = doc.createElement('div');
    tocContainer.className = "toc-container my-8 glass-card rounded-xl overflow-hidden shadow-sm transition-all duration-300 border border-gray-100 dark:border-gray-700/50";
    
    tocContainer.innerHTML = `
        <div class="p-4 bg-white/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700/50 flex justify-between items-center cursor-pointer group backdrop-blur-sm select-none" onclick="const body = this.nextElementSibling; body.classList.toggle('hidden'); const icon = this.querySelector('.toc-icon'); icon.style.transform = body.classList.contains('hidden') ? 'rotate(-90deg)' : 'rotate(0deg)';">
            <span class="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm uppercase tracking-wide">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                </span>
                Mục Lục Bài Viết
            </span>
            <svg class="toc-icon w-5 h-5 text-gray-400 group-hover:text-green-600 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
        <div class="p-4 bg-transparent">
            <ul class="space-y-2 text-sm" id="toc-list"></ul>
        </div>
    `;

    const ul = tocContainer.querySelector('ul');

    headers.forEach((header, index) => {
        let id = header.id;
        if (!id) {
            const slug = header.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
            id = `toc-${slug}-${index}`;
            header.id = id;
        }

        const li = doc.createElement('li');
        const isH3 = header.tagName === 'H3';
        const indentClass = isH3 ? "ml-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700 hover:border-green-500" : "font-semibold";
        li.className = `${indentClass} transition-colors`;
        
        const anchor = doc.createElement('a');
        anchor.href = `#${id}`;
        anchor.className = "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 block py-1 line-clamp-1 transition-colors cursor-pointer";
        anchor.textContent = header.textContent;
        
        anchor.setAttribute("onclick", `event.preventDefault(); const t = document.getElementById('${id}'); if(t) { const y = t.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({top: y, behavior: 'smooth'}); t.classList.remove('highlight-scan'); setTimeout(() => t.classList.add('highlight-scan'), 600); setTimeout(() => t.classList.remove('highlight-scan'), 4000); } return false;`);

        li.appendChild(anchor);
        ul.appendChild(li);
    });

    const firstP = doc.querySelector('p');
    if (firstP && firstP.nextSibling) {
        firstP.parentNode.insertBefore(tocContainer, firstP.nextSibling);
    } else {
        doc.body.insertBefore(tocContainer, doc.body.firstChild);
    }

    return doc.body.innerHTML;
}

const renderInlineAIChat = (postTitle) => {
    return `
    <div class="mt-10 border-t-4 border-purple-100 dark:border-purple-900/50 pt-8" id="inline-ai-chat-section">
        <div class="glass-card bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-gray-800/80 dark:to-gray-900/80 rounded-2xl p-6 md:p-8 border border-purple-100 dark:border-gray-700 shadow-inner">
            <div class="text-center mb-6">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white text-2xl mb-3 shadow-lg animate-bounce">🤖</div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Thắc mắc về ${postTitle}?</h2>
                <p class="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mt-2 text-sm">AI Phong Thủy sẵn sàng giải đáp chi tiết hơn cho riêng tuổi của bạn.</p>
            </div>
            <div id="zodiac-chat-history" class="bg-white/60 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-700 h-[250px] overflow-y-auto p-4 mb-4 custom-scrollbar space-y-4 backdrop-blur-sm">
                <div class="flex justify-start">
                    <div class="bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-200 px-4 py-2 rounded-2xl rounded-tl-none text-sm">Chào bạn, tôi đã đọc xong bài viết trên. Bạn cần hỏi thêm điều gì không?</div>
                </div>
            </div>
            <div class="relative">
                <input id="zodiac-chat-input" type="text" placeholder="Nhập câu hỏi của bạn..." class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full pl-5 pr-14 py-3 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm dark:text-white text-sm" onkeydown="if(event.key==='Enter') app.handleZodiacChat()">
                <button onclick="app.handleZodiacChat()" class="absolute right-1.5 top-1.5 bottom-1.5 bg-purple-600 hover:bg-purple-700 text-white w-10 rounded-full flex items-center justify-center shadow-md transition-transform transform active:scale-95"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></button>
            </div>
        </div>
    </div>`;
};

export function renderBlogList(posts, title = "Kiến Thức Phong Thủy") {
    if (posts.length === 0) return `<div class="text-center py-10 text-gray-500 dark:text-gray-400">Chưa có bài viết nào trong mục này.</div>`;
    const catMap = { 'TU_VI': 'Tử Vi', 'THAN_SO_HOC': 'Thần Số Học', 'PHONG_THUY': 'Phong Thủy', 'VAN_KHAN': 'Văn Khấn', 'LE_TET': 'Lễ Tết' };

    return `
        <div class="space-y-6 animate-fade-in">
            <div class="text-center py-6">
                <h1 class="text-3xl font-bold text-green-800 dark:text-green-400">${title}</h1>
                <p class="text-gray-600 dark:text-gray-300 mt-2">Cập nhật những thông tin hữu ích mỗi ngày</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${posts.map(post => {
                    const resolvedImg = BlogService.resolveImagePath(post.image);
                    const catName = catMap[post.category] || 'Tin Tức';
                    return `
                    <div class="glass-card rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group h-full relative border border-gray-100 dark:border-gray-700/50">
                        ${post.isPremium ? '<div class="absolute top-2 left-2 z-20 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded shadow-md flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>VIP</div>' : ''}
                        <div class="h-48 overflow-hidden relative cursor-pointer" onclick="app.viewPost('${post.slug}')">
                            <img src="${resolvedImg}" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" loading="lazy" alt="${post.title}">
                        </div>
                        <div class="p-5 flex-1 flex flex-col">
                            <div class="text-xs font-bold text-green-600 dark:text-green-400 mb-2 uppercase tracking-wide">${catName}</div>
                            <h3 onclick="app.viewPost('${post.slug}')" class="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 hover:text-green-600 dark:hover:text-green-400 cursor-pointer line-clamp-2 leading-snug">${post.title}</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1 text-justify">${post.excerpt}</p>
                            <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50 mt-auto">
                                <div class="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs font-medium"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span>${post.date}</span></div>
                            </div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>
    `;
}

export function renderBlogDetail(post) {
    const canView = AccessControl.canViewPost(post);
    const contentWithTOC = canView ? processContentWithTOC(post.content) : '';
    const catName = {'TU_VI': 'Tử Vi', 'THAN_SO_HOC': 'Thần Số Học', 'PHONG_THUY': 'Phong Thủy', 'VAN_KHAN': 'Văn Khấn', 'LE_TET': 'Lễ Tết'}[post.category] || 'Tin Tức';
    const showAIChat = canView && post.category === 'TU_VI';
    const resolvedImage = BlogService.resolveImagePath(post.image);
    const dateParts = post.date.split('/');
    const isoDate = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : new Date().toISOString().split('T')[0];

    // FIX: Xóa player cũ (nếu có) NGAY LẬP TỨC để tránh trùng lặp
    const oldPlayer = document.getElementById('audio-player-bar');
    if (oldPlayer) oldPlayer.remove();
    
    // Reset state player nhưng không gọi cleanup (vì cleanup xóa ID)
    if(window.appSpeech) window.appSpeech.stop(false);

    return `
        <!-- AUDIO PLAYER BAR (COMPACT & MODERN) -->
        <div id="audio-player-bar" class="fixed top-0 left-0 right-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-green-200 dark:border-green-900 z-[10000] transform -translate-y-full transition-transform duration-300 flex items-center justify-between px-3 py-2">
            <div class="flex items-center gap-2 overflow-hidden flex-1">
                <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex-shrink-0 flex items-center justify-center text-green-600 dark:text-green-400 animate-pulse">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                </div>
                <div class="flex flex-col min-w-0">
                    <span id="audio-status-text" class="text-[9px] text-green-600 dark:text-green-400 font-bold uppercase tracking-wide">Đang đọc</span>
                    <span class="text-xs md:text-sm font-bold text-gray-800 dark:text-white truncate pr-2 leading-tight">${post.title}</span>
                </div>
            </div>
            
            <!-- CỤM NÚT ĐIỀU KHIỂN -->
            <div class="flex items-center gap-3 flex-shrink-0">
                <button onclick="window.appSpeech.toggle()" class="w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition-all shadow-md focus:outline-none active:scale-95 border border-transparent hover:scale-105">
                    <svg id="audio-play-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 9v6m4-6v6" />
                    </svg>
                </button>
                <button onclick="window.appSpeech.stop()" class="w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-300 transition-all flex items-center justify-center focus:outline-none active:scale-95 border border-red-200 dark:border-red-800 hover:scale-105" title="Tắt">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="glass-card rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 overflow-hidden animate-fade-in p-0 md:p-6 transition-colors">
            <!-- Breadcrumb -->
            <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1 pt-3 pb-2 px-4 font-medium overflow-x-auto whitespace-nowrap no-scrollbar w-full leading-6 select-none border-b border-gray-100 dark:border-gray-800 md:border-none md:pb-0 md:px-0 md:pt-0">
                <a onclick="app.navigate('HOME')" class="hover:text-green-600 cursor-pointer transition-colors flex items-center gap-1 shrink-0 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
                    <svg class="w-3.5 h-3.5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>Trang chủ
                </a>
                <span class="text-gray-300 dark:text-gray-600 shrink-0 text-xs">/</span>
                <a onclick="app.filterBlog('${post.category}')" class="hover:text-green-600 cursor-pointer transition-colors shrink-0 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">${catName}</a>
            </nav>

            <h1 id="post-title-speech" class="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug font-sans tracking-tight text-gray-900 dark:text-white mb-4 mt-2 px-4 md:px-0">${post.title}</h1>

            <!-- HEADER BÀI VIẾT (LAYOUT MỚI - FIX XO LE TRÊN MOBILE) -->
            <div class="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100 dark:border-gray-700/50 px-4 md:px-0">
                <!-- NHÓM TRÁI: Avatar, Tác giả, Ngày (Xếp dọc) -->
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex-shrink-0 flex items-center justify-center text-green-700 dark:text-green-300 font-bold text-xs uppercase shadow-sm">
                        ${(post.author || 'BT').substring(0,2)}
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-gray-800 dark:text-gray-200 text-sm leading-tight">${post.author || 'Ban Biên Tập'}</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            ${post.date}
                        </span>
                    </div>
                </div>
                
                <!-- NHÓM PHẢI: Nút nghe & VIP -->
                <div class="flex items-center gap-2">
                    ${post.isPremium ? '<span class="text-[10px] font-bold bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-1 rounded uppercase tracking-wider hidden sm:inline-block">VIP</span>' : ''}
                    
                    <button onclick="window.appSpeech.start()" class="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-full transition-all shadow-sm active:scale-95 group whitespace-nowrap">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <!-- Chữ A (Dịch sang trái) -->
                            <path d="M4 19L9 5L14 19"></path>
                            <path d="M6 14h6"></path>
                            
                            <!-- 3 Sóng âm thanh cong tròn hướng lên góc 45 độ -->
                            <!-- Wave 1 (Nhỏ) -->
                            <path d="M16 9a3 3 0 0 1 3-3"></path>
                            <!-- Wave 2 (Trung) -->
                            <path d="M18.5 11.5a6 6 0 0 1 4.5-4.5"></path>
                            <!-- Wave 3 (Lớn) -->
                            <path d="M20.5 14.5a9 9 0 0 1 3.5-5.5"></path>
                        </svg>
                        <span>Nghe <span class="hidden sm:inline">bài viết</span></span>
                    </button>
                </div>
            </div>

            <figure class="w-full mb-10 px-0 md:px-0">
                <img src="${resolvedImage}" class="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-md border border-gray-100 dark:border-gray-700" alt="${post.title}" onerror="this.style.display='none'">
            </figure>

            <div id="post-content-speech" class="blog-content dark:text-gray-300 max-w-none text-lg leading-relaxed px-4 md:px-0">
                ${canView ? contentWithTOC : AccessControl.getLockScreenHTML(post)}
            </div>

            <!-- Schema -->
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "${post.title.replace(/"/g, '\\"')}",
              "image": [ "${resolvedImage}" ],
              "datePublished": "${isoDate}",
              "dateModified": "${isoDate}",
              "author": [{ "@type": "Person", "name": "${post.author || 'Ban Biên Tập'}" }],
               "mainEntityOfPage": { "@type": "WebPage", "@id": "https://lichviet2025.com/${post.slug}" }
            }
            </script>

            <div class="px-4 md:px-0">${showAIChat ? renderInlineAIChat(post.title) : ''}</div>

            ${canView && post.category === 'TU_VI' ? `<div class="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700/50 px-4 md:px-0"><div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 italic text-green-800 dark:text-green-300 rounded-r-lg">"Vận mệnh nằm trong tay ta, phong thủy chỉ là trợ lực. Hãy sống tích cực mỗi ngày!"</div></div>` : ''}

            <div class="mt-8 px-4 md:px-0 pb-4 md:pb-0">
                <button onclick="app.backToBlog()" class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Quay lại danh sách
                </button>
            </div>
        </div>
    `;
}
