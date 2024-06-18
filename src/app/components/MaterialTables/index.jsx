import React, { useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';
function MaterialTables({ title, columns, data, deleteHandler }) {

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const lastPage = Math.ceil(data.length / 1000) - 1;
    if (currentPage > lastPage) {
      setCurrentPage(lastPage);
    }
  }, [data]);

  return (
    <div>
      <MaterialTable
        // other props
        title={title}
        options={{
          sorting: true,
          search: true,
          selection: true,
          pageSize: 50,
          pageSizeOptions: [50, 100, 500, 1000],
          headerStyle: {
            fontWeight: 'bold',
          },
          page: currentPage,
        }}
        columns={columns}
        data={data}
        actions={[
          {
            tooltip: 'Delete All Selected Items',
            icon: 'delete',
            onClick: (evt, data) => {
              deleteHandler(data);
            },
          },
        ]}
        style={{ padding: '0px 10px' }}
        onChangePage={(page) => handlePageChange(page)} 
      />
    </div>
  );
}

export default MaterialTables;
