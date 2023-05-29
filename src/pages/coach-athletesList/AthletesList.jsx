import PageSelector from '../../components/ui/components/pagination/PageSelector'
import AthletesListRow from './components/AthletesListRow'
import useAthletes from './libs/hooks/useAthletes'

const AthletesList = () => {
    const { data, isLoading, error, totalPages, filters, setPage } =
        useAthletes()

    return (
        <div className='max-w-screen-xl mx-auto mt-8 px-4 xl:px-0'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                Listado de atletas
            </h1>

            <AthletesListRow data={data} isLoading={isLoading} error={error} />

            {!!data.length && (
                <PageSelector
                    page={filters.page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    )
}

export default AthletesList
