import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Label,
} from "semantic-ui-react";
import { Form, Input } from "formik-semantic-ui-react";

import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoginService from "../services/loginServices";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headerr from "../components/Header";

export default function Login() {
  let loginService = new LoginService();
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const initialValues = {
    username: "",
    password: "",
  };

  const schema = Yup.object({
    username: Yup.string().required("Username should be filled."),
    password: Yup.string()
      .required("No password provided.")
      .min(5, "Password is too short - should be 5 chars minimum."),
  });

  return (
    <div>
    <Headerr/>
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        loginService
          .login(values)
          .then((result) => {
            console.log(result);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("userMail", result.data.userDto.userMail);
            localStorage.setItem("userName", result.data.userDto.userName);
            localStorage.setItem("userSurname", result.data.userDto.userSurname);
            var decoded = jwt.decode(result.data.token, { complete: true });
            localStorage.setItem("role", decoded.payload.isPharmacist);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${result.data.token}`;
            if (result.data.token) {
              setSuccessMessage(
                toast.success("Successfully Login", {
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
            }
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
            <Image src={logo} /> Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="username"
              />
              <Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
              />

              <ErrorMessage
                name="password"
                render={(error) => (
                  <Label pointing basic color="red" content={error}></Label>
                )}
              ></ErrorMessage>

              <Button type="submit" color="teal" fluid size="large">
                Login
              </Button>
              <ToastContainer transition={Slide} />
            </Segment>
          </Form>

        </Grid.Column>
      </Grid>
    </Formik>
    </div>
  );
}
