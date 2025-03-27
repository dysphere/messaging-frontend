import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useParams } from "react-router-dom";
import Header from "./Header";

const ProfileMain = () => {

    const params = useParams();
    const {user, token} = useContext(AuthContext);
    const [profile, setProfile] = useState({});
    const [profileUser, setProfileUser] = useState("");
    const [error, setError] = useState(false);
    const [load, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://messaging-backend-m970.onrender.com/profile/${params.id}`, 
            { headers: {
                'Authorization': `Bearer ${token}`
              }, })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("server error");
            }
            return response.json();
          })
          .then((response) => {setProfile(response.profile); setProfileUser(response.profile.user);})
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
      }, [params.id, token]);

    return (
        <div>
            <p>{profileUser.username}</p>
            <p>{profile.bio}</p>
            {}
        </div>
    );
}

const Profile = () => {
    return (
        <div>
            <Header></Header>
            <ProfileMain></ProfileMain>
        </div>
    );
}

export default Profile;