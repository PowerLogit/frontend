import { WorkoutFormsContext } from '../context/WorkoutForms.context'

const WorkoutFormsProvider = ({ idAthlete, ressetFilters, children }) => {
    const onSuccess = () => {
        ressetFilters()
    }

    return (
        <WorkoutFormsContext.Provider value={{ onSuccess, idAthlete }}>
            {children}
        </WorkoutFormsContext.Provider>
    )
}

export default WorkoutFormsProvider
