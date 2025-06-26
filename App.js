import React, { useState } from 'react';
import './App.css';

function App() {
  const [destination, setDestination] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = `Suggest a travel itinerary for ${destination}`;
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      const reply =
        data.choices?.[0]?.message?.content || 'No response from AI.';

      setResponse(reply);
    } catch (err) {
      console.error('Frontend fetch error:', err);
      setResponse('Something went wrong. Check server.');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>AI Travel Companion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
        />
        <button type="submit" disabled={loading || !destination}>
          {loading ? 'Loading...' : 'Get Plan'}
        </button>
      </form>
      <div className="response-box">{response}</div>
    </div>
  );
}

export default App;
