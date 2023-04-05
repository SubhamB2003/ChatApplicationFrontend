import { Box, Typography } from '@mui/material';
import React from 'react';


export function MessageStyle({ message, bgColor, time }) {

    const date = new Date(time);
    const localCreatedAt = date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });

    return (
        <Box p={1} backgroundColor={bgColor} maxWidth={"80%"} borderRadius="10px" mb={2}>
            <Typography fontSize="1.2rem" fontFamily="serif">{message.charAt(0).toUpperCase() + message.substring(1, message.length)}</Typography>
            <Typography fontSize="0.6rem" textAlign="end" fontFamily="serif">{localCreatedAt}</Typography>
        </Box>
    )
}

export default MessageStyle;