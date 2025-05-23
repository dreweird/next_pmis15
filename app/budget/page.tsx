"use client";

import Bed1Component from '@/app/components/Bed1Table';
import React, { useState } from 'react'
import SelectOfficeBudget from '../components/SelectOfficeBudget';

const budgetPage = () => {

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };
  
  return (
    <div>
        <SelectOfficeBudget onSelect={handleSelect} />
        <Bed1Component selectedValue={selectedValue} />
    </div>
  )
}

export default budgetPage