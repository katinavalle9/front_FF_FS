import { useState, useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { useAuthContext } from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar los ítems del carrito desde el localStorage al montar el componente
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const handleClearCart = () => {
    // Limpiar el carrito
    localStorage.setItem('cartItems', JSON.stringify([]));
    setCartItems([]);
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    // Usa SweetAlert para mostrar una notificación de compra exitosa
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Compra exitosa',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      // Esto se ejecutará después de que el timer haya finalizado
      handleClearCart(); // Limpiar el carrito después de la alerta

      navigate('/'); // Redirigir al usuario al inicio
    });
  };

  const totalCart = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container pt-5">
      <div className="row ">
        <Link to="/" className="color-link ripple ripple-surface btn btn-warning d-flex w-25 h-100 justify-content-center">
          Agregar producto
        </Link>
        <MDBTable style={{ minWidth: "22rem" }}>
          <MDBTableHead>
            <tr>
              <th scope="col" className="fw-bold">Producto</th>
              <th scope="col" className="fw-bold">Precio U</th>
              <th scope="col" className="fw-bold">Cantidad</th>
              <th scope="col" className="fw-bold">Precio</th>
              <th scope="col" className="fw-bold">Acción</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <MDBBtn color='danger' onClick={() => handleRemoveItem(item.id)}>
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
            <MDBBtn color="warning" size="md">
              <Link className="color-link" to="/login">
                Log in para continuar
              </Link>
            </MDBBtn>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
