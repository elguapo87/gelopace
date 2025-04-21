import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/users/login`, {
          email, 
          password
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);

        } else {
          toast.error(data.message);
        }

      } else {
        const { data } = await axios.post(`${backendUrl}/api/users/register`, {
          name,
          email, 
          password
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
           
        } else {
          toast.error(data.message);
        }
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  
  return (
    <form onSubmit={onSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className="text-2xl font-semibold">{state !== "Login" ? "Create Account" : "Login"}</p>
        <p>Please {state !== "Login" ? "sign up" : "login"} to book appointment</p>

        {
          state !== "Login"
              &&
          <div className="w-full">
            <p>Full Name</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-1" onChange={(e) => setName(e.target.value)} value={name} type="text" required />
          </div>
        }
        <div className="w-full">
          <p>Email</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />
        </div>

        <button type='submit' className="bg-primary text-white w-full py-2 rounded-md text-base">{state !== "Login" ? "Create Account" : "Login"}</button>

        {
          state !== "Login"
             ?
          <p>Already have an account? <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer">Login here</span></p>
             :
          <p>Create a new account? <span onClick={() => setState("Sign Up")} className="text-primary underline cursor-pointer">click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
