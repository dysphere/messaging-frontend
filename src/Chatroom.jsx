import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

const ChatroomUsers = ({user}) => {
    return (
        <div><p>{user}</p></div>
    );
}

const Chatroom = ({id, GoChatroom}) => {
return (
    <div>
        <p>{id}</p>
        <p></p>
        <Button onClick={GoChatroom}>Chat</Button>
    </div>
);
}

const Chatrooms = () => {

    const {token, user} = useContext(AuthContext);

    const [chats, setChats] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoading] = useState(true);

    useEffect(() => {
            if (token) {
            fetch("https://messaging-backend-m970.onrender.com/messages", 
                { headers: {
                    'Authorization': `Bearer ${token}`
                  }, })
              .then((response) => {
                if (response.status >= 400) {
                  throw new Error("server error");
                }
                return response.json();
              })
              .then((response) => {setChats(response.chatrooms); console.log(response.chatrooms);})
              .catch((error) => setError(error))
              .finally(() => setLoading(false));
            }
          }, [token]);

    return (<div>

    </div>);

}

const MainChatroom = () => {

    return (<div>

        </div>);

}

const ChatroomPage = () => {

const {user, isAuth} = useContext(AuthContext);

return (
    <div>
        <Header></Header>
        <Chatrooms></Chatrooms>
        <MainChatroom></MainChatroom>
        <Link to="/chatroom/new">New Chatroom</Link>
    </div>
)
}

export default ChatroomPage;