import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import Header from './Header';
import { Link } from 'react-router-dom';

const Home = () => {
return (
    <div>
        <Header></Header>
        <div>
            <p className='text-center'><Link to="/signup">Sign up</Link> or <Link to="/login">log in</Link> now!</p>
        </div>
    </div>
)
}

export default Home;