import { useState, useCallback, ChangeEvent } from 'react';

export const useFormState = <T extends object>(initialState: T) => {
    const [formState, setFormState] = useState<T>(initialState);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    }, []);

    const resetFormState = useCallback(() => {
        setFormState(initialState);
    }, [initialState]);

    return { formState, handleChange, resetFormState };
};
