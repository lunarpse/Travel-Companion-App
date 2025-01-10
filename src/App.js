import List from "./List/list";
import logo from './logo.svg';
import Map from "./Map/Map"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Header from "./header/heaader"
import { useEffect, useState } from "react";
import { getplacesdata, getweatherdata } from "./api/travel";
import { CircularProgress } from "@mui/material";


const App=()=> {
  const [weatherdata,setweatherdata]=useState([])
  const [coordinates,setcoordinates]=useState({});
  const [bound,setbound]=useState({})
  const [places,setplaces]=useState([])
  const [type,settype]=useState('restaurants');
  const [rating,setrating]=useState('')
  const [loading,setloading]=useState(false)
  const [filteredplace,setfilteredplace]=useState([])
  const [childclicked,setchildclicked]=useState(null)
  const [autocomplete,setautocomplete]=useState(null)

  useEffect(()=>{
    const data=places.filter(place=>Number(place.rating)>(rating))
    
    setfilteredplace(data)
  },[rating])
  useEffect(()=>{
    
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
     
      setcoordinates({lat:latitude,lng:longitude})
      setbound({ne:{lat:latitude+0.5,lng:longitude+0.5},sw:{lat:latitude-0.5,lng:longitude-0.5}})
    })
  },[])
 useEffect(()=>{
  
  setloading(true)
  getweatherdata(Number(coordinates.lat),Number(coordinates.lng)).then(data=>setweatherdata(data))

  getplacesdata(type,bound.ne,bound.sw).then(data=>{
    console.log(data)
    setplaces(data)
    setloading(false)
  })
 },[coordinates,bound,type])
 console.log(coordinates)
 console.log(weatherdata)

 const onload=(autoc)=>setautocomplete(autoc)
 const onPlaceChanged = () => {
  const lat = autocomplete.getPlace().geometry.location.lat();
  const lng = autocomplete.getPlace().geometry.location.lng();

  setcoordinates({ lat, lng });
};


  return (
    <>
    <CssBaseline/>
    <Header onPlaceChanged={onPlaceChanged} onload={onload}/>
    <Grid container spacing={3} style={{width:"100%"}}>
      <Grid item xs={12} md={4}>
        <List loading={loading} childclicked={childclicked} type={type} rating={rating} settype={settype} setrating={setrating} places={filteredplace.length>0?filteredplace: places} setplaces={setplaces}/>
      </Grid>
      <Grid item xs={12} md={7}>
        {Object.keys(coordinates).length>0?(<Map
        weatherdata={weatherdata}
        bound={bound}
        setchildclicked={setchildclicked}
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
