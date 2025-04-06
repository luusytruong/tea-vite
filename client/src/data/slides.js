import bg1 from "~/assets/images/bg-1.webp";
import bg2 from "~/assets/images/bg-2.webp";
import bg3 from "~/assets/images/bg-3.webp";

export const slides = [
  {
    id: 1,
    title: "Tinh Hoa Trà Việt",
    subtitle: "Văn hoá 4000 năm lịch sử",
    description:
      "Hành trình gìn giữ và phát triển những búp trà xanh nguyên chất từ đồi chè Tân Cương, Thái Nguyên",
    image: bg1,
    cta: {
      main: "Khám phá ngay",
      sub: "Xem câu chuyện",
    },
    theme: "green",
    stats: [
      { label: "Năm kinh nghiệm", value: "10+" },
      { label: "Khách hàng tin dùng", value: "100+" },
      { label: "Sản phẩm", value: "20+" },
    ],
  },
  {
    id: 2,
    title: "Trà Shan Tuyết",
    subtitle: "Tinh túy từ núi rừng",
    description:
      "Được hái từ những cây trà cổ thụ trên độ cao 1500m, nơi mây trời Tây Bắc giao hòa với đất trời",
    image: bg2,
    cta: {
      main: "Mua ngay",
      sub: "Tìm hiểu thêm",
    },
    theme: "earth",
    features: ["100% Organic", "Thủ công", "Hữu cơ"],
  },
  {
    id: 3,
    title: "Nghệ Thuật Thưởng Trà",
    subtitle: "Văn hóa trà đạo",
    description:
      "Khám phá bộ sưu tập ấm trà, chén trà cao cấp được chế tác thủ công bởi các nghệ nhân làng nghề Bát Tràng",
    image: bg3,
    cta: {
      main: "Xem bộ sưu tập",
      sub: "Tư vấn miễn phí",
    },
    theme: "clay",
    collection: {
      title: "Bộ sưu tập mới 2024",
      items: ["Ấm tử sa", "Chén sứ", "Khay trà"],
    },
  },
];
