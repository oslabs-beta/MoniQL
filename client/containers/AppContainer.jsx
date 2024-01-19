import * as React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ErdVisualizerContainer from "../containers/ErdVisualizerContainer";

const AppContainer = () => {
    return (
        <div classname = 'AppContainer'>
            <Header />
            <SideBar />
            <ErdVisualizerContainer />
        </div> 
    )
}

export default AppContainer;