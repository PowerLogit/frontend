import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Button from '../../components/ui/components/buttons/Button'
import Heading from '../../components/ui/components/Heading'
import CalcApprox from './components/CalcApprox'
import CalcBasic from './components/CalcBasic'

const Calculate = () => {
    const { weight } = useParams()
    const { t } = useTranslation()

    const [calculate, setCalculate] = useState('basic')

    const Calc = calculate === 'basic' ? CalcBasic : CalcApprox

    return (
        <div className='max-w-screen-xl mx-auto px-5 lg:px-0'>
            <Heading text={t('calc.title')} className={'text-center my-6'} />

            <div className='max-w-sm mx-auto flex flex-row gap-4'>
                <Button
                    kind={calculate === 'basic' ? 'primary' : 'outline'}
                    onClick={() => setCalculate('basic')}
                    className='w-full'
                >
                    {t('calc.buttons.basic')}
                </Button>
                <Button
                    kind={calculate === 'aprox' ? 'primary' : 'outline'}
                    onClick={() => setCalculate('aprox')}
                    className='w-full'
                >
                    {t('calc.buttons.aprox')}
                </Button>
            </div>

            <Calc weight={weight} />
        </div>
    )
}

export default Calculate
