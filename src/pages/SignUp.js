import React, { useState } from "react";
import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { Form, Input } from "formik-semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import RegisterService from "../services/registerService";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headerr from "../components/Header";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useNavigate();

  const initialValues = {
    userName: "",
    userSurname: "",
    userMail: "",
    pharmacyPhone: "",
    userPassword: "",
    pharmacyName: "",
    locationLatitude: "",
    locationLongitude: "",
  };

  const schema = Yup.object({
    userName: Yup.string(),
    userSurname: Yup.string(),
    userMail: Yup.string(),
    pharmacyPhone: Yup.string(),
    userPassword: Yup.string(),
    pharmacyName: Yup.string(),
    locationLatitude: Yup.number(),
    locationLongitude: Yup.number(),
  });

  let registerService = new RegisterService();

  return (
    <div>
    <Headerr/>
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        registerService
          .register(values)
          .then(() => {
            setSuccessMessage(
              toast.success("You have successfully registered", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              })
            );
            setTimeout(() => history("/"), 1000);
          })
          .catch((err) => {
            setErrorMessage(
              toast.error("Please try again !", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              })
            );
            resetForm();
            
          });
      }}
    >
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 350 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Create your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First name"
                name="userName"
              />

              <Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last name"
                name="userSurname"
              />

              <Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                name="userMail"
              />

              <Input
                fluid
                icon="phone"
                iconPosition="left"
                placeholder="Phone"
                name="pharmacyPhone"
              />

              <Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="userPassword"
              />

              <Input
                fluid
                icon="home"
                iconPosition="left"
                placeholder="Pharmacy Name"
                name="pharmacyName"
              />

              <Input
                fluid
                icon="map"
                iconPosition="left"
                placeholder="Latitude"
                name="locationLatitude"
              />

              <Input
                fluid
                icon="map"
                iconPosition="left"
                placeholder="Longitude"
                name="locationLongitude"
              />
              <Button type="submit" color="teal" fluid size="large">
                Sign up
              </Button>
              
              <ToastContainer transition={Slide}/>
             
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Formik>
    </div>
  );
}
