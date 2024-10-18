'use client';
import Chatbot from '../components/Chatbot';
import { Typography } from '@mui/material';
import styles from '../styles/Home.module.css';

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.overlay}/>
            <div className={styles.content}>
                <Typography variant="h2" className="mb-5 font-bold text-white text-center xl:text-left xl:max-w-[35%]">Travel Assistant Chatbot</Typography>
                <Chatbot />
            </div>
        </div>
    );
};

export default Home;
