"use client";

import React, {useState, createContext, useContext} from 'react'
import Image from 'next/image'

import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

import uslogo from '../assets_online/uniswap.png'
import tboptions from '../data/token_bridge.json';

const SelectedOptionContext = createContext();

export function SelectedOptionProvider({ children }) {
    const [selectedOption, setSelectedOption] = useState(tboptions[0]);
    return (
      <SelectedOptionContext.Provider value={[selectedOption, setSelectedOption]}>
        {children}
      </SelectedOptionContext.Provider>
    );
}

export function useSelectedOption() {
    const context = useContext(SelectedOptionContext);
    if (context === undefined) {
      throw new Error('useSelectedOption must be used within a SelectedOptionProvider');
    }
    return context;
}

const style = {
    navitems: `hidden custom:block text-base font-semibold rounded-xl px-3 py-3 transition-colors duration-300 hover:bg-[#1e1f21] hover:text-white`,

    navitemsCustom: `custom:hidden block text-base font-semibold rounded-xl px-3 py-2 transition-colors duration-300 hover:bg-[#1e1f21] hover:text-white`,

    navitemdefault: `font-semibold rounded-xl transition-colors duration-300 hover:bg-[#1e1f21] hover:text-white`
} 

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useSelectedOption();

    return <div className={`z-10`}>
            <nav className="mt-4">
                <ul className="custom:flex space-x-4">
                    <Image src={uslogo} alt="uniswap logo" className='ml-5 h-11 w-10'/>
                    <div className="flex space-x-4 space-y-0">
                        <li className= {style.navitems}>Swap</li>
                        <li className= {style.navitems}>Tokens</li>
                        <li className= {style.navitems}>NFTs</li>
                        <li className= {`${style.navitemdefault} hidden custom:block text-2xl px-3 py-1`}>...</li>
                        <li></li>
                    </div>
                    <div className="flex absolute space-x-4 top-4 right-4">
                        <button className={`${style.navitemdefault} py-2 px-3`}>
                            <FiSearch className="text-2xl" color="#7b7a7b" />
                        </button>
                        <div className="relative inline-block text-left">
                            <div>
                                <button type="button" className={`inline-flex ${style.navitemdefault} justify-center px-3 py-2 ${isOpen ? 'bg-[#311c31]' : ''}`} aria-haspopup="true" aria-expanded="true" onClick={() => setIsOpen(!isOpen)}>
                                <Image src={selectedOption.image} alt={selectedOption.name} width={25} height={25} />
                                <IoIosArrowDown color="#7b7a7b" className={`text-2xl ${isOpen ? 'transform rotate-180' : ''}`} />
                                </button>
                            </div>
                            {isOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl bg-[#1e1f21] text-white text-sm font-bold">
                                <div className="py-1 px-1" role="menu" aria-orientation="vertical" aria-labelledby="token-bridge-options-menu">
                                    {tboptions.map(tboption => (
                                    <a key={tboption.id} href="#" className="flex items-center rounded-lg block px-4 py-3 hover:bg-[#2b2b2b]" role="menuitem" onClick={() => {setSelectedOption(tboption); setIsOpen(false);}}>
                                        <Image src={tboption.image} alt={tboption.name} width={20} height={20} />
                                        <span className="ml-3">{tboption.name}</span>
                                    </a>
                                    ))}
                                </div>
                                </div>
                            )}
                        </div>
                        <button className="bg-[#311c31] hover:bg-[#2c192c] font-bold py-2 px-4 rounded-3xl" style={{color: '#fc72ff'}}>
                        Connect
                        </button>
                    </div>
                </ul>
            </nav>
    
            <div className="custom:hidden block fixed inset-x-0 bottom-5 flex justify-center">
                <div className={`bg-[#131313] border border-[#1e1f21] px-5 py-1 rounded-3xl inline-flex items-center`}>
                    <nav>
                    <ul className="justify-center flex space-x-4 space-y-0">
                        <li className={style.navitemsCustom}>Swap</li>
                        <li className={style.navitemsCustom}>Tokens</li>
                        <li className={style.navitemsCustom}>NFTs</li>
                        <li className={`${style.navitemdefault} custom:hidden block text-2xl px-2`}>...</li>
                    </ul>
                    </nav>
                </div>
            </div>

            
    </div>
}

export default Header;