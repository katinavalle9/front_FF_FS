import { useNavigate,Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import {MDBIcon} from "mdb-react-ui-kit";
import "../SignUp/SignUp.css";

import { registerUserServices } from "../../services/useServices";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await registerUserServices(data)
      if (response.status === 201){
        navigate('/login');
      }
      console.log('response', response)
    } catch (error) {
      console.log('error', error.message)
    }
  }

  return (
    <div className="form-signin w-100 m-auto">
       <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-center my-3">
          <MDBIcon far icon="user" size="5x"/>
        </div>
        <div className="d-flex justify-content-center my-3">
          <h1 className='h3 mb-3 fw-normal'>Please sign up</h1>
        </div>
      
        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='first_name'
            name='first_name'
            placeholder='John'
            {...register('first_name', { required: true })}
          />
          <label htmlFor='first_name'>First Name</label>
        </div>
        {errors.name && <span className='text-danger'>This field is required</span>}

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='last_name'
            name='last_name'
            placeholder='Doe'
            {...register('last_name', { required: true })}
          />
          <label htmlFor='last_name'>Last Name</label>
        </div>
        {errors.last_name && <span className='text-danger'>This field is required</span>}

        <div className='form-floating'>
          <select
            className='form-select'
            id='gender'
            name='gender'
            {...register('gender', { required: true })}
          >
            <option value=''>Choose...</option>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select>
          <label htmlFor='gender'>Gender</label>
        </div>

        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            placeholder='name@example.com'
            {...register('email', { required: true })}
          />
          <label htmlFor='email'>Email address</label>
        </div>
        {errors.email && <span className='text-danger'>This field is required</span>}

        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            placeholder='Password'
            {...register('password', { required: true })}
          />
          <label htmlFor='password'>Password</label>
        </div>
        {errors.password && <span className='text-danger'>This field is required</span>}

        <button className='w-100 btn btn-lg btn-primary' type='submit'>Sign up</button>
      </form>
      <div className="row">
        <div className="col-12 d-flex justify-content-center mt-3">
          <Link to="/">Volver</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp