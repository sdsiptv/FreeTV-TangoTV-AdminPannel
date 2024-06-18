import MaterialTable from '@material-table/core';
import React from 'react';
function MaterialTables({ title, columns, data, deleteHandler }) {
  return (
    <div style={{ flex: 1 }}>
      <MaterialTable
        title={title}
        options={{
          sorting: true,
          search: true,
          selection: false,
          pageSize: 50,
          pageSizeOptions: [50, 100, 500, 1000],
          headerStyle: {
            fontWeight: 'bold',
          },
        }}
        columns={columns}
        data={data}
        style={{ padding: '0px 10px' }}
      />
    </div>
  );
}

export default MaterialTables;
