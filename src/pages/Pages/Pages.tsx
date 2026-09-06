import { useEffect, useState } from "react";

import { getPages, Page } from "../../services/pages.services";
import AddPageModal from "../../components/pages/AddPageModal";

export default function Pages() {
  const [pages, setPages] = useState<Page[]>([]);

  const [loading, setLoading] = useState(true);

  const [isAddPageOpen, setIsAddPageOpen] = useState(false);

  const loadPages = async () => {
    try {
      const data = await getPages();

      console.log("PAGES:", data);

      setPages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  if (loading) {
    return <div>Loading pages...</div>;
  }

  return (
    <div dir="rtl">
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">صفحات سایت</h1>

          <p className="text-sm text-gray-500">
            مدیریت صفحات درباره ما و تماس با ما
          </p>
        </div>

        <button
          onClick={() => setIsAddPageOpen(true)}
          className="
        bg-black
        text-white
        px-4
        py-2
        rounded-lg
        "
        >
          افزودن صفحه
        </button>
      </div>

      <div
        className="
overflow-hidden
rounded-xl
border
"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-right">عنوان</th>

              <th className="px-6 py-4 text-right">نوع صفحه</th>

              <th className="px-6 py-4 text-right">Slug</th>

              <th className="px-6 py-4 text-right">وضعیت</th>
            </tr>
          </thead>

          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b">
                <td className="px-6 py-4">{page.title}</td>

                <td className="px-6 py-4">
                  {page.typeOfPage === "about"
                    ? "درباره ما"
                    : page.typeOfPage === "contact"
                      ? "تماس با ما"
                      : page.typeOfPage}
                </td>

                <td className="px-6 py-4">{page.slug}</td>

                <td className="px-6 py-4">
                  {page.status === "active" ? "فعال" : "غیرفعال"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddPageModal
        isOpen={isAddPageOpen}

        onClose={() => setIsAddPageOpen(false)}

        onCreated={() => {
          loadPages();
        }}
      />
    </div>
  );
}
