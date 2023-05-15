import { WorkoutFormsContext } from '../context/WorkoutForms.context'

const WorkoutFormsProvider = ({ ressetFilters, children }) => {
    const onSuccess = () => {
        ressetFilters()
    }

    return (
        <WorkoutFormsContext.Provider value={{ onSuccess }}>
            {children}
        </WorkoutFormsContext.Provider>
    )
}

export default WorkoutFormsProvider
