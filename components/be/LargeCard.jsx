import { Layers } from 'lucide-react'
import React from 'react'

const LargeCard = ({className, item}) => {
  return (
    <div className={`rounded-lg text-white shadow-md p-8 flex w-full items-center flex-col gap-2 ${className}`}>
        <Layers/>
        <h4>{item.title}</h4>
        <h2 className='lg:text-3xl text-2xl'>${item.sales}</h2>
    </div>
  )
}

export default LargeCard