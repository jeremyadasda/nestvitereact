import React from 'react';
import './Greeting.css'; // Assuming you'll create this CSS file

// Define the shape of your component's props
interface GreetingProps {
  name?: string; // '?' makes the prop optional
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="greeting-card">
      <h2>DESARROLLO DE {name || 'memis'} !</h2>
      <p>Dark pepito inc</p>
    </div>
  );
};

export default Greeting;