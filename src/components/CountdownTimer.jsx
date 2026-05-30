import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

const CountdownTimer = ({ targetDate, title }) => {
    const theme = useTheme();

    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - Date.now();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <Box key={interval} sx={{ textAlign: 'center', mx: 2 }}>
                <Paper 
                    elevation={3} 
                    sx={{ 
                        width: { xs: 60, sm: 80 }, 
                        height: { xs: 60, sm: 80 }, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mb: 1,
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(5px)',
                        borderRadius: '15px'
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                        {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
                    </Typography>
                </Paper>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                    {interval}
                </Typography>
            </Box>
        );
    });

    return (
        <Box sx={{ my: 3, textAlign: 'center' }}>
            {title && (
                <Typography variant="h5" gutterBottom sx={{ mb: 3, fontStyle: 'italic' }}>
                    {title}
                </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {timerComponents.length ? timerComponents : (
                    <Typography variant="h4">The moment has arrived!</Typography>
                )}
            </Box>
        </Box>
    );
};

export default CountdownTimer;