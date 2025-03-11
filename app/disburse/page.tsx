"use client";

import Bed3Component from '@/app/components/Bed3Table';
import React, { useState } from 'react'
import SelectOffice from '../components/SelectOffice';

const budgetPage = () => {

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };
  
  return (
    <div>
        <SelectOffice onSelect={handleSelect} />
        <Bed3Component selectedValue={selectedValue} />
    </div>
  )
}

export default budgetPage