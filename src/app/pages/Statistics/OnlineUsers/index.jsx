import { Container, CssBaseline, Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import apis from 'app/api';

export default function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    getOnlineUser();

    const socket = io('http://localhost:3005', {
      pingTimeout: 180000,
      pingInterval: 25000,
      transports: ['websocket'],
    });

    socket.on('admin-user-joined', function ({ userId, username, socketId }) {
      setOnlineUsers(prevUsers => [
        ...prevUsers,
        { userId, username, socketId },
      ]);
    });

    socket.on('admin-user-left', ({ socketId }) => {
      setOnlineUsers(prevUsers =>
        prevUsers.filter(user => user.socketId !== socketId),
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const columns = [
    { field: 'userId', title: 'User Id' },
    { field: 'name', title: 'Name' },
    { field: 'username', title: 'Username' },
    { field: 'status', title: 'Status' },
  ];

  const getOnlineUser = () => {
    apis.getOnlineUser().then(res => {
      setOnlineUsers(res?.data);
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ paddingTop: '20px' }}>
          <MaterialTable
            title={'Online Users'}
            options={{
              sorting: true,
              search: true,
              pageSize: 10,
              pageSizeOptions: [10, 20, 30],
              headerStyle: {
                fontWeight: 'bold',
              },
            }}
            columns={columns}
            data={onlineUsers.map(user => ({
              name: user.name,
              username: user.username,
              userId: user.userId,
              status: 'Online',
            }))}
            style={{ padding: '10px 10px' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
