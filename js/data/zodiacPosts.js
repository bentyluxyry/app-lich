

// HÀM SINH NỘI DUNG CHUẨN SEO (Đã cập nhật Layout FAQ mới dạng Google One Style Compact)
const generateSEOContent = (data) => `
    <p class="tv-intro">
        ${data.intro}
    </p>

    <!-- BOX THÁNG TỐT / THÁNG XẤU (NEW) -->
    <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800 shadow-sm glass-card">
            <h3 class="flex items-center gap-2 text-green-800 dark:text-green-400 font-bold uppercase text-sm tracking-wider mb-2">
                <span class="text-xl">🍀</span> Tháng Tốt Đại Cát
            </h3>
            <p class="text-2xl font-bold text-green-700 dark:text-green-300">${data.goodMonths}</p>
            <p class="text-xs text-green-600 dark:text-green-400 mt-1 italic">(Âm lịch)</p>
        </div>
        <div class="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-800 shadow-sm glass-card">
            <h3 class="flex items-center gap-2 text-red-800 dark:text-red-400 font-bold uppercase text-sm tracking-wider mb-2">
                <span class="text-xl">⚠️</span> Tháng Xấu Cần Tránh
            </h3>
            <p class="text-2xl font-bold text-red-700 dark:text-red-300">${data.badMonths}</p>
            <p class="text-xs text-red-600 dark:text-red-400 mt-1 italic">(Âm lịch)</p>
        </div>
    </div>

    <h2>1. Tổng Quan Vận Hạn Năm 2026 (Bính Ngọ)</h2>
    <p>Năm 2026 là năm <strong>Bính Ngọ</strong> (Con Ngựa). Ngũ hành nạp âm là <strong>Thiên Hà Thủy</strong> (Nước trên trời). ${data.elementAnalysis}. Tổng điểm vận mệnh: <strong>${data.score}/10</strong>.</p>

    <table class="tv-table glass-card">
        <tr>
            <th>Sao chiếu mệnh</th>
            <th>Đối tượng</th>
            <th>Mức độ</th>
            <th>Ảnh hưởng chính</th>
        </tr>
        <tr class="tv-highlight">
            <td>${data.saoNam}</td>
            <td>Nam mạng</td>
            <td>${data.mucDoNam}</td>
            <td>${data.anhHuongNam}</td>
        </tr>
        <tr>
            <td>${data.saoNu}</td>
            <td>Nữ mạng</td>
            <td>${data.mucDoNu}</td>
            <td>${data.anhHuongNu}</td>
        </tr>
        <tr class="tv-highlight">
            <td>${data.hanChung}</td>
            <td>Chung</td>
            <td>Trung bình</td>
            <td>${data.anhHuongChung}</td>
        </tr>
    </table>

    <!-- VIDEO YOUTUBE EMBED -->
    <div class="yt-facade" onclick="app.loadVideo(this, 'ovYL9XMT3xA')">
        <img src="https://img.youtube.com/vi/ovYL9XMT3xA/maxresdefault.jpg" alt="Video Tử Vi 2026">
        <div class="yt-play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
        </div>
    </div>
    <p style="text-align:center; font-size: 0.9em; font-style: italic; margin-top: 0.5rem; color: #666;">Video: Luận giải tử vi chi tiết năm Bính Ngọ</p>

    <h2>2. Vận Hạn Theo Tháng Âm Lịch Năm 2026</h2>
    <table class="tv-table glass-card">
        <tr><th>Tháng Âm</th><th>Vận hạn chính</th><th>Lời khuyên quan trọng</th></tr>
        <tr><td>1-3</td><td>${data.month1_3_text}</td><td>${data.month1_3_advice}</td></tr>
        <tr class="tv-highlight"><td>4-6</td><td>${data.month4_6_text}</td><td>${data.month4_6_advice}</td></tr>
        <tr><td>7-9</td><td>${data.month7_9_text}</td><td>${data.month7_9_advice}</td></tr>
        <tr class="tv-highlight"><td>10-12</td><td>${data.month10_12_text}</td><td>${data.month10_12_advice}</td></tr>
    </table>

    <h2>3. Sự Nghiệp & Công Danh</h2>
    <ul>${data.careerList.map(item => `<li>${item}</li>`).join('')}</ul>
    <div class="tv-note">
        <strong>Hướng bàn làm việc tốt nhất:</strong> ${data.workspaceDirection}. <br>
        <strong>Vật phẩm trợ vận:</strong> ${data.careerItem}.
    </div>

    <h2>4. Tài Lộc & Đầu Tư</h2>
    <ul>${data.financeList.map(item => `<li>${item}</li>`).join('')}</ul>

    <h2>5. Tình Duyên & Gia Đạo</h2>
    <ul>${data.loveList.map(item => `<li>${item}</li>`).join('')}</ul>

    <h2>6. Sức Khỏe (Cần Chú Ý)</h2>
    <ul>${data.healthList.map(item => `<li>${item}</li>`).join('')}</ul>

    <h2>7. Cách Hóa Giải Vận Hạn Chi Tiết</h2>
    <table class="tv-table glass-card">
        <tr><th>Phương pháp</th><th>Thực hiện</th></tr>
        <tr>
            <td>Cúng sao (Nam)</td>
            <td>
                ${data.prayNam} <br>
                <a onclick="app.filterBlog('VAN_KHAN')" class="text-blue-600 hover:underline text-xs italic cursor-pointer">(xem chi tiết cách cúng sao)</a>
            </td>
        </tr>
        <tr>
            <td>Cúng sao (Nữ)</td>
            <td>
                ${data.prayNu} <br>
                <a onclick="app.filterBlog('VAN_KHAN')" class="text-blue-600 hover:underline text-xs italic cursor-pointer">(xem chi tiết cách cúng sao)</a>
            </td>
        </tr>
        <tr><td>Vật phẩm phong thủy</td><td>${data.fengshuiItems}</td></tr>
        <tr><td>Màu sắc may mắn</td><td>${data.luckyColors}</td></tr>
        <tr><td>Hướng xuất hành</td><td>${data.luckyDirection}</td></tr>
    </table>

    <div class="tv-note">
        <strong>Lời khuyên cuối cùng:</strong><br>
        ${data.finalAdvice}
    </div>

    <!-- FAQ SECTION RIÊNG CHO TỪNG CON GIÁP (GOOGLE ONE STYLE - COMPACT) -->
    <div class="mt-2 pt-4">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Câu hỏi thường gặp
        </h3>
        
        <div class="border-t border-gray-200 dark:border-gray-700">
            ${data.faq.map(item => `
                <details class="group border-b border-gray-200 dark:border-gray-700">
                    <summary class="flex justify-between items-center py-4 cursor-pointer list-none select-none text-gray-800 dark:text-gray-100 font-bold text-lg hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        <span>${item.q}</span>
                        <span class="text-2xl leading-none font-light text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-45 ml-4">+</span>
                    </summary>
                    <div class="pb-4 text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                        <p>${item.a}</p>
                    </div>
                </details>
            `).join('')}
        </div>
    </div>

    <div class="tv-wish-container">
        Chúc quý gia chủ tuổi ${data.name} năm Bính Ngọ 2026<br>
        <span class="tv-wish-text">BÌNH AN – TÀI LỘC – VẠN SỰ NHƯ Ý</span>
    </div>
`;

// DỮ LIỆU CHI TIẾT 12 CON GIÁP (ĐÃ UPDATE: FAQ RIÊNG BIỆT 3 CÂU CHO TỪNG CON)
const animalsData = [
    {
        id: 'ty', name: 'Tý (Chuột)',
        image: 'img/tu-vi/tu-vi-tuoi-ty-nam-2026.webp',
        intro: "Năm 2026 là năm Xung Thái Tuế (Tý - Ngọ tương xung). Đây là năm nhiều biến động, thay đổi môi trường sống hoặc công việc, cần 'án binh bất động'.",
        elementAnalysis: "Thủy của Tý và Thủy của năm Bính Ngọ (Thiên Hà Thủy) tương trợ, nhưng Địa chi xung khắc mạnh.",
        score: "5/10",
        saoNam: "Thái Bạch", mucDoNam: "Xấu", anhHuongNam: "Hao tài, trắng tay",
        saoNu: "Thái Âm", mucDoNu: "Tốt", anhHuongNu: "Có lộc, nhưng cẩn thận thị phi",
        hanChung: "Tuế Phá", anhHuongChung: "Công việc bị cản trở, thay đổi chỗ ở",
        goodMonths: "3, 7, 12", badMonths: "5, 6",
        month1_3_text: "Đầu năm vất vả", month1_3_advice: "Tránh tranh luận, kiện tụng",
        month4_6_text: "Xung khắc mạnh", month4_6_advice: "Cẩn thận xe cộ, sông nước (Tháng 5 âm)",
        month7_9_text: "Có quý nhân nữ", month7_9_advice: "Nên nhờ người khác giới giúp đỡ",
        month10_12_text: "Cuối năm hao tài", month10_12_advice: "Mua sắm tài sản để giữ tiền",
        careerList: ["Công việc dễ bị thay đổi đột ngột.", "Tiểu nhân quấy phá, dễ bị oan ức.", "Không nên khởi nghiệp lớn."],
        workspaceDirection: "Đông Bắc", careerItem: "Tượng Trâu vàng (Nhị hợp)",
        financeList: ["Tiền vào cửa trước ra cửa sau.", "Tránh đầu tư mạo hiểm.", "Chi phí sửa chữa tăng cao."],
        loveList: ["Vợ chồng hay khắc khẩu.", "Người độc thân khó tìm ý trung nhân."],
        healthList: ["Cẩn thận bệnh tim mạch.", "Hạn chế sông nước tháng 5."],
        prayNam: "Mùng 15 âm", prayNu: "Mùng 26 âm",
        fengshuiItems: "Vòng tay đá Mắt Hổ, Tượng Khỉ", luckyColors: "Trắng, Xám, Đen", luckyDirection: "Tây Bắc",
        finalAdvice: "Lấy nhu thắng cương. Năm xung tháng hạn nên nhẫn nhịn để chờ thời cơ.",
        faq: [
            { q: "Tuổi Tý năm 2026 có phạm Thái Tuế không?", a: "Có. Tuổi Tý phạm Xung Thái Tuế (Trực xung), là hạn khá nặng về sự nghiệp, sức khỏe và đi lại." },
            { q: "Tuổi Tý xây nhà năm 2026 được không?", a: "Không nên. Do phạm Xung Thái Tuế và có thể phạm Hoang Ốc/Kim Lâu tùy tuổi cụ thể. Nếu bắt buộc, hãy làm thủ tục mượn tuổi." },
            { q: "Nên mang vật phẩm gì để hóa giải vận hạn?", a: "Nên mang theo kim bài Thái Tuế hoặc tượng Trâu/Khỉ (Nhị hợp/Tam hợp) để trợ mệnh." }
        ]
    },
    {
        id: 'suu', name: 'Sửu (Trâu)',
        image: 'img/tu-vi/tu-vi-tuoi-suu-nam-2026.webp',
        intro: "Năm 2026 tuổi Sửu phạm Tương Hại (Sửu - Ngọ). Tuy nhiên được ngũ hành tương sinh nên trong cái khó ló cái khôn.",
        elementAnalysis: "Thổ của Sửu khắc Thủy của năm (nhưng Thổ đê điều ngăn được nước lớn)",
        score: "6/10",
        saoNam: "Thái Dương", mucDoNam: "Tốt", anhHuongNam: "Công danh sáng lạn",
        saoNu: "Thổ Tú", mucDoNu: "Trung bình", anhHuongNu: "Tiểu nhân ném đá giấu tay",
        hanChung: "Lục Hại", anhHuongChung: "Gia đạo bất hòa, bị phản bội",
        goodMonths: "4, 8, 12", badMonths: "5, 6, 9",
        month1_3_text: "Bình ổn", month1_3_advice: "Lên kế hoạch chi tiết",
        month4_6_text: "Tiểu nhân quấy", month4_6_advice: "Không tin người lạ, không cho vay",
        month7_9_text: "Tài lộc tới", month7_9_advice: "Nắm bắt cơ hội đầu tư ngắn",
        month10_12_text: "Sức khỏe giảm", month10_12_advice: "Chú ý tiêu hóa, dạ dày",
        careerList: ["Cơ hội thăng tiến nhưng bị đố kỵ.", "Cẩn thận giấy tờ.", "Nên làm việc độc lập."],
        workspaceDirection: "Chính Nam", careerItem: "Tượng Gà (Tam hợp)",
        financeList: ["Tài lộc khá nhưng hay mất cắp vặt.", "Đầu tư đất đai có lời."],
        loveList: ["Gia đạo lục đục.", "Cần tin tưởng đối phương."],
        healthList: ["Bệnh về tiêu hóa.", "Đề phòng vật sắc nhọn."],
        prayNam: "Mùng 27 âm", prayNu: "Mùng 19 âm",
        fengshuiItems: "Tỳ hưu ngọc xanh", luckyColors: "Vàng, Nâu, Đỏ", luckyDirection: "Đông Nam",
        finalAdvice: "Cây ngay không sợ chết đứng. Chỉ cần làm ăn chân chính, tiểu nhân sẽ tự rút lui.",
        faq: [
            { q: "Tuổi Sửu năm 2026 làm ăn kinh doanh ổn không?", a: "Ở mức trung bình khá. Tuy nhiên cần đề phòng đối tác lật lọng, chơi xấu sau lưng do hạn Lục Hại." },
            { q: "Màu sắc nào giúp kích tài lộc cho tuổi Sửu?", a: "Màu Đỏ, Cam (Hỏa sinh Thổ) và Vàng (Bản mệnh) là tốt nhất." },
            { q: "Tháng nào tuổi Sửu cần kiêng kỵ nhất?", a: "Tháng 5 và tháng 6 âm lịch. Tránh đi xa, tránh ký kết hợp đồng lớn vào thời điểm này." }
        ]
    },
    {
        id: 'dan', name: 'Dần (Hổ)',
        image: 'img/tu-vi/tu-vi-tuoi-dan-nam-2026.webp',
        intro: "Năm 2026 là năm Tam Hợp (Dần - Ngọ - Tuất). Đây là thời cơ vàng để tuổi Dần bứt phá mạnh mẽ, 'hổ mọc thêm cánh'.",
        elementAnalysis: "Thủy của năm sinh Mộc của Dần (Tương sinh rất tốt)",
        score: "9.5/10",
        saoNam: "Thủy Diệu", mucDoNam: "Tốt", anhHuongNam: "Tài lộc dồi dào",
        saoNu: "Mộc Đức", mucDoNu: "Rất Tốt", anhHuongNu: "Vui vẻ, bình an",
        hanChung: "Tam Hợp Hóa Hỏa", anhHuongChung: "Sự nghiệp thăng hoa cực đại",
        goodMonths: "1, 5, 9, 10", badMonths: "4, 7",
        month1_3_text: "Khởi đầu thuận lợi", month1_3_advice: "Khai trương, mở rộng",
        month4_6_text: "Quý nhân phù trợ", month4_6_advice: "Ký kết hợp đồng lớn",
        month7_9_text: "Tài lộc đỉnh cao", month7_9_advice: "Mua nhà, tậu xe",
        month10_12_text: "Viên mãn", month10_12_advice: "Làm từ thiện, tri ân",
        careerList: ["Sự nghiệp lên như diều gặp gió.", "Thích hợp khởi nghiệp.", "Đi công tác xa có lợi."],
        workspaceDirection: "Nam", careerItem: "Tranh Ngựa (Mã đáo thành công)",
        financeList: ["Tiền bạc dư dả.", "Có lộc bất ngờ từ thừa kế hoặc trúng thưởng."],
        loveList: ["Độc thân dễ gặp ý trung nhân.", "Gia đình hạnh phúc."],
        healthList: ["Sức khỏe dồi dào.", "Hạn chế bia rượu."],
        prayNam: "Mùng 21 âm", prayNu: "Mùng 25 âm",
        fengshuiItems: "Tượng Ngựa vàng", luckyColors: "Xanh lá, Xanh dương", luckyDirection: "Nam",
        finalAdvice: "Thiên thời, địa lợi, nhân hòa đều có đủ. Hãy mạnh dạn hành động.",
        faq: [
            { q: "Tuổi Dần cưới hỏi năm 2026 có tốt không?", a: "Rất tốt. Năm Tam Hợp là thời điểm lý tưởng để kết hôn, sinh con, xây dựng gia đình hạnh phúc." },
            { q: "Nên đầu tư lĩnh vực gì trong năm nay?", a: "Bất động sản hoặc mở rộng quy mô kinh doanh hiện tại đều rất thuận lợi." },
            { q: "Có cần cúng sao giải hạn không?", a: "Dù sao tốt (Thủy Diệu/Mộc Đức), vẫn nên làm lễ nghinh sao đầu năm để tăng thêm cát khí." }
        ]
    },
    {
        id: 'mao', name: 'Mão (Mèo)',
        image: 'img/tu-vi/tu-vi-tuoi-mao-nam-2026.webp',
        intro: "Năm 2026 tuổi Mão phạm Tương Phá (Mão - Ngọ). Cẩn trọng trong các mối quan hệ xã giao và giữ gìn tài sản.",
        elementAnalysis: "Thủy sinh Mộc (Được năm tương sinh nên đỡ vất vả phần nào)",
        score: "6.5/10",
        saoNam: "Kế Đô", mucDoNam: "Xấu", anhHuongNam: "Thị phi, buồn rầu",
        saoNu: "Thái Dương", mucDoNu: "Tốt", anhHuongNu: "Được nam giới giúp đỡ",
        hanChung: "Phá Thái Tuế", anhHuongChung: "Hao tài, bị phá đám",
        goodMonths: "6, 9, 10", badMonths: "5, 8, 11",
        month1_3_text: "Bình thường", month1_3_advice: "Giữ gìn sức khỏe",
        month4_6_text: "Xung khắc nhẹ", month4_6_advice: "Tránh cãi vã",
        month7_9_text: "Hao tài", month7_9_advice: "Không đầu tư lớn",
        month10_12_text: "Có lộc nhỏ", month10_12_advice: "Thu hồi nợ cũ",
        careerList: ["Công việc trì trệ, dự án dễ hủy.", "Nên tập trung chuyên môn.", "Nữ mạng tốt hơn Nam."],
        workspaceDirection: "Đông Nam", careerItem: "Tháp Văn Xương",
        financeList: ["Thu nhập ổn định nhưng chi tiêu nhiều.", "Cẩn thận mất ví."],
        loveList: ["Dễ mâu thuẫn.", "Đào hoa xấu quấy rầy."],
        healthList: ["Chú ý bệnh gan.", "Suy nhược thần kinh."],
        prayNam: "Mùng 18 âm", prayNu: "Mùng 27 âm",
        fengshuiItems: "Vòng gỗ trầm hương", luckyColors: "Xanh ngọc, Đen", luckyDirection: "Bắc",
        finalAdvice: "Một sự nhịn, chín sự lành. Năm nay nên tu tâm dưỡng tính.",
        faq: [
            { q: "Tuổi Mão năm 2026 cần kiêng kỵ điều gì?", a: "Kiêng cho vay tiền, kiêng đứng ra bảo lãnh tài chính và hạn chế tranh luận chốn công sở." },
            { q: "Nam mạng tuổi Mão gặp sao Kế Đô có đáng lo không?", a: "Kế Đô là sao xấu, dễ gây buồn phiền, thị phi. Nên cúng sao giải hạn vào tháng 1, 3, 9 âm lịch." },
            { q: "Hướng xuất hành tốt nhất cho tuổi Mão?", a: "Hướng Bắc hoặc Đông Nam để đón Thần Tài và Hỷ Thần đầu năm." }
        ]
    },
    {
        id: 'thin', name: 'Thìn (Rồng)',
        image: 'img/tu-vi/tu-vi-tuoi-thin-nam-2026.webp',
        intro: "Năm 2026 là năm bình hòa với tuổi Thìn. Mọi sự ổn định, không quá đột phá nhưng cũng không có biến cố lớn.",
        elementAnalysis: "Thổ khắc Thủy (Thìn thổ khắc năm Thủy - Vất vả để đạt thành công)",
        score: "7/10",
        saoNam: "Vân Hớn", mucDoNam: "Trung bình", anhHuongNam: "Khẩu thiệt, nóng nảy",
        saoNu: "La Hầu", mucDoNu: "Xấu", anhHuongNu: "Thị phi, bệnh mắt",
        hanChung: "Bình Hòa", anhHuongChung: "Tự làm tự ăn",
        goodMonths: "7, 8, 11", badMonths: "3, 9",
        month1_3_text: "Vui xuân", month1_3_advice: "Chi tiêu hợp lý",
        month4_6_text: "Công việc nhiều", month4_6_advice: "Nghỉ ngơi hợp lý",
        month7_9_text: "Tài lộc khá", month7_9_advice: "Tích lũy",
        month10_12_text: "Bận rộn", month10_12_advice: "Cẩn thận sức khỏe",
        careerList: ["Công việc tiến triển đều.", "Ít quý nhân, tự lực cánh sinh.", "Nam mạng cần kiềm chế nóng nảy."],
        workspaceDirection: "Tây", careerItem: "Tượng Rồng cuộn",
        financeList: ["Thu nhập đủ chi tiêu.", "Không nên cho vay mượn."],
        loveList: ["Tình cảm êm đềm.", "Nữ mạng cẩn thận lời nói."],
        healthList: ["Bệnh về mắt, huyết áp.", "Đề phòng tai nạn nghề nghiệp."],
        prayNam: "Mùng 29 âm", prayNu: "Mùng 8 âm",
        fengshuiItems: "Đá thạch anh hồng", luckyColors: "Vàng, Đỏ", luckyDirection: "Tây Nam",
        finalAdvice: "Kiên trì là chìa khóa. Đừng mong giàu xổi.",
        faq: [
            { q: "Tuổi Thìn năm 2026 còn phạm Tam Tai không?", a: "Không. Tuổi Thìn đã hoàn toàn thoát khỏi hạn Tam Tai từ năm 2024, vận trình năm nay đã ổn định hơn." },
            { q: "Nữ tuổi Thìn sao La Hầu chiếu mệnh cần lưu ý gì?", a: "Cần chú ý các bệnh về tai, mắt, máu huyết và tránh tranh chấp, kiện tụng." },
            { q: "Có nên mở rộng quy mô kinh doanh năm nay?", a: "Có thể mở rộng nhưng nên làm từng bước, quy mô vừa phải, tránh vay mượn quá nhiều." }
        ]
    },
    {
        id: 'ty_snake', name: 'Tỵ (Rắn)',
        image: 'img/tu-vi/tu-vi-tuoi-ran-nam-2026.webp', 
        intro: "Vừa thoát khỏi năm tuổi 2025, bước sang 2026 tuổi Tỵ như 'rắn hóa rồng'. Vận trình khởi sắc rực rỡ, tài lộc dồi dào.",
        elementAnalysis: "Hỏa (Tỵ) gặp Thủy (Năm) - Tuy khắc nhưng Tỵ có Ngọ hỗ trợ (Tam hội Hỏa cục)",
        score: "8.5/10",
        saoNam: "Thái Dương", mucDoNam: "Rất Tốt", anhHuongNam: "Thăng quan tiến chức",
        saoNu: "Thổ Tú", mucDoNu: "Trung bình", anhHuongNu: "Có chút buồn phiền nhỏ",
        hanChung: "Cát Tường", anhHuongChung: "Mọi việc hanh thông",
        goodMonths: "1, 8, 12", badMonths: "10",
        month1_3_text: "Hồi phục", month1_3_advice: "Bắt tay kế hoạch mới",
        month4_6_text: "Thăng tiến", month4_6_advice: "Thể hiện năng lực",
        month7_9_text: "Tài lộc về", month7_9_advice: "Đầu tư sinh lời",
        month10_12_text: "Gia đạo vui", month10_12_advice: "Chuẩn bị đón tết to",
        careerList: ["Cơ hội thăng chức cao.", "Được sếp tin tưởng.", "Kinh doanh đắt hàng."],
        workspaceDirection: "Nam", careerItem: "Tỳ Hưu mạ vàng",
        financeList: ["Tiền bạc rủng rỉnh.", "Có lộc đất đai."],
        loveList: ["Tình cảm thăng hoa.", "Gia đình hòa thuận."],
        healthList: ["Sức khỏe tốt.", "Chú ý giữ dáng."],
        prayNam: "Mùng 27 âm", prayNu: "Mùng 19 âm",
        fengshuiItems: "Vòng tay đá Ruby", luckyColors: "Đỏ, Cam, Xanh lá", luckyDirection: "Đông",
        finalAdvice: "Thời vận đã đến, hãy mạnh dạn thực hiện ước mơ.",
        faq: [
            { q: "Tuổi Tỵ đã hết hạn Thái Tuế chưa?", a: "Rồi. Năm 2026 là năm rất tốt để phục hồi và bứt phá sau năm tuổi 2025 đầy biến động." },
            { q: "Tuổi Tỵ hợp màu gì năm 2026?", a: "Hợp màu Xanh lá (Mộc sinh Hỏa) và Đỏ/Cam (bản mệnh) để tăng cường năng lượng may mắn." },
            { q: "Năm nay có lộc về đất đai nhà cửa không?", a: "Khả năng cao có lộc về điền sản, đặc biệt vào các tháng cuối năm như tháng 8, 12 âm lịch." }
        ]
    },
    {
        id: 'ngo', name: 'Ngọ (Ngựa)',
        image: 'img/tu-vi/tu-vi-tuoi-ngo-nam-2026.webp',
        intro: "Năm 2026 là Năm Tuổi (Trực Thái Tuế). 'Thái Tuế phủ đầu', áp lực tâm lý lớn, dễ nóng nảy dẫn đến hỏng việc.",
        elementAnalysis: "Hỏa - Thủy (Thiên Hà Thủy khắc Hỏa của Ngọ) - Vận khí suy giảm.",
        score: "4.5/10",
        saoNam: "Thái Bạch", mucDoNam: "Xấu", anhHuongNam: "Hao tài, bệnh tật",
        saoNu: "Thái Âm", mucDoNu: "Tốt", anhHuongNu: "Đỡ vất vả hơn nam",
        hanChung: "Trực Thái Tuế", anhHuongChung: "Tự hình (tự làm khổ mình), thị phi",
        goodMonths: "1, 9", badMonths: "5, 11",
        month1_3_text: "Căng thẳng", month1_3_advice: "Đi chùa cầu an",
        month4_6_text: "Nóng nảy", month4_6_advice: "Kiềm chế cảm xúc",
        month7_9_text: "Bình ổn hơn", month7_9_advice: "Tập trung công việc",
        month10_12_text: "Đề phòng tai nạn", month10_12_advice: "Hạn chế đi xa",
        careerList: ["Công việc áp lực, bế tắc.", "Cạnh tranh gay gắt.", "Không nên chuyển việc."],
        workspaceDirection: "Nam", careerItem: "Tượng Chó (Tam hợp)",
        financeList: ["Hao tài tốn của.", "Không nên cho vay."],
        loveList: ["Dễ cãi vã, ly thân.", "Độc thân cô đơn."],
        healthList: ["Đau đầu, stress.", "Bệnh tim mạch."],
        prayNam: "Mùng 15 âm", prayNu: "Mùng 26 âm",
        fengshuiItems: "Vòng gỗ Hoàng Đàn", luckyColors: "Vàng, Nâu", luckyDirection: "Tây Bắc",
        finalAdvice: "Mặc đồ màu sáng để tăng dương khí. 'Một điều nhịn, chín điều lành'.",
        faq: [
            { q: "Năm tuổi có nên xây nhà, động thổ không?", a: "Tuyệt đối không nên xây nhà năm Trực Thái Tuế. Nếu bắt buộc phải làm, hãy mượn tuổi người khác." },
            { q: "Cách hóa giải Thái Tuế cho tuổi Ngọ?", a: "Mang theo kim bài Thái Tuế bên người, năng đi chùa làm công quả, phóng sinh đầu năm để tích đức." },
            { q: "Nam mạng tuổi Ngọ gặp sao Thái Bạch có đáng lo không?", a: "Rất đáng lo về tiền bạc. 'Thái Bạch quét sạch cửa nhà', cần chi tiêu hết sức cẩn trọng, tránh đầu tư lớn." }
        ]
    },
    {
        id: 'mui', name: 'Mùi (Dê)',
        image: 'img/tu-vi/tu-vi-tuoi-mui-nam-2026.webp',
        intro: "Năm 2026 tuổi Mùi gặp Lục Hợp (Ngọ - Mùi). Đây là năm Cát Lành, mọi việc suôn sẻ, có quý nhân phù trợ mọi lúc mọi nơi.",
        elementAnalysis: "Thổ (Mùi) khắc Thủy (Năm) nhưng được Lục Hợp hóa giải thành tốt.",
        score: "9/10",
        saoNam: "La Hầu", mucDoNam: "Xấu", anhHuongNam: "Chú ý lời nói",
        saoNu: "Kế Đô", mucDoNu: "Xấu", anhHuongNu: "Buồn phiền vô cớ",
        hanChung: "Lục Hợp", anhHuongChung: "Hợp tác thành công, tình duyên tốt",
        goodMonths: "2, 5, 10", badMonths: "9, 12",
        month1_3_text: "Quý nhân giúp", month1_3_advice: "Mở rộng quan hệ",
        month4_6_text: "Tài lộc vượng", month4_6_advice: "Đầu tư bất động sản",
        month7_9_text: "Gia đạo vui", month7_9_advice: "Tổ chức tiệc tùng",
        month10_12_text: "Tổng kết thắng lợi", month10_12_advice: "Thưởng cho bản thân",
        careerList: ["Hợp tác thuận lợi.", "Sự nghiệp thăng tiến.", "Thi cử đỗ đạt."],
        workspaceDirection: "Nam", careerItem: "Tượng Ngựa phong thủy",
        financeList: ["Tiền bạc dồi dào.", "Có duyên bất động sản."],
        loveList: ["Đào hoa nở rộ.", "Vợ chồng hòa thuận."],
        healthList: ["Sức khỏe ổn định.", "Bệnh xương khớp nhẹ."],
        prayNam: "Mùng 8 âm", prayNu: "Mùng 18 âm",
        fengshuiItems: "Vòng ngọc bích", luckyColors: "Tím, Cam", luckyDirection: "Nam",
        finalAdvice: "Năm rất đẹp để xây nhà, cưới hỏi. Hãy tận dụng triệt để vận may.",
        faq: [
            { q: "Tuổi Mùi 1991, 2003 năm 2026 mua xe được không?", a: "Rất tốt. Năm Lục Hợp mang lại sự an toàn và may mắn khi mua tài sản lớn." },
            { q: "Sao La Hầu có ảnh hưởng lớn đến nam tuổi Mùi không?", a: "Có ảnh hưởng nhưng nhờ cục diện Lục Hợp nên được hóa giải phần lớn, chỉ cần cẩn thận lời ăn tiếng nói." },
            { q: "Tuổi Mùi nên hợp tác với tuổi nào năm nay?", a: "Tuổi Ngọ, Hợi, Mão là những đối tác tuyệt vời nhất để cùng phát triển." }
        ]
    },
    {
        id: 'than', name: 'Thân (Khỉ)',
        image: 'img/tu-vi/tu-vi-tuoi-than-nam-2026.webp',
        intro: "Năm 2026 là năm bình ổn với tuổi Thân. Không có xung khắc lớn, tài lộc ở mức trung bình khá. Cần nỗ lực tự thân.",
        elementAnalysis: "Kim (Thân) sinh Thủy (Năm) - Sinh xuất (Hao khí nhẹ để nuôi năm).",
        score: "7/10",
        saoNam: "Thổ Tú", mucDoNam: "Trung bình", anhHuongNam: "Tiểu nhân, xuất hành kém",
        saoNu: "Vân Hớn", mucDoNu: "Trung bình", anhHuongNu: "Đề phòng thai sản",
        hanChung: "Bình Hòa", anhHuongChung: "Ổn định, túc tắc",
        goodMonths: "3, 11", badMonths: "1, 10",
        month1_3_text: "Du xuân vui vẻ", month1_3_advice: "Tránh đi quá xa",
        month4_6_text: "Công việc đều", month4_6_advice: "Học thêm ngoại ngữ",
        month7_9_text: "Tài lộc khá", month7_9_advice: "Tiết kiệm",
        month10_12_text: "Sức khỏe giảm", month10_12_advice: "Nghỉ ngơi nhiều hơn",
        careerList: ["Công việc ổn định.", "Hợp nghề kỹ thuật.", "Cần kiên trì."],
        workspaceDirection: "Tây Bắc", careerItem: "Tượng Rồng",
        financeList: ["Thu nhập đủ sống.", "Không nên đầu tư mạo hiểm."],
        loveList: ["Bình lặng.", "Độc thân cần chủ động."],
        healthList: ["Chú ý bệnh hô hấp.", "Hạn chế thuốc lá."],
        prayNam: "Mùng 19 âm", prayNu: "Mùng 29 âm",
        fengshuiItems: "Đá thạch anh trắng", luckyColors: "Trắng, Xám", luckyDirection: "Tây Bắc",
        finalAdvice: "Chậm mà chắc. Năm nay nên tập trung củng cố kiến thức và sức khỏe.",
        faq: [
            { q: "Tuổi Thân năm 2026 có còn phạm Tam Tai không?", a: "Có. Năm 2026 là năm cuối Tam Tai của tuổi Thân, vận hạn đã nhẹ hơn rất nhiều so với 2 năm trước." },
            { q: "Năm cuối Tam Tai cần kiêng kỵ những gì?", a: "Kiêng kết thúc việc lớn (như khánh thành nhà). Nên duy trì ổn định để chờ năm sau bứt phá." },
            { q: "Tuổi Thân hợp màu gì để giải hạn?", a: "Màu Trắng, Xám (Kim) và Vàng (Thổ) giúp cân bằng năng lượng." }
        ]
    },
    {
        id: 'dau', name: 'Dậu (Gà)',
        image: 'img/tu-vi/tu-vi-tuoi-dau-nam-2026.webp',
        intro: "Năm 2026 tuổi Dậu vận trình khá tốt, đặc biệt về tình duyên (Đào hoa vượng). Tuy nhiên cần chú ý sức khỏe.",
        elementAnalysis: "Kim (Dậu) sinh Thủy (Năm) - Sinh xuất (Hao tổn tâm lực).",
        score: "7.5/10",
        saoNam: "Thủy Diệu", mucDoNam: "Tốt", anhHuongNam: "Có lộc, hỷ sự",
        saoNu: "Mộc Đức", mucDoNu: "Tốt", anhHuongNu: "May mắn, bình an",
        hanChung: "Tứ Hành Xung (Nhẹ)", anhHuongChung: "Đào hoa nhưng thị phi tình ái",
        goodMonths: "3, 4, 12", badMonths: "2, 9",
        month1_3_text: "Vui vẻ", month1_3_advice: "Kết giao bạn bè",
        month4_6_text: "Đào hoa vượng", month4_6_advice: "Cẩn thận người thứ 3",
        month7_9_text: "Tài lộc tốt", month7_9_advice: "Kinh doanh thời trang",
        month10_12_text: "Sức khỏe kém", month10_12_advice: "Khám định kỳ",
        careerList: ["Công việc thuận lợi.", "Hợp nghề nghệ thuật.", "Cẩn thận tình cảm ảnh hưởng."],
        workspaceDirection: "Tây", careerItem: "Tượng Gà trống vàng",
        financeList: ["Tiền bạc hanh thông.", "Chi tiêu mua sắm nhiều."],
        loveList: ["Rất thu hút.", "Có gia đình cần giữ mình."],
        healthList: ["Suy nhược cơ thể.", "Bệnh phổi."],
        prayNam: "Mùng 21 âm", prayNu: "Mùng 25 âm",
        fengshuiItems: "Đá thạch anh tóc vàng", luckyColors: "Vàng, Trắng", luckyDirection: "Đông Nam",
        finalAdvice: "Vui duyên mới không quên nhiệm vụ. Cân bằng giữa tình cảm và sự nghiệp.",
        faq: [
            { q: "Tuổi Dậu có phạm Thái Tuế năm 2026?", a: "Có phạm Hình Thái Tuế và Tứ Hành Xung, chủ yếu ảnh hưởng đến mối quan hệ, dễ gặp thị phi tình ái." },
            { q: "Nữ tuổi Dậu 1993 cưới năm 2026 tốt không?", a: "Rất tốt. Năm nay có sao Mộc Đức và đào hoa vượng, cực kỳ lợi cho hỷ sự, cưới hỏi." },
            { q: "Tuổi Dậu nên kinh doanh ngành gì năm 2026?", a: "Các ngành liên quan đến làm đẹp, thời trang, ăn uống sẽ rất phát đạt." }
        ]
    },
    {
        id: 'tuat', name: 'Tuất (Chó)',
        image: 'img/tu-vi/tu-vi-tuoi-tuat-nam-2026.webp',
        intro: "Năm 2026 là năm Tam Hợp (Dần - Ngọ - Tuất). Tuổi Tuất như 'cá gặp nước', gặp nhiều may mắn, sự nghiệp thăng hoa rực rỡ.",
        elementAnalysis: "Thổ (Tuất) khắc Thủy (Năm) - Nhưng được cục diện Tam Hợp hóa giải.",
        score: "9/10",
        saoNam: "Vân Hớn", mucDoNam: "Trung bình", anhHuongNam: "Thủ cựu bình an",
        saoNu: "La Hầu", mucDoNu: "Xấu", anhHuongNu: "Thị phi, lo âu",
        hanChung: "Tam Hợp", anhHuongChung: "Quý nhân giúp đỡ, thành công lớn",
        goodMonths: "1, 2, 5", badMonths: "3, 6",
        month1_3_text: "Khởi sắc", month1_3_advice: "Triển khai dự định lớn",
        month4_6_text: "Tài lộc về", month4_6_advice: "Đầu tư sinh lời",
        month7_9_text: "Gia đạo vui", month7_9_advice: "Đi du lịch",
        month10_12_text: "Thành công", month10_12_advice: "Tổng kết, khen thưởng",
        careerList: ["Sự nghiệp vững chắc.", "Sếp tin tưởng.", "Thi cử đỗ cao."],
        workspaceDirection: "Tây Bắc", careerItem: "Tượng Ngựa",
        financeList: ["Tiền vào như nước.", "Có lộc đất đai."],
        loveList: ["Hạnh phúc viên mãn.", "Độc thân dễ tìm người yêu."],
        healthList: ["Khỏe mạnh.", "Chú ý xe cộ nhẹ."],
        prayNam: "Mùng 29 âm", prayNu: "Mùng 8 âm",
        fengshuiItems: "Vòng Mắt Hổ đỏ", luckyColors: "Đỏ, Cam", luckyDirection: "Nam",
        finalAdvice: "Năm cực tốt để làm việc lớn. Hãy tự tin và quyết đoán.",
        faq: [
            { q: "Tuổi Tuất năm 2026 xây nhà được không?", a: "Rất đẹp. Được Tam Hợp cục hỗ trợ, việc xây nhà sẽ diễn ra nhanh chóng và thuận lợi." },
            { q: "Nữ tuổi Tuất cần chú ý điều gì?", a: "Chú ý sao La Hầu chiếu mệnh, có thể gây khẩu thiệt thị phi hoặc bệnh về máu huyết." },
            { q: "Tuổi Tuất nên xuất hành hướng nào?", a: "Hướng Nam là hướng Tài thần, rất tốt cho việc ký kết làm ăn." }
        ]
    },
    {
        id: 'hoi', name: 'Hợi (Lợn)',
        image: 'img/tu-vi/tu-vi-tuoi-hoi-nam-2026.webp',
        intro: "Năm 2026 là năm bình hòa với tuổi Hợi. Cuộc sống êm đềm, ít sóng gió. Thích hợp để nghỉ ngơi và tái tạo năng lượng.",
        elementAnalysis: "Thủy (Hợi) gặp Thủy (Năm) - Tương trợ (Bình hòa).",
        score: "7.5/10",
        saoNam: "Thái Dương", mucDoNam: "Tốt", anhHuongNam: "Phát tài phát lộc",
        saoNu: "Thổ Tú", mucDoNu: "Trung bình", anhHuongNu: "Tiểu nhân quấy",
        hanChung: "Bình Hòa", anhHuongChung: "An khang thịnh vượng",
        goodMonths: "2, 6, 10", badMonths: "4, 7",
        month1_3_text: "Vui vẻ", month1_3_advice: "Du xuân, lễ chùa",
        month4_6_text: "Ổn định", month4_6_advice: "Làm việc chăm chỉ",
        month7_9_text: "Có lộc nhỏ", month7_9_advice: "Mua sắm vật dụng",
        month10_12_text: "Bình an", month10_12_advice: "Sum họp gia đình",
        careerList: ["Công việc ổn định.", "Môi trường thoải mái.", "Hợp làm từ thiện."],
        workspaceDirection: "Bắc", careerItem: "Tượng Mèo (Tam hợp)",
        financeList: ["Thu nhập đều.", "Nên gửi tiết kiệm."],
        loveList: ["Gia đạo êm ấm.", "Độc thân gặp mai mối."],
        healthList: ["Sức khỏe tốt.", "Chú ý thừa cân."],
        prayNam: "Mùng 27 âm", prayNu: "Mùng 19 âm",
        fengshuiItems: "Đá Aquamarine", luckyColors: "Xanh nước biển", luckyDirection: "Bắc",
        finalAdvice: "Sống chậm lại để cảm nhận hạnh phúc. 'Tri túc, tiện túc'.",
        faq: [
            { q: "Tuổi Hợi có phạm Thái Tuế không?", a: "Không. Năm 2026 tuổi Hợi hoàn toàn bình an, không phạm xung sát gì lớn." },
            { q: "Nam tuổi Hợi 1995, 1983 năm 2026 thế nào?", a: "Rất tốt. Nam mạng gặp sao Thái Dương chiếu mệnh nên công danh sáng lạn, tiền bạc dồi dào." },
            { q: "Tuổi Hợi nên sinh con năm 2026 không?", a: "Rất tốt. Thủy của con (2026) và Thủy của cha mẹ tương trợ, gia đình hòa thuận, con cái dễ nuôi." }
        ]
    }
];

// Tạo danh sách bài viết từ dữ liệu
export const zodiacPosts = animalsData.map((animal, index) => ({
    id: 100 + index, // ID bắt đầu từ 100 để tránh trùng
    category: "TU_VI",
    isPremium: false, // Để mọi người đều xem được
    title: `Tử Vi Tuổi ${animal.name} Năm 2026 (Bính Ngọ) - Luận Giải Chi Tiết Nhất`,
    excerpt: `Xem bói tử vi tuổi ${animal.name} năm 2026 nam mạng, nữ mạng chi tiết về công danh, sự nghiệp, tài lộc, tình duyên. Vận hạn năm Bính Ngọ tốt hay xấu? Cách hóa giải sao hạn.`,
    image: animal.image, 
    date: "01/01/2026",
    author: "Chuyên gia Tử Vi",
    content: generateSEOContent(animal),
    zodiacId: animal.id 
}));
