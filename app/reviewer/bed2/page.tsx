"use client";

import Bed2Component from '@/app/components/Bed2Table';
import SelectOffice from '@/app/components/SelectOffice'
import React, { useEffect, useState } from 'react'

const bed2 = () => {

  const [selectedValue, setSelectedValue] = useState('');
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    let id = Number(selectedValue) 
    fetch(`/api/mfo/locked`) // Fetch data from server
      .then((result) => result.json()) // Convert to JSON
      .then((rowData) => {setRowData(rowData.result)}); // Update state of `rowData`
  
  }, [selectedValue]);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };

  const editableMonth = rowData.filter(x => x.locked === 1);
  
  return (
    <div>
        <SelectOffice onSelect={handleSelect} />
        Editable Month:  {editableMonth.map(x => {
return x.month + ', ';
      })}
        <Bed2Component selectedValue={selectedValue} locked={rowData} />
    </div>
  )
}

export default bed2;

