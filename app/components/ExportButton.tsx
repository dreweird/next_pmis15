import React, { useCallback, useEffect, useState } from 'react'

import { RefObject } from 'react';
import { ExcelExportParams, ExcelRow, GridApi } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

interface ExportButtonProps {
    gridRef: RefObject<AgGridReact | null>;
    fileName: string; 
}

const ExportButton: React.FC<ExportButtonProps> = ({ gridRef, fileName }) => {

        const [office, setdatauser] = useState();

        useEffect(() => {

            fetch("/api/users/retrieve")
            .then((result) => result.json()) // Convert to JSON
            .then((rowData) => {console.log(rowData.result.office);setdatauser(rowData.result.office)}); // Update state of `rowData`

        }, []);
    
   const getRows: () => ExcelRow[] = () =>{
        const name_office = office || "Unknown Office"; // Provide a default value if office is undefined
        return [
        {cells: [{ styleId: 'headappend',data: {value: "DEPARTMENT OF AGRICULTURE",type: "String"},},],},
        {cells: [{ styleId: 'headappend',data: {value: "Regional Field Office XIII",type: "String"},},],},
        {cells: [{ styleId: 'headappend',data: {value: name_office, type: "String"},},],},
        {cells: [{ styleId: 'headappend',data: {value: "C.Y. 2025 CURRENT APPROPRIATION",type: "String"},},],},
        {cells: [{ styleId: 'headappend',data: {value: 'PMIS v7.0 Generated as of ' + new Date().toDateString(),type: "String"},},],},
        {cells: [] },
      ]};
    
      const getParams: () => ExcelExportParams = () => ({
        prependContent: getRows(),
        shouldRowBeSkipped(params: any) {
            return params.node.group && params.node.childrenAfterGroup.length == 1;
        },
        processCellCallback(params: any){
        const { node } = params;
          if (params.column.colDef.field == 'name') {
            if (node.group) {
              return node.key;
            } else {
              return params.value;
            }
          } else if (params.column.colDef.field == 'fu' && isNaN(params.value))
            return '';
            
          else return params.value;
      },
      fileName: fileName,
      });


    const exportExcel = useCallback(() => {
    gridRef?.current!.api.exportDataAsExcel(getParams());
    }, [getParams]); 

  return (
    <div>
        <button onClick={exportExcel} className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded print:hidden">Export to Excel</button>
    </div>
  )
}

export default ExportButton