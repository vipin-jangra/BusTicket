import { useContext, useEffect, useState } from "react";
import Modal from "./ModalLayout";
import { message } from "antd";

import { SeatDataContext } from "../context/SeatDataProvider";

function DeckLayout(props){

    const { seatsData:{ticketDetails},seatsData,updateSeatsData } = useContext(SeatDataContext);

    
    const [firstname,setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob,setDOB] = useState("");
    const [seatType,setSeatType] = useState("");
    const [id,setId] = useState("");
    const [deckType, setDeckType] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [disabled,setDisabled] = useState(false);


    const [modalType,setModalType] = useState("");

    const openModal = () => {
        setDisabled(false)
        setModalType("open");
        setModalOpen(true);
        setFirstName('');
        setEmail('');
        setLastName('');
        setDOB('')
        
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const isOccupied = (seatID)=>{
        
           return seatID in ticketDetails
    }

    const handleSubmit = (e)=>{
        try {
            e.preventDefault();

            const formData = {
                firstName: firstname,
                lastName: lastname,
                email: email,
                dob: dob,
                deckType: props.deckType,
                seatType: seatType,
                seatId: id
            };
    
            const updatedSeatsData = {
                ...seatsData,
                ticketDetails: ticketDetails
            };
    
            // Check if the email is already present in ticketDetails
        const emailExists = Object.values(seatsData.ticketDetails).some(ticket => ticket.email === formData.email);
        if (emailExists) {
            message.error("This user has already booked a ticket.");
            return; 
        }
                updatedSeatsData['ticketDetails'] = {
                    ...updatedSeatsData.ticketDetails,
                    [id]: formData
                }
            
        
            // Update the seat data using setDataToRow
            updateSeatsData(updatedSeatsData);
            closeModal()
            message.success("Ticked Booked successfully");
            
        } catch (error) {
            message.error(error.message);
        }
       

    }

    // Initialize DOB state with the current date
    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0];
        setDOB(currentDate);
        setDeckType(props.deckType);
    }, [dob,props.deckType]);


    return<>
        <div className="deck-layout bg-white p-1 border-left">
            <div className="flex deck-main">

                <i style={{ visibility: props.visibility }} className="ri-steering-2-fill text-2xl"></i>
                
                <div className={`${props.deckType === "lowerDeck" ? "border-left-2": ""} h-200 ml-1 p-1 ${props.deckType === "lowerDeck" ? "deck-lower": "deck-upper" }`}>
                    <div className="deck-seat ml-3">

                        {seatsData[props.deckType]['normal'].map((seat,index) => (
                            
                            
                            <div className={`seat text-center ${isOccupied(seat.id) ? "occupied" : "cursor"}`} key={seat.id} onClick={isOccupied(seat)? null :  () => { openModal(); setSeatType("normal");setId(seat.id) }}>
                                {index+1}-N
                                <div className={`seat-chair ${isOccupied(seat.id) ? 'occupied' : ''}`}></div>
                            </div>

                        ))}
                        
                        {seatsData[props.deckType]['sleeper'].filter((s)=>s.type === "back").map((seat,index) => (
                            <div className={`${props.deckType ==="upperDeck" ? "spec-seat-upper" : "spec-seat"} ${isOccupied(seat.id) ? "occupied" : "cursor"}`} onClick={isOccupied(seat)? null :  () => { openModal(); setSeatType("sleeper");setId(seat.id); }} >
                                <div className="spec-seat-chair">
                                
                                </div>
                            </div>
                        ))}
                        <div className="deck-seat  mt-2">
                            {seatsData[props.deckType]['sleeper'].filter((s)=>s.type === "normal").map((seat,index) => (
                            
                            <div className={`seat text-center ${isOccupied(seat.id) ? "occupied" : "cursor"}`} key={seat.id} onClick={isOccupied(seat)? null :  () => { openModal(); setSeatType("sleeper");setId(seat.id); }}>
                                {index+1}-S
                                <div className={`seat-chair ${isOccupied(seat.id) ? 'occupied' : ''}`}></div>
                            </div>
                        ))}
                    
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <Modal isOpen={modalOpen} onClose={closeModal} modalType = {modalType}>
            <div className=" flex flex-col justify-center items-center">
                <div className='card w-400 p-2'>
                    <form className=" flex flex-col" onSubmit={(e)=>{handleSubmit(e)}}>

                        <input  type="hidden"  name="deckType"   disabled={disabled} value={props.deckType} />
                        <input  type="hidden"  name="dob"   disabled={disabled} value={dob} />
                        <input  type="hidden"  name="id"   disabled={disabled} value={id} />
                        <input  type="hidden"  name="seatType"   disabled={disabled} value={seatType} />
                        
                        <label className='text-sm text-grey mb-05' htmlFor='firtname'>Fistname</label>
                        <input className='p-1 pl-15 mb-1' type="text" required="true"  name="firstname" placeholder="Firstname"  disabled={disabled} value={firstname} onChange = {(e)=>{setFirstName(e.target.value)}} />

                        <label className='text-sm text-grey mb-05' htmlFor='email'>Lastname</label>
                        <input className='p-1 pl-15 mb-1' type="text" required="true"  name="lastname" placeholder="Lastname" disabled={disabled} value={lastname} onChange={(e)=>{setLastName(e.target.value)}} />
                    
                        <label className='text-sm text-grey mb-05' htmlFor='password'>Email</label>
                        <input className='p-1 pl-15 mb-1' type="email" required="true"  name="email" placeholder="Email" disabled={disabled} value={email} onChange={(e)=>{setEmail(e.target.value)}}  />

                        
                    
                        <button type="submit" className="p-1 mt-3 bg-primary cursor text-white" >BOOK</button>
                    
                    </form>
                </div>
            </div>
        </Modal>
    </>
}

export default DeckLayout;