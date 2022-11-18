import { Link } from "react-router-dom";

export default function LoginReauth() {
  return (
    <div>
      <Link to="/">
        <h2>Login Expired! Please login again.</h2>
      </Link>
    </div>
  );
}
