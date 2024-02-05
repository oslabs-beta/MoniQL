import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import AlertBox from '../components/AlertBox';

const AlertContainer = () => {

  const alertsArr = useSelector((state) => state.alert.alerts);
  const anomalies = alertsArr.map((alertObj, i) => <AlertBox key={i} {...alertObj}/>);

  // allow user to filter alerts by
  // table
  // column
  // monitorType
  // resolved / not
  // dismissed / not
  // date

  return(
    <div>
      {anomalies}
    </div>
  )
}

export default AlertContainer;