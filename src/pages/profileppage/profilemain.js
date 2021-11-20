import { capitalCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography, Tooltip } from "@mui/material";
// hooks
import useAuth from "../../hooks/useAuth";
// routes
import useUI from '../../hooks/useUI';
// layouts

// components
import Page from "../../components/Page";
import { MHidden } from "../../components/@material-extend";
import  CreateCompany  from "./editprofile";


import { useState } from "react";
import Loading from "src/components/Apiloading";
import LogoOnlyLayout from "src/layouts/LogoOnlyLayout";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));
// ----------------------------------------------------------------------

export default function Prospect() {
  const [showProspect, setshowProspect] = useState(false);
  const { method } = useAuth();
  return (
    <>
    <LogoOnlyLayout/>
    <RootStyle title="Create your Company">
      
    <Loading/> 
      <MHidden width="mdDown">
        <SectionStyle>
          {/* { <img alt="SimpleAccounts Logo" src="/static/illustrations/SimpleAccounts-Logo.jpg" /> } */}
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Manage your accounts simply and more effectively with SimpleAccounts
          </Typography>
          <img
            alt="prospect"
            src="/static/illustrations/prospect_register.png"
          />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                "Manange Your Profile"
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
             Claim your free Account
              </Typography>
            </Box>
            {/* <Tooltip title={capitalCase(method)}>
              <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 32, height: 32 }} />
            </Tooltip> */}
          </Box>

         

          {!showProspect && (
            <>
              {" "}
              <CreateCompany
                handleProspectShow={() => setshowProspect(true)}
              />{" "}
              <Typography
                variant="body2"
                align="center"
                sx={{ color: "text.secondary", mt: 3 }}
              >
                By prospecting, I agree to these&nbsp;
                <Link underline="always" color="text.primary" href="#">
                  Terms of Service
                </Link>
                &nbsp;and&nbsp;
                <Link underline="always" color="text.primary" href="#">
                  Privacy Policy
                </Link>
              </Typography>
            </>
          )}
      
    
        </ContentStyle>
      </Container>
    </RootStyle>
    </>
  );
}
