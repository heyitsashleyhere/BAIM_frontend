import Posts from "./components/Posts.jsx";
import UserLogin from "./components/UserLogin.jsx";
import UserRegistration from "./components/UserRegistration.jsx";
import UserEdit from "./components/UserEdit.jsx";
import UserDelete from "./components/UserDelete.jsx";
import UserLogout from "./components/UserLogout.jsx";


export default function App() {
  return (
    <div>
      <UserRegistration />
      <UserLogin />
      <UserLogout />
      <UserEdit />
      <UserDelete />
      <Posts />
    </div>
  );
}
