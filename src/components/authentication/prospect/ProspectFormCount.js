import {useContext, useEffect, useState} from 'react'
import  { useCallback } from 'react'

import { MIconButton } from '../../@material-extend';
import axiosInstance from "../../../utils/axios";
import { Typography, Button,Card ,CardContent } from '@mui/material';
import {Link as RouterLink} from "react-router-dom";
import {SeoIllustration} from "../../../assets";
import { styled } from '@mui/material/styles';


export default function ProspectFormCount() {
    const RootStyle = styled(Card)(({ theme }) => ({
        boxShadow: 'none',
        textAlign: 'center',
        backgroundColor: theme.palette.primary.lighter,
        [theme.breakpoints.up('md')]: {
            height: '100%',
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    }));
debugger
    const [count, setcount] = useState(0)

    useEffect(() => {
        axiosInstance.get('/prospects/count').then((response) => {
            setcount(response.data);
        });
    }, []);

    return (
        <RootStyle>
        <CardContent
            sx={{
                p: { md: 5 },
                pl: { md: 5 },
                color: 'grey.800'
            }}
        >
            <Typography gutterBottom variant="h4">
                Welcome
            </Typography>
            <Typography
                bgcolor={"grey"} component="h1" variant="h5">You are <span  style={{textDecoration:"underline", fontSize:"1.5rem", textDecorationColor:"darkorange"}}>{count}</span> in the waitlist to explore the future of accounting.</Typography>
        </CardContent>
    <SeoIllustration
        sx={{
            p: 3,
            width: 360,

        }}
    />
        </RootStyle>
        // <Typography
        //             bgcolor={"grey"} component="h1" variant="h5">People On the Wishlist:{count}</Typography>
    );
}
