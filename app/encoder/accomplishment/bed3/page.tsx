import Bed3Component from '@/app/components/Bed3Table';
import { auth } from "../../../auth";
import React from 'react'

const bed3 = async () => {
  const session = await auth();
  const id = session && session.user ? session.user.id : null;
  const selectedValue = id?.toString() || '';
  return (
    <div>
        <Bed3Component selectedValue={selectedValue} />
    </div>
  )
}

export default bed3