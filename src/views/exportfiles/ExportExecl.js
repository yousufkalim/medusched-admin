import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import api from 'api';

import { Button } from 'reactstrap';

// Component
const ExportExecl = ({ hospitals, myHeader }) => {
  const [loading, setLoading] = useState(false);
  // Exporting

  // File Type
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // Extension
  const fileExtension = '.xlsx';
  const exportToCSV = (csvData, fileName) => {
    // Setting cols width
    var wscols = [
      { wch: 40 },
      { wch: 40 },
      { wch: 40 },
      
      
    ];
    // Sorting

    const ws = XLSX.utils.json_to_sheet(
      csvData,
      { header: myHeader },
      {
        alignment: {
          vertical: 'center',
          horizontal: 'center',
          wrapText: '1', // any truthy value here
        },
      }
    );
    ws['!cols'] = wscols;

    const wb = { Sheets: { users: ws }, SheetNames: ['users'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const e_data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(e_data, fileName + fileExtension);
  };

  // exporting excel
  const handleSubmitExcel = async (hospitals) => {
    setLoading(true);
    // let res = await api('get', `/admin/users/getallusers`);
    let res = await api('get', `/admin/users/getalluserswithresult`);
    if(hospitals?.length>0){
        console.log("hospitals for csv",hospitals)
         const updatedHospitals = hospitals.map((hospital) => {
          return {
            Name: hospital.name,
            Email: hospital.email,
            Address: hospital.address,
          };
        });
        setLoading(false);
      console.log("hospital for export ", updatedHospitals);
      exportToCSV(updatedHospitals, 'Hospitals CSV');
    }
  };

  // Render
  return (
    <div className="d-flex justify-content-between ">
      <h3 className="mb-0"></h3>
      <Button
        color="primary"
        href="#pablo"
        onClick={(e) => {
          handleSubmitExcel(hospitals);
        }}
        size="md"
        disabled={loading}
      >
        {loading ? 'Loading..' : 'Export CSV'}
      </Button>
    </div>
  );
};

export default ExportExecl;
