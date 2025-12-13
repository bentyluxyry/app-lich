
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Tại sao người miền Nam kỵ cúng chuối ngày Tết?",
        a: "Người miền Nam phát âm 'chuối' gần giống với 'chúi' (chúi nhủi, thất bại, không ngóc đầu lên được). Vì vậy, họ tuyệt đối kiêng cúng chuối, khác với miền Bắc coi nải chuối là vật đỡ quan trọng."
    },
    {
        q: "Có nên dùng hoa quả giả để bày mâm ngũ quả không?",
        a: "Tuyệt đối không. Việc thờ cúng quan trọng nhất là sự chân thành và sinh khí. Hoa quả giả là vật chết, không có hương sắc, thể hiện sự thiếu tôn trọng với thần linh, gia tiên."
    },
    {
        q: "Mâm ngũ quả có nhất thiết phải đủ 5 loại quả không?",
        a: "Không bắt buộc. Con số 5 tượng trưng cho Ngũ Hành, nhưng ngày nay tùy vào điều kiện và thẩm mỹ, gia chủ có thể bày bát, cửu, thập quả... miễn là mâm quả tươi ngon, màu sắc hài hòa."
    }
];

const contentBody = `
    <p>Mâm ngũ quả là một phần không thể thiếu trên bàn thờ gia tiên ngày Tết của người Việt. Nó không chỉ làm đẹp không gian thờ cúng mà còn gửi gắm ước nguyện của gia chủ về một năm mới an khang, thịnh vượng.</p>

    <h2 id="y-nghia-chung">1. Ý Nghĩa Của Con Số 5 (Ngũ Quả)</h2>
    <p>Trong văn hóa phương Đông, số 5 đại diện cho <strong>Ngũ Phúc Lâm Môn</strong>:</p>
    <ul>
        <li><strong>Phú:</strong> Giàu có, nhiều của cải.</li>
        <li><strong>Quý:</strong> Phẩm chất sang trọng.</li>
        <li><strong>Thọ:</strong> Sống lâu trăm tuổi.</li>
        <li><strong>Khang:</strong> Khỏe mạnh.</li>
        <li><strong>Ninh:</strong> Bình an.</li>
    </ul>
    <p>Ngoài ra, 5 màu sắc của quả cũng tương ứng với <strong>Ngũ Hành</strong>: Kim (Trắng), Mộc (Xanh), Thủy (Đen/Sẫm), Hỏa (Đỏ), Thổ (Vàng).</p>

    <h2 id="mam-ngu-qua-3-mien">2. Sự Khác Biệt Giữa 3 Miền Bắc - Trung - Nam</h2>

    <h3>Miền Bắc: Tuân thủ Ngũ Hành</h3>
    <p>Người miền Bắc rất chú trọng màu sắc theo ngũ hành. Mâm ngũ quả truyền thống thường bao gồm:</p>
    <ul>
        <li><strong>Nải chuối xanh (Mộc):</strong> Như bàn tay ngửa lên bao bọc, che chở các quả khác.</li>
        <li><strong>Quả Bưởi hoặc Phật thủ vàng (Thổ):</strong> Đặt ở giữa nải chuối, tượng trưng cho sự viên mãn.</li>
        <li><strong>Quả Ớt hoặc Táo đỏ (Hỏa):</strong> Điểm xuyết xung quanh.</li>
        <li><strong>Quả Đào hoặc Lê (Kim):</strong> Màu trắng ngà.</li>
        <li><strong>Quả Hồng xiêm hoặc Nho đen (Thủy):</strong> Màu sẫm.</li>
    </ul>

    <h3>Miền Trung: Đơn giản, chân thành</h3>
    <p>Miền Trung đất đai cằn cỗi, khí hậu khắc nghiệt nên người dân không quá câu nệ hình thức. Họ dâng lên tổ tiên những gì tươi ngon nhất có sẵn tại địa phương. Các loại quả thường thấy: Thanh long, chuối, dưa hấu, mãng cầu, dứa (thơm)...</p>

    <h3>Miền Nam: "Cầu - Sung - Dừa - Đủ - Xoài"</h3>
    <p>Người miền Nam rất chú trọng cách chơi chữ. Mâm ngũ quả của họ thể hiện mong muốn: <strong>"Cầu sung vừa đủ xài"</strong>.</p>
    <ul>
        <li><strong>Mãng cầu (Cầu):</strong> Cầu mong.</li>
        <li><strong>Sung (Sung):</strong> Sung túc, sung mãn.</li>
        <li><strong>Dừa (Vừa):</strong> Vừa vặn, không thiếu thốn.</li>
        <li><strong>Đu đủ (Đủ):</strong> Đầy đủ.</li>
        <li><strong>Xoài (Xài):</strong> Tiêu xài thoải mái.</li>
    </ul>
    <p>Đặc biệt, họ thêm cặp dưa hấu vỏ xanh lòng đỏ để cầu may mắn.</p>

    <div class="blog-quote">
        <strong>Lưu ý:</strong> Dù bày biện theo phong cách nào, hãy nhớ rửa sạch quả, lau khô (nhưng cẩn thận không làm rụng núm quả) trước khi dâng cúng.
    </div>
`;

export default { 
    id: 5, 
    category: "PHONG_THUY",
    title: "Mâm ngũ quả ngày Tết gồm những gì? Ý nghĩa và cách bày 3 miền", 
    excerpt: "Tại sao miền Nam kiêng cúng chuối? Ý nghĩa 'Cầu Sung Dừa Đủ Xoài'. Hướng dẫn cách bày mâm ngũ quả đẹp và chuẩn phong thủy đón Tết.", 
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=800&auto=format&fit=crop", 
    date: "20/01/2025", 
    author: "Ban Biên Tập",
    content: contentBody + renderFAQ(faqData) 
};
