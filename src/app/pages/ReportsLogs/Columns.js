const packageWiseColumns = [
  { field: 'customerId', title: 'CustomerId' },
  { field: 'macs', title: 'Macs' },
  {
    field: 'updatedAt',
    title: 'UpdatedAt',
  },
  { field: 'packageId', title: 'PackageId' },
  { field: 'packageName', title: 'PackageName' },
  { field: 'startDate', title: 'StartDate' },
  { field: 'endDate', title: 'EndDate' },
  { field: 'status', title: 'Status' },
];
const subscriberColumns = [
  { field: 'customerId', title: 'CustomerId' },
  { field: 'macs', title: 'Macs' },
  {
    field: 'updatedAt',
    title: 'UpdatedAt',
  },
  { field: 'status', title: 'Status' },
];

const blacklistColumns = [
  { field: 'customerId', title: 'CustomerId' },
  { field: 'macs', title: 'Macs' },
  {
    field: 'updateAt',
    title: 'UpdatedAt',
  },
  { field: 'status', title: 'Status' },
];

const packageCompositionColumns = [
  { field: 'package_id', title: 'PackageId' },
  { field: 'package_name', title: 'Package Name' },
  {
    field: 'channel_id',
    title: 'ChannelId',
  },
  { field: 'channel_name', title: 'Channel Name' },
  { field: 'active_count', title: 'Active Count' },
  { field: 'inactive_count', title: 'Inactive Count' },
];

const packageLogsColumns = [
  { field: 'package_id', title: 'PackageId' },
  { field: 'channel_id', title: 'ChannelId' },
  {
    field: 'package_name',
    title: 'Package Name',
  },
  { field: 'channel_name', title: 'Channel Name' },
  { field: 'activity', title: 'Activity' },
  { field: 'operation_time', title: 'Operation Time' },
];

const allLogsColumns = [
  { field: 'customerId', title: 'CustomerId' },
  { field: 'macs', title: 'Macs' },
  {
    field: 'updateAt',
    title: 'UpdatedAt',
  },
  { field: 'activity', title: 'Activity' },
];

const fingerprintLogColumns = [
  { field: 'channel_id', title: 'ChannelId' },
  { field: 'user_type', title: 'User Type' },
  {
    field: 'fingerprint_type',
    title: 'Fingerprint Type',
  },
  { field: 'udid', title: 'Udid' },
  { field: 'customer_id', title: 'CustomerId' },
  { field: 'activity_time', title: 'Activity Time' },
  { field: 'package_id', title: 'PackageId' },
  { field: 'packages_name', title: 'Package Name' },
];

const packageActivationDeactivationLogColumns = [
  { field: 'customerId', title: 'CustomerId' },
  { field: 'macs', title: 'Macs' },
  {
    field: 'updatedAt',
    title: 'UpdatedAt',
  },
  { field: 'packageId', title: 'PackageId' },
  { field: 'packageName', title: 'PackageName' },
  { field: 'startDate', title: 'StartDate' },
  { field: 'endDate', title: 'EndDate' },
  { field: 'status', title: 'Status' },
];

export {
  packageWiseColumns,
  subscriberColumns,
  blacklistColumns,
  packageCompositionColumns,
  packageLogsColumns,
  allLogsColumns,
  fingerprintLogColumns,
  packageActivationDeactivationLogColumns,
};
