import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const DomainGroupTable = () => {
  const handleDeleteDomainGroup = (id: number) => {};
  const handleDeleteDomain = (id: number) => {};
  const handleEditDomainGroup = (id: number) => {};
  const domainGroups = [
    {
      id: 1,
      name: "A",
    },
  ];
  return (
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
                    <Button
                      variant="link"
                      onClick={() => handleEditDomainGroup(group.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-red-500"
                      onClick={() => handleDeleteDomainGroup(group.id)}
                    >
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
  );
};
