'use client'

import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, ImageIcon } from 'lucide-react'
import Image from 'next/image'
export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = () => {
    // Implement your upload logic here
    console.log('Uploading image:', image)
  }

  return (

    <Card className="w-[300px] h-[300px] flex flex-col items-center justify-center p-4 space-y-4 text-center bg-gray-800 border-gray-700">
      <div
        className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'border-primary bg-primary/20' : 'border-gray-600'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {image ? (
          <Image
            width={100}
            height={100}
            src={image}
            alt="Uploaded preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-300">
              Drag & drop or click to upload
            </p>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
      />
      <Button
        onClick={handleUpload}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={!image}
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Image
      </Button>
    </Card>

  )
}

