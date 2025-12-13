
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Cây phong thủy bị chết có điềm gì không?",
        a: "Cây héo hoặc chết thường báo hiệu nguồn năng lượng nơi đó đang xấu hoặc chế độ chăm sóc chưa đúng. Bạn không nên quá lo lắng, hãy dọn bỏ cây chết ngay và thay thế bằng cây mới khỏe mạnh để tái tạo sinh khí."
    },
    {
        q: "Mệnh Hỏa năm 2025 có nên trồng cây thủy sinh không?",
        a: "Hạn chế. Thủy khắc Hỏa. Người mệnh Hỏa hoặc trong năm Hỏa (2025) nên ưu tiên trồng cây trong đất (Thổ) hoặc cây có lá màu đỏ/tím. Nếu thích thủy sinh, hãy chọn bình màu xanh lá hoặc đỏ để hóa giải."
    },
    {
        q: "Có nên đặt cây xương rồng trên bàn làm việc không?",
        a: "Không nên. Xương rồng có gai nhọn sinh ra sát khí, dễ gây bất hòa, thị phi chốn công sở. Nên đặt xương rồng ở ban công hoặc cửa sổ để trấn trạch thì tốt hơn."
    }
];

const contentBody = `
    <p>Năm 2025 là năm <strong>Ất Tỵ (Hành Hỏa)</strong>. Theo quy luật ngũ hành, <strong>Mộc sinh Hỏa</strong>. Vì vậy, việc bài trí cây xanh (hành Mộc) trong nhà hoặc văn phòng năm nay là cực kỳ cát lợi, giúp tiếp thêm nhiên liệu cho ngọn lửa tài lộc bùng cháy.</p>

    <h2 id="cay-kim-tien">1. Cây Kim Tiền (Kim Phát Tài)</h2>
    <p>Đứng đầu bảng xếp hạng luôn là Kim Tiền. Lá cây dày, xanh mướt, vươn thẳng lên cao như những đồng tiền xâu chuỗi.</p>
    <ul>
        <li><strong>Ý nghĩa:</strong> Mang lại sự giàu sang, phú quý và thăng tiến không ngừng.</li>
        <li><strong>Vị trí:</strong> Đặt ở hướng Đông Nam (cung Tài Lộc) hoặc ngay sảnh cửa ra vào.</li>
    </ul>

    <h2 id="cay-luoi-ho">2. Cây Lưỡi Hổ</h2>
    <p>Lưỡi Hổ có lá cứng cáp, mọc thẳng đứng như những thanh kiếm bảo vệ gia chủ.</p>
    <ul>
        <li><strong>Ý nghĩa:</strong> Trừ tà, xua đuổi khí xấu và tiểu nhân. Ngoài ra, nó còn lọc không khí cực tốt (nhả oxy vào ban đêm).</li>
        <li><strong>Hợp mệnh:</strong> Đặc biệt hợp với người mệnh Kim và mệnh Thổ.</li>
    </ul>

    <h2 id="cay-kim-ngan">3. Cây Kim Ngân</h2>
    <p>Thường có 5 lá xòe ra tượng trưng cho ngũ hành cân bằng. Thân cây xoắn vào nhau thể hiện sự đoàn kết.</p>
    <ul>
        <li><strong>Ý nghĩa:</strong> "Kim Ngân" là vàng bạc. Cây giúp giữ tiền, tránh thất thoát tài sản.</li>
        <li><strong>Lưu ý:</strong> Nên chọn cây có số lượng thân lẻ (1, 3, 5) để trồng trong chậu.</li>
    </ul>

    <h2 id="cay-phu-quy">4. Cây Phú Quý</h2>
    <p>Loại cây này có thân và viền lá màu đỏ hồng rất đẹp mắt. Đây là màu bản mệnh của hành Hỏa, cực kỳ hợp với năm 2025.</p>
    <ul>
        <li><strong>Ý nghĩa:</strong> Mang lại sự may mắn, tốt lành và danh vọng.</li>
        <li><strong>Vị trí:</strong> Rất thích hợp đặt trên bàn làm việc để cầu thăng chức.</li>
    </ul>

    <h2 id="cay-van-loc">5. Cây Vạn Lộc</h2>
    <p>Tương tự Phú Quý, Vạn Lộc có lá màu đỏ rực rỡ. Tên cây đã nói lên tất cả: Vạn điều lộc may mắn.</p>
    <ul>
        <li><strong>Ý nghĩa:</strong> Thu hút tài lộc dồi dào, vạn sự như ý.</li>
        <li><strong>Lời khuyên:</strong> Cây Vạn Lộc thủy sinh để bàn làm việc rất sạch sẽ và sang trọng.</li>
    </ul>

    <div class="blog-quote">
        <strong>Mẹo chăm sóc:</strong> Hãy luôn giữ cho lá cây sạch bụi và cắt tỉa lá vàng úa ngay lập tức. Cây có xanh tốt thì tài lộc mới dồi dào.
    </div>
`;

export default { 
    id: 1, 
    category: "PHONG_THUY",
    title: "5 Loại cây phong thủy hút tài lộc năm 2025: Văn phòng & Nhà ở", 
    excerpt: "Năm 2025 (Hỏa) rất hợp trồng cây xanh (Mộc). Top 5 loại cây giúp gia chủ chiêu tài, giữ của và thanh lọc không khí cực tốt.", 
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop", 
    date: "15/12/2024", 
    author: "Chuyên gia Cây Cảnh",
    content: contentBody + renderFAQ(faqData) 
};
