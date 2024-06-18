import {
  Grid,
  Container,
  CssBaseline,
  IconButton,
  Tooltip,
  Modal,
} from '@material-ui/core';
import MaterialTable from '@material-table/core';
import SelectedTable from 'app/components/MaterialTables/SelectedTables';
import React, { useEffect, useState } from 'react';
import apis from 'app/api';
import VisibilityIcon from '@material-ui/icons/Visibility';
import useStyles from './styles';

function ChannelViews() {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [channelViews, setChannelViews] = useState([]);
  const [detailedChannelViews, setDetailedChannelViews] = useState([]);

  const columns = [
    { field: 'user_id', title: 'User Id' },
    { field: 'name', title: 'Name' },
    { field: 'total_duration', title: 'Total Duration' },
    {
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <Tooltip title="View">
          <IconButton
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              setSelectedRow(rowData);
              getChannelDetailedViews(rowData?.user_id);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  const selectedColumns = [
    { field: 'name', title: 'Channel Name' },
    { field: 'channel_id', title: 'Channel Id' },
    { field: 'duration', title: 'Duration' },
  ];

  const getChannelView = () => {
    apis.getChannelViews().then(res => {
      setChannelViews(res?.data);
    });
  };

  const getChannelDetailedViews = id => {
    apis.getDetailedChannelViews(id).then(res => {
      setDetailedChannelViews(res?.data);
      setOpenModal(true);
    });
  };

  useEffect(() => {
    getChannelView();
  }, []);

  return (
    <Container>
      <CssBaseline />
      <div>
        <Modal
          className={classes.modal}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <Grid className={classes.modalDiv} container>
            <SelectedTable
              title={
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {selectedRow?.user_id} - {selectedRow?.name}
                </div>
              }
              columns={selectedColumns}
              data={detailedChannelViews}
            />
          </Grid>
        </Modal>
      </div>

      <Grid item xs={12}>
        <MaterialTable
          title={'Channel Views'}
          columns={columns}
          data={channelViews}
          options={{
            sorting: true,
            search: true,
            pageSize: 50,
            pageSizeOptions: [50, 100, 500, 1000],
            headerStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        ;
      </Grid>
    </Container>
  );
}

export default ChannelViews;
