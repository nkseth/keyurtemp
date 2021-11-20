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
import LogoOnlyLayout from "src/layouts/LogoOnlyLayout";
import useUI from '../hooks/useUI'
import LoadingScreen from "src/components/LoadingScreen2";
import Loading from "src/components/Apiloading";
// ----------------------------------------------------------------------



const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: "100%",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(8),
}));

// ----------------------------------------------------------------------

export default function MarketPlace() {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.pricing.plans);
  const addons = useSelector((state) => state.pricing.addons);
  const [searchField, setSearchField] = useState("");

  const [Plans,setplans]=useState([]);
const [filter,setfilter]=useState([])
const [filterop,setfilterop]=useState([])
const [titleop,settitles]=useState([])
const [finalplan,setfinalplan]=useState([])
const [searchq,setsearchq]=useState("")
const {UIdispatch}=useUI()
const filtercreator=()=>{
   
    const filteroptions=[]
    const titles=[]
    let fplani=[...Plans]
    let fp=[]
    console.log("thishsbshshshs",filter.length===0)
    if(filter.length===0){
console.log("this run",fplani)
      fp=[...fplani]
      setfinalplan(fplani)
    }
    else{
        fplani.map((item)=>{
            if(filter.includes(item.filteroption))
            {
                fp.push(item)
            }
        })
    
        setfinalplan(fp)
    }
    
Plans.map((item)=>{
    if(!filteroptions.includes(item.filteroption))
    filteroptions.push(item.filteroption)
    return filteroptions
})
fp.map((item)=>{
  
    if(!titles.includes(item.category))
    
    titles.push(item.category)
  
})
setfilterop(filteroptions)
settitles(titles)

return fp
}

useEffect(()=>{
  filtercreator()
},[Plans,filter])

useEffect(()=>{
  setplans([...plans,...addons])
  
},[plans,addons]) 



useEffect(()=>{
    searchfilter()

},[searchq])


useEffect(()=>{
  UIdispatch({type:'LOADING',payload:true})
  dispatch(getPlans())
  dispatch(getAddons())
  UIdispatch({type:'LOADING',payload:false})
},[])

const searchfilter=()=>{
  const returnfinal=filtercreator()
   const pl=[...returnfinal]
   if(searchq!==""){ 
    const searchResults = pl.filter(item => {

        return item.title.toLowerCase().includes(searchq.toLowerCase());
    });
    const titles=[]

    searchResults.map((item)=>{
     
        if(!titles.includes(item.category))
        
        titles.push(item.category)
      
    })
    settitles(titles)
    setfinalplan(searchResults)
}

   
}

const filterclicked=(e,type)=>{
    const olds=[...filter]
    setsearchq("")
  if(e.target.checked){
    olds.push(type)
    setfilter(olds)
  }
  else {
      olds.splice(olds.indexOf(type),1)
      setfilter(olds)
      
  }
}
  return (
    <>
    <Loading/>
    <LogoOnlyLayout />
      <RootStyle title="Market Place | SimpleAccounts">
     
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
              onChange={(e)=>{setsearchq(e.target.value)}}
              value={searchq}
              name="search"
              // sx={{
              //   width: 300,
              // }}
            />
            <Stack direction="row" alignItems="center" justifyContent="center">
              <FormGroup row>
                {console.log("filter options",filterop)}
               {filterop.map((item)=>{
                      return <FormControlLabel style={{textTransform: 'capitalize' }}
                      control={
                        <Checkbox
                          name="free"
                          onChange={(e)=>{filterclicked(e,item)}}
                        />
                      }
                      label={item}
                    />
               })}
              
               
              </FormGroup>
            </Stack>
          </Box>

          {
            
            titleop.map((itemt)=>{
                return(
                  
                  <Box sx={{ mt: 5 }}>
                     {console.log("final plan",finalplan)}
                  <Typography
                    variant="h5"
                    align="left"
                    sx={{ color: "text.primary", mb: 3 }}
                    style={{textTransform: 'capitalize' }}
                  >
                    {itemt}
                  </Typography>
                 
                  <Grid container spacing={3}>
                   
                    {finalplan.map((card, index) => {
                      if(itemt===card.category){
                        return <Grid
                        item
                        xs={12}
                        md={4}
                        key={card.id + Math.random() * 1000}
                      >
                        <PricingPlanCard card={card} index={index} btn={true} />
                      </Grid>
                      }
                  else return null
                })}
                  </Grid>
                </Box>
                )
            })
          }
          {/* {plans.length > 0 && (
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
              ))} */}
            {/* </Box>
          )} */}
        </Container>
      </RootStyle>
    </>
  );
}
