
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Nên đi chùa trước hay xuất hành trước?",
        a: "Xuất hành là bước ra khỏi nhà lần đầu tiên. Bạn nên thực hiện nghi thức xuất hành theo hướng tốt trước, sau đó mới di chuyển đến chùa hoặc đi chúc tết. Điều này đảm bảo bạn đã đón được khí tốt ngay từ bước chân đầu tiên."
    },
    {
        q: "Nếu hướng tốt là hướng nhà vệ sinh thì sao?",
        a: "Hướng xuất hành tính từ cửa chính ra ngoài đường. Nếu hướng tốt trùng với hướng xấu trong nhà, bạn chỉ cần đi ra khỏi cổng và rẽ/đi về phía hướng tốt đó một đoạn là được."
    },
    {
        q: "Người trong gia đình có cần xuất hành cùng hướng không?",
        a: "Thường thì người trụ cột gia đình (chồng/cha) sẽ chọn hướng xuất hành đại diện cho cả nhà. Các thành viên khác có thể đi cùng để hưởng lộc chung."
    }
];

const contentBody = `
    <p>Tục lệ <strong>Xuất hành đầu năm</strong> là nét đẹp văn hóa lâu đời. Vào ngày mùng 1 Tết, người Việt thường chọn giờ đẹp, hướng đẹp để bước ra khỏi nhà, mong cầu một năm mới may mắn, Hỷ thần (Niềm vui) và Tài thần (Tài lộc) gõ cửa.</p>

    <h2 id="thong-tin-mung-1">1. Thông Tin Ngày Mùng 1 Tết Ất Tỵ 2025</h2>
    <ul>
        <li><strong>Dương lịch:</strong> Thứ Tư, ngày 29/01/2025.</li>
        <li><strong>Âm lịch:</strong> Ngày 01/01/2025 - Ngày Giáp Thìn, Tháng Mậu Dần, Năm Ất Tỵ.</li>
        <li><strong>Ngũ hành:</strong> Ngày Phúc Đăng Hỏa (Lửa đèn dầu).</li>
        <li><strong>Sao tốt:</strong> Thiên Đức, Nguyệt Đức (Rất tốt cho mọi việc).</li>
    </ul>

    <h2 id="huong-xuat-hanh">2. Hướng Xuất Hành Đại Cát Năm 2025</h2>
    <p>Để đón vận may, gia chủ có thể chọn một trong hai hướng sau (tính theo hướng đi từ nhà ra):</p>
    
    <h3>Hỷ Thần (Cầu tình duyên, gia đạo, niềm vui)</h3>
    <p><strong>Hướng: Đông Bắc</strong></p>
    <p>Xuất hành hướng này sẽ gặp nhiều chuyện vui mừng, hỷ sự, gia đạo yên ấm, cưới hỏi thuận lợi. Rất hợp với người trẻ cầu tình duyên hoặc gia đình cầu con cái.</p>

    <h3>Tài Thần (Cầu tiền bạc, kinh doanh)</h3>
    <p><strong>Hướng: Đông Nam</strong></p>
    <p>Xuất hành hướng này để cầu tài lộc, buôn may bán đắt, công việc thăng tiến, tiền bạc dồi dào. Rất hợp với người làm kinh doanh, buôn bán.</p>

    <h2 id="gio-dep-xuat-hanh">3. Giờ Đẹp Xuất Hành Ngày Mùng 1</h2>
    <p>Chọn đúng giờ Hoàng Đạo kết hợp với hướng tốt sẽ nhân đôi may mắn:</p>
    <ul>
        <li><strong>Giờ Dần (3h - 5h):</strong> Giờ Đại An. Mọi việc đều tốt, đi hướng Tây Nam để cầu tài.</li>
        <li><strong>Giờ Thìn (7h - 9h):</strong> Giờ Tốc Hỷ. Tin vui đến bất ngờ, đi gặp gỡ quan chức, đối tác rất thuận lợi.</li>
        <li><strong>Giờ Tỵ (9h - 11h):</strong> Giờ Tiểu Các. Rất tốt. Buôn bán có lời, phụ nữ có tin mừng, người đi sắp về nhà.</li>
        <li><strong>Giờ Thân (15h - 17h):</strong> Giờ Đại An (lặp lại). Thích hợp xuất hành buổi chiều.</li>
    </ul>

    <div class="blog-quote">
        <strong>Lưu ý:</strong> Tránh xuất hành vào giờ <strong>Không Vong</strong> (Giờ Ngọ 11h-13h) để tránh việc dở dang, thất lạc đồ đạc.
    </div>
`;

export default { 
    id: 4, 
    category: "PHONG_THUY",
    title: "Hướng xuất hành đầu năm 2025: Đón Hỷ Thần, Tài Thần vào nhà", 
    excerpt: "Mùng 1 Tết Ất Tỵ 2025 nên xuất hành hướng nào? Tổng hợp giờ đẹp và hướng đại cát để cầu tình duyên, tài lộc cho cả năm hanh thông.", 
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop", 
    date: "05/02/2025", 
    author: "Thầy Phong Thủy",
    content: contentBody + renderFAQ(faqData) 
};
