import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import RegisterPage from '../pages/auth/RegisterPage';
import LoginPage from '../pages/auth/LoginPage';
import App from '../pages/main/App';

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

    if ( status === 'checking' ) {
        return (
            <h3>Cargando...</h3>
        )
    }
    
    return (
        <Routes>
            {
                ( status === 'not-authenticated')  
                    ? (
                        <>
                            <Route path="/auth/register" element={ <RegisterPage /> } />
                            <Route path="/auth/login" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <App /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }
        </Routes>
    )
}