'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ClientSideRowModelModule, ColDef, ColGroupDef, RowSelectionModule, RowSelectionOptions, themeBalham } from 'ag-grid-community';
import {  ExcelExportModule } from 'ag-grid-enterprise';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import * as custom from '../utils/valueGetters';
import { PivotModule, RowGroupingModule, TreeDataModule, LicenseManager } from 'ag-grid-enterprise';
import { useSession } from 'next-auth/react'
import { updateData } from '../actions/updateData';
import ExportButton from './ExportButton';
import { TrashIcon, FlagIcon } from "@heroicons/react/24/outline";


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule, PivotModule, TreeDataModule, ExcelExportModule, RowSelectionModule]);

LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d");


interface ResultComponentProps {
  selectedValue: string;
}

const Bed1Component: React.FC<ResultComponentProps> = ({ selectedValue }) => {

    const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState<any[]>([]);
    const { data: session } = useSession()
    const [status2, setStatus] = useState();
    const [currentId, setCurrentID] = useState();

    const handleFlagged = async (mfo_id: any) => {
    let remarks = prompt("Please give your remarks");

    if (remarks == null || remarks == "") {
      alert("You cancelled the flagged")
    } else {
      const flaggedResponse = await fetch("/api/mfo/update", { // update the status of mfo to flagged
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mfo_id, col_name: "flagged", value: 1 }),
      });
      const messageResponse =  await fetch("/api/mfo/update", { // update the reviewer's remarks
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mfo_id, col_name: "reviewer_remarks", value: remarks }),
      });
      const flagged = await flaggedResponse.json();
      const message = await messageResponse.json();
      console.log(message, flagged)
      if(!message && !flagged){
        alert("Something went wrong.")
      }else{
        alert('Targets successfully flagged')
        if (gridRef.current) {
          const rowNode = gridRef.current.api.getRowNode(mfo_id);
          if (rowNode) {
            rowNode.setDataValue("flagged", 1);
          }
        }
      }
    }
    
  };

  const handleFlagged2 = async (mfo_id: any) => {
    const result = window.confirm("Are you sure you want to approve the target?");
    if(result){
      const response = await fetch("/api/mfo/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mfo_id, col_name: "flagged", value: 2 }),
      });
      const json = await response.json();
      if(!json){
        alert("Something went wrong!")
      }else{
        alert("review was successful!")
   if (gridRef.current) {
          const rowNode = gridRef.current.api.getRowNode(mfo_id);
          if (rowNode) {
            rowNode.setDataValue("flagged", 2);
          }
        }
      
      }
    }
  }

    useEffect(() => {
      let id = Number(selectedValue) 
      fetch(`/api/mfo/${id}`) // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => {setRowData(rowData.result)}); // Update state of `rowData`
        if(id!=0){
            fetch(`/api/users/${id}`) // Fetch data from server
            .then((result) => result.json()) // Convert to JSON
            .then((rowData) => 
            {console.log(rowData);
                setCurrentID(rowData.result.user_id); // Update state of `rowData`
            setStatus(rowData.result.status);
          });
        }
     
   
    }, [selectedValue]);

        const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([
          { field: 'h1',  rowGroup: true, hide: true},
          { field: 'h2',  rowGroup: true, hide: true},
          { field: 'h3',  rowGroup: true, hide: true},
          { field: 'h4',  rowGroup: true, hide: true},
      
          {headerName: "Unit Measure", field: 'unit', width: 100, cellClass: ['data']},
     {headerName: "BED 1 - Obligation Target",  marryChildren: true,
            children: [
              {
                headerName: 'Jan', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "jan_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "jan_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_janft, colId: 'jan_tot'}
                ]
              },
              {
                headerName: 'Feb', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "feb_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "feb_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn',  cellClass: ['data', 't'], valueGetter: custom.total_febft, colId: 'feb_tot'}
                ]
              },
              {
                headerName: 'Mar', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "mar_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "mar_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_marft, colId: 'mar_tot'}
                ]
              },
              {
                headerName: 'Q1',
                children: [
                  { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft', valueGetter: custom.total_q1_mooe_ft},
                  { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft_co', valueGetter: custom.total_q1_co_ft},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], colId: 'q1_tot', valueGetter: custom.total_q1}
                ]
              },
              {
                headerName: 'Apr', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "apr_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "apr_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_aprft, colId: 'apr_tot'}
                ]
              },
              {
                headerName: 'May', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "may_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "may_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_mayft, colId: 'may_tot'}
                ]
              },
              {
                headerName: 'Jun', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "jun_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "jun_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_junft, colId: 'jun_tot'}
                ]
              },
              {
                headerName: 'Q2',
                children: [
                  { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2ft', valueGetter: custom.total_q2_mooe_ft},
                  { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2ft_co', valueGetter: custom.total_q2_co_ft},
                  { headerName: 'TOTAL', type: 'obligationColumn', cellClass: ['data', 't'], colId: 'q2_tot', valueGetter: custom.total_q2}
                ]
              },
              {
                headerName: 'Jul', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "jul_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "jul_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_julft, colId: 'jul_tot'}
                ]
              },
              {
                headerName: 'Aug', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "aug_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "aug_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_augft, colId: 'aug_tot'}
                ]
              },
              {
                headerName: 'Sep', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "sep_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "sep_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_sepft, colId: 'sep_tot'}
                ]
              },
              {
                headerName: 'Q3',
                children: [
                  { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3ft', valueGetter: custom.total_q3_mooe_ft},
                  { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3ft_co', valueGetter: custom.total_q3_co_ft},
                  { headerName: 'TOTAL', type: 'obligationColumn', cellClass: ['data', 't'], colId: 'q3_tot', valueGetter: custom.total_q3}
                ]
              },
              {
                headerName: 'Oct', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "oct_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "oct_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_octft, colId: 'oct_tot'}
                ]
              },
              {
                headerName: 'Nov', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "nov_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "nov_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_novft, colId: 'nov_tot'}
                ]
              },
              {
                headerName: 'Dec', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "dec_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  {headerName: "CO", field: "dec_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_decft, colId: 'dec_tot'}
                ]
              },
              {
                headerName: 'Q4',
                children: [
                  { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4ft', valueGetter: custom.total_q4_mooe_ft},
                  { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4ft_co', valueGetter: custom.total_q4_co_ft},
                  { headerName: 'TOTAL', type: 'obligationColumn', cellClass: ['data', 't'], colId: 'q4_tot', valueGetter: custom.total_q4}
                ]
              },
              {
                headerName: 'Grand Total',
                children: [
                  { headerName: 'MOOE', minWidth: 110,aggFunc: custom.GrandTotalAggFunc, valueFormatter: custom.currencyFormatter, columnGroupShow: 'open', cellClass: ['data'], colId: 'total_ft', valueGetter: custom.total_mooe_ft},
                  { headerName: 'CO', minWidth: 110,aggFunc: custom.GrandTotalAggFunc, valueFormatter: custom.currencyFormatter, columnGroupShow: 'open', cellClass: ['data'], colId: 'total_ft_co', valueGetter: custom.total_co_ft},
                  { headerName: 'TOTAL', type: 'numericColumn', cellClass: ['data', 'total'], colId: 'grandtotal_ft', valueGetter: custom.grandtotal_ft,
                    cellStyle: params => {
                      if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal' }}
                    },minWidth: 110,aggFunc: custom.TotalYearAggFunc,valueFormatter: custom.currencyFormatter}
                ]
              }
    
            ]
        },
    {headerName: "BED 2 - Physical Target", marryChildren: true,
        children: [
            {headerName: "Jan", field: "jan_pt", columnGroupShow: "open",type: 'valueColumn', editable: params => { 
              if (params.node.group) return false; // Not editable for group rows
              return params.data.dedit=== 1;
            },},
            {headerName: "Feb", field: "feb_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Mar", field: "mar_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Q1",  type: 'physicalColumn', valueGetter: custom.Q1_Physical,  colId: 'Q1_pt',},
            {headerName: "Apr", field: "apr_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "May", field: "may_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Jun", field: "jun_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Q2", type: 'physicalColumn', valueGetter: custom.Q2_Physical,  colId: 'Q2_pt',},
            {headerName: "Jul", field: "jul_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Aug", field: "aug_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Sep", field: "sep_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Q3", type: 'physicalColumn', valueGetter: custom.Q3_Physical,  colId: 'Q3_pt',},
            {headerName: "Oct", field: "oct_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Nov", field: "nov_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Dec", field: "dec_pt", columnGroupShow: "open",type: 'valueColumn'},
            {headerName: "Q4", type: 'physicalColumn', valueGetter: custom.Q4_Physical,  colId: 'Q4_pt',},
            { headerName: 'TOTAL', type: 'numericColumn',  colId: 'PT', valueGetter: custom.GrandTotal_Physical, minWidth: 150,
            cellStyle: params => {
                if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal' }}
        }, aggFunc: custom.TotalYearAggFunc, width: 110,valueFormatter: custom.currencyFormatter}
        ]  
    },
  {headerName: "BED 3 - Disbursement Target", marryChildren: true,
      children: [
        {
          headerName: 'Jan', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "jan_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            {headerName: "CO", field: "jan_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_jandt, colId: 'jandt_tot'}
          ]
        },
        {
          headerName: 'Feb', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "feb_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            {headerName: "CO", field: "feb_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_febdt, colId: 'febdt_tot'}
          ]
        },
        {
          headerName: 'Mar', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "mar_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'], },
            {headerName: "CO", field: "mar_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'], },
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_mardt, colId: 'mardt_tot'}
          ]
        },
        {
          headerName: 'Q1',
          children: [
            { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1dt', valueGetter: custom.total_q1_mooe_dt},
            { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1dt_co', valueGetter: custom.total_q1_co_dt},
            { headerName: 'TOTAL', type: 'disbursementColumn', cellClass: ['data', 't'], colId: 'q1dt_tot', valueGetter: custom.totaldt_q1}
          ]
        },
        {
          headerName: 'Apr', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "apr_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'], },
            {headerName: "CO", field: "apr_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'], },
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_aprdt, colId: 'aprdt_tot'}
          ]
        },
        {
          headerName: 'May', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "may_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'], },
            {headerName: "CO", field: "may_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'], },
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_maydt, colId: 'maydt_tot'}
          ]
        },
        {
          headerName: 'Jun', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "jun_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            {headerName: "CO", field: "jun_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_jundt, colId: 'jundt_tot'}
          ]
        },
        {
          headerName: 'Q2',
          children: [
            { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2dt', valueGetter: custom.total_q2_mooe_dt},
            { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2dt_co', valueGetter: custom.total_q2_co_dt},
            { headerName: 'TOTAL', type: 'disbursementColumn', cellClass: ['data', 't'], colId: 'q2dt_tot', valueGetter: custom.totaldt_q2}
          ]
        },
        {
          headerName: 'Jul', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "jul_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            {headerName: "CO", field: "jul_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_juldt, colId: 'juldt_tot'}
          ]
        },
        {
          headerName: 'Aug', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "aug_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            {headerName: "CO", field: "aug_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_augdt, colId: 'augdt_tot'}
          ]
        },
        {
          headerName: 'Sep', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "sep_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            {headerName: "CO", field: "sep_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_sepdt, colId: 'sepdt_tot'}
          ]
        },
        {
          headerName: 'Q3',
          children: [
            { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3dt', valueGetter: custom.total_q3_mooe_dt},
            { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3dt_co', valueGetter: custom.total_q3_co_dt},
            { headerName: 'TOTAL', type: 'disbursementColumn', cellClass: ['data', 't'], colId: 'q3dt_tot', valueGetter: custom.totaldt_q3}
          ]
        },
        {
          headerName: 'Oct', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "oct_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            {headerName: "CO", field: "oct_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_octdt, colId: 'octdt_tot'}
          ]
        },
        {
          headerName: 'Nov', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "nov_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            {headerName: "CO", field: "nov_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_novdt, colId: 'novdt_tot'}
          ]
        },
        {
          headerName: 'Dec', columnGroupShow: 'open',
          children: [
            {headerName: "MOOE", field: "dec_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            {headerName: "CO", field: "dec_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data']},
            { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_decdt, colId: 'decdt_tot'}
          ]
        },
        {
          headerName: 'Q4',
          children: [
            { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4dt', valueGetter: custom.total_q4_mooe_dt},
            { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4dt_co', valueGetter: custom.total_q4_co_dt},
            { headerName: 'TOTAL', type: 'disbursementColumn', cellClass: ['data', 't'], colId: 'q4dt_tot', valueGetter: custom.totaldt_q4}
          ]
        },
        {
          headerName: 'Grand Total',
          children: [
            { headerName: 'MOOE', type: 'valueColumn', minWidth: 110,columnGroupShow: 'open', cellClass: ['data'], colId: 'total_dt', valueGetter: custom.total_mooe_dt},
            { headerName: 'CO', type: 'valueColumn', minWidth: 110,columnGroupShow: 'open', cellClass: ['data'], colId: 'total_dt_co', valueGetter: custom.total_co_dt},
            { headerName: 'TOTAL', type: 'numericColumn', minWidth: 110,cellClass: ['data', 'total'], colId: 'grandtotal_dt', valueGetter: custom.grandtotal_dt,
           cellStyle: params => {
                      if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal' }}
            },width: 110,aggFunc: custom.TotalYearAggFunc2, valueFormatter: custom.currencyFormatter}
          ]
        }
      ]  
  },
    {headerName: "Action",  field:"flagged", minWidth: 100, cellRenderer: (params: any) => {
    if (params.node.group) return;
    if (params.data.flagged == 0) return (
      <div className="flex items-start">
        <FlagIcon
          onClick={() => handleFlagged(params.data.mfo_id)}
          className="h-6 w-6 cursor-pointer mx-4 text-red-500 shadow hover:shadow-md mr-1 mb-1 ease-linear transition-all duration-150"
          />
        <FlagIcon
          onClick={() => handleFlagged2(params.data.mfo_id)}
          className="h-6 w-6 cursor-pointer mx-4 text-green-500 shadow hover:shadow-md mr-1 mb-1 ease-linear transition-all duration-150"
          />
      </div>
    )
    if (params.data.flagged == 2) return (
      <div className="flex items-start">
         <span className="text-center font-bold text-teal-700" >Reviewed</span>
      </div>
    )
    if (params.data.flagged == 1) return (
      <div className="flex items-start">
         <span className="text-center font-bold text-red-600" >Flagged</span>
      </div>
    )

    },},
        ]);
        const getRowClass = (params: { node: { group: any; }; }) => {
          if (params.node.group) {
              return 'group-header';
          }
      };
      
      const defaultColDef = useMemo(() => {
        return {
          sortable: true, resizable: true,  enablePivot: true,
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

  const countFlagged = rowData.reduce((accumulator, currentValue) => {
  //  console.log(currentValue.flagged);
    if (currentValue.flagged === 0) {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }, 0);

  const submitForReview = async() => {
    console.log(countFlagged);
    if(countFlagged == 0) {
      if (confirm("Are you sure you want to approved BEDs123?") == true) {
        const response = await fetch("/api/logs/add", { // Add logs date of approved
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ actions: "Approved BEDs123", user_id: Number(currentId) }),
        });
        const json = await response.json();
        const response2 = await fetch("/api/users/updateStatus", { // update the status of the BEDs123 to approved
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ col_name: "status", value: 2, user_id: Number(currentId) }),
        });
        const response3 = await fetch("/api/users/updateStatus", { // users cannot edit the BEDs123
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ col_name: "canEdit", value: 0, user_id: Number(currentId) }),
        });
        if(json) alert('Data was succesfully updated!');
      } else {
        alert("You pressed canceled!");
      }

    }else{
      alert("Please review all targets")
    }

  }

  return (
      <div style={{ height: 700, width: '100%' }}>
        {/* <ExportButton gridRef={gridRef} fileName="BED1.xlsx"/> */}
        {status2 == 2 && <span className="text-lg text-green-600">BEDs 123 Approved</span>} 
        {status2 == 1 && <button onClick={submitForReview} className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded print:hidden">APPROVED BEDs123</button> }

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

export default Bed1Component;