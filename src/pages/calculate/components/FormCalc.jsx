import { useTranslation } from 'react-i18next'

import CheckBoxToogle from '../../../components/ui/components/form/CheckBoxToogle'
import InputText from '../../../components/ui/components/form/InputText'
import Select from '../../../components/ui/components/form/Select'
import { MOVEMENT_APPROX } from '../libs/constant/movement'

const FormCalc = ({
    form,
    numPlates,
    handleChange,
    handleChangeNumPlate,
    toggleCheckbox,
    showApprox = false,
}) => {
    const { t } = useTranslation()

    return (
        <div className='max-w-sm mx-auto mt-6 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <form className='space-y-4 md:space-y-6'>
                    <div className='flex gap-6'>
                        <InputText
                            type='number'
                            name='bar'
                            label={t('calc.form.bar')}
                            placeholder='20'
                            onChange={handleChange}
                            value={form.bar}
                        />

                        <InputText
                            type='number'
                            name='total'
                            label={t('calc.form.total')}
                            placeholder='666'
                            onChange={handleChange}
                            value={form.total}
                        />
                    </div>

                    {showApprox && (
                        <Select
                            name='approx'
                            value={form.approx}
                            onChange={handleChange}
                        >
                            {Object.entries(MOVEMENT_APPROX).map(
                                ([key, value]) => (
                                    <option key={key} value={value}>
                                        {t(`calc.movement.${key}`)}
                                    </option>
                                )
                            )}
                        </Select>
                    )}

                    <CheckBoxToogle
                        onChange={toggleCheckbox}
                        checked={numPlates.isActive}
                    />

                    {numPlates.isActive && (
                        <>
                            <div className='grid grid-cols-3 gap-4'>
                                <InputText
                                    type='number'
                                    name='plate25'
                                    label='D 25Kg'
                                    placeholder='8'
                                    onChange={handleChangeNumPlate}
                                    value={numPlates.plate25}
                                />
                                <InputText
                                    type='number'
                                    name='plate20'
                                    label='D 20Kg'
                                    placeholder='8'
                                    onChange={handleChangeNumPlate}
                                    value={numPlates.plate20}
                                />
                                <InputText
                                    type='number'
                                    name='plate15'
                                    label='D 15Kg'
                                    placeholder='8'
                                    onChange={handleChangeNumPlate}
                                    value={numPlates.plate15}
                                />
                            </div>
                            <div className='grid grid-cols-4 gap-4'>
                                <InputText
                                    type='number'
                                    name='plate10'
                                    label='D 10Kg'
                                    placeholder='8'
                                    onChange={handleChangeNumPlate}
                                    value={numPlates.plate10}
                                />
                                <InputText
                                    type='number'
                                    name='plate5'
                                    label='D 5Kg'
                                    placeholder='8'
                                    onChange={handleChangeNumPlate}
                                    value={numPlates.plate5}
                                />
                                <InputText
                                    type='number'
                                    name='plate2.5'
                                    label='D 2.5Kg'
                                    placeholder='8'
                                    onChange={handleChangeNumPlate}
                                    value={numPlates['plate2.5']}
                                />
                                <InputText
                                    type='number'
                                    name='plate1.25'
                                    label='D 1.25Kg'
                                    placeholder='8'
                                    onChange={handleChangeNumPlate}
                                    value={numPlates['plate1.25']}
                                />
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}

export default FormCalc
