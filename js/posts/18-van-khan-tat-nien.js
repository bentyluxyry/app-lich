
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Lễ cúng Tất niên nên thực hiện vào ngày nào?",
        a: "Lễ Tất niên thường được tổ chức vào chiều <strong>30 Tết</strong> (hoặc 29 Tết nếu tháng thiếu). Đây là bữa cơm sum họp cuối cùng của năm cũ để đón chào năm mới."
    },
    {
        q: "Có cần cúng Tất niên ngoài trời không?",
        a: "Không bắt buộc. Lễ Tất niên chủ yếu là cúng Gia tiên trong nhà. Tuy nhiên, nếu gia đình có điều kiện có thể cúng thêm mâm lễ ngoài trời để tạ đất đai, quan thần linh."
    },
    {
        q: "Mâm cỗ Tất niên cần những món gì?",
        a: "Tùy phong tục vùng miền. Miền Bắc thường có bánh chưng, gà luộc, canh măng, nem rán. Miền Nam có bánh tét, thịt kho hột vịt, canh khổ qua. Quan trọng nhất là lòng thành."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Bài cúng Tất Niên cuối năm trong nhà và ngoài trời chuẩn cổ truyền Việt Nam",
      "description": "Văn khấn lễ Tất niên chiều 30 Tết. Ý nghĩa bữa cơm tất niên sum họp gia đình và cách bày trí mâm cỗ cúng gia tiên để đón năm mới may mắn.",
      "image": "https://images.unsplash.com/photo-1643033220379-9942a6327346?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Lễ <strong>Tất Niên</strong> (tiệc tất niên) là nghi thức đánh dấu sự kết thúc của một năm cũ và chuẩn bị bước sang năm mới. Đây là dịp để con cháu sum vầy, tưởng nhớ tổ tiên và tạ ơn trời đất đã che chở trong suốt một năm qua.</p>

    <h2 id="y-nghia-tat-nien">1. Ý Nghĩa Của Lễ Tất Niên</h2>
    <p>"Tất" nghĩa là xong, "Niên" là năm. Tất niên là kết thúc năm cũ. Bữa cơm tất niên chiều 30 Tết là khoảnh khắc thiêng liêng nhất, gắn kết tình thân gia đình, xóa bỏ những muộn phiền năm cũ để đón chào năm mới an khang.</p>

    <h2 id="van-khan-tat-nien">2. Bài Văn Khấn Tất Niên (Cúng Gia Tiên)</h2>
    <div class="blog-quote">
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
        <p>Con kính lạy chín phương Trời, mười phương Chư Phật.</p>
        <p>Con kính lạy Hoàng thiên, Hậu Thổ, Long Mạch, Táo Quân, chư vị Tôn thần.</p>
        <p>Con kính lạy Cụ Tổ tỷ, Cụ Tổ khảo, ngoại, bá, thúc, huynh, đệ, cô, di, tỷ, muội và liệt vị hương linh gia tiên nội ngoại họ [Họ của gia chủ].</p>
        <p>Tín chủ (chúng) con là: [Tên gia chủ] - Ngụ tại: [Địa chỉ]</p>
        <p>Hôm nay là ngày 30 tháng Chạp năm [Năm cũ], gia đình chúng con thành tâm sắm lễ, tất niên ấm cúng, dâng lên trước án.</p>
        <p>Trước bản tọa chư vị Tôn thần, trước linh bài liệt vị Gia tiên, chúng con kính mời các ngài lai lâm thụ hưởng lễ vật.</p>
        <p>Cúi xin các ngài phù hộ độ trì cho toàn gia chúng con năm mới sức khỏe dồi dào, an khang thịnh vượng, vạn sự như ý. Chúng con xin tạ ơn các ngài đã che chở cho chúng con trong năm qua.</p>
        <p>Chúng con lễ bạc tâm thành, cúi xin chứng giám.</p>
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
    </div>

    <h2 id="chuan-bi-mam-co">3. Gợi Ý Mâm Cỗ Tất Niên</h2>
    <ul>
        <li><strong>Miền Bắc:</strong> Bánh chưng, gà luộc lá chanh, giò lụa, nem rán, canh măng miến, dưa hành.</li>
        <li><strong>Miền Trung:</strong> Bánh tét, nem chua, tôm chua, thịt heo ngâm nước mắm.</li>
        <li><strong>Miền Nam:</strong> Bánh tét, thịt kho tàu (kho hột vịt), canh khổ qua (mong cái khổ qua đi), củ kiệu tôm khô.</li>
    </ul>

    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-700 mt-4">
        <strong>Xem thêm thông tin Tết:</strong>
        <ul class="list-disc ml-5 mt-2">
            <li><a onclick="app.viewPost('tet-2026-la-ngay-nao-dem-nguoc-con-bao-nhieu-ngay-den-tet-binh-ngo')" class="text-green-600 hover:underline cursor-pointer font-bold">Đếm ngược đến Giao Thừa Tết Bính Ngọ 2026</a></li>
        </ul>
    </div>
`;

export default { 
    id: 18, 
    category: "LE_TET", 
    title: "Bài cúng Tất Niên cuối năm trong nhà và ngoài trời chuẩn cổ truyền Việt Nam", 
    excerpt: "Văn khấn lễ Tất niên chiều 30 Tết. Ý nghĩa bữa cơm tất niên sum họp gia đình và cách bày trí mâm cỗ cúng gia tiên để đón năm mới may mắn.", 
    image: "https://images.unsplash.com/photo-1643033220379-9942a6327346?q=80&w=1280&fit=crop", 
    date: "20/01/2025", 
    author: "Ban Biên Tập",
    content: contentBody + renderFAQ(faqData) 
};
