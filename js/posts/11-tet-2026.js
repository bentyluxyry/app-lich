
import { renderFAQ } from '../components/faq.js';

// Dữ liệu câu hỏi thường gặp q: câu hỏi,  a: câu trả lời
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

// Nội dung chính
const contentBody = `
    <p>Khi những cánh đào của năm cũ vừa phai, nhiều người đã bắt đầu thắc mắc <strong>"Tết 2026 là ngày nào dương lịch?"</strong> để lên kế hoạch làm ăn, cưới hỏi hay du lịch sớm. Bài viết dưới đây sẽ giải đáp chi tiết.</p>

    <h3>1. Mùng 1 Tết 2026 rơi vào ngày mấy Dương lịch?</h3>
    <p>Theo Lịch Vạn Niên, năm 2026 là năm <strong>Bính Ngọ</strong>. Tết năm 2026 đến khá muộn:</p>
    <ul>
      <li><strong>Mùng 1 Tết:</strong> Rơi vào <strong>Thứ Ba, ngày 17/02/2026</strong>.</li>
      <li><strong>Giao thừa:</strong> Đêm Thứ Hai, ngày 16/02/2026.</li>
    </ul>

    <h3>2. Đếm ngược đến Tết Bính Ngọ</h3>
    <p>Thời khắc Giao thừa thiêng liêng đang đến gần.</p>
    
    <!-- KHUNG ĐẾM NGƯỢC -->
    <div class="tet-banner animate-fade-in relative overflow-hidden" style="margin: 2rem 0;" id="tet-countdown-box">
       <div class="flower flower-mai pos-1 animate-sway">🌼</div>
       <div class="flower flower-dao pos-2 animate-sway">🌸</div>
       
       <!-- ẢNH TRANG TRÍ -->
       <img src="https://images.unsplash.com/photo-1516051662668-94fcf9fb7138?q=80&w=400&auto=format&fit=crop" 
            class="absolute bottom-0 left-0 w-32 md:w-48 z-10 pointer-events-none drop-shadow-lg opacity-90"
            style="transform: scaleX(-1); max-height: 100%; object-fit: contain;"
            alt="Mai vàng"
       >

       <div class="text-center tet-banner-content relative z-20">
          <h3 class="text-xl md:text-2xl font-bold uppercase tracking-wider text-yellow-300 mb-4 drop-shadow-sm">Sắp đến Tết 2026</h3>
          <div class="tet-timer" id="tet-timer-display">
             <div class="time-box"><span id="t-d">--</span><label>Ngày</label></div>
             <div class="time-box"><span id="t-h">--</span><label>Giờ</label></div>
             <div class="time-box"><span id="t-m">--</span><label>Phút</label></div>
             <div class="time-box"><span id="t-s">--</span><label>Giây</label></div>
          </div>
       </div>
    </div>

    <h3>3. Năm 2026 là năm con gì?</h3>
    <p>Việc biết mệnh năm giúp gia chủ chuẩn bị kế hoạch sinh con, xây nhà hợp phong thủy.</p>
    <ul>
      <li><strong>Thiên can, Địa chi:</strong> Năm Bính Ngọ (Con Ngựa).</li>
      <li><strong>Mệnh Ngũ Hành:</strong> Mệnh <strong>Thủy - Thiên Hà Thủy</strong> (Nước trên trời).</li>
      <li><strong>Tương sinh:</strong> Mệnh Mộc, Mệnh Kim.</li>
    </ul>

    <div class="blog-quote">
       Đừng quên theo dõi mục <strong>Kiến Thức & Trợ Lý</strong> hàng ngày để cập nhật các mẹo phong thủy hút tài lộc mới nhất nhé!
    </div>
`;

export default { 
    id: 11, 
    featured: true, 
    category: "LE_TET",
    title: "Tết 2026 là ngày nào? Đếm ngược còn bao nhiêu ngày đến Tết Bính Ngọ", 
    excerpt: "Xem ngay lịch nghỉ Tết Nguyên Đán 2026 chính xác nhất. Năm 2026 là năm con gì, mệnh gì? Tổng hợp thông tin đếm ngược và ngày tốt đầu năm.", 
    image: "https://images.unsplash.com/photo-1514373941175-0a141072bbc8?q=80&w=1280&h=720&auto=format&fit=crop", 
    date: "02/01/2025", 
    author: "Ban Biên Tập",
    // FAQ ĐƯỢC ĐƯA XUỐNG CUỐI BÀI
    content: contentBody + renderFAQ(faqData) 
};
