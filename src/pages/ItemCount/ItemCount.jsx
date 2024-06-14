import { MDBBtn } from "mdb-react-ui-kit";

const ItemCount = ({ count, setCount }) => {

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count > 1 ? count - 1 : 1);
  };

  return (
    <>
      <div className="d-flex justify-content-evenly mb-3">
        <MDBBtn onClick={decrement} className="me-1" color="success">
          -
        </MDBBtn>
        <div className="d-flex align-items-center">
            <h6>{count}</h6>
        </div>
        <MDBBtn onClick={increment} className="ms-1" color="success">
          +
        </MDBBtn>
      </div>
    </>
  );
};

export default ItemCount;
