import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../app/store";
import { deleteGoal } from "../features/goals";
import { IGoalItemProps } from "../types";

export const GoalItem: FC<IGoalItemProps> = memo(({ goal: { createdAt, text, _id } }) => {

    const dispatch = useDispatch<StoreDispatch>();

    return <div className='goal'>
        <div>{new Date(createdAt).toLocaleString('en-US')}</div>
        <h2>{text}</h2>
        <button onClick={() => dispatch(deleteGoal(_id))} className='close'>
            X
        </button>
    </div>
})