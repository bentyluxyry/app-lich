
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Số Sứ Mệnh khác gì Số Chủ Đạo?",
        a: "Số Chủ Đạo (Life Path) dựa trên ngày sinh, chỉ ra đường đời và bài học chính. Số Sứ Mệnh (Destiny Number) dựa trên Họ Tên đầy đủ, chỉ ra khả năng và mục đích bạn cần đạt được trong đời."
    },
    {
        q: "Làm sao tính Số Sứ Mệnh?",
        a: "Chuyển đổi từng chữ cái trong Họ và Tên thành số (theo bảng Pitago), sau đó cộng tổng lại và rút gọn thành 1 chữ số (hoặc số Master 11, 22, 33)."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Số Sứ Mệnh (Destiny Number) là gì? Khám phá mục đích sống của bạn",
      "description": "Số Sứ Mệnh tiết lộ tài năng tiềm ẩn và đích đến cuối cùng của cuộc đời bạn. Hướng dẫn cách tính dựa trên Họ Tên đầy đủ.",
      "image": "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Nếu Số Chủ Đạo là con đường bạn đi, thì <strong>Số Sứ Mệnh</strong> chính là đích đến. Nó trả lời cho câu hỏi: "Tôi sinh ra trên đời này để làm gì?".</p>

    <h2 id="y-nghia-so-su-menh">1. Ý Nghĩa Của Các Số Sứ Mệnh</h2>
    <ul>
        <li><strong>Số 1:</strong> Sứ mệnh trở thành người lãnh đạo, tiên phong, dẫn dắt người khác.</li>
        <li><strong>Số 2:</strong> Sứ mệnh trở thành người hòa giải, kết nối và mang lại sự bình yên.</li>
        <li><strong>Số 3:</strong> Sứ mệnh truyền cảm hứng, mang lại niềm vui thông qua ngôn ngữ và nghệ thuật.</li>
        <li><strong>Số 4:</strong> Sứ mệnh xây dựng nền tảng vững chắc, tạo ra trật tự và quy trình.</li>
        <li><strong>Số 5:</strong> Sứ mệnh mang lại sự thay đổi, tự do và cải cách.</li>
        <li><strong>Số 6:</strong> Sứ mệnh chăm sóc, yêu thương và phụng sự gia đình/cộng đồng.</li>
        <li><strong>Số 7:</strong> Sứ mệnh tìm kiếm chân lý, tri thức và phát triển tâm linh.</li>
        <li><strong>Số 8:</strong> Sứ mệnh tạo ra sự thịnh vượng vật chất và cân bằng quyền lực.</li>
        <li><strong>Số 9:</strong> Sứ mệnh nhân đạo, cống hiến cho xã hội và hoàn thiện con người.</li>
    </ul>

    <h2 id="tam-quan-trong">2. Tại Sao Cần Biết Số Sứ Mệnh?</h2>
    <p>Biết được Số Sứ Mệnh giúp bạn chọn nghề nghiệp phù hợp, hiểu rõ giá trị bản thân và không bị lạc lối khi đứng trước những ngã rẽ cuộc đời. Khi sống đúng với sứ mệnh, bạn sẽ cảm thấy hạnh phúc và trọn vẹn nhất.</p>

    <div class="blog-quote">
        Hãy kết hợp cả Số Chủ Đạo và Số Sứ Mệnh để có cái nhìn toàn diện nhất về bản đồ cuộc đời mình.
    </div>
`;

export default { 
    id: 23, 
    category: "THAN_SO_HOC",
    title: "Số Sứ Mệnh (Destiny Number) là gì? Khám phá mục đích sống của bạn", 
    excerpt: "Số Sứ Mệnh tiết lộ tài năng tiềm ẩn và đích đến cuối cùng của cuộc đời bạn. Hướng dẫn cách tính dựa trên Họ Tên đầy đủ.", 
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1280&fit=crop", 
    date: "05/02/2025", 
    author: "Chuyên gia Thần Số",
    content: contentBody + renderFAQ(faqData) 
};
