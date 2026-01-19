"use client";

import React, { useEffect, useState } from "react";

interface OfficeData {
  user_id: number;
  office: string;
}

interface SelectComponentProps {
  onSelect: (e: number) => void;
}

const SelectOffice: React.FC<SelectComponentProps> = ({ onSelect }) => {
  const [officedata, setOfficeData] = useState<OfficeData[]>([]);
  const [InputData, SetInputData] = useState({
    id: "",
    officeId: "",
  });

  useEffect(() => {
    fetch("/api/office/get_office") // Fetch data from server
      .then((result) => result.json()) // Convert to JSON
      .then((rowData) => setOfficeData(rowData.result)); // Update state of `rowData`
  }, []);

  const selectofficeData = async (e: number) => {
    onSelect(e);
  };
  
  return (
    <div className="w-full md:w-1/5 px-2">
      <select
        name="reviewer1"
        id="reviewer1"
        value={InputData.officeId}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => [
          SetInputData({ ...InputData, officeId: e.target.value }),
          selectofficeData(Number(e.target.value)),
        ]}
        required
      >
        <option value="">Select Division/Office</option>
        {officedata.map((x) => (
          <option key={x.user_id} value={x.user_id}>
            {x.office}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOffice;
