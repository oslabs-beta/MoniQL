import React from 'react';
import { useSelector } from 'react-redux'; 
import AlertBox from '../components/AlertBox';

const AlertContainer = () => {

        const alertsArr = useSelector((state) => state.alert.alerts);
        console.log('alertsArr in reportcontainer', alertsArr);
        
        let anomalies = alertsArr.sort((a, b) => b.anomalyTime - a.anomalyTime);
        anomalies = anomalies.map((alertObj, i) => <AlertBox key={i} {...alertObj}/>);

    return(
    <div>
        {anomalies}
    </div>
    )
}

export default AlertContainer;