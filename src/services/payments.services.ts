const API_URL = import.meta.env.VITE_API_URL;

export interface Payment {
  id: string;

  amount: string;

  status: string;

  order: {
    id: string;

    user: {
      firstName: string;
      lastName: string;
      email: string;
    };

    items: {
      id: string;

      quantity: number;

      product: {
        name: string;
        imageUrl: string | null;
      };
    }[];
  };
}

export async function getPayments() {
  const res = await fetch(`${API_URL}/payments`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }

  return data;
}

export async function updatePaymentStatus(id: string, status: string) {
  const response = await fetch(`${API_URL}/payments/${id}/status`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      status,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Payment update failed");
  }

  return data;
}
