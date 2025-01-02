import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  profile_photo?: string;
  createdAt: string;
  role: string;
}

export default function ProfileHeader({
  first_name,
  last_name,
  email,
  profile_photo,
  createdAt,
  role
}: ProfileData) {
  // This data would typically come from your database or API
  const user = {
    name: `${first_name} ${last_name}`,
    role: `${role}`,
    email: `${email}`,
    joinDate: `${createdAt}`,
    profilePhoto: `${profile_photo}`,
  };
  

  const handleLogout =()=>{
    console.log("Logout")
  }

  return (
    <div className="relative bg-muted/50 text-card-foreground rounded-lg shadow-lg p-6 flex items-center space-x-6">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user.profilePhoto} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">{user.role}</p>
        <p className="text-muted-foreground">{user.email}</p>
        <p className="text-sm text-muted-foreground">
          Joined on {new Date(user.joinDate).toLocaleDateString()}
        </p>
      </div>
      <Button onClick={handleLogout} className="absolute top-6 right-6">
        Logout
      </Button>
    </div>
  );
}


