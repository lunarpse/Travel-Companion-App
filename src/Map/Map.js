import { Button, CircularProgress, iconClasses, Paper, Rating, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import GoogleMapReact from 'google-map-react'
import useStyles from './style'
import {GoogleMap, InfoWindow, Marker, OverlayView, useJsApiLoader, useLoadScript} from '@react-google-maps/api'
import {LocationOnOutlined} from  '@mui/icons-material'
const mapContainerStyle = {
  width: "100vw", // Full width
  height: "100vh", // Full height
};
const Map = ({weatherdata,setchildclicked,setcoordinates,setbound,bound,coordinates,places}) => {
  const [map, setMap] = React.useState(null)
  const coords={  lat: -3.745,
    lng: -38.523,}
  const classes=useStyles();
  const {isLoaded}=useJsApiLoader({
    googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAP_API
  })
  console.log(coordinates)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(coordinates)
 
    console.log("kk")
    console.log(bounds)
    map.fitBounds(bounds)

    setMap(map)
  }, [])
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  const isdesktop=useMediaQuery('(min-width:600px)')
  
  if(!isLoaded){
    return <div>Loading...</div>
  }


  
  return (
    <div className={classes.mapContainer}>
     <GoogleMap
     onRightClick={child=>console.log(child)}
     mapContainerStyle={mapContainerStyle}
      center={coordinates}
      zoom={6}
      onLoad={onLoad}
      options={''}
      onClick={e=>{
        const {latLng,}=e;
        setcoordinates({lat:latLng.lat(),lng:latLng.lng()})
        const ne={lat:0.5+latLng.lat(),lng:latLng.lng()+0.5}
        const sw={lat:latLng.lat()-0.5,lng:latLng.lng()-0.5}
        setbound({ne,sw})
        console.log(e)
      }}
      on
      onCenterChanged={''}
      onUnmount={onUnmount}
     
      
      
      >
        {weatherdata?.weather?.length && weatherdata.weather.map(data=>(
          <Marker
          position={{lat:weatherdata.coord.lat,lng:weatherdata.coord.lon}}
      
          icon={{url:data.icon,scaledSize:window.google.maps.Size(70,70)}}
          />
        ))}
        
        {places && places.map((place,i)=>(
          <>
          
           
          {/* // <InfoWindow 
          // position={{lat:Number(place.latitude),lng:Number(place.longitude)}}
          // > */}
          <Marker position={{lat:Number(place.latitude),lng:Number(place.longitude)}}
           onClick={()=>{
            setchildclicked(i)
           }}

           icon={{url:place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg',
            scaledSize:new window.google.maps.Size(80,80)
           }}
           
          />
          {/* <InfoWindow  position={{lat:Number(place.latitude),lng:Number(place.longitude)}}> 
           <button onClick={()=>{setchildclicked(i)}}>
           <img src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} width='80px' height='80px' />
           </button>
          </InfoWindow> */}
         
{/* <OverlayView position={{lat:Number(place.latitude),lng:Number(place.longitude)}}
mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>

<div className={classes.markerContainer}
         
          key={i}
          >
               {!isdesktop?(<LocationOnOutlined color='primary' fontSize='large' />):(
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.typography} variant='subtitle2' gutterBottom>{place.name}</Typography>
            <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
            <Rating readOnly value={Number(place.rating)} size='small' name='read-only'/> 
          </Paper>
        )}

          </div>
   
          </OverlayView> */}
          </>
         // </InfoWindow>

        ))}

       
      </GoogleMap>
        {/* {places && places.map(place=>(
          <LocationOnOutlined lat={place.latitude} lng={place.longitude} color='primary' fontSize='large'/>
        ))} */}

        {/* {places.length>0 && places.map((place,i)=>(
          <div className={classes.markerContainer}
          lat={Number(place.latitude)}
          lng={Number(place.longitude)}
          key={i}
          >
               {!isdesktop?(<LocationOnOutlined color='primary' fontSize='large' />):(
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.typography} variant='subtitle2' gutterBottom>{place.name}</Typography>
            <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
            <Rating readOnly value={Number(place.rating)} size='small' name='read-only'/> 
          </Paper>
        )}

          </div>
        ))} */}
     

      {/* </GoogleMap> */}
    </div>
  )
}

export default Map