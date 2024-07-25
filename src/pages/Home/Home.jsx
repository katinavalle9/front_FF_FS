import { useState, useEffect } from "react";
import { getAllItemsService } from "../../services/ItemServices.js";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContex.jsx";
import "../Home/Home.css";

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
    ? itemsData.filter((item) => {
        const hasName = item.name !== undefined && item.product_name !== null;
        const hasQuery = searchQuery !== undefined && searchQuery !== null;
        if (!hasName || !hasQuery) {
          console.log("Item o query inválido:", { item, searchQuery });
        }
        return (
          hasName &&
          hasQuery &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : itemsData;

  return (
    <>
      <div className="d-flex flex-row flex-wrap justify-content-center mt-5">
        {visibleItems.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image-container">
              <img
                className="product-image"
                style={{ maxHeight: "300px" }}
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <Link to={`/item/${product._id}`} className="details-button">
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
