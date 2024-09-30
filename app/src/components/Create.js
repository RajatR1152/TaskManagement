import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Create() {


    const [users, setUsers] = useState([]);
    const [data, setData] = useState({
        dueDate: '',
        status: '',
        asignedUser: '',
        priority: '',
        title: '',
        description: ''
    })

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`).then((res) => {
            setUsers(res.data);
        })
    }, [])

    let n;
    let v;

    function handle(e) {
        n = e.target.name;
        v = e.target.value;

        setData({ ...data, [n]: v });
    }

    function submit() {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/create`, data).then((res) => {
            if (res.data.saved) {
                toast.success("task created successfully");
            }
            else {
                toast.error("something went wrong");
            }
        })
    }

    return (

        <div className="container p-5 bg-slate-50 w-full h-screen flex items-center justify-center">

            <div className="container w-full h-full md:8/12 lg:w-10/12 xl:w-6/12 2xl:w-10/12 overflow-auto bg-white rounded-lg flex flex-col gap-5 p-5 md:py-10 border md:px-14 border-black">

                <h1 className="text-3xl font-bold text-center">Create Task</h1>

                <div className="container w-full flex flex-col md:flex-row gap-5">

                    <div className="container mt-10 w-full md:w-6/12 items-center flex gap-4">
                        <h1 className="text-md md:text-lg font-bold text-black capitalize">due date : </h1>
                        <input name='dueDate' value={data.dueDate} onChange={handle} type="date" className="w-10/12 p-3 bg-slate-200 focus:outline-none" placeholder='date....' />
                    </div>

                    <div className="container mt-10 w-full md:w-6/12 items-center flex gap-4">
                        <h1 className="text-md md:text-lg font-bold text-black capitalize">status : </h1>
                        <select name="status" id="status" value={data.status} onChange={handle} className="w-10/12 p-3 bg-slate-200 focus:outline-none" >
                            <option value="pending" className='capitalize'>pending</option>
                            <option value="completed" className='capitalize'>completed</option>
                            <option value="to-do" className='capitalize'>to-do</option>
                        </select>
                    </div>

                </div>

                <div className="container w-full flex gap-5">

                    <div className="container mt-10 w-full md:w-6/12 items-center flex flex-col md:flex-row gap-4">
                        <h1 className="text-md w-fit md:text-lg font-bold text-black capitalize">assigned user : </h1>

                        <select name="asignedUser" id="asignedUser" onChange={handle} value={data.asignedUser} className="w-10/12 p-3 bg-slate-200 focus:outline-none" >
                            <option disabled className='capitalize'>select</option>

                            {
                                users?.map((u) => {
                                    return (
                                        <option key={u._id} value={u?.username} className='capitalize'>{u?.username}</option>
                                    )
                                })
                            }

                        </select>

                    </div>

                    <div className="container mt-10 w-full md:w-6/12 items-center flex gap-4">
                        <h1 className="text-md md:text-lg font-bold text-black capitalize">priority : </h1>

                        <select name="priority" id="priority" value={data.priority} onChange={handle} className="w-10/12 p-3 bg-slate-200 focus:outline-none" >
                            <option value="low" className='capitalize'>low</option>
                            <option value="medium" className='capitalize'>medium</option>
                            <option value="high" className='capitalize'>high</option>
                        </select>

                    </div>

                </div>


                <div className="container w-full ">

                    <h1 className="text-md md:text-lg font-bold capitalize text-black">title : </h1>

                    <input name="title" value={data.title} onChange={handle} className="w-full p-3 bg-slate-200 focus:outline-none my-2" placeholder='title....' />

                </div>

                <div className="container w-full gap-5">

                    <h1 className="text-md md:text-lg font-bold capitalize text-black">descirption : </h1>

                    <textarea name="description" id="description" value={data.description} onChange={handle} className="w-full h-32 p-3 my-2 bg-slate-200 focus:outline-none"></textarea>

                </div>


                <button onClick={submit} className="w-full text-white rounded-lg p-3 bg-blue-600 text-lg font-semibold">submit</button>

            </div>

        </div>

    )
}
