import TextField from "@mui/material/TextField";

export default function User() {
  return (
    <div
      className="user"
      style={{
        height: "100%",
      }}
    >
      <TextField
        autoFocus
        margin="dense"
        id="name"
        fullWidth
        variant="standard"
      />
    </div>
  );
}
