import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';
import logo from '../assets/images/logo2.png';
import planets from '../assets/images/planets.png';
import search from '../assets/images/search.png';

const TopBar = () => {
    return (
        <div class="container">
            <Link to="/">
                <img class="logo" src={logo} alt="home"/>
            </Link>
        <div class="middle-link">
            <Link to="/planets">
            <img class="logo" src={planets} alt="planets"/>
            </Link>
        </div>
        <div class="middle-link">
            <Link to="/search">
            <img className="logo" src={search} alt="search"/>
            </Link>
        </div>
    </div>
    );
}

export default TopBar;