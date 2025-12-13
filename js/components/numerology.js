
import { generateContent, setApiKey } from '../ai.js';

// --- CƠ SỞ DỮ LIỆU Ý NGHĨA CÁC CON SỐ (PITAGO) ---
const NUMEROLOGY_DATA = {
    1: {
        title: "SỐ 1 - NHÀ LÃNH ĐẠO TIÊN PHONG",
        keywords: "Độc lập, Kiên quyết, Lãnh đạo, Cái tôi",
        desc: "Số 1 đại diện cho sự khởi đầu, sự thống nhất và tính cá nhân. Người mang số chủ đạo 1 sinh ra để trở thành lãnh đạo. Bạn có ý chí sắt đá, độc lập và luôn muốn đi trên con đường riêng của mình.",
        strengths: ["Quyết đoán, mạnh mẽ", "Có tố chất lãnh đạo bẩm sinh", "Tập trung cao độ vào mục tiêu"],
        weaknesses: ["Đôi khi độc đoán, bảo thủ", "Cái tôi quá lớn", "Khó lắng nghe ý kiến người khác"]
    },
    2: {
        title: "SỐ 2 - NGƯỜI HÒA GIẢI YÊU THƯƠNG",
        keywords: "Trực giác, Hòa bình, Tình cảm, Kết nối",
        desc: "Số 2 là hiện thân của sự kiên nhẫn, ngoại giao và tình yêu thương. Bạn là người nhạy cảm, có trực giác cực tốt và luôn mong muốn sự hòa bình. Bạn là 'chất keo' gắn kết mọi người.",
        strengths: ["Giỏi lắng nghe và thấu hiểu", "Trực giác nhạy bén", "Giỏi ngoại giao, hòa giải"],
        weaknesses: ["Dễ bị tổn thương", "Hay lưỡng lự, thiếu quyết đoán", "Phụ thuộc cảm xúc vào người khác"]
    },
    3: {
        title: "SỐ 3 - NGƯỜI TRUYỀN CẢM HỨNG",
        keywords: "Sáng tạo, Giao tiếp, Vui vẻ, Nghệ thuật",
        desc: "Số 3 là con số của sự biểu đạt và sáng tạo. Bạn có khiếu hài hước, hoạt ngôn và luôn mang lại tiếng cười cho đám đông. Bạn sở hữu tư duy nhạy bén và năng khiếu nghệ thuật.",
        strengths: ["Thông minh, lanh lợi", "Giao tiếp cuốn hút", "Lạc quan, yêu đời"],
        weaknesses: ["Dễ thay đổi, thiếu kiên nhẫn", "Hay ngồi lê đôi mách", "Cảm xúc thất thường"]
    },
    4: {
        title: "SỐ 4 - NGƯỜI KIẾN TẠO VỮNG CHẮC",
        keywords: "Kỷ luật, Thực tế, Chăm chỉ, Chi tiết",
        desc: "Số 4 đại diện cho sự ổn định, trật tự và thực tế. Bạn là người làm việc có nguyên tắc, tỉ mỉ và đáng tin cậy. Bạn xây dựng cuộc sống dựa trên nền tảng vững chắc.",
        strengths: ["Nguyên tắc, kỷ luật cao", "Chăm chỉ, thực tế", "Trung thành và đáng tin cậy"],
        weaknesses: ["Cứng nhắc, bảo thủ", "Quá coi trọng chi tiết nhỏ", "Khó thích nghi với thay đổi"]
    },
    5: {
        title: "SỐ 5 - NGƯỜI KHÁM PHÁ TỰ DO",
        keywords: "Tự do, Phiêu lưu, Đa tài, Thay đổi",
        desc: "Số 5 là con số của sự tự do bất tận và sự thay đổi. Bạn ghét sự ràng buộc, yêu thích du lịch và khám phá những điều mới mẻ. Bạn có khả năng thích nghi tuyệt vời.",
        strengths: ["Linh hoạt, thích nghi tốt", "Yêu tự do, phóng khoáng", "Giàu năng lượng, đa tài"],
        weaknesses: ["Cả thèm chóng chán", "Thiếu kiên định", "Dễ sa đà vào thú vui"]
    },
    6: {
        title: "SỐ 6 - NGƯỜI CHĂM SÓC (MẪU TỬ)",
        keywords: "Gia đình, Trách nhiệm, Yêu thương, Hy sinh",
        desc: "Số 6 là con số của tình mẫu tử, gia đình và trách nhiệm. Bạn là người giàu lòng trắc ẩn, luôn muốn che chở và chăm sóc cho người khác. Gia đình là số 1 đối với bạn.",
        strengths: ["Giàu tình yêu thương", "Có trách nhiệm cao", "Giỏi chăm sóc người khác"],
        weaknesses: ["Hay lo lắng thái quá", "Ôm đồm việc vào người", "Dễ bị lợi dụng lòng tốt"]
    },
    7: {
        title: "SỐ 7 - NGƯỜI TRI THỨC ĐƠN ĐỘC",
        keywords: "Phân tích, Tri thức, Huyền bí, Trải nghiệm",
        desc: "Số 7 là con số của tri thức và chân lý. Bạn thích chiêm nghiệm, học hỏi qua trải nghiệm thực tế và có xu hướng tâm linh. Bạn thường thích sự riêng tư để suy ngẫm.",
        strengths: ["Tư duy logic, phân tích sâu", "Ham học hỏi", "Trực giác mạnh"],
        weaknesses: ["Khép kín, khó gần", "Hay hoài nghi", "Dễ rơi vào trạng thái cô đơn"]
    },
    8: {
        title: "SỐ 8 - NGƯỜI ĐIỀU HÀNH THỊNH VƯỢNG",
        keywords: "Quyền lực, Tài chính, Thành công, Độc lập",
        desc: "Số 8 là con số của tiền bạc, quyền lực và thành công vật chất. Bạn có tư duy kinh doanh nhạy bén, tham vọng lớn và khả năng điều hành xuất sắc.",
        strengths: ["Quyết đoán, bản lĩnh", "Giỏi quản lý tài chính", "Chịu được áp lực cao"],
        weaknesses: ["Thực dụng", "Đôi khi lạnh lùng", "Quá tham công tiếc việc"]
    },
    9: {
        title: "SỐ 9 - NGƯỜI CHO ĐI (NHÂN ĐẠO)",
        keywords: "Cống hiến, Bao dung, Lý tưởng, Hoàn thiện",
        desc: "Số 9 là con số của tình yêu nhân loại và sự cho đi. Bạn có lý tưởng sống cao đẹp, bao dung và luôn muốn giúp đỡ cộng đồng. Bạn là người gánh vác trách nhiệm lớn.",
        strengths: ["Giàu lòng nhân ái", "Có trách nhiệm xã hội", "Lý tưởng sống cao đẹp"],
        weaknesses: ["Dễ bị lợi dụng", "Khó quản lý tài chính cá nhân", "Đôi khi ảo tưởng thực tế"]
    },
    11: {
        title: "SỐ 11 - BẬC THẦY TRỰC GIÁC (MASTER)",
        keywords: "Tâm linh, Nhạy cảm, Tinh tế, Dẫn lối",
        desc: "Số 11 là con số Master đầu tiên, sở hữu trực giác tâm linh cực mạnh. Bạn nhạy cảm, tinh tế và có khả năng truyền cảm hứng lớn lao cho người khác.",
        strengths: ["Trực giác phi thường", "Tinh tế, nhạy cảm", "Có khả năng chữa lành tâm hồn"],
        weaknesses: ["Dễ bị stress, căng thẳng", "Mơ mộng thiếu thực tế", "Cảm xúc cực đoan"]
    },
    22: {
        title: "SỐ 22 - BẬC THẦY KIẾN TẠO (MASTER)",
        keywords: "Tầm nhìn, Hành động, Kỷ luật, Vĩ đại",
        desc: "Số 22/4 được gọi là 'Kiến trúc sư đại tài'. Bạn kết hợp được tầm nhìn xa của số 11 và tính thực tế của số 4 để biến những giấc mơ lớn thành hiện thực.",
        strengths: ["Tầm nhìn vĩ mô", "Khả năng hiện thực hóa ước mơ", "Kỷ luật thép"],
        weaknesses: ["Áp lực thành công quá lớn", "Đôi khi độc đoán", "Quá ám ảnh công việc"]
    },
    33: {
         title: "SỐ 33 - BẬC THẦY CHỮA LÀNH (MASTER)",
         keywords: "Chữa lành, Hướng dẫn, Từ bi, Hy sinh",
         desc: "Số 33/6 là con số hiếm, đại diện cho tình yêu thương vô điều kiện và khả năng chữa lành. Bạn mang sứ mệnh hướng dẫn và nâng đỡ tinh thần cho người khác.",
         strengths: ["Lòng từ bi vô hạn", "Khả năng chữa lành", "Sức hút tự nhiên"],
         weaknesses: ["Dễ quên bản thân", "Gánh vác quá nhiều", "Dễ bị cảm xúc chi phối"]
    }
};

// Hàm tính tổng các chữ số
const sumDigits = (num) => {
    let sum = 0;
    while (num > 0 || sum > 9) {
        if (num === 0) {
            if (sum === 11 || sum === 22 || sum === 33) return sum;
            num = sum;
            sum = 0;
        }
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
};

// Hàm tính số chủ đạo
const calculateLifePathNumber = (day, month, year) => {
    const d = sumDigits(day);
    const m = sumDigits(month);
    const y = sumDigits(year);
    const total = d + m + y;
    return sumDigits(total);
};

// Hàm xử lý khi người dùng nhập Key trực tiếp tại trang kết quả
window.retryNumerologyAI = async () => {
    const keyInput = document.getElementById('num-api-key-input');
    if (!keyInput || !keyInput.value.trim()) {
        alert("Vui lòng nhập API Key hợp lệ.");
        return;
    }
    
    // Lưu Key
    if(setApiKey(keyInput.value.trim())) {
        // Thử lại quá trình submit
        app.handleNumerologySubmit();
    }
};

export const renderNumerology = () => {
    return `
        <div class="space-y-8 animate-fade-in font-sans">
            <!-- Header Section -->
            <div class="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-lg relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div class="relative z-10">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                        🔢
                    </div>
                    <!-- H1 Chuẩn SEO cho trang Thần Số Học -->
                    <h1 class="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Thần Số Học (Numerology) Online - Khám Phá Bí Mật Ngày Sinh</h1>
                    <p class="text-pink-100 max-w-2xl mx-auto text-sm md:text-base">
                        Công cụ tra cứu Số Chủ Đạo miễn phí & Chính xác nhất theo trường phái Pythagoras.
                    </p>
                </div>
            </div>
            
            <!-- Giải thích cách tính (Accordion) -->
            <details class="bg-pink-50 dark:bg-gray-800 rounded-xl border border-pink-100 dark:border-gray-700 overflow-hidden group">
                <summary class="flex items-center justify-between p-4 cursor-pointer font-bold text-pink-800 dark:text-pink-400 select-none">
                    <span>📐 Cách tính Số Chủ Đạo như thế nào?</span>
                    <span class="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div class="p-4 pt-0 text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-t border-pink-100 dark:border-gray-700 mt-2">
                    <p class="mb-2">Chúng tôi sử dụng phương pháp cộng dồn của <strong>Pythagoras</strong>:</p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li><strong>Bước 1:</strong> Cộng các số trong Ngày sinh. Ví dụ: 25 -> 2+5 = 7.</li>
                        <li><strong>Bước 2:</strong> Cộng các số trong Tháng sinh. Ví dụ: 12 -> 1+2 = 3.</li>
                        <li><strong>Bước 3:</strong> Cộng các số trong Năm sinh. Ví dụ: 1990 -> 1+9+9+0 = 19 -> 1+9 = 10 -> 1.</li>
                        <li><strong>Bước 4:</strong> Cộng tổng 3 kết quả trên: 7 + 3 + 1 = 11.</li>
                    </ul>
                    <p class="mt-2 italic text-xs">Lưu ý: Các số Master 11, 22, 33 được giữ nguyên không cộng dồn.</p>
                </div>
            </details>

            <!-- Input Section (CÔNG CỤ TRA CỨU) -->
            <div id="cong-cu-tra-cuu" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6 md:p-10 relative">
                 <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-t-2xl"></div>
                 <h2 class="text-xl font-bold text-pink-700 dark:text-pink-400 mb-6 flex items-center gap-2">
                    <span>🔮</span> Công cụ Tính toán Số Chủ Đạo Miễn phí
                 </h2>
                 <p class="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    Vui lòng nhập họ tên và ngày tháng năm sinh Dương lịch của bạn để bắt đầu tra cứu báo cáo Thần Số Học chi tiết:
                 </p>

                <div class="grid grid-cols-1 gap-8">
                    <!-- Form Nhập Liệu -->
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Họ và Tên khai sinh</label>
                            <input type="text" id="num-name" class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none transition dark:text-white" placeholder="Ví dụ: Nguyễn Văn A">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Ngày tháng năm sinh (Dương lịch)</label>
                            <div class="grid grid-cols-3 gap-3">
                                <input type="number" id="num-day" placeholder="Ngày" min="1" max="31" class="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none text-center dark:text-white">
                                <input type="number" id="num-month" placeholder="Tháng" min="1" max="12" class="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none text-center dark:text-white">
                                <input type="number" id="num-year" placeholder="Năm" min="1900" max="2100" class="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none text-center dark:text-white">
                            </div>
                        </div>

                        <button onclick="app.handleNumerologySubmit()" id="btn-num-submit" class="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-pink-200 dark:shadow-none transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2">
                            <span>✨</span> Tra Cứu Ngay
                        </button>
                    </div>
                </div>
            </div>

            <!-- Result Section -->
            <div id="num-result" class="hidden animate-fade-in scroll-mt-20 space-y-6">
                <!-- 1. Kết quả cơ bản (DỮ LIỆU TĨNH - HIỆN NGAY) -->
                <div id="num-basic-result">
                    <!-- Nội dung JS sẽ điền vào đây -->
                </div>

                <!-- 2. Phần AI (Loading / Error / Content) -->
                <div id="num-ai-container"></div>
            </div>

            <!-- SEO CONTENT ARTICLE -->
            <article class="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-sm mt-12 text-gray-700 dark:text-gray-300 leading-relaxed text-justify prose prose-pink dark:prose-invert max-w-none">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Thần Số Học là gì? Tại sao bạn nên tra cứu?
                </h2>
                
                <p>
                    <strong>Thần Số Học</strong> (hay Numerology) là một bộ môn khoa học tâm linh cổ đại dựa trên ý nghĩa của các con số, giúp giải mã tính cách, tiềm năng và con đường phát triển của mỗi cá nhân thông qua ngày tháng năm sinh. Trang web của chúng tôi cung cấp công cụ tính toán <strong>Thần Số Học online</strong> hoàn toàn miễn phí, mang lại cho bạn cái nhìn sâu sắc về bản thân và những định hướng quan trọng trong cuộc đời.
                </p>
                <p>
                    Tìm hiểu về <strong>Số Chủ Đạo</strong> là bước đầu tiên để nắm bắt vận mệnh. Hãy khám phá ngay để biết con số của bạn là gì và nó mang ý nghĩa gì đối với sự nghiệp, tình cảm và các mối quan hệ xã hội của bạn.
                </p>

                <h2 id="chi-so-quan-trong" class="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">
                    Các Chỉ Số Quan Trọng Trong Thần Số Học
                </h2>
                <p>
                    Để hiểu rõ bức tranh cuộc đời, bạn cần phân tích đồng thời nhiều chỉ số khác nhau. Dưới đây là những chỉ số cốt lõi mà ứng dụng của chúng tôi cung cấp:
                </p>
                
                <div class="space-y-6 mt-6 not-prose">
                    <div class="border-l-4 border-pink-500 pl-4">
                        <h3 class="text-lg font-bold text-pink-700 dark:text-pink-400">Số Chủ Đạo (Life Path Number)</h3>
                        <p class="text-sm mt-1 text-gray-600 dark:text-gray-400">
                            Đây là chỉ số quan trọng nhất, đại diện cho con đường đời, tài năng thiên bẩm và những thách thức lớn nhất bạn sẽ gặp.
                            <a onclick="app.filterBlog('THAN_SO_HOC')" class="text-blue-600 hover:underline cursor-pointer ml-1">➡️ Xem chi tiết ý nghĩa từng Số Chủ Đạo</a>
                        </p>
                    </div>

                    <div class="border-l-4 border-pink-400 pl-4">
                        <h3 class="text-lg font-bold text-pink-700 dark:text-pink-400">Số Sứ Mệnh (Destiny Number)</h3>
                        <p class="text-sm mt-1 text-gray-600 dark:text-gray-400">
                            Chỉ số này cho biết mục đích sống và vai trò bạn cần hoàn thành trong cuộc đời, thường liên quan đến nghề nghiệp và đóng góp xã hội.
                        </p>
                    </div>

                    <div class="border-l-4 border-pink-300 pl-4">
                        <h3 class="text-lg font-bold text-pink-700 dark:text-pink-400">Số Linh Hồn (Soul Urge Number)</h3>
                        <p class="text-sm mt-1 text-gray-600 dark:text-gray-400">
                            Tiết lộ những khao khát sâu thẳm, động lực bên trong và điều thực sự làm bạn thỏa mãn trong cuộc sống.
                        </p>
                    </div>
                </div>

                <div class="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl mt-8 not-prose">
                    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        Bắt đầu hành trình giải mã bản thân
                    </h2>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Việc tìm hiểu Thần Số Học là một công cụ mạnh mẽ để cải thiện cuộc sống cá nhân. Nếu bạn muốn tìm hiểu sâu hơn, hãy tham khảo các chuyên mục dưới đây:
                    </p>
                    <ul class="space-y-2">
                        <li>
                            <a onclick="app.viewPost('tinh-bieu-do-ngay-sinh-cho-nguoi-sinh-nam-2025')" class="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">
                                🔢 Tạo Biểu Đồ Ngày Sinh
                            </a>
                        </li>
                        <li>
                            <a onclick="app.viewPost('than-so-hoc-y-nghia-con-so-chu-dao-2025')" class="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">
                                🗓️ Tính Năm Cá Nhân (Personal Year)
                            </a>
                        </li>
                        <li>
                            <a onclick="app.navigate('LOVE')" class="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer">
                                ❤️ Xem Số Tương Hợp trong Tình Yêu
                            </a>
                        </li>
                    </ul>
                </div>
            </article>

            <!-- FAQ SECTION (CÂU HỎI THƯỜNG GẶP) - Updated Style -->
            <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Câu hỏi thường gặp về Thần Số Học
                </h3>
                <div class="space-y-0">
                    <!-- FAQ 1 -->
                    <details class="group border-b border-gray-200 dark:border-gray-700">
                        <summary class="flex justify-between items-center py-4 cursor-pointer select-none font-bold text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                            <span>Thần số học có phải là mê tín dị đoan không?</span>
                            <span class="transition-transform group-open:rotate-180">
                                <svg fill="none" height="20" width="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pb-4 text-justify">
                            <p>Không. Thần số học (Numerology) là một môn khoa học thống kê phương Tây có lịch sử hàng nghìn năm, được phát triển bởi nhà toán học Pythagoras. Nó nghiên cứu sóng rung của các con số và tác động của chúng lên tính cách con người, hoàn toàn khác với bói toán hay mê tín.</p>
                        </div>
                    </details>

                    <!-- FAQ 2 -->
                    <details class="group border-b border-gray-200 dark:border-gray-700">
                        <summary class="flex justify-between items-center py-4 cursor-pointer select-none font-bold text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                            <span>Số chủ đạo có thay đổi theo thời gian không?</span>
                            <span class="transition-transform group-open:rotate-180">
                                <svg fill="none" height="20" width="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pb-4 text-justify">
                            <p>Không. Số chủ đạo được tính dựa trên ngày sinh dương lịch cố định của bạn nên nó sẽ không bao giờ thay đổi suốt cuộc đời. Tuy nhiên, năng lượng của các "Năm cá nhân" (Personal Year) sẽ thay đổi hàng năm, ảnh hưởng đến vận trình từng giai đoạn.</p>
                        </div>
                    </details>

                    <!-- FAQ 3 -->
                    <details class="group border-b border-gray-200 dark:border-gray-700">
                        <summary class="flex justify-between items-center py-4 cursor-pointer select-none font-bold text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                            <span>Nếu ngày sinh trên giấy tờ khác ngày sinh thật thì tính theo ngày nào?</span>
                            <span class="transition-transform group-open:rotate-180">
                                <svg fill="none" height="20" width="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pb-4 text-justify">
                            <p>Bạn nên tính theo <strong>ngày sinh trên giấy tờ (CMND/CCCD)</strong> vì đó là con số được xã hội công nhận và gọi tên bạn hàng ngày, tạo ra năng lượng rung động mạnh nhất ảnh hưởng đến sự nghiệp và công danh. Ngày sinh thật sẽ ảnh hưởng nhiều hơn đến tính cách ẩn sâu bên trong.</p>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    `;
};

export const handleNumerologySubmit = async () => {
    const name = document.getElementById('num-name').value.trim();
    const d = parseInt(document.getElementById('num-day').value);
    const m = parseInt(document.getElementById('num-month').value);
    const y = parseInt(document.getElementById('num-year').value);
    const btn = document.getElementById('btn-num-submit');
    const resultArea = document.getElementById('num-result');
    const basicResultArea = document.getElementById('num-basic-result');
    const aiContainer = document.getElementById('num-ai-container');

    // Validate input
    if (!name || !d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900) {
        alert("Vui lòng nhập đầy đủ thông tin hợp lệ.");
        return;
    }

    // 1. TÍNH TOÁN CƠ BẢN NGAY LẬP TỨC
    const lifePathNumber = calculateLifePathNumber(d, m, y);
    const birthDateStr = `${d}/${m}/${y}`;
    
    // Lấy dữ liệu tĩnh
    const staticData = NUMEROLOGY_DATA[lifePathNumber] || {
        title: `SỐ CHỦ ĐẠO ${lifePathNumber}`,
        keywords: "Bí ẩn, Đặc biệt",
        desc: "Con số này mang năng lượng đặc biệt cần được luận giải chi tiết.",
        strengths: ["Đang cập nhật"],
        weaknesses: ["Đang cập nhật"]
    };

    resultArea.classList.remove('hidden');
    
    // RENDER NGAY KẾT QUẢ TĨNH (Không cần API Key)
    basicResultArea.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-pink-100 dark:border-gray-700 mb-6">
            <!-- Header Card -->
            <div class="bg-pink-600 p-8 text-center text-white relative overflow-hidden">
                <div class="relative z-10">
                    <div class="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Số Chủ Đạo Của Bạn</div>
                    <div class="text-8xl font-extrabold mb-4 text-yellow-300 drop-shadow-lg">${lifePathNumber}</div>
                    <div class="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-bold mb-2">${staticData.keywords}</div>
                    <div class="text-lg font-medium uppercase mt-2">${name}</div>
                    <div class="text-sm opacity-90">${birthDateStr}</div>
                </div>
            </div>
            
            <!-- Body Card -->
            <div class="p-6 md:p-8">
                <h2 class="text-2xl font-bold text-pink-700 dark:text-pink-400 mb-4 text-center">${staticData.title}</h2>
                
                <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify mb-8">
                    ${staticData.desc}
                </p>

                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-100 dark:border-green-800">
                        <h3 class="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                            <span>👍</span> Điểm mạnh
                        </h3>
                        <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            ${staticData.strengths.map(s => `<li class="flex items-start gap-2"><span class="text-green-500">•</span> ${s}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-100 dark:border-red-800">
                        <h3 class="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                            <span>👎</span> Điểm yếu cần khắc phục
                        </h3>
                         <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            ${staticData.weaknesses.map(w => `<li class="flex items-start gap-2"><span class="text-red-500">•</span> ${w}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Cuộn xuống kết quả ngay
    resultArea.scrollIntoView({ behavior: 'smooth' });

    // 2. BẮT ĐẦU GỌI AI ĐỂ LUẬN GIẢI NÂNG CAO
    // Nếu không có Key, phần này sẽ hiển thị lỗi, nhưng người dùng đã xem được phần trên.
    
    btn.disabled = true;
    btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang tải luận giải chi tiết...`;

    // Hiển thị trạng thái Loading cho phần AI (Bên dưới phần kết quả tĩnh)
    aiContainer.innerHTML = `
        <div class="bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-center">
             <div class="inline-block w-8 h-8 border-2 border-pink-300 border-t-pink-600 rounded-full animate-spin mb-2"></div>
             <p class="text-sm text-gray-500 dark:text-gray-400">Đang kết nối AI để dự báo năm 2025...</p>
        </div>
    `;

    try {
        const prompt = `
            Tôi đã tính ra số chủ đạo là ${lifePathNumber} cho người tên ${name}, sinh ngày ${birthDateStr}.
            Tôi đã hiển thị ý nghĩa cơ bản rồi.
            
            Nhiệm vụ của bạn (Chuyên gia Thần số học):
            Hãy viết một đoạn luận giải **NÂNG CAO** và **CÁ NHÂN HÓA** hơn (dưới dạng HTML div):
            1. Dự báo cụ thể vận trình năm 2025 (Năm thế giới số 9) cho riêng người mang số chủ đạo ${lifePathNumber}.
            2. Một lời khuyên tâm linh sâu sắc dành riêng cho họ.
            3. Nghề nghiệp phù hợp nhất.
            
            Văn phong: Huyền bí, sâu sắc, tích cực.
        `;

        const content = await generateContent(prompt);

        if (content.includes("API Key")) {
            throw new Error("MISSING_KEY");
        }

        // Render kết quả AI thành công
        aiContainer.innerHTML = `
             <div class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-inner border border-pink-100 dark:border-gray-600 p-8 prose prose-pink dark:prose-invert max-w-none leading-relaxed animate-fade-in relative">
                <div class="absolute top-0 left-0 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg shadow-sm">GÓC NHÌN AI CHUYÊN SÂU</div>
                ${content.replace(/\n/g, '<br>')}
                
                <div class="mt-8 pt-6 border-t border-pink-100 dark:border-gray-700 text-center">
                    <button onclick="document.getElementById('num-name').focus(); window.scrollTo({top:0, behavior:'smooth'})" class="text-pink-600 dark:text-pink-400 font-bold hover:underline text-sm">
                        ⟳ Tra cứu cho người khác
                    </button>
                </div>
             </div>
        `;

    } catch (error) {
        console.error(error);
        
        // Giao diện khi thiếu API Key: Hiển thị form nhập key NHƯNG KHÔNG CHE kết quả tĩnh
        aiContainer.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-red-200 dark:border-red-900 p-6 text-center animate-fade-in">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2 flex items-center justify-center gap-2">
                    <span>✨</span> Muốn xem Dự báo năm 2025?
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Bạn đã xem ý nghĩa Số chủ đạo ở trên. Để AI phân tích chi tiết vận hạn năm 2025, vui lòng nhập API Key.
                </p>
                
                <div class="max-w-md mx-auto relative group">
                    <input type="password" id="num-api-key-input" class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-24 focus:ring-2 focus:ring-pink-500 outline-none transition" placeholder="Nhập API Key để mở khóa...">
                    <button onclick="window.retryNumerologyAI()" class="absolute right-1 top-1 bottom-1 bg-pink-600 hover:bg-pink-700 text-white px-4 rounded-md font-bold text-sm transition">
                        Luận giải
                    </button>
                </div>
                
                <p class="text-xs text-gray-400 mt-3">
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" class="underline hover:text-pink-500">Lấy API Key miễn phí</a>
                </p>
            </div>
        `;
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<span>✨</span> Tra Cứu Ngay`;
    }
};
