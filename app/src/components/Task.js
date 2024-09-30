import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Task() {

    const param = useParams();
    const postNo = param.i;
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        axios.post('https://task-management-server-zeta-nine.vercel.app/getpost', { _id: postNo }).then((res) => {
            setPostData(res.data.data);
        })
    }, [])


    function deleteTask(id) {
        axios.post('https://task-management-server-zeta-nine.vercel.app/delete', { _id: id }).then((res) => {
            if (res.data.deleted) {
                toast.success("task deleted");
                navigate('/');
            }
            else {
                toast.error("something went wrong");
            }
        })
    }

    return (

        <div className="container p-5 bg-slate-50 w-full h-screen flex items-center justify-center">

            <div className="container w-full h-full md:8/12 lg:w-10/12 xl:w-6/12 2xl:w-10/12 overflow-auto bg-white rounded-lg flex flex-col gap-8 p-5 md:py-10 border md:px-14 border-black">

                <div className="container w-full gap-4 text-center flex md:flex-row flex-col">

                    <div className='flex md:hidden mb-4 w-fit ms-auto items-center gap-4 justify-center'>
                        <Link to={`/edit/${postNo}`}><BiEditAlt size={25} className='text-green-500 cursor-pointer' /></Link>
                        <span className='text-xl font-bold'>/</span>
                        <MdDeleteOutline onClick={() => { deleteTask(postNo) }} size={25} className='text-red-500 cursor-pointer' />
                    </div>

                    <div className="container w-full flex gap-5 items-center justify-center">
                        <h1 className="text-3xl font-bold text-black">Title : </h1>
                        <p className="text-3xl font-semibold text-center capitalize">{postData?.title}</p>
                    </div>

                    <div className='md:flex hidden w-fit ms-auto items-center gap-4 justify-center'>
                        <Link to={`/edit/${postNo}`}><BiEditAlt size={25} className='text-green-500 cursor-pointer' /></Link>
                        <span className='text-xl font-bold'>/</span>
                        <MdDeleteOutline onClick={() => { deleteTask(postNo) }} size={25} className='text-red-500 cursor-pointer' />
                    </div>

                </div>

                <div className="container mt-10 w-full flex gap-4">
                    <h1 className="text-lg md:text-xl font-bold text-black capitalize">Assigned to : </h1>
                    <p className="text-lg md:text-xl font-semibold capitalize">{postData?.asignedUser}</p>
                </div>

                <div className="container w-full flex gap-4">
                    <h1 className="text-lg md:text-xl font-bold text-black capitalize">Due Date : </h1>
                    <p className="text-lg md:text-xl font-semibold capitalize">{postData?.dueDate}</p>
                </div>

                <div className="container w-full flex gap-4">
                    <h1 className="text-lg md:text-xl font-bold text-black capitalize">status : </h1>
                    <p className={postData?.status === "completed" ? "text-xl font-semibold capitalize text-green-600"
                        : postData?.status === "pending" ? "text-lg md:text-xl font-semibold capitalize text-blue-600"
                            : postData?.status === "to-do" ? "text-lg md:text-xl font-semibold capitalize text-red-600"
                                : "text-lg md:text-xl font-semibold capitalize"}>
                        {postData?.status}

                    </p>
                </div>

                <div className="container w-full flex gap-4">
                    <h1 className="text-lg md:text-xl font-bold text-black capitalize">priority : </h1>
                    <p className={postData?.priority === "low" ? "text-lg md:text-xl font-semibold capitalize text-green-600"
                        : postData?.priority === "medium" ? "text-lg md:text-xl font-semibold capitalize text-blue-600"
                            : postData?.priority === "high" ? "text-lg md:text-xl font-semibold capitalize text-red-600"
                                : "text-lg md:text-xl font-semibold capitalize"}>
                        {postData?.priority}

                    </p>
                </div>

                <div className="container w-full flex md:flex-row flex-col gap-5">

                    <h1 className="text-lg md:text-xl font-bold capitalize text-black">descirption : </h1>

                    <p className="text-md md:text-lg w-10/12 font-semibold mx-auto md:leading-8">
                        {postData?.description}
                    </p>

                </div>

            </div>

        </div>

    )
}
