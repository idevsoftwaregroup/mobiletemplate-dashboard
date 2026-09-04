const API_URL = import.meta.env.VITE_API_URL;

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  category?: string;
  stock: number;
  status: string;
  imageUrl?: string;
  createdAt?: string;
}


function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}



export async function getProducts(): Promise<Product[]> {

  const response = await fetch(
    `${API_URL}/products`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch products"
    );
  }


  return data;
}



export async function createProduct(product: Partial<Product>) {

  const response = await fetch(
    `${API_URL}/products`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(product),
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create product"
    );
  }


  return data;
}
