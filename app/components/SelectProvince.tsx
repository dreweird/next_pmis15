"use client";

import React, { useState } from 'react'

interface SelectComponentProps {
  onSelect: (e: string) => void;
}

const SelectOffice:  React.FC<SelectComponentProps> = ({ onSelect}) => {

   const [InputData, SetInputData] = useState({
    id: "",
    officeId: ""
  });

  
    const selectofficeData = async (e: string) => {
      onSelect(e);
  
    };

  return (
    <div className="w-full md:w-1/5 px-2">
    <select
        name = "reviewer1" id = "reviewer1"
        value={InputData.officeId}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) =>
          [SetInputData({ ...InputData, officeId: e.target.value }),selectofficeData(e.target.value)]
        }
        required
      >
        <option value="">Select Province</option>
        <option value="Agusan del Norte">Agusan del Norte</option>
        <option value="Agusan del Sur">Agusan del Sur</option>
        <option value="Surigao del Norte">Surigao del Norte</option>
        <option value="Surigao del Sur">Surigao del Sur</option>
        <option value="Province of Dinagat Islands">Province of Dinagat Islands</option>
    
    </select>
  </div>
  )
}

export default SelectOffice

