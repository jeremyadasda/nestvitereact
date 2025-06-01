import React from 'react';
import './Greeting.css'; // Assuming you'll create this CSS file

// Define the shape of your component's props
interface GreetingProps {
  name?: string; // '?' makes the prop optional
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="greeting-card">
      <h2>Hello, {name || 'Guest'}!</h2>
      <p>Hope you're having a wonderful day!</p>
    </div>
  );
};

export default Greeting;