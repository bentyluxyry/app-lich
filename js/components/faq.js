
/**
 * Hàm tạo giao diện Câu hỏi thường gặp (FAQ) chuẩn Google One Style
 * @param {Array} items - Danh sách câu hỏi [{q: "Câu hỏi", a: "Câu trả lời"}]
 * @returns {string} HTML String
 */
export const renderFAQ = (items) => {
    if (!items || items.length === 0) return '';

    const faqItems = items.map(item => `
        <details class="group border-b border-gray-200 dark:border-gray-700">
            <summary class="flex justify-between items-center py-5 cursor-pointer list-none select-none text-gray-800 dark:text-gray-100 font-bold text-lg hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <span>${item.q}</span>
                <span class="text-2xl leading-none font-light text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-45 ml-4">+</span>
            </summary>
            <div class="pb-6 text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                ${item.a.startsWith('<p>') ? item.a : `<p>${item.a}</p>`}
            </div>
        </details>
    `).join('');

    return `
        <!-- FAQ SECTION AUTOMATIC -->
        <div class="mt-12 pt-8">
            <div class="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                 <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                    Câu hỏi thường gặp
                </h3>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-700">
                ${faqItems}
            </div>
        </div>
    `;
};
