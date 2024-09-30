import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from './Main';
import TaskLists from './TaskLists';

export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        axios
            .get('http://localhost:5001/protected', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
            })
            .catch((error) => {
                console.error('You are not authorized', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            });
    }, [navigate]);

    return (
        <div className="container w-full bg-slate-100 h-screen overflow-y-auto">

            <Main />
            <TaskLists />
            
        </div>
    );
}
