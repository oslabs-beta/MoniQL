import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import AlertBox from '../components/AlertBox';

const AlertContainer = () => {
  const alerts = useSelector((state) => state.alert.alerts);
  const displayAlertsArrFromState = useSelector((state) => state.alert.displayAlerts);

  const [displayAlertsArr, setDisplayAlertsArr] = useState(displayAlertsArrFromState);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    const sortedAlerts = displayAlertsArrFromState.sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at));
    setDisplayAlertsArr(sortedAlerts);
    const anomaliesAsComponents = sortedAlerts.map((alertObj, i) => <AlertBox key={i} {...alertObj}/>);
    setAnomalies(anomaliesAsComponents);
  }, [alerts, displayAlertsArrFromState]);

  // allow user to filter alerts by
  // table
  // column
  // monitorType
  // resolved / not
  // dismissed / not
  // date

  // pull from state - alert.filterBy
  // filter anomalies thusly

  return(
    <div>
      {anomalies}
    </div>
  )
}

export default AlertContainer;