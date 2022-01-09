import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ReactMapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  mapboxgl
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import icon from "../images/location.png";
import PharmacyService from "../services/pharmacyService";
import PharmacyMedicineService from "../services/pharmacyMedicinesService";
import { Modal } from "semantic-ui-react";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        open: true,
        dimmer: action.dimmer,
        pharmacyName: action.pharmacyName,
        phone: action.phone,
      };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};

export default function Pharmacies() {
  const [pharmacy, setPharmacy] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer, pharmacyName, phone } = state;


  useEffect(() => {
    let pharmacyService = new PharmacyService();
    pharmacyService.getPharmacy().then((result) => setPharmacy(result.data));
  }, []);

  async function fetchMedicine(id) {
    let pharmacyMedicine = new PharmacyMedicineService();
    pharmacyMedicine.getPharmacyMedicinesService(id).then((result) => {
      const test = result.data.map((e) => {
        return { key: e.medicineId, medicineName: e.medicineName };
      });
      setMedicine(test);
      console.log(medicine);
    });
  }

  const [viewport, setViewport] = useState({
    latitude: 39.77377,
    longitude: 30.50773,
    width: "100vw",
    height: "90vh",
    zoom: 14,
  });

  return (
    <div>
      <Header />

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/tt33/ckxdo9ja1f16x14pat4at3xos"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {pharmacy.map((result) => (
          <Marker
            latitude={result.locationLatitude}
            longitude={result.locationLongitude}
            onClick={() =>
              fetchMedicine(result.pharmacyId) &&
              dispatch({
                type: "OPEN_MODAL",
                pharmacyName: result.pharmacyName,
                phone: result.pharmacyPhone,
              })
            }
          >
            <img
              src={icon}
              style={{ width: 40, height: 40 }}
              alt={result.pharmacyId}
            />
          </Marker>
        ))}

        <Modal
          dimmer={dimmer}
          size="mini"
          open={open}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        >
          <Modal.Header>Pharmacy Information</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Pharmacy Name: {pharmacyName}</p>
              <p>Pharmacy Phone: {phone}</p>
              <p>Medicines: </p>
              {medicine.map((res) => (
                <ul>
                  <li>{res.medicineName}</li>
                </ul>
              ))}
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </ReactMapGL>
    </div>
  );
}
