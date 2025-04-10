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

const Message = ({id, message, username, date, handleDeleteMessage, handleEditChange, handleCancelEdit, finishSubmit, isEdit}) => {
const {user, token} = useContext(AuthContext);

const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      content: message,
    },

  });

  async function handleEditSubmit(id) {
    try {
        const formData = form.getValues();
        await fetch(`https://messaging-backend-m970.onrender.com/messages/${id}/update`,
            {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            body: JSON.stringify(formData),
            }
        );

    }
    catch(err) {
        console.error('Error deleting message', err);
    }
}

return (<div>
    {!isEdit ? <p>{message}</p> : <form onSubmit={async (e) => {e.preventDefault(); await handleEditSubmit(id); handleCancelEdit(id);}}>
         <TextInput
                    aria-label="content"
                    name="content"
                    {...form.getInputProps('content')}
                    key={form.key('content')}/>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                    <Button type="submit">Submit</Button></form>}
    <p>{username}</p>
    <p>{date}</p>
    {username === user.username && !isEdit ? <div>
        <Button onClick={handleEditChange}>Edit</Button>
        <Button onClick={handleDeleteMessage}>Delete</Button>
    </div> : null}
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
              .then((response) => { const filteredChatrooms = response.chatrooms.map(chatroom => {
                return {
                  ...chatroom,
                  user: chatroom.user.filter(person => person.username !== user.username),
                };
              }); setChats(filteredChatrooms);})
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
        .then((response) => {response.chatmessages.forEach((message) => message.idEdit = false); setMessages(response.chatmessages);})
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
    }, [token, activeChat]);

    function ChatroomOpen(id) {
        setActiveChat(id);
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          content: '',
        },
    
      });

    async function createMessage(activeChat, token) {
        try {
            const formData = form.getValues();
            await fetch(`https://messaging-backend-m970.onrender.com/messages/chat/${activeChat}/message`,
                {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(formData),
                }
            );

        }
        catch(err) {
            console.error('Error posting message', err);
        }
    }

    function editMessageStatus(id) {
        const updatedMessages = messages.map((message) => {
            if (message.id === id) {
                return { ...message, isEdit: true };
            }
            return message;
        });
        setMessages(updatedMessages);
    }

    function cancelEdit(id) {
        const updatedMessages = messages.map((message) => {
            if (message.id === id) {
                return { ...message, isEdit: false };
            }
            return message;
        });
        setMessages(updatedMessages);
    }

    async function deleteMessage(id) {
        try {
            await fetch(`https://messaging-backend-m970.onrender.com/messages/${id}/delete`,
                {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
            );

        }
        catch(err) {
            console.error('Error deleting message', err);
        }
    }

    const chatrooms = !error && !load && chats ? chats.map((chat) => (
        <div key={chat.id}>
           <Chatroom id={chat.id} users={chat.user} openChatroom={() => {ChatroomOpen(chat.id)}}/>
        </div>
    )) : null;

    return (<div>
        {chatrooms}
        {activeChat ? <div>
        {messages.map((message) => (
            <Message key={message.id} id={message.id} message={message.content} username={message.user.username} date={message.createdAt}
            handleCancelEdit={() => cancelEdit(message.id)} 
            handleEditChange={() => editMessageStatus(message.id)} handleDeleteMessage={() => deleteMessage(message.id)}
            isEdit={message.isEdit}/>
        ))}
        <form onSubmit={(e) => {e.preventDefault; createMessage(activeChat, token);}}>
            <TextInput
            name="content"
            {...form.getInputProps('content')}
            key={form.key('content')}/>
            <Button type="submit">Message</Button>
        </form>
    </div> : <div></div>}
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