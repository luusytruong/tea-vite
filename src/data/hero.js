import bg1 from "~/assets/images/bg-1.jpg";
import bg2 from "~/assets/images/bg-2.jpg";
import bg3 from "~/assets/images/bg-3.jpg";

export const heroConfig = {
  items: [
    {
      id: 1,
      image: bg1,
      title: "Trà Thái Nguyên",
      description: "Tinh túy hương vị trà truyền thống, đậm đà bản sắc Việt.",
      features: [
        {
          icon: "Leaf",
          text: "100% Tự Nhiên",
          description: "Không sử dụng hóa chất",
        },
        {
          icon: "Award",
          text: "Chất Lượng Cao",
          description: "Được chọn lọc kỹ lưỡng",
        },
        {
          icon: "Heart",
          text: "Tốt Cho Sức Khỏe",
          description: "Nhiều dưỡng chất quý",
        },
      ],
    },
    {
      id: 2,
      image: bg2,
      title: "Trà Shan Tuyết Cổ Thụ",
      description:
        "Đắm mình trong hương vị độc đáo, tinh khiết từ những cây trà cổ thụ hàng trăm năm tuổi, chắt chiu tinh hoa đất trời.",
      features: [
        {
          icon: "Tree",
          text: "Cổ Thụ",
          description: "Hàng trăm năm tuổi",
        },
        {
          icon: "Mountain",
          text: "Vùng Cao",
          description: "Độ cao 1500m+",
        },
        {
          icon: "Star",
          text: "Đặc Sản",
          description: "Hiếm và quý giá",
        },
      ],
    },
    {
      id: 3,
      image: bg3,
      title: "Trà Oolong Sữa",
      description:
        "Hòa quyện giữa vị trà Oolong hảo hạng và hương sữa ngọt ngào, tạo nên trải nghiệm béo ngậy, thơm ngon khó cưỡng.",
      features: [
        {
          icon: "Coffee",
          text: "Hương Sữa",
          description: "Vị béo ngậy",
        },
        {
          icon: "Leaf",
          text: "Oolong",
          description: "Lên men một phần",
        },
        {
          icon: "Heart",
          text: "Yêu Thích",
          description: "Bán chạy nhất",
        },
      ],
    },
  ],
  stats: [
    {
      number: "10+",
      label: "Năm kinh nghiệm",
    },
    {
      number: "100+",
      label: "Khách hàng hài lòng",
    },
    {
      number: "20+",
      label: "Sản phẩm đa dạng",
    },
  ],
};
