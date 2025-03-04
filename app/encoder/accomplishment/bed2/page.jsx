import React from 'react'
import Bed2Component from '@/app/components/Bed2Table';
import { auth } from "../../../auth";

export default async function Bed2Page(){

  const session = await auth();
  const id = session && session.user ? session.user.id : null;
  const selectedValue = id?.toString() || '';
  const data = await fetch('http://localhost:3000/api/mfo/locked')
  const posts = await data.json()
  const editableMonth = posts.result.filter(x => x.locked === 1);
  return <div> Editable Month:  {editableMonth.map(x => {
    return x.month + ', ';
  })} <Bed2Component locked={posts.result} selectedValue={selectedValue} /> </div>; 
  
}