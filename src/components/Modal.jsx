import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import IconButton from './ui/components/buttons/IconButton'
import CrossIcon from './ui/svg/CrossIcon'

const Modal = ({ title, closeModal, children }) => {
    const modalRef = useRef(null)

    useEffect(() => {
        if (!children) return

        const handleEscape = (ev) => {
            if (ev.key === 'Escape') {
                closeModal()
            }
        }

        const handleClickOutside = (ev) => {
            if (modalRef.current && !modalRef.current.contains(ev.target)) {
                closeModal()
            }
        }

        document.addEventListener('keydown', handleEscape)
        document.addEventListener('mousedown', handleClickOutside)
        document.body.classList.add('overflow-hidden')

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('mousedown', handleClickOutside)
            document.body.classList.remove('overflow-hidden')
        }
    }, [children, closeModal])

    if (!children) return

    return createPortal(
        <div className='fixed w-full p-4 inset-0 max-h-full flex items-center justify-center backdrop-blur'>
            <div
                ref={modalRef}
                className='relative w-full max-w-2xl max-h-full'
            >
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
