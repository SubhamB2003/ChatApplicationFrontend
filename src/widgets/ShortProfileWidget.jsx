import { MoreVert } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import UserImage from '../components/UserImage';

function ShortProfileWidget() {

    const user = useSelector((state) => state.user);

    return (
        <Box position="relative" width="100%" display="flex" alignItems="center" gap={3} px={3} py={2}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <UserImage image={user.picturePath} size={60} dpZoom />
            </Box>
            <Box>
                <Typography fontFamily="serif" fontSize="1.2rem" fontWeight="bold">{user.userName}</Typography>
            </Box>
            <Box position="absolute" right={20}>
                <MoreVert />
            </Box>
        </Box>
    )
}

export default ShortProfileWidget