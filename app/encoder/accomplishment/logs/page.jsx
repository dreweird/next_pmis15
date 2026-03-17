"use client";  

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ClientSideRowModelModule, RowSelectionModule,  themeBalham,  } from 'ag-grid-community';
import {  ExcelExportModule } from 'ag-grid-enterprise';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { PivotModule, RowGroupingModule, TreeDataModule, LicenseManager } from 'ag-grid-enterprise';



ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule, PivotModule, TreeDataModule, ExcelExportModule, RowSelectionModule]);

LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d");
 
const page = () => {

    const gridRef = useRef(null); // ✅ Correct way to create a ref
    const [rowData, setRowData] = useState([]);


    useEffect(() => {
      fetch("/api/logs/list") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => {console.log(rowData); setRowData(rowData.result);}); // Update state of `rowData`
        }, [])

        const [colDefs, setColDefs] = useState([

            {headerName: "Action", field: 'actions', minWidth: 200},
            {headerName: "Date Updated", field: 'date_created', minWidth: 200, cellRenderer: (params) => { if (!params.value) return ''; const date = new Date(params.value);return date.toISOString().replace('T', ' ').substring(0, 19);
    }},
        
        ]);

        
          const defaultColDef = useMemo(() => {
            return {
              sortable: true,
              flex: 1,
              floatingFilter: true,
              resizable: true,
              wrapText: true,   
              autoHeight: true,   
              wrapHeaderText: true,
              autoHeaderHeight: true,
        
            };
          }, []);  
    
  return (
    <div style={{ height: 700, width: '100%' }}>   
    <AgGridReact  theme={themeBalham}
        ref={gridRef} // Ref for accessing Grid's API
        rowData={rowData} // Row Data for Rows
        columnDefs={colDefs} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
    />
</div>

  )
}

export default page