import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>About Todo Application</h2>
      <p>This is a simple Todo List app built using React and an external API (Airtable).</p>
      <p>It uses state management with `useReducer`, asynchronous data fetching, and optimistic UI updates.</p>
    </div>
  );
};

export default AboutPage;