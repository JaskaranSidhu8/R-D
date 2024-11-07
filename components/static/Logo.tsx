import Image from 'next/image'
import React from 'react'

type Props = {
  showText:boolean,
  big:boolean
}

const Logo = ({ className, ...props }: Props & { className?: string }) => {  return (
    <div className={`flex flex-col gap-0.5 justify-center items-center ${props.big ?'max-w-32':'max-w-16'}`}>
        <Image className='w-full' src={'/logo.png'} width={300} height={300} alt='logo'/>
        {props.showText && (
          <span className={`montserrat ${props.big ? 'text-xl' : 'text-md'}`}>
            TieBreaker
          </span>)}
    </div>
  )
}

export default Logo