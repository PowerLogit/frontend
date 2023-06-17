import { useTranslation } from 'react-i18next'

import PageSelector from '../../components/ui/components/pagination/PageSelector'
import AthletesRequestRow from './components/AthletesRequestRow'

const AthletesRequest = ({ athletesRequest }) => {
    const { t } = useTranslation()

    const { totalPages, filters, setPage, ...rest } = athletesRequest

    return (
        <div className='max-w-screen-xl mx-auto mt-8 px-4 xl:px-0'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                {t('athletesRequest.title')}
            </h1>

            <AthletesRequestRow {...rest} />

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

export default AthletesRequest
