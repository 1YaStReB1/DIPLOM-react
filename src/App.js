import Marking from "./components/Marking/Marking";
import NavBar from "./components/Navbar/NavBar";
import Settings from "./components/Settings/Settings";
import { Route, Routes, Link } from "react-router-dom";
import "./styles/app.scss";
import OpticalFlow from "./components/OpticalFlow/OpticalFlow";
function App() {
  return (
    <div className="app">
      {/* <NavBar /> */}
      {/* <Marking/> */}
      {/* <Settings/> */}
      <Routes>
      <Route  path="/" element={<NavBar/>}>
        
          <Route index element={<Marking />} />
          <Route path="/opt" element={<OpticalFlow />} />
          <Route path="/settings" element={<Settings />} />
          
      </Route>
      </Routes>
    </div>
  );
}

export default App;
