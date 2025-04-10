import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useParams } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Header from "./Header";

const ProfileMain = () => {

    const params = useParams();
    const {user, token} = useContext(AuthContext);
    const [profile, setProfile] = useState({});
    const [profileUser, setProfileUser] = useState("");
    const [edit, setEdit] = useState(false);
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

     const form = useForm({
            mode: 'uncontrolled',
            initialValues: {
              bio: '',
            },
        
          });

    const ProfileEdit = () => {
    setEdit(true);
}

    const CancelProfileEdit = () => {
    setEdit(false);
    }

    const handleProfileEdit = async (id) => {
        try {
        const formData = form.getValues();
        await fetch(`https://messaging-backend-m970.onrender.com/profile/${id}/update`,
            {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            body: JSON.stringify(formData),
            });
            
        }
        catch(err) {
            console.error('Error editing profile', err);
        }
    }

    return (
        <div>
            <p>Username: {profileUser.username}</p>
            {edit ? <div>
                 <form onSubmit={(e) => {e.preventDefault(); handleProfileEdit(params.id);}}>
                            <TextInput
                            label="Bio"
                            aria-label="Bio"
                            name="bio"
                            {...form.getInputProps('bio')}
                            key={form.key('bio')}/>
                            <Button onClick={CancelProfileEdit}>Cancel</Button>
                            <Button type="submit">Edit Profile</Button>
                        </form>
            </div> : <p>Bio: {profile.bio}</p>}
            {profileUser.id === user.id && !edit ? <div><Button onClick={ProfileEdit}>Edit Profile</Button></div> : null}
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