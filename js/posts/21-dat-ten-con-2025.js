
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Bé sinh năm 2025 thiếu số nào trong biểu đồ?",
        a: "Bé sinh năm 2025 (Ất Tỵ) có sẵn số 2, 0, 2, 5. Thường sẽ thiếu các số 1, 3, 4, 6, 7, 8, 9 (tùy vào ngày tháng sinh cụ thể). Tên gọi cần bổ sung các số còn thiếu này."
    },
    {
        q: "Làm sao chuyển đổi chữ cái sang số?",
        a: "Sử dụng hệ thống Pitago: A=1, B=2, C=3... Ví dụ tên 'AN' = 1 + 5 = 6."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Gợi ý đặt tên con sinh năm 2025 (Ất Tỵ) theo Thần Số Học để bé thông minh, thành đạt",
      "description": "Hướng dẫn cách đặt tên danh xưng cho bé sinh năm 2025 giúp cân bằng biểu đồ ngày sinh, bổ sung các con số còn thiếu để vận mệnh hanh thông.",
      "image": "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Cái tên không chỉ để gọi mà còn mang năng lượng rung động ảnh hưởng đến tính cách và cuộc đời. Với các bé sinh năm <strong>2025 (Ất Tỵ)</strong>, việc chọn tên theo Thần Số Học sẽ giúp bổ khuyết cho biểu đồ ngày sinh vốn thiên về cảm xúc (nhiều số 2).</p>

    <h2 id="dac-diem-be-2025">1. Đặc Điểm Biểu Đồ Sinh Năm 2025</h2>
    <p>Trẻ sinh năm 2025 có sẵn hai con số 2 và một con số 5. Điều này cho thấy bé rất nhạy cảm, trực giác tốt và yêu tự do.</p>
    <p><strong>Điểm yếu cần khắc phục:</strong> Thiếu tính thực tế (thiếu số 4, 7) và thiếu sự quyết đoán (thiếu số 1, 9).</p>

    <h2 id="goi-y-dat-ten">2. Gợi Ý Các Tên Hay Bổ Sung Số Thiếu</h2>
    
    <h3>2.1. Bổ sung số 1 (Lãnh đạo, Tự chủ)</h3>
    <p>Các tên thuộc nhóm chữ cái A, J, S. Ví dụ: <strong>An, Anh, Ánh, Sơn, Sang</strong>.</p>

    <h3>2.2. Bổ sung số 4 (Kỷ luật, Thực tế)</h3>
    <p>Các tên thuộc nhóm chữ cái D, M, V. Ví dụ: <strong>Dũng, Dương, Minh, Mạnh, Vũ, Vy</strong>.</p>

    <h3>2.3. Bổ sung số 8 (Trí tuệ, Tài chính)</h3>
    <p>Các tên thuộc nhóm chữ cái H, Q, Z. Ví dụ: <strong>Hùng, Hải, Hoa, Quang, Quyên</strong>.</p>

    <h2 id="luu-y-quan-trong">3. Lưu Ý Khi Đặt Tên</h2>
    <p>Không nên nhồi nhét quá nhiều một con số vào tên, tránh sự dư thừa năng lượng. Ví dụ quá nhiều số 1 sẽ khiến bé trở nên độc đoán, bảo thủ.</p>
    
    <div class="blog-quote">
        Tên gọi hay nhất là tên gọi cân bằng được Ngũ hành (Phong thủy) và Thần số học, đồng thời mang ý nghĩa tốt đẹp mà cha mẹ gửi gắm.
    </div>
`;

export default { 
    id: 21, 
    category: "THAN_SO_HOC",
    title: "Gợi ý đặt tên con sinh năm 2025 (Ất Tỵ) theo Thần Số Học để bé thông minh, thành đạt", 
    excerpt: "Hướng dẫn cách đặt tên danh xưng cho bé sinh năm 2025 giúp cân bằng biểu đồ ngày sinh, bổ sung các con số còn thiếu để vận mệnh hanh thông.", 
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1280&fit=crop", 
    date: "28/01/2025", 
    author: "Ban Biên Tập",
    content: contentBody + renderFAQ(faqData) 
};
