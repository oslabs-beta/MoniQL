import React from 'react';
import { useSelector } from 'react-redux'; 
import AlertBox from '../components/AlertBox';

const ReportContainer = () => {

        // here to below will have to go in the alerts container 
        const alertsArr = useSelector((state) => state.alert.alerts);
        console.log('alertsArr in appcontainer', alertsArr);
        
        const anomalies = alertsArr.map((alertObj) => AlertBox(alertObj));
        // to here
    

    return(
    <div>
        <h1>Reports Will Go Here</h1>
        {anomalies}
    </div>
    )
}

export default ReportContainer;