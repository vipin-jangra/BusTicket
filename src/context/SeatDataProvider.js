import { createContext, useEffect, useState } from "react";

export const SeatDataContext = createContext(); 
// Create a provider component
export function SeatDataProvider({ children }) {
    const [seatsData, setSeatsData] = useState(() => {
      const storedData = localStorage.getItem('seatsData');
      return storedData ? JSON.parse(storedData) : {
        "lowerDeck": {
          "normal": Array.from({length:10}).map((_,index)=>({
                id: `lower-normal-${index+1}`,
                type: index >= 10 ? "back" : "normal", 

          })),
          "sleeper": Array.from({length:6}).map((_,index)=>({
            id: `lower-sleeper-${index+1}`,
            type: index >= 5 ? "back" : "normal", 
        })),
    },
        "upperDeck": {
            "normal": Array.from({length:10}).map((_,index)=>({
                id: `upper-normal-${index+1}`,
                type: index >= 10 ? "back" : "normal", 
            })),
              "sleeper": Array.from({length:6}).map((_,index)=>({
                id: `upper-sleeper-${index+1}`,
                type: index >= 5 ? "back" : "normal", 
            })),
        },
        "ticketDetails":{}
      }
    });
  
    // Store data to local storage whenever seatsData changes
    useEffect(() => {
      localStorage.setItem('seatsData', JSON.stringify(seatsData));
    }, [seatsData]);
  
    // Function to update seatsData
    const updateSeatsData = (newSeatsData) => {
      setSeatsData(newSeatsData);
    };
  
    return (
      <SeatDataContext.Provider value={{ seatsData, updateSeatsData }}>
        {children}
      </SeatDataContext.Provider>
    );
  }
  