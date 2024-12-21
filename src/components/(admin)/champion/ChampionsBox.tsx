import { Card, CardFooter } from '@/components/ui/card';
import { useGetChampions } from '@/hooks/api/champions/useGetChampions'
import React from 'react'
import Image from 'next/image'
import { ChampionCardSkeleton } from './ChampionCardSkeleton';
import ChampionCard from './ChampionCard';

function ChampionsBox() {


    const champions = useGetChampions();

    return (
        <div>
            {champions.isError ? <p>Error Occres</p> : champions.isLoading ? <ChampionCardSkeleton /> : champions.data && champions.data.length == 0 ? <div className="text-center">No champions found</div> : champions.data && champions.data.map((champion: any, i: number) => <ChampionCard
                key={i}
                fullName={champion.fullName}
                description={champion.description}
                profilePhoto={champion.profilePhoto}
                coverPhoto={champion.coverPhoto}
                role={{ title: champion.role.title }}
                id={champion.id}
            />)}
        </div >
    )
}

export default ChampionsBox