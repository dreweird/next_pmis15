"use client";

import ResultComponent from '@/app/components/Bed1Table';
import SelectOffice from '@/app/components/SelectOffice'
import React, { useState } from 'react'

const bed3 = () => {

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

export default bed3