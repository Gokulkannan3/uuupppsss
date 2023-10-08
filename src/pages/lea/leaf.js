import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

import Navbar from "../Navi";
import Footer from '../Footer';
import './styles.css'
import imag from './icons/ups.png'
import u from './icons/ups.png'

const customIcon = new L.Icon({
  iconUrl: u,
  iconSize: [38, 38]
});

const Leaf = () => {
  const [locations, setLocations] = useState([]);
  const initialPosition = { latitude: 13.0299, longitude: 80.1681 };
  const mapCenter = [initialPosition.latitude, initialPosition.longitude];
  const zoomLevel = 15;

  useEffect(() => {
    // Fetch data from the API
    fetch("http://192.168.43.215:8080/rfid/getall")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLocations(data); // Update the state with fetched data
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 3000);

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="App">
        <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.lat, location.lon]}
              icon={customIcon}
            />
          ))}
        </MapContainer>
        <div className="w-50 flex justify-end mr-24 -translate-y-72 box-border w-50">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>AWB No</th>
                  <th>Product</th>
                  <th>Dispatch Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>123</td>
                  <td>Apple</td>
                  <td>YES</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>12</td>
                  <td>Orange</td>
                  <td>No</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>10</td>
                  <td>Grapes</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

let DefaultIcon = L.icon({
  iconUrl: imag,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default Leaf;
