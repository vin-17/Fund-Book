import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb, fundIcon, profileLogo } from '../assets';  //icons
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();  //for the wallet

  return (
    //wrapper div
    <div className="flex  md:flex-row flex-col-reverse justify-between mb-[45px] gap-6">
      <div className='flex gap-1'>
        <h3 className="m-auto font-epilogue font-semibold text-[26px] text-white text-left leading-[26px] truncate">FundBook</h3>
      
      </div>
      
      {/* button thats gonna appear on the right side */}
      <div className="ml-auto sm:flex hidden flex-row justify-end gap-4">
        <CustomButton 
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) navigate('create-campaign') //go to createCampaign
            else connect()  // or connect the wallet
          }}
        />
        
        
        <Link to="/profile"> 
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer ml-10">
            <img src={profileLogo} alt="user" className="object-fill bg-[#525256] rounded-full" />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
        <div className="sm:hidden flex justify-between items-center relative">
          {/* container for image */}
        <div className="w-[80px] h-[80px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={fundIcon} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
          {/* to show menu */}
          <img 
            src={menu}
            alt="menu"
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)} //to toggle drawer
          />

          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className="mb-4">
              {/* mapping nav links */}
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  {/* showing icons */}
                  <img 
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}  //what we select is green others grey
                  />
                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>
             
            {/* div for custom button at end of list */}
            <div className="flex mx-4">
            <CustomButton 
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
              }}
            />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar