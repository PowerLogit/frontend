import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import CardCoach from './CardCoach'
import CardStatistic from './CardStatistic'
import { coaches, statistics } from './homeData'

const Home = () => {
    const { t } = useTranslation()

    return (
        <>
            <section className='bg-gray-100 dark:bg-gray-900 py-10'>
                <div className='max-w-screen-xl mx-auto px-5 xl:px-0'>
                    <h1 className='text-4xl font-bold text-center mb-4'>
                        {t('home.title')}
                    </h1>
                    <p className='text-center'>{t('home.description')}</p>
                    <div className='flex justify-center mt-8'>
                        <Link
                            to={'/authenticate'}
                            className='bg-primary-700 text-white py-2 px-4 rounded-full hover:bg-primary-600 mr-4'
                        >
                            {t('home.registerNow')}
                        </Link>
                        <Link
                            to={'/'}
                            className='bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-400'
                        >
                            {t('home.learnMore')}
                        </Link>
                    </div>
                </div>
            </section>

            <section className='bg-gray-100 dark:bg-gray-900 py-10 '>
                <div className='max-w-screen-xl mx-auto px-5 xl:px-0'>
                    <h2 className='text-3xl font-bold mb-4'>
                        {t('home.coachesTitle')}
                    </h2>
                    <p className='mb-8'>{t('home.coachesDescription')}</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                        {coaches.map((coach, index) => (
                            <CardCoach
                                key={index}
                                name={coach.name}
                                description={coach.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className='bg-gray-100 dark:bg-gray-900 py-10'>
                <div className='max-w-screen-xl mx-auto px-5 xl:px-0'>
                    <h2 className='text-3xl font-bold mb-4'>
                        {t('home.statsTitle')}
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                        {statistics.map((statistic, index) => (
                            <CardStatistic
                                key={index}
                                name={statistic.name}
                                weight={statistic.weight}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
