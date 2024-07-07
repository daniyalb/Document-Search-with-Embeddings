import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

interface UserProps {
  user: any;
  supabase: any;
}

const UserIcon = ({ user, supabase }: UserProps) => {
  const firstLetter = user.email.charAt(0).toUpperCase();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const getAvatarColor = (letter: string) => {
    const hash = letter.charCodeAt(0) % 360;
    const backgroundColor = `hsl(${hash}, 70%, 50%)`;
    const textColor = `hsl(${hash}, 70%, 20%)`;
    return { backgroundColor, textColor };
  };

  const { backgroundColor, textColor } = getAvatarColor(firstLetter);

  return (
    <div>
      <Avatar
        sx={{
          width: 48,
          height: 48,
          cursor: "pointer",
          backgroundColor: backgroundColor,
            color: textColor,
        }}
        onClick={handleMenuOpen}
      >
        {firstLetter}
      </Avatar>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserIcon;
