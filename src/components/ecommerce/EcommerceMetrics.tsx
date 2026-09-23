import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";

import Badge from "../ui/badge/Badge";
import { getToken } from "../../services/auth.service";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function EcommerceMetrics() {
  const [metrics, setMetrics] = useState({
    users: 0,
    products: 0,
    orders: 0,
    pendingPayments: 0,
    revenue: 0,
  });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const token = getToken();

        const response = await fetch(`${API_URL}/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard metrics");
        }

        const data = await response.json();

        console.log("Dashboard Metrics:", data);

        setMetrics({
          users: data.users ?? 0,

          products: data.products ?? 0,

          orders: data.orders ?? 0,

          pendingPayments: data.pendingPayments ?? 0,

          revenue: data.revenue ?? 0,
        });
      } catch (error) {
        console.error("Dashboard Metrics Error:", error);
      }
    };

    loadMetrics();
  }, []);

  const cards = [
    {
      title: "مشتری ها",

      value: `${metrics.users.toLocaleString()} نفر`,

      icon: <GroupIcon className="size-6 text-gray-800 dark:text-white/90" />,

      badge: "11.01%",

      badgeColor: "success",

      trend: "up",
    },

    {
      title: "سفارش ها",

      value: `${metrics.orders.toLocaleString()} سفارش`,

      icon: <BoxIconLine className="size-6 text-gray-800 dark:text-white/90" />,

      badge: "8.25%",

      badgeColor: "success",

      trend: "up",
    },

    {
      title: "پرداخت های در انتظار",

      value: `${metrics.pendingPayments.toLocaleString()} پرداخت`,

      icon: <BoxIconLine className="size-6 text-gray-800 dark:text-white/90" />,

      badge: "5.10%",

      badgeColor: "error",

      trend: "down",
    },

    {
      title: "محصول ها",

      value: `${metrics.products.toLocaleString()} عدد`,

      icon: <BoxIconLine className="size-6 text-gray-800 dark:text-white/90" />,

      badge: "9.05%",

      badgeColor: "success",

      trend: "up",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-4
        md:gap-6
      "
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              dark:border-gray-800
              dark:bg-white/[0.03]

              md:p-6
            "
        >
          <div
            className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-gray-100
                dark:bg-gray-800
              "
          >
            {card.icon}
          </div>

          <div
            className="
                mt-5
                flex
                items-center
                justify-between
                gap-4
              "
          >
            <div className="min-w-0">
              <span
                className="
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
              >
                {card.title}
              </span>

              <h4
                className="
                    mt-2
                    text-xl
                    font-bold
                    text-gray-800
                    dark:text-white/90
                    md:text-2xl
                  "
              >
                {card.value}
              </h4>
            </div>

            <Badge color={card.badgeColor as "success" | "error"}>
              {card.trend === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}

              {card.badge}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
