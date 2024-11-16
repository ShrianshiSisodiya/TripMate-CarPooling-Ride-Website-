import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import car1 from "../assets/car1.png"

function SignUp() {

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = async(data) => {
    // console.log(data);
    // const response = await signup(data);
    // console.log(response)
    // navigate('/')
    try {
        // Make API request to sign up
        const response = await axios.post('http://localhost:8000/api/v1/users/signupuser', data, {
          withCredentials: true // to include cookies in requests
        });

        if(response.data.success){
            setUser(response.data.user);
            navigate('/')
        }
        else{
            console.log(response.data.message)
            alert("Something went wrong")
        }

      } catch (error) {
        alert(error.response.data.message)
        console.error('Signup failed:', error.response.data.message);
      }
  };

  const handleError = (errors) => {};

  const registerOptions = {
    name: { required: "Name is required" },
    mobile: { 
      required: "Mobile is required",
      minLength: {
        value: 10,
        message: "Mobile must have 10 digits",
      },
      maxLength: {
        value: 10,
        message: "Mobile must have 10 digits",
      },
    },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
    role: {
      required: "Role is required",
    },
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender text-contrast-darkBlue flex flex-row items-center justify-around">
        <img src={car1} width="700px"/>
      <form
        onSubmit={handleSubmit(handleRegistration, handleError)}
        className="w-auto p-10 h-auto flex items-center justify-center flex-col bg-white/60 backdrop-blur-md border border-transparent rounded-2xl shadow-xl"
      >
        <div className="flex flex-col m-2">
        <h1 className='text-secondary-purpleDark text-2xl font-bold mb-6'>SIGN UP</h1>
          <label className='text-text text-lg font-medium text-contrast-darkBlue'>Name</label>
          <input
            className="p-1 rounded w-60"
            name="name"
            type="text"
            {...register("name", registerOptions.name)}
          />
          <small className="text-red-600 font-bold">
            {errors?.name && errors.name.message}
          </small>
        </div>
        <div className="flex flex-col">
          <label className='text-text text-lg font-medium text-contrast-darkBlue'>Mobile</label>
          <input
            className="p-1 rounded w-60"
            type="number"
            name="number"
            {...register("mobile", registerOptions.mobile)}
          />
          <small className="text-red-600 font-bold">
            {errors?.mobile && errors.mobile.message}
          </small>
        </div>
        <div className="flex flex-col">
          <label className='text-text text-lg font-medium text-contrast-darkBlue'>Email</label>
          <input
            className="p-1 rounded w-60"
            type="email"
            name="email"
            {...register("email", registerOptions.email)}
          />
          <small className="text-red-600 font-bold">
            {errors?.email && errors.email.message}
          </small>
        </div>
        <div className="flex flex-col">
          <label className='text-text text-lg font-medium text-contrast-darkBlue'>Password</label>
          <input
            className="p-1 rounded w-60"
            type="password"
            name="password"
            {...register("password", registerOptions.password)}
          />
          <small className="text-red-600 font-bold">
            {errors?.password && errors.password.message}
          </small>
        </div>
        {/* <div className="flex flex-col w-60">
        <label className='text-text text-lg font-medium text-contrast-darkBlue'>Role</label>
        <div className="flex border-2">
          <div>
          
            <input
              className="border-2"
              type="radio"
              value="owner"
              {...register("role")}
            />
            <label>Owner</label>
          </div>

          <div className="ml-5">
            <input
              className="border-2"
              type="radio"
              value="passenger"
              {...register("role")}
            />
            <label>Passenger</label>
          </div>
          </div>
          <small className="text-red-600font-bold">
            {errors?.role && errors.role.message}
          </small>
        </div> */}

        <button className='w-60 bg-primary-yellow text-beige-light py-2 px-4 rounded hover:bg-secondary-orange hover:text-contrast-white m-2 mt-4 font-semibold'>Submit</button>
        <p>Already have an account? <Link to="/Login" className='text-black' >Login</Link></p>
      </form>
    </div>
  );
}

export default SignUp;
