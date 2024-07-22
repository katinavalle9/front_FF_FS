import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import { useAuthContext } from "../../hooks/useAuth.jsx";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext.jsx";

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleClearCart = () => {
    // Limpiar el carrito
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    // Usa SweetAlert para mostrar una notificación de compra exitosa
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Compra exitosa",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      handleClearCart(); // Limpiar el carrito después de la alerta
      navigate("/"); // Redirigir al usuario al inicio
    });
  };

  const totalCart = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container pt-5">
      <div className="row ">
        <Link
          to="/"
          className="color-link ripple ripple-surface btn btn-warning d-flex w-25 h-100 justify-content-center"
        >
          Agregar producto
        </Link>
        <MDBTable style={{ minWidth: "22rem" }}>
          <MDBTableHead>
            <tr>
              <th scope="col" className="fw-bold">
                Producto
              </th>
              <th scope="col" className="fw-bold">
                Precio U
              </th>
              <th scope="col" className="fw-bold">
                Cantidad
              </th>
              <th scope="col" className="fw-bold">
                Precio
              </th>
              <th scope="col" className="fw-bold">
                Acción
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <MDBBtn
                    color="danger"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
        <div className="d-flex justify-content-center">
          <p className="mb-5">Total : ${totalCart.toFixed(2)} </p>
        </div>
        <div className="col-12 col-sm-6 mb-3 d-flex flex-column justify-content-center align-items-center mx-auto">
          <MDBBtn onClick={handleClearCart} block color="info" size="md">
            Limpiar carrito
          </MDBBtn>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6 mb-3 d-flex flex-column justify-content-center mx-auto">
          {isAuth ? (
            <MDBBtn color="success" size="md" onClick={handleCheckout}>
              Checkout
            </MDBBtn>
          ) : (
            <Link className="btn btn-warning" to="/login">
              Log in para continuar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
