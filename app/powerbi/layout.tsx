import Link from "next/link"

export default function PowerBILayout({
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
      <li className="p-4 hover:bg-gray-700 text-sm"> <Link href={"/powerbi/current"}>Current</Link></li>
      <li className="p-4 hover:bg-gray-700 text-sm"> <Link href={"/powerbi/continuing"}>Continuing</Link></li>
      </ul>
      </div>
      <div className="flex-1 p-4">
        {children}
      </div>
      </div>
    )
}