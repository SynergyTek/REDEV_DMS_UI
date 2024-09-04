import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PieChartComponent() {
  const [options, setOptions] = useState({
    labels: [
      "General Document",
      "Engineering Subcontract",
      "Flowline Project Document",
      "Vendor Documents",
    ],
    colors: ["#ffb1b7", "#775da6", "#70b6c1", "#d1c297"],
  });
  const [series, setSeries] = useState([44, 55, 43, 13]);

  return (
      <div className="p-4">
        <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-35 dark:text-white w-6/12 rounded-xl p-4">
          <p className="text-lg font-semibold text-gray-900 dark:text-white opacity-90 sm:tracking-tight">
            Document Types
          </p>
          <Chart options={options} series={series} type="donut" />
        </div>
      </div>
  );
}
