import React from 'react';
import './Greeting.css'; // Assuming you'll create this CSS file

// Define the shape of your component's props
interface GreetingProps {
  name?: string; // '?' makes the prop optional
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="greeting-card w-full cursor-pointer select-none">
      <h2>DESARROLLO DE {name || 'Soluciones!'} !</h2>
      <p>Registrate para saber mas</p>
    </div>
  );
};

export default Greeting;