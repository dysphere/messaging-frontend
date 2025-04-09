import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import Header from "./Header";
import { Checkbox, Button, Group } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";

const UserCheckbox = ({id, username, form}) => {

    return (
        <Checkbox
        label={username}
        name="user"
        id={username}
        value={id.toString()}
        {...form.getInputProps('users', { type: 'checkbox' })}
      />
    );
}

const ChatroomForm = () => {

    const {token} = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoading] = useState(true);

    let navigate = useNavigate();

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

          const form = useForm({
            mode: 'uncontrolled',
            initialValues: {
              users: [],
            },
        
          });

    const userscheckboxes = !error && !load && users ? users.map((user) => (
        <div key={user.id}>
            <UserCheckbox
            id={user.id}
            username={user.username}
            form={form}
            />
        </div>
    )) : null;

    const handleNewChatroom = async () => {
        try {
            const formData = form.getValues();
            const selectedUsers = formData.users.map(Number);
            await fetch(`https://messaging-backend-m970.onrender.com/messages/chat/new`,
                {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({ user: selectedUsers }),
                }
            );
            navigate("/chatroom");
    
        }
        catch(err) {
            console.error('Error creating new chatroom', err);
        }
    }

    return (<div>
        <form onSubmit={async (e) => {e.preventDefault(); await handleNewChatroom();}}>
        <Checkbox.Group
        {...form.getInputProps('users')}
      >
            {userscheckboxes}
            </Checkbox.Group>
            <Button type="submit">New Chatroom</Button>
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