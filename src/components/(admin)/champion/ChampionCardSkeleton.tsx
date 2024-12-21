import { Card, CardFooter } from "@/components/ui/card";

export function ChampionCardSkeleton() {
    return (
        <Card className='flex flex-wrap animate-pulse bg-gray-900 text-gray-200 gap-2'>
            <div className='w-4/12 bg-gray-700 h-48'></div>
            <div className="w-6/12 py-2">
                <div className="champion_text bg-gray-700 h-6 rounded mb-4"></div>
                <div className="champion_text bg-gray-700 h-6 rounded mb-4 w-3/4"></div>
                <div className="champion_description py-2 flex flex-wrap gap-2 items-center">
                    <div className="profile_photo bg-gray-700 w-[40px] h-[40px] rounded-full"></div>
                    <div className="text">
                        <div className='bg-gray-700 h-6 rounded w-32 mb-2'></div>
                        <div className='bg-gray-700 h-4 rounded w-20'></div>
                    </div>
                </div>
            </div>
            <CardFooter className='w-full border border-t flex items-center pt-4 border-b-0 border-l-0 border-r-0 border-gray-700'>
                <div className=" w-full flex gap-4 justify-center">
                    <div className='bg-gray-700 h-10 w-20 rounded'></div>
                    <div className='bg-gray-700 h-10 w-20 rounded'></div>
                </div>
            </CardFooter>
        </Card>
    );
}
