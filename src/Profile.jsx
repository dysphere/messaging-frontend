import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const ProfileMain = () => {

    const { id } = useParams();

    return (
        <div></div>
    );
}

const Profile = () => {
    return (
        <div>
            <Header></Header>
        </div>
    );
}

export default Profile;