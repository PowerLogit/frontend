import { useTranslation } from 'react-i18next'

const About = () => {
    const { t } = useTranslation()

    return (
        <div className='max-w-screen-md mx-auto mt-4 px-4 xl:px-0'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                {t('about.title')}
            </h1>
            <p className='mb-6 text-gray-500 dark:text-gray-300'>
                {t('about.paragraph1')}
            </p>
            <p className='mb-6 text-gray-500 dark:text-gray-300'>
                {t('about.paragraph2')}
            </p>
            <p className='text-gray-500 dark:text-gray-300'>
                {t('about.paragraph3')}
            </p>
        </div>
    )
}

export default About
