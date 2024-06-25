import classes from "./viewOnMap.module.css";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useSearchParams } from "react-router-dom";

const ViewOnMap = () => {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const name = searchParams.get("name");

  if (!lat || !long) {
    return <div>Please provide co-ordinates</div>;
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(long);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38], // size of the icon
  });
  return (
    <div className={classes.parent}>
      <div id="map">
        <MapContainer center={[latitude, longitude]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[latitude, longitude]} icon={customIcon}>
            <Popup>{name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ViewOnMap;
