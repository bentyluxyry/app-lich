
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Cách tính Năm Cá Nhân như thế nào?",
        a: "Công thức: Năm Cá Nhân = Năm Thế Giới (2025 = 9) + Ngày sinh + Tháng sinh. (Cộng rút gọn tất cả về 1 chữ số từ 1-9)."
    },
    {
        q: "Năm thế giới số 9 (2025) có ý nghĩa gì?",
        a: "Năm số 9 đại diện cho sự kết thúc một chu kỳ, sự buông bỏ, nhân đạo và hoàn thiện. Đây là năm để dọn dẹp cái cũ, chuẩn bị cho khởi đầu mới vào năm 2026 (số 1)."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Dự báo Năm Cá Nhân 2025: Thời điểm vàng để buông bỏ và chuyển mình",
      "description": "Năm 2025 là năm Thế giới số 9. Điều này ảnh hưởng thế nào đến Năm cá nhân của bạn? Hướng dẫn cách tính và lên kế hoạch cho năm mới.",
      "image": "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Năm 2025 mang năng lượng của <strong>Con số Thế giới 9</strong> (2+0+2+5 = 9). Đây là năm của sự kết thúc, tổng kết và thanh lọc. Bất kể năm cá nhân của bạn là số mấy, bạn cũng sẽ chịu ảnh hưởng chung của sóng rung số 9 này.</p>

    <h2 id="y-nghia-nam-so-9">1. Ý Nghĩa Của Năm Thế Giới Số 9</h2>
    <p>Số 9 là đỉnh cao của sự phát triển tâm thức. Năm 2025 khuyến khích chúng ta:</p>
    <ul>
        <li>Buông bỏ những mối quan hệ độc hại, công việc không phù hợp.</li>
        <li>Hướng về cộng đồng, làm từ thiện, chia sẻ.</li>
        <li>Tha thứ và chữa lành những tổn thương trong quá khứ.</li>
    </ul>

    <h2 id="du-bao-ngan">2. Dự Báo Nhanh Cho Các Năm Cá Nhân</h2>
    <ul>
        <li><strong>Năm cá nhân 1:</strong> Khởi đầu mới mạnh mẽ. Thời điểm vàng để gieo hạt.</li>
        <li><strong>Năm cá nhân 9:</strong> Trùng với năm thế giới. Sự thay đổi diễn ra cực mạnh. Hãy dũng cảm buông bỏ.</li>
        <li><strong>Năm cá nhân 4 & 7:</strong> Năm trũng. Cần tập trung vào nội tâm, học tập và củng cố nền tảng, tránh đầu tư mạo hiểm.</li>
        <li><strong>Năm cá nhân 8:</strong> Năm của tài chính và quyền lực. Cơ hội gặt hái thành quả sau 7 năm nỗ lực.</li>
    </ul>

    <div class="blog-quote">
        Đừng sợ sự kết thúc. Kết thúc của năm số 9 chính là để mở ra một chu kỳ mới rực rỡ hơn vào năm số 1 (2026).
    </div>
`;

export default { 
    id: 22, 
    category: "THAN_SO_HOC",
    title: "Dự báo Năm Cá Nhân 2025: Thời điểm vàng để buông bỏ và chuyển mình", 
    excerpt: "Năm 2025 là năm Thế giới số 9. Điều này ảnh hưởng thế nào đến Năm cá nhân của bạn? Hướng dẫn cách tính và lên kế hoạch cho năm mới.", 
    image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=1280&fit=crop", 
    date: "30/01/2025", 
    author: "Chuyên gia Thần Số",
    content: contentBody + renderFAQ(faqData) 
};
