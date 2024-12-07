"use client";

import React, { useState } from 'react';
import LeadsDialog from '@/components/(admin)/leads/LeadsDialog';

interface Lead {
  id: number;
  name: string;
  domainType: string;
  domainName: string;
  socials: string;
  photo: File | null;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState('all');

  const handleAddLead = (newLead: Lead) => {
    setLeads([...leads, newLead]);
  };

  const handleEditLead = (updatedLead: Lead) => {
    setLeads(leads.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
  };

  const handleDeleteLead = (id: number) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const filteredLeads = leads.filter((lead) => {
    if (filter === 'all') return true;
    if (filter === 'tech') return lead.domainType === 'Tech';
    if (filter === 'non-tech') return lead.domainType === 'Non-Tech';
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Core Member</h1>
        <div className="flex items-center space-x-4">
          <select
            title="Filter Leads"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">All Leads</option>
            <option value="tech">Tech</option>
            <option value="non-tech">Non-Tech</option>
          </select>
          <button
            onClick={() => {
              setEditingLead(null);
              setIsDialogOpen(true);
            }}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Add Leads
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Domain Type</th>
              <th className="py-3 px-4 text-left">Domain Name</th>
              <th className="py-3 px-4 text-left">Socials</th>
              <th className="py-3 px-4 text-left">Photo</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{lead.id}</td>
                <td className="py-3 px-4">{lead.name}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    lead.domainType === 'Tech' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {lead.domainType}
                  </span>
                </td>
                <td className="py-3 px-4">{lead.domainName}</td>
                <td className="py-3 px-4">{lead.socials}</td>
                <td className="py-3 px-4">
                  {lead.photo && (
                    <img
                      src={URL.createObjectURL(lead.photo)}
                      alt={lead.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setEditingLead(lead);
                        setIsDialogOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDialogOpen && (
        <LeadsDialog
          onClose={() => {
            setIsDialogOpen(false);
            setEditingLead(null);
          }}
          onAddLead={handleAddLead}
          onEditLead={handleEditLead}
          editingLead={editingLead}
        />
      )}
    </div>
  );
}
