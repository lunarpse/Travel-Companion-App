import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
// import DeleteIcon from '@mui/icons-material/Delete';

import { AppBar, Box, InputBase, Toolbar, Typography } from '@mui/material'
import useStyles from './style'
import { AutoAwesome } from '@mui/icons-material'
import { Autocomplete } from '@react-google-maps/api'


const Header = ({onload,onPlaceChanged}) => {
  const classes=useStyles();
  return (
    
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          Travel Advisor

        </Typography>
        <Box display='flex'>
          <Typography variant='h6' className={classes.title}>
            Explore New Places
          </Typography>
          <Autocomplete onLoad={onload} onPlaceChanged={onPlaceChanged}>
          <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
            </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  // AIzaSyBQckvL_k-xwC3SVIDUoQ3E-KCsev-X3LA
  // bootstrapURLKeys={{key:'AIzaSyBQckvL_k-xwC3SVIDUoQ3E-KCsev-X3LA'}}
  //     defaultCenter={coords}
      
  //     center={coords}
  //     defaultZoom={14}
  //     margin={[50,50,50,50]}
  //     options={''}
  //     onChange={''}
  //     onChildClick={''}
)}

export default Header