import * as React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { createUser, userRole } from "../../model/user-model";
import { getRoles, saveUser } from "../../services/user-service";

type createProps = {
    onClose: () => void;
};

const UserCreateDialog: React.FC<createProps> = ({ onClose }) => {
  const [userRoles, setUserRoles] = React.useState<userRole[]>([]);

  React.useEffect(() => {
    getRoles().then((result) => {
      setUserRoles(result);
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState<createUser>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    phone_number: "",
    role: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUser(userData).then((res) => {
      // Reset the form fields
      setUserData({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        phone_number: "",
        role: "",
      });
      setOpen(false);
      onClose();
    });
  };

  const handleSelect = (e: SelectChangeEvent) => {
    setUserData({
      ...userData,
      role: e.target.value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // console.log("Form Data:", userData);
    setUserData({
      ...userData,
      [id]: value,
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the respective details.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              value={userData?.username}
              label="Email Address"
              type="email"
              fullWidth
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              value={userData?.password}
              label="Password"
              type="password"
              fullWidth
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="first_name"
              value={userData?.first_name}
              label="First Name"
              type="text"
              fullWidth
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="last_name"
              value={userData?.last_name}
              label="Last Name"
              type="text"
              fullWidth
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone_number"
              value={userData?.phone_number}
              label="Contact Number"
              type="text"
              fullWidth
              onChange={handleChange}
              variant="standard"
            />
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role"
                value={userData?.role}
                label="Role"
                onChange={handleSelect}
              >
                {/* {userRoles.map((row) => (
                  <MenuItem value={row.id}>{row.role}</MenuItem>
                ))} */}
                <MenuItem value="1">FIELD_OFFICIER</MenuItem>
                <MenuItem value="2">ADMIN</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default UserCreateDialog;
