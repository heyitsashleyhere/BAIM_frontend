import Posts from "./components/Posts.jsx";
import UserEdit from "./components/UserEdit.jsx";
import UserDelete from "./components/UserDelete.jsx";
import UserLogout from "./components/UserLogout.jsx";
import LoginRegister from "./components/LoginRegister/LoginRegister.jsx";


export default function App() {
  return (
    <div>
      <LoginRegister />
      <UserLogout />
      <UserEdit />
      <UserDelete />
      <Posts />
    </div>
  );
}
