import axios from 'axios'



const url='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

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
            'x-rapidapi-key': 'ff4be71a20mshd25c231472fdb59p11b3fbjsnfed4714cac5a',
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          }})
          
          return data
    } catch (error) {
        
    }
}