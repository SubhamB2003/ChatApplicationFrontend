/* eslint-disable react-hooks/exhaustive-deps */
import { MoreVert, Send } from '@mui/icons-material';
import { Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import Flexbetween from '../components/Flexbetween';
import { MessageStyle } from '../components/MessageStyle';
import UserImage from '../components/UserImage';
import { setCurUserChat } from "../global/state";


function ChatWidget() {

    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const personOne = useSelector((state) => state.user._id);
    const personTwo = useSelector((state) => state.curUserChat.personOne === personOne ? state.curUserChat.personTwo : state.curUserChat.personOne);
    const userChat = useSelector((state) => state.curUserChat.messages);
    const [userTwo, setUserTwo] = useState([]);

    const handleChange = (message) => {
        setMessage(message);
    }

    const handleSubmit = async () => {
        const senderId = personOne;
        const Data = { personOne, personTwo, senderId, message };
        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/message`, Data);
        setMessage("");
        dispatch(setCurUserChat({ curUserChat: res.data }));
    }

    useEffect(() => {
        const handleUserTwoData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${personTwo}`);
            if (res.status === 200) {
                setUserTwo(res.data);
            }
        }
        handleUserTwoData();
    }, [userChat]);

    return (
        <Box>
            <Box position="relative" width="100%" display="flex" alignItems="center" gap={3} px={3} py={2}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    {userTwo.length !== 0 && <UserImage image={userTwo.picturePath} size={60} dpZoom />}
                </Box>
                <Box>
                    <Typography fontFamily="serif" fontSize="1.2rem" fontWeight="bold">{userTwo.userName}</Typography>
                </Box>
                <Box position="absolute" right={20}>
                    <MoreVert />
                </Box>
            </Box>

            <Box sx={{ backgroundColor: "#101a20", height: "70vh", overflowY: "scroll" }} pt={2} px={2}>
                {userChat?.map((chat, i) => (
                    chat.senderId === personOne ? (
                        <Box key={i + chat._id} display="flex" justifyContent="end">
                            <MessageStyle message={chat.message} bgColor={"#00a884"} time={chat.createdAt} />
                        </Box>
                    ) : (
                        <Box key={i + chat._id} display="flex" justifyContent="start">
                            <MessageStyle message={chat.message} bgColor={"#3b4a54"} time={chat.createdAt} />
                        </Box>
                    )
                ))}
            </Box>

            <Box sx={{ backgroundColor: "#202c33" }}>
                <Flexbetween padding="0.7rem 1rem"
                    sx={{
                        input: {
                            fontFamily: "serif", fontSize: "18px", color: "black"
                        }
                    }}>
                    <InputEmoji
                        style={{ input: { fontSize: "3rem" }, fontFamily: "serif" }}
                        value={message}
                        onChange={handleChange}
                        cleanOnEnter
                        onEnter={handleSubmit}
                        placeholder="Type a message"
                    />
                    <Box display="flex" gap="1rem">
                        <IconButton onClick={handleSubmit}>
                            <Send fontSize='large' sx={{ color: "white" }} />
                        </IconButton>
                    </Box>
                </Flexbetween>
            </Box>
        </Box>
    )
}

export default ChatWidget