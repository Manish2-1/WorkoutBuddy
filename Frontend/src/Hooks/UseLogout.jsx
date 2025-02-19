import { useAuthContext } from "./UseAuthContext";
import { useWorkoutsContext } from "./UseWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();
  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: [] });
  };
  return { logout };
};
