
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Nên cúng Thần Tài vào giờ nào trong ngày?",
        a: "Giờ tốt nhất để cúng Thần Tài là buổi sáng, từ <strong>7h - 9h (Giờ Thìn)</strong> hoặc <strong>9h - 11h (Giờ Tỵ)</strong>. Đây là hai khung giờ vượng khí, giúp kích hoạt tài lộc."
    },
    {
        q: "Ban thờ Thần Tài nên đặt quay hướng nào?",
        a: "Nên đặt ban thờ hướng ra cửa chính để đón khí, hoặc đặt theo hướng Quý Nhân/Thiên Lộc hợp với tuổi gia chủ. Tránh đặt gần nhà vệ sinh, gầm cầu thang."
    },
    {
        q: "Ngày vía Thần Tài (Mùng 10) nên mua gì?",
        a: "Theo quan niệm dân gian, ngày vía Thần Tài (10 tháng Giêng), người dân thường mua vàng (nhẫn, vàng miếng) hoặc vật phẩm phong thủy để cầu may mắn, tài lộc cả năm."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Bài văn khấn Thần Tài Thổ Địa hàng ngày & ngày Vía Thần Tài kích tài lộc",
      "description": "Tổng hợp bài cúng Thần Tài chuẩn nhất dùng cho hàng ngày, mùng 1, ngày rằm và ngày Vía Thần Tài mùng 10 tháng Giêng giúp buôn may bán đắt.",
      "image": "img/blog/bai-van-khan-than-tai-tho-dia-hang-ngay-ngay-via-than-tai-kich-tai-loc.webp",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Trong văn hóa kinh doanh của người Việt, <strong>Thần Tài</strong> và <strong>Ông Địa</strong> là hai vị thần quan trọng giúp cai quản tiền bạc và đất đai. Việc thờ cúng chu đáo sẽ giúp gia chủ "buôn may bán đắt", tiền vào như nước.</p>

    <h2 id="van-khan-than-tai-hang-ngay">1. Văn Khấn Thần Tài (Dùng Hàng Ngày)</h2>
    <p>Đây là bài khấn ngắn gọn dùng để thắp hương mỗi buổi sáng tại cửa hàng, công ty.</p>

    <div class="blog-quote">
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
        <p>Con lạy chín phương Trời, mười phương Chư Phật.</p>
        <p>Kính lạy ngài Hoàng Thiên Hậu Thổ chư vị Tôn thần.</p>
        <p>Con kính lạy ngài Đông Trù Tư mệnh Táo phủ Thần quân.</p>
        <p>Con kính lạy Thần Tài vị tiền.</p>
        <p>Con kính lạy các ngài Thần linh, Thổ địa cai quản trong xứ này.</p>
        <p>Tín chủ con là: [Tên gia chủ] - Ngụ tại: [Địa chỉ]</p>
        <p>Hôm nay là ngày... tháng... năm... Tín chủ con thành tâm sửa biện, hương hoa, lễ vật, kim ngân, trà quả và các thứ cúng dâng, bày ra trước án kính mời ngài Thần Tài vị tiền.</p>
        <p>Cúi xin Thần Tài thương xót tín chủ, giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật phù trì tín chủ chúng con an ninh khang thái, vạn sự tốt lành, gia đạo hưng long thịnh vượng, lộc tài tăng tiến, tâm đạo mở mang, sở cầu tất ứng, sở nguyện tòng tâm.</p>
        <p>Chúng con lễ bạc tâm thành, trước án kính lễ cúi xin được phù hộ độ trì.</p>
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
    </div>

    <h2 id="van-khan-via-than-tai">2. Văn Khấn Ngày Vía Thần Tài (Mùng 10 Tháng Giêng)</h2>
    <p>Ngày Vía Thần Tài là ngày quan trọng nhất trong năm. Lễ vật cần chuẩn bị tươm tất hơn: Bộ Tam sên (Thịt heo luộc, trứng luộc, tôm luộc), cá lóc nướng, mâm ngũ quả, hoa tươi.</p>
    <p><em>(Nội dung bài khấn tương tự như trên nhưng cần thêm đoạn: "Nhân ngày Vía Thần Tài, tín chủ con thành tâm sắm lễ... cầu xin cho năm mới tài lộc hanh thông...")</em></p>

    <h2 id="luu-y-phong-thuy">3. Mẹo Phong Thủy Ban Thờ Thần Tài</h2>
    <ul>
        <li>Luôn giữ ban thờ sạch sẽ, tắm tượng Thần Tài - Ông Địa bằng nước lá bưởi hoặc rượu gừng.</li>
        <li>Đặt thêm <strong>Cóc Thiềm Thừ</strong> (Cóc 3 chân) bên trái ban thờ: Sáng quay ra (kiếm tiền), tối quay vào (giữ tiền).</li>
        <li>Đặt bát nước "Minh Đường Tụ Thủy" (bát nước rắc cánh hoa) phía trước để giữ tài lộc.</li>
    </ul>

    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-700 mt-4">
        <strong>Tham khảo thêm:</strong>
        <ul class="list-disc ml-5 mt-2">
            <li><a onclick="app.viewPost('5-loai-cay-phong-thuy-hut-tai-loc-nam-2025')" class="text-green-600 hover:underline cursor-pointer font-bold">5 Loại cây phong thủy hút tài lộc cực tốt</a></li>
            <li><a onclick="app.viewPost('chon-mau-son-nha-hop-menh-tho')" class="text-green-600 hover:underline cursor-pointer font-bold">Màu sắc hợp mệnh giúp gia tăng vượng khí</a></li>
        </ul>
    </div>
`;

export default { 
    id: 15, 
    category: "VAN_KHAN",
    title: "Bài văn khấn Thần Tài Thổ Địa hàng ngày & ngày Vía Thần Tài kích tài lộc", 
    excerpt: "Tổng hợp bài cúng Thần Tài chuẩn nhất dùng cho hàng ngày, mùng 1, ngày rằm và ngày Vía Thần Tài mùng 10 tháng Giêng giúp buôn may bán đắt.", 
    image: "img/blog/bai-van-khan-than-tai-tho-dia-hang-ngay-ngay-via-than-tai-kich-tai-loc.webp", 
    date: "12/01/2025", 
    author: "Chuyên gia Phong Thủy",
    content: contentBody + renderFAQ(faqData) 
};
