import React, { useEffect, useState } from 'react'

function UserDataComponent() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('https://reqres.in/api/unknown', {
            headers: { Authentication: `Bearer ${token}` }
        })
            .then(resp => resp.json())
            .then(json => {
                setUsers(json.data);
            })
    }, []);
    const nameList = users?.map((user) => { <li key={user.id}>{user.name}</li> });
    return (        
        <div>
            <ul>{nameList}</ul>
        </div>
    )
}

export default UserDataComponent