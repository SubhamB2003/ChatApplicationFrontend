/* eslint-disable react-hooks/exhaustive-deps */
import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Divider, Typography } from "@mui/material";
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserImage from '../components/UserImage';
import { setCurUserChat } from '../global/state';


function ContactWidget({ user }) {

    const dispatch = useDispatch();
    const personTwo = useSelector((state) => state.user._id);

    const handleChatData = async (personOne) => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${personOne}/${personTwo}`);
        dispatch(setCurUserChat({
            curUserChat: res.data
        }));
    }

    return (
        <>
            <Box position="relative" width="100%" display="flex" alignItems="center" gap={3} px={3} py={1.5} onClick={() =>
                handleChatData(user._id)} sx={{
                    ":hover": {
                        backgroundColor: "#202c33"
                    }
                }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <UserImage image={user.picturePath} size={60} />
                </Box>
                <Box>
                    <Typography fontFamily="serif" fontSize="1.2rem" fontWeight="bold">{user.userName}</Typography>
                </Box>
                <Box position="absolute" right={20} sx={{ opacity: 0, ":hover": { opacity: 1 } }}>
                    <KeyboardArrowDown />
                </Box>
            </Box>
            <Divider color="#202c33" sx={{ marginLeft: "6rem" }} />
        </>
    )
}

export default ContactWidget