import react,{createContext,useState} from "react";

import ChatGpt from "./chatGpt";
import ColorPiker from "./ColorPiker"
export const colorContext=createContext("");
 export const Color1Context =()=>{
            const [color1,setColor]=useState("")

const handleColor=(color)=>{
    setColor(color)
}
return(
    <colorContext.Provider value={{color1 , handleColor}}>
       <ChatGpt/>
       <ColorPiker/>
    </colorContext.Provider>
)
            

 }
 