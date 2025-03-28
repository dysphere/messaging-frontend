import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const ChatroomUser = ({user}) => {
    return (
        <div>
            <p>{user.username}</p>
        </div>
    );
}

const ChatroomUsers = ({users}) => {
    return (<div>
        {users.map((user, index) => (
            <ChatroomUser key={index} user={user}/>
        ))}
    </div>);
}

const Chatroom = ({users, openChatroom}) => {
return (
    <div>
        <ChatroomUsers users={users}/>
        <Button onClick={openChatroom}>Chat</Button>
    </div>
);
}

const Message = ({message}) => {
const {token, user} = useContext(AuthContext);

return (<div>
    <p>{message}</p>
</div>);
}

const MainChatroom = ({id, messages}) => {

    const {token, user} = useContext(AuthContext);

    return (<div>
        {messages.map((message, index) => (
            <Message key={index} message={message}/>
        ))}
        <form>
            <TextInput/>
            <Button></Button>
        </form>
    </div>);
}

const Chatrooms = () => {

    const {token, user} = useContext(AuthContext);

    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
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
              .then((response) => {setChats(response.chatrooms);})
              .catch((error) => setError(error))
              .finally(() => setLoading(false));
            }
          }, [token]);

    useEffect(() => {
    if (token && activeChat) {
    fetch(`https://messaging-backend-m970.onrender.com/messages/chat/${activeChat}`, 
        { headers: {
            'Authorization': `Bearer ${token}`
            }, })
        .then((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json();
        })
        .then((response) => {setMessages(response.chatmessages);})
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
    }, [token, activeChat]);

    function ChatroomOpen(id) {
        setActiveChat(id);
    }


    const chatrooms = !error && !load && chats ? chats.map((chat) => (
        <div key={chat.id}>
           <Chatroom id={chat.id} users={chat.user} openChatroom={() => {ChatroomOpen(chat.id)}}/>
        </div>
    )) : null;

    return (<div>
        {chatrooms}
    </div>);

}

const ChatroomPage = () => {

const {user, isAuth} = useContext(AuthContext);

return (
    <div>
        <Header></Header>
        <Chatrooms></Chatrooms>
        <Link to="/chatroom/new">New Chatroom</Link>
    </div>
)
}

export default ChatroomPage;