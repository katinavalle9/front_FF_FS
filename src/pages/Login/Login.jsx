import { useNavigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../hooks/useAuth";
import { loginUserServices } from "../../services/useServices";
import "../Login/Login.css";
import { MDBIcon } from "mdb-react-ui-kit";

const Login = () => {
  const { login } = useAuthContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUserServices(data);
      if (response.status === 200) {
        login(response.data.token);
        navigate("/");
      }
      console.log("response", response);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-center my-3">
          <MDBIcon far icon="user" size="5x" />
        </div>
        <div className="d-flex justify-content-center my-3">
          <h1 className="h3 mb-3 fw-normal">Please login</h1>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            {...register("email", { required: true })}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        {errors.email && (
          <span className="text-danger">This field is required</span>
        )}

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {errors.password && (
          <span className="text-danger">This field is required</span>
        )}

        <button className="btn btn-primary w-100 py-2" type="submit">
          Login
        </button>
      </form>
      <div className="row">
        <div className="col-12 d-flex justify-content-center mt-3">
          <Link to="/">Volver</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
