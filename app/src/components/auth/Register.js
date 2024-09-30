import axios from 'axios';
import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    let val;

    const [show, setShow] = useState(false);

    let n;
    let v;

    function handle(e) {
        n = e.target.name;
        v = e.target.value;
        setUser({ ...user, [n]: v });
    }

    function submit(e) {
        e.preventDefault();

        if (user.password.length>4 && user.password == user.confirmPassword) {
            axios.post('https://task-management-server-zeta-nine.vercel.app/register', user).then((res) => {
                if (res.data.created) {
                    toast.success(res.data.message);
                    navigate('/login');
                }
                else {
                    toast.error(res.data.message);
                }
            })
        }
        else {
            toast.error('password and confirm password doesnt match');
        }
    }


    return (
        <div className="container w-full h-screen bg-slate-200 flex items-center justify-center">

            <form method='post' onSubmit={submit} className="container w-full p-3 md:p-5 md:h-fit h-full rounded-lg bg-white md:w-5/12 lg:w-4/12 flex flex-col gap-5">
                <h1 className="text-center text-3xl font-semibold">Register</h1>

                <input name='username' value={user.username} onChange={handle} type="text" className="w-full p-3 focus:outline-none shadow-lg bg-slate-100 shadow-gray-200" placeholder='usename...' required />

                <input name='email' value={user.email} onChange={handle} type="text" className="w-full p-3 focus:outline-none shadow-lg bg-slate-100 shadow-gray-200" placeholder='email address...' required />

                <div className="container w-full flex bg-slate-100 rounded-lg shadow-lg shadow-gray-200">
                    <input name='password' value={user.password} onChange={handle} type={show ? "text" : "password"} className="w-full p-3 focus:outline-none shadow-lg bg-slate-100 shadow-gray-200" placeholder='password...' required />
                    <button className="px-5 bg-transparent">{show ? <FiEyeOff className='cursor-pointer' onClick={() => { setShow(false) }} /> : <FiEye onClick={() => { setShow(true) }} className='cursor-pointer' />}</button>
                </div>

                <input name='confirmPassword' value={user.confirmPassword} onChange={handle} type="text" className="w-full p-3 focus:outline-none shadow-lg bg-slate-100 shadow-gray-200" placeholder='confirm password...' required />

                <button onClick={submit} className="p-3 w-full bg-blue-600 font-semibold hover:bg-blue-700 text-white rounded-lg">register</button>

                <div className='flex w-full items-center justify-center gap-3 font-semibold'>
                    <p className='text-md'>already have account ?</p>
                    <Link className='text-blue-500' to={'/login'} > sign in </Link>
                </div>

            </form>

        </div>
    )
}
