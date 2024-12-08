"use client";

import React, { useState } from "react";
import AddRoleDialog from "@/components/(admin)/domains/AddRoleDialog";
import AddDomainGroupDialog from "@/components/(admin)/domains/AddDomainGroupDialog";
import AddDomainDialog from "@/components/(admin)/domains/AddDomainDialog";
import { Role, DomainGroup, Domain, EditingItem } from "@/components/(admin)/domains/type";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const handleDeleteDomainGroup = (id: number) =>
    setDomainGroups(domainGroups.filter((group) => group.id !== id));
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
    // setEditingItem({ type: "domain", ...domain });
    setIsDomainDialogOpen(true);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles((prev) => prev.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
  };

  const handleUpdateDomainGroup = (updatedGroup: DomainGroup) => {
    setDomainGroups((prev) =>
      prev.map((group) => (group.id === updatedGroup.id ? updatedGroup : group))
    );
  };

  const handleUpdateDomain = (updatedDomain: Domain) => {
    setDomains((prev) => prev.map((domain) => (domain.id === updatedDomain.id ? updatedDomain : domain)));
  };

  const filteredDomains = domains.filter((domain) =>
    selectedDomainType === "all" ? true : domain.type === selectedDomainType
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Domain Management</h1>
        <div className="flex space-x-4">
          <Button onClick={() => setIsRoleDialogOpen(true)}>Add Role</Button>
          <Button onClick={() => setIsDomainGroupDialogOpen(true)}>Add Domain Group</Button>
          <Button onClick={() => setIsDomainDialogOpen(true)}>Add Domain</Button>
        </div>
      </div>

      {/* Roles Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Roles</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Role Title</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.id}</TableCell>
                  <TableCell>{role.title}</TableCell>
                  <TableCell>
                    <div className="flex space-x-3">
                      <Button variant="link" onClick={() => handleEditRole(role)}>
                        Edit
                      </Button>
                      <Button variant="link" className="text-red-500" onClick={() => handleDeleteRole(role.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Domain Groups Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Domain Groups</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domainGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>{group.id}</TableCell>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-3">
                      <Button variant="link" onClick={() => handleEditDomainGroup(group)}>
                        Edit
                      </Button>
                      <Button variant="link" className="text-red-500" onClick={() => handleDeleteDomainGroup(group.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Domains Section */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Domains</h2>
          <Select
            onValueChange={setSelectedDomainType}
            value={selectedDomainType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="nonTech">Non-Tech</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDomains.map((domain) => (
                <TableRow key={domain.id}>
                  <TableCell>{domain.id}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        domain.type === "tech"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {domain.type}
                    </span>
                  </TableCell>
                  <TableCell>{domain.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-3">
                      <Button variant="link" onClick={() => handleEditDomain(domain)}>
                        Edit
                      </Button>
                      <Button variant="link" className="text-red-500" onClick={() => handleDeleteDomain(domain.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
