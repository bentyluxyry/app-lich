
import { renderFAQ } from '../components/faq.js';

// 1. Dữ liệu câu hỏi thường gặp (FAQ)
const faqData = [
    {
        q: "Năm thế giới số 9 (2025) có xấu không?",
        a: "Không hề xấu. Trong <strong>Thần số học</strong>, số 9 đại diện cho sự kết thúc để mở ra khởi đầu mới. Đây là thời điểm vàng để bạn thanh lọc cuộc sống, loại bỏ những điều tiêu cực và gặt hái thành quả sau một chu kỳ 8 năm phấn đấu trước đó."
    },
    {
        q: "Có nên khởi nghiệp hay đầu tư lớn vào năm 2025 không?",
        a: "Năm số 9 thường không ủng hộ việc khởi tạo những dự án hoàn toàn mới mang tính dài hạn (trừ khi bạn đã chuẩn bị rất kỹ từ các năm trước). Thay vào đó, năm nay phù hợp để <strong>hoàn thiện, tổng kết và tái cấu trúc</strong> mô hình kinh doanh hiện tại."
    },
    {
        q: "Cách tính Năm Cá Nhân trong năm 2025?",
        a: "Công thức: <strong>Năm Cá Nhân = Năm Thế Giới (2025 = 9) + Ngày sinh + Tháng sinh</strong>. Ví dụ: Bạn sinh ngày 15/05. Năm cá nhân = 9 + 1 + 5 + 0 + 5 = 20 = 2. Vậy năm 2025 bạn mang vận niên cá nhân số 2."
    }
];

// 2. Nội dung bài viết chuẩn SEO
const contentBody = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Thần số học 2025: Ý nghĩa Năm Thế Giới Số 9 - Thời điểm của sự kết thúc và thức tỉnh",
      "description": "Giải mã năng lượng năm thế giới 2025 (Số 9) theo Thần số học Pitago. Dự báo tác động đến sự nghiệp, tài chính và lời khuyên giúp bạn bình an vượt qua giai đoạn chuyển giao.",
      "image": "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1280&h=720&auto=format&fit=crop",
      "author": { "@type": "Organization", "name": "Lịch Việt AI" }
    }
    </script>

    <p>Nếu như năm 2024 (số 8) là năm của quyền lực, tiền bạc và những thành tựu vật chất, thì bước sang <strong>năm 2025</strong>, chúng ta sẽ đón nhận một nguồn năng lượng hoàn toàn khác biệt. Theo <strong>Thần số học Pythagoras</strong>, năm 2025 có tổng các con số là: 2 + 0 + 2 + 5 = <strong>9</strong>.</p>
    
    <p><strong>Năm thế giới số 9</strong> đánh dấu sự kết thúc của một đại chu kỳ 9 năm. Đây là lúc vũ trụ gửi đến thông điệp mạnh mẽ về sự buông bỏ, chữa lành, hoàn thiện và chuẩn bị hành trang cho một kỷ nguyên mới bắt đầu vào năm 2026 (Năm số 1).</p>

    <h2 id="y-nghia-cot-loi">1. Bản Chất Năng Lượng Của Năm Thế Giới Số 9</h2>
    <p>Trong biểu đồ Thần số học, số 9 nằm ở đỉnh cao nhất của trục Trí não, đại diện cho hoài bão, lý tưởng và tính nhân văn. Năm 2025 sẽ mang ba đặc điểm cốt lõi sau:</p>
    
    <h3>Sự kết thúc và hoàn tất (Completion)</h3>
    <p>Giống như việc dọn dẹp nhà cửa trước khi đón khách, năm số 9 yêu cầu chúng ta phải "dọn dẹp" lại cuộc đời mình. Những dự án dang dở, những mối quan hệ mập mờ, những thói quen xấu... tất cả sẽ được đẩy lên cao trào để bạn buộc phải giải quyết dứt điểm. Bạn không thể mang những hành lý cũ kỹ, nặng nề bước sang chu kỳ mới được.</p>

    <h3>Sự tha thứ và chữa lành (Healing)</h3>
    <p>Năng lượng số 9 mang rung động của sự bao dung. Năm nay, các vấn đề về sức khỏe tinh thần, chữa lành tâm hồn và các hoạt động thiện nguyện sẽ lên ngôi. Đây là lúc để bạn học cách tha thứ cho người khác và quan trọng hơn là tha thứ cho chính mình.</p>

    <h3>Sự chuyển hóa (Transformation)</h3>
    <p>Bạn sẽ thấy 2025 là một năm của sự biến động. Có thể bạn sẽ thay đổi công việc, chuyển nhà, hoặc thay đổi tư duy sống. Đừng sợ hãi, sự thay đổi này là cần thiết để bạn "lột xác" thành phiên bản tốt hơn.</p>

    <div class="blog-quote">
        <strong>Thông điệp 2025:</strong> "Cái cũ không đi, cái mới không tới. Hãy dũng cảm buông tay những gì không còn phục vụ cho sự phát triển của bạn."
    </div>

    <h2 id="tac-dong-thuc-te">2. Dự Báo Tác Động Năm 2025 Đến Các Khía Cạnh Cuộc Sống</h2>

    <h3>Về kinh tế và sự nghiệp</h3>
    <p>Năm số 9 không phải là năm lý tưởng để khởi nghiệp ồ ạt hay đầu tư mạo hiểm kiểu "lướt sóng". Xu hướng kinh tế sẽ thiên về việc tái cơ cấu, thanh lọc thị trường. Những doanh nghiệp làm ăn chộp giật, thiếu đạo đức sẽ dễ bị đào thải.</p>
    <p>Ngược lại, các lĩnh vực liên quan đến <strong>giáo dục, y tế, tâm lý, môi trường và phục vụ cộng đồng</strong> sẽ phát triển rực rỡ. Nếu bạn đang làm việc trong các ngành này, 2025 là năm để bạn tỏa sáng.</p>

    <h3>Về tình cảm và mối quan hệ</h3>
    <p>Đây là năm của "sự thật". Những mối quan hệ lỏng lẻo sẽ dễ bị tan vỡ, nhưng những mối quan hệ chân thành sẽ càng thêm gắn kết. Nếu bạn đang trong một mối quan hệ độc hại (toxic), năm 2025 sẽ cho bạn dũng khí để rời đi.</p>

    <h2 id="loi-khuyen-hanh-dong">3. Bạn Cần Làm Gì Để "Thuận Dòng" Năm 2025?</h2>
    <p>Để có một năm 2025 bình an và thành công, bạn nên tập trung vào các hành động sau:</p>
    
    <ul class="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Rà soát và Tổng kết:</strong> Xem lại 8 năm qua bạn đã làm được gì, chưa làm được gì. Hãy hoàn thành nốt các mục tiêu còn dang dở.</li>
        <li><strong>Sống tối giản:</strong> Loại bỏ bớt đồ đạc không dùng, dọn dẹp không gian sống và cả không gian số (digital detox).</li>
        <li><strong>Học tập và chia sẻ:</strong> Số 9 là con số của trí tuệ. Hãy đăng ký một khóa học mới hoặc chia sẻ kiến thức của bạn cho người khác. Bạn có thể tham khảo thêm các bài viết tại chuyên mục <a onclick="app.navigate('KNOWLEDGE')" class="text-blue-600 font-bold hover:underline cursor-pointer">Kiến Thức</a> để trau dồi bản thân.</li>
        <li><strong>Quản lý tài chính chặt chẽ:</strong> Tránh vay mượn quá đà. Hãy tích lũy để chuẩn bị vốn cho khởi đầu mới vào năm 2026.</li>
    </ul>

    <h2 id="anh-huong-nam-ca-nhan">4. Năm Thế Giới Số 9 Ảnh Hưởng Thế Nào Đến Bạn?</h2>
    <p>Mặc dù cùng sống trong năm thế giới số 9, nhưng mỗi người sẽ có một <strong>Năm Cá Nhân (Personal Year)</strong> khác nhau, tạo nên những vận trình riêng biệt.</p>
    
    <p>Để biết chính xác năm 2025 là năm số mấy của riêng bạn và cần lưu ý gì, bạn hãy đọc ngay bài viết chi tiết:</p>
    
    <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center gap-3 my-4 cursor-pointer hover:shadow-md transition-all" onclick="app.viewPost('22')">
        <span class="text-3xl">📅</span>
        <div>
            <h4 class="font-bold text-indigo-700 dark:text-indigo-300">Dự báo Năm Cá Nhân 2025: Thời điểm vàng để chuyển mình</h4>
            <span class="text-xs text-gray-500 dark:text-gray-400">Bấm để xem chi tiết vận hạn của bạn</span>
        </div>
    </div>

    <p>Ngoài ra, nếu gia đình bạn có thành viên nhí chào đời trong năm nay, đừng quên tham khảo cách <a onclick="app.viewPost('10')" class="text-green-600 font-bold hover:underline cursor-pointer">lập biểu đồ ngày sinh cho bé sinh năm 2025 (Ất Tỵ)</a> để định hướng giáo dục sớm tốt nhất.</p>

    <h2 id="ket-luan">5. Lời Kết</h2>
    <p>Năm 2025 có thể sẽ mang đến nhiều cảm xúc lẫn lộn: vui có, buồn có, mất mát có và hy vọng cũng có. Nhưng hãy nhớ rằng, <strong>"Kết thúc là để bắt đầu"</strong>. Hãy đón nhận năm số 9 với một tâm thế cởi mở, bao dung và sẵn sàng buông bỏ những gánh nặng trên vai.</p>
    
    <p>Chúc bạn có một năm 2025 an yên, tìm thấy sự cân bằng trong tâm hồn và chuẩn bị vững vàng cho một chu kỳ thịnh vượng sắp tới. Đừng quên quay lại <a onclick="app.navigate('HOME')" class="text-green-600 font-bold hover:underline cursor-pointer">Trang Chủ Lịch Việt AI</a> thường xuyên để cập nhật ngày tốt xấu hàng ngày nhé!</p>
`;

export default { 
    id: 9, 
    featured: true, 
    category: "THAN_SO_HOC",
    title: "Thần số học 2025: Ý nghĩa Năm Thế Giới Số 9 - Thời điểm của sự kết thúc và thức tỉnh", 
    excerpt: "Năm 2025 là năm số 9, đánh dấu sự kết thúc của một chu kỳ 9 năm. Đây là lúc để buông bỏ cái cũ, chữa lành và chuẩn bị cho kỷ nguyên mới.", 
    image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1280&h=720&auto=format&fit=crop", 
    date: "01/01/2025", 
    author: "Chuyên gia Thần Số",
    content: contentBody + renderFAQ(faqData) 
};
