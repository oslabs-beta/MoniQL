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
      <Box sx={{ ml: 2, mt:0, zIndex: 3, backgroundColor: "#6870fa", borderRadius: 3, opacity: '80%' }}>
        <Focus sx={{ zIndex: 2 }} />
      </Box>
    </div>
  );
};

export default ErdVisualizerContainer;