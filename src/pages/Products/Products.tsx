import { useEffect, useState } from "react";
import {
  getProducts,
  Product,
  deleteProduct,
} from "../../services/products.services.ts";
import AddProductModal from "../../components/products/AddProductModal.tsx";
import EditProductModal from "../../components/products/EditProductModal.tsx";

const API_URL = import.meta.env.VITE_API_URL;
const SERVER_URL = API_URL.replace("/api", "");
const BACKEND_URL = "http://localhost:3000";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      console.log("Products : ", data);

      setProducts(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load products",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("آیا از حذف این محصول مطمئن هستید؟");

    if (!confirm) return;

    try {
      await deleteProduct(id);

      await loadProducts();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed");
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            محصولات
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            مدیریت همه محصولات شما به سادگی از این پنل قابل پیگیری و انجام است.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddProductOpen(true)}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          افزودن محصول
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <table className="w-full" dir="rtl">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="px-6 py-4 text-right text-sm font-medium">
                محصول
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium">
                دسته بندی
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium">قیمت</th>

              <th className="px-6 py-4 text-right text-sm font-medium">
                موجودی
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium">
                وضعیت
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              console.log("IMAGE:", product.name, product.imageUrl);

              const image = product.imageUrl
                ? product.imageUrl.startsWith("http")
                  ? product.imageUrl
                  : `${SERVER_URL}${product.imageUrl}`
                : null;

              return (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 last:border-0 dark:border-gray-800"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {image ? (
                        <img
                          src={product.imageUrl || ""}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10">
                          P
                        </div>
                      )}

                      <div>
                        <div className="font-medium text-gray-800 dark:text-white/90">
                          {product.name}
                        </div>

                        <div className="text-xs text-gray-500">
                          {product.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category || "-"}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    ${product.price}
                  </td>

                  <td className="px-6 py-4 text-sm">{product.stock}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                        rounded-full px-3 py-1 text-xs font-medium
                        ${
                          product.status === "active"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }
                      `}
                    >
                      {product.status === "active" ? "فعال" : "غیرفعال"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);

                          setIsEditProductOpen(true);
                        }}

                        className="rounded-lg bg-blue-50 px-3 py-1 text-xs text-blue-600"
                      >
                        ویرایش
                      </button>

                      <button
                        className="
                  rounded-lg
                  bg-red-50
                  px-3
                  py-1
                  text-xs
                  text-red-600
                  "

                        onClick={() => {
                          handleDelete(product.id);
                        }}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onCreated={() => {
          loadProducts();
        }}
      />
      <EditProductModal
        isOpen={isEditProductOpen}

        product={selectedProduct}

        onClose={() => {
          setIsEditProductOpen(false);
          setSelectedProduct(null);
        }}

        onUpdated={() => {
          loadProducts();

          setSelectedProduct(null);
        }}
      />
    </div>
  );
}
