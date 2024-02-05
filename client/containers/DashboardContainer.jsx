import React from "react";
import DashTableOfTables from "../components/DashTableOfTables";
import DashAlertLineChart from "../components/DashAlertLineChart";
import DashAlertBarChart from "../components/DashAlertBarChart";

const DashboardContainer = () => {

  return (
    <div>
      <h1>Dashboard</h1>
      <DashAlertLineChart />  
      <DashAlertBarChart />
      <DashTableOfTables />
    </div>
  )
};

export default DashboardContainer;