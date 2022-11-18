import "./Footer.css";
import { Card, CardContent } from "@mui/material";

const Footer = () => {
  return (
    <Card
      variant="outlined"
      sx={{ mr: "8px", ml: "8px", mb: "5.5px", mt: "15px" }}
    >
      <CardContent sx={{ height: "100%" }}>
        <h2>Footer</h2>
      </CardContent>
    </Card>
  );
};

export default Footer;
