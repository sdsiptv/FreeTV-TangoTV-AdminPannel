import {
  Container,
  CssBaseline,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  Tooltip,
  IconButton
} from '@material-ui/core';
import apis from 'app/api';
import SmsMaterialTables from 'app/components/SmsMaterialTable';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import useStyles from './styles';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

export default function UserPackageDetails() {
  const classes = useStyles();
  const Role = localStorage.getItem("roles")
  let history = useHistory();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);


  const [activation, setActivation] = useState([]);

  const getUserPackages = () => {
    apis.getUserPackage().then(res => {
      setActivation(res?.data);
    });
  };

  useEffect(() => {
    getUserPackages();
  }, []);

  const columns = [
    { field: 'customerId', title: 'Customer Id' },
    { field: 'customerName', title: 'Customer Number' },
    // { field: 'period', title: 'Period' },
    {
      field: 'startDate',
      title: 'Start Date',
      render: rowData => moment(rowData.startDate).format('YYYY-MM-DD HH:mm'),
    },
    {
      field: 'endDate',
      title: 'End Date',
      render: rowData => moment(rowData.endDate).format('YYYY-MM-DD HH:mm'),
    },
    {
      field: 'updatedAt',
      title: 'Updated At',
      render: rowData => moment(rowData.endDate).format('YYYY-MM-DD HH:mm'),
    },
    {
      field: 'actions',
      title: 'View Vendor',
      sorting: false,
      render: rowData => (
        <Tooltip title="View">
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleViewVendor(rowData)}
          >
            <RemoveRedEyeIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const handleViewVendor = (vendorData) => {
    setSelectedVendor(vendorData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const deleteHandler = data => {
  //   let filter = data.map(obj => obj.code);
  //   if (filter.length > 0) {
  //     apis.deleteUserPackage(JSON.stringify(filter)).then(res => {
  //       toast('Successfully deleted', {
  //         position: 'top-right',
  //         autoClose: 2000,
  //       });
  //       getUserPackages();
  //     });
  //   }
  // };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <SmsMaterialTables
              title={'Subscriber Package Details'}
              columns={columns}
              data={activation}
            // deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ fontSize: "20px", color: "#E74C3C", textAlign: "center" }}>SUBSCRIBER PACKAGE DETAILS</DialogTitle>
        <DialogContent>
          {selectedVendor && (
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Customer Number:</Typography></TableCell>
                    <TableCell style={{ fontSize: "18px" }}>{selectedVendor.customerName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Customer ID:</Typography></TableCell>
                    <TableCell style={{ fontSize: "18px" }}>{selectedVendor.customerId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Activation Code:</Typography></TableCell>
                    <TableCell style={{ fontSize: "18px" }}>{selectedVendor.code}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Package ID:</Typography></TableCell>
                    <TableCell style={{ fontSize: "18px" }}>{selectedVendor.package_id}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Owner Name:</Typography></TableCell>
                    <TableCell style={{ fontSize: "18px" }}>{selectedVendor.ownerName}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
