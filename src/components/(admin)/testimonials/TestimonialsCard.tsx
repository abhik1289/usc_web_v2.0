import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDeleteTestimonials } from '@/hooks/api/testimonials/useDeleteTestimonials';
import AlertDialogBox from '../AlertDialog.tsx/AlertDialog';


export interface TestimonialCardInterface {
    id: string;
    index: number;
    photoUrl: string;
    fullName: string;
    text: string;
    // role: string;
    position: { title: string }
}

function TestimonialsCard({ id, index, photoUrl, fullName, text, position }: TestimonialCardInterface) {
    const [selectedDeletedId, setSelectedDeletedId] = useState<string | null>();
    const [showDialog, setShowDialog] = useState(false);
    const deleteTestimonialsMutation = useDeleteTestimonials(
        selectedDeletedId || ""
    );

    const handleDeleteTestimonial = (id: string) => {
        setSelectedDeletedId(id);
        setShowDialog(true);
    };
    const handleConfirmDeleteTestimonial = () => {
        if (selectedDeletedId) {
            deleteTestimonialsMutation.mutate(selectedDeletedId);
            setShowDialog(false);
        }
    };

    const router = useRouter();

    const handleTestimonialEdit = (id: string) => {
        router.push(`/testimonials/add?id=${id}`)
    };
    return (
        <Card
            key={id}
            className="hover:shadow-xl transition-shadow my-4 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden relative"
        >
            <div className="index absolute bg-blue-500 rounded-full flex justify-center items-center w-[30px] h-[30px] top-6 right-6">
                {index}
            </div>
            <CardHeader className="text-center p-6">
                {photoUrl && (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                        <Image
                            width={96}
                            height={96}
                            src={photoUrl}
                            alt={fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <blockquote className="text-gray-300 italic mb-4">
                    "{text}"
                </blockquote>
                <CardTitle className="text-lg font-semibold text-gray-100">
                    {fullName}
                </CardTitle>
                <p className="text-sm text-gray-400">
                    {position.title}
                </p>
            </CardHeader>
            <CardFooter className="flex justify-center space-x-4 p-4 border-t border-gray-700 bg-gray-900">
                <Button
                    variant="ghost"
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => handleTestimonialEdit(id)}
                >
                    Edit
                </Button>
                <Button
                    variant="ghost"
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDeleteTestimonial(id)}
                >
                    Delete
                </Button>
            </CardFooter>
            <AlertDialogBox
                show={showDialog}
                setShow={() => setShowDialog(false)}
                title="Delete Testimonial"
                description="Are you sure you want to delete this testimonial? This action cannot be undone."
                onConfirm={handleConfirmDeleteTestimonial}
            />
        </Card>
    )
}

export default TestimonialsCard