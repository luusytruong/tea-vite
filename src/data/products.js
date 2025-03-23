import tea1 from '~/assets/images/products/tea-1.png';
import tea2 from '~/assets/images/products/tea-2.png';
import tea3 from '~/assets/images/products/tea-3.png';
import tea4 from '~/assets/images/products/tea-4.png';

// Danh sách danh mục sản phẩm
export const categories = [
  {
    id: 'shan-tuyet',
    name: 'Trà Shan Tuyết',
    description: 'Trà Shan Tuyết được hái từ những cây trà cổ thụ hàng trăm năm tuổi',
    slug: 'tra-shan-tuyet'
  },
  {
    id: 'oolong',
    name: 'Trà Oolong',
    description: 'Trà Oolong với hương vị đặc trưng, được chế biến theo phương pháp truyền thống',
    slug: 'tra-oolong'
  },
  {
    id: 'xanh',
    name: 'Trà Xanh',
    description: 'Trà xanh Thái Nguyên thượng hạng, được hái từ những búp trà non tơ',
    slug: 'tra-xanh'
  },
  {
    id: 'hong',
    name: 'Trà Hồng',
    description: 'Trà hồng với hương vị ngọt ngào, thơm ngon',
    slug: 'tra-hong'
  }
];

// Danh sách sản phẩm
export const products = [
  {
    id: 1,
    name: "Trà Shan Tuyết Cổ Thụ",
    slug: "tra-shan-tuyet-co-thu",
    description: "Trà Shan Tuyết được hái từ những cây trà cổ thụ hàng trăm năm tuổi trên đỉnh núi cao, mang hương vị đặc trưng của vùng đất Thái Nguyên.",
    shortDescription: "Trà Shan Tuyết được hái từ những cây trà cổ thụ hàng trăm năm tuổi",
    price: 350000,
    originalPrice: 450000,
    image: tea1,
    images: [tea1, tea2, tea3, tea4],
    discount: 22,
    rating: 4.8,
    reviewCount: 128,
    categoryId: 'shan-tuyet',
    stock: 50,
    weight: '100g',
    origin: 'Thái Nguyên',
    harvestDate: '2024-03-15',
    processingMethod: 'Thủ công',
    storage: 'Bảo quản nơi khô ráo, thoáng mát',
    ingredients: ['Búp trà Shan Tuyết', 'Nước tinh khiết'],
    benefits: [
      'Chứa nhiều chất chống oxy hóa',
      'Tăng cường sức đề kháng',
      'Giúp tỉnh táo, tập trung',
      'Hỗ trợ tiêu hóa'
    ],
    usage: [
      'Pha 5g trà với 200ml nước sôi 90-95°C',
      'Ủ trong 3-5 phút',
      'Có thể pha được 3-4 lần'
    ],
    isFeatured: true,
    isNew: true,
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20'
  },
  {
    id: 2,
    name: "Trà Oolong Sữa",
    slug: "tra-oolong-sua",
    description: "Trà Oolong sữa với hương vị béo ngậy, thơm ngon đặc trưng. Sản phẩm được chế biến theo công thức độc quyền của chúng tôi.",
    shortDescription: "Trà Oolong sữa với hương vị béo ngậy, thơm ngon đặc trưng",
    price: 280000,
    originalPrice: 350000,
    image: tea2,
    images: [tea2, tea1, tea3, tea4],
    discount: 20,
    rating: 4.5,
    reviewCount: 96,
    categoryId: 'oolong',
    stock: 75,
    weight: '100g',
    origin: 'Đài Loan',
    harvestDate: '2024-03-10',
    processingMethod: 'Công nghệ hiện đại',
    storage: 'Bảo quản nơi khô ráo, thoáng mát',
    ingredients: ['Trà Oolong', 'Hương sữa tự nhiên'],
    benefits: [
      'Giảm cân hiệu quả',
      'Tăng cường trao đổi chất',
      'Cải thiện làn da',
      'Hỗ trợ tiêu hóa'
    ],
    usage: [
      'Pha 5g trà với 200ml nước sôi 85-90°C',
      'Ủ trong 2-3 phút',
      'Có thể pha được 2-3 lần'
    ],
    isFeatured: true,
    isNew: false,
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15'
  },
  {
    id: 3,
    name: "Trà Xanh Thái Nguyên",
    slug: "tra-xanh-thai-nguyen",
    description: "Trà xanh Thái Nguyên thượng hạng, được hái từ những búp trà non tơ, mang hương vị tinh khiết, thanh mát.",
    shortDescription: "Trà xanh Thái Nguyên thượng hạng, được hái từ những búp trà non tơ",
    price: 250000,
    image: tea3,
    images: [tea3, tea1, tea2, tea4],
    rating: 4.7,
    reviewCount: 156,
    categoryId: 'xanh',
    stock: 100,
    weight: '100g',
    origin: 'Thái Nguyên',
    harvestDate: '2024-03-05',
    processingMethod: 'Truyền thống',
    storage: 'Bảo quản nơi khô ráo, thoáng mát',
    ingredients: ['Búp trà xanh', 'Nước tinh khiết'],
    benefits: [
      'Chống oxy hóa',
      'Tăng cường miễn dịch',
      'Giảm căng thẳng',
      'Hỗ trợ tim mạch'
    ],
    usage: [
      'Pha 5g trà với 200ml nước sôi 80-85°C',
      'Ủ trong 2-3 phút',
      'Có thể pha được 2-3 lần'
    ],
    isFeatured: false,
    isNew: true,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10'
  },
  {
    id: 4,
    name: "Trà Hồng Đài Loan",
    slug: "tra-hong-dai-loan",
    description: "Trà hồng Đài Loan với hương vị ngọt ngào, thơm ngon. Sản phẩm được nhập khẩu trực tiếp từ Đài Loan.",
    shortDescription: "Trà hồng Đài Loan với hương vị ngọt ngào, thơm ngon",
    price: 320000,
    originalPrice: 400000,
    image: tea4,
    images: [tea4, tea1, tea2, tea3],
    discount: 20,
    rating: 4.6,
    reviewCount: 84,
    categoryId: 'hong',
    stock: 60,
    weight: '100g',
    origin: 'Đài Loan',
    harvestDate: '2024-03-01',
    processingMethod: 'Công nghệ hiện đại',
    storage: 'Bảo quản nơi khô ráo, thoáng mát',
    ingredients: ['Trà hồng', 'Hương hoa tự nhiên'],
    benefits: [
      'Tăng cường sức khỏe',
      'Cải thiện tâm trạng',
      'Hỗ trợ giấc ngủ',
      'Tăng cường miễn dịch'
    ],
    usage: [
      'Pha 5g trà với 200ml nước sôi 90-95°C',
      'Ủ trong 3-5 phút',
      'Có thể pha được 3-4 lần'
    ],
    isFeatured: true,
    isNew: false,
    createdAt: '2024-03-05',
    updatedAt: '2024-03-05'
  }
];

// Hàm lấy sản phẩm theo slug
export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug);
};

// Hàm lấy danh sách sản phẩm theo categoryId
export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.categoryId === categoryId);
};

// Hàm lấy danh sách sản phẩm nổi bật
export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

// Hàm lấy danh sách sản phẩm mới
export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};

// Hàm lấy danh sách sản phẩm liên quan
export const getRelatedProducts = (productId, limit = 3) => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.categoryId === product.categoryId)
    .slice(0, limit);
}; 