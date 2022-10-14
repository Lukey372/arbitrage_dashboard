import React, { Component } from "react";
import Chart from "react-apexcharts";






export default function DataChart(props: {
    trades: any[];
    setTrades: any;
    timeConverter:any
  }) {
    const { trades,timeConverter } = props;
    const options = {
        colors: ["#FF1654"],
       
    }

   
    let tab:any = []
    trades.map((trade) => {tab.push((trade.profit*1700).toFixed(2))})
    console.log(tab)
    let series = [
        {
            data: tab
        }
    ]
    return (

        <Chart
            options={options}
            series={series}
            width="100%"
            height="100%"
        />

    );
}


