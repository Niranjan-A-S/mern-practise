import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../app/store";
import { createGoal } from "../features/goals";
import { useFormState } from "../hooks";
import { IGoal } from "../types";

export const GoalForm = memo(() => {

    const { formState: { text }, handleChange, resetFormState } = useFormState<IGoal>({ text: '' });
    const dispatch = useDispatch<StoreDispatch>();

    const onSubmit = useCallback((e: any) => {
        e.preventDefault();
        dispatch(createGoal({ text }));
        resetFormState();
    }, [dispatch, resetFormState, text]);

    return <section className='form'>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='text'>Goal</label>
                <input
                    type='text'
                    name='text'
                    id='text'
                    value={text}
                    onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <button className='btn btn-block' type='submit'>
                    Add Goal
                </button>
            </div>
        </form>
    </section>
})