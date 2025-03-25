export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};

export const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day} tháng ${month} năm ${year}`;
};
