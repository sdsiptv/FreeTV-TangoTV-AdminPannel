import React from 'react';
import MaterialTable from '@material-table/core';
function SmsMaterialTables({ title, columns, data, deleteHandler }) {
    return (
        <div>
            <MaterialTable
                // other props
                title={title}
                options={{
                    sorting: true,
                    search: true,
                    //   selection: true,
                    pageSize: 50,
                    pageSizeOptions: [50, 100, 500],
                    headerStyle: {
                        fontWeight: 'bold',
                    },
                }}
                columns={columns}
                data={data}
                actions={[
                    //   {
                    //     tooltip: 'Delete All Selected Items',
                    //     icon: 'delete',
                    //     onClick: (evt, data) => {
                    //       deleteHandler(data);
                    //     },
                    //   },
                ]}
                style={{ padding: '0px 10px' }}
            />
        </div>
    );
}

export default SmsMaterialTables;
