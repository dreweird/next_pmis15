import Link from "next/link"

export default function AccompLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
      <div className="flex">
      <div className="w-30 h-screen bg-gray-800 text-white">
      <div className="p-4">
      <h1 className="text-2xl font-bold"> Menu</h1>
      </div>
      <ul>
      <li className="p-4 hover:bg-gray-700 text-sm"> <Link href={"/encoder/accomplishment/bed1"}>BED-1 (Obligation)</Link></li>
      <li className="p-4 hover:bg-gray-700 text-sm"> <Link href={"/encoder/accomplishment/bed2"}>BED-2 (Physical)</Link></li>
      <li className="p-4 hover:bg-gray-700 text-sm"> <Link href={"/encoder/accomplishment/bed3"}>BED-3 (Disbursement)</Link></li>
      <li className="p-4 hover:bg-gray-700 text-sm"> <Link href={"/encoder/accomplishment/byDistrict"}>By District</Link></li>
      </ul>
      </div>
      <div className="flex-1 p-4">
        {children}
      </div>
      </div>
        // <section>

        //     <div className='bg-slate-500 w-full h-full flex'>   
        //     <h1>Menu Page</h1>
        //          <Link href={"/encoder/targets/addMfo"}>Add target</Link>
        //          <Link href={"/encoder/targets/"}>Mother Page</Link>
        //          </div>

        //     {children}
        //     </section>
    )

  }