import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/header/Header'

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    {/* Public routes */}
                    <Route path='/' element={<h1> Home </h1>} />
                    <Route path='/login' element={<h1> Login </h1>} />
                    <Route path='/register' element={<h1> Register </h1>} />
                    <Route path='*' element={<h1> 404 </h1>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
