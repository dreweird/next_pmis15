"use client";  

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ClientSideRowModelModule, ColDef, ColGroupDef, RowSelectionModule, RowSelectionOptions, themeBalham } from 'ag-grid-community';
import {  ExcelExportModule } from 'ag-grid-enterprise';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import useSWR from 'swr'
import * as custom from '../../../utils/valueGetters';
import { PivotModule, RowGroupingModule, TreeDataModule, LicenseManager } from 'ag-grid-enterprise';



const fetcher = (url: string | URL | Request) => fetch(url).then((r) => r.json())
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule, PivotModule, TreeDataModule, ExcelExportModule, RowSelectionModule]);

LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d");
 
const page = () => {

   //   const { data, error, isLoading } = useSWR('/api/mfo/list', fetcher);
      const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
    //  console.log(data);
    const [rowData, setRowData] = useState<any[]>([]);

    useEffect(() => {
      fetch("/api/mfo/list") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => setRowData(rowData.result)); // Update state of `rowData`
      
    }, []);

        const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([
            { field: 'h1',  rowGroup: true, hide: true},
            { field: 'h2',  rowGroup: true, hide: true},
            { field: 'h3',  rowGroup: true, hide: true},
            { field: 'h4',  rowGroup: true, hide: true},
        
            {headerName: "Unit Measure", field: 'unit', minWidth: 200, cellClass: ['data']},
            {headerName: "BED 1 - Obligation Target",  marryChildren: true,
                children: [
                  {
                    headerName: 'Jan', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "jan_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "jan_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_janft, colId: 'jan_tot'}
                    ]
                  },
                  {
                    headerName: 'Feb', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "feb_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "feb_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      { headerName: 'TOTAL', type: 'totalColumn',  cellClass: ['data', 't'], valueGetter: custom.total_febft, colId: 'feb_tot'}
                    ]
                  },
                  {
                    headerName: 'Mar', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "mar_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "mar_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_marft, colId: 'mar_tot'}
                    ]
                  },
                  {
                    headerName: 'Q1',
                    children: [
                      { headerName: 'MOOE', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft', valueGetter: custom.total_q1_mooe_ft},
                      { headerName: 'CO', type: 'valueColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft_co', valueGetter: custom.total_q1_co_ft},
                      { headerName: 'TOTAL', type: 'obligationColumn', cellClass: ['data', 't'], colId: 'q1_tot', valueGetter: custom.total_q1}
                    ]
                  },
                  {
                    headerName: 'Apr', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "apr_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "apr_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_aprft, colId: 'apr_tot'}
                    ]
                  },
                  {
                    headerName: 'May', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "may_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "may_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_mayft, colId: 'may_tot'}
                    ]
                  },
                  {
                    headerName: 'Jun', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "jun_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "jun_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
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
                      {headerName: "MOOE", field: "jul_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "jul_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_julft, colId: 'jul_tot'}
                    ]
                  },
                  {
                    headerName: 'Aug', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "aug_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "aug_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_augft, colId: 'aug_tot'}
                    ]
                  },
                  {
                    headerName: 'Sep', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "sep_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "sep_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
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
                      {headerName: "MOOE", field: "oct_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "oct_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_octft, colId: 'oct_tot'}
                    ]
                  },
                  {
                    headerName: 'Nov', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "nov_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "nov_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_novft, colId: 'nov_tot'}
                    ]
                  },
                  {
                    headerName: 'Dec', columnGroupShow: 'open',
                    children: [
                      {headerName: "MOOE", field: "dec_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                      {headerName: "CO", field: "dec_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
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
                        if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal'}}
                      },minWidth: 110,aggFunc: custom.TotalYearAggFunc,valueFormatter: custom.currencyFormatter}
                    ]
                  }
        
                ]
            },
            {headerName: "BED 2 - Physical Target", marryChildren: true,
                children: [
                    {headerName: "Jan", field: "jan_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Feb", field: "feb_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Mar", field: "mar_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Q1",  type: 'physicalColumn', valueGetter: custom.Q1_Physical,  colId: 'Q1_pt', cellClass: ['data', 't']},
                    {headerName: "Apr", field: "apr_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "May", field: "may_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Jun", field: "jun_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Q2", type: 'physicalColumn', valueGetter: custom.Q2_Physical,  colId: 'Q2_pt', cellClass: ['data', 't']},
                    {headerName: "Jul", field: "jul_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Aug", field: "aug_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Sep", field: "sep_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Q3", type: 'physicalColumn', valueGetter: custom.Q3_Physical,  colId: 'Q3_pt', cellClass: ['data', 't']},
                    {headerName: "Oct", field: "oct_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Nov", field: "nov_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Dec", field: "dec_pt", columnGroupShow: "open",type: 'valueColumn', cellClass: ['data'],  editable: params => { 
                      if (params.node.group) return false; // Not editable for group rows
                      return params.data.canEdit !== 0;
                    },},
                    {headerName: "Q4", type: 'physicalColumn', valueGetter: custom.Q4_Physical,  colId: 'Q4_pt', cellClass: ['data', 't']},
                    { headerName: 'TOTAL', type: 'numericColumn',  colId: 'PT', valueGetter: custom.GrandTotal_Physical, minWidth: 150,  cellClass: ['data', 'total'],
                      cellStyle: params => {
                        if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal'}}
                      }, aggFunc: custom.TotalYearAggFunc, width: 110,valueFormatter: custom.currencyFormatter}
                ]  
            },
            {headerName: "BED 3 - Disbursement Target", marryChildren: true,
              children: [
                {
                  headerName: 'Jan', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "jan_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "jan_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_jandt, colId: 'jandt_tot'}
                  ]
                },
                {
                  headerName: 'Feb', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "feb_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "feb_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_febdt, colId: 'febdt_tot'}
                  ]
                },
                {
                  headerName: 'Mar', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "mar_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "mar_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
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
                    {headerName: "MOOE", field: "apr_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "apr_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_aprdt, colId: 'aprdt_tot'}
                  ]
                },
                {
                  headerName: 'May', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "may_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "may_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_maydt, colId: 'maydt_tot'}
                  ]
                },
                {
                  headerName: 'Jun', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "jun_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "jun_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
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
                    {headerName: "MOOE", field: "jul_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "jul_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_juldt, colId: 'juldt_tot'}
                  ]
                },
                {
                  headerName: 'Aug', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "aug_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "aug_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_augdt, colId: 'augdt_tot'}
                  ]
                },
                {
                  headerName: 'Sep', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "sep_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "sep_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
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
                    {headerName: "MOOE", field: "oct_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "oct_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_octdt, colId: 'octdt_tot'}
                  ]
                },
                {
                  headerName: 'Nov', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "nov_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "nov_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 't'], valueGetter: custom.total_novdt, colId: 'novdt_tot'}
                  ]
                },
                {
                  headerName: 'Dec', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "dec_dt", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
                    {headerName: "CO", field: "dec_dtc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: params => {  if (params.node.group) return false;return params.data.canEdit !== 0;},},
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
                      if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal'}}
                    },width: 110,aggFunc: custom.TotalYearAggFunc2, valueFormatter: custom.currencyFormatter}
                  ]
                }
              ]  
          },
        
        ]);
        const getRowClass = (params: { node: { group: any; }; }) => {
            if (params.node.group) {
                return 'group-header';
            }
        };
        
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
        
          const SimpleCellRenderer = (props: { node: { group: any; }; data: { area: number; main: number; flagged: number; }; value: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
            if (!props.node.group && props.data.area == 1) {
              return <span className="bg-yellow-300"> {props.value} </span>
            } else if(!props.node.group && props.data.main == 1){
              return <span className="bg-cyan-300"> {props.value} </span>
            } else if(!props.node.group && props.data.flagged == 1){
              return <span className="bg-red-800 text-white"> {props.value} </span>
            }else {
              return <span> {props.value} </span>
            }
          }
        
    

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
                      innerRenderer: SimpleCellRenderer,
                      //checkbox: false,
                  },
                  cellClass: ['data'],
           
                  
              };
          }, []);

        
        const columnTypes = useMemo(() => {
            return {   
              valueColumn: {
                minWidth: 100,
                aggFunc: 'sum',
                valueParser: 'Number(newValue)',
                cellStyle: custom.customStyleGroup,
                valueFormatter: custom.currencyFormatter
              },
              totalColumn: {
                minWidth: 110,
                aggFunc: custom.TotalMonthAggFunc,
                cellRenderer: 'agAnimateShowChangeCellRenderer',
                cellStyle: custom.customStyleGroupTotal,
                valueFormatter: custom.currencyFormatter
              },
           
              physicalColumn: {
                minWidth: 110,
                aggFunc: custom.TotalQuarterAggFunc,
                cellRenderer: 'agAnimateShowChangeCellRenderer',
                cellStyle:custom.customStyleGroupPhysical,
                valueFormatter: custom.currencyFormatter
              },
              obligationColumn: {
                minWidth: 110,
                aggFunc: custom.TotalQuarterAggFunc,
                cellRenderer: 'agAnimateShowChangeCellRenderer',
                cellStyle: custom.customStyleGroupQaurter2,
                valueFormatter: custom.currencyFormatter
              },
              disbursementColumn: {
                minWidth: 110,
                aggFunc: custom.TotalQuarterAggFunc,
                cellRenderer: 'agAnimateShowChangeCellRenderer',
                cellStyle: custom.customStyleGroupDisburse,
                valueFormatter: custom.currencyFormatter
              }, 
            };
          }, []);
        
        
          const onCellValueChanged = useCallback((event: { data: { mfo_id: any; }; colDef: { field: any; }; newValue: any; }) => {
            handleUpdateData(event.data.mfo_id, event.colDef.field, event.newValue);
          }, []);
        
          const handleUpdateData = async (mfo_id: any, col_name: any, value: any) => {
            const response = await fetch("/api/mfo/update", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ mfo_id, col_name, value }),
            });
            const json = await response.json();
            if(json) alert('Data was succesfully updated!');
          };
        
        //   const submitForReview = async () => {
        //     if (confirm("Are you sure you want to submit BEDs123 for review?") == true) {
        //       const response = await fetch("/api/logs/add", {
        //         method: "POST",
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ actions: "Submitted BEDs123 for Review", user_id: currentId }),
        //       });
        //       const json = await response.json();
        //       const response2 = await fetch("/api/profile/updatestatus", {
        //         method: "POST",
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ col_name: "status", value: 1, user_id: currentId }),
        //       });
        //       if(json) alert('Data was succesfully updated!');
        //     } else {
        //       alert("You pressed canceled!");
        //     }
        //   }
        
        //   const getRows = () => {
        //               const name_office = "Sample Office"
        //               return [
        //               {cells: [{ styleId: 'headappend',data: {value: "DEPARTMENT OF AGRICULTURE",type: ExcelDataType.String},},],},
        //               {cells: [{ styleId: 'headappend',data: {value: "Regional Field Office XIII",type: ExcelDataType.String},},],},
        //               {cells: [{ styleId: 'headappend',data: {value: name_office, type: ExcelDataType.String},},],},
        //               {cells: [{ styleId: 'headappend',data: {value: "C.Y. 2025 CURRENT APPROPRIATION",type: ExcelDataType.String},},],},
        //               {cells: [{ styleId: 'headappend',data: {value: 'PMIS v7.0 Generated as of ' + new Date().toDateString(),type: ExcelDataType.String},},],},
        //               {cells: [] },
        //             ]};
        
        //   const getParams = () => ({
        //     prependContent: getRows(),
        //     processCellCallback(params: { column?: any; value?: any; node?: any; }){
        //     const { node } = params;
        //       if (params.column.colDef.field == 'name') {
        //         if (node.group) {
        //           return node.key;
        //         } else {
        //           return params.value;
        //         }
        //       } else if (params.column.colDef.field == 'fu' && isNaN(params.value))
        //         return '';
                
        //       else return params.value;
        //   },
        //   fileName: "BEDs123.xlsx",
        //   });
        
         // eslint-disable-line react-hooks/exhaustive-deps
        //   const exportExcel = useCallback(() => {
        //     if (gridRef.current) {
        //       gridRef.current.api.exportDataAsExcel(getParams());
        //     }
        //   }, [getParams]); 

          const getRowId = (params: { data: { mfo_id: any; }; }) => params.data.mfo_id.toString();
          const rowSelection = useMemo<RowSelectionOptions | "single" | "multiple" >(() => {
              return {
                mode: "singleRow",
                checkboxes: false,
                enableClickSelection: true,
              };
            }, []);
  
  return (
    <div style={{ height: 700, width: '100%' }}>
        BEDS 123
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
             // onCellValueChanged={onCellValueChanged}
              autoGroupColumnDef={autoGroupColumnDef}

              showOpenedGroup={true}
             suppressGroupRowsSticky={true}
             groupHideParentOfSingleChild ={true} 
    />
</div>

  )
}

export default page