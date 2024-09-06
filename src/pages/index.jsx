import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {Button} from "~/ui/button";

const Chart1 = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Home(theme) {
    const options1 = {
        series: [44, 55, 13, 43],
        options: {
            chart: {
                type: 'donut',
                toolbar: {
                    show: true, // Enable the toolbar
                },
            },
            labels: [
                "General Document",
                "Engineering Subcontract",
                "Flowline Project Document",
                "Vendor Documents",
            ],
            colors: ["#ffb1b7", "#775da6", "#70b6c1", "#d1c297"],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
            },
            dataLabels: {
                enabled: true
            },
            theme: {
                mode: "light"
            },
        },
    };
    const options2 = {
        series: [43, 13],
        options: {
            chart: {
                type: 'donut',
                toolbar: {
                    show: true, // Enable the toolbar
                },
            },
            labels: [
                "Active",
                "Draft",
            ],
            colors: ["#ffb1b7", "#775da6"],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
            },
            dataLabels: {
                enabled: true
            },
            theme: {
                mode: "light"
            },
        },
    };
    const options3 = {
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
                    borderRadius: 15,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                }
            },
            theme: {
                mode: "light"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['For Information Only', 'IFC - Issued For Comment', 'See Remarks'],
                title: {
                    text: 'Count'
                }
            },

        },
    };
    const options4 = {
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
                    borderRadius: 15,
                    borderRadiusApplication: 'end'
                },
            },
            dataLabels: {
                enabled: false
            },
            theme: {
                mode: "light"
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
    };
    const [chart1, setOptions1] = useState(options1);
    const [chart2, setOptions2] = useState(options2);
    const [chart3, setOptions3] = useState(options3);
    const [chart4, setOptions4] = useState(options4);


    useEffect(() => {
        console.log(theme);
            options1.options.theme.mode = theme.theme;
            options2.options.theme.mode = theme.theme;
            options3.options.theme.mode = theme.theme;
            options4.options.theme.mode = theme.theme;
            setOptions1(options1);
            setOptions2(options2);
            setOptions3(options3);
            setOptions4(options4);
    }, [theme]);

    return (
        <div className="p-4 grid lg:grid-cols-2 md:grid-cols-1 gap-4">
            <Button>Hello</Button>
            <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-35 dark:text-white rounded-xl p-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white opacity-90 sm:tracking-tight">
                    Document Types
                </p>
                <div className={'xl:mx-10'}>
                    <Chart1
                        options={chart1.options}
                        series={chart1.series}
                        type="donut"
                        width={"100%"}
                    />
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-35 dark:text-white rounded-xl p-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white opacity-90 sm:tracking-tight">
                    Document Status
                </p>
                <div className={'xl:mx-10'}>
                    <Chart1
                        options={chart2.options}
                        series={chart2.series}
                        type="donut"
                        width={"100%"}
                    />
                </div>
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
