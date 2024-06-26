import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

function Time() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const timeString = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
            setCurrentTime(timeString);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div 
            className="bg-beige20  rounded-[20px] w-[22vw] h-[5vw]"
            whileHover={{ scale: 1.1 }}
            style={{ 
                transition: "transform 0.2s",

            }}>
            <div className="flex  text-black leading-10 ">
                <p style={{ fontSize: "3vw", padding: 10 }}>{currentTime}</p>
            </div>
        </motion.div>
    );
}

export default Time;
