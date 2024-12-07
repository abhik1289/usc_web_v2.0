"use client";

import React, { useState } from 'react';
import AdvisorDialog from '@/components/(admin)/advisor/AdvisorDialog';
import { AdvisorMember } from '@/components/(admin)/advisor/type';

export default function AdvisorPage() {
  const [members, setMembers] = useState<AdvisorMember[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AdvisorMember | null>(null);

  const handleSubmit = (memberData: AdvisorMember) => {
    if (editingMember) {
      setMembers(members.map(member => 
        member.id === memberData.id ? memberData : member
      ));
    } else {
      setMembers([...members, memberData]);
    }
  };

  const handleDelete = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const advisors = members.filter(member => member.type === 'advisor');
  const mentors = members.filter(member => member.type === 'mentor');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mentor & Advisor</h1>
        <button
          onClick={() => {
            setEditingMember(null);
            setIsDialogOpen(true);
          }}
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add Member
        </button>
      </div>

      {/* Advisors Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Advisors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisors.map((advisor) => (
            <div key={advisor.id} className="bg-gray-50 rounded-lg p-4 relative">
              {advisor.photo && (
                <img
                  src={URL.createObjectURL(advisor.photo)}
                  alt={advisor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-lg font-semibold text-center">{advisor.name}</h3>
              <p className="text-gray-600 text-center mb-2">{advisor.title}</p>
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  onClick={() => {
                    setEditingMember(advisor);
                    setIsDialogOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(advisor.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentors Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-gray-50 rounded-lg p-4 relative">
              {mentor.photo && (
                <img
                  src={URL.createObjectURL(mentor.photo)}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h3 className="text-lg font-semibold text-center">{mentor.name}</h3>
              <p className="text-gray-600 text-center mb-2">{mentor.title}</p>
              {mentor.additionalInfo && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  {mentor.additionalInfo}
                </p>
              )}
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  onClick={() => {
                    setEditingMember(mentor);
                    setIsDialogOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(mentor.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <AdvisorDialog
          onClose={() => {
            setIsDialogOpen(false);
            setEditingMember(null);
          }}
          onSubmit={handleSubmit}
          editingMember={editingMember}
        />
      )}
    </div>
  );
}
