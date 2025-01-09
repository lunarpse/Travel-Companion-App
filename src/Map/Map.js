import { CircularProgress, Paper, Rating, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import GoogleMapReact from 'google-map-react'
import useStyles from './style'
import {GoogleMap, Marker, useJsApiLoader, useLoadScript} from '@react-google-maps/api'
import {LocationOnOutlined} from  '@mui/icons-material'
const mapContainerStyle = {
  width: "100vw", // Full width
  height: "100vh", // Full height
};
const Map = ({setcoordinates,setbound,bound,coordinates,places}) => {
  const [map, setMap] = React.useState(null)
  const coords={  lat: -3.745,
    lng: -38.523,}
  const classes=useStyles();
  const {isLoaded}=useJsApiLoader({
    googleMapsApiKey:'AIzaSyBQckvL_k-xwC3SVIDUoQ3E-KCsev-X3LA'
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

  console.log(map)
  console.log(places)
  
  console.log(isLoaded)
  
  return (
    <div className={classes.mapContainer}>
     <GoogleMap
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
        
        {places && places.map(place=>(
           <Marker position={{lat:Number(place.latitude),lng:Number(place.longitude)}}
           icon={{
            url:place.photo?place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg',
          scaledSize:new window.google.maps.Size(130,130) 
          }}
           label="A"/>

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