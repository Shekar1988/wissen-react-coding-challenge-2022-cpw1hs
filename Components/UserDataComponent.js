import React, { useEffect, useState } from 'react';
import img from '../wissenlogo.PNG';

function UserDataComponent({logout}) {
    const [users, setUsers] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const token = localStorage.getItem('token');
    useEffect(() => {
        setisLoading(true);
        fetch('https://reqres.in/api/unknown', {
            headers: { Authentication: `Bearer ${token}` }
        })
            .then(resp => resp.json())
            .then(json => {
                setisLoading(false);
                setUsers(json.data);
                console.log(json.data);debugger
            })
    }, []);
    const nameList = users?.map((user) => { return <li className="user-list" style={{background:user.color}} key={user.id}>{user.name}</li> });
    return (        
        <div>
            <div className="user-title"><img style ={{marginLeft: "2%",margin:"10px",
    background: "#eee",
    border: "2px solid #eee"}} src="https://drive.google.com/uc?export=view&id=1hvRAGrdq0SqFBZApx2--IcuDf-DOmOBH"></img>
            <span style={{}} onClick={()=>logout()} className="log-out">Logout</span></div>
            {isLoading ? <div>Loading...</div> : <ul>{nameList}</ul>}
        </div>
    )
}

export default UserDataComponent