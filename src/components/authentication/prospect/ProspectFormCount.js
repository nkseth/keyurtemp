import {useContext, useEffect, useState} from 'react'
import  { useCallback } from 'react'

import { MIconButton } from '../../@material-extend';
import axiosInstance from "../../../utils/axios";
import { Typography, Link, Card, CardContent } from '@mui/material';
import {Link as RouterLink} from "react-router-dom";
import {SeoIllustration} from "../../../assets";
import { styled } from '@mui/material/styles';
import SvgIconStyle from "../../SvgIconStyle";
import { Icon } from '@iconify/react';

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
                Welcome,
            </Typography>
			<Typography
				bgcolor={"grey"} component="h1" variant="h5" style={{ wordWrap: "break-word" }}>You are <span  style={{textDecoration:"underline", fontSize:"1.5rem", textDecorationColor:"darkorange", textEmphasisColor:"darkorange", color:"darkorange"}}>{count}th</span> in the waitlist to explore the future of accounting.</Typography>

				<br/>

			<Typography
				bgcolor={"grey"} component="h1" variant="h5" style={{ wordWrap: "break-word" }}>
				<Link color="#2064D8" href="https://www.simpleaccounts.io/schedule-your-demo/">
					<Icon icon="fa:calendar" />{" "}Book a demo with us.
				</Link>
			</Typography>
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
