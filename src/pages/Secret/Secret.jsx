import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";
import { MDBBtn } from 'mdb-react-ui-kit';


function Secret () {
    const { userPayload } = useAuthContext()
  
    return (
      <>
        <h1 className="text-center my-5">Secret</h1>
  
        {userPayload?.role === 'ADMIN' && <h4 className="text-center mb-5">Bienvenido Admin</h4>}
  
        {userPayload?.role === 'CUSTOMER' && <h4 className="text-center">Bienvenido Customer</h4>}

        {userPayload?.role === 'ADMIN'
          ? <div className="d-flex justify-content-center"><Link to={"/newproducto"}><MDBBtn color="success">Create product</MDBBtn></Link></div>
          : <div className="d-flex justify-content-center"><h2 className="text-center"></h2></div>}

      </>
    )
  }
  
  export default Secret