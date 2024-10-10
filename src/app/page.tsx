'use client';
import Chatbot from '../components/Chatbot';
import { Typography } from '@mui/material';

const Home = () => {
    return (
        <div className="mx-64 my-20">
          <Typography variant="h4" className="mb-5 font-bold text-white text-center">Travel Assistant Chatbot</Typography>
            <Chatbot />
        </div>
    );
};

export default Home;
