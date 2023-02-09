import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/slices/auth';

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await api.post('/api/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ email, password, name }) => {
        dispatch(onChecking());
        try {
            const { data } = await api.post('/api/users', { email, password, name });
            const {data: dataLogin} = await api.post('/api/auth/login', { email, password });
            localStorage.setItem('token', dataLogin.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        // try {
        //     const { data } = await api.get('auth/renew');
        //     localStorage.setItem('token', data.token);
        //     localStorage.setItem('token-init-date', new Date().getTime());
        //     dispatch(onLogin({ name: data.name, uid: data.uid }));
        // } catch (error) {
        //     localStorage.clear();
        //     dispatch(onLogout());
        // }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        errorMessage,
        status,
        user,
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}