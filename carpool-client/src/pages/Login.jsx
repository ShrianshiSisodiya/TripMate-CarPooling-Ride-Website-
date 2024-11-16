import React, {useContext, useEffect} from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import car1 from "../assets/car1.png"
import car2 from "../assets/car2.png"
import car3 from "../assets/car3.png"

function Login() {

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors },} = useForm();

    const registerOptions = {
        email: { required: "Email is required" },
        password: {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        },
      };

    const handleLogin = async(data) => {
        try {
            // Make API request to sign up
            const response = await axios.post('http://localhost:8000/api/v1/users/loginuser', data, {
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
            alert("error.response.data.message")
            console.error('Login failed:', error);
          }
    };

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get("http://localhost:8000/api/v1/users/getuser", {
              withCredentials: true, // Important to include credentials
            });
            if(response.data.success){
            setUser(response.data.user);
            navigate('/')
        }
          } catch (error) {
            console.error("Failed to fetch authenticated user", error);
          }
        };
        fetchUser();
      }, []);


  return (
    <div className='h-screen w-full bg-gradient-to-r from-neutral-softPink to-neutral-lightLavender text-contrast-darkBlue flex flex-row items-center justify-around'>
        <img src={car1} width="700px"/>
        <form onSubmit={handleSubmit(handleLogin)} className='max-w-[50vw] p-10 h-auto flex items-center justify-center flex-col bg-white/60 backdrop-blur-md border border-transparent rounded-2xl shadow-xl'>
      
        <div className="flex flex-col m-2">
            <h1 className='text-secondary-purpleDark text-2xl font-bold mb-6'>LOGIN</h1>
          <label className='text-text text-lg font-medium text-contrast-darkBlue'>Email</label>
          <input
            className="p-1 rounded w-60"
            type="email"
            name="email"
            {...register("email", registerOptions.email)}
          />
          <small className="text-danger">
            {errors?.email && errors.email.message}
          </small>
          </div>

          <div className="flex flex-col m-2">
          <label className='text-text text-lg font-medium text-contrast-darkBlue'>Password</label>
          <input
            className="p-1 rounded w-60"
            type="password"
            name="password"
            {...register("password", registerOptions.password)}
          />
          <small className="text-danger">
            {errors?.password && errors.password.message}
          </small>
        </div>


      
      <button className='w-60 bg-primary-yellow text-beige-light py-2 px-4 rounded hover:bg-secondary-orange hover:text-contrast-white m-2 font-semibold'>Submit</button>
      <p>Don't have an account? <Link to="/SignUp" className='text-black' >Sign Up</Link></p>
      
    </form>

    

    </div>
  )
}

export default Login