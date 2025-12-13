
import { BlogService } from '../service.js';

// Dữ liệu icon và thông tin cơ bản để hiển thị Grid
const ZODIAC_DATA = [
    { id: 'ty', name: 'Tuổi Tý', icon: '🐭', years: '1960, 1972, 1984, 1996, 2008, 2020', element: 'Thủy', slug: 'tuoi-ty-2026' },
    { id: 'suu', name: 'Tuổi Sửu', icon: '🐮', years: '1961, 1973, 1985, 1997, 2009, 2021', element: 'Thổ', slug: 'tuoi-suu-2026' },
    { id: 'dan', name: 'Tuổi Dần', icon: '🐯', years: '1962, 1974, 1986, 1998, 2010, 2022', element: 'Mộc', slug: 'tuoi-dan-2026' },
    { id: 'mao', name: 'Tuổi Mão', icon: '🐱', years: '1963, 1975, 1987, 1999, 2011, 2023', element: 'Mộc', slug: 'tuoi-mao-2026' },
    { id: 'thin', name: 'Tuổi Thìn', icon: '🐲', years: '1964, 1976, 1988, 2000, 2012, 2024', element: 'Thổ', slug: 'tuoi-thin-2026' },
    { id: 'ty_snake', name: 'Tuổi Tỵ', icon: '🐍', years: '1965, 1977, 1989, 2001, 2013, 2025', element: 'Hỏa', slug: 'tuoi-ty-2026' },
    { id: 'ngo', name: 'Tuổi Ngọ', icon: '🐴', years: '1966, 1978, 1990, 2002, 2014, 2026', element: 'Hỏa', slug: 'tuoi-ngo-2026' },
    { id: 'mui', name: 'Tuổi Mùi', icon: '🐐', years: '1967, 1979, 1991, 2003, 2015, 2027', element: 'Thổ', slug: 'tuoi-mui-2026' },
    { id: 'than', name: 'Tuổi Thân', icon: '🐵', years: '1968, 1980, 1992, 2004, 2016, 2028', element: 'Kim', slug: 'tuoi-than-2026' },
    { id: 'dau', name: 'Tuổi Dậu', icon: '🐔', years: '1969, 1981, 1993, 2005, 2017, 2029', element: 'Kim', slug: 'tuoi-dau-2026' },
    { id: 'tuat', name: 'Tuổi Tuất', icon: '🐶', years: '1970, 1982, 1994, 2006, 2018, 2030', element: 'Thổ', slug: 'tuoi-tuat-2026' },
    { id: 'hoi', name: 'Tuổi Hợi', icon: '🐷', years: '1971, 1983, 1995, 2007, 2019, 2031', element: 'Thủy', slug: 'tuoi-hoi-2026' },
];

export const renderTuViPage = () => {
    // Tạo Schema Structured Data
    const today = new Date().toISOString();
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Tử Vi 12 Con Giáp Năm 2026 (Bính Ngọ) - Luận Giải Chi Tiết Vận Hạn & Sự Nghiệp",
        "description": "Xem bói tử vi trọn đời 2026, tra cứu sao chiếu mệnh, vận hạn tam tai, kim lâu. Dự báo chính xác về tài lộc, tình duyên cho 12 con giáp năm Bính Ngọ.",
        "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401", 
        "datePublished": "2025-01-01",
        "dateModified": today,
        "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Năm 2026 là năm con gì?", "acceptedAnswer": { "@type": "Answer", "text": "Năm 2026 là năm Bính Ngọ (Con Ngựa), mệnh Thiên Hà Thủy." } },
            { "@type": "Question", "name": "Tuổi nào phạm Thái Tuế năm 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Tuổi Ngọ (Trực Thái Tuế), Tý (Xung Thái Tuế), Mão (Phá Thái Tuế) và Dậu (Hình Thái Tuế)." } },
            { "@type": "Question", "name": "Tuổi nào làm ăn phát đạt năm 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Các tuổi Dần, Tuất (Tam hợp) và Mùi (Lục hợp) sẽ gặp nhiều may mắn, tài lộc hanh thông." } }
        ]
    };

    return `
    <script type="application/ld+json">${JSON.stringify(schemaData)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>

    <div class="animate-fade-in font-sans space-y-12">
        <!-- HERO SECTION: H1 Chuẩn SEO -->
        <header class="relative rounded-3xl overflow-hidden bg-gray-900 shadow-2xl min-h-[350px] flex items-center justify-center text-center px-4">
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-purple-900/50 to-transparent"></div>
            
            <div class="relative z-10 max-w-4xl mx-auto space-y-6 py-10">
                <div class="inline-block px-4 py-1.5 rounded-full border border-purple-400 text-purple-200 text-xs font-bold uppercase tracking-widest bg-purple-900/30 backdrop-blur-sm">
                    Dự báo Vận Mệnh 2026
                </div>
                <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 drop-shadow-sm leading-tight">
                    Tử Vi 12 Con Giáp Năm 2026 (Bính Ngọ) - Luận Giải Chi Tiết Vận Hạn & Tài Lộc
                </h1>
                <p class="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Khám phá vận mệnh, sự nghiệp, tình duyên và sức khỏe của 12 con giáp trong năm Bính Ngọ. Tra cứu sao hạn, cách hóa giải Tam Tai, Thái Tuế chính xác nhất từ chuyên gia phong thủy.
                </p>
            </div>
        </header>

        <!-- INTRO ARTICLE (PILLAR CONTENT) -->
        <article class="max-w-4xl mx-auto px-4 prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
            <h2 class="text-2xl md:text-3xl font-bold text-purple-800 dark:text-purple-400 mb-4 text-center">
                Tổng Quan Năm 2026 Bính Ngọ - Mệnh Thiên Hà Thủy
            </h2>
            <p>
                Năm <strong>2026</strong> là năm <strong>Bính Ngọ</strong> (Con Ngựa). Theo hệ thống can chi, "Bính" thuộc Hỏa, "Ngọ" cũng thuộc Hỏa. Đây là năm Hỏa khí cực vượng, tượng trưng cho năng lượng bùng nổ, sự nhiệt huyết và thay đổi mạnh mẽ. Tuy nhiên, ngũ hành nạp âm của năm lại là <strong>Thiên Hà Thủy</strong> (Nước trên trời).
            </p>
            <p>
                Sự kết hợp giữa Hỏa (Can Chi) và Thủy (Nạp Âm) tạo nên một năm đầy biến động và mâu thuẫn nhưng cũng chứa đựng cơ hội "chuyển mình" lớn lao. Nước mưa từ trời (Thiên Hà Thủy) sẽ làm dịu đi cái nóng gay gắt của Hỏa, mang lại sự cân bằng cho vạn vật.
            </p>
            
            <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 my-6 rounded-r-lg italic">
                <strong>Lời khuyên cốt lõi năm 2026:</strong> "Lấy nhu thắng cương". Trong năm Bính Ngọ, những người biết linh hoạt, mềm mỏng như dòng nước (Thủy) sẽ dễ dàng gặt hái thành công hơn là những người nóng vội, cứng nhắc.
            </div>

            <h3 class="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3">Các tiêu chí luận giải tử vi 2026</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Sao chiếu mệnh:</strong> Hệ thống Cửu Diệu Tinh Quân (Thái Bạch, La Hầu, Kế Đô...) ảnh hưởng trực tiếp đến cát hung từng năm.</li>
                <li><strong>Hạn Tam Tai:</strong> Năm 2026 là năm hạn Tam Tai của các tuổi <strong>Thân - Tý - Thìn</strong> (Năm thứ 3 - năm cuối nhẹ nhất).</li>
                <li><strong>Phạm Thái Tuế:</strong> Năm Ngọ, các tuổi phạm Thái Tuế gồm <strong>Ngọ (Trực), Tý (Xung), Mão (Phá), Dậu (Hình)</strong>.</li>
            </ul>
        </article>

        <!-- VIDEO YOUTUBE EMBED (RESPONSIVE) -->
        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-gray-900 rounded-xl overflow-hidden shadow-xl aspect-w-16 aspect-h-9 relative" style="padding-bottom: 56.25%;">
                <iframe 
                    class="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/ovYL9XMT3xA?rel=0" 
                    title="Tử Vi 12 Con Giáp Năm 2026" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">Video: Dự báo tổng quan không khí và vận hạn năm Bính Ngọ (Nguồn tham khảo)</p>
        </div>

        <!-- ZODIAC GRID LIST (Main Navigation) -->
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-center gap-3 mb-8">
                <span class="text-3xl">🔮</span>
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Tra Cứu Chi Tiết Vận Hạn 12 Con Giáp</h2>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                ${ZODIAC_DATA.map(z => `
                    <div onclick="app.handleZodiacClick('${z.id}', '${z.name}')" 
                         class="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center text-center">
                        
                        <!-- Hover Effect BG -->
                        <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div class="relative z-10">
                            <div class="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md filter grayscale-0">${z.icon}</div>
                            
                            <h3 class="text-xl font-bold text-gray-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                                ${z.name}
                            </h3>
                            
                            <div class="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider mt-1 mb-3">
                                Mệnh ${z.element}
                            </div>
                            
                            <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[2.5em]">
                                ${z.years}
                            </p>
                            
                            <button class="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                Xem Vận Hạn 2026
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- DEEP DIVE SECTION (Nội dung mở rộng cho SEO) -->
        <section class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 mb-12">
            <!-- Nhóm Tam Hợp -->
            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800">
                <h3 class="text-xl font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                    <span class="text-2xl">✨</span> Nhóm Con Giáp May Mắn Nhất 2026
                </h3>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-4 text-justify">
                    Năm Ngọ nằm trong cục diện <strong>Tam Hợp (Dần - Ngọ - Tuất)</strong> và <strong>Lục Hợp (Ngọ - Mùi)</strong>. Do đó, những người tuổi <strong>Dần, Tuất, Mùi</strong> sẽ nhận được sự trợ lực rất lớn từ cát tinh.
                </p>
                <ul class="space-y-2 text-sm">
                    <li class="flex items-start gap-2"><span class="text-green-600 font-bold">✓ Tuổi Dần:</span> Sự nghiệp thăng hoa, hổ mọc thêm cánh.</li>
                    <li class="flex items-start gap-2"><span class="text-green-600 font-bold">✓ Tuổi Tuất:</span> Tài lộc dồi dào, quý nhân phù trợ.</li>
                    <li class="flex items-start gap-2"><span class="text-green-600 font-bold">✓ Tuổi Mùi:</span> Gia đạo êm ấm, vạn sự hanh thông.</li>
                </ul>
            </div>

            <!-- Nhóm Xung Khắc -->
            <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800">
                <h3 class="text-xl font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
                    <span class="text-2xl">⚠️</span> Các Tuổi Cần Cẩn Trọng (Phạm Thái Tuế)
                </h3>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-4 text-justify">
                    Năm Bính Ngọ, cục diện Tứ Hành Xung và Thái Tuế sẽ tác động mạnh đến các tuổi <strong>Tý, Ngọ, Mão, Dậu</strong>. Cần chú ý giữ gìn sức khỏe và tránh đầu tư mạo hiểm.
                </p>
                <ul class="space-y-2 text-sm">
                    <li class="flex items-start gap-2"><span class="text-red-600 font-bold">✕ Tuổi Tý:</span> Xung Thái Tuế, cẩn thận thay đổi công việc.</li>
                    <li class="flex items-start gap-2"><span class="text-red-600 font-bold">✕ Tuổi Ngọ:</span> Trực Thái Tuế (Năm tuổi), áp lực tâm lý lớn.</li>
                    <li class="flex items-start gap-2"><span class="text-red-600 font-bold">✕ Tuổi Mão:</span> Phá Thái Tuế, đề phòng tiểu nhân quấy phá.</li>
                </ul>
            </div>
        </section>

        <!-- SEO FAQ SECTION -->
        <div class="max-w-5xl mx-auto px-4 pb-8">
            <div class="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-2">
                    Câu hỏi thường gặp về Tử Vi 2026
                </h3>
                
                <div class="space-y-6">
                    <details class="group">
                        <summary class="flex justify-between items-center font-bold text-gray-800 dark:text-gray-200 cursor-pointer list-none">
                            <span>Tại sao nên xem Tử Vi năm 2026 Bính Ngọ sớm?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p class="text-gray-600 dark:text-gray-400 mt-3 group-open:animate-fade-in text-justify">
                            Việc xem <strong>Tử vi năm 2026</strong> giúp quý gia chủ nắm bắt được thiên thời, địa lợi. Biết trước vận hạn (sao La Hầu, Kế Đô, Thái Bạch...) để dâng sao giải hạn kịp thời. Đồng thời, xác định các tháng tốt để đại sự như cưới hỏi, động thổ, khai trương được hanh thông.
                        </p>
                    </details>

                    <details class="group">
                        <summary class="flex justify-between items-center font-bold text-gray-800 dark:text-gray-200 cursor-pointer list-none">
                            <span>Sinh con năm 2026 tháng nào tốt nhất?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p class="text-gray-600 dark:text-gray-400 mt-3 group-open:animate-fade-in text-justify">
                            Năm 2026 mệnh Thủy. Các tháng sinh tốt là tháng thuộc mùa Thu (Kim sinh Thủy) và mùa Đông (Thủy trợ Thủy). Cụ thể là tháng 7, 8 (Âm lịch - hành Kim) và tháng 10, 11 (Âm lịch - hành Thủy). Tránh sinh vào các tháng Tứ Quý (3, 6, 9, 12) thuộc Thổ khắc Thủy.
                        </p>
                    </details>

                    <details class="group">
                        <summary class="flex justify-between items-center font-bold text-gray-800 dark:text-gray-200 cursor-pointer list-none">
                            <span>Thông tin trên website có chính xác không?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <p class="text-gray-600 dark:text-gray-400 mt-3 group-open:animate-fade-in text-justify">
                            Thông tin được tổng hợp từ các sách cổ thư về Tử Vi Đẩu Số, Kinh Dịch và Ngũ Hành Bát Quái. Tuy nhiên, "đức năng thắng số", vận mệnh nằm trong tay bạn. Tử vi chỉ là bản đồ tham khảo để bạn đi đúng hướng hơn.
                        </p>
                    </details>
                </div>
            </div>
        </div>
    </div>
    `;
};

// Handler mới: Chuyển hướng sang bài viết Blog chi tiết
export const handleZodiacClick = (id, name) => {
    const allPosts = BlogService.getAllPosts();
    const targetPost = allPosts.find(p => p.zodiacId === id);

    if (targetPost) {
        // Chuyển hướng sang xem bài viết
        app.viewPost(targetPost.slug);
    } else {
        // Fallback: Tìm theo tên
        const fallbackPost = allPosts.find(p => p.title.includes(name) && (p.title.includes('2025') || p.title.includes('2026')));
        if (fallbackPost) {
            app.viewPost(fallbackPost.slug);
        } else {
            alert(`Đang cập nhật dữ liệu chi tiết cho ${name}. Vui lòng quay lại sau!`);
        }
    }
};

export const closeZodiacModal = () => {}; 
export const handleZodiacChat = () => {};
