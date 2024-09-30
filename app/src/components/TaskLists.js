import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function TaskLists() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5001/gettasks').then((res) => {
            setTasks(res.data);
        })
    }, [deleteTask])

    function formatDate(d) {
        const date = new Date(d);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(2);
        return `${day} / ${month} / ${year}`;
    }

    function deleteTask(id){
        axios.post('http://localhost:5001/delete',{_id:id}).then((res)=>{
            if(res.data.deleted){
                toast.success("task deleted");
            }
            else{
                toast.error("something went wrong");
            }
        })
    }

    return (

        <div className="container overflow-x-auto w-screen">

            <table class="table-auto w-full">

                <thead>

                    <tr className='border-b-2 border-black border-t-2'>
                        <th className='py-4 border-e-2 border-black'>#</th>
                        <th className='py-4 border-e-2 border-black'>title</th>
                        <th className='py-4  border-e-2 border-black'>asigned to</th>
                        <th className='py-4 border-e-2 border-black'>status</th>
                        <th className='py-4 border-e-2 border-black'>due date</th>
                        <th className='py-4 border-e-2 border-black'>changes</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        tasks.map((t, i) => {
                            return (
                                <tr key={i} className='border-b text-center border-black'>
                                    <td className='py-3 border-e border-black'>{i + 1}</td>
                                    <td className='py-3 border-e border-black'><Link to={`/task/${t._id}`}>{t?.title}</Link></td>
                                    <td className='py-3 border-e border-black'>{t?.asignedUser}</td>
                                    <td className='py-3 border-e border-black'>{t?.status}</td>
                                    <td className='py-3 border-e border-black'>{formatDate(t?.dueDate)}</td>
                                    <td className='py-3 border-e flex border-black items-center gap-4 justify-center'>
                                        <Link to={`/edit/${t._id}`}><BiEditAlt size={25} className='text-green-500 cursor-pointer' /></Link>
                                        <span className='text-xl font-bold'>/</span>
                                        <MdDeleteOutline onClick={()=>{deleteTask(t._id)}} size={25} className='text-red-500 cursor-pointer' />
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>

        </div>

    )
}
