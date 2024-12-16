"use client";

import React, { useState } from "react";
import AddRoleDialog from "@/components/(admin)/domains/AddRoleDialog";
import AddDomainGroupDialog from "@/components/(admin)/domains/AddDomainGroupDialog";
import AddDomainDialog from "@/components/(admin)/domains/AddDomainDialog";
import {
  Role,
  DomainGroup,
  Domain,
  EditingItem,
} from "@/components/(admin)/domains/type";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RoleTable from "@/components/(admin)/domains/role-table";
import { DomainGroupTable } from "@/components/(admin)/domains/domainGroup-table";

export default function DomainsPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [domainGroups, setDomainGroups] = useState<DomainGroup[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isDomainGroupDialogOpen, setIsDomainGroupDialogOpen] = useState(false);
  const [isDomainDialogOpen, setIsDomainDialogOpen] = useState(false);
  const [selectedDomainType, setSelectedDomainType] = useState("all");
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  const handleAddRole = (newRole: Role) => setRoles([...roles, newRole]);
  const handleAddDomainGroup = (newGroup: DomainGroup) =>
    setDomainGroups([...domainGroups, newGroup]);
  const handleAddDomain = (newDomain: Domain) =>
    setDomains([...domains, newDomain]);

  const handleEditDomain = (domain: Domain) => {
    // setEditingItem({ type: "domain", ...domain });
    setIsDomainDialogOpen(true);
    console.log(domain);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles((prev) =>
      prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    );
  };

  const handleUpdateDomainGroup = (updatedGroup: DomainGroup) => {
    setDomainGroups((prev) =>
      prev.map((group) => (group.id === updatedGroup.id ? updatedGroup : group))
    );
  };

  // const handleUpdateDomain = (updatedDomain: Domain) => {
  //   setDomains((prev) => prev.map((domain) => (domain.id === updatedDomain.id ? updatedDomain : domain)));
  // };

  

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Domain Management</h1>
        <div className="flex space-x-4">
          <Button onClick={() => setIsRoleDialogOpen(true)}>Add Role</Button>
          <Button onClick={() => setIsDomainGroupDialogOpen(true)}>
            Add Domain Group
          </Button>
          <Button onClick={() => setIsDomainDialogOpen(true)}>
            Add Domain
          </Button>
        </div>
      </div>

      {/* Roles Section */}
      <RoleTable />

      {/* Domain Groups Section */}
      <DomainGroupTable />
      {/* Domains Section */}
      

      {/* Dialogs */}
      {isRoleDialogOpen && (
        <AddRoleDialog
          onClose={() => {
            setIsRoleDialogOpen(false);
            setEditingItem(null);
          }}
          onAddRole={handleAddRole}
          onEditRole={handleUpdateRole}
          // editingRole={editingItem?.type === "role" ? editingItem : null}
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
          // editingGroup={editingItem?.type === "domainGroup" ? editingItem : null}
        />
      )}
      {isDomainDialogOpen && (
        <AddDomainDialog
          onClose={() => {
            setIsDomainDialogOpen(false);
            setEditingItem(null);
          }}
          onAddDomain={handleAddDomain}
          // onEditDomain={handleUpdateDomain}
          // editingDomain={editingItem?.type === "domain" ? editingItem : null}
        />
      )}
    </div>
  );
}
