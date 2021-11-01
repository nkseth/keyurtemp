// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Switch,
  Container,
  Typography,
  Stack,
  OutlinedInput,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
// components
import Page from "../components/Page";
import { PricingPlanCard } from "../components/_external-pages/pricing";
//
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from "../assets";
import { useEffect, useReducer, useState } from "react";
import { getAddons, getPlans } from "../redux/slices/plans";
import { title } from "src/utils/mock-data/text";
// ----------------------------------------------------------------------

const PLANS = [
  {
    subscription: "basic",
    icon: <PlanFreeIcon />,
    price: 0,
    caption: "forever",
    lists: [
      { text: "3 prototypes", isAvailable: true },
      { text: "3 boards", isAvailable: true },
      { text: "Up to 5 team members", isAvailable: false },
      { text: "Advanced security", isAvailable: false },
      { text: "Permissions & workflows", isAvailable: false },
    ],
    labelAction: "current plan",
  },
  {
    subscription: "starter",
    icon: <PlanStarterIcon />,
    price: 4.99,
    caption: "saving $24 a year",
    lists: [
      { text: "3 prototypes", isAvailable: true },
      { text: "3 boards", isAvailable: true },
      { text: "Up to 5 team members", isAvailable: true },
      { text: "Advanced security", isAvailable: false },
      { text: "Permissions & workflows", isAvailable: false },
    ],
    labelAction: "choose starter",
  },
  {
    subscription: "premium",
    icon: <PlanPremiumIcon />,
    price: 9.99,
    caption: "saving $124 a year",
    lists: [
      { text: "3 prototypes", isAvailable: true },
      { text: "3 boards", isAvailable: true },
      { text: "Up to 5 team members", isAvailable: true },
      { text: "Advanced security", isAvailable: true },
      { text: "Permissions & workflows", isAvailable: true },
    ],
    labelAction: "choose premium",
  },
];

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: "100%",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.pricing.plans);
  const addons = useSelector((state) => state.pricing.addons);
  const [searchField, setSearchField] = useState("");

  const [checkBoxValues, setCheckBoxValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      free: false,
      ecommerce: false,
      business: false,
    }
  );

  const priceFilter = (type) => {
    const allPrices = [...plans, ...addons];

    const filterData = [];

    if (checkBoxValues.free) {
      filterData.push(...allPrices.filter((el) => el.filteroption === "free"));
    }

    if (checkBoxValues.ecommerce) {
      filterData.push(
        ...allPrices.filter((el) => el.filteroption === "e-commerce")
      );
    }

    if (checkBoxValues.business) {
      filterData.push(
        ...allPrices.filter((el) => el.filteroption === "business")
      );
    }

    if (filterData.length > 0) {
      return filterData.filter((el) => {
        return el.type === type && el.title.toLowerCase().includes(searchField);
      });
    }

    return allPrices.filter((el) => {
      return el.type === type && el.title.toLowerCase().includes(searchField);
    });
  };

  const groupedAddons = Object.entries(
    lodash.groupBy(priceFilter("addon"), function (value) {
      return value.category;
    })
  );

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getAddons());
  }, [dispatch]);

  const handleInputChange = (evt) => {
    setSearchField(evt.target.value.toLowerCase());
  };

  const handleCheckBoxChange = (evt) => {
    setCheckBoxValues({ [evt.target.name]: evt.target.checked });
  };
  return (
    <RootStyle title="Pricing | Minimal-UI">
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" paragraph>
          Flexible plans for your
          <br /> community&apos;s size and needs
        </Typography>
        <Typography align="center" sx={{ color: "text.secondary" }}>
          Choose your plan and make modern online conversation magic
        </Typography>

        <Box sx={{ my: 5 }}>
          <OutlinedInput
            placeholder="Search Plans/Addons"
            size="small"
            fullWidth
            onChange={handleInputChange}
            value={searchField}
            name="search"
            // sx={{
            //   width: 300,
            // }}
          />
          <Stack direction="row" alignItems="center" justifyContent="center">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="free"
                    checked={checkBoxValues.free}
                    onChange={handleCheckBoxChange}
                  />
                }
                label="Free"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="ecommerce"
                    checked={checkBoxValues.ecommerce}
                    onChange={handleCheckBoxChange}
                  />
                }
                label="E-commerce"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="business"
                    checked={checkBoxValues.business}
                    onChange={handleCheckBoxChange}
                  />
                }
                label="Business"
              />
            </FormGroup>
          </Stack>
        </Box>
        {plans.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              align="left"
              sx={{ color: "text.primary", mb: 3 }}
            >
              Plans
            </Typography>
            <Grid container spacing={3}>
              {priceFilter("subscription").map((card, index) => (
                <Grid item xs={12} md={4} key={card._id + Math.random() * 1000}>
                  <PricingPlanCard card={card} index={index} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {priceFilter("addon").length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              align="left"
              sx={{ color: "text.primary", mb: 3 }}
            >
              Addons
            </Typography>
            {groupedAddons.map(([key, value], index) => (
              <Box
                key={key}
                sx={{
                  borderBottom:
                    index === groupedAddons.length - 1
                      ? 0
                      : "1px solid #dedede",
                  pb: 3,
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ color: "text.primary", mb: 1 }}
                >
                  {key}
                </Typography>
                <Grid container spacing={3}>
                  {value.map((card, index) => (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      key={card._id + Math.random() * 1000}
                    >
                      <PricingPlanCard card={card} index={index} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </RootStyle>
  );
}
