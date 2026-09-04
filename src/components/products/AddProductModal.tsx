import { FormEvent, useState } from "react";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { createProduct } from "../../services/product.service";

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
  const [status, setStatus] = useState("active");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");


  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if(!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };


  const handleSubmit = async(
    e:FormEvent<HTMLFormElement>
  )=>{

    e.preventDefault();

    setLoading(true);
    setError("");

    try{

      const formData = new FormData();

      formData.append("name",name);
      formData.append("slug",slug);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("stock",stock);
      formData.append("status",status);


      if(image){
        formData.append(
          "image",
          image
        );
      }


      await createProduct(formData);


      onCreated();
      onClose();


    }catch(err){

      setError(
        err instanceof Error
        ?
        err.message
        :
        "خطا در ایجاد محصول"
      );

    }finally{

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


<h2 className="mb-6 text-xl font-semibold">
 افزودن محصول
</h2>


<form onSubmit={handleSubmit}>


<div className="grid grid-cols-1 gap-5 md:grid-cols-2">


<div>
<Label>نام محصول</Label>
<Input
value={name}
onChange={e=>setName(e.target.value)}
/>
</div>


<div>
<Label>Slug</Label>
<Input
value={slug}
onChange={e=>setSlug(e.target.value)}
/>
</div>


<div className="md:col-span-2">

<Label>
تصویر محصول
</Label>

<input
type="file"
accept="image/*"
onChange={handleImageChange}
className="w-full border p-3 rounded"
/>


{
preview &&
<img
src={preview}
className="mt-3 h-32 rounded object-cover"
/>
}

</div>



<div className="md:col-span-2">

<Label>توضیحات</Label>

<textarea
value={description}
onChange={e=>setDescription(e.target.value)}
className="w-full border rounded p-3"
rows={4}
/>

</div>


<div>
<Label>قیمت</Label>

<Input
type="number"
value={price}
onChange={e=>setPrice(e.target.value)}
/>

</div>



<div>
<Label>دسته بندی</Label>

<Input
value={category}
onChange={e=>setCategory(e.target.value)}
/>

</div>



<div>
<Label>موجودی</Label>

<Input
type="number"
value={stock}
onChange={e=>setStock(e.target.value)}
/>

</div>



<div>

<Label>وضعیت</Label>

<select
value={status}
onChange={e=>setStatus(e.target.value)}
className="w-full border rounded p-3"
>

<option value="active">
فعال
</option>

<option value="inactive">
غیرفعال
</option>

</select>

</div>


</div>


{
error &&
<div className="mt-5 text-red-500">
{error}
</div>
}


<div className="mt-6 flex gap-3">

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
{
loading
?
"در حال ذخیره..."
:
"افزودن"
}

</Button>


</div>


</form>


</div>


</Modal>

);

}
