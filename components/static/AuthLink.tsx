import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const AuthLink = (props: Props) => {
  return (
    <div>
        <div className="w-full h-px mt-4 bg-gray-300 opacity-50"></div>

        <span className=' text-sm'> Already have a TieBreaker account ? <Link href={'/Signin'} className=' text-primary font-semibold underline'> login <ArrowRight size={14} className=' inline'/></Link></span>
    </div>
  )
}

export default AuthLink