import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MedicinePharmaciesService from "../services/medicinePharmaciesService";
import ReactMapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import icon from "../images/location.png";
import { Modal, Header } from "semantic-ui-react";
import Headerr from "../components/Header";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer, pharmacy: action.pharmacy, phone: action.phone };
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

export default function ProductDetails() {
  const [pharmacies, setPharmacies] = useState([]);
  const { id } = useParams();
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer, pharmacy, phone } = state;

  const [viewport, setViewport] = useState({
    latitude: 39.77377,
    longitude: 30.50773,
    width: "100vw",
    height: "90vh",
    zoom: 12,
  });

  useEffect(() => {
    async function fetchData() {
      let medicinePharmacies = new MedicinePharmaciesService();
      await medicinePharmacies.getMedicinePharmaciesService(id).then((e) => {
        setPharmacies(e.data);
      });
    }
    fetchData();
  }, []);

  console.log(pharmacies);

  return (
    <div>
      <Headerr />
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/tt33/ckxdo9ja1f16x14pat4at3xos"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {pharmacies.map((result) => (
          <Marker
            latitude={result.locationLatitude}
            longitude={result.locationLongitude}
            onClick={() => dispatch({ type: "OPEN_MODAL", dimmer: 'blurring', pharmacy: result.pharmacyName, phone: result.pharmacyPhone})}
          >
            <img
              src={icon}
              style={{ width: 40, height: 40 }}
              alt={result.pharmacyId}
            />
            <Modal
              dimmer={dimmer}
              size="mini"
              open={open}
              onClose={() => dispatch({ type: "CLOSE_MODAL" })}
            >
              <Modal.Header>Pharmacy Information</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>Pharmacy Name: {pharmacy}</Header>
                  <p>Pharmacy Phone: {phone}</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Marker>
        ))}

        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </ReactMapGL>
    </div>
  );
}
