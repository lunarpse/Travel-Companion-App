import List from "./List/list";
import logo from './logo.svg';
import Map from "./Map/Map"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Header from "./header/heaader"
import { useEffect, useState } from "react";
import { getplacesdata } from "./api/travel";
import { CircularProgress } from "@mui/material";


const App=()=> {
  const [coordinates,setcoordinates]=useState({});
  const [bound,setbound]=useState({})
  const [places,setplaces]=useState([])
  const [type,settype]=useState('restaurants');
  const [rating,setrating]=useState('')
  const [loading,setloading]=useState(false)
  const [filteredplace,setfilteredplace]=useState([])

  useEffect(()=>{
    const data=places.filter(place=>Number(place.rating)>(rating))
    console.log(data)
    setfilteredplace(data)
  },[rating])
  useEffect(()=>{
    console.log("a")
    
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      console.log(typeof latitude)
      setcoordinates({lat:latitude,lng:longitude})
      setbound({ne:{lat:latitude+0.5,lng:longitude+0.5},sw:{lat:latitude-0.5,lng:longitude-0.5}})
    })
  },[])


 useEffect(()=>{
  console.log("b")
  console.log(bound)
  setloading(true)

  getplacesdata(type,bound.ne,bound.sw).then(data=>{
    console.log(data)
    setplaces(data)
    setloading(false)
  })
 },[coordinates,bound,type])
 console.log("c")
 console.log(coordinates.length)

  return (
    <>
    <CssBaseline/>
    <Header/>
    <Grid container spacing={3} style={{width:"100%"}}>
      <Grid item xs={12} md={4}>
        <List loading={loading} type={type} rating={rating} settype={settype} setrating={setrating} places={filteredplace.length>0?filteredplace: places} setplaces={setplaces}/>
      </Grid>
      <Grid item xs={12} md={7}>
        {Object.keys(coordinates).length>0?(<Map
        bound={bound}
        places={filteredplace.length>0?filteredplace: places}
        setcoordinates={setcoordinates}
        setbound={setbound}
        coordinates={coordinates}
        />):(
          <div style={ {
            height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}>
              <CircularProgress size='5rem'/>
          </div>
        
        )}
      </Grid>
    </Grid>
    </>
  );
}

export default App;
