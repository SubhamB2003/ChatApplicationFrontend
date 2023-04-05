import { Visibility, VisibilityOff } from '@mui/icons-material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Button, InputAdornment, TextField, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import Flexbetween from "../../components/Flexbetween";
import { setLogin, setUserList } from "../../global/state";



const loginSchema = yup.object().shape({
    email: yup.string().email("email is required").required(),
    password: yup.string().min(6, "password must be at least 6 characters").required("password is required")
});

const registerSchema = yup.object().shape({
    userName: yup.string().required("username is required"),
    email: yup.string().email("email is required").required(),
    password: yup.string().min(6, "password must be at least 6 characters").required("password is required"),
    picture: yup.string().required("picture is required"),
    about: yup.string().required("about is required")
})


const initialValues = {
    userName: "",
    email: "",
    password: "",
    picture: "",
    about: ""
}



function Form() {

    const [pageType, setPageType] = useState("login");
    const [visible, setVisible] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Login = async (values, onSubmitProps) => {
        const loginUser = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, values);
        if (loginUser) {
            dispatch(setLogin({
                user: loginUser.data.user,
                token: loginUser.data.token
            }));
            dispatch(setUserList({ userList: loginUser.data.user.friends }));
        }
        navigate("/");
    }

    const Register = async (values, onSubmitProps) => {
        const formData = new FormData();
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        const compressImage = await imageCompression(values.picture, options);
        const userPicture = new File([compressImage], values.picture.name);

        for (let value in values) {
            if (value !== "picture") {
                formData.append(value, values[value]);
            }
        }
        formData.append("picture", userPicture);
        formData.append("picturePath", values.picture.name);

        const saveUser = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, formData);
        if (saveUser) {
            setPageType("login");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await Login(values, onSubmitProps);
        if (isRegister) await Register(values, onSubmitProps);
    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
                <form onSubmit={handleSubmit}>
                    <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMobile ? undefined : "span 4"
                            },
                            fontFamily: "serif"
                        }}>
                        <TextField label="Email*" name="email"
                            autoComplete='off'
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.email}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                        <TextField autoComplete='off' label="Password*" name="password" type={visible ? "text" : "password"}
                            onBlur={handleBlur} onChange={handleChange}
                            value={values.password}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={() => setVisible((visibility) => !visibility)} sx={{ cursor: "pointer" }}>
                                        {visible ? <Visibility sx={{ right: "0", top: "0" }} /> : <VisibilityOff sx={{ right: "0", top: "0" }} />}
                                    </InputAdornment>
                                )
                            }} />

                        {isRegister && (
                            <>
                                <TextField label="Username*" name="userName"
                                    autoComplete='off'
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.userName}
                                    error={Boolean(touched.userName) && Boolean(errors.userName)}
                                    helperText={touched.userName && errors.userName}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <TextField label="About*" name="about"
                                    autoComplete='off'
                                    onBlur={handleBlur} onChange={handleChange}
                                    value={values.about}
                                    error={Boolean(touched.about) && Boolean(errors.about)}
                                    helperText={touched.about && errors.about}
                                    sx={{ gridColumn: "span 2", input: { fontFamily: "serif", fontSize: "16px" } }} />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid black`}
                                    borderRadius="5px"
                                    p="1rem"
                                    required
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed black`}
                                                p="0.5rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here*</p>
                                                ) : (
                                                    <Flexbetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </Flexbetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                    </Box>


                    <Box>
                        <Button
                            fullWidth
                            variant='outlined'
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                padding: "0.6rem",
                                fontFamily: "serif",
                                fontSize: "1.1rem"
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                    </Box>
                    <Flexbetween>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            fontFamily="serif"
                            fontSize={17}
                            color="Highlight"
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."}
                        </Typography>

                        <Typography fontFamily="serif"
                            fontSize={17}
                            color="Highlight" textAlign="end">
                            {isLogin
                                ? "Forget Password"
                                : "Terms and conditions"}
                        </Typography>
                    </Flexbetween>
                </form>
            )}

        </Formik>
    )
}

export default Form