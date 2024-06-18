import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  AccountBox,
  DesktopWindows,
  Group,
  HighlightOff,
  LiveTv,
  MusicVideo,
  PersonAddDisabled,
  Timelapse,
  Videocam,
} from '@material-ui/icons';
import apis from 'app/api';
import Layout from 'app/components/SmsLayout/SmsIndex';
import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BLUE, GREEN, ORANGE, YELLOW } from 'utils/constant/color';
import LineGraph from '../../components/Charts/Linechart/index';
// import useStyles from 'styles/globalStyles';
const data_month_wise = [
  { name: 'JAN', au: 4, du: 2 },
  { name: 'FEB', au: 6, du: 2 },
  { name: 'MAR', au: 1, du: 5 },
  { name: 'API', au: 10, du: 3 },
  { name: 'MAY', au: 7, du: 1 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function SmsUsers() {
  // const classes = useStyles();
  const [totalUser, setTotalUser] = useState(0);
  const [active_cus, setActive_cus] = useState(0);
  const [deac_cus, setDeac_cus] = useState(0);
  const [sus_cus, setSus_cus] = useState(0);
  const [black_cus, setBlack_cus] = useState(0);
  const [total_cha, setTotal_cha] = useState(0);
  const [vod, setVod] = useState(0);
  const [mod, setMod] = useState(0);
  const [sod, setSod] = useState(0);
  const data = [
    { name: 'Total Users', user: totalUser },
    { name: 'Active Users', user: active_cus },
    { name: 'Deactive Users', user: deac_cus },
    { name: 'Suspended Customer', user: sus_cus },
    { name: 'BlackListed Customer', user: black_cus },
  ];
  const data_pie = [
    { name: 'Total Channel', value: total_cha },
    { name: 'VOD', value: vod },
    { name: 'SOD', value: sod },
    { name: 'MOD', value: mod },
  ];
  const COLORS = [GREEN, BLUE, ORANGE, YELLOW];
  const handleGetData = () => {
    apis.getDashboard().then(res => {
      const kpis = res.data.kpi;
      kpis.forEach(function (kpi) {
        if (kpi.type === 'active_customers') {
          setActive_cus(kpi.count);
        } else if (kpi.type === 'total_customers') {
          setTotalUser(kpi.count);
        } else if (kpi.type === 'deactive_customers') {
          setDeac_cus(kpi.count);
        } else if (kpi.type === 'suspend_customers') {
          setSus_cus(kpi.count);
        } else if (kpi.type === 'blacklist_customers') {
          setBlack_cus(kpi.count);
        } else if (kpi.type === 'total_channels') {
          setTotal_cha(kpi.count);
        } else if (kpi.type === 'total_vod') {
          setVod(kpi.count);
        } else if (kpi.type === 'total_mod') {
          setMod(kpi.count);
        } else if (kpi.type === 'total_sod') {
          setSod(kpi.count);
        }
      });
    });
  };
  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <Layout>
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <div >
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Dashboard
              </Typography>
            </Grid> */}

         hiiii
          </Grid>
        </div>
      </Container>
    </Layout>
  );
}

export default SmsUsers;
