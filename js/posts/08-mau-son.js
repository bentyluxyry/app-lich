
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Người mệnh Thổ có nên sơn nhà màu trắng không?",
        a: "Màu trắng thuộc hành Kim. Thổ sinh Kim (Sinh xuất), tức là gia chủ mệnh Thổ sẽ bị hao tổn năng lượng để nuôi dưỡng màu trắng. Do đó, <strong>không nên</strong> sơn màu trắng là màu chủ đạo, chỉ nên dùng làm điểm nhấn nhẹ."
    },
    {
        q: "Màu kỵ nhất với mệnh Thổ là màu gì?",
        a: "Màu kỵ nhất là <strong>Xanh lá cây (Xanh lục)</strong> thuộc hành Mộc. Mộc khắc Thổ (Cây hút dinh dưỡng từ đất), gây suy yếu vận khí, sức khỏe và tài lộc của gia chủ mệnh Thổ."
    },
    {
        q: "Mệnh Thổ sơn nhà màu đỏ có bị nóng không?",
        a: "Màu đỏ rất tốt cho mệnh Thổ (Hỏa sinh Thổ), nhưng nếu lạm dụng sẽ gây cảm giác nóng bức, căng thẳng. Bạn nên chọn các tông nhẹ hơn như <strong>Hồng đất, Cam đất, Tím nhạt</strong> hoặc chỉ dùng màu đỏ cho các mảng tường trang trí."
    }
];

const contentBody = `
    <p>Trong phong thủy nhà ở, màu sơn không chỉ quyết định thẩm mỹ mà còn ảnh hưởng trực tiếp đến vận khí của gia chủ. Người mệnh Thổ tượng trưng cho Đất, mang tính chất hiền hòa, vững chãi và nuôi dưỡng. Vậy gia chủ mệnh Thổ nên chọn màu sơn gì để kích hoạt tài lộc?</p>

    <h2 id="mau-ban-menh">1. Màu Bản Mệnh: Vàng, Nâu Đất</h2>
    <p>Đây là những màu sắc "an toàn" và tương hợp nhất với người mệnh Thổ.</p>
    <ul>
        <li><strong>Màu Vàng (Vàng chanh, Vàng kem):</strong> Mang lại cảm giác ấm áp, tươi mới và giàu năng lượng. Màu vàng đại diện cho sự sung túc và quyền quý.</li>
        <li><strong>Màu Nâu đất:</strong> Tạo cảm giác tĩnh tại, an yên và vững chãi. Màu này rất hợp với phòng ngủ hoặc phòng làm việc của người lớn tuổi, giúp tinh thần thư thái.</li>
    </ul>

    <h2 id="mau-tuong-sinh">2. Màu Tương Sinh: Đỏ, Cam, Hồng, Tím (Hành Hỏa)</h2>
    <p>Theo quy luật Ngũ hành, <strong>Hỏa sinh Thổ</strong> (Lửa thiêu đốt mọi thứ thành tro bụi, vun đắp thành đất). Do đó, các gam màu nóng thuộc hành Hỏa là lựa chọn tuyệt vời để kích thích tài vận.</p>
    <p>Tuy nhiên, các gam màu này thường khá gắt. Bạn nên sử dụng các tông màu pastel (nhạt) như:</p>
    <ul>
        <li>Hồng phấn, Hồng đất.</li>
        <li>Cam san hô, Cam đất.</li>
        <li>Tím khoai môn.</li>
    </ul>

    <h2 id="mau-can-tranh">3. Những Màu Cần Tránh (Tương Khắc)</h2>
    <p>Người mệnh Thổ tối kỵ hành Mộc. Vì vậy, tuyệt đối hạn chế sử dụng <strong>Màu Xanh Lá Cây</strong> làm màu chủ đạo. Nếu quá yêu thích màu này, bạn chỉ nên dùng cây xanh để trang trí một vài góc nhỏ.</p>
    <p>Ngoài ra, màu Xanh nước biển (Thủy) cũng không quá tốt vì Thổ khắc Thủy (Đất ngăn nước), gia chủ phải tốn sức để khắc chế, gây mệt mỏi.</p>

    <div class="blog-quote">
        <strong>Mẹo phối màu 2025:</strong> Xu hướng năm nay là sự kết hợp giữa <strong>Vàng Kem (Thổ)</strong> làm nền và <strong>Cam Đất (Hỏa)</strong> làm điểm nhấn, tạo nên không gian vừa sang trọng, vừa ấm cúng lại hợp phong thủy.
    </div>
`;

export default { 
    id: 8, 
    category: "PHONG_THUY",
    title: "Chọn màu sơn nhà hợp mệnh Thổ: Kích hoạt tài lộc, gia đạo yên ấm", 
    excerpt: "Người mệnh Thổ nên sơn nhà màu gì? Gợi ý bảng màu tương sinh (Hỏa) và tương hợp (Thổ) giúp gia chủ đón may mắn, tránh màu kỵ (Mộc).", 
    image: "https://images.unsplash.com/photo-1556912173-3db996e7c683?q=80&w=800&auto=format&fit=crop", 
    date: "05/01/2025", 
    author: "Chuyên gia Phong Thủy",
    content: contentBody + renderFAQ(faqData)
};
