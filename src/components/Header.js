import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import LoginServices from "../services/loginServices";
import Typical from "react-typical";

export default class Header extends Component {
  state = { activeItem: "home", isPharmacist: false };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = () => {
    let loginService = new LoginServices();
    loginService.logout();
    this.setState({ isPharmacist: false });
  };

  render() {
    const { activeItem } = this.state;
    const isPharmacist = localStorage.getItem("role");
    const pharmacistName = localStorage.getItem("userName");
    const pharmacistSurname = localStorage.getItem("userSurname");

    return (
      <div>
        <Segment inverted style={{ borderRadius: 0 }}>
          <Menu secondary inverted>
            <Menu.Item
              name="home"
              as={Link}
              to="/"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />

            {isPharmacist ? (
              <Menu.Item
                name="products"
                as={Link}
                to="/products"
                active={activeItem === "products"}
                onClick={this.handleItemClick}
              />
            ) : null}

            <Menu.Item
              name="pharmacies"
              as={Link}
              to="/pharmacies"
              active={activeItem === "pharmacies"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              style={{ fontSize: 20, fontStyle: "italic", marginLeft: 550 }}
            >
              {isPharmacist ? (
                <Typical
                  steps={[
                    "Hello",
                    500,
                    pharmacistName + " " + pharmacistSurname + " 👋",
                    1000,
                  ]}
                  loop={Infinity}
                  wrapper="span"
                />
              ) : null}
            </Menu.Item>

            <Menu.Menu position="right">
              {isPharmacist ? (
                <Menu.Item
                  as={Link}
                  to="/"
                  name="Logout"
                  active={activeItem === "logout"}
                  onClick={this.handleItemClick && this.handleLogout}
                />
              ) : (
                <>
                  <Menu.Item
                    as={Link}
                    to="/login"
                    name="Login"
                    active={activeItem === "login"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    as={Link}
                    to="/signup"
                    name="Sign up"
                    active={activeItem === "signup"}
                    onClick={this.handleItemClick}
                  />
                </>
              )}
            </Menu.Menu>
          </Menu>
        </Segment>
      </div>
    );
  }
}
