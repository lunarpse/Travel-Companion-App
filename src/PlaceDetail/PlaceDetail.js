import React from 'react'
import useStyles from './style';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {LocationOn,Phone}from '@mui/icons-material'


const PlaceDetail = ({place,selected,refprop}) => {
  
  if(selected){

    refprop?.current?.scrollIntoView({behavioud:'smooth',block:'start'})
  }
  const classes=useStyles();
  return (
    <Card elevation={6}>
      <CardMedia
      style={{height:350}}
      title={place.name}
      image={place.photo?place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
      />

      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating readOnly name='read-only' value={Number(place.rating)}/>
          <Typography component='legend' >{place.num_reviews} review{place.num_reviews>1 && 's'}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography component='legend'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography component='legend'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>

        {place.awards?.map((award,i)=>(
          <Box display='flex' justifyContent='space-between' my={1} alignItems='center'>
            <img src={award.images.small}/>
            <Typography variant='subtitle2' color='textSecondary' >{award.display.name}</Typography>
          </Box>
        ))}

        {place.cuisine?.map(({name},i)=>(
          <Chip key={i} size='small' label={name} className={classes.chip}  />
        ))}

        {place.address && (
          <Typography className={classes.spacing} gutterBottom variant='body2' color='textSecondary'>
            <LocationOn/>{place.address}
          </Typography>
        )}

        {place.phone && (
          <Typography className={classes.spacing} variant='body2' color='textSecondary' gutterBottom>
            <Phone/>{place.phone}
          </Typography>
        )}

      </CardContent>
      <CardActions>
        <Button size='small'color='primary' onClick={()=>window.open(place.web_url,'_blank')}>
          Trip Advisor
        </Button>
        <Button size='small' color='primary' onClick={()=>window.open(place.website,'_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  )
}

export default PlaceDetail