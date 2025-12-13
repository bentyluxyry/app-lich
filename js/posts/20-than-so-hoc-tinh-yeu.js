
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Số chủ đạo nào hợp nhau nhất trong tình yêu?",
        a: "Thường là các cặp số cùng trục hoặc bổ trợ nhau. Ví dụ: Số 2 và 6 (tình cảm), Số 1 và 5 (tự do), Số 4 và 8 (thực tế)."
    },
    {
        q: "Hai người cùng số chủ đạo có hợp nhau không?",
        a: "Có và không. Hợp ở chỗ thấu hiểu nhau nhanh chóng, nhưng dễ nhàm chán hoặc xung đột nếu cả hai cùng có cái tôi lớn (như cùng số 1 hoặc số 8)."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Bói Tình Yêu Thần Số Học: Cặp đôi số nào sinh ra là để dành cho nhau?",
      "description": "Khám phá mức độ hòa hợp trong tình yêu dựa trên Số Chủ Đạo. Tìm kiếm người bạn đời lý tưởng qua lăng kính Thần số học Pitago.",
      "image": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Tình yêu là một ẩn số, nhưng <strong>Thần Số Học</strong> có thể giúp bạn giải mã phần nào sự tương thích giữa hai tâm hồn. Bằng cách so sánh Số Chủ Đạo, bạn có thể hiểu rõ hơn về đối phương và cách duy trì mối quan hệ bền vững.</p>

    <h2 id="nhom-so-cam-xuc">1. Nhóm Cảm Xúc & Nghệ Thuật (2, 3, 6, 9)</h2>
    <p>Những người mang số chủ đạo này sống thiên về tình cảm, lãng mạn và sự quan tâm.</p>
    <ul>
        <li><strong>Số 2:</strong> Nhạy cảm, cần sự che chở. Hợp với số 6, 9 (người biết chăm sóc).</li>
        <li><strong>Số 6:</strong> Người của gia đình. Là mảnh ghép hoàn hảo cho số 2 hoặc số 8 (cần hậu phương).</li>
        <li><strong>Số 3 & 9:</strong> Cặp đôi vui vẻ, sáng tạo và đầy lý tưởng.</li>
    </ul>

    <h2 id="nhom-so-ly-tri">2. Nhóm Lý Trí & Thực Tế (1, 4, 7, 8)</h2>
    <p>Họ yêu bằng cái đầu lạnh nhưng trái tim nóng. Họ coi trọng sự nghiệp và sự ổn định.</p>
    <ul>
        <li><strong>Số 4:</strong> Thích sự an toàn. Hợp với số 7 (cùng thích phân tích) hoặc số 8 (cùng tham vọng).</li>
        <li><strong>Số 8:</strong> Cần người bạn đời độc lập. Hợp với số 4 hoặc số 1 (cùng tần số lãnh đạo).</li>
    </ul>

    <h2 id="nhom-so-tu-do">3. Nhóm Tự Do & Kết Nối (5, 10/1)</h2>
    <p>Họ ghét sự ràng buộc, thích phiêu lưu và đổi mới.</p>
    <ul>
        <li><strong>Số 5:</strong> Cần người bạn đồng hành thú vị. Hợp nhất với số 1 hoặc số 3.</li>
    </ul>

    <div class="blog-quote">
        <strong>Lưu ý:</strong> Mọi con số đều có thể hạnh phúc bên nhau nếu biết thấu hiểu và nhường nhịn. Thần số học chỉ là công cụ tham khảo để bạn hiểu đối phương hơn.
    </div>
`;

export default { 
    id: 20, 
    category: "THAN_SO_HOC",
    title: "Bói Tình Yêu Thần Số Học: Cặp đôi số nào sinh ra là để dành cho nhau?", 
    excerpt: "Khám phá mức độ hòa hợp trong tình yêu dựa trên Số Chủ Đạo. Tìm kiếm người bạn đời lý tưởng qua lăng kính Thần số học Pitago.", 
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1280&fit=crop", 
    date: "25/01/2025", 
    author: "Chuyên gia Thần Số",
    content: contentBody + renderFAQ(faqData) 
};
