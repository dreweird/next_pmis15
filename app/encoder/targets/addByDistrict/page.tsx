"use client";

import SaveButton from '@/app/components/SaveButton';
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface InputItem {
  mfo_id: string;
  province: string;
  municipal: string;
  district: string;
  barangay: string;
  target: string;
  cost: string;
  groups: string;
  [key: string]: string;
}

interface MunicipalData {
  municipal_id: string;
  province_name: string;
  municipal_name: string;
  District: string;
}

interface AreaMFO {
  mfo_id: string;
  name: string;
}

interface ProvinceData {
  province_id: string;
  province_name: string;
}



const page = () => {
  const [status, setStatus] = useState<number | null>(null);

  const [areaMFO, setAreaMFO] = useState<AreaMFO[]>([]);

  const [provData, setProvData] = useState<ProvinceData[]>([]);


  const [munData, setMunData] = useState<MunicipalData[]>([]);
  const [inputList, setInputList] = useState<InputItem[]>([{mfo_id: "",province: "", municipal: "", district: "", barangay: "", target: "", cost: "", groups: ""}]);
  const router = useRouter()

  useEffect(() => {
      fetch("/api/users/retrieve") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => setStatus(rowData.result.status));
      fetch("/api/byDistrict/list") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) =>setAreaMFO(rowData.result));
      fetch("/api/byDistrict/province") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => setProvData(rowData.result));
      fetch("/api/byDistrict/municipal") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => setMunData(rowData.result));
      
    }, []);

    if (status === 2) {
      return <div className='text-red-500'>Unable to add by district because your targets were already verified!</div>;
    }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    if(name == "municipal"){
      let result = munData.find(x => x.municipal_name === value)
      if (result) {
        list[index]["district"] = result.District;
      }
    }
    setInputList(list);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, {mfo_id: "",province: "", municipal: "", district: "", barangay: "", target: "", cost: "", groups: ""}]);
  };


  async function formAction() {
    const JSONdata = JSON.stringify(inputList)
    const endpoint = '/api/byDistrict/add';
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
      router.push('/encoder/targets/byDistrict')
    }else{
      alert(`Something went wrong...`)
    }
  }

  return (  <div  className="mx-auto p-8 overflow-x-auto">
     <form action={formAction}>
    {/* <form onSubmit={handleSubmit}> */}
  
        <table className='table-fixed w-full border-separate border-spacing-2 border border-slate-40'>
          <tbody>
            <tr>
              <th>MFO</th>
              <th>Province</th>
              <th>Municipal</th>
              <th>Barangay</th>
              <th>Target</th>
              <th>Total Cost</th>
              <th>Groups</th>
              <th className='w-10'></th>
              <th className='w-10'></th>
            </tr>
          {inputList.map((x, i) => {
            return (
            <tr key={i}>
       
            <td>
            <select name="mfo_id" onChange={e => handleInputChange(e, i)}  required>
              <option value="">Select MFO Target</option>
              {areaMFO.map((x) => (
                <option key={x.mfo_id} value={x.mfo_id}>
                  {x.name}
                </option>
              ))}
              </select>
              </td>
              <td>
              <select name="province" onChange={e => handleInputChange(e, i)} required>
                <option value="">Select Province</option>
                {provData.map((x) => (
                  <option key={x.province_id} value={x.province_name}>
                    {x.province_name}
                  </option>
                ))}
              </select>
              </td>
              <td>
              <select name="municipal" onChange={e => handleInputChange(e, i)} required>
                <option value="">{}</option>
                {munData.filter(x=> x.province_name == inputList[i].province).map((x) => (
                  <option key={x.municipal_id} value={x.municipal_name}>
                    {x.municipal_name}
                  </option>
                ))}
              </select>
              </td>
              <td>
                <input  placeholder="Name of Barangay"
                  type="text" name="barangay"
                  value={x.barangay}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td>
                <input  placeholder="Target"
                  type="text" name="target"
                  value={x.target}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td >
                <input  placeholder="Total Cost"
                  type="number" name="cost"
                  value={x.cost}
                  onChange={e => handleInputChange(e, i)}
                   />
              </td>
              <td >
              <input  placeholder="Groups"
                  type="text" name="groups"
                  value={x.groups}
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