import React, {useState} from "react";
import dynamic from "next/dynamic";

const Chart1 = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PieChartComponent() {
    const [chart1, setOptions1] = useState({
      series: [44, 55, 13, 43],
      options: {
          chart: {
              width: 380,
              type: 'donut',
          },
          labels: [
              "General Document",
              "Engineering Subcontract",
              "Flowline Project Document",
              "Vendor Documents",
          ],
          colors: ["#ffb1b7", "#775da6", "#70b6c1", "#d1c297"],
          legend: {
              position: 'bottom', // Change to 'top' or 'bottom'
              horizontalAlign: 'center', // Centers the legend horizontally
          },
      },
    });
    const [chart2, setOptions2] = useState({
        series: [43, 13],
        options: {
            chart: {
                width: 380,
                type: 'donut',
            },
            labels: [
                "Active",
                "Draft",
            ],
            colors: ["#775da6", "#ffb1b7"],
            legend: {
                position: 'bottom', // Change to 'top' or 'bottom'
                horizontalAlign: 'center', // Centers the legend horizontally
            },
        },
    });
    const [chart3, setOptions3] = useState({
        series: [{
            data: [400, 430, 448]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                }
            },

            themes: {
                mode: 'dark'
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['For Information Only', 'IFC - Issued For Comment', 'See Remarks'],
            }
        },
    });
    const [chart4, setOptions4] = useState({
        series: [{
            name: 'Stage Status',
            data: [44, 55, 57]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '45%',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Client', 'Galfar', 'Internal Review'],
            },
            yaxis: {
                title: {
                    text: 'Count'
                }
            },
            fill: {
                opacity: 1
            },
        },
    });

    return (
        <div className="p-4 grid lg:grid-cols-2 md:grid-cols-1 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-35 dark:text-white rounded-xl p-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white opacity-90 sm:tracking-tight">
                    Document Types
                </p>
                <Chart1
                    options={chart1.options}
                    series={chart1.series}
                    type="donut"
                    width={"100%"}
                    // className={'xl:mx-10'}
                />
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-35 dark:text-white rounded-xl p-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white opacity-90 sm:tracking-tight">
                    Document Status
                </p>
                <Chart1
                    options={chart2.options}
                    series={chart2.series}
                    type="donut"
                    width={"100%"}
                    // className={'xl:mx-10'}
                />
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-35 dark:text-white rounded-xl p-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white opacity-90 sm:tracking-tight">
                    Project Document Issue Code
                </p>
                <Chart1
                    options={chart3.options}
                    series={chart3.series}
                    type="bar"
                    width={"100%"}
                />
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-35 dark:text-white rounded-xl p-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white opacity-90 sm:tracking-tight">
                    Project Document Stage Status
                </p>
                <Chart1
                    options={chart4.options}
                    series={chart4.series}
                    type="bar"
                    width={"100%"}
                />
            </div>
        </div>
    );
}
