import { useNavigate } from "react-router-dom";
import { createItem } from "../../services/ItemServices";
import { useForm } from "react-hook-form";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "../NewProduct/NewProducto.css";
import Swal from 'sweetalert2';

function NewProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const categories = [
    "Books",
    "Movies",
    "Music",
    "Games",
    "Electronics",
    "Computers",
    "Home",
    "Garden",
    "Tools",
    "Grocery",
    "Health",
    "Beauty",
    "Toys",
    "Kids",
    "Baby",
    "Clothing",
    "Shoes",
    "Jewelery",
    "Sports",
    "Outdoors",
    "Automotive",
    "Industrial",
  ];

  const onSubmit = async (data) => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      return;
    }

    try {
      await createItem(jwtToken, data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tu producto se ha creado con éxito",
        showConfirmButton: false,
        timer: 1500
      });
      reset(); // Limpia los campos del formulario después del envío exitoso
      navigate("/");
    } catch (error) {
      console.error("Hubo un error al agregar el producto:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar el producto',
        text: 'Hubo un error al agregar el producto.',
      });
    }
  };

  return (
    <div className="form-new-product w-100 m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-center my-3">
          <MDBIcon fas icon="shopping-basket" size="5x" />
        </div>
        <div className="d-flex justify-content-center my-3">
          <h1 className="h3 mb-3 fw-normal">Create Product</h1>
        </div>

        <input
          {...register("product_name", { required: true })}
          className="mb-3 form-control"
          placeholder="Product name"
        />
        {errors.product_name && (
          <p className="error">El nombre del producto es requerido</p>
        )}

        <textarea
          {...register("description", { required: true })}
          className="mb-3 form-control"
          placeholder="Description"
        />
        {errors.description && (
          <p className="error">La descripción es requerida</p>
        )}

        <input
          {...register("price", { required: true })}
          type="number"
          className="mb-3 form-control"
          placeholder="Price"
        />
        {errors.price && <p className="error">El precio es requerido</p>}

        <select
          {...register("category", { required: true })}
          className="mb-3 form-select"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="error">La categoría es requerida</p>}

        <input
          {...register("brand", { required: true })}
          className="mb-3 form-control"
          placeholder="Brand"
        />
        {errors.brand && <p className="error">La marca es requerida</p>}

        <input
          {...register("sku", { required: true })}
          className="mb-3 form-control"
          placeholder="SKU"
        />
        {errors.sku && <p className="error">El SKU es requerido</p>}

        <input
          {...register("image", { required: true })}
          className="mb-3 form-control"
          placeholder="Image URL"
        />
        {errors.image && (
          <p className="error">La URL de la imagen es requerida</p>
        )}

        <div className="d-flex justify-content-center">
          <MDBBtn color="success"  type="submit">
            Add Product
          </MDBBtn>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
