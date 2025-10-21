import AccessForm from "../components/AccessForm";

export default function Login() {
  return (
      <div>
        <title>Login</title>
        <AccessForm route="/api/token/" method="login" />
      </div>
  );
}
 