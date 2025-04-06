import React from "react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";

const DeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName, 
  isLoading = false 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Xác nhận xóa"
      maxWidth="max-w-lg"
    >
      <div className="text-center py-6">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Trash2 size={28} className="text-red-600" />
        </div>
        <h3 className="text-lg font-medium mb-2">Bạn có chắc chắn muốn xóa?</h3>
        <p className="text-gray-500 mb-6">
          {itemName ? (
            <>Sản phẩm "{itemName}" sẽ bị xóa vĩnh viễn và không thể khôi phục.</>
          ) : (
            <>Mục này sẽ bị xóa vĩnh viễn và không thể khôi phục.</>
          )}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
            disabled={isLoading}
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 min-w-[100px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
            ) : (
              "Xóa"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal; 