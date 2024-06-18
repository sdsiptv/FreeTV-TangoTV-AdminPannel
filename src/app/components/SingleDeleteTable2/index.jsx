import React, { useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Delete } from '@material-ui/icons';

function SingleMaterialTables({ title, columns, data, deleteHandler }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const lastPage = Math.ceil(data.length / 1000) - 1;
    if (currentPage > lastPage) {
      setCurrentPage(lastPage);
    }
  }, [data, currentPage]);

  return (
    <div>
      <MaterialTable
        title={title}
        options={{
          sorting: true,
          search: true,
          pageSize: 50,
          pageSizeOptions: [50, 100, 500, 1000],
          headerStyle: {
            fontWeight: 'bold',
          },
          page: currentPage,
        }}
        columns={[
          ...columns,
          {
            title: 'Actions',
            field: 'actions',
            render: (rowData) => (
              <Tooltip title="Delete">
                <IconButton
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    deleteHandler([rowData]);
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            ),
          },
        ]}
        data={data}
        style={{ padding: '0px 10px' }}
        onChangePage={(page) => handlePageChange(page)}
      />
    </div>
  );
}

export default SingleMaterialTables;
