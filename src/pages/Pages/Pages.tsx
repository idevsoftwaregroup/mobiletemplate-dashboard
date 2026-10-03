import { useEffect, useState } from "react";

import {
  getPages,
  createPage,
  updatePage,
  deletePage,
  type Page,
} from "../../services/pages.services";

import AddPageModal from "../../components/pages/AddPageModal";

interface EditPageForm {
  title: string;
  typeOfPage: string;
  slug: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  status: string;
}

export default function Pages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddPageOpen, setIsAddPageOpen] = useState(false);

  const [isEditPageOpen, setIsEditPageOpen] = useState(false);

  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const [editForm, setEditForm] = useState<EditPageForm>({
    title: "",
    typeOfPage: "",
    slug: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
    status: "active",
  });

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadPages = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPages();

      console.log("PAGES:", data);

      setPages(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to load pages.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const openEditModal = (page: Page) => {
    setSelectedPage(page);

    setEditForm({
      title: page.title,
      typeOfPage: page.typeOfPage,
      slug: page.slug,
      content: page.content,
      seoTitle: page.seoTitle ?? "",
      seoDescription: page.seoDescription ?? "",
      status: page.status,
    });

    setError("");
    setSuccess("");
    setIsEditPageOpen(true);
  };

  const closeEditModal = () => {
    if (saving) {
      return;
    }

    setIsEditPageOpen(false);
    setSelectedPage(null);
  };

  const handleEditChange = (field: keyof EditPageForm, value: string) => {
    setEditForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleUpdatePage = async () => {
    if (!selectedPage) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("title", editForm.title);
      formData.append("typeOfPage", editForm.typeOfPage);
      formData.append("slug", editForm.slug);
      formData.append("content", editForm.content);
      formData.append("seoTitle", editForm.seoTitle);
      formData.append("seoDescription", editForm.seoDescription);
      formData.append("status", editForm.status);

      await updatePage(selectedPage.id, formData);

      await loadPages();

      setIsEditPageOpen(false);
      setSelectedPage(null);

      setSuccess("صفحه با موفقیت بروزرسانی شد.");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "خطا در بروزرسانی صفحه.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePage = async (id: string) => {
    const confirmed = window.confirm("آیا از حذف این صفحه مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      await deletePage(id);

      setPages((current) => current.filter((page) => page.id !== id));

      setSuccess("صفحه با موفقیت حذف شد.");
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : "خطا در حذف صفحه.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div dir="rtl">در حال بارگذاری صفحات... </div>;
  }

  return (
    <div dir="rtl">
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">صفحات سایت</h1>

          <p className="text-sm text-gray-500">
            مدیریت صفحات درباره ما و تماس با ما
          </p>
        </div>

        <button
          type="button"
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

      {/* SUCCESS */}
      {success && (
        <div className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-right">عنوان</th>

              <th className="px-6 py-4 text-right">نوع صفحه</th>

              <th className="px-6 py-4 text-right">Slug</th>

              <th className="px-6 py-4 text-right">وضعیت</th>

              <th className="px-6 py-4 text-right">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  هیچ صفحه‌ای ثبت نشده است.
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id} className="border-b last:border-b-0">
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

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* EDIT */}
                      <button
                        type="button"
                        onClick={() => openEditModal(page)}
                        className="
                      rounded-lg
                      border
                      border-blue-600
                      px-3
                      py-1.5
                      text-sm
                      text-blue-600
                      hover:bg-blue-50
                    "
                      >
                        ویرایش
                      </button>

                      {/* DELETE */}
                      <button
                        type="button"
                        onClick={() => handleDeletePage(page.id)}
                        disabled={deletingId === page.id}
                        className="
                      rounded-lg
                      border
                      border-red-600
                      px-3
                      py-1.5
                      text-sm
                      text-red-600
                      hover:bg-red-50
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                      >
                        {deletingId === page.id ? "در حال حذف..." : "حذف"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD PAGE */}
      <AddPageModal
        isOpen={isAddPageOpen}
        onClose={() => setIsAddPageOpen(false)}
        onCreated={() => {
          setIsAddPageOpen(false);
          loadPages();
        }}
      />

      {/* EDIT PAGE MODAL */}
      {isEditPageOpen && selectedPage && (
        <div
          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/50
          p-4
        "
        >
          <div
            className="
            w-full
            max-w-3xl
            max-h-[90vh]
            overflow-y-auto
            rounded-xl
            bg-white
            p-6
            shadow-xl
          "
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">ویرایش صفحه</h2>

              <button
                type="button"
                onClick={closeEditModal}
                className="text-xl text-gray-500 hover:text-black"
                disabled={saving}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* TITLE */}
              <div>
                <label className="mb-1 block text-sm font-medium">عنوان</label>

                <input
                  type="text"
                  value={editForm.title}
                  onChange={(event) =>
                    handleEditChange("title", event.target.value)
                  }
                  className="
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  outline-none
                "
                />
              </div>

              {/* TYPE */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  نوع صفحه
                </label>

                <select
                  value={editForm.typeOfPage}
                  onChange={(event) =>
                    handleEditChange("typeOfPage", event.target.value)
                  }
                  className="
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  outline-none
                "
                >
                  <option value="about">درباره ما</option>

                  <option value="contact">تماس با ما</option>
                </select>
              </div>

              {/* SLUG */}
              <div>
                <label className="mb-1 block text-sm font-medium">Slug</label>

                <input
                  type="text"
                  value={editForm.slug}
                  onChange={(event) =>
                    handleEditChange("slug", event.target.value)
                  }
                  className="
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  outline-none
                "
                />
              </div>

              {/* CONTENT */}
              <div>
                <label className="mb-1 block text-sm font-medium">محتوا</label>

                <textarea
                  value={editForm.content}
                  onChange={(event) =>
                    handleEditChange("content", event.target.value)
                  }
                  rows={10}
                  className="
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  outline-none
                "
                />
              </div>

              {/* SEO TITLE */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  SEO Title
                </label>

                <input
                  type="text"
                  value={editForm.seoTitle}
                  onChange={(event) =>
                    handleEditChange("seoTitle", event.target.value)
                  }
                  className="
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  outline-none
                "
                />
              </div>

              {/* SEO DESCRIPTION */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  SEO Description
                </label>

                <textarea
                  value={editForm.seoDescription}
                  onChange={(event) =>
                    handleEditChange("seoDescription", event.target.value)
                  }
                  rows={4}
                  className="
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  outline-none
                "
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="mb-1 block text-sm font-medium">وضعیت</label>

                <select
                  value={editForm.status}
                  onChange={(event) =>
                    handleEditChange("status", event.target.value)
                  }
                  className="
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  outline-none
                "
                >
                  <option value="active">فعال</option>

                  <option value="inactive">غیرفعال</option>
                </select>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={saving}
                className="
                rounded-lg
                border
                px-4
                py-2
                text-gray-700
                hover:bg-gray-50
              "
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={handleUpdatePage}
                disabled={saving}
                className="
                rounded-lg
                bg-black
                px-4
                py-2
                text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              >
                {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
