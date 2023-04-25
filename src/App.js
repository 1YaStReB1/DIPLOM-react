
import Marking from "./components/Marking/Marking";
import NavBar from "./components/Navbar/NavBar";
import Settings from "./components/Settings/Settings";
import "./styles/app.scss";
function App() {
  return (
    <div className="app">
      <NavBar />
      <Marking/>
      {/* <Settings/> */}
    </div>
  );
}

export default App;
