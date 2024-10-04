import React, { useEffect, useState } from 'react';

const Test = () => {
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/cred');
                const data = await response.json();
                setText(data.password);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchText();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-6xl font-bold">{text}</h1>
        </div>
    );
};

export default Test;
