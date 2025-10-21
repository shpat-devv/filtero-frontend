import AccessForm from "../components/AccessForm";

export default function Register() {   
  return (
    <div>
      <title>Register</title>
      <AccessForm route="api/user/register/" method="register" />
    </div>
  );
}
