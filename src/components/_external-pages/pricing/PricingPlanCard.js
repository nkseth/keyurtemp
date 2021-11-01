import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
// material
import { styled } from "@mui/material/styles";
import { Card, Button, Typography, Box, Stack } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
//
import Label from "../../Label";
import {
  PlanFreeIcon,
  PlanStarterIcon,
  PlanPremiumIcon,
} from "../../../assets";
import { addCart } from "src/redux/slices/product";
import { useDispatch } from "react-redux";
import MarketPlaceDialog from "src/components/MarketPlaceDialog";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  height: "100%",
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  position: "relative",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
};

export default function PricingPlanCard({ card, index }) {
  const {
    title,
    tenure,
    price,
    features = [],
    info,
    currency,
    information,
  } = card;

  const dispatch = useDispatch();

  return (
    <RootStyle>
      {index === 1 && (
        <Label
          color="primary"
          sx={{
            top: 16,
            right: 16,
            position: "absolute",
          }}
        >
          POPULAR
        </Label>
      )}

      <Typography variant="overline" sx={{ color: "text.secondary" }}>
        {title}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        {index === 1 || index === 2 ? (
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {currency}
          </Typography>
        ) : (
          ""
        )}
        <Typography variant="h2" sx={{ mx: 1 }}>
          {price === 0 ? "Free" : price}
        </Typography>
        <Typography
          gutterBottom
          component="span"
          variant="subtitle2"
          sx={{
            alignSelf: "flex-end",
            color: "text.secondary",
          }}
        >
          /{tenure}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: "primary.main",
          textTransform: "capitalize",
          wordBreak: "break-all",
        }}
      >
        {information}
      </Typography>

      <Box sx={{ width: 80, height: 80, mt: 3 }}>
        <PlanStarterIcon />
      </Box>

      <Stack component="ul" spacing={2} sx={{ my: 5, width: 1, flexGrow: 1 }}>
        {features.map((item) => (
          <Stack
            key={item.label + Math.random() * 1000}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              typography: "body2",
              color: item.status ? "text.primary" : "text.disabled",
            }}
          >
            <Box
              component={Icon}
              icon={checkmarkFill}
              sx={{ width: 20, height: 20 }}
            />
            <Typography
              variant="body2"
              color={item.status ? "text.primary" : "text.disabled"}
            >
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
      {/* <Button
        // to={PATH_DASHBOARD.root}
        fullWidth
        size="large"
        variant="contained"
        // disabled={index === 0}
        // component={RouterLink}
        // onClick={handleClickOpen}
      >
        Choose {card.title}
      </Button> */}
      <MarketPlaceDialog btn={card.buttontype} data={card} />
    </RootStyle>
  );
}
