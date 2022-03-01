import React, { useEffect, useState } from 'react';
import img from '../wissenlogo.PNG';

function UserDataComponent({ logout }) {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch('https://reqres.in/api/unknown', {
      headers: { Authentication: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setUsers(json.data);
        console.log(json.data);
        debugger;
      });
  }, []);
  const nameList = users?.map((user) => {
    return (
      <li
        className="user-list"
        style={{ background: user.color }}
        key={user.id}
      >
        {user.name}
      </li>
    );
  });
  return (
    <div>
      <div className="user-title">
        <img
          style={{ marginLeft: '2%' }}
          src="https://drive.google.com/uc?export=view&id=1hvRAGrdq0SqFBZApx2--IcuDf-DOmOBH"
          alt="Wissen Logo"
        ></img>
        <span onClick={() => logout()} className="log-out">
          Logout
        </span>
      </div>
      <ul>{nameList}</ul>
    </div>
  );
}

export default UserDataComponent;
