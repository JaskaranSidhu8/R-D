import Image from 'next/image'
import React from 'react'

type Props = {
  showText:boolean,
  big:boolean
}

const Logo = (props: Props) => {
  return (
    <div className={`flex flex-col gap-2.5 justify-center items-center ${props.big ?'max-w-32':'max-w-24'}`}>
        <Image className='w-full' src={'/logo.png'} width={300} height={300} alt='logo'/>
        {props.showText && <span className=' montserrat text-lg'>TieBreaker </span>}
    </div>
  )
}

export default Logo