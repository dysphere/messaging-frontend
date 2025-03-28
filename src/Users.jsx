import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import Header from "./Header";

const User = ({username, addChatroom, profileId}) => {
    const profileLink = `/profile/${profileId}`

    return (
        <div>
            <Link to={profileLink}>{username}</Link>
            <Button onClick={addChatroom}>Message</Button>
        </div>
    );
}

const UsersPage = () => {

    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
        fetch("https://messaging-backend-m970.onrender.com/messages/users", 
            { headers: {
                'Authorization': `Bearer ${token}`
              }, })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("server error");
            }
            return response.json();
          })
          .then((response) => {setUsers(response.users);})
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
        }
      }, [token]);

      async function addSmallChat(id) {
        await fetch(`https://messaging-backend-m970.onrender.com/messages/chat/${id}/new`, 
            { 
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}`
              }, });
        navigate("/chatroom");
      }

      const userscards = !error && !load && users ? users.map((user) => (
        <div key={user.id}>
            <User
            username={user.username}
            profileId={user.profileId}
            addChatroom={() => {addSmallChat(user.id)}}/>
        </div>
      )) : null;

    return (
        <div>
            <Header></Header>
            <div>{userscards}</div>
        </div>
    );
}

export default UsersPage;