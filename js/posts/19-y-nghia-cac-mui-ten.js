
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Làm sao biết mình có mũi tên nào?",
        a: "Bạn cần lập biểu đồ ngày sinh (điền các số ngày/tháng/năm sinh vào 9 ô). Nếu 3 số nằm liên tiếp nhau theo hàng ngang, dọc hoặc chéo sẽ tạo thành một mũi tên."
    },
    {
        q: "Mũi tên trống (khuyết) có xấu không?",
        a: "Không hẳn là xấu, nó chỉ ra điểm yếu cần khắc phục. Ví dụ thiếu mũi tên 1-5-9 (Quyết tâm) thì bạn hay chần chừ. Biết để rèn luyện sẽ tốt lên."
    },
    {
        q: "Mũi tên nào quan trọng nhất?",
        a: "Mũi tên 1-5-9 (Quyết tâm) và 3-5-7 (Tâm linh/Nhạy cảm) thường có tác động lớn nhất đến tính cách và đường đời."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Ý nghĩa 8 mũi tên cá tính trong Thần Số Học: Sức mạnh và Hạn chế",
      "description": "Giải mã chi tiết các mũi tên trong biểu đồ ngày sinh: Mũi tên quyết tâm 1-5-9, Mũi tên trí tuệ 3-6-9, Mũi tên cảm xúc 2-5-8 và cách khắc phục mũi tên trống.",
      "image": "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Trong <strong>Thần Số Học Pythagoras</strong>, ngoài Số Chủ Đạo, các <strong>Mũi Tên Cá Tính</strong> (Arrows of Individuality) trên biểu đồ ngày sinh đóng vai trò cực kỳ quan trọng trong việc định hình tính cách, ưu điểm và khuyết điểm của mỗi người.</p>

    <h2 id="mui-ten-suc-manh">1. Các Mũi Tên Sức Mạnh (Có đủ 3 số)</h2>
    <p>Khi 3 con số xuất hiện liên tiếp trên một hàng, chúng tạo thành một dòng năng lượng mạnh mẽ.</p>

    <h3>1.1. Mũi tên Kế hoạch (1-2-3)</h3>
    <p>Người sở hữu mũi tên này sống rất ngăn nắp, có trật tự và giỏi lập kế hoạch. Tuy nhiên, đôi khi họ hơi cứng nhắc và thiếu linh hoạt.</p>

    <h3>1.2. Mũi tên Ý chí (4-5-6)</h3>
    <p>Đây là những người có ý chí kiên cường, dám nghĩ dám làm. Họ thường gặt hái được nhiều thành công nhờ sự bền bỉ, không ngại khó khăn.</p>

    <h3>1.3. Mũi tên Hoạt động (7-8-9)</h3>
    <p>Đại diện cho sự năng động, thích di chuyển và trải nghiệm. Người này không chịu ngồi yên một chỗ, yêu thích tự do và khám phá thế giới.</p>

    <h3>1.4. Mũi tên Quyết tâm (1-5-9)</h3>
    <p>Đây là mũi tên vàng của sự thành công. Người có mũi tên này rất kiên trì theo đuổi mục tiêu đến cùng. Tuy nhiên, cần tránh sự bảo thủ.</p>

    <h2 id="mui-ten-trong">2. Các Mũi Tên Trống (Khuyết thiếu)</h2>
    <p>Ngược lại, nếu thiếu vắng cả 3 con số trên một hàng, đó là điểm yếu cần khắc phục.</p>
    <ul>
        <li><strong>Trống 1-5-9 (Mũi tên Trì hoãn):</strong> Hay chần chừ, thiếu quyết đoán, dễ bỏ cuộc giữa chừng.</li>
        <li><strong>Trống 3-5-7 (Mũi tên Hoài nghi):</strong> Hay lo lắng, đa nghi, thiếu niềm tin vào cuộc sống và bản thân.</li>
    </ul>

    <div class="blog-quote">
        <strong>Lời khuyên:</strong> Không có biểu đồ nào là hoàn hảo. Việc nhận biết các mũi tên giúp chúng ta phát huy điểm mạnh và rèn luyện để lấp đầy những khoảng trống trong tâm hồn.
    </div>
`;

export default { 
    id: 19, 
    category: "THAN_SO_HOC",
    title: "Ý nghĩa 8 mũi tên cá tính trong Thần Số Học: Sức mạnh và Hạn chế", 
    excerpt: "Giải mã chi tiết các mũi tên trong biểu đồ ngày sinh: Mũi tên quyết tâm 1-5-9, Mũi tên trí tuệ 3-6-9... và cách khắc phục các mũi tên trống.", 
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1280&fit=crop", 
    date: "22/01/2025", 
    author: "Chuyên gia Thần Số",
    content: contentBody + renderFAQ(faqData) 
};
