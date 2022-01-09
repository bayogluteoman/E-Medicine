import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Card, Grid, Icon, Button, Modal, Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import MedicineService from "../services/addMedicine";
import { Formik, Field } from "formik";
import { Form } from "formik-semantic-ui-react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getPharmacistService from "../services/getPharmacistService";
import getPharmacyMedicine from "../services/getPharmacyMedicine";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [pharmacyId, setPharmacyId] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  const notify = () => {
    toast.success("You have successfully add new medicine.", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  let saveMedicine = new MedicineService();

  const navigate = useNavigate();

  const detailPage = (id) => {
    navigate(`/productDetails/${id}`);
  };

  useEffect(() => {
    let pharmacyMedicine = new getPharmacyMedicine();
    pharmacyMedicine.getPharmacyMedicine(pharmacyId).then((result) => {
      const test = result.data.map((e) => {
        return { key: e.medicineId, medicineName: e.medicineName, url: e.medicineImageUrl };
      });
      setProducts(test);
    });
  }, [products, pharmacyId]);

  useEffect(() => {
    let pharmacistService = new getPharmacistService();
    pharmacistService
      .getPharmacist(localStorage.getItem("userMail"))
      .then((result) => {
        setPharmacyId(result.data.pharmacy.pharmacyId);
      });
  }, [pharmacyId]);

  return (
    <div>
      <Header />
      <div style={{ padding: 20 }}>
        <Input
          icon={<Icon name="search" inverted circular link />}
          placeholder="Search..."
          style={{ width: 250, marginRight: 10 }}
          onChange={(event) => setFilteredData(event.target.value)}
        />

        <Button
          onClick={() => dispatch({ type: "OPEN_MODAL", dimmer: "blurring" })}
        >
          Add Medicine
        </Button>

        <Modal
          dimmer={dimmer}
          open={open}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        >
          <Modal.Header>New Medicine</Modal.Header>
          <Modal.Content>
            <Formik
              initialValues={{
                medicineName: "",
                medicineDescription: "",
                medicineImageUrl: "",
              }}
              onSubmit={(values, { resetForm }) => {
                saveMedicine
                  .postMedicine(values, pharmacyId)
                  .then(() => {
                    console.log(values);
                    resetForm();
                  })
                  .catch((err) => {
                    resetForm();
                    console.log(err);
                  });
              }}
            >
              <Form>
                <label htmlFor="sadsd">Medicine Name</label>
                <Field
                  id="medicineName"
                  name="medicineName"
                  placeholder="Medicine Name"
                  style={{ marginBottom: 20 }}
                />

                <label htmlFor="lastName">Medicine Description</label>
                <Field
                  id="medicineDescription"
                  name="medicineDescription"
                  placeholder="Medicine Description"
                  style={{ marginBottom: 20 }}
                />

                <label htmlFor="email">Medicine Image Url</label>
                <Field
                  id="medicineImageUrl"
                  name="medicineImageUrl"
                  placeholder="Medicine Image Url"
                  style={{ marginBottom: 20 }}
                />
                <Button positive type="submit" onClick={notify}>
                  Submit
                </Button>
                <ToastContainer transition={Flip} />
              </Form>
            </Formik>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>

        <Grid relaxed columns={4} style={{ marginTop: 10 }}>
          {products
            .filter((result) => {
              if (
                result.medicineName
                  .toLowerCase()
                  .includes(filteredData.toLowerCase())
              ) {
                return result;
              }
            })
            .map((result, index) => (
              <Grid.Column>
                <Card
                  onClick={() => {
                    detailPage(result.key);
                  }}
                  image={result.url}
                  header={result.medicineName}
                />
              </Grid.Column>
            ))}
        </Grid>
      </div>
    </div>
  );
}
