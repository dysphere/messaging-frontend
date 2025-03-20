import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Menu, Center, Container, Burger, Group, Flex, Popover, NavLink, Button } from '@mantine/core';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const {user, isAuth, removeAuth} = useContext(AuthContext);
    let navigate = useNavigate();

    const no_auth_links = [
        { link: '/signup', label: 'Sign Up' },
        { link: '/login', label: 'Log In' },
      ];

    const auth_links = [
        { link: '/chatroom', label: 'Chatrooms' },
        { link: '/users', label: 'Users' },
        { link: `/profile/${user.profileId}`, label: `${user.username}`},
    ];

    const no_auth_items = no_auth_links.map((link) => (
        <Link
        to={link.link}>
            {link.label}
        </Link>
    ));

    const auth_items = auth_links.map((link) => (
        <Link
        to={link.link}>
            {link.label}
        </Link>
    ));

    const handleLogout = async () => {
        try {
            const response = await fetch("https://messaging-backend.fly.dev/logout",
                {method: 'POST'}
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

            removeAuth();
            navigate('/');
        }
        catch(err) {
            console.error('Error Logging out', err)
        }
    };

return (
<div>
{isAuth ? 
<header>
    <Container fluid>
        <Flex>
            <div>
                <Link to="/">Home</Link>
            </div>
            <Group>{auth_items}</Group>
        </Flex>
    </Container>
</header> : 
<header>
    <Container fluid>
        <Flex>
            <div>
                <Link to="/">Home</Link>
            </div>
            <Group>{no_auth_items}</Group>
        </Flex>
    </Container>
    </header>}
</div>
);
}

export default Header;