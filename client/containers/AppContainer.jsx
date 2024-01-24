import React, {useEffect, useState} from "react";

//TEMPORARY IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { saveDBActionCreator } from "../actions/actions";
import AlertBox from "../components/AlertBox";
//END TEMPORARY IMPORTS

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ErdVisualizerContainer from "../containers/ErdVisualizerContainer";
// import { response } from "express";

const AppContainer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchDB = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                };
                const response = await fetch('/eboshi', requestOptions);
                const data = await response.json();
                // console.log(data.dbArray)
                if (!response.ok) throw new Error(data.error || 'Error from server');
                dispatch(saveDBActionCreator(data.dbArray));
            } catch (err) {
                console.log('AppContainer Mounted', err);
            }
        };
        fetchDB();
    }, []);

    // here to below will have to go in the alerts container 
    const alertsArr = useSelector((state) => state.alert.alerts);
    console.log('alertsArr in appcontainer', alertsArr);
    
    const anomalies = alertsArr.map((alertObj) => AlertBox(alertObj));
    // to here

    return (
        <div className = 'AppContainer'>
            {anomalies}
            {/* <Alert_ severity="error"/> */}
            {/* <Header />
            <SideBar /> */}
            {/* <ErdVisualizerContainer /> */}
        </div> 
    )
}

export default AppContainer;