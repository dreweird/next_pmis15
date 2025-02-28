"use client";

import SaveButton from '@/app/components/SaveButton';
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface InputItem {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  mfo: string;
  unit: string;
  main: number;
  area: number;
};

const page = () => {
  const [status, setStatus] = useState<number | null>(null);
  const [inputList, setInputList] = useState<InputItem[]>([{h1: "",h2: "", h3: "", h4: "", mfo: "", unit: "", main: 0, area: 0}]);
  const router = useRouter()

  useEffect(() => {
      fetch("/api/users/retrieve") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => setStatus(rowData.result.status));
      
    }, []);

    if (status === 2) {
      return <div className='text-red-500'>Unable to add MFO target  because your targets were already verified!</div>;
    }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index] = {...list[index], [name]: value};
    //(list[index] as any)[name] = name === 'main' || name === 'area' ? Number(value) : value;
    setInputList(list);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, {h1: "",h2: "", h3: "", h4: "", mfo: "", unit: "", main: 0, area: 0}]);
  };


  async function formAction() {
    const JSONdata = JSON.stringify(inputList)
    const endpoint = '/api/mfo/add';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    if(result.success) {
      alert(`Data was successfully added!!!`)
      router.push('/encoder/targets/updateMfo')
    }else{
      alert(`Something wrong...`)
    }
  }

  return (  <div  style={{ width: '100%' }}>
     <form action={formAction}>
    {/* <form onSubmit={handleSubmit}> */}
  
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
              <th>Header 4</th>
              <th>MFO Name / PAPs</th>
              <th>Unit Measure</th>
              <th>Maintenance</th>
              <th>Area</th>
              <th></th>
              <th></th>
            </tr>
          {inputList.map((x, i) => {
            return (
            <tr key={i}>
       
            <td>
                
                <input  placeholder="Header 1"
                  type="text" name="h1"
                  value={x.h1}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td>
                <input  placeholder="Header 2"
                  type="text" name="h2"
                  value={x.h2}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td>
                <input  placeholder="Header 3"
                  type="text" name="h3"
                  value={x.h3}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td>
                <input  placeholder="Header 4"
                  type="text" name="h4"
                  value={x.h4}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td>
                <input  placeholder="MFO Name / PAPs"
                  type="text" name="mfo"
                  value={x.mfo}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td>
                <input  placeholder="Unit Measure"
                  type="text" name="unit"
                  value={x.unit}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td style={{ width: '3%' }}>
                <input  placeholder="Maintenance"
                  type="number" name="main" min="0" max="1"
                  value={x.main}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td style={{ width: '3%' }}>
                <input  placeholder="Area"
                  type="number" name="area" min="0" max="1"
                  value={x.area}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td style={{ width: '3%' }}>
                {inputList.length - 1 === i &&
                <>
                  <button type="button" className="px-3 py-2 text-sm font-medium text-center
                  text-white bg-blue-700 rounded-lg
                    hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleAddClick}>
                      Add
                  </button>
                </>
                }
              </td>
              <td>
                {inputList.length !== 1 && 
                <>
                <button type="button" className="px-3 py-2 text-sm font-medium text-center
                text-white bg-red-700 rounded-lg
                  hover:bg-red-800 focus:ring-4 focus:outline-none
                  focus:ring-red-300 dark:bg-blue-600 
                  dark:hover:bg-red-700 dark:focus:ring-blue-800"
                  onClick={() => handleRemoveClick(i)}>
                    Remove
                </button>
                </>
                }
              </td>
            </tr>
            );
            }
            )
            }
          </tbody>
        </table>
        <br></br>
        <SaveButton />
    </form>
  </div>

  )
}

export default page