import { createPortal } from 'react-dom'
import CrossIcon from './ui/svg/CrossIcon'
import IconButton from './ui/components/buttons/IconButton'

const Modal = ({ title, closeModal, children }) => {
    if (!children) return

    return createPortal(
        <div className='fixed w-full p-4 inset-0 max-h-full flex items-center justify-center backdrop-blur'>
            <div className='relative w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                    <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                        <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                            {title}
                        </h3>
                        <IconButton icon={CrossIcon} onClick={closeModal} />
                    </div>
                    <div className='p-6 space-y-6'>{children}</div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}

export default Modal
