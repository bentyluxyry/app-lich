
import { getDayInfo, formatWeekDay, renderDailyDetailHTML, renderCalendarGridHTML } from '../calendar.js';
import { renderHomeSidebar } from './sidebar.js';

// Hàm renderHome nhận thêm tham số viewType để phân biệt SEO
export const renderHome = (date, viewType = 'HOME') => {
    try {
        const info = getDayInfo(date);
        const weekDay = formatWeekDay(date);
        const currentYear = info.gregorian.getFullYear();
        const currentMonth = info.gregorian.getMonth() + 1;

        // --- CẤU HÌNH SEO CONTENT THEO VIEW ---
        let seoConfig = {};

        if (viewType === 'CALENDAR') {
            // SEO CHO TRANG LỊCH: Tập trung "Lịch Vạn Niên", "Lịch Tháng", "Năm 2025"
            seoConfig = {
                h1: `Lịch Vạn Niên Năm ${currentYear} - Tra Cứu Lịch Âm Dương Chi Tiết`,
                h2_daily: `Chi tiết ngày ${info.gregorian.getDate()} tháng ${currentMonth} năm ${currentYear}`,
                h2_month: `Bảng Lịch Tháng ${currentMonth} Năm ${currentYear}`,
                intro_title: `Tra cứu Lịch Âm Dương & Đổi Ngày Chính Xác Nhất ${currentYear}`,
                intro_text: `
                    <p>
                        Bạn đang xem <strong>Lịch Vạn Niên năm ${currentYear}</strong>. Đây là công cụ tra cứu lịch cổ truyền chính xác, giúp bạn chuyển đổi nhanh chóng giữa ngày Dương lịch và Âm lịch.
                    </p>
                    <p>
                        Bảng lịch tháng giúp bạn có cái nhìn tổng quan về các ngày trong tháng, dễ dàng nhận biết ngày rằm (Vọng), mùng 1 (Sóc), các ngày lễ tết quan trọng và <strong>các ngày Hoàng Đạo</strong> để lên kế hoạch cho công việc đại sự như cưới hỏi, làm nhà, khai trương.
                    </p>
                `
            };
        } else {
            // SEO CHO TRANG CHỦ: Tập trung "Hôm nay", "Ngày tốt xấu"
            seoConfig = {
                h1: `Hôm nay ngày mấy Âm lịch? Xem Ngày Tốt Xấu (${info.gregorian.getDate()}/${currentMonth})`,
                h2_daily: `Thông tin Ngày Tốt Xấu Hôm Nay`,
                h2_month: `Xem nhanh Lịch Tháng ${currentMonth}`,
                intro_title: `Hôm nay ngày mấy âm? Xem ngày tốt xấu nhanh chóng`,
                intro_text: `
                    <p>
                        Chào mừng bạn đến với ứng dụng tra cứu <strong>Ngày Tốt Xấu</strong> online. Câu hỏi <strong>"Hôm nay ngày mấy âm lịch?"</strong> sẽ được giải đáp ngay lập tức với độ chính xác tuyệt đối theo lịch Việt Nam.
                    </p>
                    <p>
                        Ngoài việc xem lịch hôm nay, bạn có thể tra cứu <strong>Giờ Hoàng Đạo</strong>, tuổi xung khắc và hướng xuất hành để công việc trong ngày được hanh thông, thuận lợi. Dữ liệu được cập nhật liên tục theo thời gian thực.
                    </p>
                `
            };
        }

        // Dữ liệu FAQ (Cập nhật mới theo yêu cầu: Tết 2026, Xuất hành, Mệnh năm)
        const faqs = [
            {
                q: "Tết 2026 được nghỉ mấy ngày?",
                a: "Dự kiến người lao động sẽ được nghỉ <strong>7 ngày liên tục</strong> từ 29 tháng Chạp đến hết mùng 5 Tết (15/02/2026 - 21/02/2026)."
            },
            {
                q: "Năm 2026 là năm con gì, mệnh gì?",
                a: "Năm 2026 là năm <strong>Bính Ngọ (Con Ngựa)</strong>. Mệnh ngũ hành là <strong>Thiên Hà Thủy</strong> (Nước trên trời). Rất hợp với người mệnh Mộc và mệnh Kim."
            },
            {
                q: "Hướng xuất hành tốt ngày mùng 1 Tết 2026?",
                a: "Để đón may mắn đầu năm Bính Ngọ, bạn nên chọn: <strong>Hỷ Thần hướng Tây Bắc</strong> (cầu hỷ sự, tình duyên) hoặc <strong>Tài Thần hướng Tây Nam</strong> (cầu tài lộc). Giờ đẹp xuất hành: Tý (23-1h), Sửu (1-3h), Ngọ (11-13h)."
            }
        ];

        return `
            <!-- SEO HEADER SECTION -->
            <div class="pt-16 md:pt-0 mb-8 space-y-4 animate-fade-in">
                <!-- 1. H1: Thay đổi theo ViewType -->
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight text-center md:text-left">
                    ${seoConfig.h1}
                </h1>
                
                <!-- 2. CORE VALUE: Thông tin lịch chi tiết -->
                <div class="bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/30 dark:to-gray-800 border border-green-100 dark:border-green-800 rounded-2xl p-6 shadow-sm mt-4 relative overflow-hidden group">
                    
                    <!-- HOA MAI (Góc Trái) -->
                    <img src="https://images.unsplash.com/photo-1516051662668-94fcf9fb7138?q=80&w=200&auto=format&fit=crop" 
                        class="absolute -top-6 -left-6 w-32 h-32 md:w-40 md:h-40 object-cover rounded-full opacity-80 pointer-events-none drop-shadow-md animate-sway origin-top-left border-4 border-white/30"
                        alt="Hoa Mai"
                        onerror="this.style.display='none'"
                    >

                    <!-- HOA ĐÀO (Góc Phải) -->
                    <img src="https://plus.unsplash.com/premium_photo-1675803299787-8f722cb47065?q=80&w=200&auto=format&fit=crop" 
                        class="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 object-cover rounded-full opacity-80 pointer-events-none drop-shadow-md animate-sway origin-bottom-right border-4 border-white/30"
                        alt="Hoa Đào"
                        style="animation-delay: 1.5s;"
                        onerror="this.style.display='none'"
                    >
                    
                    <!-- HOA RƠI (Effect) -->
                    <div class="absolute inset-0 pointer-events-none overflow-hidden">
                         <div class="absolute top-10 left-1/4 text-2xl animate-bounce opacity-30" style="animation-duration: 3s;">🌸</div>
                         <div class="absolute top-20 right-1/4 text-xl animate-bounce opacity-30" style="animation-duration: 4s; animation-delay: 1s;">🌼</div>
                         <div class="absolute bottom-10 left-1/3 text-lg animate-bounce opacity-20" style="animation-duration: 5s; animation-delay: 2s;">🌸</div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-10 px-4 md:px-8">
                        <div>
                             <p class="text-xl text-gray-800 dark:text-gray-100 mb-2">
                                Hôm nay là <strong>${weekDay}, ${info.gregorian.getDate()}/${currentMonth}/${currentYear}</strong> Dương lịch
                             </p>
                             <p class="text-lg text-green-700 dark:text-green-400 font-medium flex items-center gap-2">
                                <span>📅</span> Tức ngày <strong>${info.lunar.day} tháng ${info.lunar.month} năm ${info.lunar.yearName}</strong> (Âm lịch)
                             </p>
                        </div>
                        <div class="text-sm text-gray-700 dark:text-gray-300 space-y-2 md:border-l md:border-green-200 md:dark:border-green-800 md:pl-8 bg-white/40 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm shadow-sm">
                             <div class="flex items-start gap-2">
                                <span class="font-bold min-w-[90px] text-green-800 dark:text-green-400">Giờ H.Đạo:</span>
                                <span>${info.zodiacHours.split(',').slice(0,3).join(', ')}...</span>
                             </div>
                             <div class="flex items-start gap-2">
                                <span class="font-bold min-w-[90px] text-green-800 dark:text-green-400">Tiết khí:</span>
                                <span>${info.element}</span>
                             </div>
                             <div class="flex items-start gap-2">
                                <span class="font-bold min-w-[90px] text-red-600 dark:text-red-400">Tuổi xung:</span>
                                <span>${info.conflictingAge}</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- Cột nội dung chính -->
                <div class="lg:col-span-9 space-y-12">
                    
                    <!-- 3. Section Lịch Ngày -->
                    <div id="daily-section">
                        <div class="flex items-center gap-2 mb-4 border-l-4 border-green-600 pl-3">
                            <h2 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                                ${seoConfig.h2_daily}
                            </h2>
                        </div>
                        ${renderDailyDetailHTML(date)}
                    </div>

                    <!-- 4. Section Lịch Tháng -->
                    <div id="calendar-view-container">
                        <div class="flex items-center gap-2 mb-4 border-l-4 border-green-600 pl-3">
                            <h2 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                                ${seoConfig.h2_month}
                            </h2>
                        </div>
                        ${renderCalendarGridHTML(date)}
                    </div>

                    <!-- SEO CONTENT & LINKS SECTION -->
                    <div class="mt-12 space-y-8 animate-fade-in">
                        <section id="gioi-thieu-va-tien-ich" class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
                            <h2 class="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700 pb-3 mb-5">
                                ${seoConfig.intro_title}
                            </h2>
                            <div class="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                ${seoConfig.intro_text}
                            </div>
                        </section>

                        <!-- Internal Links (Giữ nguyên) -->
                        <section id="lien-ket-noi-bo" class="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <span class="text-green-500">★</span> Khám phá các tính năng mở rộng
                            </h3>
                            <ul class="space-y-3">
                                <li class="flex items-start gap-2">
                                    <span class="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                    <div>
                                        <a onclick="app.navigate('CALENDAR')" class="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">📅 Lịch Vạn Niên 2025</a>
                                    </div>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                    <div>
                                        <a onclick="app.filterGroup('PHONG_THUY_GROUP')" class="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">🧧 Kiến thức Phong Thủy & Lễ Tết</a>
                                    </div>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                    <div>
                                        <a onclick="app.filterGroup('TU_VI_GROUP')" class="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">🔮 Tử Vi 12 Con Giáp</a>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>
                    
                    <!-- 5. FAQ Section (Giao diện mới: Chỉ đường gạch ngang) -->
                    <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex items-center gap-3 mb-6">
                            <span class="text-3xl">❓</span>
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Câu hỏi thường gặp</h2>
                        </div>
                        
                        <div class="space-y-0">
                            ${faqs.map((item) => `
                                <details class="group border-b border-gray-200 dark:border-gray-700">
                                    <summary class="flex items-center justify-between py-4 cursor-pointer list-none font-bold text-gray-800 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                        <h3 class="text-base md:text-lg">${item.q}</h3>
                                        <span class="transition-transform group-open:rotate-180">
                                            <svg fill="none" height="20" width="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <div class="text-gray-600 dark:text-gray-300 pb-4 leading-relaxed text-justify">
                                        ${item.a}
                                    </div>
                                </details>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- SIDEBAR -->
                <div class="lg:col-span-3">${renderHomeSidebar()}</div>
            </div>
        `;
    } catch (e) {
        console.error("Error rendering home:", e);
        return `<div class="p-8 text-center text-red-500">Đã có lỗi xảy ra khi tải nội dung. Vui lòng tải lại trang.</div>`;
    }
};
