// import logo from './logo.svg';
// import './App.css';
// import Url from './Components/Url';

// function App() {
//   return (
//     <div className="App">
//       <Url/>
//     </div>
//   );
// }

// export default App;


import React from "react";
import Url from "../src/Components/Url";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <Url />
    </Container>
  );
}

export default App;

