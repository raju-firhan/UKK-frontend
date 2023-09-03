import React from "react";
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const TABS_LINK = [
    {
        key: 'pemesanan',
        label: 'Pemesanan',
        path: '/',
    },
    {
        key: 'riwayat',
        label: 'Riwayat',
        path: '/riwayat',
    },
]

const linkClass = 'inline-block px-4 py-4 rounded-lg hover:bg-green-600'

export default function TabsKasir() {
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/')
        window.location.reload()
    }
    return (
        <div className="fixed w-full bg-white -700 text-white h-20 px-5 flex justify-between items-center border-b border-gray-200">
            <div className="flex flex-wrap text-sm font-medium text-center ">
                {TABS_LINK.map((item) => (
                    <TabsLink key={item.key} item={item} />
                ))}
            </div>
            <a href="#" onClick={handleLogout} className="inline-block px-4 py-4 rounded-lg bg-red-700 text-white">
                Logout
            </a>
        </div>
    )
}

function TabsLink({ item }) {
    const { pathname } = useLocation()

    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'inline-block mx-1 px-4 py-3 text-white bg-green-900 rounded-lg hover:bg-green-900' : '', linkClass)}>
            {item.label}
        </Link>
    )
}