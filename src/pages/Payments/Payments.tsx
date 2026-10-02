import { useEffect, useState } from "react";
import {
  getPayments,
  updatePaymentStatus,
  type Payment,
} from "../../services/payments.services";
import type { Product } from "../../services/products.services";
import "../../assets/css/dialog.css";
import { CheckCircleIcon } from "../../icons";
import imgUrl from "../../assets/images/product-placeholder.jpg";
const SERVER_URL = "http://localhost:3000";
type PaymentStatus = "UNPAID" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  /** * Load payments */ const load = async () => {
    try {
      setLoading(true);
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error("Failed to load payments:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  /** * Open product dialog * * Product information is already available * inside payment.order.items[].product */ const openProduct =
    (product: Product) => {
      setSelectedProduct(product);
      const dialog = document.getElementById(
        "product-dialog",
      ) as HTMLDialogElement | null;
      dialog?.showModal();
    };
  /** * Update payment status */ const changeStatus = async (
    id: string,
    status: PaymentStatus,
  ) => {
    try {
      await updatePaymentStatus(id, status);
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === id ? { ...payment, status } : payment,
        ),
      );
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };
  /** * Payment status UI */ const getStatusLabel = (status: string) => {
    switch (status) {
      case "PAID":
        return "پرداخت شده";
      case "FAILED":
        return "رد شده";
      case "REFUNDED":
        return "بازپرداخت شده";
      case "UNPAID":
        return "پرداخت نشده";
      case "PENDING":
      default:
        return "در انتظار بررسی";
    }
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case "PAID":
        return "text-white text-lg bg-green-800 px-3 py-1 rounded-3xl";
      case "FAILED":
        return "text-white text-lg bg-red-800 px-3 py-1 rounded-3xl";
      case "REFUNDED":
        return "text-white text-lg bg-purple-800 px-3 py-1 rounded-3xl";
      case "UNPAID":
        return "text-white text-lg bg-gray-600 px-3 py-1 rounded-3xl";
      case "PENDING":
      default:
        return "text-white text-lg bg-yellow-700 px-3 py-1 rounded-3xl";
    }
  };
  /** * Product image URL */ const getProductImage = (
    imageUrl?: string | null,
  ) => {
    if (!imageUrl) {
      return imgUrl;
    }
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return `${SERVER_URL}${imageUrl}`;
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div dir="rtl">
      {" "}
      <h1 className="text-2xl mb-6"> مدیریت پرداخت‌ها </h1>{" "}
      <table className="w-full bg-white">
        {" "}
        <thead>
          {" "}
          <tr className="border-b">
            {" "}
            <th className="p-4"> مشتری </th> <th className="p-4"> محصولات </th>{" "}
            <th className="p-4"> مبلغ </th> <th className="p-4"> وضعیت </th>{" "}
            <th className="p-4"> عملیات </th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b">
              {" "}
              {/* CUSTOMER */}{" "}
              <td className="p-4">
                {" "}
                {payment.order.user.firstName} {payment.order.user.lastName}{" "}
                <br /> <small> {payment.order.user.email} </small>{" "}
              </td>{" "}
              {/* PRODUCTS */}{" "}
              <td className="p-4">
                {" "}
                {payment.order.items.map((item) => (
                  <div key={item.id} className="flex gap-2 mb-2 items-center">
                    {" "}
                    {/* PRODUCT IMAGE */}{" "}
                    <button
                      type="button"
                      className="p-0 border-0 bg-transparent cursor-pointer"
                      onClick={() => openProduct(item.product)}
                      aria-label={`مشاهده ${item.product.name}`}
                    >
                      {" "}
                      <img
                        src={getProductImage(item.product.imageUrl)}
                        className="w-10 h-10 rounded object-cover"
                        alt={item.product.name}
                      />{" "}
                    </button>{" "}
                    {/* PRODUCT NAME */}{" "}
                    <button
                      type="button"
                      className="text-right"
                      onClick={() => openProduct(item.product)}
                    >
                      {" "}
                      {item.product.name}{" "}
                    </button>{" "}
                  </div>
                ))}{" "}
              </td>{" "}
              {/* AMOUNT */}{" "}
              <td className="p-4">
                {" "}
                {Number(payment.amount).toLocaleString("fa-IR")} تومان{" "}
              </td>{" "}
              {/* STATUS */}{" "}
              <td className="p-4">
                {" "}
                <span className={getStatusClass(payment.status)}>
                  {" "}
                  {getStatusLabel(payment.status)}{" "}
                </span>{" "}
              </td>{" "}
              {/* ACTIONS */}{" "}
              <td className="p-4">
                {" "}
                <div className="flex items-center gap-2">
                  {" "}
                  {/* APPROVE */}{" "}
                  <button
                    type="button"
                    disabled={payment.status === "PAID"}
                    onClick={() => changeStatus(payment.id, "PAID")}
                    className={` flex items-center justify-center gap-2 rounded-3xl border px-3 py-2 text-sm font-medium shadow-sm transition ${payment.status === "PAID" ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400" : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"} `}
                  >
                    {" "}
                    <CheckCircleIcon
                      size={20}
                      className={
                        payment.status === "PAID"
                          ? "text-gray-400"
                          : "text-green-600"
                      }
                    />{" "}
                    <span className="hidden sm:inline">
                      {" "}
                      {payment.status === "PAID"
                        ? "تایید شده"
                        : "تایید پرداخت"}{" "}
                    </span>{" "}
                  </button>{" "}
                  {/* REJECT */}{" "}
                  <button
                    type="button"
                    disabled={
                      payment.status === "FAILED" || payment.status === "PAID"
                    }
                    onClick={() => changeStatus(payment.id, "FAILED")}
                    className={` flex items-center justify-center gap-2 rounded-3xl border px-3 py-2 text-sm font-medium shadow-sm transition ${payment.status === "FAILED" || payment.status === "PAID" ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400" : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"} `}
                  >
                    {" "}
                    <span
                      className={
                        payment.status === "FAILED"
                          ? "text-gray-400"
                          : "text-red-600"
                      }
                    >
                      {" "}
                      ✖{" "}
                    </span>{" "}
                    <span className="hidden sm:inline">
                      {" "}
                      {payment.status === "FAILED"
                        ? "رد شده"
                        : "رد پرداخت"}{" "}
                    </span>{" "}
                  </button>{" "}
                </div>{" "}
              </td>{" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </table>{" "}
      {/* ========================================= PRODUCT MODAL ========================================= */}{" "}
      <dialog id="product-dialog" className="round product-dialog" dir="rtl">
        {" "}
        {selectedProduct && (
          <div className="product-dialog-content">
            {" "}
            {/* IMAGE */}{" "}
            <div className="product-dialog-image">
              {" "}
              <img
                className="responsive round"
                src={getProductImage(selectedProduct.imageUrl)}
                alt={selectedProduct.name}
              />{" "}
            </div>{" "}
            {/* INFO */}{" "}
            <div className="product-dialog-info">
              {" "}
              <h4> {selectedProduct.name} </h4>{" "}
              <p>
                {" "}
                {selectedProduct.description ||
                  "توضیحی برای این محصول ثبت نشده است."}{" "}
              </p>{" "}
              <div className="row wrap">
                {" "}
                <span className="chip">
                  {" "}
                  <i>category</i>{" "}
                  {selectedProduct.category || "بدون دسته‌بندی"}{" "}
                </span>{" "}
                <span className="chip">
                  {" "}
                  <i>inventory</i> {selectedProduct.stock}{" "}
                </span>{" "}
              </div>{" "}
              <h5 className="primary-text">
                {" "}
                {Number(selectedProduct.price).toLocaleString("fa-IR")}{" "}
                تومان{" "}
              </h5>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {/* CLOSE */}{" "}
        <form method="dialog">
          {" "}
          <button type="submit" className="secondary">
            {" "}
            بستن{" "}
          </button>{" "}
        </form>{" "}
      </dialog>{" "}
    </div>
  );
}
