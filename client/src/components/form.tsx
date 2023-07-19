import { ChangeEvent, FormEventHandler, useCallback } from 'react';
import { IFormControlData } from '../types';

interface FormProps<T> {
    formState: T;
    formControlData: IFormControlData[];
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: FormEventHandler<HTMLFormElement>;
    heading: string | JSX.Element;
    description: string;
}

export const Form = <T extends object>({ formControlData, onChange, handleSubmit, heading, description }: FormProps<T>) => {
    const renderFormControl = useCallback(({ name, placeholder, type, value }: IFormControlData) => (
        <input
            key={name}
            name={name}
            value={value}
            placeholder={placeholder}
            type={type}
            className="form-control"
            required
            onChange={onChange}
            id={name}
        />
    ), [onChange]);

    return (
        <>
            <section className="heading">
                <h1 className="grid">{heading}</h1>
                <p>{description}</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {formControlData.map(renderFormControl)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};
