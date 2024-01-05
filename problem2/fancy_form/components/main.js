"use client";

import React, {useState, useEffect, createContext, useContext} from 'react'
import Image from 'next/image'

import { IoIosSettings } from 'react-icons/io';
import { FaArrowDown } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

import currencies from '../data/currency.json';

const currencyData = {};
currencies.forEach(currency => {
    currencyData[currency.currency] = currency;
});


const style = {
    navitems: `text-base font-semibold transition-colors duration-300 hover:text-gray-400 py-2 px-2`,

    tinyText:`text-sm px-2 text-gray-400`,

    largeInputText: `w-full bg-[#1b1b1b] focus:outline-none rounded-lg py-2 px-2 text-white text-4xl`
}

const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const fromPriceInUSD = currencyData[fromCurrency].price;
    const toPriceInUSD = currencyData[toCurrency].price;
    return amount * fromPriceInUSD / toPriceInUSD;
};


var InputContent = ({ value, setValue, selectedOption, setSelectedOption, usdValue }) => {
    const [isOpen, setIsOpen] = useState(false);

    return <div>
        <div className='flex justify-between'>
            <input className="bg-[#1b1b1b] focus:outline-none rounded-lg py-2 px-2 text-white text-3xl" type="text" placeholder="0.0" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) =>{
                const keyCode = e.key;
                if (!['0','1','2','3','4','5','6','7','8','9','.','Backspace','Tab'].includes(keyCode) || (keyCode === '.' && e.target.value.includes('.'))) {
                  e.preventDefault()
            }}} />
            <div className="relative inline-block text-left">
                <div>
                <button type="button" className={`flex inline-block font-semibold rounded-3xl transition-colors duration-300 bg-[#131313] hover:text-white justify-center items-center px-3 py-2 ${isOpen ? 'bg-[#311c31]' : ''}`} aria-haspopup="true" aria-expanded="true" onClick={() => setIsOpen(!isOpen)}>
                <Image src={selectedOption.image} alt={selectedOption.currency} width={25} height={25} />
                <span className='px-2'>{selectedOption.currency}</span>
                <IoIosArrowDown color="#7b7a7b" className={`text-2xl ${isOpen ? 'transform rotate-180' : ''}`} />
                </button>

                </div>
                {isOpen && (
                    <div className="z-20 absolute right-0 mt-2 w-56 rounded-xl bg-[#1e1f21] text-white text-sm font-bold max-h-72 overflow-auto scrollbar-hide">
                    <div className="py-1 px-1" role="menu" aria-orientation="vertical" aria-labelledby="token-bridge-options-menu">
                        {currencies.map(currency => (
                        <a key={currency.currency} href="#" className="flex items-center rounded-lg block px-4 py-3 hover:bg-[#2b2b2b]" role="menuitem" onClick={() => {setSelectedOption(currency); setIsOpen(false);}}>
                            <Image src={currency.image} alt={currency.currency} width={20} height={20} />
                            <span className="ml-3">{currency.currency}</span>
                        </a>
                        ))}
                    </div>
                    </div>
                )}
            </div>
        </div>
        <p className={style.tinyText}>${usdValue.toFixed(2)}</p>
    </div>
}

const Main = () => {
    const [isSwitched, setIsSwitched] = useState(false);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [usdValue, setUsdValue] = useState(0);
    const [selectedOption1, setSelectedOption1] = useState(currencies[4]);
    const [selectedOption2, setSelectedOption2] = useState(currencies[4]);

    useEffect(() => {
        const convertedValue = convertCurrency(value1, selectedOption1.currency, selectedOption2.currency);
        setValue2(convertedValue);
        setUsdValue(value1 * currencyData[selectedOption1.currency].price);
    }, [selectedOption1, value1]);
    
    useEffect(() => {
        const convertedValue = convertCurrency(value2, selectedOption2.currency, selectedOption1.currency);
        setValue1(convertedValue);
        setUsdValue(value2 * currencyData[selectedOption2.currency].price);
    }, [selectedOption2, value2]);
    

    const setCurrencyValue = (value, field) => {
        let convertedValue;
        if (field === 'pay') {
            setValue1(value);
            convertedValue = convertCurrency(value, selectedOption1.currency, selectedOption2.currency);
            setValue2(convertedValue);
            setUsdValue(value * currencyData[selectedOption1.currency].price);
        } else {
            setValue2(value);
            convertedValue = convertCurrency(value, selectedOption2.currency, selectedOption1.currency);
            setValue1(convertedValue);
            setUsdValue(value * currencyData[selectedOption2.currency].price);
        }
    };
    

    return <div className='flex justify-center'>
        <div className= 'mt-20'>
        <div className="border-box bg-[#131313] p-3 border border-[#1e1f21] rounded-3xl" style={{ boxShadow: "0 0 90px rgba(49,28,49,255)" }}>
            <div>
                <nav>
                    <ul className='flex justify-between'>
                        <div className="justify-center flex space-y-0" >
                            <li className={style.navitems}>Swap</li>
                            <li className={style.navitems}>Buy</li>
                        </div>
                        <div className={`transition-colors duration-300 hover:text-gray-400 flex space-x-4 right-4 text-2xl py-2 px-2`}>
                            <li> <IoIosSettings /> </li>
                        </div>
                    </ul>
                </nav>
            </div>

            <div className="p-1">
                <div className='bg-[#1b1b1b] p-3 border border-[#1e1f21] rounded-2xl'>
                    <p className={style.tinyText}>You pay</p>
                    {isSwitched ? 
                        <InputContent 
                            value={value1} 
                            setValue={(value) => setCurrencyValue(value, 'pay')} 
                            selectedOption={selectedOption1} 
                            setSelectedOption={setSelectedOption1} usdValue={usdValue}
                        /> 
                    : 
                        <InputContent 
                            value={value2} 
                            setValue={(value) => setCurrencyValue(value, 'receive')} 
                            selectedOption={selectedOption2} 
                            setSelectedOption={setSelectedOption2} usdValue={usdValue}
                        />
                    }
                </div>
            </div>
            <div className="p-1">
                <div className='bg-[#1b1b1b] p-3 border border-[#1e1f21] rounded-2xl grid-cols-subgrid'>
                    <p className={style.tinyText}>You recieve</p>
                    {isSwitched ? 
                        <InputContent 
                            value={value2} 
                            setValue={(value) => setCurrencyValue(value, 'receive')} 
                            selectedOption={selectedOption2} 
                            setSelectedOption={setSelectedOption2}usdValue={usdValue} 
                        /> 
                    : 
                        <InputContent 
                        value={value1} 
                        setValue={(value) => setCurrencyValue(value, 'pay')} 
                        selectedOption={selectedOption1} 
                        setSelectedOption={setSelectedOption1} usdValue={usdValue}
                        />
                    }
                </div>
            </div>
            <div></div>
            <div className='p-1'>
                <button className="w-full bg-[#311c31] hover:bg-[#2c192c] text-xl font-bold py-4 px-4 rounded-2xl" style={{color: '#fc72ff'}}>
                    Connect Wallet
                </button>
            </div>
        </div>
        </div>

        <button className="absolute mt-60 bg-[#311c31] hover:bg-[#2c192c] text-sm py-3 px-3 border border-[#131313] border-4 rounded-2xl" style={{color: '#fc72ff', zIndex: 10}} onClick={() => setIsSwitched(!isSwitched)}>
            <FaArrowDown />
        </button>

    </div>
}

export default Main