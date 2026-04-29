import { Outlet } from "react-router-dom";
import PopupDialog from "./components/PopupDialog/PopupDialog";
import Navbar from "./components/layout/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-shell">
        <Outlet />
      </main>
      <PopupDialog />
    </div>
  );
}

export default App;
