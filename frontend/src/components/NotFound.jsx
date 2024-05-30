import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const numberOfTimes = Array(10).fill();

  return (
    <div className="wrapper">
      <div className="scroll">
        <h1>STAR WARS</h1>
        <h2>ERROR 404</h2>
        <ul>
          {numberOfTimes.map((_, index) => (
            <li key={index}>
              <p>
                We're sorry, but the page you're looking for doesn't exist. Please check the URL for errors. Try going back to the previous page or go to our <Link to="/">home page</Link>.
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
