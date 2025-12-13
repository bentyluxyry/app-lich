
import { renderFAQ } from '../components/faq.js';

const faqData = [
    {
        q: "Mượn tuổi làm nhà thì ai là người khấn động thổ?",
        a: "Nếu gia chủ mượn tuổi, thì <strong>người được mượn tuổi</strong> sẽ đứng ra làm lễ khấn vái và thực hiện nghi thức cuốc đất động thổ. Gia chủ nên tạm lánh mặt đi nơi khác trong lúc làm lễ."
    },
    {
        q: "Lễ vật động thổ bao gồm những gì?",
        a: "Mâm lễ gồm: 1 bộ tam sên (thịt, tôm, trứng), 1 con gà luộc, 1 đĩa xôi, 1 đĩa ngũ quả, 1 bình hoa, 1 bát gạo, 1 bát muối, rượu, trà, thuốc lá, giấy tiền vàng mã, hương nến."
    },
    {
        q: "Động thổ xong có cần cúng tạ lễ không?",
        a: "Có. Sau khi công trình hoàn thành, gia chủ cần làm lễ <strong>Tạ đất</strong> (hoặc lễ Nhập trạch) để báo cáo với Thần linh và cảm tạ sự phù hộ trong suốt quá trình xây dựng."
    }
];

const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Bài văn khấn Động Thổ xây nhà, sửa nhà năm 2025 đầy đủ và chuẩn phong thủy",
      "description": "Nghi thức cúng động thổ xin phép Thổ Công trước khi xây dựng. Văn khấn mượn tuổi làm nhà và cách sắm lễ vật để công trình bền vững, gia chủ bình an.",
      "image": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1280&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Lễ <strong>Động Thổ</strong> là nghi thức xin phép Thổ Công, Thổ Địa cai quản khu đất để bắt đầu xây dựng. "Đầu xuôi đuôi lọt", lễ cúng này cực kỳ quan trọng để đảm bảo quá trình thi công an toàn, thuận lợi.</p>

    <h2 id="y-nghia-dong-tho">1. Tại Sao Phải Cúng Động Thổ?</h2>
    <p>Theo quan niệm tâm linh, mỗi vùng đất đều có công thần thổ địa coi giữ. Việc đào bới, xúc đất là động chạm đến long mạch và các vị thần. Do đó, cần làm lễ để:</p>
    <ul>
        <li>Xin phép các vị thần linh cho phép xây dựng.</li>
        <li>Cầu mong các vong linh trú ngụ tại đó (nếu có) chuyển đi nơi khác để công trình được thi công suôn sẻ.</li>
    </ul>

    <h2 id="bai-van-khan-dong-tho">2. Bài Văn Khấn Động Thổ (Gia Chủ Hoặc Người Mượn Tuổi Đọc)</h2>
    <div class="blog-quote">
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
        <p>Con lạy chín phương Trời, mười phương Chư Phật.</p>
        <p>Con kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.</p>
        <p>Con kính lạy Quan Đương niên, Quan Đương cảnh, Quan Thần linh Thổ địa, các ngài Tôn thần cai quản khu vực này.</p>
        <p>Tín chủ (chúng) con là: [Họ tên] - Tuổi: [Tuổi âm lịch]</p>
        <p>Ngụ tại: [Địa chỉ hiện tại]</p>
        <p>Hôm nay là ngày... tháng... năm..., tín chủ con thành tâm sắm lễ, quả cau lá trầu, hương hoa trà quả, thắp nén tâm hương, dâng lên trước án, có lời thưa rằng:</p>
        <p>Hôm nay tín chủ con khởi tạo [xây nhà/sửa nhà/đào móng...] ngôi dương cơ tại địa chỉ: [Địa chỉ khu đất].</p>
        <p>Con cầu xin các vị Tôn thần, Thổ địa, Long Mạch thương xót tín chủ, giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật, độ cho chúng con vạn sự tốt lành, công việc hanh thông, thợ thuyền bình an, ngày tháng hưởng phần lợi lạc.</p>
        <p>Chúng con lễ bạc tâm thành, trước án kính lễ, cúi xin được phù hộ độ trì.</p>
        <p>Nam mô A Di Đà Phật! (3 lần)</p>
    </div>

    <h2 id="thu-tuc-muon-tuoi">3. Thủ Tục Khi Mượn Tuổi Làm Nhà</h2>
    <p>Nếu gia chủ không được tuổi (Phạm Kim Lâu, Hoang Ốc, Tam Tai) thì phải mượn tuổi. Quy trình:</p>
    <ol>
        <li>Làm giấy bán nhà tượng trưng cho người mượn tuổi.</li>
        <li>Người mượn tuổi thay gia chủ khấn vái và cuốc đất (5-7 nhát) tại hướng đẹp.</li>
        <li>Trong lúc làm lễ, gia chủ lánh mặt.</li>
        <li>Sau khi nhà xây xong, làm thủ tục "chuộc nhà" lại.</li>
    </ol>

    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-700 mt-4">
        <strong>Bài viết liên quan:</strong>
        <ul class="list-disc ml-5 mt-2">
            <li><a onclick="app.viewPost('luu-y-khi-dong-tho-xay-nha-nam-2025')" class="text-green-600 hover:underline cursor-pointer font-bold">Lưu ý khi động thổ xây nhà năm 2025 (Tuổi đẹp & Ngày tốt)</a></li>
        </ul>
    </div>
`;

export default { 
    id: 16, 
    category: "VAN_KHAN",
    title: "Bài văn khấn Động Thổ xây nhà, sửa nhà năm 2025 đầy đủ và chuẩn phong thủy", 
    excerpt: "Nghi thức cúng động thổ xin phép Thổ Công trước khi xây dựng. Văn khấn mượn tuổi làm nhà và cách sắm lễ vật để công trình bền vững, gia chủ bình an.", 
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1280&fit=crop", 
    date: "15/01/2025", 
    author: "Thầy Phong Thủy",
    content: contentBody + renderFAQ(faqData) 
};
