import { getToken } from "./auth.service";

const API_URL = import.meta.env.VITE_API_URL;

// -------------------------
// Interfaces
// -------------------------

export interface OrderProduct {
  id: string;

  name: string;

  imageUrl?: string | null;

  price: string | number;
}

export interface OrderItem {
  id: string;

  quantity: number;

  price: string | number;

  product: OrderProduct;
}

export interface OrderUser {
  id: string;

  firstName: string;

  lastName?: string | null;

  email: string;
}

export interface OrderPayment {
  id: string;

  amount: string | number;

  status: string;

  paymentMethod: string;

  receiptImage?: string | null;

  trackingCode?: string | null;
}

export interface Order {
  id: string;

  userId: string;

  status: string;

  totalAmount: string | number;

  createdAt: string;

  updatedAt: string;

  user: OrderUser;

  items: OrderItem[];

  payment?: OrderPayment | null;
}

// -------------------------
// Get All Orders
// -------------------------

export async function getOrders(): Promise<Order[]> {
  const token = getToken();

  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data;
}

// -------------------------
// Recent Orders Dashboard
// -------------------------

export async function getRecentOrders(counter: number = 3): Promise<Order[]> {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/orders/recent`,

    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch recent orders");
  }

  return data.data || data;
}

// -------------------------
// Get Order Detail
// -------------------------

export async function getOrderById(id: string): Promise<Order> {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/orders/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch order");
  }

  return data;
}

// -------------------------
// Update Order Status
// -------------------------

export async function updateOrderStatus(
  id: string,

  status: string,
) {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/orders/${id}/status`,

    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        status,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update order status");
  }

  return data;
}
