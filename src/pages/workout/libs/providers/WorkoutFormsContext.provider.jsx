import { WorkoutFormsContext } from '../context/WorkoutForms.context'
import useSelectedFormWorkout from '../hooks/useSelectedFormWorkout'

const WorkoutFormsProvider = ({ ressetFilters, children }) => {
    const { setFiltersForm, ...restFormWorkout } = useSelectedFormWorkout()

    const onSuccess = () => {
        ressetFilters()
        setFiltersForm()
    }

    return (
        <WorkoutFormsContext.Provider
            value={{ setFiltersForm, onSuccess, ...restFormWorkout }}
        >
            {children}
        </WorkoutFormsContext.Provider>
    )
}

export default WorkoutFormsProvider
