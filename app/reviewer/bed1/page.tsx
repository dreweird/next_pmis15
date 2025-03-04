"use client";

import Bed1Component from '@/app/components/Bed1Table';
import SelectOffice from '@/app/components/SelectOffice'
import React, { useState } from 'react'

const bed1 = () => {

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };
  
  return (
    <div>
        <SelectOffice onSelect={handleSelect} />
        <Bed1Component selectedValue={selectedValue} />
    </div>
  )
}

export default bed1