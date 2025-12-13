
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Mượn tuổi làm nhà có đen không?",
        a: "Hoàn toàn không. Mượn tuổi là một thủ tục phong thủy giúp gia chủ tránh được hạn xấu của tuổi mình bằng cách nhờ người có tuổi đẹp đứng ra 'gánh vác' khí trường. Người cho mượn tuổi cũng được hưởng phước vì giúp người khác an cư."
    },
    {
        q: "Năm 2025 những tuổi nào phạm Kim Lâu?",
        a: "Năm 2025 (Ất Tỵ), các tuổi phạm Kim Lâu cần tránh xây nhà gồm: 1955, 1957, 1960, 1962, 1964, 1966, 1969, 1971, 1973, 1975, 1978, 1980, 1982, 1984, 1987, 1989, 1991, 1993, 1996, 1998, 2000."
    },
    {
        q: "Động thổ xong gặp mưa có tốt không?",
        a: "Rất tốt. Dân gian có câu 'Tiền vào như nước'. Mưa sau khi động thổ hoặc đổ mái được coi là lộc trời, báo hiệu công trình sẽ thuận buồm xuôi gió, gia chủ làm ăn phát đạt."
    }
];

const contentBody = `
    <p>Năm <strong>Ất Tỵ 2025</strong> (Hành Hỏa) là một năm đầy năng động. Việc xây nhà, động thổ vào năm này cần xem xét kỹ lưỡng về tuổi tác và ngày giờ để đảm bảo sự bền vững cho công trình và an toàn cho gia chủ.</p>

    <h2 id="tuoi-dep-lam-nha-2025">1. Danh Sách Tuổi Đẹp Động Thổ Năm 2025</h2>
    <p>Để xây nhà năm 2025, gia chủ cần không phạm vào 3 đại hạn: <strong>Kim Lâu, Hoang Ốc, Tam Tai</strong>. Dưới đây là các tuổi đẹp nhất (đã loại trừ các hạn):</p>
    <ul>
        <li><strong>1950 (Canh Dần)</strong> - 76 tuổi: Phúc lộc thọ toàn.</li>
        <li><strong>1956 (Bính Thân)</strong> - 70 tuổi: Gia đạo bình an.</li>
        <li><strong>1958 (Mậu Tuất)</strong> - 68 tuổi: Lục súc bảo (Chăn nuôi, kinh doanh tốt).</li>
        <li><strong>1965 (Ất Tỵ)</strong> - 61 tuổi: Nhất Kiết (Mọi sự hanh thông).</li>
        <li><strong>1968 (Mậu Thân)</strong> - 58 tuổi: Tấn tài tấn lộc.</li>
        <li><strong>1974 (Giáp Dần)</strong> - 52 tuổi: Tứ Tấn Tài.</li>
        <li><strong>1977 (Đinh Tỵ)</strong> - 49 tuổi: Đại cát.</li>
        <li><strong>1986 (Bính Dần)</strong> - 40 tuổi: Tứ Tấn Tài.</li>
        <li><strong>1992 (Nhâm Thân)</strong> - 34 tuổi: Nhất Kiết.</li>
        <li><strong>2001 (Tân Tỵ)</strong> - 25 tuổi: Nhất Kiết.</li>
    </ul>

    <h2 id="thu-tuc-muon-tuoi">2. Hướng Dẫn Thủ Tục Mượn Tuổi</h2>
    <p>Nếu gia chủ không thuộc danh sách trên nhưng bắt buộc phải xây nhà trong năm 2025, cần thực hiện thủ tục mượn tuổi:</p>
    <ol>
        <li><strong>Chọn người mượn tuổi:</strong> Nên là nam giới, lớn tuổi hơn gia chủ, sức khỏe tốt, gia đình hòa thuận, không có tang và có tuổi hợp năm 2025 (như danh sách trên).</li>
        <li><strong>Làm giấy bán nhà tượng trưng:</strong> Gia chủ viết giấy bán khu đất cho người mượn tuổi (chỉ mang tính tâm linh).</li>
        <li><strong>Lễ động thổ:</strong> Người được mượn tuổi thay mặt gia chủ dâng hương, khấn vái và trực tiếp cuốc đất khởi công. Gia chủ cần lánh mặt đi nơi khác trong lúc này.</li>
        <li><strong>Các lễ tiếp theo:</strong> Đổ mái, cất nóc... người mượn tuổi vẫn tiếp tục thay mặt làm lễ.</li>
        <li><strong>Nhập trạch:</strong> Sau khi nhà xong, gia chủ chọn ngày tốt làm thủ tục "mua lại nhà" với giá cao hơn giá bán ban đầu để lấy lại quyền sở hữu về mặt tâm linh.</li>
    </ol>

    <h2 id="ngay-dep-dong-tho">3. Các Tháng Tốt Động Thổ Năm 2025</h2>
    <p>Năm Ất Tỵ, các tháng đại lợi để khởi công xây dựng bao gồm:</p>
    <ul>
        <li><strong>Tháng 1 Âm lịch (Tháng Dần):</strong> Khởi đầu mới, vạn vật sinh sôi.</li>
        <li><strong>Tháng 4 Âm lịch (Tháng Tỵ):</strong> Tháng vượng khí (nhưng người tuổi Hợi cần tránh).</li>
        <li><strong>Tháng 9 Âm lịch (Tháng Tuất):</strong> Thuận lợi cho việc hoàn thiện nhà trước Tết.</li>
    </ul>

    <div class="blog-quote">
        <strong>Lưu ý:</strong> Tránh động thổ vào tháng 7 Âm lịch (tháng Cô Hồn) và các ngày Nguyệt Kỵ (5, 14, 23), Tam Nương (3, 7, 13, 18, 22, 27).
    </div>
`;

export default { 
    id: 6, 
    category: "PHONG_THUY",
    title: "Lưu ý khi động thổ xây nhà năm 2025: Tuổi đẹp & Thủ tục mượn tuổi", 
    excerpt: "Tổng hợp các tuổi đẹp nhất để làm nhà năm Ất Tỵ 2025. Hướng dẫn chi tiết thủ tục mượn tuổi động thổ chuẩn phong thủy tránh tai ương.", 
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=800&auto=format&fit=crop", 
    date: "15/01/2025", 
    author: "Thầy Phong Thủy",
    content: contentBody + renderFAQ(faqData) 
};
