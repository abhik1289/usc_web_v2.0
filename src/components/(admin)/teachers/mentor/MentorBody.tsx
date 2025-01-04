import useGetMentor from '@/hooks/api/mentor/useGetMentor';
import React from 'react'
import MentorTableBodyContent from './MentorTableBodyContent';


function MentorBody() {

    const { data: MentorData, isLoading, isError } = useGetMentor();
    const handleEdit = (id: string) => { }
    const handleDelete = (id: string) => { }


    if (isError) {
        return <p>Error</p>
    }
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (MentorData && MentorData.length === 0) {
        return <p>No data</p>
    }

    return (
        <>
            {

                MentorData && MentorData.map((mentor: any, i: number) => <MentorTableBodyContent
                    index={i+1}
                    key={mentor.id}
                    id={mentor.id}
                    fullName={mentor.fullName}
                    school={mentor.school}
                    role={mentor?.Roles?.title}
                    customPosition={mentor.customPosition!}
                    imageUrl={mentor.profilePhoto}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />)
            }

        </>
    )
}

export default MentorBody