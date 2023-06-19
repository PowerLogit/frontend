import { useTranslation } from 'react-i18next'

import InputText from '../../components/ui/components/form/InputText'
import PageSelector from '../../components/ui/components/pagination/PageSelector'
import AthletesListRow from './components/AthletesListRow'
import useAthletes from './libs/hooks/useAthletes'

const AthletesList = () => {
    const { t } = useTranslation()

    const { data, isLoading, error, totalPages, filters, setSearch, setPage } =
        useAthletes()

    return (
        <div className='max-w-screen-xl mx-auto mt-4 px-4 xl:px-0'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                {t('athletes.title')}
            </h1>

            <InputText
                placeholder={t('athletes.search')}
                type='search'
                className='mb-6 max-w-sm'
                value={filters.search}
                onChange={setSearch}
            />

            <AthletesListRow data={data} isLoading={isLoading} error={error} />

            {totalPages > 1 && (
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
