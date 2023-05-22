import { Sidebar } from 'flowbite-react'
import { useState } from 'react'

import Preferences from './Preferences'

const Settings = () => {
    const [showPage, setShowPage] = useState(initialState)

    return (
        <div className='max-w-screen-xl mx-auto mt-8 flex gap-8'>
            <div className='w-fit'>
                <Sidebar aria-label='Sidebar with call to action button example'>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            {pages.map((page) => (
                                <Sidebar.Item
                                    key={page.name}
                                    onClick={() => setShowPage(page)}
                                    className={`cursor-pointer ${
                                        page.name === showPage.name
                                            ? 'bg-primary-700'
                                            : ''
                                    }`}
                                >
                                    {page.name}
                                </Sidebar.Item>
                            ))}
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
            <showPage.component />
        </div>
    )
}

const initialState = {
    name: 'Preferencias',
    component: Preferences,
}

const pages = [initialState]

export default Settings
