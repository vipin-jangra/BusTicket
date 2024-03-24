import React from 'react';

function Dropdown(props) {
  return (
      props.isVisible ? (
          <div className='dropDown p-1'>

        <ul>
            {props.dropItems.map((item)=>{
                const isActive = window.location.pathname === item.path;
                return <li className={`menu-item ${isActive ? "active-menu-item" : ""}`} onClick={item.onClick}>
                    {item.icon}
                    {<h1 className="pl-1 text-sm">{item.title}</h1>}
                </li>
            })}
        </ul>
    </div>
      ) : null
  );
}

export default Dropdown;