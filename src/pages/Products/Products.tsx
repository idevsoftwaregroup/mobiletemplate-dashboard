import { useEffect, useState } from "react";
import { getProducts, Product } from "../../services/products.services.ts";
import AddProductModal from "../../components/products/AddProductModal.tsx";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
    <div dir="RTL">
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
        <table className="w-full " dir="RTL">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="px-6 py-4 text-right text-sm font-medium">
                محصول
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium">
                دسته بندی
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium">
                فی/قیمت
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium">
                تعداد موجود در انبار
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium">
                وضعیت
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 last:border-0 dark:border-gray-800"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
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

                <td className="px-6 py-4 text-sm">
                  {product.stock}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onCreated={() => {}}
      />
    </div>
  );
}
