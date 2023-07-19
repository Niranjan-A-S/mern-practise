import { useCallback, useEffect, useMemo } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreDispatch, customUseSelector } from '../app/store';
import { Form, Spinner } from '../components';
import { login, reset } from '../features/auth/auth-slice';
import { useFormState } from '../hooks';
import { IFormControlData, ILoginFormState } from '../types';

const defaultFormState: ILoginFormState = {
    email: '',
    password: '',
};

export const Login = () => {

    const navigate = useNavigate();
    const dispatch: StoreDispatch = useDispatch();
    const { auth: { isError, isLoading, isSuccess, message, user } } = customUseSelector(store => store);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset())
    }, [isError, isSuccess, user, message, dispatch, navigate])

    const { formState, handleChange, resetFormState } = useFormState<ILoginFormState>(defaultFormState);

    const { email, password } = useMemo(() => formState, [formState]);

    const formControlData: IFormControlData[] = useMemo(() => [
        { name: 'email', value: email, placeholder: 'Enter your email', type: 'email' },
        { name: 'password', value: password, placeholder: 'Enter Password', type: 'password' },
    ], [email, password]);

    const handleSubmit = useCallback((event: any) => {
        event.preventDefault()
        dispatch(login({ email, password }));
        resetFormState()
    }, [dispatch, email, password, resetFormState]);

    return isLoading ? <Spinner /> : (
        <Form
            formState={formState}
            formControlData={formControlData}
            onChange={handleChange}
            handleSubmit={handleSubmit}
            heading={<><FaSignInAlt /> Login</>}
            description="Login and start exploring"
        />
    );
};
