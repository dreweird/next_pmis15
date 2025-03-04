"use client";

import React, { useEffect, useState } from 'react'

interface OfficeData {
  user_id: number;
  office: string;
}

interface SelectComponentProps {
  onSelect: (e: number) => void;
}

interface BudgetData {
    ous_id: number;
}

const SelectOfficeBudget:  React.FC<SelectComponentProps> = ({ onSelect}) => {

   const [officedata, setOfficeData] = useState<OfficeData[]>([]);
   const [budgetdata, setBudgetData] = useState<BudgetData[]>([]);
   const [InputData, SetInputData] = useState({
    id: "",
    officeId: ""
  });

    useEffect(() => {
        fetch("/api/office/get_office") // Fetch data from server
            .then((result) => result.json()) // Convert to JSON
            .then((rowData) => setOfficeData(rowData.result)); // Update state of `rowData`
        fetch("/api/office/get_budget_assignment") // Fetch data from server
            .then((result) => result.json()) // Convert to JSON
            .then((rowData) => setBudgetData(rowData.result)); // Update state of `rowData`
    }, []);
  
    const selectofficeData = async (e: number) => {
      onSelect(e);
  
    };

  return (
    <div className="w-full md:w-1/5 px-2">
    <select
        name = "reviewer1" id = "reviewer1"
        value={InputData.officeId}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            [SetInputData({ ...InputData, officeId: e.target.value }),selectofficeData(Number(e.target.value))]
        }
        required
        >
        <option value="">Select Division/Office</option>
        {officedata.filter(x => budgetdata.map(x => x.ous_id).includes(x.user_id)).map((data1) => (
            <option key={data1.user_id} value={data1.user_id}>
            {data1.office}
            </option>
        ))}
    </select>
  </div>
  )
}

export default SelectOfficeBudget

