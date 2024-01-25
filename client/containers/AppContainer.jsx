import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

//TEMPORARY IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { saveDBActionCreator } from "../actions/actions";
import AlertBox from "../components/AlertBox";
//END TEMPORARY IMPORTS

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ErdVisualizerContainer from "../containers/ErdVisualizerContainer";
import MonitorContainer from "../containers/MonitorContainer";
import CustomRangesMonitor from "../components/monitors/RangeMonitor";
import PageContainer from "./PageContainer";
import SubheaderContainer from "./SubheaderContainer";
// import { response } from "express";
import MainContainer from "./MainContainer";

//////////////////////hay added for light/dark mode/////////////////////
// import { ThemeProvider } from '@emotion/react';
import { ColorModeContext, useMode } from "../components/stylesheets/Themes";
import { CssBaseline, ThemeProvider } from "@mui/material";

//for pull out drawer:
//   import Topbar from "./scenes/global/Topbar";

const AppContainer = () => {
  //light/dark mode
  const [theme, colorMode] = useMode();
  //for pullout drawer:
  //   const [isSideBar, setIsSideBar] = useState(true);
  /* <SideBar isSideBar={isSideBar} /> */

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDB = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch("/eboshi", requestOptions);
        const data = await response.json();
        console.log(data.dbArray);
        if (!response.ok) throw new Error(data.error || "Error from server");
        dispatch(saveDBActionCreator(data.dbArray));
      } catch (err) {
        console.log("AppContainer Mounted", err);
      }
    };
    fetchDB();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="AppContainer">
          <Header />
          <Box sx={{ display: "flex" }}>
            <SideBar />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <SubheaderContainer />
              <Box sx={{ ml: 4 }}>
                <PageContainer />
              </Box>
            </Box>
          </Box>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppContainer;







//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="AppContainer">
//           {/* <Box sx={{ display: "flex", flexDirection: "column" }}> */}
//           {/* <main className="content"> */}
//             <Header />
//             <Box sx={{ display: "flex" }}>
//               <SideBar sx={{ m: 0, p: 0 }} />
//               <Box sx={{ display: "flex", flexDirection: "column" }}>
//                 <SubheaderContainer />
//                 <PageContainer />
//                 {/* <MainContainer/> */}
//               </Box>
//             </Box>
//             {/* </Box> */}
//             {/* <ErdVisualizerContainer /> */}
//             {/* <MonitorContainer /> */}
//             {/* <CustomRangesMonitor /> */}
//           {/* </main> */}
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };