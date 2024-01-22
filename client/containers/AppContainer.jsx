import React, {useEffect, useState} from "react";

//TEMPORARY IMPORTS
import { useDispatch } from "react-redux";
import { saveDBActionCreator } from "../actions/actions";
//END TEMPORARY IMPORTS

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ErdVisualizerContainer from "../containers/ErdVisualizerContainer";
// import { response } from "express";

const AppContainer = () => {
    //circumvent sign-in for testing
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const fetchDB = async () => {
    //         try {
    //             const requestOptions = {
    //                 method: "GET",
    //                 headers: {"Content-Type": "application/json"},
    //             };
    //             const response = await fetch('/eboshi', requestOptions);
    //             const data = await response.json();
    //             console.log(data.dbArray)
    //             if (!response.ok) throw new Error(data.error || 'Error from server');
    //             dispatch(saveDBActionCreator(data.dbArray));
    //         } catch (err) {
    //             console.log('AppContainer Mounted', err);
    //         }
    //     };
    //     fetchDB();
    // }, []);



    return (
        <div className = 'AppContainer'>
            {/* <Header />
            <SideBar /> */}
            <ErdVisualizerContainer />
        </div> 
    )
}

export default AppContainer;