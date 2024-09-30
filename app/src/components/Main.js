import React from 'react'
import {FaPlus} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Main() {
    return (
        <div className="container w-full h-fit p-5">
            <Link to={'/create'} className="btn px-5 w-fit p-2 bg-blue-600 text-white font-semibold flex gap-2 items-center justify-center text-lg capitalize rounded-lg">
                create task <FaPlus size={14} />
            </Link>
        </div>
    )
}
