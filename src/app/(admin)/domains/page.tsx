"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddRoleDialog from "@/components/(admin)/domains/AddRoleDialog";
import AddDomainGroupDialog from "@/components/(admin)/domains/AddDomainGroupDialog";
import AddDomainDialog from "@/components/(admin)/domains/AddDomainDialog";
import { Role, DomainGroup, Domain, EditingItem } from "@/components/(admin)/domains/type";

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
  const handleAddDomainGroup = (newGroup: DomainGroup) => setDomainGroups([...domainGroups, newGroup]);
  const handleAddDomain = (newDomain: Domain) => setDomains([...domains, newDomain]);

  const handleDeleteRole = (id: number) => setRoles(roles.filter((role) => role.id !== id));
  const handleDeleteDomainGroup = (id: number) => setDomainGroups(domainGroups.filter((group) => group.id !== id));
  const handleDeleteDomain = (id: number) => setDomains(domains.filter((domain) => domain.id !== id));

  const handleEditRole = (role: Role) => {
    setEditingItem({ type: "role", ...role });
    setIsRoleDialogOpen(true);
  };

  const handleEditDomainGroup = (group: DomainGroup) => {
    setEditingItem({ type: "domainGroup", ...group });
    setIsDomainGroupDialogOpen(true);
  };

  const handleEditDomain = (domain: Domain) => {
    setEditingItem({ type: "domain", ...domain });
    setIsDomainDialogOpen(true);
  };

  const handleUpdateRole = (updatedRole: Role) =>
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));

  const handleUpdateDomainGroup = (updatedGroup: DomainGroup) =>
    setDomainGroups(domainGroups.map((group) => (group.id === updatedGroup.id ? updatedGroup : group)));

  const handleUpdateDomain = (updatedDomain: Domain) =>
    setDomains(domains.map((domain) => (domain.id === updatedDomain.id ? updatedDomain : domain)));

  const filteredDomains = domains.filter((domain) => selectedDomainType === "all" || domain.type === selectedDomainType);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Domain Management</h1>
        <div className="flex space-x-4">
          <Button onClick={() => setIsRoleDialogOpen(true)}>Add Roles</Button>
          <Button onClick={() => setIsDomainGroupDialogOpen(true)}>Add Domain Group</Button>
          <Button onClick={() => setIsDomainDialogOpen(true)}>Add Domain</Button>
        </div>
      </div>

      {/* Roles Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl text-black font-bold mb-4">Roles</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">ID</TableHead>
              <TableHead className="text-black">Role Title</TableHead>
              <TableHead className="text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow  key={role.id}>
                <TableCell className="text-black">{role.id}</TableCell>
                <TableCell className="text-black">{role.title}</TableCell>
                <TableCell>
                  <Button className="text-black" variant="link" onClick={() => handleEditRole(role)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteRole(role.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Domain Groups Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl text-black font-bold mb-4">Domain Groups</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">ID</TableHead>
              <TableHead className="text-black">Name</TableHead>
              <TableHead className="text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {domainGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="text-black">{group.id}</TableCell>
                <TableCell className="text-black">{group.name}</TableCell>
                <TableCell>
                  <Button className="text-black" variant="link"  onClick={() => handleEditDomainGroup(group)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteDomainGroup(group.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Domains Section */}
      <div className="bg-white text-black rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Domains</h2>
          <Select value={selectedDomainType} onValueChange={setSelectedDomainType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter Domains" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="nonTech">Non-Tech</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">ID</TableHead>
              <TableHead className="text-black">Type</TableHead>
              <TableHead className="text-black">Name</TableHead>
              <TableHead className="text-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDomains.map((domain) => (
              <TableRow key={domain.id}>
                <TableCell>{domain.id}</TableCell>
                <TableCell className="text-black">{domain.type}</TableCell>
                <TableCell className="text-black">{domain.name}</TableCell>
                <TableCell>
                  <Button className="text-black" variant="link" onClick={() => handleEditDomain(domain)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteDomain(domain.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog Components */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Role" : "Add Role"}</DialogTitle>
          </DialogHeader>
          <AddRoleDialog
            onClose={() => setIsRoleDialogOpen(false)}
            onAddRole={handleAddRole}
            onEditRole={handleUpdateRole}
            editingRole={editingItem?.type === "role" ? editingItem : null}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={isDomainGroupDialogOpen} onOpenChange={setIsDomainGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Domain Group" : "Add Domain Group"}</DialogTitle>
          </DialogHeader>
          <AddDomainGroupDialog
            onClose={() => setIsDomainGroupDialogOpen(false)}
            onAddDomainGroup={handleAddDomainGroup}
            onEditDomainGroup={handleUpdateDomainGroup}
            editingGroup={editingItem?.type === "domainGroup" ? editingItem : null}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={isDomainDialogOpen} onOpenChange={setIsDomainDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Domain" : "Add Domain"}</DialogTitle>
          </DialogHeader>
          <AddDomainDialog
            onClose={() => setIsDomainDialogOpen(false)}
            onAddDomain={handleAddDomain}
            onEditDomain={handleUpdateDomain}
            editingDomain={editingItem?.type === "domain" ? editingItem : null}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
