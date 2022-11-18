import TextField from "@mui/material/TextField";

export default function Settings() {
  return (
    <div
      className="settings"
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
