import { Card, CardFooter } from '@/components/ui/card';
import { useGetChampions } from '@/hooks/api/champions/useGetChampions'
import React from 'react'
import Image from 'next/image'

function ChampionsBox() {


    const champions = useGetChampions();

    return (
        <div>
            <Card className='flex flex-wrap'>
                <div className='w-4/12'>
                    <Image src={''} alt='img' width={100} height={100} />
                </div>
                <div className="w-8/12 py-2">
                    <div className="champion_text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet veritatis placeat et aspernatur? Repellendus repudiandae recusandae modi delectus laboriosam voluptas, aliquid maxime veniam suscipit atque quis libero expedita odit! <br></br>
                        placeat et aspernatur? Repellendus repudiandae recusandae modi delectus laboriosam voluptas, aliquid maxime veniam suscipit atque quis libero expedita odit!
                    </div>
                    <div className="chmapion_description py-2 flex flex-wrap gap-2 items-center">
                        <div className="profile_photo">
                            <img src="https://avatar.iran.liara.run/public/35" alt="" className='w-[40px] h-[40px]' />
                        </div>
                        <div className="text">
                            <h1 className='text-xl font-bold'>Champion Name</h1>
                            <p className='text-sm text-gray-500'>Champion Description</p>
                        </div>
                    </div>
                </div>
                <CardFooter className='w-full border border-t flex items-center pt-4 border-b-0 border-l-0 border-r-0'>
                    <div className= " w-full flex gap-4 justify-center">
                        <button className='btn text-blue-400 hover:text-blue-600 transition-all duration-200' >Edit</button>
                        <button className='btn text-red-500 hover:text-purple-600 transition-all duration-200'>Delete</button>
                    </div>
                </CardFooter>
            </Card >
        </div >
    )
}

export default ChampionsBox