import React, { useState, useEffect, useRef, useContext } from 'react';
import { SketchPicker } from 'react-color';
import { colorContext } from './colorContext';

const MovableColorPicker = ({isPopUp ,onClose}) => {
    const [color, setColor] = useState("#000000");
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 }); // Using useRef for offset
    const [position, setPosition] = useState({ top: "100px", left: "100px" }); // Using state for position
    const {handleColor} =useContext(colorContext)



    useEffect(()=>{
        handleColor(color)
    
    },[color])

    
    const handleMouseDown = (e) => {
        e.preventDefault(); // Prevent text selection
        
        const rect = e.currentTarget.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            // Update position based on mouse movement and offset
            const newPosition = {
                top: `${e.clientY - offset.current.y}px`,
                left: `${e.clientX - offset.current.x}px`,
            };
            setPosition(newPosition); // Update position state
        }
    };

    const handleMouseUp = () => {
         
        setIsDragging(false); // Stop dragging on mouse up
    };

    const handleDoubleClick = (e) => {
        e.preventDefault(); // Prevent default actions
        setIsDragging(true); // Enable dragging
    };

    const handleColorChange = (color) => {
        setColor(color.hex); // Update color on picker interaction
    };

    // Add event listeners for mouse movement
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]); // Only run when dragging state changes
   if(!isPopUp){return null}
    return (
        <div
            className="movable-color-picker"
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                backgroundColor: color,
                cursor: isDragging ? 'grabbing' : 'default', // Change cursor based on dragging state
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
        >
            <SketchPicker 
                color={color} 
                onChange={handleColorChange} 
            />
            <button style={{margin:"0",padding:"0",position:"absolute",top:"-25px",right:"-25px" ,width:"20px",height:"20px",outline:"none",borderRadius:"50%",fontSize:"20px"}} onClick={onClose}>&times;</button>
        </div>
    );
};

export default MovableColorPicker;