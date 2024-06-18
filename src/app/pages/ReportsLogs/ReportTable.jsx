import MaterialTable from 'material-table';
import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { utils, writeFile } from 'xlsx';
// import * as XLSX from 'xlsx/xlsx.mjs';
// import * as fs from 'fs';
// XLSX.set_fs(fs);
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ReportTable() {
  const location = useLocation();
  const [columns, setColumns] = useState();
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [rowData, setRowData] = useState([]);
  const [columnHeading, setColumnHeading] = useState([]);
  const [colTitleCsv, setColTitleCsv] = useState([[]]);
  const [dates, setDates] = useState();
  useEffect(() => {
    setColumns(location.state.state.columns);
    setData(location.state.state.data);
    setTitle(location.state.state.title);
    setDates(location.state.state.date);
  }, []);

  const sample = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const handleExport = () => {
    var ExportTableBody = [];
    let i;
    for (i = 1; i < rowData.length; i++) {
      ExportTableBody.push(rowData[i]);
    }

    var docDefinition = {
      pageMargins: [50, 100, 50, 30],
      header: function (currentPage, pageCount, pageSize) {
        return {
          columns: [
            {
              image: 'strawberries',
              width: 50,
              margin: [50, 15, 0, 0],
            },
            [
              {
                text: 'SDS IPTV',
                bold: true,
                alignment: 'center',
                fontSize: 16,
                margin: [0, 10, 0, 0],
              },
              { text: 'Address Line 1,', alignment: 'center' },
              { text: 'Address Line 2.', alignment: 'center' },
            ],

            // { text: currentPage },
          ],
        };
      },

      footer: function (currentPage, pageCount) {
        return {
          columns: [
            {
              text:
                'Generated on: ' + moment(Date()).format('YYYY-MM-DD HH:MM'),
              margin: [10, 0, 0, 0],
            },
            {
              text: 'Page No.' + currentPage,
              alignment: 'right',
              margin: [0, 0, 10, 0],
            },
            // { style: 'tableExample' },
          ],
        };
      },

      content: [
        { text: 'Package Wise Active Status Report', bold: true },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [rowData[0], ExportTableBody[0]],
          },
        },
      ],
      images: {
        strawberries: {
          url: 'https://picsum.photos/id/1080/367/267',
          width: 50,
          height: 50,
        },
      },
      styles: {
        tableExample: {
          margin: [0, 5, 5, 15],
          fontSize: 7,
        },
      },
    };
    pdfMake.createPdf(docDefinition).open();
  };

  const handleExcelTest = () => {
    const fileName = 'testing.xlsx';

    var ws = utils.json_to_sheet([[]], { header: ['COMPANY'] });

    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push(utils.decode_range('A1:H2'));

    utils.sheet_add_json(ws, data, { origin: 'A4' });
    let wb = utils.book_new();
    utils.book_append_sheet(wb, ws, fileName);

    writeFile(wb, fileName, { bookType: 'xlsx' });
  };

  return (
    <div>
      <MaterialTable
        // other props
        title={title}
        options={{
          sorting: true,
          search: true,
          // exportAllData: true,
          exportButton: {
            csv: true,
            pdf: true,
          },
          exportPdf: (columns, data) => {
            setColumnHeading(columns.map(ele => ele.title));

            const handleAsync = async () => {
              // await apis.getPackagesWiseActiveExport(dates).then(response => {
              //   setRowData(response.data);
              // });
            };
            handleAsync();
            handleExport();
          },
          exportCsv: (columns, data) => {
            setColTitleCsv(columns.map(ele => ele.title));
            handleExcelTest();
          },
        }}
        columns={columns}
        data={data}
        style={{ padding: '0px 10px' }}
      />
    </div>
  );
}

export default ReportTable;
