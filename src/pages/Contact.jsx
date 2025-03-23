const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Liên hệ với chúng tôi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Thông tin liên hệ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-800">Địa chỉ</h3>
              <p className="text-gray-600">123 Đường Trà, Thành phố Thái Nguyên</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Điện thoại</h3>
              <p className="text-gray-600">0123.456.789</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Email</h3>
              <p className="text-gray-600">info@trathainguyen.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Giờ làm việc</h3>
              <p className="text-gray-600">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Gửi tin nhắn</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Họ và tên</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Tin nhắn</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                placeholder="Nhập tin nhắn"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 