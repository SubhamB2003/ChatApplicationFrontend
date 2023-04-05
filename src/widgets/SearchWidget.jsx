import { InfoOutlined, Search } from '@mui/icons-material';
import { Box, IconButton, InputBase, Tooltip } from '@mui/material';
import React from 'react';
import Flexbetween from "../components/Flexbetween";

function SearchWidget() {

    const handleChange = (e) => {

    }

    return (
        <Box sx={{ backgroundColor: "#202c33", borderRadius: "10px" }}>
            <Flexbetween gap="2rem" padding="0.2rem 1.2rem"
                sx={{
                    "&:hover": {
                        cursor: "pointer",
                    },
                    input: {
                        fontFamily: "serif", fontSize: "17px"
                    }
                }}>
                <InputBase sx={{ input: { color: 'white' } }} placeholder='Search users...' onChange={(e) => handleChange(e)} />
                <Box display="flex" gap="1rem">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <Tooltip title='Search using username' placement='right'>
                            <InfoOutlined />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Flexbetween>
        </Box>
    )
}

export default SearchWidget