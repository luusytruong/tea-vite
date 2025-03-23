import bg1 from '~/assets/images/bg-1.jpg';
import bg2 from '~/assets/images/bg-2.jpg';
import bg3 from '~/assets/images/bg-3.jpg';

export const heroConfig = {
  title: "Trà Thái Nguyên - Hương vị truyền thống",
  subtitle: "100% Tự nhiên",
  description: "Khám phá hương vị đặc trưng của trà Thái Nguyên, được chọn lọc từ những vùng trà nổi tiếng nhất.",
  cta: {
    text: "Khám phá ngay",
    link: "/products"
  },
  features: [
    {
      icon: "Leaf",
      text: "100% Tự nhiên",
      description: "Không chất bảo quản"
    },
    {
      icon: "Award",
      text: "Chất lượng cao",
      description: "Đạt chuẩn xuất khẩu"
    },
    {
      icon: "Heart",
      text: "Tốt cho sức khỏe",
      description: "Giàu chất chống oxy hóa"
    }
  ],
  backgrounds: [
    {
      id: 1,
      image: bg1,
      title: "Trà Thái Nguyên",
      description: "Hương vị truyền thống",
      features: [
        {
          icon: "Leaf",
          text: "100% Tự Nhiên",
          description: "Không sử dụng hóa chất"
        },
        {
          icon: "Award",
          text: "Chất Lượng Cao",
          description: "Được chọn lọc kỹ lưỡng"
        },
        {
          icon: "Heart",
          text: "Tốt Cho Sức Khỏe",
          description: "Nhiều dưỡng chất quý"
        }
      ]
    },
    {
      id: 2,
      image: bg2,
      title: "Trà Shan Tuyết Cổ Thụ",
      description: "Trải nghiệm hương vị đặc biệt từ những cây trà cổ thụ hàng trăm năm tuổi",
      features: [
        {
          icon: "Tree",
          text: "Cổ Thụ",
          description: "Hàng trăm năm tuổi"
        },
        {
          icon: "Mountain",
          text: "Vùng Cao",
          description: "Độ cao 1500m+"
        },
        {
          icon: "Star",
          text: "Đặc Sản",
          description: "Hiếm và quý giá"
        }
      ]
    },
    {
      id: 3,
      image: bg3,
      title: "Trà Oolong Sữa",
      description: "Thưởng thức hương vị béo ngậy, thơm ngon của trà Oolong sữa",
      features: [
        {
          icon: "Coffee",
          text: "Hương Sữa",
          description: "Vị béo ngậy"
        },
        {
          icon: "Leaf",
          text: "Oolong",
          description: "Lên men một phần"
        },
        {
          icon: "Heart",
          text: "Yêu Thích",
          description: "Bán chạy nhất"
        }
      ]
    }
  ],
  stats: [
    {
      number: "50+",
      label: "Năm kinh nghiệm"
    },
    {
      number: "1000+",
      label: "Khách hàng hài lòng"
    },
    {
      number: "20+",
      label: "Sản phẩm đa dạng"
    }
  ],
  style: {
    overlay: "rgba(0, 0, 0, 0.4)",
    pattern: "/images/pattern.png",
    primaryColor: "#166534", // green-800
    secondaryColor: "#22c55e", // green-500
    textColor: "#ffffff",
    accentColor: "#86efac" // green-300
  }
}; 