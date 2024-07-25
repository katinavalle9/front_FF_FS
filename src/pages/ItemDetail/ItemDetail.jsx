import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneItemService } from "../../services/ItemServices";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import { useCart } from "../../context/CartContext";
import "../ItemDetail/ItemDetail.css";

function ItemDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const response = await getOneItemService(id);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetail();
  }, [id]); // Dependencia id para re-fetch si el id cambia

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center pt-2">
      <h3>Product Detail</h3>
      <div className="d-flex row row-cols-2 row-cols-md-4 g-4 my-3 px-5 justify-content-center custom-no-gutter-x">
        <MDBCard className="product-detail-card">
          <MDBCardImage
            src={product.image}
            alt={product.product_name}
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle>{product.product_name}</MDBCardTitle>
            <MDBCardText>Description: {product.description}</MDBCardText>
            <MDBCardText>Price: ${product.price}</MDBCardText>
            <MDBCardText>Category: {product.category_name}</MDBCardText>
            <ItemCount count={count} setCount={setCount} />
            <div className="d-flex justify-content-center">
              <MDBBtn
                className="me-1"
                onClick={() => addToCart(product, count)}
                color="warning"
              >
                Add to cart
              </MDBBtn>
            </div>
          </MDBCardBody>
          <div className="mb-3 d-flex justify-content-center">
            <Link to="/">Volver</Link>
          </div>
        </MDBCard>
      </div>
    </div>
  );
}

export default ItemDetail;
