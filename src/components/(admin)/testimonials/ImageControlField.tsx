import React from 'react'
import Image from 'next/image';
import { Edit2Icon } from 'lucide-react';
import { FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
function ImageControlField({ imageUrl, imageAlt, onClick, uploadImgRef, form, onChange, image, disabled }: {
    imageUrl: string,
    imageAlt: string,
    onClick: () => void,
    uploadImgRef: React.RefObject<HTMLInputElement | null>,
    form: any,
    onChange: (event: any) => void,
    image: string | null,
    disabled: boolean
}) {
    return (
        <div>
            {imageUrl && (
                <div className="flex flex-col">
                    <div className="image w-[70px] h-[70px] overflow-hidden rounded-full relative">
                        <Image
                            width={100}
                            height={100}
                            className="rounded-full"
                            alt={imageAlt}
                            src={image ? image : imageUrl}
                        />
                    </div>
                    <div className="edit_btn mt-2">
                        <Button
                            disabled={disabled}
                            onClick={onClick}
                            type="button"
                            className="w-[70px]"
                        >
                            <Edit2Icon size={20} />
                            Edit
                        </Button>
                        <div className="img_upload_ip">
                            <FormField

                                control={form.control}
                                name="photoUrl"
                                render={({ field }) => (

                                    <input
                                        accept="image/*"
                                        name={'photoUrl'}
                                        onChange={onChange}
                                        ref={uploadImgRef}
                                        hidden
                                        type="file"
                                    />

                                )}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageControlField
