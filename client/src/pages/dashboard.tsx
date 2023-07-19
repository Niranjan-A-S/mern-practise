import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoreDispatch, customUseSelector } from "../app/store";
import { GoalForm, Spinner } from "../components";
import { GoalItem } from "../components/goal-item";
import { getGoal, reset } from "../features/goals";
import { IGoalItem } from "../types";

export const Dashboard = () => {

    const { auth: { user }, goal: { isError, message, goals, isLoading } } = customUseSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useDispatch<StoreDispatch>();

    const renderGoals = useCallback((goal: IGoalItem) => <GoalItem key={goal._id} goal={goal} />, []);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        if (!isError) {
            console.log(message);
        }
        dispatch(getGoal({}));
        () => {
            dispatch(reset())
        }
    }, [dispatch, isError, message, navigate, user])

    return (
        isLoading ? <Spinner /> : <section className="heading">
            <h1>Welcome {user?.name}</h1>
            <p>Goals Dashboard</p>
            <GoalForm />
            <section className="content">
                <div className="goals">
                    {goals ? goals.map(renderGoals) : null}
                </div>
            </section>
        </section>
    )
}
