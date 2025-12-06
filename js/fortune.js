import { generateContent } from './ai.js';

export function renderFortune() {
    return `
        <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden font-sans animate-fade-in my-8">
            <div class="bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-center text-white relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <h2 class="text-3xl font-bold mb-2 relative z-10">💘 Bói Tình Duyên AI</h2>
                <p class="opacity-95 relative z-10">Nhập tên hai người để xem mức độ hòa hợp</p>
            </div>
            
            <div class="p-8 space-y-6">
                <div class="flex flex-col md:flex-row gap-6 items-center">
                    <div class="w-full relative">
                        <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Tên của bạn</label>
                        <input id="fortune-name-1" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition font-medium text-gray-700" placeholder="Ví dụ: Nguyễn Văn A">
                    </div>
                    
                    <div class="flex-shrink-0 text-4xl animate-pulse pt-6">❤️</div>
                    
                    <div class="w-full relative">
                        <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Tên người ấy</label>
                        <input id="fortune-name-2" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition font-medium text-gray-700" placeholder="Ví dụ: Trần Thị B">
                    </div>
                </div>
                
                <button onclick="app.handleFortuneCheck()" id="btn-fortune-check" class="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-pink-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                    <span>🔮</span> Xem Kết Quả Ngay
                </button>

                <div id="fortune-result-area" class="hidden mt-6 bg-pink-50 border border-pink-200 rounded-xl p-6 text-gray-800 leading-relaxed relative">
                    <!-- Kết quả sẽ hiện ở đây -->
                </div>
            </div>
        </div>
    `;
}

export async function handleFortuneCheck() {
    const n1 = document.getElementById('fortune-name-1').value.trim();
    const n2 = document.getElementById('fortune-name-2').value.trim();
    const btn = document.getElementById('btn-fortune-check');
    const resultArea = document.getElementById('fortune-result-area');

    if (!n1 || !n2) {
        alert("Vui lòng nhập tên của cả hai người!");
        return;
    }

    // UI Loading state
    btn.disabled = true;
    btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang hỏi vũ trụ...`;
    
    resultArea.classList.remove('hidden');
    resultArea.innerHTML = '<p class="text-center text-gray-500 italic">Đang phân tích thiên cơ...</p>';

    // Call AI
    const prompt = `Xem bói tình duyên vui vẻ cho 2 người: "${n1}" và "${n2}". 
    Hãy đưa ra một con số % hợp nhau và một lời bình luận hài hước, dí dỏm, mang tính giải trí. 
    Định dạng trả về:
    - Độ hợp: XX%
    - Lời khuyên: ...`;
    
    const text = await generateContent(prompt);

    // Render Result
    resultArea.innerHTML = `
        <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-pink-600 px-3 py-1 rounded-full text-xs font-bold border border-pink-200 shadow-sm">KẾT QUẢ</div>
        <div class="prose prose-pink max-w-none">
            ${text.replace(/\n/g, '<br>')}
        </div>
    `;

    // Reset UI
    btn.disabled = false;
    btn.innerHTML = `<span>🔮</span> Xem Kết Quả Ngay`;
}