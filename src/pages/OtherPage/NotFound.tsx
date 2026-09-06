export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50"
      dir="rtl"
    >
      <div className="text-center">
        <h1 className="text-7xl font-bold text-gray-800">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          صفحه پیدا نشد
        </h2>

        <p className="mt-2 text-gray-500">
          صفحه‌ای که دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>

        <a
          href="/"
          className="
            mt-6
            inline-block
            rounded-lg
            bg-black
            px-6
            py-3
            text-white
            hover:bg-gray-800
          "
        >
          بازگشت به داشبورد
        </a>
      </div>
    </div>
  );
}
