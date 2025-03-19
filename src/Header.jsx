import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";

const Header = () => {

    const {user, isAuth, removeAuth} = useContext(AuthContext);

return ()
}

export default Header;