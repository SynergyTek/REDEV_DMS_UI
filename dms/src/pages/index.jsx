import React, { useState } from "react";
import dynamic from "next/dynamic";
import InputField from "~/components/Form"
import Head from "next/head";

// Dynamically import the Chart component to avoid SSR issues with ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Home() {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 99],
    },
  ]);

  return (
      <div className="app">
          <InputField
              id="id1"
              label="Input"
              onClick={() => {}}
              primary
              required
          />
          {/*<Chart options={options} series={series} type="bar" width="500" />*/}
      </div>
  );
}
