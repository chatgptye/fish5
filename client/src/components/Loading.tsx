import { APP_LOGO, APP_TITLE } from "@/const";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-center">
        <img 
          src={APP_LOGO} 
          alt={APP_TITLE} 
          className="w-32 h-32 object-contain mx-auto mb-4 opacity-90"
        />
        <div className="w-16 h-1 bg-[#003080] mx-auto rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
