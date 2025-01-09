import { makeStyles} from "@mui/styles";
import {alpha} from "@mui/system"
export default makeStyles((theme)=>({
    paper: {
        padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
      },
      mapContainer: {
        height: '85vh', width: '100%',
      },
      markerContainer: {
        position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
      },
      pointer: {
        cursor: 'pointer',
      },
      loading: {
        height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
      },
}))