import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import DashboardHero from "../../components/common/DashboardHero";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "دست خط | ردپای ذهن بر روی کاغذ دیجیتال";
  }, []);
  return (
    <>
      <PageMeta
        title="دست خط | ردپای ذهن بر روی کاغذ دیجیتال"
        description="دست خط | ردپای ذهن بر روی کاغذ دیجیتال"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <DashboardHero />
        </div>
        <div className="col-span-12 space-y-3 xl:col-span-12">
          <EcommerceMetrics />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
