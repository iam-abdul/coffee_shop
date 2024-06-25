import "./App.css";
import { Routes, Route } from "react-router-dom";
import Shops from "./pages/shop_listing/Shop";
import ShopDetailed from "./components/shop/ShopDetailed";
import ViewOnMap from "./pages/Maps/ViewOnMap";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shops />} />
        <Route path="/shop/:id" element={<ShopDetailed />} />
        <Route path="/shop/:id/map" element={<ViewOnMap />} />
      </Routes>
    </>
  );
}

export default App;
