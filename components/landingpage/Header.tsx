import React from 'react'
import Logo from '../static/Logo'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className=' container mx-auto flex flex-col gap-3  justify-center items-center py-16'>
        <div className='flex flex-col justify-center items-center'>
            <Logo big={true} showText={false}/>
            <h1 className=' montserrat text-title'>TieBreaker </h1>
        </div>
        
    </header>
  )
}

export default Header