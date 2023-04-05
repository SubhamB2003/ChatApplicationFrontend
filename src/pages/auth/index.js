import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import Form from './Form';


function Auth() {

    const isNonMoblieScreen = useMediaQuery("(min-width: 1000px)");

    return (
        <Box>
            <Box p="1rem 6%" textAlign="center" backgroundColor="lightgray">
                <Typography fontFamily="serif" fontWeight="bold" fontSize={32} color="deepskyblue">
                    Chat Karo
                </Typography>
            </Box>
            <Box width={isNonMoblieScreen ? "50%" : "90%"}
                backgroundColor="lightgray"
                p="2rem" m="2rem auto" borderRadius="1.5rem">
                <Typography
                    fontWeight="400" textAlign="center" fontSize={25}
                    fontFamily="serif" sx={{ mb: "1.5rem" }}
                >Welcome to my chat application</Typography>
                <Form />
            </Box>
        </Box>
    )
}

export default Auth;