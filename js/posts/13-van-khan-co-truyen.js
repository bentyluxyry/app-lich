
import { renderFAQ } from '../components/faq.js';

// 1. Dữ liệu câu hỏi (Khai báo bên ngoài object export)
const faqData = [
    {
        q: "1. Nên khấn Thổ Công trước hay Gia Tiên trước?",
        a: "Theo truyền thống và nguyên tắc tâm linh, gia chủ luôn phải khấn <strong>Thổ Công (Thần Linh) trước</strong>, sau đó mới đến khấn Gia Tiên. Thổ Công là vị thần cai quản đất đai nơi gia đình sinh sống, việc khấn Thổ Công trước là để xin phép và mời các vị thần chứng giám, sau đó mới mời gia tiên về."
    },
    {
        q: "2. Nếu không thuộc văn khấn dài thì làm thế nào?",
        a: "Điều quan trọng nhất trong việc khấn bái là lòng thành kính. Nếu không thuộc văn khấn dài, gia chủ hoàn toàn có thể tự nói bằng lời thành tâm của mình. Cần nêu rõ: ngày tháng, tên tuổi và địa chỉ gia chủ, mục đích cúng (ví dụ: cúng rằm, cúng giỗ...), lễ vật dâng cúng, và lời cầu xin (bình an, sức khỏe, may mắn)."
    },
    {
        q: "3. Cần chuẩn bị những lễ vật cơ bản nào cho mâm cúng Thường Lệ?",
        a: "Đối với mâm cúng Thường Lệ (Mùng 1, Ngày Rằm), các lễ vật cơ bản thường gồm: Hương (nhang), Nến/Đèn, Trầu cau, Nước trà/Rượu trắng, Hoa tươi, Quả tươi (Ngũ Quả), Đĩa xôi hoặc Bánh chưng, Gà luộc hoặc Thịt lợn luộc (tùy điều kiện), Vàng mã (giấy tiền)."
    }
];

// 2. Nội dung chính HTML
const mainContent = `
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-6 italic border-l-4 border-amber-400 pl-4 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-r-lg">
        Văn khấn là lời thỉnh cầu, báo cáo, và bày tỏ lòng thành kính của con cháu đối với các bậc thần linh và gia tiên. Mỗi bài văn khấn đều có ý nghĩa riêng, giúp duy trì và củng cố truyền thống "uống nước nhớ nguồn" của dân tộc Việt Nam.
    </p>

    <h2 id="van-khan-gia-tien">1. Văn Khấn Gia Tiên (Văn Khấn Lễ Thường Niên)</h2>
    <p>Văn khấn gia tiên được sử dụng trong các dịp lễ tết lớn, cúng giỗ hay những ngày gia đình có sự kiện quan trọng. Đây là bài khấn chung để mời tổ tiên, ông bà, cha mẹ đã khuất về thụ hưởng lễ vật và chứng giám lòng thành.</p>

    <h3>Bài Văn Khấn Gia Tiên Cơ Bản</h3>
    <p><em>(Áp dụng cho cúng giỗ, lễ tết, hoặc các ngày cúng lớn trong năm)</em></p>

    <div class="blog-quote">
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
        <p>Kính lạy: Hoàng Thiên, Hậu Thổ chư vị Tôn Thần.</p>
        <p>Kính lạy: Ngũ phương, Ngũ thổ, Long mạch, Tài thần chư vị Tôn Thần.</p>
        <p>Kính lạy: Bản gia tiên tổ, nội ngoại Tôn Linh.</p>
        <p>Tín chủ (chúng) con là: [Tên gia chủ]<br>
        Ngụ tại: [Địa chỉ]</p>
        <p>Hôm nay là ngày [Tên ngày/Dịp lễ] năm [Năm Âm lịch].</p>
        <p>Tín chủ con thành tâm sửa biện hương hoa, phẩm vật, trà quả cùng các thứ lễ vật bày lên trước án.</p>
        <p>Kính cẩn tâu trình: Nhân ngày [Tên ngày/Dịp lễ], tín chủ con kính mời các vị Gia thần, Thổ công, Tiên linh, Tổ tiên nội ngoại về chứng giám lòng thành, thụ hưởng lễ vật. Cúi xin Phù hộ độ trì cho con cháu trong nhà được bình an, mạnh khỏe, công việc hanh thông, vạn sự tốt lành.</p>
        <p>Chúng con đồng thành kính cẩn cáo!</p>
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
    </div>

    <h2 id="van-khan-mung-1-ram">2. Văn Khấn Mùng 1 và Ngày Rằm (Cúng Thường Lệ)</h2>
    <p>Văn khấn mùng 1 (Sóc) và ngày Rằm (Vọng) là nghi lễ cúng bái định kỳ hàng tháng, thể hiện sự tưởng nhớ và cầu mong bình an cho cả tháng.</p>

    <h3>Văn Khấn Mùng 1 (Sóc)</h3>
    <p><strong>Áp dụng:</strong> Ngày mùng 1 Âm lịch hàng tháng.</p>
    <p><strong>Sự khác biệt:</strong> Văn khấn mùng 1 thường ngắn gọn hơn, chủ yếu báo cáo công việc và cầu mong sự bảo hộ cho tháng mới. Bài khấn này thường được thực hiện sau khi khấn Thổ Công (Thần Linh).</p>

    <h3>Văn Khấn Ngày Rằm (Vọng)</h3>
    <p><strong>Áp dụng:</strong> Ngày 15 Âm lịch hàng tháng.</p>
    <p><strong>Sự khác biệt:</strong> Cúng ngày Rằm được coi trọng hơn Mùng 1, lễ vật có thể đầy đủ hơn. Bài khấn tương tự như Văn khấn Gia tiên cơ bản, nhưng cần nhấn mạnh "Hôm nay là ngày Rằm tháng [Tháng Âm lịch]".</p>

    <h2 id="van-khan-cung-gio">3. Văn Khấn Cúng Giỗ (Kỵ Nhật)</h2>
    <p>Văn khấn cúng giỗ được dùng để tưởng nhớ một cá nhân cụ thể vào ngày mất của họ.</p>

    <div class="blog-quote">
        <p>... Tín chủ (chúng) con thành tâm sửa biện hương hoa, lễ vật, lòng thành kính mời: Cố Tổ Khảo (hoặc Cố Tổ Tỷ) [Họ tên của người đã khuất] về chứng minh lòng thành, thụ hưởng lễ vật. Kính cáo: Hôm nay là ngày Chính kỵ của [Tên người được giỗ]...</p>
    </div>

    <h2 id="van-khan-tho-cong">4. Văn Khấn Thổ Công (Thần Linh)</h2>
    <p>Thổ Công (hay Thần Linh, Thổ Địa) là vị thần cai quản đất đai, nhà cửa, bếp núc, bảo vệ sự bình an và thịnh vượng cho gia đình. Bài khấn này luôn được khấn trước khi khấn Gia Tiên.</p>

    <h3>Bài Văn Khấn Thổ Công Phổ Biến</h3>
    <div class="blog-quote">
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
        <p>Con kính lạy Quan Đương Niên, Quan Đương Cảnh, Quan Thần Linh Thổ Địa, Thần Tài, Ông Công, Ông Táo.</p>
        <p>Tín chủ con là: [Tên gia chủ]<br>
        Ngụ tại: [Địa chỉ]</p>
        <p>Hôm nay là ngày [Tên ngày/Dịp lễ], tín chủ con thành tâm sắm lễ, hương hoa, trà quả, xin dâng lên trước án. Kính mời các vị Tôn Thần về chứng giám lòng thành. Cúi xin các vị phù hộ độ trì cho gia đình con được bình an, làm ăn phát đạt, sở cầu như ý, sở nguyện tòng tâm.</p>
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
    </div>
`;

// 3. Export bài viết chuẩn
export default { 
    id: 13, 
    featured: false,
    category: "VAN_KHAN",
    title: "Văn khấn cổ truyền: Hướng dẫn chi tiết cúng Gia Tiên, Mùng 1, Rằm, Giỗ Chạp và Thổ Công", 
    excerpt: "Tổng hợp các bài văn khấn gia tiên, mùng 1, ngày rằm, cúng giỗ và Thổ Công chuẩn xác nhất. Tìm hiểu ý nghĩa và cách thực hiện nghi lễ truyền thống.", 
    // Bạn hãy lưu một ảnh đẹp về tết với tên 'tet-2026.jpg' vào thư mục img/blog nhé
	image: "img/blog/tet-2026.jpg",  
    date: "15/02/2025", 
    author: "Ban Biên Tập",
    content: mainContent + renderFAQ(faqData) // Nối chuỗi HTML và FAQ
};
