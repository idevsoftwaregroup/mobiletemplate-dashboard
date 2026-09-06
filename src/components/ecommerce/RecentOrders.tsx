import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface Product {
  id: string;
  name: string;
  category: string | null;
  imageUrl: string | null;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: string;
  product: Product;
}

interface User {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  avatarUrl?: string | null;
}

interface Payment {
  id: string;
  provider: string;
  amount: string;
  status: string;
  authority: string | null;
  transactionId: string | null;
  paidAt: string | null;
}

interface Order {
  id: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  user: User;
  items: OrderItem[];
  payment: Payment | null;
}

interface OrdersResponse {
  success: boolean;
  count: number;
  data: Order[];
}

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function formatPrice(price: string) {
  return `${Number(price).toLocaleString("en-US")} تومان`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fa-IR");
}

function getOrderStatus(status: string) {
  switch (status.toLowerCase()) {
    case "paid":
    case "delivered":
      return {
        label: "پرداخت شده",
        color: "success" as const,
      };

    case "pending":
      return {
        label: "در انتظار پرداخت",
        color: "warning" as const,
      };

    case "canceled":
    case "cancelled":
      return {
        label: "لغو شده",
        color: "error" as const,
      };

    default:
      return {
        label: status,
        color: "warning" as const,
      };
  }
}

function getCustomerName(user: User) {
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  return fullName || user.email;
}

function getOrderProducts(order: Order) {
  if (order.items.length === 0) {
    return {
      name: "بدون محصول",
      variants: "",
      category: "-",
      image: "/images/product/product-01.jpg",
    };
  }

  const firstItem = order.items[0];

  const productNames = order.items
    .map((item) => item.product.name)
    .join("، ");

  const variants =
    order.items.length === 1
      ? `${firstItem.quantity} عدد`
      : `${order.items.length} محصول`;

  return {
    name: productNames,
    variants,
    category: firstItem.product.category || "-",
    image:
      firstItem.product.imageUrl || "/images/product/product-01.jpg",
  };
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/orders/recent?limit=5`);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const result: OrdersResponse = await response.json();

      if (!result.success) {
        throw new Error("Failed to fetch orders");
      }

      setOrders(result.data);
    } catch (error) {
      console.error("Fetch recent orders error:", error);
      setError("خطا در دریافت سفارش‌ها");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">

      {/* Header */}
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            سفارش های اخیر
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            آخرین سفارش‌های ثبت شده
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>

            فیلتر
          </button>

          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            مشاهده همه سفارش ها
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <Table>

          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                سفارش
              </TableCell>

              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                مشتری
              </TableCell>

              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                مبلغ
              </TableCell>

              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                وضعیت
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Loading */}
          {loading && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-gray-500"
                >
                  در حال دریافت سفارش‌ها...
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {/* Error */}
          {!loading && error && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-red-500"
                >
                  {error}
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {/* Empty */}
          {!loading && !error && orders.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-gray-500"
                >
                  هنوز سفارشی ثبت نشده است.
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {/* Orders */}
          {!loading && !error && orders.length > 0 && (
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {orders.map((order) => {
                const product = getOrderProducts(order);
                const status = getOrderStatus(order.status);

                return (
                  <TableRow key={order.id}>

                    {/* Product */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                          <img
                            src={product.image}
                            className="h-[50px] w-[50px] object-cover"
                            alt={product.name}
                          />
                        </div>

                        <div>
                          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {product.name}
                          </p>

                          <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            {product.variants}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Customer */}
                    <TableCell className="py-3">
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {getCustomerName(order.user)}
                        </p>

                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatPrice(order.totalAmount)}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-3">
                      <Badge size="sm" color={status.color}>
                        {status.label}
                      </Badge>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
