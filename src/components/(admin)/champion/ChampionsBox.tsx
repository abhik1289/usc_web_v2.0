import { Card, CardFooter } from '@/components/ui/card';
import { useGetChampions } from '@/hooks/api/champions/useGetChampions'
import React from 'react'
import Image from 'next/image'

function ChampionsBox() {


    const champions = useGetChampions();

    return (
        <div>
           
        </div >
    )
}

export default ChampionsBox