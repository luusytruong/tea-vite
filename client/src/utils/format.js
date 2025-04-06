export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};

export const formatDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day} tháng ${month} năm ${year}`;
};

export function generateInsertSQL(tableName, data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Dữ liệu đầu vào không hợp lệ");
  }

  const keys = Object.keys(data[0]);
  const columns = keys.join(", ");

  const values = data
    .map((item) => {
      const row = keys
        .map((key) => {
          let value = item[key];

          if (typeof value === "string") {
            return `'${value.replace(/'/g, "''")}'`; // Escape dấu nháy đơn
          }
          if (Array.isArray(value)) {
            return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
          }
          return value ?? "NULL"; // Xử lý giá trị null hoặc undefined
        })
        .join(", ");

      return `(${row})`;
    })
    .join(",\n");

  return `INSERT INTO ${tableName} (${columns}) VALUES\n${values};`;
}
