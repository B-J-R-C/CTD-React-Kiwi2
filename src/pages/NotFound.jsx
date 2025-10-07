import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px', 
      backgroundColor: '#f8f8f8',
      borderRadius: '8px',
      margin: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ color: '#dc3545', marginBottom: '10px' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        style={{ 
          textDecoration: 'none', 
          backgroundColor: '#007bff', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;