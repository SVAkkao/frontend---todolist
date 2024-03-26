import React, { useState } from 'react';

const ChatAPI = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatInputValue, setChatInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://api.chatanywhere.com.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer sk-ql9dO6EwBd4N3o2IDQyOp7qdmMtvkIt8yAJKPmzQAQB82kcoe',
          'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
          'Content-Type': 'application/json',
          Accept: '*/*',
          'Cache-Control': 'no-cache',
          Host: 'api.chatanywhere.com.cn',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToChat = () => {
    if (response) {
      setChatInputValue(`Human: ${message}\n\nChatGPT: ${response}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {response && (
        <div>
          <p>{response}</p>
          <button onClick={handleSubmitToChat}>Send to ChatGPT</button>
        </div>
      )}
      <textarea value={chatInputValue} readOnly rows={5} />
    </div>
  );
};

export default ChatAPI;