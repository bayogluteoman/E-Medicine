import React, { useState, useEffect } from "react";
import ProductService from "../services/productService";
import { Card, Input, Icon, Grid, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState("");

  const navigate = useNavigate();

  const detailPage = (id) => {
    navigate(`/productDetails/${id}`);
  };

  useEffect(() => {
    let allProducts = new ProductService();
    allProducts.getProducts().then((result) => {
      setProducts(result.data);
    });
    console.log(products);
  }, []);

  return (
    <div>
      <Input
        icon={<Icon name="search" inverted circular link />}
        placeholder="Search..."
        style={{ width: 250, marginLeft: 10 }}
        onChange={(event) => setFilteredData(event.target.value)}
      />
      <Grid
        relaxed
        columns={4}
        style={{ marginTop: 5, marginLeft: 10, marginBottom: 10 }}
      >
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
          .map((e) => (
            <Grid.Column>
              <Card
                onClick={() => {
                  detailPage(e.medicineId);
                }}
                style={{ width: "100%", height:"100%"}}
              >
                <Image
                  src={e.medicineImageUrl}
                  style={{ width: "100%", height:"90%", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header  style={{ width: "100%", height:"10%", backgroundSize: "cover" }}>{e.medicineName}</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
}
