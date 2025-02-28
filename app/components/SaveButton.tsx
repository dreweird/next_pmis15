'use client'
import { useFormStatus } from 'react-dom'
 
export default function SaveButton() {
   const { pending } = useFormStatus();
  return (
    <button  disabled={pending} type="submit" 
    className={`${
        pending ? "bg-gray-600" : "bg-green-700"
      } shadow hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
      >
   {pending ? 'Saving...' : 'Save'}
  </button>

  )
}