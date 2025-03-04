import Bed1Component from '@/app/components/Bed1Table';
import { auth } from "../../../auth";
import React from 'react'

const bed1 = async () => {
  const session = await auth();
  const id = session && session.user ? session.user.id : null;
  const selectedValue = id?.toString() || '';
  return (
    <div>
        <Bed1Component selectedValue={selectedValue} />
    </div>
  )
}

export default bed1