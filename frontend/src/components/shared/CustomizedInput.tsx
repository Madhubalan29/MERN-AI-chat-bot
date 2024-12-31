import { colors, TextField } from '@mui/material'
import { BiBorderRadius } from 'react-icons/bi';

type Props={
    name:string
    type:string
    label:string

};
const CustomizedInput = (props:Props) => {
  return <TextField margin ="normal" name={props.name} label={props.label} type={props.type} slotProps={{
    inputLabel: {
      style: { color: 'white'}, // Label color
    },
    htmlInput:{
        style:{ width:"400px",borderRadius:10,fontSize:20,color:"white"}
    }
  }} />
  
};

export default CustomizedInput
