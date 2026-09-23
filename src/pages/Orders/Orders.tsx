import { useEffect, useState } from "react";

import {
  getOrders,
  updateOrderStatus,
  Order,
} from "../../services/orders.services.ts";
import { getPayments, Payment } from "../../services/payments.services.ts";
import Payments from "../Payments/Payments.tsx";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      console.log("Orders:", data);

      setOrders(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load orders",
      );
    } finally {
      setLoading(false);
    }
  };

  const loadPayments = async () => {
    try {
      setLoading(true);
      const dataPayments = await getPayments();
      console.log("Payments : ", dataPayments);
      setPayments(dataPayments);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load payments",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    loadPayments();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const prismaStatusMap: any = {
        pending: "PENDING",
        confirmed: "CONFIRMED",
        processing: "PROCESSING",
        shipped: "SHIPPED",
        completed: "DELIVERED",
        cancelled: "CANCELLED",
      };

      await updateOrderStatus(id, prismaStatusMap[status]);

      await loadOrders();
      await loadPayments();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Update failed");
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>;
  }

  return (
    <div dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">مدیریت سفارش‌ها</h1>

        <p className="text-sm text-gray-500 mt-2">
          بررسی، تایید و تغییر وضعیت سفارش‌های کاربران
        </p>
      </div>

      <div
        className="
overflow-hidden 
rounded-xl 
border 
bg-white
"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-right">شماره سفارش</th>

              <th className="px-6 py-4 text-right">مشتری</th>

              <th className="px-6 py-4 text-right">مبلغ</th>

              <th className="px-6 py-4 text-right">پرداخت</th>

              <th className="px-6 py-4 text-right">وضعیت سفارش</th>

              <th className="px-6 py-4 text-right">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-6 py-4 text-sm">{order.id.slice(0, 8)}</td>

                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">
                      {order.user.firstName} {order.user.lastName}
                    </div>

                    <div className="text-xs text-gray-500">
                      {order.user.email}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">{order.totalAmount.toString()}</td>

                <td className="px-6 py-4">
                  {(() => {
                    const payment = payments.find(
                      (payment) => payment.orderId === order.id,
                    );

                    return (
                      <span
                        className={`
          rounded-full 
          px-3 
          py-1 
          text-xs

          ${
            payment?.status === "PAID"
              ? "bg-green-50 text-green-600"
              : payment?.status === "FAILED"
                ? "bg-red-50 text-red-600"
                : "bg-yellow-50 text-yellow-600"
          }
        `}
                      >
                        {payment?.status === "PAID"
                          ? "پرداخت شده"
                          : payment?.status === "FAILED"
                            ? "پرداخت ناموفق"
                            : "در انتظار پرداخت"}
                      </span>
                    );
                  })()}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={order.status.toLowerCase()}
                    onChange={(e) => {
                      handleStatusChange(order.id, e.target.value);
                    }}
                  >
                    <option value="pending">در انتظار بررسی</option>

                    <option value="confirmed">تایید شده</option>

                    <option value="processing">در حال پردازش</option>

                    <option value="shipped">ارسال شده</option>

                    <option value="completed">تکمیل شده</option>

                    <option value="cancelled">لغو شده</option>
                  </select>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      handleStatusChange(order.id, "confirmed");
                    }}
                    className="
rounded-3xl
bg-green-800
px-4
py-2
text-xs
text-white
"
                  >
                    تایید سفارش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
