
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
import p12 from './posts/12-lich-nghi-le-2025.js';
import p13 from './posts/13-van-khan-co-truyen.js';
import p14 from './posts/14-van-khan-tao-quan.js';
import p15 from './posts/15-van-khan-than-tai.js';
import p16 from './posts/16-van-khan-dong-tho.js';
import p17 from './posts/17-van-khan-nhap-trach.js';
import p18 from './posts/18-van-khan-tat-nien.js';
// New posts (Numerology)
import p19 from './posts/19-y-nghia-cac-mui-ten.js';
import p20 from './posts/20-than-so-hoc-tinh-yeu.js';
import p21 from './posts/21-dat-ten-con-2025.js';
import p22 from './posts/22-nam-ca-nhan-2025.js';
import p23 from './posts/23-so-su-menh.js';
import p24 from './posts/24-so-chu-dao-1.js';
import p25 from './posts/25-nam-the-gioi-2026.js';

// Import danh sách tử vi 12 con giáp (Được tạo tự động)
import { zodiacPosts } from './data/zodiacPosts.js';

// Hàm tạo Slug chuẩn SEO
export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/[đĐ]/g, 'd') // Quan trọng: Đổi đ -> d
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu thanh
    .replace(/[^a-z0-9\s-]/g, "") // Bỏ ký tự đặc biệt, giữ lại chữ, số, khoảng trắng, gạch ngang
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng -
    .replace(/-+/g, "-") // Xóa gạch ngang kép
    .replace(/^-+/, "") // Xóa gạch ngang đầu
    .replace(/-+$/, ""); // Xóa gạch ngang cuối
};

/* --- PHÂN LOẠI BÀI VIẾT THỦ CÔNG --- */

// 1. Danh mục: Tử Vi 12 Con Giáp (Bài viết lẻ ngoài 12 con giáp tự động)
const postsTuVi = [
    p3 // Dự báo tuổi Tỵ chi tiết
];

// 2. Danh mục: Phong Thủy & Đời Sống
const postsPhongThuy = [
    p8, // Màu sơn
    p6, // Động thổ
    p5, // Mâm ngũ quả
    p4, // Hướng xuất hành
    p1  // Cây phong thủy
];

// 3. Danh mục: Thần Số Học
const postsThanSoHoc = [
    p25, // Năm thế giới 2026
    p24, // Số chủ đạo 1
    p23, // Số sứ mệnh
    p22, // Năm cá nhân
    p21, // Đặt tên con
    p20, // Tình yêu
    p19, // Mũi tên
    p10, // Biểu đồ sinh
    p9   // Tổng quan 2025
];

// 4. Danh mục: Văn Khấn Cổ Truyền
const postsVanKhan = [
    p18, // Tất niên
    p17, // Nhập trạch
    p16, // Động thổ (Văn khấn)
    p15, // Thần tài
    p14, // Táo quân
    p13, // Văn khấn cổ truyền
    p2   // Mùng 1 hôm rằm
];

// 5. Danh mục: Lễ Tết & Sự Kiện
const postsLeTet = [
    p12, // Lịch nghỉ lễ
    p11, // Tết 2026 (Bài 2)
    p7   // Tết 2026 (Bài 1)
];

/* --- TỔNG HỢP --- */

// Gộp tất cả bài viết thủ công lại
const manualPosts = [
    ...postsTuVi,
    ...postsPhongThuy,
    ...postsThanSoHoc,
    ...postsVanKhan,
    ...postsLeTet
];

// Gộp bài viết thủ công và bài viết tử vi tự động (zodiacPosts)
const rawPosts = [
    ...zodiacPosts, 
    ...manualPosts
];

// Export với Slug được tự động thêm vào
export const posts = rawPosts.map(post => ({
    ...post,
    slug: slugify(post.title)
}));
