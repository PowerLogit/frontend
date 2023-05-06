import { Link } from 'react-router-dom'

import CardCoach from './CardCoach'
import CardStatistic from './CardStatistic'
import { coaches, statistics } from './homeData'

const Home = () => {
    return (
        <>
            <section className='bg-gray-100 dark:bg-gray-800 py-10'>
                <div className='container mx-auto px-4'>
                    <h1 className='text-4xl font-bold text-center mb-4'>
                        Entrena como un campeón con PowerLog
                    </h1>
                    <p className='text-center'>
                        PowerLog es la herramienta definitiva para entrenar en
                        el mundo del Powerlifting. Crea tus workouts, revisa tus
                        estadísticas y habla con tu coach, todo en un solo
                        lugar.
                    </p>
                    <div className='flex justify-center mt-8'>
                        <Link
                            to={'/authenticate'}
                            className='bg-primary-700 text-white py-2 px-4 rounded-full hover:bg-primary-600 mr-4'
                        >
                            Regístrate ahora
                        </Link>
                        <Link
                            to={'/'}
                            className='bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-400'
                        >
                            Más información
                        </Link>
                    </div>
                </div>
            </section>

            <section className='bg-gray-100 dark:bg-gray-800 py-10 '>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold mb-4'>
                        Nuestros coaches
                    </h2>
                    <p className='mb-8'>
                        En PowerLog, contamos con un equipo de coaches
                        experimentados que te ayudarán a alcanzar tus objetivos
                        en el Powerlifting.
                    </p>
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

            <section className='bg-gray-100 dark:bg-gray-800 py-10'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold mb-4'>
                        Últimas estadísticas
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
