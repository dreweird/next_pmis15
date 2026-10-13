"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

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

const SelectOffice: React.FC<SelectComponentProps> = ({ onSelect }) => {
  const { data: session } = useSession();
  const [officedata, setOfficeData] = useState<OfficeData[]>([]);
  const [budgetdata, setBudgetData] = useState<BudgetData[]>([]);
  const [InputData, SetInputData] = useState({
    id: "",
    officeId: "",
  });

  const isAdmin = session?.user.type === 0;
  const isBudget = session?.user.type === 7;
  const isDisburse = session?.user.type === 8;

  useEffect(() => {
    fetch("/api/office/get_office") // Fetch data from server
      .then((result) => result.json()) // Convert to JSON
      .then((rowData) => setOfficeData(rowData.result)); // Update state of `rowData`

    if (isBudget) {
      fetch("/api/office/get_budget_assignment") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => setBudgetData(rowData.result)); // Update state of `rowData`
    }
  }, []);

  const selectofficeData = async (e: number) => {
    onSelect(e);
  };

  return (
    <div className="w-full md:w-1/5 px-2 mb-4">
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
        {isAdmin || isDisburse ? (
          officedata.map((x) => (
            <option key={x.user_id} value={x.user_id}>
              {x.office}
            </option>
          ))
        ) : isBudget ? (
          officedata
            .filter((x) => budgetdata.map((x) => x.ous_id).includes(x.user_id))
            .map((data1) => (
              <option key={data1.user_id} value={data1.user_id}>
                {data1.office}
              </option>
            ))
        ) : (
          <></>
        )}
      </select>
    </div>
  );
};

export default SelectOffice;
