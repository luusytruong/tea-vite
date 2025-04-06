import tea1 from "~/assets/images/products/tea-1.png";
import tea2 from "~/assets/images/products/tea-2.png";
import tea3 from "~/assets/images/products/tea-3.png";
import tea4 from "~/assets/images/products/tea-4.png";
import tea5 from "~/assets/images/products/tea-5.png";
import tea6 from "~/assets/images/products/tea-6.png";

// Danh sách danh mục sản phẩm
export const categories = [
  {
    id: 1,
    name: "Trà Shan Tuyết",
    description:
      "Trà Shan Tuyết được hái từ những cây trà cổ thụ hàng trăm năm tuổi",
    slug: "tra-shan-tuyet",
  },
  {
    id: 2,
    name: "Trà Oolong",
    description:
      "Trà Oolong với hương vị đặc trưng, được chế biến theo phương pháp truyền thống",
    slug: "tra-oolong",
  },
  {
    id: 3,
    name: "Trà Xanh",
    description:
      "Trà xanh Thái Nguyên thượng hạng, được hái từ những búp trà non tơ",
    slug: "tra-xanh",
  },
  {
    id: 4,
    name: "Trà Hồng",
    description: "Trà hồng với hương vị ngọt ngào, thơm ngon",
    slug: "tra-hong",
  },
];

// Danh sách sản phẩm
export const products = [
  {
    id: 1,
    name: "Trà Shan Tuyết Cổ Thụ 2",
    slug: "tra-shan-tuyet-co-thu",
    description:
      "Trà Shan Tuyết được hái từ những cây trà cổ thụ hàng trăm năm tuổi trên đỉnh núi cao, mang hương vị đặc trưng của vùng đất Thái Nguyên.",
    short_description:
      "Trà Shan Tuyết được hái từ những cây trà cổ thụ hàng trăm năm tuổi",
    price: 350000,
    original_price: 450000,
    image: "sp1.webp",
    images: ["sp1.webp", "sp2.webp", "sp3.webp", "sp4.webp"],
    discount: 22,
    category_id: 1,
    stock: 50,
    weight: "100g",
    origin: "Thái Nguyên",
    processing_method: "Thủ công",
    is_featured: true,
    is_new: true,
    details:
      "*Thành phần\nBúp trà Shan Tuyết\nNước tinh khiết\n---*Công dụng\nChứa nhiều chất chống oxy hóa\nTăng cường sức đề kháng\nGiúp tỉnh táo, tập trung\nHỗ trợ tiêu hóa\n---*Cách sử dụng\nPha 5g trà với 200ml nước sôi 90-95°C\nỦ trong 3-5 phút\nCó thể pha được 3-4 lần",
    meta_keywords:
      "trà shan tuyết, trà cổ thụ, trà thái nguyên, trà đặc sản, trà cao cấp",
    created_at: "2024-03-20",
    updated_at: "2024-03-20",
  },
  {
    id: 2,
    name: "Trà Oolong Sữa",
    slug: "tra-oolong-sua",
    description:
      "Trà Oolong sữa với hương vị béo ngậy, thơm ngon đặc trưng. Sản phẩm được chế biến theo công thức độc quyền của chúng tôi.",
    short_description:
      "Trà Oolong sữa với hương vị béo ngậy, thơm ngon đặc trưng",
    price: 280000,
    original_price: 350000,
    image: "sp2.webp",
    images: ["sp3.webp", "sp1.webp", "sp4.webp", "sp5.webp"],
    discount: 20,
    category_id: 2,
    stock: 75,
    weight: "100g",
    origin: "Đài Loan",
    processing_method: "Công nghệ hiện đại",
    is_featured: true,
    is_new: false,
    details:
      "*Thành phần\nTrà Oolong\nHương sữa tự nhiên\n---*Công dụng\nGiảm cân hiệu quả\nTăng cường trao đổi chất\nCải thiện làn da\nHỗ trợ tiêu hóa\n---*Cách sử dụng\nPha 5g trà với 200ml nước sôi 85-90°C\nỦ trong 2-3 phút\nCó thể pha được 2-3 lần",
    meta_keywords:
      "trà oolong sữa, trà sữa đài loan, trà oolong, trà sữa, trà thơm",
    created_at: "2024-03-15",
    updated_at: "2024-03-15",
  },
  {
    id: 3,
    name: "Trà Xanh Thái Nguyên",
    slug: "tra-xanh-thai-nguyen",
    description:
      "Trà xanh Thái Nguyên thượng hạng, được hái từ những búp trà non tơ, mang hương vị tinh khiết, thanh mát.",
    short_description:
      "Trà xanh Thái Nguyên thượng hạng, được hái từ những búp trà non tơ",
    price: 250000,
    original_price: 300000,
    image: "sp4.webp",
    images: ["sp7.webp", "sp5.webp", "sp1.webp", "sp8.webp"],
    discount: 17,
    category_id: 3,
    stock: 100,
    weight: "100g",
    origin: "Thái Nguyên",
    processing_method: "Truyền thống",
    is_featured: false,
    is_new: true,
    details:
      "*Thành phần\nBúp trà xanh\nNước tinh khiết\n---*Công dụng\nChống oxy hóa\nTăng cường miễn dịch\nGiảm căng thẳng\nHỗ trợ tim mạch\n---*Cách sử dụng\nPha 5g trà với 200ml nước sôi 80-85°C\nỦ trong 2-3 phút\nCó thể pha được 2-3 lần",
    meta_keywords:
      "trà xanh, trà thái nguyên, trà búp, trà ngon, trà truyền thống",
    created_at: "2024-03-10",
    updated_at: "2024-03-10",
  },
  {
    id: 4,
    name: "Trà Hồng Đài Loan",
    slug: "tra-hong-dai-loan",
    description:
      "Trà hồng Đài Loan với hương vị ngọt ngào, thơm ngon. Sản phẩm được nhập khẩu trực tiếp từ Đài Loan.",
    short_description: "Trà hồng Đài Loan với hương vị ngọt ngào, thơm ngon",
    price: 320000,
    original_price: 400000,
    image: "sp8.webp",
    images: ["sp2.webp", "sp5.webp", "sp7.webp", "sp1.webp"],
    discount: 20,
    category_id: 4,
    stock: 60,
    weight: "100g",
    origin: "Đài Loan",
    processing_method: "Công nghệ hiện đại",
    is_featured: true,
    is_new: false,
    details:
      "*Thành phần\nTrà hồng\nHương hoa tự nhiên\n---*Công dụng\nTăng cường sức khỏe\nCải thiện tâm trạng\nHỗ trợ giấc ngủ\nTăng cường miễn dịch\n---*Cách sử dụng\nPha 5g trà với 200ml nước sôi 90-95°C\nỦ trong 3-5 phút\nCó thể pha được 3-4 lần",
    meta_keywords: "trà hồng, trà đài loan, trà nhập khẩu, trà hoa, trà thơm",
    created_at: "2024-03-05",
    updated_at: "2024-03-05",
  },
  {
    id: 5,
    name: "Bạch Trà",
    slug: "bach-tra",
    description:
      "Bạch trà là loại trà quý hiếm được thu hái từ những búp trà non nhất, phơi sương và chế biến theo phương pháp truyền thống. Sở hữu hương thơm tinh tế, vị ngọt thanh khiết cùng màu nước vàng nhạt đặc trưng.",
    short_description:
      "Bạch trà trà quý hiếm với hương thơm tinh tế và vị ngọt thanh khiết",
    price: 450000,
    original_price: 500000,
    image: "sp5.webp",
    images: ["sp5.webp", "sp1.webp", "sp6.webp", "sp7.webp"],
    discount: 10,
    category_id: 4,
    stock: 30,
    weight: "50g",
    origin: "Phúc Kiến, Trung Quốc",
    processing_method: "Phơi sương tự nhiên",
    is_featured: true,
    is_new: true,
    details:
      "*Thành phần\nBúp trà trắng nguyên chất\n---*Công dụng\nChống oxy hóa mạnh mẽ\nTăng cường hệ miễn dịch\nLàm đẹp da\nGiảm căng thẳng\nHỗ trợ giảm cân\n---*Cách sử dụng\nPha 3g trà với 150ml nước sôi 70-75°C\nỦ trong 1-2 phút\nCó thể pha được 4-5 lần",
    meta_keywords:
      "bạch trà, trà trắng, trà quý hiếm, trà phúc kiến, trà cao cấp",
    created_at: "2024-03-15",
    updated_at: "2024-03-15",
  },
];
