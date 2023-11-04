import { MainLayout, MainNavbar } from "@/components";
import React from "react";
import { Banner, MainFooter, PreviewFeature } from "./components";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { useUser } from "@/hooks";
import { isEmpty } from "lodash";

import { FaCoins, FaChartPie, FaChartLine } from "react-icons/fa";
import { BiTable } from "react-icons/bi";

import createBudget from "@/assets/images/landing-page/create-budget.jpeg";
import summaryTable from "@/assets/images/landing-page/summary-overview.jpeg";
import summaryDetail from "@/assets/images/landing-page/summary-detail.jpeg";
import trackingBudget from "@/assets/images/landing-page/tracking-budget.jpeg";

function MainContainer() {
  const { data: user } = useUser();

  const btnText = isEmpty(user) ? "Try free" : "Get Create free";

  const preview = [
    {
      label: "Tracking budget",
      aboutSection: "tracking-budget-section",
      icon: <FaChartLine className="w-8 h-8 text-[#35A29F]" />,
      image: trackingBudget,
    },
    {
      label: "Create budget",
      aboutSection: "create-budget-section",
      icon: <FaCoins className="w-8 h-8 text-[#FFC436]" />,
      image: createBudget,
    },
    {
      label: "Summary Overview",
      aboutSection: "view-summary-detail-section",
      icon: <BiTable className="w-8 h-8 text-[#61677A]" />,
      image: summaryTable,
    },
    {
      label: "Budget detail",
      aboutSection: "view-summary-detail-section",
      icon: <FaChartPie className="w-8 h-8 text-[#279EFF]" />,
      image: summaryDetail,
    },
  ];

  return (
    <main>
      <MainNavbar />
      <MainLayout>
        <Banner />
        <section className="flex flex-col items-center w-full">
          <Link href={ROUTES.BUDGET.CREATE}>
            <Button className="items-center flex">
              {btnText} <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </section>

        <section className="flex flex-col gap-y-[10vh] mt-[30vh]">
          {preview.map(({ label, image, icon, aboutSection }, previewIdx) => (
            <PreviewFeature
              key={label.replaceAll(" ", "")}
              label={label}
              src={image}
              about={aboutSection}
              icon={icon}
              reverse={previewIdx % 2 === 0 ? false : true}
            />
          ))}
        </section>
        <MainFooter />
      </MainLayout>
    </main>
  );
}

export default MainContainer;
