// pages/Users.js
'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users/fetch');
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user._id}>
          <Link href={`/views/gemini/${user.email}`}>
 
              <h2>{user.name}</h2>
      
          </Link>
          <p>Email: {user.email}</p>
          <img src={user.image} alt={user.name} />
        </div>
      ))}
    </div>
  );
}
