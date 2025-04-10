'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ClientSideRowModelModule, ColDef, ColGroupDef, ExcelExportParams, ExcelRow, ExcelStyle, RowSelectionModule, RowSelectionOptions, themeBalham } from 'ag-grid-community';
import {  ExcelExportModule } from 'ag-grid-enterprise';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import * as custom from '../utils/valueGetters';
import { PivotModule, RowGroupingModule, TreeDataModule, LicenseManager } from 'ag-grid-enterprise';
import { useSession } from 'next-auth/react'
import { updateData } from '../actions/updateData';
import ExportButton from './ExportButton';


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule, PivotModule, TreeDataModule, ExcelExportModule, RowSelectionModule]);

LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d");


interface ResultComponentProps {
  selectedValue: string;
  locked: any;
}

const Bed2Component: React.FC<ResultComponentProps> = ({ selectedValue, locked }) => {

    const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState<any[]>([]);
    const { data: session } = useSession()
    const type: number = Number(session?.user?.email); // Only Encoder Account can update the physical accomplishment

    useEffect(() => {
      let id = Number(selectedValue) 
      fetch(`/api/mfo/${id}`) // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => {setRowData(rowData.result)}); // Update state of `rowData`
   
    }, [selectedValue]);

  const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([

    { field: 'h1',  rowGroup: true, hide: true},
    { field: 'h2',  rowGroup: true, hide: true},
    { field: 'h3',  rowGroup: true, hide: true},
    { field: 'h4',  rowGroup: true, hide: true},

    {headerName: "Unit Measure", field: 'unit', width: 100, cellClass: ['data']},
   {headerName: "BED 2 - Physical Target", marryChildren: true,
        children: [
            {headerName: "Jan", field: "jan_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Feb", field: "feb_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Mar", field: "mar_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Q1",  type: 'quarterColumn', valueGetter: custom.Q1_Physical,  colId: 'Q1_pt', cellClass: ['data', 't']},
            {headerName: "Apr", field: "apr_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "May", field: "may_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Jun", field: "jun_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Q2", type: 'quarterColumn', valueGetter: custom.Q2_Physical,  colId: 'Q2_pt', cellClass: ['data', 't']},
            {headerName: "Jul", field: "jul_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Aug", field: "aug_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Sep", field: "sep_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Q3", type: 'quarterColumn', valueGetter: custom.Q3_Physical,  colId: 'Q3_pt', cellClass: ['data', 't']},
            {headerName: "Oct", field: "oct_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Nov", field: "nov_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Dec", field: "dec_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: false},
            {headerName: "Q4", type: 'quarterColumn', valueGetter: custom.Q4_Physical,  colId: 'Q4_pt', cellClass: ['data', 't']},
            { headerName: 'TOTAL', type: 'numericColumn',  colId: 'PT', valueGetter: custom.GrandTotal_Physical, width: 110,  cellClass: ['data', 'total'],
              cellStyle: params => {
                if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal'}}
              }, aggFunc: custom.TotalYearAggFunc, valueFormatter: custom.currencyFormatter}
        ]  
    },
    {headerName: "BED 2 - Physical Accomplishment", marryChildren: true,
      children: [
          {headerName: "Jan", field: "jan_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[0].locked == 1}},
          {headerName: "Feb", field: "feb_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[1].locked == 1}},
          {headerName: "Mar", field: "mar_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[2].locked == 1}},
          {headerName: "Q1",  type: 'quarterColumn2', valueGetter: custom.Q1_PhysicalA,  colId: 'Q1_pa', cellClass: ['data', 'a']},
          {headerName: "Apr", field: "apr_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[3].locked == 1;}},
          {headerName: "May", field: "may_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[4].locked == 1;}},
          {headerName: "Jun", field: "jun_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[5].locked == 1;}},
          {headerName: "Q2", type: 'quarterColumn2', valueGetter: custom.Q2_PhysicalA,  colId: 'Q2_pa', cellClass: ['data', 'a']},
          {headerName: "Jul", field: "jul_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[6].locked == 1;}},
          {headerName: "Aug", field: "aug_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[7].locked == 1;}},
          {headerName: "Sep", field: "sep_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[8].locked == 1;}},
          {headerName: "Q3", type: 'quarterColumn2', valueGetter: custom.Q3_PhysicalA,  colId: 'Q3_pa', cellClass: ['data', 'a']},
          {headerName: "Oct", field: "oct_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[9].locked == 1;}},
          {headerName: "Nov", field: "nov_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[10].locked == 1;}},
          {headerName: "Dec", field: "dec_pa", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.status == 2 && params.data.area == 0 && locked[11].locked == 1;}},
          {headerName: "Q4", type: 'quarterColumn2', valueGetter: custom.Q4_PhysicalA,  colId: 'Q4_pa', cellClass: ['data', 'a']},
          { headerName: 'TOTAL', type: 'numericColumn',  colId: 'PA', valueGetter: custom.GrandTotal_PhysicalA, width: 110,  cellClass: ['data', 'total'],
            cellStyle: params => {
              if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal'}}
            }, aggFunc: custom.TotalYearAggFunc, valueFormatter: custom.currencyFormatter}
      ]  
  },
  {
    headerName: 'Variance',
    colId: 'Var',
    width: 110,
    cellStyle: params => {
      if (params.node.group) {
        return {
          'textAlign': 'right',
          'color': 'black',
          'backgroundColor': '#f7adad',
          'fontWeight': 'bold'
        };
      } else {
        return {
          'textAlign': 'right',
          'color': 'black',
          'backgroundColor': '#f7adad',
          'fontWeight': 'normal'
        };
      }
    },
    aggFunc: custom.TotalUnobligatedAggFunc,
    valueGetter: custom.variance,
    valueFormatter: custom.currencyFormatter,
    type: 'numericColumn',
    cellClass: ['data', 'v']
  },
  {
    headerName: 'Percentage',
    colId: 'Per',
    width: 110,
    cellStyle: params => {
      if (params.node.group) {
        return {
          'textAlign': 'right',
          'color': 'black',
          'backgroundColor': '#dfa9f5',
          'fontWeight': 'bold'
        };
      } else {
        if(Number(params.value.toString()) > 49) {
          return {
            'textAlign': 'right',
            'color': 'black',
            'backgroundColor': '#dfa9f5',
            'fontWeight': 'normal'
          };
        }else{
          return {
            'textAlign': 'right',
            'color': 'red',
            'backgroundColor': '#dfa9f5',
            'fontWeight': 'normal'
          };
        }

      }
    },
    aggFunc: custom.TotalpercentAggFunc,
    valueGetter: custom.percentage_physical,
    valueFormatter: custom.currencyFormatter,
    type: 'numericColumn',
    cellClass: ['data', 'p']
  },
  {
    headerName: 'Remarks',
    children: [
      {
        headerName: 'Q1',
        field: 'remarks_q1',
        editable: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
        cellClass: ['data']
      },
      {
        headerName: 'Q2',
        field: 'remarks_q2',
        editable: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
        cellClass: ['data']
      },
      {
        headerName: 'Q3',
        field: 'remarks_q3',
        editable: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
        cellClass: ['data']
      },
      {
        headerName: 'Q4',
        field: 'remarks_q4',
        editable: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: { maxLength: '3000', cols: '50', rows: 6 },
        cellClass: ['data']
      },
      
    ]
  }
  ]);

        const getRowClass = (params: { node: { group: any; }; }) => {
          if (params.node.group) {
              return 'group-header';
          }
      };
      
      const defaultColDef = useMemo(() => {
        return {
          sortable: true, resizable: true, filter: true
        };
      }, []);
      
// Define column types
const columnTypes = useMemo(() => { 
    return {
    valueColumn: {
      width: 130,
      aggFunc: 'sum',
      valueParser: 'Number(newValue)',
      cellStyle: custom.customStyleGroup,
      valueFormatter: custom.currencyFormatter
    },
    quarterColumn: {
      width: 130,
      aggFunc: custom.TotalQuarterAggFunc,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      cellStyle: custom.customStyleGroupQuarter,
      valueFormatter: custom.currencyFormatter
    },
    quarterColumn2: {
      width: 130,
      aggFunc: custom.TotalQuarterAggFunc,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      cellStyle: custom.customStyleGroupQaurter2,
      valueFormatter: custom.currencyFormatter
    },
    totalColumn: {
      width: 130,
      aggFunc: custom.TotalMonthAggFunc,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      cellStyle: custom.customStyleGroupTotal,
      valueFormatter: custom.currencyFormatter
    },
    };
}, []);
      
      const getRowId = (params: { data: { mfo_id: any; }; }) => params.data.mfo_id.toString();
      const rowSelection = useMemo<RowSelectionOptions | "single" | "multiple" >(() => {
          return {
            mode: "singleRow",
            checkboxes: false,
            enableClickSelection: true,
          };
        }, []);
      
      const autoGroupColumnDef: ColDef = useMemo(() => {
        return {
          headerName: 'MFOs/PAPs',
          pinned: 'left',
          width: 350,
          resizable: true,
          field: "name",
          cellRenderer: "agGroupCellRenderer",
          cellRendererParams: {
              suppressCount: true,
              innerRenderer: custom.SimpleCellRenderer,
              //checkbox: false,
          },
          cellClass: ['data'],
          cellClassRules: {"bold": params => params.node.group ? true : false}         
          };
      }, []);

      const onCellValueChanged = async (event: any) => {
            const res = updateData(event.data.mfo_id, event.colDef.field, event.newValue);
            if(await res){
              alert('Data was succesfully updated!');
            }
        
      };

  return (
      <div style={{ height: 700, width: '100%' }}>
        <ExportButton gridRef={gridRef} fileName="BED2.xlsx"/>
             <AgGridReact  theme={themeBalham}
                      ref={gridRef} // Ref for accessing Grid's API
                       getRowId={getRowId}
                       rowData={rowData} // Row Data for Rows
                       columnDefs={colDefs} // Column Defs for Columns
                       defaultColDef={defaultColDef} // Default Column Properties
                       animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                       groupDefaultExpanded = {-1}
                       columnTypes={columnTypes}
                       suppressAggFuncInHeader={true}
                
                       rowSelection={rowSelection}
                       getRowClass={getRowClass}
                       onCellValueChanged={onCellValueChanged}
                       autoGroupColumnDef={autoGroupColumnDef}
         
                       showOpenedGroup={true}
                      suppressGroupRowsSticky={true}
                      groupHideParentOfSingleChild ={true} 
                      excelStyles={custom.excelStyles}
             />
             </div>
  );
};

export default Bed2Component;