import React from 'react'
import ClientComponent from './client'

export default async function Bed2Page(){

  const data = await fetch('http://localhost:3000/api/mfo/locked')
  const posts = await data.json()
  const editableMonth = posts.result.filter(x => x.locked === 1);
  return <div> Editable Month:  {editableMonth.map(x => {
    return x.month + ', ';
  })} <ClientComponent locked={posts.result} /> </div>; 
  
}