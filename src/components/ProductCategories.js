import React from "react";
import { Divider } from "semantic-ui-react";
import AllProducts from "./AllProducts";

const ProductCategories = () => (
  <div>
    <label style={{ padding: 50, fontSize: 25, color: "orange" }}>
      Medicines
    </label>

    <Divider />
    <AllProducts />
  </div>
);

export default ProductCategories;
