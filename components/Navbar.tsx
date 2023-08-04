import { useCallback, useState,useEffect } from "react";
import { BsBell, BsChevronDown,BsSearch } from 'react-icons/bs'


import NavbarItem from "@/components/NavbarItem";
import MobileMenu from "@/components/MobileMenu";
import AccountMenu from "@/components/AccountMenu";

const TOP_OFFSET = 66;

export default function Navbar() {

    const [showMobileMenu,setshowMobileMenu] = useState(false);
    const [showAccountMenu,setshowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
              setShowBackground(true)
            } else {
              setShowBackground(false)
            }
          }
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          }

    },[])

    const closeMobileMenu = useCallback (() => {
        setshowMobileMenu((current) => !current)
    },[])
    const closeAccountMenu = useCallback (() => {
        setshowAccountMenu((current) => !current)
    },[])


    return (
        <div>
                 <nav className="w-full fixed z-40">
                    <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
                        <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" />
                        <div className="flex-row ml-8 gap-7 hidden lg:flex">
                            <NavbarItem label="Home" active />
                            <NavbarItem label="Series" />
                            <NavbarItem label="Films" />
                            <NavbarItem label="New & Popular" />
                            <NavbarItem label="My List" />
                            <NavbarItem label="Browse by Languages" />
                        </div>
                        <div onClick={closeMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                            <p className="text-white text-sm">Browse</p>
                            <BsChevronDown className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                            <MobileMenu visible={showMobileMenu}/>
                        </div>
                        <div className="flex flex-row ml-auto gap-7 items-center">
                            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                                <BsSearch />
                            </div>
                            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                                <BsBell />
                            </div>
                            <div className="flex flex-row items-center gap-2 cursor-pointer relative">
                                <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                                    <img src="/images/default-blue.png" alt="" />
                                </div>
                                <BsChevronDown className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} onClick={closeAccountMenu} />
                                <AccountMenu visible={showAccountMenu}/>
                            </div>
                        </div>
                    </div>
                </nav>
        </div>
    )
}