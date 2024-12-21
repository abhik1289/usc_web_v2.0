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
                name={champion.fullName}
                description={champion.description}
                profilePhotoUrl={champion.profilePhoto}
                bannerUrl={champion.coverPhoto}
                role={champion.role.title}
            />)}
        </div >
    )
}

export default ChampionsBox