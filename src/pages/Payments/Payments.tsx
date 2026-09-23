import { useEffect, useState } from "react";

import {
  getPayments,
  updatePaymentStatus,
  Payment,
} from "../../services/payments.services";
import { CheckCircleIcon } from "../../icons";

const SERVER_URL = "http://localhost:3000";

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await getPayments();

    setPayments(data);

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id: string, status: string) => {
    await updatePaymentStatus(id, status);

    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status,
            }
          : payment,
      ),
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div dir="rtl">
      <h1 className="text-2xl mb-6">مدیریت پرداخت‌ها</h1>

      <table className="w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="p-4">مشتری</th>

            <th className="p-4">محصولات</th>

            <th className="p-4">مبلغ</th>

            <th className="p-4">وضعیت</th>

            <th className="p-4">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b">
              <td className="p-4">
                {payment.order.user.firstName} {payment.order.user.lastName}
                <br />
                <small>{payment.order.user.email}</small>
              </td>

              <td className="p-4">
                {payment.order.items.map((item) => (
                  <div key={item.id} className="flex gap-2 mb-2">
                    {item.product.imageUrl && (
                      <img
                        src={
                          item.product.imageUrl.startsWith("http")
                            ? item.product.imageUrl
                            : `${SERVER_URL}${item.product.imageUrl}`
                        }
                        className="
w-10
h-10
rounded
object-cover
"
                      />
                    )}

                    <span>{item.product.name}</span>
                  </div>
                ))}
              </td>

              <td className="p-4">{payment.amount}</td>

              <td className="p-4">
                <span
                  className={
                    payment.status === "PAID"
                      ? "text-white text-lg bg-green-800 px-3 py-1 rounded-3xl"
                      : "text-white text-lg bg-red-800 px-3 py-1 rounded-3xl"
                  }
                >
                  {payment.status === "PAID" ? "پرداخت شده" : "پرداخت نشده"}
                </span>
              </td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  {/* Approve Payment */}
                  <button
                    disabled={payment.status === "PAID"}
                    onClick={() => changeStatus(payment.id, "PAID")}
                    className={`
      flex
      items-center
      justify-center
      gap-2
      rounded-3xl
      border
      px-3
      py-2
      text-sm
      font-medium
      shadow-sm
      transition

      ${
        payment.status === "PAID"
          ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
          : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
      }
    `}
                  >
                    <CheckCircleIcon
                      size={20}
                      className={
                        payment.status === "PAID"
                          ? "text-gray-400"
                          : "text-green-600"
                      }
                    />

                    <span className="hidden sm:inline">
                      {payment.status === "PAID" ? "تایید شده" : "تایید پرداخت"}
                    </span>
                  </button>

                  {/* Reject Payment */}
                  <button
                    disabled={
                      payment.status === "FAILED" || payment.status === "PAID"
                    }
                    onClick={() => changeStatus(payment.id, "FAILED")}
                    className={`
      flex
      items-center
      justify-center
      gap-2
      rounded-3xl
      border
      px-3
      py-2
      text-sm
      font-medium
      shadow-sm
      transition

      ${
        payment.status === "FAILED" || payment.status === "PAID"
          ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
          : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
      }
    `}
                  >
                    <span
                      className={
                        payment.status === "FAILED"
                          ? "text-gray-400"
                          : "text-red-600"
                      }
                    >
                      ✖
                    </span>

                    <span className="hidden sm:inline">
                      {payment.status === "FAILED" ? "رد شده" : "رد پرداخت"}
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
