import { FormEvent, useState } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

import { createPage } from "../../services/pages.services";

interface AddPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddPageModal({
  isOpen,
  onClose,
  onCreated,
}: AddPageModalProps) {
  const [title, setTitle] = useState("");
  const [typeOfPage, setTypeOfPage] = useState("about");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("typeOfPage", typeOfPage);
      formData.append("slug", slug);
      formData.append("content", content);

      formData.append("seoTitle", seoTitle);
      formData.append("seoDescription", seoDescription);

      if (image) {
        formData.append("image", image);
      }

      await createPage(formData);

      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در ایجاد صفحه");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="p-6" dir="rtl">
        <h2 className="mb-6 text-xl font-semibold">افزودن صفحه</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Label>عنوان</Label>

              <Input
                value={title}

                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label>نوع صفحه</Label>

              <select
                value={typeOfPage}

                onChange={(e) => setTypeOfPage(e.target.value)}

                className="w-full rounded-lg border p-2"
              >
                <option value="about">درباره ما</option>

                <option value="contact">تماس با ما</option>
              </select>
            </div>

            <div>
              <Label>Slug</Label>

              <Input
                value={slug}

                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div>
              <Label>محتوا</Label>

              <textarea
                rows={6}

                value={content}

                onChange={(e) => setContent(e.target.value)}

                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <Label>تصویر صفحه</Label>

              <input
                type="file"

                accept="image/*"

                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}

                className="w-full rounded-lg border p-2"
              />
            </div>

            <div>
              <Label>SEO Title</Label>

              <Input
                value={seoTitle}

                onChange={(e) => setSeoTitle(e.target.value)}
              />
            </div>

            <div>
              <Label>SEO Description</Label>

              <textarea
                rows={3}

                value={seoDescription}

                onChange={(e) => setSeoDescription(e.target.value)}

                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          {error && <div className="mt-4 text-red-500">{error}</div>}

          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              انصراف
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
