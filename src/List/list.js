import { FormControl, Input, InputLabel, MenuItem, Select,Grid ,Typography, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useStyle from './style';
import PlaceDetails from '../PlaceDetail/PlaceDetail'


const List = ({places,setplaces,type,rating,settype,setrating,loading}) => {
  
  const classes=useStyle()
 
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
  <Grid item xs={12}>
    <PlaceDetails place={place}/>
  </Grid>
 ))}
</Grid>
  </>
)}

    </div>
  )
}

export default List