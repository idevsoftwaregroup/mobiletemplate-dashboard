import { useEffect, useState } from "react";
import Button from "../../components/ui/button/Button";
import AddProductModal from "../../components/products/AddProductModal";
import { getProducts } from "../../services/product.service";

export default function Products(){

 const [products,setProducts]=useState<Product[]>([]);
 const [open,setOpen]=useState(false);


 async function loadProducts(){

   const data = await getProducts();

   setProducts(data);

 }


 useEffect(()=>{

   loadProducts();

 },[]);



 return (
  <div dir="rtl">


    <div className="flex justify-between mb-6">

      <h1 className="text-xl font-bold">
        محصولات
      </h1>


      <Button
        onClick={()=>setOpen(true)}
      >
        افزودن محصول
      </Button>


    </div>




    <div className="grid gap-5">

      {
        products.map(product=>(

          <div
          key={product.id}
          className="rounded-xl border p-4"
          >

            <h3>
              {product.name}
            </h3>


            <p>
              {product.price}
            </p>


          </div>

        ))
      }

    </div>



    <AddProductModal

      isOpen={open}

      onClose={()=>setOpen(false)}

      onCreated={()=>{
        loadProducts();
      }}

    />



  </div>
 )

}
