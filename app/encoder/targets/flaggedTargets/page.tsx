"use client";  

import React, { useEffect, useState } from 'react'



const page = () => {

  const [status, setStatus] = useState<number | null>(null);
    useEffect(() => {
      fetch("/api/users/retrieve") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => setStatus(rowData.result.status));
      
      
    }, []);


    if (status === 2) {
      return <div className='text-red-500'>Unable to view MFO target  because your targets were already verified!</div>;
    }
    

  
  return (
    <div className='text-blue-800 text-center text-lg'> On-going updates... </div>

  )
}

export default page