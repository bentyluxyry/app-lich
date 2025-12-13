
import { renderFAQ } from '../components/faq.js';

// 1. Dữ liệu câu hỏi
const faqData = [
    {
        q: "Tết 2026 được nghỉ mấy ngày?",
        a: "Dự kiến người lao động sẽ được nghỉ <strong>7 ngày liên tục</strong> từ 29 tháng Chạp đến hết mùng 5 Tết (15/02/2026 - 21/02/2026)."
    },
    {
        q: "Năm 2026 là năm con gì, mệnh gì?",
        a: "Năm 2026 là năm <strong>Bính Ngọ (Con Ngựa)</strong>. Mệnh ngũ hành là <strong>Thiên Hà Thủy</strong> (Nước trên trời)."
    },
    {
        q: "Hướng xuất hành tốt ngày mùng 1 Tết 2026?",
        a: "Hỷ Thần hướng Tây Bắc, Tài Thần hướng Tây Nam. Giờ đẹp: Tý (23-1h), Sửu (1-3h), Ngọ (11-13h)."
    }
];

// 2. Nội dung chính (Tách ra biến riêng để dễ quản lý)
const contentBody = `
    <p>Khi những cánh đào của năm cũ vừa phai, nhiều người đã bắt đầu thắc mắc <strong>"Tết 2026 là ngày nào dương lịch?"</strong> hay <strong>"Còn bao nhiêu ngày nữa đến Tết Bính Ngọ?"</strong> để lên kế hoạch làm ăn, cưới hỏi hay du lịch sớm. Bài viết dưới đây sẽ giải đáp chi tiết mọi thắc mắc của bạn về năm mới 2026.</p>

    <h3>1. Mùng 1 Tết 2026 rơi vào ngày mấy Dương lịch?</h3>
    <p>Theo Lịch Vạn Niên, năm 2026 là năm <strong>Bính Ngọ</strong> (con Ngựa). Khác với một số năm đến sớm, Tết năm 2026 đến khá muộn vào giữa tháng 2 Dương lịch.</p>
    <ul>
      <li><strong>Mùng 1 Tết:</strong> Rơi vào <strong>Thứ Ba, ngày 17/02/2026</strong>.</li>
      <li><strong>Giao thừa:</strong> Đêm Thứ Hai, ngày 16/02/2026.</li>
    </ul>
    <p>Việc Tết đến muộn thường mang lại thời tiết ấm áp hơn, thuận lợi cho việc du xuân và lễ hội đầu năm.</p>

    <h3>2. Đếm ngược: Còn bao nhiêu ngày nữa đến Tết 2026?</h3>
    <p>Tính từ thời điểm hiện tại, chúng ta còn khoảng <strong>hơn 360 ngày</strong> nữa là đến thời khắc Giao thừa thiêng liêng của năm Bính Ngọ.</p>
    
    <!-- KHUNG ĐẾM NGƯỢC -->
    <div class="tet-banner animate-fade-in relative overflow-hidden" style="margin: 2rem 0;" id="tet-countdown-box">
       <div class="flower flower-mai pos-1 animate-sway">🌼</div>
       <div class="flower flower-dao pos-2 animate-sway">🌸</div>
       
       <!-- ẢNH TRANG TRÍ (Dùng ảnh Online đảm bảo không lỗi) -->
       <img src="https://images.unsplash.com/photo-1516051662668-94fcf9fb7138?q=80&w=400&auto=format&fit=crop" 
            class="absolute bottom-0 left-0 w-32 md:w-48 z-10 pointer-events-none drop-shadow-lg opacity-90"
            style="transform: scaleX(-1); max-height: 100%; object-fit: contain;"
            alt="Mai vàng"
       >

       <div class="text-center tet-banner-content relative z-20">
          <h3 class="text-xl md:text-2xl font-bold uppercase tracking-wider text-yellow-300 mb-4 drop-shadow-sm">Sắp đến Tết Bính Ngọ 2026</h3>
          <div class="tet-timer" id="tet-timer-display">
             <div class="time-box"><span id="t-d">--</span><label>Ngày</label></div>
             <div class="time-box"><span id="t-h">--</span><label>Giờ</label></div>
             <div class="time-box"><span id="t-m">--</span><label>Phút</label></div>
             <div class="time-box"><span id="t-s">--</span><label>Giây</label></div>
          </div>
       </div>
    </div>

    <h3>3. Thưởng thức không khí Tết</h3>
    <p>Trong lúc chờ đợi, mời bạn cùng hòa mình vào không khí mùa xuân rộn ràng qua video nhạc Tết dưới đây:</p>
    
    <!-- VIDEO YOUTUBE EMBED (Dùng class yt-facade để tối ưu tốc độ tải trang) -->
    <div class="yt-facade" onclick="app.loadVideo(this, 'ovYL9XMT3xA')">
        <img src="https://img.youtube.com/vi/ovYL9XMT3xA/maxresdefault.jpg" alt="Video Nhạc Tết">
        <div class="yt-play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
        </div>
    </div>
    <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">Video: Dự báo tổng quan không khí và vận hạn năm Bính Ngọ</p>

    <h3>4. Lịch nghỉ Tết Nguyên Đán 2026 dự kiến</h3>
    <p>Do Mùng 1, Mùng 2, Mùng 3 Tết 2026 rơi vào Thứ Ba, Thứ Tư và Thứ Năm, nên lịch nghỉ Tết năm nay hứa hẹn sẽ rất liền mạch và kéo dài.</p>
    <p>Phương án khả thi nhất mà Bộ Lao động - Thương binh và Xã hội có thể đề xuất là nghỉ <strong>7 ngày liên tục</strong>: Từ 29 tháng Chạp (Chủ nhật, 15/02/2026) đến hết Mùng 5 Tết (Thứ Bảy, 21/02/2026), cộng thêm ngày nghỉ bù Chủ nhật.</p>

    <h3>5. Năm 2026 là năm con gì? Mệnh gì?</h3>
    <p>Việc biết mệnh năm 2026 giúp gia chủ chuẩn bị kế hoạch sinh con, xây nhà hay mua xe hợp phong thủy.</p>
    <ul>
      <li><strong>Thiên can, Địa chi:</strong> Năm Bính Ngọ (Con Ngựa).</li>
      <li><strong>Mệnh Ngũ Hành:</strong> Mệnh <strong>Thủy - Thiên Hà Thủy</strong> (Nước trên trời).</li>
      <li><strong>Tương sinh:</strong> Mệnh Mộc, Mệnh Kim (Kim sinh Thủy).</li>
      <li><strong>Tương khắc:</strong> Mệnh Hỏa, Mệnh Thổ (Thổ khắc Thủy).</li>
    </ul>
    <p>Người sinh năm Bính Ngọ 2026 thường có tính cách phóng khoáng, thông minh, lanh lợi nhưng đôi khi hơi nóng vội. Đây là một tuổi rất đẹp, tượng trưng cho sức mạnh và sự tự do.</p>

    <div class="blog-quote">
       Đừng quên theo dõi mục <strong>Kiến Thức & Trợ Lý</strong> hàng ngày để cập nhật các mẹo phong thủy hút tài lộc mới nhất nhé!
    </div>
`;

export default { 
    id: 7, 
    featured: true, 
    category: "LE_TET",
    title: "Tết âm lịch 2026 là ngày mấy dương lịch?", 
    excerpt: "Xem ngay lịch nghỉ Tết Nguyên Đán 2026 chính xác nhất. Năm 2026 là năm con gì, mệnh gì? Tổng hợp thông tin đếm ngược và ngày tốt đầu năm Bính Ngọ.", 
    // Bạn hãy lưu một ảnh đẹp về tết với tên 'tet-2026.jpg' vào thư mục img/blog nhé
	image: "img/blog/tet-2026.jpg", 
    date: "02/01/2025", 
    author: "Ban Biên Tập",
    // QUAN TRỌNG: Phải cộng chuỗi HTML nội dung với hàm renderFAQ
    content: contentBody + renderFAQ(faqData) 
};
