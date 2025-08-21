'use client';

import Navbar from '@/components/be/Navbar'
import Sidebar from '@/components/be/Sidebar'
import React, { useState } from 'react'

const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <div className='flex w-full'>
            {/* Sidebar */}
            <Sidebar showSidebar={showSidebar} />

            <div className={showSidebar ? 'md:ml-64 w-full flex-grow bg-slate-100 min-h-screen' 
                : 'md:ml-64 w-full flex-grow bg-slate-100 min-h-screen'}>
                {/* Header */}
                <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

                {/* Main */}
                <main className='px-8 py-10 bg-slate-50 dark:bg-slate-950 w-full text-slate-50 min-h-screen mt-16'>{children}</main>

            </div>
            {/* Main Body */}
        </div>
    )
}

export default Layout