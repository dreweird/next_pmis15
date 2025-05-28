"use client";

import SelectOffice from "@/app/components/SelectOffice";
import SelectProvince from "@/app/components/SelectProvince";
import SelectDistrict from "@/app/components/SelectDistrict";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as custom from "../../utils/valueGetters";
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  ExcelExportModule,
  ModuleRegistry,
  PivotModule,
  RowGroupingModule,
  RowSelectionModule,
  themeBalham,
  TreeDataModule,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import ExportButton from "@/app/components/ExportButton";
ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  RowGroupingModule,
  PivotModule,
  TreeDataModule,
  ExcelExportModule,
  RowSelectionModule,
]);

const district = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueProv, setSelectedValueProv] = useState("");
  const [selectedValueDist, setSelectedValueDist] = useState("");
  const [rowData, setRowData] = useState<any[]>([]);

  const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API

  const handleSelect = (value: any) => {
    setSelectedValue(value);
  };

  const handleSelect2 = (value: any) => {
    setSelectedValueProv(value);
  };

  const handleSelect3 = (value: any) => {
    setSelectedValueDist(value);
  };

  const hancleClick = () => {
    fetch(
      `/api/byDistrict/${selectedValue}/${selectedValueProv}/${selectedValueDist}`
    ) // Fetch data from server
      .then((result) => result.json()) // Convert to JSON
      .then((rowData) => {
        console.log(rowData.result);
        setRowData(rowData.result);
      }); // Update state of `rowData`
  };

  const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([
    { field: "h1", rowGroup: true, hide: true },
    { field: "h2", rowGroup: true, hide: true },
    // { field: 'h3',  rowGroup: true, hide: true},
    { field: "h4", rowGroup: true, hide: true },

    {
      headerName: "Unit Measure",
      field: "unit",
      width: 100,
      cellClass: ["data"],
    },
    { headerName: "Budget", field: "cost", width: 100, cellClass: ["data"] },
    {
      headerName: "Physical Target",
      marryChildren: true,
      children: [
        {
          headerName: "Target",
          field: "target",
          minWidth: 50,
          editable: false,
          valueFormatter: custom.currencyFormatter,
          cellStyle: custom.customStyleGroupQuarter,
          aggFunc: "sum",
          cellClass: ["data", "t"],
        },
        {
          headerName: "Location",
          field: "municipal",
          minWidth: 50,
          editable: false,
          cellStyle: custom.customStyleGroupQuarter,
          cellClass: ["data"],
        },
      ],
    },
    {
      headerName: "Physical Accomplishment",
      marryChildren: true,
      children: [
        // {headerName: "Q1",  minWidth: 40, editable: false, valueFormatter: custom.currencyFormatter, valueGetter: p => p.data.jan + p.data.feb + p.data.mar, aggFunc: 'sum', colId: 'q1', cellClass: ['data']},
        // {headerName: "Q2",  minWidth: 40, editable: false, valueFormatter: custom.currencyFormatter, valueGetter: p => p.data.apr + p.data.may + p.data.jun, aggFunc: 'sum', colId: 'q2', cellClass: ['data']},
        // {headerName: "Q3",  minWidth: 40, editable: false, valueFormatter: custom.currencyFormatter, valueGetter: p => p.data.jul + p.data.aug + p.data.sep, aggFunc: 'sum', colId: 'q3', cellClass: ['data']},
        // {headerName: "Q4",  minWidth: 40, editable: false, valueFormatter: custom.currencyFormatter, valueGetter: p => p.data.oct + p.data.nov + p.data.dece, aggFunc: 'sum', colId: 'q4', cellClass: ['data']},
        // {headerName: "TOTAL",  minWidth: 50, editable: false, valueFormatter: custom.currencyFormatter, aggFunc: 'sum', cellStyle: custom.customStyleGroupDisburse, valueGetter: p => p.getValue('q1') + p.getValue('q2') + p.getValue('q3') + p.getValue('q4'), colId: 'total', cellClass: ['data', 't']},
        {
          headerName: "Q1",
          field: "Q1",
          minWidth: 40,
          editable: false,
          valueFormatter: custom.currencyFormatter,
          colId: "Q1",
          cellClass: ["data"],
        },
        {
          headerName: "Q2",
          field: "Q2",
          minWidth: 40,
          editable: false,
          valueFormatter: custom.currencyFormatter,
          colId: "Q2",
          cellClass: ["data"],
        },
        {
          headerName: "Q3",
          field: "Q3",
          minWidth: 40,
          editable: false,
          valueFormatter: custom.currencyFormatter,
          colId: "Q3",
          cellClass: ["data"],
        },
        {
          headerName: "Q4",
          field: "Q4",
          minWidth: 40,
          editable: false,
          valueFormatter: custom.currencyFormatter,
          colId: "Q4",
          cellClass: ["data"],
        },
        {
          headerName: "TOTAL",
          field: "TOTAL",
          minWidth: 40,
          editable: false,
          valueFormatter: custom.currencyFormatter,
          colId: "TOTAL",
          cellClass: ["data"],
        },
      ],
    },
  ]);
  const getRowClass = (params: { node: { group: any } }) => {
    if (params.node.group) {
      return "group-header";
    }
  };

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      enablePivot: true,
    };
  }, []);

  const autoGroupColumnDef: ColDef = useMemo(() => {
    return {
      headerName: "MFOs/PAPs",
      pinned: "left",
      width: 350,
      resizable: true,
      field: "name",
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: custom.SimpleCellRenderer,
        //checkbox: false,
      },
      cellClass: ["data"],
      cellClassRules: { bold: (params) => (params.node.group ? true : false) },
    };
  }, []);

  return (
    <div>
      <div className="flex items-stretch ...">
        <SelectOffice onSelect={handleSelect} />
        <SelectProvince onSelect={handleSelect2} />
        <SelectDistrict onSelect={handleSelect3} />
        <button
          onClick={hancleClick}
          className="bg-blue-700 shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        >
          Generate Report
        </button>
      </div>
      <div style={{ height: 700, width: "100%" }}>
        <ExportButton gridRef={gridRef} fileName="ByDistrict.xlsx" />
        <AgGridReact
          theme={themeBalham}
          ref={gridRef} // Ref for accessing Grid's API
          //  getRowId={getRowId}
          rowData={rowData} // Row Data for Rows
          columnDefs={colDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          groupDefaultExpanded={-1}
          // columnTypes={columnTypes}
          suppressAggFuncInHeader={true}
          //rowSelection={rowSelection}
          getRowClass={getRowClass}
          autoGroupColumnDef={autoGroupColumnDef}
          showOpenedGroup={true}
          suppressGroupRowsSticky={true}
          // groupHideParentOfSingleChild ={true}
          excelStyles={custom.excelStyles}
        />
      </div>
    </div>
  );
};

export default district;
