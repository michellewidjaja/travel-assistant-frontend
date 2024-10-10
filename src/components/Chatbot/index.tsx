import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import FlightList from '../FlightList';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [parameters, setParameters] = useState({
      origin: '',
      destination: '',
      date: '',
    });
    const [flightInfo, setFlightInfo] = useState([]);
    const endOfMessagesRef = useRef(null);

    const replacePlaceholders = (text, params) => {
        return text.replace(/@(\w+)/g, (_, key) => params[key] || `@${key}`);
    };

    const handleSend = async () => {
        setMessages(prevMessages => [
            ...prevMessages, 
            { text: input, sender: 'user' }
        ]);
        setIsLoading(true);
        
        try {
            const response = await fetch('http://127.0.0.1:5000/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setFlightInfo(data.flight_info)
            
            let responseText = data.response;
            const newParams = data.params || {};

            setParameters(prev => ({
                ...prev,
                origin: newParams.origin || prev.origin,
                destination: newParams.destination || prev.destination,
                date: newParams.date || prev.date,
            }));
            
            responseText = replacePlaceholders(responseText, parameters);

            setMessages(prevMessages => [
                ...prevMessages, 
                { text: responseText, sender: 'bot' }
            ]);
        } catch (error) {
            console.error('Error fetching the chatbot response:', error);
            setMessages(prevMessages => [
                ...prevMessages, 
                { text: "Sorry, I couldn't get a response from the server.", sender: 'bot' }
            ]);
        } finally {
            setIsLoading(false);
            setInput('');
        }
    };

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && input.trim() !== '') {
        handleSend();
      }
    }


    console.log(flightInfo);
            
    return (
        <Paper style={{ padding: '40px', borderRadius: '20px', backgroundColor: '#262020' }}>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #545252', marginBottom: '10px', borderRadius: '20px', padding: '20px' }}>
                {messages.map((msg, index) => (
                    <div key={index} className={`my-4 ${msg.sender === 'user' ? 'user-message text-right' : 'bot-message text-left'}`}>
                        <span className={`inline-block rounded-[20px] p-[6px] px-[12px] max-w-[50%] text-white ${msg.sender === 'user' ? 'bg-[#438dff] text-right' : 'bg-[#6a6a6a] text-left'}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
                {isLoading && (
                    <div className="my-4 text-left">
                        <span className="bg-[#6a6a6a] text-white inline-block rounded-[20px] p-[6px] px-[12px]">Typing...</span>
                    </div>
                )}
                <FlightList flightInfo={flightInfo} />
                <div ref={endOfMessagesRef} />
            </div>
            <TextField
              label="Type your message"
              placeholder="Write a message and press Enter"
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} 
              sx={{
                margin: '10px 0',
                '& input': {
                    color: '#fff',
                },
                '& .MuiInputLabel-root': {
                    color: '#fff',
                    '&.Mui-focused': {
                        color: '#438dff',
                    },
                    '&.MuiInputLabel-shrink': {
                        color: '#438dff',
                    },
                },
                '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    '& fieldset': {
                        borderColor: '#438dff',
                    },
                    '&:hover fieldset': {
                        borderColor: '#438dff',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#438dff',
                    },
                },
              }}
            />
            <Button onClick={handleSend} variant="contained" color="primary" fullWidth style={{ marginTop: '15px' }}
               sx={{
                backgroundColor: '#438dff',
                color: 'white',
                borderRadius: '50px',
                '&:hover': {
                    backgroundColor: '#2b7de1',
                },
                marginTop: '15px',
                padding: '12px 20px'
            }}>
                Send
            </Button>
        </Paper>
    );
};

export default Chatbot;
