import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  const users = [
    {
      fullname: "John Doe",
      username: "john_doe",
      email: "john.doe@example.com",
      role: "Admin",
      addedBy: "super_admin_01",
    },
    {
      fullname: "Jane Smith",
      username: "jane_smith",
      email: "jane.smith@example.com",
      role: "Super Admin",
      addedBy: "admin_01",
    },
    {
      fullname: "Alice Wonder",
      username: "alice_wonder",
      email: "alice.wonder@example.com",
      role: "Moderator",
      addedBy: "admin_02",
    },
    {
      fullname: "Bob Builder",
      username: "bob_builder",
      email: "bob.builder@example.com",
      role: "Admin",
      addedBy: "super_admin_01",
    },
    {
      fullname: "Clara Oswald",
      username: "clara_oswald",
      email: "clara.oswald@example.com",
      role: "Moderator",
      addedBy: "admin_03",
    },
  ];
  
  export function UserTable() {
    return (
      <Table className="borde rounded-md mt-5">
        <TableCaption>A list of system users and their roles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Added By</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.username}>
              <TableCell className="font-medium">{user.fullname}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.addedBy}</TableCell>
              <TableCell className="text-right space-x-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-right">
              Total Users: {users.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
  