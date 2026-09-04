import { useEffect, useState } from "react";
import {
  getProducts,
  Product,
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

    loadProducts();

  },[]);



  return (

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



      <div className="bg-white rounded-xl border overflow-hidden">


        <table className="w-full">


          <thead>

            <tr className="border-b">

              <th className="p-4">
                تصویر
              </th>


              <th className="p-4">
                نام
              </th>


              <th className="p-4">
                قیمت
              </th>


              <th className="p-4">
                موجودی
              </th>


            </tr>

          </thead>



          <tbody>


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



          </tbody>


        </table>



      </div>




      <AddProductModal

        isOpen={open}

        onClose={()=>setOpen(false)}

        onCreated={()=>{

          loadProducts();

        }}

      />


    </div>


  );


}
