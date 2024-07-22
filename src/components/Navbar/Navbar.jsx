import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import CartWidget from "../CartWidget/CartWidget";
import { useCart } from "../../context/CartContext";
import { useAuthContext } from "../../hooks/useAuth";
import logo from "../../assets/logo-new.jpg";

const Navbar = () => {
  const { isAuth, logout } = useAuthContext();
  const { itemCount } = useCart();

  return (
    <MDBNavbar
      expand="lg"
      light
      bgColor="light"
      sticky
      className="custom-no-gutter-x"
    >
      <MDBContainer fluid>
        {/* Logo */}
        <MDBNavbarBrand as="div">
          <Link to="/">
            <img
              src={logo}
              height="50"
              className="ms-5"
              alt="MDB Logo"
              loading="lazy"
            />
          </Link>
        </MDBNavbarBrand>

        {/* Search Component */}
        <MDBNavbarItem className="d-flex w-auto">
          <Search />
        </MDBNavbarItem>

        {/* CartWidget Component */}
        <MDBNavbarItem className="d-flex w-auto me-5">
          <CartWidget key={itemCount} />
        </MDBNavbarItem>

        {isAuth ? (
          <>
            <MDBNavbarLink tag="div">
              <Link to="/secret">Secret</Link>
            </MDBNavbarLink>

            <MDBNavbarLink tag="div">
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </MDBNavbarLink>
          </>
        ) : (
          // Mostrar Login y SignUp si el usuario no está autenticado
          <>
            <MDBNavbarLink tag="div">
              <Link to={`/login`}>Login</Link>
            </MDBNavbarLink>
            <MDBNavbarLink tag="div">
              <Link className="color-link" to={`/signup`}>
                SignUp
              </Link>
            </MDBNavbarLink>
          </>
        )}
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
