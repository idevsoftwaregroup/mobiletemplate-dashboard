import { useEffect, useState } from "react";
import {
  getProducts,
  Product,
<<<<<<< HEAD
} from "../../services/product.service";

import AddProductModal from "../../components/products/AddProductModal";


export default function Products() {


  const [products,setProducts] = useState<Product[]>([]);
  const [open,setOpen] = useState(false);


  async function loadProducts(){

    try{

      const data = await getProducts();

      setProducts(data);

    }catch(error){

      console.log(error);

    }

  }



  useEffect(()=>{

=======
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
>>>>>>> dev-20260916-1beta0000001
    loadProducts();

<<<<<<< HEAD
  },[]);

=======
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
>>>>>>> dev-20260916-1beta0000001


  return (
<<<<<<< HEAD
=======
    <div dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            محصولات
          </h1>
>>>>>>> dev-20260916-1beta0000001

    <div dir="rtl" className="p-6">


      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-bold">
          محصولات
        </h1>


        <button
          className="bg-slate-600 text-white px-5 py-3 rounded-lg"
          onClick={()=>setOpen(true)}
        >
          افزودن محصول
        </button>


      </div>

<<<<<<< HEAD


      <div className="bg-white rounded-xl border overflow-hidden">


        <table className="w-full">


=======
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <table className="w-full" dir="rtl">
>>>>>>> dev-20260916-1beta0000001
          <thead>

            <tr className="border-b">

              <th className="p-4">
                تصویر
              </th>


              <th className="p-4">
                نام
              </th>

<<<<<<< HEAD

              <th className="p-4">
                قیمت
              </th>


              <th className="p-4">
                موجودی
              </th>


=======
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
>>>>>>> dev-20260916-1beta0000001
            </tr>

          </thead>



          <tbody>
<<<<<<< HEAD


          {
            products.map(product=>(


              <tr
                key={product.id}
                className="border-b"
              >


                <td>
                  <img
                    src={
                      product.imageUrl
                        ? `http://localhost:3000${product.imageUrl}`
                        : "/images/no-image.png"
                    }
                    className="
                w-12
                h-12
                rounded-lg
                object-cover
                "
                  />
                </td>



                <td className="p-4">
                  {product.name}
                </td>



                <td className="p-4">
                  {product.price}
                </td>



                <td className="p-4">
                  {product.stock}
                </td>


              </tr>


            ))
          }



=======
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
>>>>>>> dev-20260916-1beta0000001
          </tbody>


        </table>



      </div>

<<<<<<< HEAD



      <AddProductModal

        isOpen={open}

        onClose={()=>setOpen(false)}

        onCreated={()=>{

          loadProducts();

        }}

=======
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
>>>>>>> dev-20260916-1beta0000001
      />


    </div>


  );


}
