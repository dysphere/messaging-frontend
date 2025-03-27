import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import Header from "./Header";
import { Link } from "react-router-dom";

const Chatroom = () => {

}

const Chatrooms = () => {

}

const MainChatroom = () => {

}

const ChatroomPage = () => {

const {user, isAuth} = useContext(AuthContext);

return (
    <div>
        <Header></Header>
        <Link to="/chatroom/new">New Chatroom</Link>
    </div>
)
}

export default ChatroomPage;