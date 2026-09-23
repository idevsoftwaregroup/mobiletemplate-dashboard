export default function DashboardHero() {
  return (
    <div
      className="
        mb-0
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        dark:border-gray-800
        dark:bg-white/[0.03]

        md:p-8
      "
      dir="rtl"
    >
      <div
        className="
          flex
          flex-col
          gap-5

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-gray-800
              dark:text-white/90

              md:text-3xl
            "
          >
            خوش آمدید 👋
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-7
              text-gray-500
              dark:text-gray-400

              md:text-base
            "
          >
            از این بخش می‌توانید وضعیت کسب‌وکار، سفارش‌ها، پرداخت‌ها، محصولات و
            فعالیت‌های کاربران را مدیریت و بررسی کنید.
          </p>
        </div>

        <div
          className="
            rounded-xl
            bg-gray-100
            px-5
            py-4
            dark:bg-gray-800
          "
        >
          <p
            className="
              text-xs
              text-gray-500
              dark:text-gray-400
            "
          >
            وضعیت سیستم
          </p>

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-3
                w-3
                rounded-full
                bg-green-500
              "
            />

            <span
              className="
                text-sm
                font-medium
                text-gray-800
                dark:text-white
              "
            >
              فعال و آماده سرویس‌دهی
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
