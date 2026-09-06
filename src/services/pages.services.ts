import { getToken } from "./auth.service";

const API_URL = import.meta.env.VITE_API_URL;

export interface Page {
  id: string;
  title: string;
  typeOfPage: string;
  slug: string;
  content: string;

  imageUrl?: string | null;

  seoTitle?: string | null;
  seoDescription?: string | null;

  status: string;

  createdAt: string;
  updatedAt: string;
}

export async function getPages(): Promise<Page[]> {
  const token = getToken();

  const response = await fetch(`${API_URL}/pages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch pages");
  }

  return data;
}

export async function createPage(data: FormData) {
  const token = getToken();

  console.log("API URL:", API_URL);
  const response = await fetch(`${API_URL}/pages`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: data,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create page");
  }

  return result;
}
