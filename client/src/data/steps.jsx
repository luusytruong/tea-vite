import { Leaf, Sprout, Package, CheckCircle2 } from "lucide-react";

export const steps = [
  {
    number: 1,
    title: "Chọn lọc nguyên liệu",
    description:
      "Tuyển chọn những búp trà non tơ, tươi ngon từ những vườn trà chất lượng cao, đạt tiêu chuẩn VietGAP",
    icon: <Leaf className="w-8 h-8 sm:w-10 sm:h-10" />,
  },
  {
    number: 2,
    title: "Sơ chế",
    description:
      "Làm héo, vò trà theo phương pháp truyền thống để tạo hương vị đặc trưng, đảm bảo vệ sinh an toàn thực phẩm",
    icon: <Sprout className="w-8 h-8 sm:w-10 sm:h-10" />,
  },
  {
    number: 3,
    title: "Chế biến",
    description:
      "Sao trà ở nhiệt độ phù hợp để giữ được hương vị và dưỡng chất tốt nhất, tuân thủ quy trình VietGAP",
    icon: <Package className="w-8 h-8 sm:w-10 sm:h-10" />,
  },
  {
    number: 4,
    title: "Kiểm tra chất lượng",
    description:
      "Đánh giá kỹ lưỡng về hương vị, màu sắc và độ an toàn của sản phẩm, đạt tiêu chuẩn VietGAP",
    icon: <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />,
  },
];
