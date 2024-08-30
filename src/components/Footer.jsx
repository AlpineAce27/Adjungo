import React from 'react'

import LogoSqrTransparentBG from '../../public/LogoSqrTransparentBG.png'

const Footer = () => {
  return (
    <footer className='flex h-[5vh] items-center justify-center bg-AJGO_DarkSlateGray'>
      <div className='flex h-[3vh]'>
      <img
              className="object-scale-down"
              src={LogoSqrTransparentBG}
              alt="Adjungo Logo"
            />
      </div>
    </footer>
  )
}

export default Footer