"use client";

export default function TestimonialsSkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-800 border border-gray-700 rounded-lg overflow-hidden my-4">
      <div className="text-center p-6">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-700"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-600 rounded w-1/2 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto"></div>
      </div>
      <div className="flex justify-center space-x-4 p-4 border-t border-gray-700 bg-gray-900">
        <div className="h-8 bg-gray-700 rounded w-16"></div>
        <div className="h-8 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  );
}
