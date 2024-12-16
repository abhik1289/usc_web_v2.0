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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const RoleTable = () => {
  const handleEditRole = (role: any) => {};
  const handleDeleteRole = (id: number) => {};
  const getRoles = async (url: string) => {
    const res = await axios.get(url);
    return res.data.roles;
  };

  const {
    isLoading,
    error,
    data: rolesData,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getRoles("/api/domain/get-roles"),
  });
  return (
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
            {rolesData &&
              rolesData.map((role: any, i: number) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{role.title}</TableCell>
                  <TableCell>
                    <div className="flex space-x-3">
                      <Button
                        variant="link"
                        onClick={() => handleEditRole(role)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        className="text-red-500"
                        onClick={() => handleDeleteRole(role.id)}
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

export default RoleTable;
