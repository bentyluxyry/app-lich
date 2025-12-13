
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Những vật dụng gì cần mang vào nhà đầu tiên khi nhập trạch?",
        a: "Gia chủ nên tự tay mang <strong>bàn thờ gia tiên, bếp (bếp ga/từ), chiếu/nệm đang sử dụng, hũ gạo, hũ muối và nước</strong> vào nhà đầu tiên. Tránh đi tay không vào nhà mới."
    },
    {
        q: "Bà bầu có nên tham gia lễ nhập trạch không?",
        a: "Theo quan niệm dân gian, bà bầu nên tránh tham gia lễ nhập trạch vì sợ ảnh hưởng đến thần thai do khí trường nhà mới chưa ổn định. Nếu bắt buộc, nên dùng chổi mới quét qua đồ đạc trước khi chuyển."
    },
    {
        q: "Nếu chưa ở ngay thì có cần làm lễ nhập trạch không?",
        a: "Có. Bạn nên làm lễ nhập trạch lấy ngày tốt để báo cáo thần linh. Sau đó có thể ngủ lại 1 đêm để 'khai nhà' rồi khóa cửa, thỉnh thoảng qua thắp hương đến khi chuyển về ở hẳn."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Văn khấn Nhập Trạch về nhà mới, nhà chung cư: Nghi thức và bài cúng chi tiết",
      "description": "Lễ nhập trạch là gì? Hướng dẫn thủ tục cúng về nhà mới (Nhập trạch) đầy đủ nhất. Bài văn khấn thần linh, gia tiên giúp gia đạo an khang.",
      "image": "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Lễ <strong>Nhập Trạch</strong> (về nhà mới) được ví như việc "đăng ký hộ khẩu" với thần linh cai quản khu vực. Dù là nhà đất hay chung cư, lễ nhập trạch đều rất quan trọng để kích hoạt sinh khí cho ngôi nhà.</p>

    <h2 id="quy-trinh-nhap-trach">1. Quy Trình Nhập Trạch Cơ Bản</h2>
    <ol>
        <li><strong>Chọn ngày giờ tốt:</strong> Tránh các ngày Tam Nương, Nguyệt Kỵ. Nên chọn ngày hợp tuổi gia chủ.</li>
        <li><strong>Đốt lò than:</strong> Đặt lò than củi (hoặc bếp ga mini bật lửa) ngay cửa ra vào. Gia chủ và các thành viên bước qua lò than để loại bỏ khí xấu.</li>
        <li><strong>Mang đồ vào nhà:</strong> Gia chủ mang bát hương, bài vị tổ tiên vào trước. Các thành viên khác mang bếp, gạo, muối, tiền vàng...</li>
        <li><strong>Dâng lễ:</strong> Bày biện lễ vật lên ban thờ.</li>
        <li><strong>Đọc văn khấn:</strong> Khấn Thần Linh trước, Gia Tiên sau.</li>
        <li><strong>Khai bếp:</strong> Bật bếp đun nước pha trà (để nước sôi 5-10 phút để kích hoạt tính Hỏa).</li>
    </ol>

    <h2 id="van-khan-nhap-trach">2. Bài Văn Khấn Nhập Trạch (Thần Linh)</h2>
    <div class="blog-quote">
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
        <p>Kính lạy: Hoàng thiên Hậu Thổ chư vị Tôn thần.</p>
        <p>Kính lạy: Các ngài Thần Linh, Thổ Địa, Bản Gia Táo Quân cai quản trong xứ này.</p>
        <p>Tín chủ con là: [Họ tên] - Tuổi: [Tuổi]</p>
        <p>Hôm nay là ngày... tháng... năm... Tín chủ con thành tâm sắm lễ, quả cau lá trầu, hương hoa trà quả, thắp nén tâm hương dâng lên trước án.</p>
        <p>Kính cẩn tâu trình: Nay gia đình chúng con hoàn tất công trình, chọn được ngày lành tháng tốt để dọn về sinh sống tại địa chỉ: [Địa chỉ nhà mới].</p>
        <p>Cúi xin các Ngài thương xót tín chủ, giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật. Cho phép chúng con được nhập trạch về nơi ở mới, rước vong linh Gia tiên về nơi này thờ phụng.</p>
        <p>Cầu xin các Ngài phù hộ độ trì cho gia đạo chúng con bình an, sức khỏe dồi dào, làm ăn phát đạt, vạn sự tốt lành.</p>
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
    </div>

    <h2 id="van-khan-gia-tien">3. Bài Văn Khấn Gia Tiên (Sau Khi Khấn Thần Linh)</h2>
    <p>Sau khi xin phép Thần Linh, gia chủ quay sang bát hương Gia Tiên để mời tổ tiên về nhà mới:</p>
    <div class="blog-quote">
        <p>... Kính lạy Tổ Tiên nội ngoại họ [Họ của gia chủ]...</p>
        <p>Nay gia đình chuyển về nhà mới, kính mời hương hồn các cụ về đây ngự giá, chứng giám lòng thành, phù hộ cho con cháu hiếu thuận, gia đạo hưng long...</p>
    </div>

    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-700 mt-4">
        <strong>Tham khảo thêm:</strong>
        <ul class="list-disc ml-5 mt-2">
            <li><a onclick="app.viewPost('van-khan-co-truyen-huong-dan-chi-tiet-cung-gia-tien')" class="text-green-600 hover:underline cursor-pointer font-bold">Văn khấn cổ truyền: Hướng dẫn chi tiết cúng Gia Tiên</a></li>
        </ul>
    </div>
`;

export default { 
    id: 17, 
    category: "VAN_KHAN",
    title: "Văn khấn Nhập Trạch về nhà mới, nhà chung cư: Nghi thức và bài cúng chi tiết", 
    excerpt: "Lễ nhập trạch là gì? Hướng dẫn thủ tục cúng về nhà mới (Nhập trạch) đầy đủ nhất. Bài văn khấn thần linh, gia tiên giúp gia đạo an khang.", 
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1280&fit=crop", 
    date: "18/01/2025", 
    author: "Ban Biên Tập",
    content: contentBody + renderFAQ(faqData) 
};
