"use client";

import React, { useState } from "react";
import AddRoleDialog from "@/components/(admin)/domains/AddRoleDialog";
import AddDomainGroupDialog from "@/components/(admin)/domains/AddDomainGroupDialog";

// import {
//   Role,
//   DomainGroup,
//   Domain,
//   EditingItem,
// } from "@/components/(admin)/domains/type";
import { Button } from "@/components/ui/button";

import RoleTable from "@/components/(admin)/domains/role-table";
import { DomainGroupTable } from "@/components/(admin)/domains/domainGroup-table";
import { useRouter } from "next/navigation";
import { DomainTable } from "@/components/(admin)/domains/domain-table";
export default function DomainsPage() {


  const router = useRouter();


  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isDomainGroupDialogOpen, setIsDomainGroupDialogOpen] = useState(false);
  

  

 
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
          <Button onClick={() =>  router.push("/domains/add-domain")}>
            Add Domain
          </Button>
        </div>
      </div>

      {/* Roles Section */}
      <RoleTable />

      {/* Domain Groups Section */}
      <DomainGroupTable />
      {/* Domains Section */}
       <DomainTable/>

      {/* Dialogs */}
      {isRoleDialogOpen && (
        <AddRoleDialog
          onClose={() => {
            setIsRoleDialogOpen(false);
            // setEditingItem(null);
          }}
          // onAddRole={handleAddRole}
          // onEditRole={handleUpdateRole}
          // editingRole={editingItem?.type === "role" ? editingItem : null}
        />
      )}
      {isDomainGroupDialogOpen && (
        <AddDomainGroupDialog
          onClose={() => {
            setIsDomainGroupDialogOpen(false);
            // setEditingItem(null);
          }}
          // onAddDomainGroup={handleAddDomainGroup}
          // onEditDomainGroup={handleUpdateDomainGroup}
          // editingGroup={editingItem?.type === "domainGroup" ? editingItem : null}
        />
      )}
     
    </div>
  );
}
