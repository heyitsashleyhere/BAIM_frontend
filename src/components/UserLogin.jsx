import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function UserLogin() {
  const { email,setEmail, password, setPassword, handleUserLogin } = useContext(UserContext);

  return (
    <div>
      <h1>User Login</h1>
      <form>
          <input onSubmit={handleUserLogin} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </form>
    </div>
  );
}
