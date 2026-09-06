import { FormEvent, useEffect, useState } from "react";

import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

import { updateProduct, Product } from "../../services/products.services";

interface EditProductModalProps {
  product: Product | null;

  isOpen: boolean;

  onClose: () => void;

  onUpdated: () => void;
}

export default function EditProductModal({
  product,

  isOpen,

  onClose,

  onUpdated,
}: EditProductModalProps) {
  const [name, setName] = useState("");

  const [slug, setSlug] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [stock, setStock] = useState("");

  const [status, setStatus] = useState("active");

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);

      setSlug(product.slug);

      setDescription(product.description || "");

      setPrice(String(product.price));

      setCategory(product.category || "");

      setStock(String(product.stock));

      setStatus(product.status);

      setImage(null);
    }
  }, [product]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) return;

    try {
      setLoading(true);

      setError("");

      const formData = new FormData();

      formData.append("name", name);

      formData.append("slug", slug);

      formData.append("description", description);

      formData.append("price", price);

      formData.append("category", category);

      formData.append("stock", stock);

      formData.append("status", status);

      if (image) {
        formData.append("image", image);
      }

      await updateProduct(product.id, formData);

      onUpdated();

      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "خطا در ویرایش محصول");
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
        <h2 className="mb-6 text-xl font-semibold">ویرایش محصول</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label>نام محصول</Label>

              <Input
                value={name}

                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label>Slug</Label>

              <Input
                value={slug}

                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Label>توضیحات</Label>

              <textarea
                value={description}

                onChange={(e) => setDescription(e.target.value)}

                rows={4}

                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            <div>
              <Label>قیمت</Label>

              <Input
                type="number"

                value={price}

                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <Label>دسته بندی</Label>

              <Input
                value={category}

                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <Label>موجودی</Label>

              <Input
                type="number"

                value={stock}

                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <Label>وضعیت</Label>

              <select
                value={status}

                onChange={(e) => setStatus(e.target.value)}

                className="h-11 w-full rounded-lg border px-4"
              >
                <option value="active">فعال</option>

                <option value="inactive">غیرفعال</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Label>تصویر جدید</Label>

              <input
                type="file"

                accept="image/*"

                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          {error && <div className="mt-4 text-red-500">{error}</div>}

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
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
