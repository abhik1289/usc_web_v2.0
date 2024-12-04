import React from "react";

function SkeletonLoading() {
  return (
    <div className="relative bg-muted/50 text-card-foreground rounded-lg shadow-lg p-6 flex items-center space-x-6 animate-pulse">
      <div className="editButton w-[45px] h-[45px] absolute bottom-4 right-4 bg-blue-300 rounded-full flex justify-center items-center">
        {/* Placeholder for edit icon */}
      </div>
      <div className="avatar w-24 h-24 bg-muted rounded-full"></div>
      <div className="flex flex-col space-y-2">
        <div className="w-32 h-6 bg-muted rounded"></div>
        <div className="w-20 h-4 bg-muted rounded"></div>
        <div className="w-40 h-4 bg-muted rounded"></div>
        <div className="w-48 h-3 bg-muted rounded"></div>
      </div>
    </div>
  );
}

export default SkeletonLoading;
