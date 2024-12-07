"use client";

import React, { useState } from 'react';
import AddRoleDialog from '@/components/(admin)/domains/AddRoleDialog';
import AddDomainGroupDialog from '@/components/(admin)/domains/AddDomainGroupDialog';
import AddDomainDialog from '@/components/(admin)/domains/AddDomainDialog';
import { Role, DomainGroup, Domain, EditingItem } from '@/components/(admin)/domains/type';

export default function DomainsPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [domainGroups, setDomainGroups] = useState<DomainGroup[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isDomainGroupDialogOpen, setIsDomainGroupDialogOpen] = useState(false);
  const [isDomainDialogOpen, setIsDomainDialogOpen] = useState(false);
  const [selectedDomainType, setSelectedDomainType] = useState('all');
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  const handleAddRole = (newRole: Role) => {
    setRoles([...roles, newRole]);
  };

  const handleAddDomainGroup = (newGroup: DomainGroup) => {
    setDomainGroups([...domainGroups, newGroup]);
  };

  const handleAddDomain = (newDomain: Domain) => {
    setDomains([...domains, newDomain]);
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleDeleteDomainGroup = (id: number) => {
    setDomainGroups(domainGroups.filter(group => group.id !== id));
  };

  const handleDeleteDomain = (id: number) => {
    setDomains(domains.filter(domain => domain.id !== id));
  };

  const handleEditRole = (role: Role) => {
    setEditingItem({ type: 'role', ...role });
    setIsRoleDialogOpen(true);
  };

  const handleEditDomainGroup = (group: DomainGroup) => {
    setEditingItem({ type: 'domainGroup', ...group });
    setIsDomainGroupDialogOpen(true);
  };

  const handleEditDomain = (domain: Domain) => {
    setEditingItem({ type: 'domain', ...domain });
    setIsDomainDialogOpen(true);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles(roles.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
  };

  const handleUpdateDomainGroup = (updatedGroup: DomainGroup) => {
    setDomainGroups(domainGroups.map(group => 
      group.id === updatedGroup.id ? updatedGroup : group
    ));
  };

  const handleUpdateDomain = (updatedDomain: Domain) => {
    setDomains(domains.map(domain => 
      domain.id === updatedDomain.id ? updatedDomain : domain
    ));
  };

  const filteredDomains = domains.filter((domain) => {
    if (selectedDomainType === 'all') return true;
    return domain.type === selectedDomainType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Domain Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setEditingItem(null);
              setIsRoleDialogOpen(true);
            }}
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add Roles
          </button>
          <button
            onClick={() => {
              setEditingItem(null);
              setIsDomainGroupDialogOpen(true);
            }}
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add Domain Group
          </button>
          <button
            onClick={() => {
              setEditingItem(null);
              setIsDomainDialogOpen(true);
            }}
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add Domain
          </button>
        </div>
      </div>

      {/* Roles Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Roles</h2>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Role Title</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{role.id}</td>
                <td className="py-3 px-4">{role.title}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleEditRole(role)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteRole(role.id)}
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

      {/* Domain Groups Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Domain Groups</h2>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {domainGroups.map((group) => (
              <tr key={group.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{group.id}</td>
                <td className="py-3 px-4">{group.name}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleEditDomainGroup(group)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteDomainGroup(group.id)}
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

      {/* Domains Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Domains</h2>
          <div className="flex items-center space-x-4">
            <select
              title="Filter Domains"
              value={selectedDomainType}
              onChange={(e) => setSelectedDomainType(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Domains</option>
              <option value="tech">Tech</option>
              <option value="nonTech">Non-Tech</option>
            </select>
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDomains.map((domain) => (
              <tr key={domain.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{domain.id}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    domain.type === 'tech' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {domain.type}
                  </span>
                </td>
                <td className="py-3 px-4">{domain.name}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleEditDomain(domain)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteDomain(domain.id)}
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

      {/* Dialogs */}
      {isRoleDialogOpen && (
        <AddRoleDialog
          onClose={() => {
            setIsRoleDialogOpen(false);
            setEditingItem(null);
          }}
          onAddRole={handleAddRole}
          onEditRole={handleUpdateRole}
          editingRole={editingItem?.type === 'role' ? {
            id: editingItem.id,
            title: editingItem.title || ''
          } : null}
        />
      )}
      {isDomainGroupDialogOpen && (
        <AddDomainGroupDialog
          onClose={() => {
            setIsDomainGroupDialogOpen(false);
            setEditingItem(null);
          }}
          onAddDomainGroup={handleAddDomainGroup}
          onEditDomainGroup={handleUpdateDomainGroup}
          editingGroup={editingItem?.type === 'domainGroup' ? editingItem : null}
        />
      )}
      {isDomainDialogOpen && (
        <AddDomainDialog
          onClose={() => {
            setIsDomainDialogOpen(false);
            setEditingItem(null);
          }}
          onAddDomain={handleAddDomain}
          onEditDomain={handleUpdateDomain}
          editingDomain={editingItem?.type === 'domain' ? editingItem : null}
        />
      )}
    </div>
  );
}
