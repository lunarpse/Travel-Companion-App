import { FormControl, Input, InputLabel, MenuItem, Select,Grid ,Typography, CircularProgress } from '@mui/material'
import React, { createRef, useEffect, useState } from 'react'
import useStyle from './style';
import PlaceDetails from '../PlaceDetail/PlaceDetail'


const List = ({childclicked, places,setplaces,type,rating,settype,setrating,loading}) => {
  const [elref,setelref]=useState([])
  const classes=useStyle()
  console.log("llll" + childclicked)
  useEffect(()=>{
    
    setelref(refs=>Array(places?.length).fill().map((_,i)=>refs[i] || createRef()))
  },[places])
 console.log(elref)
  return (
    <div className={classes.container}>
<Typography variant='h4'>Restaurants,Hotels and Attractions around you</Typography>
{loading?(
  <div className={classes.loading}>
    <CircularProgress size='5rem'/>
  </div>
):(
  <>
  <FormControl className={classes.formcontrol}>
  <InputLabel>Type</InputLabel>
  <Select value={type} onChange={e=>settype(e.target.value)}>
    <MenuItem value='restaurants'>Restaurants</MenuItem>
    <MenuItem value='hotels'>Hotels</MenuItem>
    <MenuItem value='attractions'>Attractions</MenuItem>
  </Select>
</FormControl>
<FormControl className={classes.formControl}>
  <InputLabel>Ratings</InputLabel>
  <Select value={rating} onChange={e=>setrating(e.target.value)}>
  <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
  </Select>
</FormControl>

<Grid container spacing={3} className={classes.list}>
 {places?.map((place,i)=>(
  <Grid ref={elref[i]} item xs={12}>
    <PlaceDetails place={place} refprop={elref[i]} selected={Number(childclicked)===i}/>
  </Grid>
 ))}
</Grid>
  </>
)}

    </div>
  )
}

export default List