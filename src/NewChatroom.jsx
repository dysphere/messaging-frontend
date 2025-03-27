import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import Header from "./Header";
import { Checkbox, Button } from "@mantine/core";

const UserCheckbox = ({id, username}) => {
    return (
        <Checkbox
        label={username}
        name="user"
        id={username}
        value={id}
      />
    );
}

const ChatroomForm = () => {

    const {token} = useContext(AuthContext);

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

    const userscheckboxes = !error && !load && users ? users.map((user) => (
        <div key={user.id}>
            <UserCheckbox
            id={user.id}
            username={user.username}
            />
        </div>
    )) : null;

    const handleNewChatroom = () => {}

    return (<div>
        <form onSubmit={handleNewChatroom}>
            {userscheckboxes}
            <Button>New Chatroom</Button>
        </form>
    </div>);
}

const NewChatroom = () => {

    return (<div>
        <Header></Header>
        <ChatroomForm></ChatroomForm>
    </div>)

}

export default NewChatroom;