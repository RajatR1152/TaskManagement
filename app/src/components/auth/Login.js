import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {

    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    let n;
    let v;

    function handle(e) {
        n = e.target.name;
        v = e.target.value;
        setAuthData({ ...authData, [n]: v });
    }

    function submit() {
        axios.post('https://task-management-server-zeta-nine.vercel.app/login', authData).then((res) => {
            try {
                if (res.data.user) {
                    localStorage.setItem('token', res.data.token);
                    toast.success('login sucessfull');
                    navigate('/');
                }
                else {
                    toast.error("invalid credentials");
                }
            }
            catch {
                toast.error("invalid credentials");
            }
        })
    }

    return (
        <div className="container w-full h-screen  bg-slate-200 flex items-center justify-center">

            <div className="container w-full p-3 md:p-5 md:h-fit h-full rounded-lg bg-white md:w-5/12 lg:w-4/12 flex flex-col gap-5">
                <h1 className="text-center text-3xl font-semibold">Log in</h1>

                <input name='email' value={authData.email} onChange={handle} type="email" className="w-full p-3 focus:outline-none shadow-lg bg-slate-100 shadow-gray-200" placeholder='email address...' />

                <div className="container w-full flex bg-slate-100 rounded-lg shadow-lg shadow-gray-200">
                    <input name='password' value={authData.password} onChange={handle} type={show ? "text" : "password"} className="w-full p-3 focus:outline-none shadow-lg bg-slate-100 shadow-gray-200" placeholder='password...' />
                    <button className="px-5 bg-transparent">{show ? <FiEyeOff className='cursor-pointer' onClick={() => { setShow(false) }} /> : <FiEye onClick={() => { setShow(true) }} className='cursor-pointer' />}</button>
                </div>

                <button onClick={submit} className="p-3 w-full bg-blue-600 font-semibold hover:bg-blue-700 text-white rounded-lg">Log in</button>

                <div className='flex w-full items-center justify-center gap-3 font-semibold'>
                    <p className='text-md'>don't have account ?</p>
                    <Link className='text-blue-500' to={'/register'} > create account </Link>
                </div>

            </div>

        </div>
    )
}
