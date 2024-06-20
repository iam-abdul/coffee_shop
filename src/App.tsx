import "./App.css";
import { Routes, Route } from "react-router-dom";
import Shops from "./pages/shop_listing/Shop";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shops />} />
      </Routes>
    </>
  );
}

export default App;
