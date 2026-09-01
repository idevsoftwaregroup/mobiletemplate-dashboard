import { FormEvent, useState } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onCreated,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("active");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // API را در قدم بعد وصل می‌کنیم
      console.log({
        name,
        slug,
        description,
        price,
        category,
        stock,
        imageUrl,
        status,
      });

      onCreated();
      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "خطا در ایجاد محصول"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4"
    >
      <div className="p-6" dir="rtl">
        <h2 className="mb-6 text-xl text-start font-semibold text-gray-800 dark:text-white">
          افزودن محصول
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <Label>نام محصول</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام محصول"
              />
            </div>

            <div>
              <Label>Slug</Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="product-slug"
              />
            </div>

            <div className="md:col-span-2">
              <Label>توضیحات</Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیحات محصول"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-gray-700"
                rows={4}
              />
            </div>

            <div>
              <Label>قیمت</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label>دسته‌بندی</Label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="مثلاً موبایل"
              />
            </div>

            <div>
              <Label>موجودی</Label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label>وضعیت</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700"
              >
                <option value="active">فعال</option>
                <option value="inactive">غیرفعال</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Label>آدرس تصویر</Label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-lg bg-error-50 p-3 text-sm text-error-600">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              انصراف
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "در حال ذخیره..." : "افزودن محصول"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
