// my-robust-app-frontend/src/App.tsx
import  { useState, useEffect } from 'react';
//import './App.css'; // Assuming you'll create this CSS file
import Greeting from './components/Greeting';

// Define an interface for the message data we expect from the backend
interface BackendMessage {
  id: number;
  content: string;
}

function App() {
  const [messages, setMessages] = useState<BackendMessage[]>([]);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch message from your backend endpoint that reads from Prisma
        const response = await fetch('/api/message'); // <-- updated endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BackendMessage[] = await response.json(); // <-- expect array
        setMessages(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  
useEffect(() => {
    if (messages.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 3000); // 1000ms = 1 second
    return () => clearInterval(interval);
  }, [messages]);
  

  return (
  <>
  <div className="min-h-screen items-center flex flex-col">
  <header className="App-header py-10 h-[40vh] flex items-end justify-center">
    <div className='mx-auto w-full max-w-4xl'>
      <div className="text-center text-[clamp(4.7rem,8vw,7rem)] ">ZEROUNO</div>
      <div className="flex justify-center items-center gap-2">
        <h2 className="text-center text-[clamp(1.8rem,3vw,2rem)] inline-block">SOLUCIONES</h2>
        <h2 className="text-center text-[clamp(1.8rem,3vw,2rem)] inline-block">INFORMATICAS</h2>
      </div>
      {loading && <p>Loading message from backend...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {messages.length > 0 && (
              <div className="flex flex-col items-center py-5">
                <p className="text-blue-600 text-center select-none">
                  <strong>Backend :</strong> {messages[current].content}
                </p>
                
              </div>
            )}
    </div>
    
    
    
  </header>
  <main>
    <div className="mx-auto w-full max-w-4xl">
      <div className="App flex flex-col items-center justify-center flex-1">
      
      <div className='my-0 w-full'>
        <Greeting name="Aplicaciones WEB" />
        <Greeting name="Sistemas en la Nube AWS y Google" />
        <Greeting name="Landing Page LOW COST" />
        <Greeting name="Aplicaciones Moviles" />
        <Greeting name="Automatizacion con Selenium" />

      </div>
      
    </div>
  </div>
  </main>
  
  
  <footer className="App-footer text-center py-5">
    <p>Powered by ZEROUNO</p>
  </footer>
    
  </div>
      
</>   
  );
  
}

export default App;
