import { useState, useEffect } from "react";
import { getAllItemsService } from "../../services/ItemServices.js";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContex.jsx";

const Home = () => {
  const { searchQuery } = useSearch();
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getAllItemsService();
        if (response.status === 200) {
          setItemsData(response.data);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    };
    getUserData();
  }, []);

  const visibleItems = searchQuery
    ? itemsData.filter((item) =>
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : itemsData;

  const defaultImage =
    "https://c8.alamy.com/comp/2T7P05K/mansfieldnottinghamunited-kingdom-16th-november-2023studio-product-image-of-johnsons-kids-shampoo-on-white-background-2T7P05K.jpg";
  return (
    <>
      <div className="d-flex flex-row flex-wrap justify-content-center mt-5">
        {visibleItems.map((product) => (
          <div className="card" style={{ width: "20rem" }} key={product._id}>
            <img
              className="card-img-top"
              style={{ maxHeight: "300px" }}
              src={product.image || defaultImage}
              alt={product.product_name}
            />
            <div className="card-body">
              <h5 className="card-title">{product.product_name}</h5>
              <p className="card-text">{product.description}</p>
              <Link to={`/item/${product._id}`} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="d-flex justify-content-center">
        Elaborado por: Ing.Katia Valle
      </p>
    </>
  );
};

export default Home;
