import PageSelector from '../../components/ui/components/pagination/PageSelector'
import AthletesRequestRow from './components/AthletesRequestRow'

const AthletesRequest = ({ athletesRequest }) => {
    const {
        data,
        totalPages,
        isLoading,
        error,
        filters,
        setPage,
        onSuccess,
        handlers,
    } = athletesRequest

    return (
        <div className='max-w-screen-xl mx-auto mt-8 px-4 xl:px-0'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                Solicitudes de atletas
            </h1>

            <AthletesRequestRow
                data={data}
                isLoading={isLoading}
                error={error}
                onSuccess={onSuccess}
                handlers={handlers}
            />

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

export default AthletesRequest
