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


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule, PivotModule, TreeDataModule, ExcelExportModule, RowSelectionModule]);

LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d");


interface ResultComponentProps {
  selectedValue: string;
}

const Bed1Component: React.FC<ResultComponentProps> = ({ selectedValue }) => {

    const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState<any[]>([]);
    const { data: session } = useSession()
    const type: number = Number(session?.user?.email); // Only Budget Account can update the budget accomplishment

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
          {headerName: "BED 1 - Obligation Target",  marryChildren: true,
              children: [
                {
                  headerName: 'Jan', columnGroupShow: 'open',
                  children: [
                    {headerName: "MOOE", field: "jan_ot", columnGroupShow: "open", type: 'valueColumn'},
                    {headerName: "CO", field: "jan_otc", columnGroupShow: "open", type: 'valueColumn'},
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
                    { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft', valueGetter: custom.total_q1_mooe_ft},
                    { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1ft_co', valueGetter: custom.total_q1_co_ft},
                    { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 't'], colId: 'q1_tot', valueGetter: custom.total_q1}
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
                    { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2ft', valueGetter: custom.total_q2_mooe_ft},
                    { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2ft_co', valueGetter: custom.total_q2_co_ft},
                    { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 't'], colId: 'q2_tot', valueGetter: custom.total_q2}
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
                    { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3ft', valueGetter: custom.total_q3_mooe_ft},
                    { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3ft_co', valueGetter: custom.total_q3_co_ft},
                    { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 't'], colId: 'q3_tot', valueGetter: custom.total_q3}
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
                    { headerName: 'MOOE', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4ft', valueGetter: custom.total_q4_mooe_ft},
                    { headerName: 'CO', type: 'quarterColumn2', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4ft_co', valueGetter: custom.total_q4_co_ft},
                    { headerName: 'TOTAL', type: 'quarterColumn2', cellClass: ['data', 't'], colId: 'q4_tot', valueGetter: custom.total_q4}
                  ]
                },
                {
                  headerName: 'Grand Total',
                  children: [
                    { headerName: 'MOOE', type: 'numericColumn', width: 110,aggFunc: custom.GrandTotalAggFunc, valueFormatter: custom.currencyFormatter, columnGroupShow: 'open', cellClass: ['data'], colId: 'total_ft', valueGetter: custom.total_mooe_ft},
                    { headerName: 'CO', type: 'numericColumn', width: 110,aggFunc: custom.GrandTotalAggFunc, valueFormatter: custom.currencyFormatter, columnGroupShow: 'open', cellClass: ['data'], colId: 'total_ft_co', valueGetter: custom.total_co_ft},
                    { headerName: 'TOTAL', type: 'numericColumn', cellClass: ['data', 'total'], colId: 'grandtotal_ft', valueGetter: custom.grandtotal_ft,
                    cellStyle: params => {
                      if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal' }}
                    },width: 110,aggFunc: custom.TotalYearAggFunc,valueFormatter: custom.currencyFormatter}
                  ]
                }
      
              ]
          },
          {headerName: "BED 1 - Obligation Accomplishment",  marryChildren: true,
            children: [
              {
                headerName: 'Jan', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "jana_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'], editable: () => type === 7},
                  {headerName: "CO", field: "jana_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type === 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_janfa, colId: 'jan_tota'}
                ]
              },
              {
                headerName: 'Feb', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "feba_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type === 7},
                  {headerName: "CO", field: "feba_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type === 7},
                  { headerName: 'TOTAL', type: 'totalColumn',  cellClass: ['data', 'a'], valueGetter: custom.total_febfa, colId: 'feb_tota'}
                ]
              },
              {
                headerName: 'Mar', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "mara_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type === 7},
                  {headerName: "CO", field: "mara_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type === 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_marfa, colId: 'mar_tota'}
                ]
              },
              {
                headerName: 'Q1',
                children: [
                  { headerName: 'MOOE', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1fa', valueGetter: custom.total_q1_mooe_fa},
                  { headerName: 'CO', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q1fa_co', valueGetter: custom.total_q1_co_fa},
                  { headerName: 'TOTAL', type: 'quarterColumn', cellClass: ['data', 'a'], colId: 'q1_tota', valueGetter: custom.total_fa_q1}
                ]
              },
              {
                headerName: 'Apr', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "apra_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  {headerName: "CO", field: "apra_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_aprfa, colId: 'apr_tota'}
                ]
              },
              {
                headerName: 'May', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "maya_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  {headerName: "CO", field: "maya_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_mayfa, colId: 'may_tota'}
                ]
              },
              {
                headerName: 'Jun', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "juna_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  {headerName: "CO", field: "juna_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_junfa, colId: 'jun_tota'}
                ]
              },
              {
                headerName: 'Q2',
                children: [
                  { headerName: 'MOOE', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2fa', valueGetter: custom.total_q2_mooe_fa},
                  { headerName: 'CO', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q2fa_co', valueGetter: custom.total_q2_co_fa},
                  { headerName: 'TOTAL', type: 'quarterColumn', cellClass: ['data', 'a'], colId: 'q2_tota', valueGetter: custom.total_fa_q2}
                ]
              },
              {
                headerName: 'Jul', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "jula_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  {headerName: "CO", field: "jula_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_julfa, colId: 'jul_tota'}
                ]
              },
              {
                headerName: 'Aug', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "auga_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  {headerName: "CO", field: "auga_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_augfa, colId: 'aug_tota'}
                ]
              },
              {
                headerName: 'Sep', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "sepa_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  {headerName: "CO", field: "sepa_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_sepfa, colId: 'sep_tota'}
                ]
              },
              {
                headerName: 'Q3',
                children: [
                  { headerName: 'MOOE', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3fa', valueGetter: custom.total_q3_mooe_fa},
                  { headerName: 'CO', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q3fa_co', valueGetter: custom.total_q3_co_fa},
                  { headerName: 'TOTAL', type: 'quarterColumn', cellClass: ['data', 'a'], colId: 'q3_tota', valueGetter: custom.total_fa_q3}
                ]
              },
              {
                headerName: 'Oct', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "octa_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  {headerName: "CO", field: "octa_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_octfa, colId: 'oct_tota'}
                ]
              },
              {
                headerName: 'Nov', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "nova_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  {headerName: "CO", field: "nova_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_novfa, colId: 'nov_tota'}
                ]
              },
              {
                headerName: 'Dec', columnGroupShow: 'open',
                children: [
                  {headerName: "MOOE", field: "deca_ot", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  {headerName: "CO", field: "deca_otc", columnGroupShow: "open", type: 'valueColumn',  cellClass: ['data'],  editable: () => type == 7},
                  { headerName: 'TOTAL', type: 'totalColumn', cellClass: ['data', 'a'], valueGetter: custom.total_decfa, colId: 'dec_tota'}
                ]
              },
              {
                headerName: 'Q4',
                children: [
                  { headerName: 'MOOE', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4fa', valueGetter: custom.total_q4_mooe_fa},
                  { headerName: 'CO', type: 'quarterColumn', columnGroupShow: 'open', cellClass: ['data'], colId: 'q4fa_co', valueGetter: custom.total_q4_co_fa},
                  { headerName: 'TOTAL', type: 'quarterColumn', cellClass: ['data', 'a'], colId: 'q4_tota', valueGetter: custom.total_fa_q4}
                ]
              },
              {
                headerName: 'Grand Total',
                children: [
                  { headerName: 'MOOE', width: 110,aggFunc: custom.GrandTotalAggFunc, valueFormatter: custom.currencyFormatter, columnGroupShow: 'open', cellClass: ['data'], colId: 'total_fa', valueGetter: custom.total_mooe_fa},
                  { headerName: 'CO', width: 110,aggFunc: custom.GrandTotalAggFunc, valueFormatter: custom.currencyFormatter, columnGroupShow: 'open', cellClass: ['data'], colId: 'total_fa_co', valueGetter: custom.total_co_fa},
                  { headerName: 'TOTAL', type: 'numericColumn', cellClass: ['data', 'total'], colId: 'grandtotal_fa', valueGetter: custom.grandtotal_fa,
                  cellStyle: params => {
                    if(params.node.group) { return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#81f7a6', 'fontWeight': 'normal' }}
                  },width: 110,aggFunc: custom.TotalYearAggFunc,valueFormatter: custom.currencyFormatter}
                ]
              },
              {
                headerName: 'Unobligated',
                colId: 'un',
                width: 130,
                cellStyle: params => {
                  if(params.node.group) { return { color: 'black', 'backgroundColor': '#f7adad', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#f7adad', 'fontWeight': 'normal' }}
                },
                aggFunc: custom.TotalUnobligatedAggFunc,
                valueGetter: custom.unobligated,
                valueFormatter: custom.currencyFormatter,
                type: 'numericColumn',
                cellRenderer: 'agAnimateShowChangeCellRenderer',
                cellClass: ['data', 'v']
              },
              {
                headerName: 'Percentage',
                colId: 'fu',
                width: 130,
                cellStyle: params => {
                  if(params.node.group) { return { color: 'black', 'backgroundColor': '#dfa9f5', 'fontWeight': 'bold' }}else{return { color: 'black', 'backgroundColor': '#dfa9f5', 'fontWeight': 'normal' }}
                },
                aggFunc: custom.TotalpercentAggFunc,
                valueGetter: custom.percentage,
                valueFormatter: custom.currencyFormatter,
                type: 'numericColumn',
                cellRenderer: 'agAnimateShowChangeCellRenderer',
                cellClass: ['data', 'p']
              },
      
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

  return (
      <div style={{ height: 700, width: '100%' }}>
        <ExportButton gridRef={gridRef} fileName="BED1.xlsx"/>
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