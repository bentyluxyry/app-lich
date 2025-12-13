
/**
 * Tạo HTML cho Logo
 * @param {boolean} isDarkBg - Nếu nền tối (Mobile Header/Footer) thì chữ màu trắng. Nếu nền sáng thì chữ màu xanh.
 * @returns {string} HTML string
 */
export const getLogoHTML = (isDarkBg = false) => {
    // Màu chữ cho phần "LịchViệt"
    const textClass = isDarkBg ? 'text-white' : 'text-green-700 dark:text-white';
    
    return `
    <div class="flex items-center gap-2 cursor-pointer select-none group">
        <!-- Icon hình vuông bo góc, nền xanh lá -->
        <div class="w-8 h-8 bg-[#16a34a] rounded-lg text-white flex items-center justify-center font-bold text-xl shadow-sm font-sans transition-transform group-hover:scale-105">
            L
        </div>
        
        <!-- Text Logo -->
        <span class="font-sans font-bold text-xl tracking-tight ${textClass}">
            LịchViệt<span class="text-[#f97316]">.AI</span>
        </span>
    </div>
    `;
};

/**
 * Render Logo vào các vị trí trong DOM
 */
export const renderLogos = () => {
    // 1. Mobile Header (Nền tối)
    const mobileLogo = document.getElementById('logo-mobile');
    if (mobileLogo) mobileLogo.innerHTML = getLogoHTML(true);

    // 2. Desktop Header (Nền trắng/tối tùy theme)
    const desktopLogo = document.getElementById('logo-desktop');
    if (desktopLogo) desktopLogo.innerHTML = getLogoHTML(false);

    // 3. Footer (Nền tối)
    const footerLogo = document.getElementById('logo-footer');
    if (footerLogo) footerLogo.innerHTML = getLogoHTML(true);
};
