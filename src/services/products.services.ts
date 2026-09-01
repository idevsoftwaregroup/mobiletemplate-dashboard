import { getToken } from "./auth.service";

const API_URL = import.meta.env.VITE_API_URL;

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: string | number;
  imageUrl?: string | null;
  category?: string | null;
  stock: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function getProducts(): Promise<Product[]> {
  const token = getToken();

  const response = await fetch(`${API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data;
}


export async function createProduct(product: {
  name: string;
  slug: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock: number;
  status: string;
}) {
  const token = getToken();

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create product");
  }

  return data;
}
