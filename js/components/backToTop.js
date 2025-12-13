
export const BackToTop = {
    render: () => {
        // Chỉ tạo nút nếu chưa có
        if (document.getElementById('back-to-top-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'back-to-top-btn';
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Cập nhật z-index lên 60 để luôn nằm trên cùng (Floating TOC là 40-50)
        btn.className = "fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-green-600 text-white p-3 rounded-full shadow-lg z-[60] hover:bg-green-700 transition-all duration-300 opacity-0 invisible translate-y-4 hover:scale-110 shadow-green-200/50 flex items-center justify-center";
        
        btn.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        `;

        document.body.appendChild(btn);
    },

    init: () => {
        BackToTop.render();
        
        const btn = document.getElementById('back-to-top-btn');
        if (!btn) return;

        const scrollFn = () => {
            if (window.scrollY > 300) {
                btn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            } else {
                btn.classList.add('opacity-0', 'invisible', 'translate-y-4');
            }
        };

        window.removeEventListener('scroll', scrollFn); // Safety remove old if any (though unlikely for this singleton)
        window.addEventListener('scroll', scrollFn);
    }
};
