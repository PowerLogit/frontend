import { useTranslation } from 'react-i18next'

const CheckBoxToogle = ({ onChange, checked, ...props }) => {
    const { t } = useTranslation()

    return (
        <label className='relative inline-flex items-center mr-5 cursor-pointer'>
            <input
                type='checkbox'
                className='sr-only peer'
                onChange={onChange}
                checked={checked}
                {...props}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                {t('calc.form.toogle')}
            </span>
        </label>
    )
}

export default CheckBoxToogle
