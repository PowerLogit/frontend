import { WorkoutFormsContext } from '../context/WorkoutForms.context'
import useFormWorkout from '../hooks/useFormWorkout'

const WorkoutFormsProvider = ({ reloadWorkouts, ressetFilters, children }) => {
    const { setFiltersForm, ...restFormWorkout } = useFormWorkout()

    const onSuccess = () => {
        reloadWorkouts()
        ressetFilters()
        setFiltersForm()
    }

    return (
        <WorkoutFormsContext.Provider
            value={{ setFiltersForm, ...restFormWorkout, onSuccess }}
        >
            {children}
        </WorkoutFormsContext.Provider>
    )
}

export default WorkoutFormsProvider
