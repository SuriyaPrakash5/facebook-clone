import Image from 'next/image'
import React, { useState } from 'react'
import HeaderIcon from './HeaderIcon'

import { signOut, useSession } from "next-auth/react";

import {
    FlagIcon,
    PlayIcon,
    ShoppingCartIcon,
    SearchIcon,
} from "@heroicons/react/outline";

import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    HomeIcon,
    UserGroupIcon,
    ViewGridIcon,
} from "@heroicons/react/solid";
import { Menu, MenuItem } from '@mui/material';

function Header() {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    }

    const { data: session } = useSession();
    return (
        <di className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
            {/* header left */}
            <div className='flex items-center'>
                <Image src="https://links.papareact.com/5me"
                    width={40} height={40} layout="fixed" />
                <div className="hidden md:inline-flex flex ml-2 items-center rounded-full bg-gray-100 p-2">
                    <SearchIcon className="h-6 text-gray-600" />
                    <input className="ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink" type="text" placeholder="Search Facebook" />
                </div>
            </div>
            {/* header center */}
            <div className="flex justify-center flex-grow">
                <div className='flex space-x-6 md:space-x-2'>
                    <HeaderIcon Icon={HomeIcon} active />
                    <HeaderIcon Icon={FlagIcon} />
                    <HeaderIcon Icon={PlayIcon} />
                    <HeaderIcon Icon={ShoppingCartIcon} />
                    <HeaderIcon Icon={UserGroupIcon} />
                </div>
            </div>

            {/* header right */}
            <div className='flex items-center sm:space-x-2 justify-end'>
                {/* profile picture goes here */}

                <Image id='basic-button' aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} className="rounded-full cursor-pointer" src={session.user.image} width="40" height="40" layout="fixed" />


                <Menu id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={signOut}>Logout</MenuItem>

                </Menu>
                <p className="hidden sm:inline-flex font-semibold pr-3 whitespace-nowrap">{session.user.name}</p>

                <ViewGridIcon className='icon' />
                <ChatIcon className='icon' />
                <BellIcon className='icon' />
                <ChevronDownIcon className='icon' />

            </div>

        </di>
    )
}

export default Header
