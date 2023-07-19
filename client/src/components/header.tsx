import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { StoreDispatch, customUseSelector } from '../app/store';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/auth-slice';
import { useCallback } from 'react';

export const Header = () => {

    const { auth: { user } } = customUseSelector(state => state);
    const dispatch = useDispatch<StoreDispatch>();

    const onLogout = useCallback(() => {
        localStorage.removeItem('user');
        dispatch(logout())
    }, [dispatch])

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Home</Link>
            </div>
            <ul>
                {
                    user ?
                        <li>
                            <button className="btn" onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li> :
                        <>
                            <li>
                                <Link to="login">
                                    <FaSignInAlt /> Login
                                </Link>
                            </li>
                            <li>
                                <Link to="sign-up">
                                    <FaUser />Sign Up
                                </Link>
                            </li>
                        </>
                }
            </ul>
        </header>
    )
}
