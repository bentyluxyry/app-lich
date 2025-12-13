
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Số chủ đạo 1 hợp với nghề gì?",
        a: "Người số 1 sinh ra để làm lãnh đạo hoặc làm chủ. Các nghề phù hợp: Chủ doanh nghiệp, Quản lý cấp cao, Chính trị gia, Giám đốc điều hành, hoặc các công việc đòi hỏi sự độc lập cao như Freelancer, Kỹ sư sáng tạo."
    },
    {
        q: "Số chủ đạo 1 hợp với số nào trong tình yêu?",
        a: "Số 1 thường hợp với số 3 (vui vẻ, sáng tạo) và số 5 (tự do, năng động) để bổ trợ năng lượng. Cần cân nhắc khi kết đôi với số 1 hoặc số 8 vì cái tôi của cả hai đều quá lớn, dễ xung đột."
    },
    {
        q: "Điểm yếu lớn nhất của người số 1 là gì?",
        a: "Đó là sự bảo thủ và cái tôi quá lớn. Họ thường khó chấp nhận lời khuyên từ người khác và đôi khi trở nên độc đoán, áp đặt trong mắt mọi người."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Ý nghĩa Số chủ đạo 1: Nhà lãnh đạo bẩm sinh và người tiên phong",
      "description": "Giải mã toàn diện người mang Số Chủ Đạo 1 trong Thần số học. Đặc điểm tính cách, điểm mạnh, điểm yếu và định hướng nghề nghiệp phù hợp nhất.",
      "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Trong Thần số học Pythagoras, <strong>Số 1</strong> là con số của sự khởi đầu, đại diện cho cái tôi cá nhân, sự độc lập và khả năng lãnh đạo tuyệt vời. Nếu bạn sở hữu Số chủ đạo 1, bạn giống như một mũi tên dũng mãnh luôn lao về phía trước.</p>

    <h2 id="dac-diem-noi-bat">1. Đặc Điểm Nổi Bật Của Người Số 1</h2>
    <p>Người số 1 thường để lại ấn tượng mạnh mẽ với người đối diện bởi phong thái tự tin và quyết đoán.</p>
    <ul>
        <li><strong>Tố chất lãnh đạo:</strong> Bạn không thích làm theo chỉ đạo của người khác. Bạn muốn là người cầm trịch, đưa ra quyết định và chịu trách nhiệm.</li>
        <li><strong>Độc lập và Tự chủ:</strong> Bạn có khả năng làm việc độc lập cực tốt. Khó khăn không làm bạn nản lòng mà càng kích thích ý chí chiến đấu của bạn.</li>
        <li><strong>Sáng tạo và Tiên phong:</strong> Bạn luôn có những ý tưởng mới mẻ, táo bạo và dám đi những con đường chưa ai đi.</li>
    </ul>

    <h2 id="diem-manh-yeu">2. Điểm Mạnh Và Điểm Yếu</h2>
    
    <h3>Điểm mạnh</h3>
    <p>Sự tập trung cao độ là vũ khí lợi hại nhất của số 1. Khi đã xác định mục tiêu, bạn sẽ dốc toàn lực để đạt được nó bất chấp rào cản. Bạn cũng rất thẳng thắn, rõ ràng và đáng tin cậy.</p>

    <h3>Điểm yếu cần khắc phục</h3>
    <p>Cái tôi (Ego) chính là "gót chân Asin" của bạn. Sự tự tin thái quá đôi khi biến thành tự kiêu. Bạn dễ trở nên độc đoán, thiếu kiên nhẫn và hay áp đặt suy nghĩ của mình lên người khác, khiến các mối quan hệ trở nên căng thẳng.</p>

    <div class="blog-quote">
        <strong>Lời khuyên cho số 1:</strong> Một nhà lãnh đạo giỏi không chỉ biết ra lệnh mà còn phải biết lắng nghe. Hãy học cách hạ cái tôi xuống và thấu hiểu cảm xúc của người khác, thành công của bạn sẽ bền vững hơn.
    </div>

    <h2 id="bai-hoc-cuoc-doi">3. Bài Học Đường Đời</h2>
    <p>Bài học lớn nhất dành cho người số 1 là học cách trở thành một nhà lãnh đạo thực thụ: Lãnh đạo bằng sự ảnh hưởng và trái tim, chứ không phải bằng quyền lực hay sự áp chế. Bạn cần học cách tin tưởng và giao quyền cho người khác.</p>
`;

export default { 
    id: 24, 
    category: "THAN_SO_HOC",
    title: "Ý nghĩa Số chủ đạo 1: Nhà lãnh đạo bẩm sinh và người tiên phong", 
    excerpt: "Số 1 đại diện cho sự khởi đầu và quyền lực. Khám phá điểm mạnh, điểm yếu và nghề nghiệp phù hợp nhất cho người mang Số chủ đạo 1.", 
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1280&fit=crop", 
    date: "10/02/2025", 
    author: "Chuyên gia Thần Số",
    content: contentBody + renderFAQ(faqData) 
};
