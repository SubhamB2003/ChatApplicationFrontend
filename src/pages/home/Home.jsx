/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, Typography, useMediaQuery } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setAllUserList } from "../../global/state";
import ChatWidget from '../../widgets/ChatWidget';
import ContactWidget from '../../widgets/ContactWidget';
import SearchWidget from '../../widgets/SearchWidget';
import ShortProfileWidget from '../../widgets/ShortProfileWidget';

function Home() {

    const isNonMobile = useMediaQuery("(min-width: 800px)");
    const [showChat, setShowChat] = useState(false);
    const dispatch = useDispatch();
    const allUserList = useSelector((state) => state.allUserList);
    const curUserList = useSelector((state) => state.userList);
    const userChat = useSelector((state) => state.curUserChat);

    useEffect(() => {
        const getAllUsers = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/all`);
            if (res) {
                dispatch(setAllUserList({ allUserList: res.data }))
            }
        }
        getAllUsers();

        if (userChat.length !== 0) {
            setShowChat(true);
        }
    }, [userChat]);

    return (
        <Box width="100%" height="100vh" display="flex" p={isNonMobile ? 3 : 2}>
            <Box flexBasis={isNonMobile ? "30%" : "100%"}>
                <Box sx={{ backgroundColor: "#202c33", zIndex: "10" }}>
                    <ShortProfileWidget />
                </Box>
                <Box mx={3} my={2}>
                    <SearchWidget />
                </Box>
                <Box sx={{ height: "75%", overflowY: "scroll" }}>
                    {allUserList.map((user, i) => (
                        curUserList.map((id) => (
                            user._id === id && (
                                <ContactWidget user={user} key={i + id} />
                            )
                        ))
                    ))}
                </Box>
            </Box>
            {isNonMobile && (
                <>
                    <Divider orientation='vertical' sx={{ backgroundColor: "#202c33" }} />
                    <Box flexBasis={isNonMobile && "70%"} sx={{ backgroundColor: "#202c33" }}>
                        {showChat ? (
                            <ChatWidget />
                        ) : (
                            <Box height="100%" display="flex" justifyContent="center" alignItems="center">
                                <Typography>Click the contact to start the chat</Typography>
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Box>
    )
}

export default Home