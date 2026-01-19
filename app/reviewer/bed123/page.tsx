"use client";

import ResultComponent from '@/app/components/Bed123';
import SelectOffice from '@/app/components/SelectOffice'
import React, { useState } from 'react'

const bed123 = () => {

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };
  
  return (
    <div>
        <SelectOffice onSelect={handleSelect} />
        <ResultComponent selectedValue={selectedValue} />
    </div>
  )
}

export default bed123