import { useCallback, useEffect, useMemo } from 'react';
import { FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreDispatch, customUseSelector } from '../app/store';
import { Form } from '../components/form';
import { useFormState } from '../hooks';
import { IFormControlData, IFormState as ISignUpFromState } from '../types';
import { Spinner } from '../components';
import { register, reset } from '../features/auth';

const defaultFormState: ISignUpFromState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export const SignUp = () => {

    const navigate = useNavigate();
    const dispatch: StoreDispatch = useDispatch();

    const { auth: { isError, isLoading, isSuccess, message } } = customUseSelector((state) => state);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success('Registered Successfully');
            navigate('/login');
        }
        dispatch(reset());
    }, [dispatch, isError, isSuccess, message, navigate])

    const { formState, handleChange, resetFormState } = useFormState<ISignUpFromState>(defaultFormState);
    const { confirmPassword, email, name, password } = useMemo(() => formState, [formState]);

    const formControlData: IFormControlData[] = useMemo(() => [
        { name: 'name', value: name, placeholder: 'Enter your name', type: 'text' },
        { name: 'email', value: email, placeholder: 'Enter your email', type: 'email' },
        { name: 'password', value: password, placeholder: 'Enter Password', type: 'password' },
        { name: 'confirmPassword', value: confirmPassword, placeholder: 'Confirm Password', type: 'password' }
    ], [confirmPassword, email, name, password]);

    const handleSubmit = useCallback((event: any) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            dispatch(register({ email, name, password }))
            resetFormState();
        }
    }, [confirmPassword, dispatch, email, name, password, resetFormState]);

    return isLoading ? <Spinner /> : (
        <Form
            formState={formState}
            formControlData={formControlData}
            onChange={handleChange}
            handleSubmit={handleSubmit}
            heading={<><FaUser />Sign Up</>}
            description="Please create an account"
        />
    );
};
