import "../stylesheets/layout.css";
import "../stylesheets/alignment.css";
import "../stylesheets/text-element.css";
import "../stylesheets/theme.css";
import "../stylesheets/deck-layout.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropdown from "./Dropdown";

function DefaultLayout({children}){
    const navigate = useNavigate();
    const [toggleVisiblity,setToggleVisiblity] = useState(false);
    const menu = [
        {
            title:"Reservation",
            icon : <i class="ri-home-line"></i>,
            onClick : ()=>{
                navigate("/reservation");
                setToggleVisiblity(!toggleVisiblity);
            },
            path : "/reservation",
        },
        {
            title:"Dashboard",
            icon : <i class="ri-macbook-line"></i>,
            onClick : ()=>{
                navigate("/admin");
                setToggleVisiblity(!toggleVisiblity);
            },
            path : "/admin",
        },
    ];



    return <>
        <div className="layout h-screen bg">
            <div className="body">
                <div className="header w-screen flex justify-between items-center">
                    <div className="text-white">
                            BUS TICKET
                    </div>
                    <div>
                    
                           <h2 className="text-white">{(window.location.pathname === "/reservation")? "RESERVATION" : "DASHBOARD"}</h2>
                    </div>
                    <div>
                        <div className="menu">
                            <div className="button border p-05 text-white cursor " onClick={()=>{setToggleVisiblity(!toggleVisiblity)}}><i class="ri-arrow-down-line"></i></div>
                            <Dropdown isVisible = {toggleVisiblity} dropItems = {menu}></Dropdown>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    </>
}

export default DefaultLayout;