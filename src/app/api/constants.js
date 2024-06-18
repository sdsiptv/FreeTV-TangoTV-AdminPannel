// const { BASE_URL } = process.env;

// const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'http://192.168.1.6:3001';
// const BASE_URL = 'https://freetv.tangotv.in/apis';
// const BASE_URL = 'https://103.50.148.2/apis';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '55d0d2f057c00a9ba62a3403d8a2aa22';

const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/admin/login`,

  GET_DASHBOARD: `${BASE_URL}/admin/dashboard/all`,

  GET_GENERAL_SETTINGS: `${BASE_URL}/admin/generalsettings`,
  EDIT_GENERAL_SETTINGS: `${BASE_URL}/admin/generalsettings`,
  GET_SYTEM_INFO: `${BASE_URL}/admin/generalsettings/info`,
  POST_TERMS_AND_CONDITIONS: `${BASE_URL}/admin/termsandconditions`,
  GET_TERMS_AND_CONDITIONS: `${BASE_URL}/admin/termsandconditions`,

  ADD_ADMIN_USER: `${BASE_URL}/admin/adminusers`,
  GET_ADMIN_USER: `${BASE_URL}/admin/adminusers`,
  GET_ADMIN: `${BASE_URL}/admin/adminusers/profile`,
  EDIT_ADMIN_USER: `${BASE_URL}/admin/adminusers`,
  DELETE_ADMIN_USER: `${BASE_URL}/admin/adminusers`,

  ADD_CHANNEL_CATEGORY: `${BASE_URL}/admin/channelcat`,
  GET_CHANNEL_CATEGORY: `${BASE_URL}/admin/channelcat`,
  EDIT_CHANNEL_CATEGORY: `${BASE_URL}/admin/channelcat`,
  DELETE_CHANNEL_CATEGORY: `${BASE_URL}/admin/channelcat`,

  ADD_CHANNEL_STREAM: `${BASE_URL}/admin/channels`,
  GET_CHANNEL_STREAM: `${BASE_URL}/admin/channels`,
  EDIT_CHANNEL_STREAM: `${BASE_URL}/admin/channels/`,
  DELETE_CHANNEL_STREAM: `${BASE_URL}/admin/channels`,

  ADD_CHANNEL_PACKAGE: `${BASE_URL}/admin/channelpackages`,
  GET_CHANNEL_PACKAGE: `${BASE_URL}/admin/channelpackages`,
  GET_CHANNEL_PACKAGE_Details: `${BASE_URL}/admin/channelpackages/`,
  EDIT_CHANNEL_PACKAGE: `${BASE_URL}/admin/channelpackages`,
  DELETE_CHANNEL_PACKAGE: `${BASE_URL}/admin/channelpackages`,

  POST_SOURCEIP: `${BASE_URL}/admin/sourceip`,
  GET_SOURCEIP: `${BASE_URL}/admin/sourceip`,
  PUT_SOURCEIP: `${BASE_URL}/admin/sourceip`,
  DELETE_SOURCEIP: `${BASE_URL}/admin/sourceip`,

  GET_ACCESS_LOG: `${BASE_URL}/admin/customeraccesslogs`,

  GET_SDSSTREAMER_CHANNEL_STATUS: `${BASE_URL}/admin/sdsstreamer/channels`,

  GET_VIEW_SYSTEM_UPTIME: `${BASE_URL}/admin/sdsstreamer/systemuptime`,

  GET_CPU: `${BASE_URL}/admin/cpu`,

  GET_CHANNEL_REFRESH: `${BASE_URL}/admin/sdsstreamer/refreshchannels`,

  GET_CHANNEL_RESTART: `${BASE_URL}/admin/sdsstreamer/restart`,

  GET_SERVER_LOGS: `${BASE_URL}/admin/serverlogs`,

  POST_SDSSTREAMER_CHANNEL: `${BASE_URL}/admin/sdsstreamer`,
  GET_SDSSTREAMER_CHANNEL: `${BASE_URL}/admin/sdsstreamer`,
  PUT_SDSSTREAMER_CHANNEL: `${BASE_URL}/admin/sdsstreamer`,
  DELETE_SDSSTREAMER_CHANNEL: `${BASE_URL}/admin/sdsstreamer`,

  ADD_MOD_CATEGORY: `${BASE_URL}/admin/modcat`,
  GET_MOD_CATEGORY: `${BASE_URL}/admin/modcat`,
  EDIT_MOD_CATEGORY: `${BASE_URL}/admin/modcat`,
  DELETE_MOD_CATEGORY: `${BASE_URL}/admin/modcat`,

  ADD_MOD_MEDIA: `${BASE_URL}/admin/mod`,
  GET_MOD_MEDIA: `${BASE_URL}/admin/mod`,
  GET_MOD_SONGS: `${BASE_URL}/admin/mod/`,
  EDIT_MOD_MEDIA: `${BASE_URL}/admin/mod`,
  DELETE_MOD_MEDIA: `${BASE_URL}/admin/mod`,

  ADD_MOD_PACKAGE: `${BASE_URL}/admin/modpackages`,
  GET_MOD_PACKAGE: `${BASE_URL}/admin/modpackages`,
  GET_DETAILED_MOD_PACKAGE: `${BASE_URL}/admin/modpackages/`,
  EDIT_MOD_PACKAGE: `${BASE_URL}/admin/modpackages`,
  DELETE_MOD_PACKAGE: `${BASE_URL}/admin/modpackages`,

  ADD_OTT_CATEGORY: `${BASE_URL}/admin/ottcat`,
  GET_OTT_CATEGORY: `${BASE_URL}/admin/ottcat`,
  EDIT_OTT_CATEGORY: `${BASE_URL}/admin/ottcat`,
  DELETE_OTT_CATEGORY: `${BASE_URL}/admin/ottcat`,

  ADD_GET_OTTPROVIDER: `${BASE_URL}/admin/ottproviders`,
  ADD_POST_OTTPROVIDERS: `${BASE_URL}/admin/ottproviders`,
  EDIT_OTT_PROVIDERS: `${BASE_URL}/admin/ottproviders`,
  DELETE_OTT_PROVIDERS: `${BASE_URL}/admin/ottproviders`,

  ADD_OTT_CHANNELS: `${BASE_URL}/admin/ott`,
  GET_OTT_CHANNELS: `${BASE_URL}/admin/ott`,
  EDIT_OTT_CHANNELS: `${BASE_URL}/admin/ott`,
  DELETE_OTT_CHANNELS: `${BASE_URL}/admin/ott`,

  ADD_EDUCATION_CATEGORY: `${BASE_URL}/admin/educationalcat`,
  GET_EDUCATION_CATEGORY: `${BASE_URL}/admin/educationalcat`,
  EDIT_EDUCATION_CATEGORY: `${BASE_URL}/admin/educationalcat`,
  DELETE_EDUCATION_CATEGORY: `${BASE_URL}/admin/educationalcat`,

  GET_EDUCATION_PROVIDERS: `${BASE_URL}/admin/educationalproviders`,
  ADD_EDUCATION_PROVIDERS: `${BASE_URL}/admin/educationalproviders`,
  EDIT_EDUCATION_PROVIDERS: `${BASE_URL}/admin/educationalproviders`,
  DELETE_EDUCATION_PROVIDERS: `${BASE_URL}/admin/educationalproviders`,

  GET_EDUCATIONS: `${BASE_URL}/admin/educational`,
  ADD_EDUCATIONS: `${BASE_URL}/admin/educational`,
  EDIT_EDUCATIONS: `${BASE_URL}/admin/educational`,
  DELETE_EDUCATIONS: `${BASE_URL}/admin/educational`,

  GET_EDUCATION_EPISODE: `${BASE_URL}/admin/educational/`,

  GET_EDUCATION_BOARD: `${BASE_URL}/admin/educationalboard`,
  ADD_EDUCATION_BOARD: `${BASE_URL}/admin/educationalboard`,
  EDIT_EDUCATION_BOARD: `${BASE_URL}/admin/educationalboard`,
  DELETE_EDUCATION_BOARD: `${BASE_URL}/admin/educationalboard`,
  
  ADD_DEVOTIONAL_CATEGORY: `${BASE_URL}/admin/devotionalcat`,
  GET_DEVOTIONAL_CATEGORY: `${BASE_URL}/admin/devotionalcat`,
  EDIT_DEVOTIONAL_CATEGORY: `${BASE_URL}/admin/devotionalcat`,
  DELETE_DEVOTIONAL_CATEGORY: `${BASE_URL}/admin/devotionalcat`,

  GET_DEVOTIONAL_PROVIDERS: `${BASE_URL}/admin/devotionalproviders`,
  ADD_DEVOTIONAL_PROVIDERS: `${BASE_URL}/admin/devotionalproviders`,
  EDIT_DEVOTIONAL_PROVIDERS: `${BASE_URL}/admin/devotionalproviders`,
  DELETE_DEVOTIONAL_PROVIDERS: `${BASE_URL}/admin/devotionalproviders`,

  ADD_LOCATION: `${BASE_URL}/admin/location`,
  GET_LOCATION: `${BASE_URL}/admin/location`,
  EDIT_LOCATION: `${BASE_URL}/admin/location`,
  DELETE_LOCATION: `${BASE_URL}/admin/location`,

  ADD_RELIGIOUS: `${BASE_URL}/admin/religion`,
  GET_RELIGIOUS: `${BASE_URL}/admin/religion`,
  EDIT_RELIGIOUS: `${BASE_URL}/admin/religion`,
  DELETE_RELIGIOUS: `${BASE_URL}/admin/religion`,

  GET_DEVOTIONAL: `${BASE_URL}/admin/devotional`,
  ADD_DEVOTIONAL: `${BASE_URL}/admin/devotional`,
  EDIT_DEVOTIONAL: `${BASE_URL}/admin/devotional`,
  DELETE_DEVOTIONAL: `${BASE_URL}/admin/devotional`,
  
  GET_DEVOTIONAL_EPISODE: `${BASE_URL}/admin/devotional/`,

  GET_LANGUAGE: `${BASE_URL}/admin/language`,

  ADD_VOD_CATEGORY: `${BASE_URL}/admin/vodcat`,
  GET_VOD_CATEGORY: `${BASE_URL}/admin/vodcat`,
  EDIT_VOD_CATEGORY: `${BASE_URL}/admin/vodcat`,
  DELETE_VOD_CATEGORY: `${BASE_URL}/admin/vodcat`,

  ADD_VOD_PROVIDERS: `${BASE_URL}/admin/vodproviders`,
  GET_VOD_PROVIDERS: `${BASE_URL}/admin/vodproviders`,
  EDIT_VOD_PROVIDERS: `${BASE_URL}/admin/vodproviders`,
  DELETE_VOD_PROVIDERS: `${BASE_URL}/admin/vodproviders`,

  ADD_VOD_LANGUAGE: `${BASE_URL}/admin/languages`,
  EDIT_VOD_LANGUAGE: `${BASE_URL}/admin/languages`,
  GET_VOD_LANGUAGE: `${BASE_URL}/admin/languages`,
  DELETE_VOD_LANGUAGE: `${BASE_URL}/admin/languages`,

  ADD_VOD_GENRES: `${BASE_URL}/admin/Genres`,
  EDIT_VOD_GENRES: `${BASE_URL}/admin/Genres`,
  GET_VOD_GENRES: `${BASE_URL}/admin/Genres`,
  DELETE_VOD_GENRES: `${BASE_URL}/admin/Genres`,

  ADD_VOD_PACKAGE: `${BASE_URL}/admin/vodpackages`,
  GET_VOD_PACKAGE: `${BASE_URL}/admin/vodpackages`,
  GET_DETAILED_VOD_PACKAGE: `${BASE_URL}/admin/vodpackages/`,
  EDIT_VOD_PACKAGE: `${BASE_URL}/admin/vodpackages/`,
  DELETE_VOD_PACKAGE: `${BASE_URL}/admin/vodpackages`,

  ADD_VOD_MEDIA: `${BASE_URL}/admin/vod`,
  GET_VOD_MEDIA: `${BASE_URL}/admin/vod`,
  EDIT_VOD_MEDIA: `${BASE_URL}/admin/vod/`,
  DELETE_VOD_MEDIA: `${BASE_URL}/admin/vod`,

  ADD_SOD_CATEGORY: `${BASE_URL}/admin/sodcat`,
  GET_SOD_CATEGORY: `${BASE_URL}/admin/sodcat`,
  EDIT_SOD_CATEGORY: `${BASE_URL}/admin/sodcat`,
  DELETE_SOD_CATEGORY: `${BASE_URL}/admin/sodcat`,

  POST_WEBURL: `${BASE_URL}/admin/weburl`,
  GET_WEBURL: `${BASE_URL}/admin/weburl`,
  PUT_WEBURL: `${BASE_URL}/admin/weburl`,
  DELETE_WEBURL: `${BASE_URL}/admin/weburl`,

  POST_DRM_WAITLIST: `${BASE_URL}/admin/drmwhitelist`,
  GET_DRM_WAITLIST: `${BASE_URL}/admin/drmwhitelist`,
  PUT_DRM_WAITLIST: `${BASE_URL}/admin/drmwhitelist`,
  DELETE_DRM_WAITLIST: `${BASE_URL}/admin/drmwhitelist`,

  POST_TUNEVERSION: `${BASE_URL}/admin/tuneversion`,
  GET_TUNEVERSION: `${BASE_URL}/admin/tuneversion`,
  PUT_TUNEVERSION: `${BASE_URL}/admin/tuneversion`,
  DELETE_TUNEVERSION: `${BASE_URL}/admin/tuneversion`,

  POST_USERENGINEERING: `${BASE_URL}/admin/userengineering`,
  GET_USERENGINEERING: `${BASE_URL}/admin/userengineering`,
  PUT_USERENGINEERING: `${BASE_URL}/admin/userengineering`,
  DELETE_USERENGINEERING: `${BASE_URL}/admin/userengineering`,

  ADD_SOD_PROVIDERS: `${BASE_URL}/admin/sodproviders`,
  GET_SOD_PROVIDERS: `${BASE_URL}/admin/sodproviders`,
  EDIT_SOD_PROVIDERS: `${BASE_URL}/admin/sodproviders`,
  DELETE_SOD_PROVIDERS: `${BASE_URL}/admin/sodproviders`,

  ADD_SOD_LANGUAGE: `${BASE_URL}/admin/sodlanguages`,
  GET_SOD_LANGUAGE: `${BASE_URL}/admin/sodlanguages`,
  EDIT_SOD_LANGUAGE: `${BASE_URL}/admin/sodlanguages`,
  DELETE_SOD_LANGUAGE: `${BASE_URL}/admin/sodlanguages`,

  ADD_SOD_GENRES: `${BASE_URL}/admin/sodgenres`,
  GET_SOD_GENRES: `${BASE_URL}/admin/sodgenres`,
  EDIT_SOD_GENRES: `${BASE_URL}/admin/sodgenres`,
  DELETE_SOD_GENRES: `${BASE_URL}/admin/sodgenres`,

  ADD_SOD_PACKAGE: `${BASE_URL}/admin/sodpackages`,
  GET_SOD_PACKAGE: `${BASE_URL}/admin/sodpackages`,
  GET_DETAILED_SOD_PACKAGE: `${BASE_URL}/admin/sodpackages/`,
  EDIT_SOD_PACKAGE: `${BASE_URL}/admin/sodpackages`,
  DELETE_SOD_PACKAGE: `${BASE_URL}/admin/sodpackages`,

  GET_SOD_EPISODE: `${BASE_URL}/admin/sod/`,
  ADD_SOD_MEDIA: `${BASE_URL}/admin/sod`,
  GET_SOD_MEDIA: `${BASE_URL}/admin/sod`,
  EDIT_SOD_MEDIA: `${BASE_URL}/admin/sod`,
  DELETE_SOD_MEDIA: `${BASE_URL}/admin/sod`,

  //APP STORE

  ADD_APP_STORE_CATEGORY: `${BASE_URL}/admin/appstorecat`,
  EDIT_APP_STORE_CATEGORY: `${BASE_URL}/admin/appstorecat`,
  GET_APP_STORE_CATEGORY: `${BASE_URL}/admin/appstorecat`,
  DELETE_APP_STORE_CATEGORY: `${BASE_URL}/admin/appstorecat`,

  GET_APP_STORE_UPLOAD: `${BASE_URL}/admin/appstore`,
  ADD_APP_STORE_UPLOAD: `${BASE_URL}/admin/appstore`,
  EDIT_APP_STORE_UPLOAD: `${BASE_URL}/admin/appstore`,
  DELETE_APP_STORE_UPLOAD: `${BASE_URL}/admin/appstore`,

  //APP TV

  ADD_APP_TV_CATEGORY: `${BASE_URL}/admin/apptvcat`,
  GET_APP_TV_CATEGORY: `${BASE_URL}/admin/apptvcat`,
  EDIT_APP_TV_CATEGORY: `${BASE_URL}/admin/apptvcat`,
  DELETE_APP_TV_CATEGORY: `${BASE_URL}/admin/apptvcat`,

  ADD_APP_TV_PROVIDERS: `${BASE_URL}/admin/apptvproviders`,
  GET_APP_TV_PROVIDERS: `${BASE_URL}/admin/apptvproviders`,
  EDIT_APP_TV_PROVIDERS: `${BASE_URL}/admin/apptvproviders`,
  DELETE_APP_TV_PROVIDERS: `${BASE_URL}/admin/apptvproviders`,

  ADD_APP_TV_MEDIA: `${BASE_URL}/admin/apptvmedia`,
  GET_APP_TV_MEDIA: `${BASE_URL}/admin/apptvmedia`,
  EDIT_APP_TV_MEDIA: `${BASE_URL}/admin/apptvmedia`,
  DELETE_APP_TV_MEDIA: `${BASE_URL}/admin/apptvmedia`,

  //POPULAR TV

  ADD_POPULAR_TV_CATEGORY: `${BASE_URL}/admin/populartvcat`,
  GET_POPULAR_TV_CATEGORY: `${BASE_URL}/admin/populartvcat`,
  EDIT_POPULAR_TV_CATEGORY: `${BASE_URL}/admin/populartvcat`,
  DELETE_POPULAR_TV_CATEGORY: `${BASE_URL}/admin/populartvcat`,

  ADD_POPULAR_TV_PROVIDERS: `${BASE_URL}/admin/populartvproviders`,
  GET_POPULAR_TV_PROVIDERS: `${BASE_URL}/admin/populartvproviders`,
  EDIT_POPULAR_TV_PROVIDERS: `${BASE_URL}/admin/populartvproviders`,
  DELETE_POPULAR_TV_PROVIDERS: `${BASE_URL}/admin/populartvproviders`,

  ADD_POPULAR_TV_MEDIA: `${BASE_URL}/admin/populartvmedia`,
  EDIT_POPULAR_TV_MEDIA: `${BASE_URL}/admin/populartvmedia`,
  GET_POPULAR_TV_MEDIA: `${BASE_URL}/admin/populartvmedia`,
  DELETE_POPULAR_TV_MEDIA: `${BASE_URL}/admin/populartvmedia`,

  ADD_CUS_USER: `${BASE_URL}/admin/customers/`,
  GET_CUS_USER: `${BASE_URL}/admin/customers/`,
  EDIT_CUS_USER: `${BASE_URL}/admin/customers/`,
  DELETE_CUS_USER: `${BASE_URL}/admin/customers`,

  ADD_CONTACT_INFO: `${BASE_URL}/admin/contactinfo`,
  GET_CONTACT_INFO: `${BASE_URL}/admin/contactinfo`,
  EDIT_CONTACT_INFO: `${BASE_URL}/admin/contactinfo`,
  DELETE_CONTACT_INFO: `${BASE_URL}/admin/contactinfo`,

  ADD_USER_PACKAGE: `${BASE_URL}/admin/activation`,
  GET_USER_PACKAGE: `${BASE_URL}/admin/activation`,
  GET_USER_PACKAGE_ACTIVATION: `${BASE_URL}/admin/activation`,
  EDIT_USER_PACKAGE: `${BASE_URL}/admin/activation`,
  DELETE_USER_PACKAGE: `${BASE_URL}/admin/activation`,

  GET_FINGERPRINT: `${BASE_URL}/admin/fingerprint/`,
  DELETE_FINGERPRINT: `${BASE_URL}/admin/fingerprint`,

  GET_PACKAGE: `${BASE_URL}/admin/reports/package`,
  GET_HISTORICAL_PACKAGE: `${BASE_URL}/admin/reports/historicalPackage`,
  GET_SUBSCRIBER: `${BASE_URL}/admin/reports/subscriber`,
  GET_COUNT: `${BASE_URL}/admin/reports/getcount`,
  GET_BLACKLIST: `${BASE_URL}/admin/reports/blacklisted`,
  GET_PACKAGE_COMPOSITION: `${BASE_URL}/admin/reports/compositionlogs`,

  GET_CHANNEL_LOGS: `${BASE_URL}/admin/reports/channellogs`,
  GET_ACTIVITY_LOGS: `${BASE_URL}/admin/reports/activitylogs`,
  GET_PACKAGE_LOGS: `${BASE_URL}/admin/reports/packagelogs`,

  GET_FINGERPRINT_LOG: `${BASE_URL}/admin/reports/fingerprint`,
  GET_CHANNEL_LOG: `${BASE_URL}/admin/reports/channel_logs`,
  GET_ALL_LOG: `${BASE_URL}/admin/reports/all_logs`,
  GET_MAIL_LOG: `${BASE_URL}/admin/reports/mail`,

  GET_USER_LOG: `${BASE_URL}/admin/reports/customer_based_logs`,

  GET_PACKAGE_ACTIVATION_DEACTIVATION_LOG: `${BASE_URL}/admin/reports/package`,

  GET_RESELLERS: `${BASE_URL}/admin/fingerprint/resellers`,
  GET_CUSTOMER_BY_RESELLER: `${BASE_URL}/admin/fingerprint/customers/`,
  GET_FINGERPRINT_CHANNEL: `${BASE_URL}/admin/fingerprint/channels`,
  POST_FINGERPRINT: `${BASE_URL}/admin/fingerprint`,

  GET_ONLINE_USERS: `${BASE_URL}/admin/onlineusers`,

  GET_BACKUP_SQL: `${BASE_URL}/admin/mysqlbackup`,
  DELETE_BACKUP_SQL: `${BASE_URL}/admin/mysqlbackup`,

  GET_MAIL_LIST: `${BASE_URL}/admin/mail`,
  POST_MAIL_LIST: `${BASE_URL}/admin/mail`,

  GET_TRIGGER_LIST: `${BASE_URL}/admin/triggers`,
  POST_TRIGGER_LIST: `${BASE_URL}/admin/triggers`,
  DELETE_TRIGGER_LIST: `${BASE_URL}/admin/triggers`,

  GET_CHANNEL_VIEWS: `${BASE_URL}/admin/channelviews`,
  GET_DETAILED_CHANNEL_VIEWS: `${BASE_URL}/admin/channelviews/`,

  GET_APP_UPDATE: `${BASE_URL}/admin/appUpdate`,
  POST_APP_UPDATE: `${BASE_URL}/admin/appUpdate`,
  PUT_APP_UPDATE: `${BASE_URL}/admin/appUpdate`,
  DELETE_APP_UPDATE: `${BASE_URL}/admin/appUpdate`,

  GET_ADVERTISMENT: `${BASE_URL}/admin/ads`,
  POST_ADVERTISMENT: `${BASE_URL}/admin/ads`,
  PUT_ADVERTISMENT: `${BASE_URL}/admin/ads`,
  DELETE_ADVERTISMENT: `${BASE_URL}/admin/ads`,

  ADD_EPG: `${BASE_URL}/admin/epg/`,
  GET_EPG: `${BASE_URL}/admin/epg`,
  GET_EPG_PROGRAM: `${BASE_URL}/admin/epg/epg_program`,
  DELETE_EPG: `${BASE_URL}/admin/epg`,
  PUT_EPG: `${BASE_URL}/admin/epg`,

  GET_EZ_SERVER_INPUT_ADAPTER: `${BASE_URL}/admin/channels/get_server_ip_list`,

  POST_BULK_VOD: `${BASE_URL}/admin/bulkupdate/vod`,
  POST_BULK_MOD: `${BASE_URL}/admin/bulkupdate/mod`,
  POST_BULK_SOD: `${BASE_URL}/admin/bulkupdate/sod`,
  POST_BULK_OTT: `${BASE_URL}/admin/bulkupdate/ott`,
  POST_BULK_LIVETV: `${BASE_URL}/admin/bulkupdate/livetv`,

  GET_BULK_VOD: `${BASE_URL}/admin/bulkupdate/vod`,
  GET_BULK_MOD: `${BASE_URL}/admin/bulkupdate/mod`,
  GET_BULK_SOD: `${BASE_URL}/admin/bulkupdate/sod`,
  GET_BULK_OTT: `${BASE_URL}/admin/bulkupdate/ott`,
  GET_BULK_LIVETV: `${BASE_URL}/admin/bulkupdate/livetv`,
};

const EXTERNAL_API_ENDPOINTS = {
  SEARCH_TMDB_MOVIES: `${TMDB_BASE_URL}/search/movie`,
  GET_TMDB_MOVIE_DETAILS: `${TMDB_BASE_URL}/movie`,
  SEARCH_TMDB_TV: `${TMDB_BASE_URL}/search/tv`,
  GET_TMDB_TV_DETAILS: `${TMDB_BASE_URL}/tv`,
  GET_TMDB_MOVIE_DETAILS_ID: `${TMDB_BASE_URL}/movie`,
  GET_TMDB_TV_DETAILS_ID: `${TMDB_BASE_URL}/tv`,
  FLUSONIC_STREAMS: 'http://198.162.1.11:8080/flussonic/api/v3/streams/',
};

const HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  MULTIPART: 'multipart/form-data',
};

export { API_ENDPOINTS, HEADERS, EXTERNAL_API_ENDPOINTS, TMDB_API_KEY };
