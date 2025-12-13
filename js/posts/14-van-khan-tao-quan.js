
import { renderFAQ } from '../components/faq.js';

// 1. Dữ liệu FAQ chuẩn SEO (FAQPage Schema)
const faqData = [
    {
        q: "Cúng ông Công ông Táo trước ngày 23 được không?",
        a: "Được. Gia chủ có thể cúng từ ngày 21 tháng Chạp đến trước 12h trưa ngày 23 tháng Chạp. Tuy nhiên, thời điểm tốt nhất vẫn là sáng ngày 23."
    },
    {
        q: "Lễ vật cúng ông Táo gồm những gì?",
        a: "Lễ vật cơ bản gồm: 3 chiếc mũ Táo quân (2 nam, 1 nữ), cá chép (sống hoặc giấy), hương, hoa, ngũ quả, trầu cau, tiền vàng và mâm cỗ mặn (hoặc chay)."
    },
    {
        q: "Thả cá chép xong có được ăn không?",
        a: "Không. Cá chép cúng ông Táo là phương tiện để các ngài về trời. Sau khi cúng, cần mang thả phóng sinh ở sông, hồ sạch sẽ với lòng thành kính."
    }
];

// 2. Nội dung bài viết
const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Văn khấn Ông Công Ông Táo 2025 chuẩn nhất: Bài cúng, lễ vật và giờ đẹp",
      "description": "Hướng dẫn chi tiết lễ cúng Táo Quân 23 tháng Chạp. Bài văn khấn cổ truyền, cách sắm lễ và những lưu ý phong thủy để tiễn Táo về trời suôn sẻ.",
      "image": "https://images.unsplash.com/photo-1548685913-c34d31488133?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Theo phong tục cổ truyền, ngày <strong>23 tháng Chạp</strong> hàng năm là ngày Táo Quân (Vua Bếp) cưỡi cá chép về trời để báo cáo công việc hạ giới trong một năm với Ngọc Hoàng. Lễ cúng này mang ý nghĩa cầu mong một năm mới ấm no, hạnh phúc.</p>

    <h2 id="le-vat-cung-tao-quan">1. Sắm Lễ Cúng Ông Công Ông Táo</h2>
    <p>Để lễ cúng được trang trọng, gia chủ cần chuẩn bị đầy đủ các lễ vật sau:</p>
    <ul>
        <li><strong>Mũ Táo Quân:</strong> 3 chiếc (2 chiếc mũ đàn ông có cánh chuồn, 1 chiếc mũ đàn bà không có cánh chuồn).</li>
        <li><strong>Cá chép:</strong> 3 con cá chép sống (tượng trưng cho phương tiện di chuyển) hoặc cá chép giấy.</li>
        <li><strong>Mâm cỗ:</strong> Gà luộc, xôi gấc, giò lụa, canh măng, xào thập cẩm (Có thể cúng cỗ chay tùy tâm).</li>
        <li><strong>Lễ vật khác:</strong> Hương, hoa tươi, trái cây, trầu cau, rượu, nến/đèn dầu.</li>
    </ul>

    <h2 id="bai-van-khan-tao-quan">2. Bài Văn Khấn Ông Công Ông Táo (Chuẩn Cổ Truyền)</h2>
    <p>Dưới đây là bài văn khấn phổ biến nhất, trích từ Văn khấn cổ truyền Việt Nam:</p>

    <div class="blog-quote">
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
        <p>Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.</p>
        <p>Con kính lạy Ngài Đông trù Tư mệnh Táo phủ Thần quân.</p>
        <p>Tín chủ (chúng) con là: [Họ và tên gia chủ]<br>
        Ngụ tại: [Địa chỉ nhà]</p>
        <p>Hôm nay là ngày 23 tháng Chạp năm [Tên năm Âm lịch], tín chủ chúng con thành tâm sắm lễ, hương hoa phẩm vật, xiêm hài áo mũ, kính dâng tôn thần. Thắp nén tâm hương tín chủ con thành tâm kính bái.</p>
        <p>Chúng con kính mời ngài Đông trù Tư mệnh Táo phủ Thần quân hiển linh trước án hưởng thụ lễ vật.</p>
        <p>Cúi xin Tôn thần gia ân xá tội cho mọi lỗi lầm trong năm qua gia chủ chúng con sai phạm. Xin Tôn thần ban phước lộc, phù hộ toàn gia chúng con trai gái, già trẻ sức khỏe dồi dào, an khang thịnh vượng, vạn sự tốt lành.</p>
        <p>Chúng con lễ bạc tâm thành, kính lễ cầu xin, mong Tôn thần phù hộ độ trì.</p>
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
    </div>

    <h2 id="luu-y-khi-cung">3. Lưu Ý Quan Trọng Khi Cúng</h2>
    <p>Sau khi cúng xong, đợi hương tàn thì hóa vàng mã và mang cá chép đi thả. Khi thả cá cần nhẹ nhàng, tránh ném từ trên cao xuống làm cá chết.</p>
    
    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-700 mt-4">
        <strong>Xem thêm:</strong>
        <ul class="list-disc ml-5 mt-2">
            <li><a onclick="app.viewPost('tet-2026-la-ngay-nao-dem-nguoc-con-bao-nhieu-ngay-den-tet-binh-ngo')" class="text-green-600 hover:underline cursor-pointer font-bold">Ngày Tết Âm Lịch 2026 là ngày nào?</a></li>
            <li><a onclick="app.viewPost('tong-hop-lich-nghi-le-tet-nam-2025-chi-tiet-nhat')" class="text-green-600 hover:underline cursor-pointer font-bold">Lịch nghỉ Tết Nguyên Đán 2025</a></li>
        </ul>
    </div>
`;

export default { 
    id: 14, 
    category: "VAN_KHAN",
    title: "Văn khấn Ông Công Ông Táo 2025 chuẩn nhất: Bài cúng, lễ vật và giờ đẹp", 
    excerpt: "Hướng dẫn chi tiết lễ cúng Táo Quân 23 tháng Chạp. Bài văn khấn cổ truyền, cách sắm lễ và những lưu ý phong thủy để tiễn Táo về trời suôn sẻ.", 
    image: "https://images.unsplash.com/photo-1548685913-c34d31488133?q=80&w=1280&fit=crop", 
    date: "10/01/2025", 
    author: "Ban Biên Tập",
    content: contentBody + renderFAQ(faqData) 
};
