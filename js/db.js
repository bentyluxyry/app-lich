// Import các bài viết từ thư mục posts
import p1 from './posts/01-cay-phong-thuy.js';
import p2 from './posts/02-van-khan.js';
import p3 from './posts/03-tu-vi-ty.js';
import p4 from './posts/04-huong-xuat-hanh.js';
import p5 from './posts/05-mam-ngu-qua.js';
import p6 from './posts/06-dong-tho.js';
import p7 from './posts/07-tet-2026.js';
import p8 from './posts/08-mau-son.js';
import p9 from './posts/09-than-so-hoc.js';
import p10 from './posts/10-bieu-do-sinh.js';
import p11 from './posts/11-tet-2026.js';
import p12 from './posts/12-lich-nghi-le-2025.js'; // Đã sửa: Thêm dấu ' và ;

// Hàm tạo Slug chuẩn SEO
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng -
    .replace(/[^\w\-]+/g, "") // Bỏ ký tự đặc biệt
    .replace(/\-\-+/g, "-") // Bỏ dấu gạch ngang kép
    .replace(/^-+/, "") 
    .replace(/-+$/, "");
};

// Tổng hợp bài viết thủ công để đảm bảo chạy ổn định trên mọi trình duyệt
// Sắp xếp: Bài mới nhất (p12) đứng đầu
const rawPosts = [
    p12,
    p11, 
    p10, 
    p9, 
    p8, 
    p7, 
    p6, 
    p5, 
    p4, 
    p3, 
    p2, 
    p1
];

// Export với Slug được tự động thêm vào
export const posts = rawPosts.map(post => ({
    ...post,
    slug: slugify(post.title)
}));