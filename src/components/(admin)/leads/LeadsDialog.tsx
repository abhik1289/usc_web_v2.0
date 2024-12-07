import React, { useState, useEffect } from 'react';

interface Lead {
  id: number;
  name: string;
  domainType: string;
  domainName: string;
  socials: string;
  photo: File | null;
}

interface LeadsDialogProps {
  onClose: () => void;
  onAddLead: (lead: Lead) => void;
  onEditLead?: (lead: Lead) => void;
  editingLead?: Lead | null;
}

export default function LeadsDialog({ 
  onClose, 
  onAddLead,
  onEditLead,
  editingLead 
}: LeadsDialogProps) {
  const [name, setName] = useState('');
  const [domainType, setDomainType] = useState('');
  const [domainName, setDomainName] = useState('');
  const [socials, setSocials] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    if (editingLead) {
      setName(editingLead.name);
      setDomainType(editingLead.domainType);
      setDomainName(editingLead.domainName);
      setSocials(editingLead.socials);
      setPhoto(editingLead.photo);
    }
  }, [editingLead]);

  const handleSubmit = () => {
    const leadData = {
      id: editingLead?.id || Date.now(),
      name,
      domainType,
      domainName,
      socials,
      photo,
    };

    if (editingLead && onEditLead) {
      onEditLead(leadData);
    } else {
      onAddLead(leadData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingLead ? 'Edit Lead' : 'Add Lead'}
        </h2>
        <input
          type="file"
          title="Upload Photo"
          onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
          className="w-full mb-2"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <select
          title="Domain Type"
          value={domainType}
          onChange={(e) => setDomainType(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        >
          <option value="">Select Domain Type</option>
          <option value="Tech">Tech</option>
          <option value="Non-Tech">Non-Tech</option>
        </select>
        <input
          type="text"
          placeholder="Domain Name"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Socials"
          value={socials}
          onChange={(e) => setSocials(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {editingLead ? 'Update' : 'Add'}
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
