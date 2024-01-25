// import * as React from "react";
// import { Box, Container } from "@mui/material";
// // import ErdVisualizer from "../components/ErdVisualizer";
// import Focus from "../components/Focus";
// import FocusBar from "../components/FocusBar";

// const ErdVisualizerContainer = () => {
//   return (
//     <div>
//       <Container maxWidth="sm">
//         <Box
//           display="flex"
//           justifyContent="center"
//           sx={{
//             border: "pink",
//             // position: "fixed",
//             // marginLeft: "200px",
//             // top: "50px",
//             // width: "calc(99% - 150px)",
//             height: "100vh",
//             backgroundColor: "#222130",
//             // zIndex: 1,
//           }}
//         >
//           <FocusBar />

//           {/* <ErdVisualizer/> */}
//           <Focus />
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default ErdVisualizerContainer;

import * as React from "react";
import { Box, Container } from "@mui/material";
// import ErdVisualizer from "../components/ErdVisualizer";
import Focus from "../components/Focus";
import FocusBar from "../components/FocusBar";  

const ErdVisualizerContainer = () => {
  return (
    <div>
      {/* <Box
        display="flex"
        justifyContent="center"
        sx={{
            border: "pink",
          position: "fixed",
          marginLeft: "200px",
          top: "50px",
          width: "calc(99% - 150px)",
          height: "100vh",
          backgroundColor: "DarkSlateGray",
          zIndex: 1,
        }}
      > */}
      {/* <ErdVisualizer/> */}

      {/* </Box> */}
      {/* <Box sx={{ backgroundColor: "pink" }}> */}
      <Box sx={{ ml: 4, zIndex: 2 }}>
        <Focus sx={{ zIndex: 2 }} />
      </Box>
    </div>
  );
};

export default ErdVisualizerContainer;