import React from 'react'
import DistrictComponent from '@/app/components/ByDistrictTable';
import { auth } from "../../../auth";

export default async function DistrictPage(){

  const session = await auth();
  const id = session && session.user ? session.user.id : null;
  const selectedValue = id?.toString() || '';
  const URL = process.env.NEXT_PUBLIC_API_URL
  const data = await fetch(`${URL}/api/mfo/locked`)
  const posts = await data.json()
  const editableMonth = posts.result.filter(x => x.locked === 1);
  return <div> Editable Month:  {editableMonth.map(x => {
    return x.month + ', ';
  })} <DistrictComponent locked={posts.result} selectedValue={selectedValue} /> </div>; 
  
}