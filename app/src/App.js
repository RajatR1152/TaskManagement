import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Task from './components/Task';
import Create from './components/Create';
import Update from './components/Update';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<Create />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/task/:i' element={<Task />} />
        <Route path='/edit/:i' element={<Update />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
