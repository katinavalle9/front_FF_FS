import { MDBIcon, MDBNavbarLink, MDBBadge } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";

const CartWidget = () => {
  const { itemCount } = useCart();

  useEffect(() => {
    console.log("Cart item count has changed:", itemCount);
  }, [itemCount]);

  return (
    <>
      <MDBNavbarLink
        tag="div"
        color="light"
        className="ripple ripple-surface ripple-surface-dark btn btn-light"
      >
        <Link to={"cart"} className="d-flex flex-column w-100 h-100 px-2">
          <MDBBadge pill color="danger">
            {itemCount}
          </MDBBadge>
          <span>
            <MDBIcon fas icon="shopping-cart" size="sm"></MDBIcon>
          </span>
        </Link>
      </MDBNavbarLink>
    </>
  );
};

export default CartWidget;
