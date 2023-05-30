import { Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'

import HeaderAuthOrDropdown from './HeaderAuthOrDropdown'
import HeaderPages from './HeaderPages'

const Header = ({ athletesRequest }) => (
    <header className='dark:bg-gray-800'>
        <Navbar fluid={true} className='max-w-screen-xl mx-auto px-5 xl:px-0'>
            <Link to={'/'} className='flex items-center'>
                <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                    PowerLog
                </span>
            </Link>
            <div className='flex md:order-2'>
                <HeaderAuthOrDropdown athletesRequest={athletesRequest} />
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <HeaderPages />
            </Navbar.Collapse>
        </Navbar>
    </header>
)

export default Header
