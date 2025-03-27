import React, { memo, useEffect } from "react";

const Loading = memo(({ text = "Đợi một chút..." }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col gap-4 justify-center items-center z-50 backdrop-blur-[2px]">
      <div className="flex flex-col gap-2 bg-white px-6 py-4 rounded-lg shadow-md border border-gray-100">
        {/* Chữ loading với hiệu ứng fade */}
        <div className="text-green-700 text-center animate-[fade_2s_ease-in-out_infinite]">
          {text}
        </div>
        {/* Line chạy qua lại */}
        <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-16 h-full bg-green-500 animate-[loading_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
});

// Thêm styles vào file tailwind.css hoặc index.css
const styles = `
  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(200%);
    }
  }

  @keyframes fade {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`;

// Thêm styles vào document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

Loading.displayName = "Loading";

export default Loading;
