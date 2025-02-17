import axios from 'axios'





export const getplacesdata=async(type,ne,sw)=>{
  
    try {
        const {data:{data}}=await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params:{
                
                    bl_latitude: sw.lat,
                    bl_longitude: sw.lng,
                    tr_longitude: ne.lng,
                    tr_latitude: ne.lat,
          
        },
     
        headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
            'x-rapidapi-host':'travel-advisor.p.rapidapi.com',
          }})
          
          return data
    } catch (error) {
        
    }
}

export const getweatherdata=async(lat,lng)=>{
    try {
        if(lat && lng){
            const {data}=await axios.get('https://weather-api167.p.rapidapi.com/api/weather/current?place=London&units=standard&lang=en&mode=json',{
                params:{lat,lon:lng},
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                    'x-rapidapi-host': 'weather-api167.p.rapidapi.com',
                  }
            })
            return data
        }
      
        
    } catch (error) {
        console.log(error)
    }
}