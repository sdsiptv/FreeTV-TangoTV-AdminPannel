import axios from 'axios';
import API from 'utils/config/axiosConfig';
import {
  API_ENDPOINTS,
  HEADERS,
  EXTERNAL_API_ENDPOINTS,
  TMDB_API_KEY,
} from './constants';

const apis = {
  login: (username, password) => {
    return API.post(API_ENDPOINTS.LOGIN, {
      username: username,
      password: password,
    });
  },

  getDashboard: () => {
    return API.get(API_ENDPOINTS.GET_DASHBOARD);
  },

  getGeneralSettings: () => {
    return API.get(API_ENDPOINTS.GET_GENERAL_SETTINGS);
  },

  editGeneralSettings: formData => {
    return API.put(API_ENDPOINTS.EDIT_GENERAL_SETTINGS, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  // admin user manage

  addAdminUser: (
    username,
    password,
    email,
    name,
    phone,
    country,
    address,
    company,
    website,
    role,
  ) => {
    return API.post(API_ENDPOINTS.ADD_ADMIN_USER, {
      username: username,
      email: email,
      password: password,
      name: name,
      phone: phone,
      country: country,
      address: address,
      company: company,
      website: website,
      roles: role,
    });
  },

  getAdminUser: () => {
    return API.get(API_ENDPOINTS.GET_ADMIN_USER);
  },
  getSystemInfo: () => {
    return API.get(API_ENDPOINTS.GET_SYTEM_INFO);
  },

  getServerLogs: () => {
    return API.get(API_ENDPOINTS.GET_SERVER_LOGS);
  },

  addTermsAndCondition: formData => {
    return API.post(API_ENDPOINTS.POST_TERMS_AND_CONDITIONS, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getTermsAndCondition: () => {
    return API.get(API_ENDPOINTS.GET_TERMS_AND_CONDITIONS);
  },

  getAdmin: () => {
    return API.get(API_ENDPOINTS.GET_ADMIN);
  },

  getAccessLogs: () => {
    return API.get(API_ENDPOINTS.GET_ACCESS_LOG);
  },

  editAdminUser: (
    id,
    Name,
    Email,
    Country,
    Company,
    Website,
    Phone,
    Address,
    password,
    enabled,
    role,
  ) => {
    return API.put(API_ENDPOINTS.EDIT_ADMIN_USER + '?userId=' + id, {
      email: Email,
      name: Name,
      phone: Phone,
      country: Country,
      address: Address,
      company: Company,
      website: Website,
      password: password,
      enabled: enabled,
      roles: role,
    });
  },

  deleteAdminUser: userId => {
    return API.delete(API_ENDPOINTS.DELETE_ADMIN_USER + '?userId=' + userId);
  },

  // channel category

  addChannelCategory: (categoryName, position) => {
    return API.post(API_ENDPOINTS.ADD_CHANNEL_CATEGORY, {
      categoryname: categoryName,
      position: position
    });
  },

  getChannelCategory: () => {
    return API.get(API_ENDPOINTS.GET_CHANNEL_CATEGORY);
  },

  editChannelCategory: (categoryid, Name, position, enabled) => {
    return API.put(
      API_ENDPOINTS.EDIT_CHANNEL_CATEGORY + '?categoryid=' + categoryid,
      {
        categoryname: Name,
        position: position,
        enabled: enabled,
      },
    );
  },

  editChannelCategoryPosition: data => {
    return API.put(API_ENDPOINTS.EDIT_CHANNEL_CATEGORY + '/position', {
      category: data,
    });
  },

  deleteCategory: categoryid => {
    return API.delete(
      API_ENDPOINTS.DELETE_CHANNEL_CATEGORY + '?categoryid=' + categoryid,
      {
        [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
      },
    );
  },
  //channel stream

  addChannelStream: formData => {
    return API.post(API_ENDPOINTS.ADD_CHANNEL_STREAM, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getChannelStream: () => {
    return API.get(API_ENDPOINTS.GET_CHANNEL_STREAM);
  },

  editChannelStream: (channelId, formData) => {
    return API.put(API_ENDPOINTS.EDIT_CHANNEL_STREAM + channelId, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteChannelStream: (channel_id, name) => {
    return API.delete(API_ENDPOINTS.DELETE_CHANNEL_STREAM + '/' + channel_id,
      {
        name: name,
      }
    );
  },

  //channel package

  addChannelPackage: (Name, enabled, channels) => {
    return API.post(API_ENDPOINTS.ADD_CHANNEL_PACKAGE, {
      name: Name,
      enabled: enabled,
      channels: channels,
    });
  },

  getChannelPackage: () => {
    return API.get(API_ENDPOINTS.GET_CHANNEL_PACKAGE);
  },

  getChannelPackageDetails: id => {
    return API.get(API_ENDPOINTS.GET_CHANNEL_PACKAGE_Details + id);
  },

  editChannelPackage: (name, enabled, channels, packageId) => {
    return API.put(
      API_ENDPOINTS.EDIT_CHANNEL_PACKAGE + '?packageId=' + packageId,
      {
        name: name,
        enabled: enabled,
        channels: channels,
      },
    );
  },

  deleteChannelPackage: packageId => {
    return API.delete(
      API_ENDPOINTS.DELETE_CHANNEL_PACKAGE + '?packageId=' + packageId,
    );
  },

  // EZSERVER DATA

  getEZserverChannel: () => {
    return API.get(API_ENDPOINTS.GET_SDSSTREAMER_CHANNEL);
  },

  addEZserverChannel: (server_port, token) => {
    return API.post(API_ENDPOINTS.POST_SDSSTREAMER_CHANNEL, {
      server_port: server_port,
      token: token,
    });
  },

  editEZserverChannel: (id, server_port, token) => {
    // return API.put(`${API_ENDPOINTS.PUT_WEBURL}/${id}`)
    return API.put(
      `${API_ENDPOINTS.PUT_SDSSTREAMER_CHANNEL}/${id}`,
      {
        server_port: server_port,
        token: token,
      },
    );
  },


  deleteEZserverChannel: id => {
    return API.delete(`${API_ENDPOINTS.DELETE_SDSSTREAMER_CHANNEL}/${id}`)
    // return API.delete(
    //   API_ENDPOINTS.DELETE_WEBURL + '?id=' + id,
    // );
  },

  //EZServer

  getEZserverChannelStatus: () => {
    return API.get(API_ENDPOINTS.GET_SDSSTREAMER_CHANNEL_STATUS);
  },

  getViewSystemUptime: () => {
    return API.get(API_ENDPOINTS.GET_VIEW_SYSTEM_UPTIME);
  },

  getCpu: () => {
    return API.get(API_ENDPOINTS.GET_CPU);
  },

  getChannelRefresh: () => {
    return API.get(API_ENDPOINTS.GET_CHANNEL_REFRESH);
  },

  getChannelRestart: () => {
    return API.get(API_ENDPOINTS.GET_CHANNEL_RESTART);
  },
  //mod category

  addModCategory: (categoryName, position) => {
    return API.post(API_ENDPOINTS.ADD_MOD_CATEGORY, {
      categoryname: categoryName,
      position: position,
    });
  },

  getModCategory: () => {
    return API.get(API_ENDPOINTS.GET_MOD_CATEGORY);
  },

  editModCategory: (id, categoryname, position, enabled) => {
    return API.put(API_ENDPOINTS.EDIT_MOD_CATEGORY + '?category_id=' + id, {
      categoryname: categoryname,
      position: position,
      enabled: enabled,
    });
  },

  deleteModCategory: categoryid => {
    return API.delete(
      API_ENDPOINTS.DELETE_MOD_CATEGORY + '?categoryid=' + categoryid,
    );
  },

  //mod media

  getModSongs: mod_id => {
    return API.get(API_ENDPOINTS.GET_MOD_SONGS + mod_id);
  },

  addModMedia: formdata => {
    return API.post(API_ENDPOINTS.ADD_MOD_MEDIA, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getModMedia: () => {
    return API.get(API_ENDPOINTS.GET_MOD_MEDIA);
  },

  editModMedia: (mod_id, formData) => {
    return API.put(API_ENDPOINTS.EDIT_MOD_MEDIA + '/' + mod_id, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteModMedia: mod_id => {
    return API.delete(API_ENDPOINTS.DELETE_MOD_MEDIA + '/?modid=' + mod_id);
  },

  //mod package

  addModPackage: (Name, enabled, mods) => {
    return API.post(API_ENDPOINTS.ADD_MOD_PACKAGE, {
      name: Name,
      enabled: enabled,
      mods: mods,
    });
  },

  getModPackage: () => {
    return API.get(API_ENDPOINTS.GET_MOD_PACKAGE);
  },

  getDetailedModPackage: packageId => {
    return API.get(API_ENDPOINTS.GET_DETAILED_MOD_PACKAGE + packageId);
  },

  editModPackage: (Name, enabled, mods, packageId) => {
    return API.put(API_ENDPOINTS.EDIT_MOD_PACKAGE + '?packageId=' + packageId, {
      name: Name,
      enabled: enabled,
      mods: mods,
    });
  },

  deleteModPackage: packageId => {
    return API.delete(
      API_ENDPOINTS.DELETE_MOD_PACKAGE + '?packageId=' + packageId,
    );
  },

  //OTT category

  addOTTCategory: (categoryName, position, enabled) => {
    return API.post(API_ENDPOINTS.ADD_OTT_CATEGORY, {
      categoryname: categoryName,
      position: position,
      enabled: enabled,
    });
  },

  editOTTCategory: (categoryid, Name, position, enabled) => {
    return API.put(
      API_ENDPOINTS.EDIT_OTT_CATEGORY + '?categoryid=' + categoryid,
      {
        categoryname: Name,
        position: position,
        enabled: enabled,
      },
    );
  },

  deleteOTTCategory: categoryid => {
    return API.delete(
      API_ENDPOINTS.DELETE_OTT_CATEGORY + '?categoryid=' + categoryid,
    );
  },

  getOTTCategory: () => {
    return API.get(API_ENDPOINTS.GET_OTT_CATEGORY);
  },

  // OTT Providers

  getOTTProvider: () => {
    return API.get(API_ENDPOINTS.ADD_GET_OTTPROVIDER);
  },

  addOTTProviders: formdata => {
    return API.post(API_ENDPOINTS.ADD_POST_OTTPROVIDERS, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  editOTTProviders: (sno, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_OTT_PROVIDERS + '/' + sno, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteOTTProviders: sno => {
    return API.delete(
      API_ENDPOINTS.DELETE_OTT_PROVIDERS + '?provider_sno=' + sno,
    );
  },

  // EDUCATION CATEGORY

  getEDUCATIONCategory: () => {
    return API.get(API_ENDPOINTS.GET_EDUCATION_CATEGORY);
  },

  addEDUCATIONCategory: (categoryName, position, enabled) => {
    return API.post(API_ENDPOINTS.ADD_EDUCATION_CATEGORY, {
      categoryname: categoryName,
      position: position,
      enabled: enabled,
    });
  },

  editEDUCATIONCategory: (category_id, Name, position, enabled) => {
    return API.put(
      API_ENDPOINTS.EDIT_EDUCATION_CATEGORY + '?category_id=' + category_id,
      {
        categoryname: Name,
        position: position,
        enabled: enabled,
      },
    );
  },

  deleteEDUCATIONCategory: category_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_EDUCATION_CATEGORY + '?category_id=' + category_id,
    );
  },

  // EDUCATION PROVIDER

  getEDUCATIONProvider: () => {
    return API.get(API_ENDPOINTS.GET_EDUCATION_PROVIDERS);
  },

  addEDUCATIONProviders: formdata => {
    return API.post(API_ENDPOINTS.ADD_EDUCATION_PROVIDERS, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  editEDUCATIONProviders: (sno, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_EDUCATION_PROVIDERS + '/' + sno, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteEDUCATIONProviders: sno => {
    return API.delete(
      API_ENDPOINTS.DELETE_EDUCATION_PROVIDERS + '?provider_sno=' + sno,
    );
  },

  // EDUCATION BOARD

  getEDUCATIONBoard: () => {
    return API.get(API_ENDPOINTS.GET_EDUCATION_BOARD);
  },

  addEDUCATIONBoard: (board_name) => {
    return API.post(API_ENDPOINTS.ADD_EDUCATION_BOARD, {
      board_name: board_name,
    });
  },

  editEDUCATIONBoard: (id, board_name) => {
    return API.put(
      API_ENDPOINTS.EDIT_EDUCATION_BOARD + '?id=' + id,
      {
        board_name: board_name,
      },
    );
  },


  deleteEDUCATIONBoard: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_EDUCATION_BOARD + '?id=' + id,
    );
  },

  // EDUCATION

  getEDUCATION: () => {
    return API.get(API_ENDPOINTS.GET_EDUCATIONS);
  },

  addEDUCATION: formdata => {
    return API.post(API_ENDPOINTS.ADD_EDUCATIONS, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  editEDUCATION: (sno, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_EDUCATIONS + '/' + sno, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteEDUCATION: educational_id => {
    return API.delete(API_ENDPOINTS.DELETE_EDUCATIONS + '/' + educational_id);
  },

  getEDUCATIONEpisode: educational_id => {
    return API.get(API_ENDPOINTS.GET_EDUCATION_EPISODE + educational_id);
  },

  // deleteEDUCATION: educational_id => {
  //   return API.delete(
  //     API_ENDPOINTS.DELETE_EDUCATIONS +'/'+educational_id,
  //   );
  // },

  // EDUCATION CATEGORY

  getDEVOTIONALCategory: () => {
    return API.get(API_ENDPOINTS.GET_DEVOTIONAL_CATEGORY);
  },

  addDEVOTIONALCategory: (name, position, enabled) => {
    return API.post(API_ENDPOINTS.ADD_DEVOTIONAL_CATEGORY, {
      name: name,
      position: position,
      enabled: enabled,
    });
  },

  editDEVOTIONALCategory: (category_id, name, position, enabled) => {
    return API.put(
      API_ENDPOINTS.EDIT_DEVOTIONAL_CATEGORY + '?category_id=' + category_id,
      {
        name: name,
        position: position,
        enabled: enabled,
      },
    );
  },

  deleteDEVOTIONALCategory: category_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_DEVOTIONAL_CATEGORY + '?category_id=' + category_id,
    );
  },

  // LOCATION

  getLocation: () => {
    return API.get(API_ENDPOINTS.GET_LOCATION);
  },

  addLocation: (name, position, enabled) => {
    return API.post(API_ENDPOINTS.ADD_LOCATION, {
      name: name,
      position: position,
      enabled: enabled,
    });
  },

  editLocation: (location_id, name, position, enabled) => {
    return API.put(
      API_ENDPOINTS.EDIT_LOCATION + '?location_id=' + location_id,
      {
        name: name,
        position: position,
        enabled: enabled,
      },
    );
  },

  deleteLocation: location_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_LOCATION + '?location_id=' + location_id,
    );
  },

  // DEVOTIONAL PROVIDER

  getDEVOTIONALProvider: () => {
    return API.get(API_ENDPOINTS.GET_DEVOTIONAL_PROVIDERS);
  },

  addDEVOTIONALProviders: formdata => {
    return API.post(API_ENDPOINTS.ADD_DEVOTIONAL_PROVIDERS, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  editDEVOTIONALProviders: (sno, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_DEVOTIONAL_PROVIDERS + '/' + sno, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteDEVOTIONALProviders: sno => {
    return API.delete(
      API_ENDPOINTS.DELETE_DEVOTIONAL_PROVIDERS + '?provider_sno=' + sno,
    );
  },

  // RELIGIOUS

  getReligious: () => {
    return API.get(API_ENDPOINTS.GET_RELIGIOUS);
  },

  addReligious: (name, position, enabled) => {
    return API.post(API_ENDPOINTS.ADD_RELIGIOUS, {
      name: name,
      position: position,
      enabled: enabled,
    });
  },

  editReligious: (religion_id, name, position, enabled) => {
    return API.put(
      API_ENDPOINTS.EDIT_RELIGIOUS + '?religion_id=' + religion_id,
      {
        name: name,
        position: position,
        enabled: enabled,
      },
    );
  },

  deleteReligious: religion_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_RELIGIOUS + '?religion_id=' + religion_id,
    );
  },

   // DEVOTIONAL

   getDEVOTIONAL: () => {
    return API.get(API_ENDPOINTS.GET_DEVOTIONAL);
  },

  addDEVOTIONAL: formdata => {
    return API.post(API_ENDPOINTS.ADD_DEVOTIONAL, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  editDEVOTIONAL: (sno, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_DEVOTIONAL + '/' + sno, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteDEVOTIONAL: devotional_id => {
    return API.delete(API_ENDPOINTS.DELETE_DEVOTIONAL + '/' + devotional_id);
  },

  getDEVOTIONALepisode: devotional_id => {
    return API.get(API_ENDPOINTS.GET_DEVOTIONAL_EPISODE + devotional_id);
  },

  // LANGUAGE

  getLanguage: () => {
    return API.get(API_ENDPOINTS.GET_LANGUAGE);
  },

  //APP UPDATE

  addAppUpdate: (app_version, url) => {
    return API.post(API_ENDPOINTS.POST_APP_UPDATE, {
      app_version: app_version,
      url: url,
    });
  },

  editAppUpdate: (appId, enabledStatus) => {
    return API.put(API_ENDPOINTS.PUT_APP_UPDATE + '/' + appId, {
      enabled: enabledStatus,
    });
  },

  deleteAppUpdate: appId => {
    return API.delete(API_ENDPOINTS.DELETE_APP_UPDATE + '?appId=' + appId);
  },

  getAppUpdate: () => {
    return API.get(API_ENDPOINTS.GET_APP_UPDATE);
  },

  // Backup

  getBackup: () => {
    return API.get(API_ENDPOINTS.GET_BACKUP_SQL);
  },

  deleteBackup: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_BACKUP_SQL + '?id=' + id,
    );
  },
  //vod category

  addVodCategory: (name, position) => {
    return API.post(API_ENDPOINTS.ADD_VOD_CATEGORY, {
      categoryname: name,
      position: position,
    });
  },

  getVodCategory: () => {
    return API.get(API_ENDPOINTS.GET_VOD_CATEGORY);
  },

  editVodCategory: (category_id, Name, position, enabled) => {
    return API.put(
      API_ENDPOINTS.EDIT_VOD_CATEGORY + '?category_id=' + category_id,
      {
        categoryname: Name,
        position: position,
        enabled: enabled,

      },
    );
  },

  deleteVodCategory: category_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_VOD_CATEGORY + '?category_id=' + category_id,
    );
  },

  //VOD Providers

  addVodProviders: formdata => {
    return API.post(API_ENDPOINTS.ADD_VOD_PROVIDERS, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getVodProviders: () => {
    return API.get(API_ENDPOINTS.GET_VOD_PROVIDERS);
  },

  editVodProviders: (sno, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_VOD_PROVIDERS + '/' + sno, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteVodProviders: sno => {
    return API.delete(
      API_ENDPOINTS.DELETE_VOD_PROVIDERS + '?provider_sno=' + sno,
    );
  },

  //VOD LANGUAGE

  addVodLanguage: (name) => {
    return API.post(API_ENDPOINTS.ADD_VOD_LANGUAGE, {
      name: name,
    });
  },

  editVodLanguage: (language_id, name) => {
    return API.put(
      API_ENDPOINTS.EDIT_VOD_LANGUAGE + '/' + language_id,
      {
        name: name,
      },
    );
  },

  getVodLanguage: () => {
    return API.get(API_ENDPOINTS.GET_VOD_LANGUAGE);
  },

  deleteVodLanguage: language_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_VOD_LANGUAGE + '?language_id=' + language_id,
    );
  },

  //VOD GENRES

  addVodGenres: (genres_name, genres_id) => {
    return API.post(API_ENDPOINTS.ADD_VOD_GENRES, {
      genres_name: genres_name,
      genres_id: genres_id,
    });
  },

  editVodGenres: (genres_id, genres_name) => {
    return API.put(
      API_ENDPOINTS.EDIT_VOD_GENRES + '/' + genres_id,
      {
        genres_name: genres_name,
      },
    );
  },

  getVodGenres: () => {
    return API.get(API_ENDPOINTS.GET_VOD_GENRES);
  },

  deleteVodGenres: genres_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_VOD_GENRES + '?genres_id=' + genres_id,
    );
  },

  //vod package

  addVodPackage: (Name, enabled, vods) => {
    return API.post(API_ENDPOINTS.ADD_VOD_PACKAGE, {
      name: Name,
      enabled: enabled,
      vods: vods,
    });
  },

  getVodPackage: () => {
    return API.get(API_ENDPOINTS.GET_VOD_PACKAGE);
  },

  getDetailedVodPackage: id => {
    return API.get(API_ENDPOINTS.GET_DETAILED_VOD_PACKAGE + id);
  },

  editVodPackage: (Name, enabled, vods, packageId) => {
    return API.put(API_ENDPOINTS.EDIT_VOD_PACKAGE + packageId, {
      name: Name,
      enabled: enabled,
      vods: vods,
    });
  },

  deleteVodPackage: packageId => {
    return API.delete(
      API_ENDPOINTS.DELETE_VOD_PACKAGE + '?packageId=' + packageId,
    );
  },

  // vod media

  addVodMedia: formdata => {
    return API.post(API_ENDPOINTS.ADD_VOD_MEDIA, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getVodMedia: () => {
    return API.get(API_ENDPOINTS.GET_VOD_MEDIA);
  },

  editVodMedia: (vod_id, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_VOD_MEDIA + vod_id, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteVodMedia: category_id => {
    return API.delete(API_ENDPOINTS.DELETE_VOD_MEDIA + '/' + category_id);
  },

  //ott channels

  addOTTChannel: formdata => {
    return API.post(API_ENDPOINTS.ADD_OTT_CHANNELS, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getOTTChannel: () => {
    return API.get(API_ENDPOINTS.GET_OTT_CHANNELS);
  },

  getDetailedOTTChannel: ottId => {
    return API.get(`${API_ENDPOINTS.GET_OTT_CHANNELS}/${ottId}`);
  },

  editOTTChannel: (ott_id, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_OTT_CHANNELS + '/' + ott_id, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteOTTChannel: category_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_OTT_CHANNELS + '?ottId=' + category_id,
    );
  },

  //WEB URL
  getwebURL: () => {
    return API.get(API_ENDPOINTS.GET_WEBURL);
  },

  addWebURL: (contact_url, recharge_url, subscription_url) => {
    return API.post(API_ENDPOINTS.POST_WEBURL, {
      contact_url: contact_url,
      recharge_url: recharge_url,
      subscription_url: subscription_url,
    });
  },

  editWebURL: (id, contact_url, recharge_url, subscription_url) => {
    // return API.put(`${API_ENDPOINTS.PUT_WEBURL}/${id}`)
    return API.put(
      `${API_ENDPOINTS.PUT_WEBURL}/${id}`,
      {
        contact_url: contact_url,
        recharge_url: recharge_url,
        subscription_url: subscription_url
      },
    );
  },


  deleteWEBURL: id => {
    return API.delete(`${API_ENDPOINTS.DELETE_WEBURL}/${id}`)
    // return API.delete(
    //   API_ENDPOINTS.DELETE_WEBURL + '?id=' + id,
    // );
  },

  // Wait List

  addWaitlist: (mac_id) => {
    return API.post(API_ENDPOINTS.POST_DRM_WAITLIST, {
      mac_id: mac_id,
    });
  },

  getWaitlist: () => {
    return API.get(API_ENDPOINTS.GET_DRM_WAITLIST);
  },

  editSodCategory: (category_id, Name, position, enabled) => {
    return API.put(
      API_ENDPOINTS.EDIT_SOD_CATEGORY + '?category_id=' + category_id,
      {
        categoryname: Name,
        position: position,
        enabled: enabled
      },
    );
  },

  deleteSodCategory: category_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_SOD_CATEGORY + '?category_id=' + category_id,
    );
  },

  // TUNE VERSION

  getTuneVersion: () => {
    return API.get(API_ENDPOINTS.GET_TUNEVERSION);
  },

  addTuneVersion: (vod, sod, mod, livetv) => {
    return API.post(API_ENDPOINTS.POST_TUNEVERSION, {
      vod: vod,
      sod: sod,
      mod: mod,
      livetv: livetv,
    });
  },

  editTuneVersion: (vod, sod, mod, livetv, id) => {
    return API.put(
      API_ENDPOINTS.PUT_TUNEVERSION + '/' + id,
      {
        vod: vod,
        sod: sod,
        mod: mod,
        livetv: livetv,
      },
    );
  },

  deleteTuneVersion: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_TUNEVERSION + '?id=' + id,
    );
  },

  // USER ENGINEERING

  getUserEngineering: () => {
    return API.get(API_ENDPOINTS.GET_USERENGINEERING);
  },

  addUserEngineering: (user_id, area_code, audit_mode, low_profile_mode, stream_type, bootup, channel_change, first_play, language) => {
    return API.post(API_ENDPOINTS.POST_USERENGINEERING, {
      user_id: user_id,
      area_code: area_code,
      audit_mode: audit_mode,
      low_profile_mode: low_profile_mode,
      stream_type: stream_type,
      bootup: bootup,
      channel_change: channel_change,
      first_play: first_play,
      language: language
    });
  },

  editUserEngineering: (user_id, area_code, audit_mode, low_profile_mode, stream_type, bootup, channel_change, first_play, language, id) => {
    return API.put(
      API_ENDPOINTS.PUT_USERENGINEERING + '/' + id,
      {
        user_id: user_id,
        area_code: area_code,
        audit_mode: audit_mode,
        low_profile_mode: low_profile_mode,
        stream_type: stream_type,
        bootup: bootup,
        channel_change: channel_change,
        first_play: first_play,
        language: language
      },
    );
  },

  deleteeUserEngineering: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_USERENGINEERING + '?id=' + id,
    );
  },

  //sod category

  addSodCategory: (name, position) => {
    return API.post(API_ENDPOINTS.ADD_SOD_CATEGORY, {
      categoryname: name,
      position: position,
    });
  },

  getSodCatergory: () => {
    return API.get(API_ENDPOINTS.GET_SOD_CATEGORY);
  },

  editSodCategory: (category_id, Name, position, enabled) => {
    return API.put(
      API_ENDPOINTS.EDIT_SOD_CATEGORY + '?category_id=' + category_id,
      {
        categoryname: Name,
        position: position,
        enabled: enabled
      },
    );
  },

  deleteSodCategory: category_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_SOD_CATEGORY + '?category_id=' + category_id,
    );
  },

  //sod media

  getSodEpisode: sod_id => {
    return API.get(API_ENDPOINTS.GET_SOD_EPISODE + sod_id);
  },

  addSodMedia: formdata => {
    return API.post(API_ENDPOINTS.ADD_SOD_MEDIA, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getSodMedia: () => {
    return API.get(API_ENDPOINTS.GET_SOD_MEDIA);
  },

  editSodMedia: (sod_id, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_SOD_MEDIA + '/' + sod_id, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteSodMedia: sod_id => {
    return API.delete(API_ENDPOINTS.DELETE_SOD_MEDIA + '/' + sod_id);
  },

  //SOD Providers

  addSodProviders: formdata => {
    return API.post(API_ENDPOINTS.ADD_SOD_PROVIDERS, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getSodProviders: () => {
    return API.get(API_ENDPOINTS.GET_SOD_PROVIDERS);
  },

  editSodProviders: (sno, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_SOD_PROVIDERS + '/' + sno, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteSodProviders: sno => {
    return API.delete(
      API_ENDPOINTS.DELETE_SOD_PROVIDERS + '?provider_sno=' + sno,
    );
  },

  // SOD GENRES

  addSodGenres: (genres_name, genres_id) => {
    return API.post(API_ENDPOINTS.ADD_SOD_GENRES, {
      genres_name: genres_name,
      genres_id: genres_id,
    });
  },

  editSodGenres: (genres_id, genres_name) => {
    return API.put(
      API_ENDPOINTS.EDIT_SOD_GENRES + '/' + genres_id,
      {
        genres_name: genres_name,
      },
    );
  },

  getSodGenres: () => {
    return API.get(API_ENDPOINTS.GET_SOD_GENRES);
  },

  deleteSodGenres: genres_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_SOD_GENRES + '?genres_id=' + genres_id,
    );
  },

  //SOD LANGUAGE

  addSodLanguage: (name) => {
    return API.post(API_ENDPOINTS.ADD_SOD_LANGUAGE, {
      name: name,
    });
  },

  editSodLanguage: (language_id, name) => {
    return API.put(
      API_ENDPOINTS.EDIT_SOD_LANGUAGE + '/' + language_id,
      {
        name: name,
      },
    );
  },

  getSodLanguage: () => {
    return API.get(API_ENDPOINTS.GET_SOD_LANGUAGE);
  },

  deleteSodLanguage: language_id => {
    return API.delete(
      API_ENDPOINTS.DELETE_SOD_LANGUAGE + '?language_id=' + language_id,
    );
  },

  //sod package

  addSodPackage: (Name, enabled, sods) => {
    return API.post(API_ENDPOINTS.ADD_SOD_PACKAGE, {
      name: Name,
      enabled: enabled,
      sods: sods,
    });
  },

  getSodPackage: () => {
    return API.get(API_ENDPOINTS.GET_SOD_PACKAGE);
  },

  getDetailedSodPackage: id => {
    return API.get(API_ENDPOINTS.GET_DETAILED_SOD_PACKAGE + id);
  },

  editSodPackage: (Name, enabled, sods, packageId) => {
    return API.put(API_ENDPOINTS.EDIT_SOD_PACKAGE + '?packageId=' + packageId, {
      name: Name,
      enabled: enabled,
      sods: sods,
    });
  },

  deleteSodPackage: packageId => {
    return API.delete(
      API_ENDPOINTS.DELETE_SOD_PACKAGE + '?packageId=' + packageId,
    );
  },

  // APP STORE CATEGORY

  addAppStoreCategory: (name, position) => {
    return API.post(API_ENDPOINTS.ADD_APP_STORE_CATEGORY, {
      category: name,
      position: position
    });
  },

  // deleteAppStoreCategory: category_id => {
  //   return API.delete(
  //     `${API_ENDPOINTS.DELETE_APP_STORE_CATEGORY}/${category_id}`
  //   );
  // },

  deleteAppStoreCategory: categoryid => {
    return API.delete(
      API_ENDPOINTS.DELETE_APP_STORE_CATEGORY + '?categoryid=' + categoryid,
    );
  },


  editAppStoreCategory: (category_id, category, position, enabled) => {
    return API.put(
      `${API_ENDPOINTS.EDIT_APP_STORE_CATEGORY}/${category_id}`,
      {
        category: category,
        position: position,
      },
    );
  },

  getAppStoreCategory: () => {
    return API.get(API_ENDPOINTS.GET_APP_STORE_CATEGORY);
  },

  getAppStoreUpload: () => {
    return API.get(API_ENDPOINTS.GET_APP_STORE_UPLOAD);
  },

  addAppStoreUpload: formdata => {
    return API.post(API_ENDPOINTS.ADD_APP_STORE_UPLOAD, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  editAppUploadChannel: (id, formdata) => {
    return API.put(
      (`${API_ENDPOINTS.EDIT_APP_STORE_UPLOAD}/${id}`), formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getDetailedAppStoreUpload: id => {
    return API.get(`${API_ENDPOINTS.GET_APP_STORE_UPLOAD}/${id}`);
  },

  deleteAppStoreUpload: id => {
    return API.delete(
      `${API_ENDPOINTS.DELETE_APP_STORE_UPLOAD}/${id}`
    );
  },

  // App TV Category

  addAppTVCategory: (name, position) => {
    return API.post(API_ENDPOINTS.ADD_APP_TV_CATEGORY, {
      categoryname: name,
      position: position
    });
  },
  getAppTVCategory: () => {
    return API.get(API_ENDPOINTS.GET_APP_TV_CATEGORY);
  },

  editAppTVCategory: (name, position, enabled, category_id) => {
    return API.put(
      API_ENDPOINTS.EDIT_APP_TV_CATEGORY + '?category_id=' + category_id,
      {
        categoryname: name,
        position: position,
        enabled: enabled,
      },
    );
  },

  deleteAppTVCategory: categoryid => {
    return API.delete(
      API_ENDPOINTS.DELETE_APP_TV_CATEGORY + '?categoryid=' + categoryid,
    );
  },


  // App TV Providers

  addAppTVProviders: formdata => {
    return API.post(API_ENDPOINTS.ADD_APP_TV_PROVIDERS, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getAppTVProviders: () => {
    return API.get(API_ENDPOINTS.GET_APP_TV_PROVIDERS);
  },

  editAppTVProviders: (id, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_APP_TV_PROVIDERS + '/' + id, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteAppTVProviders: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_APP_TV_PROVIDERS + '?provider_id=' + id,
    );
  },

  // App TV Media

  addAppTVMedia: formdata => {
    return API.post(API_ENDPOINTS.ADD_APP_TV_MEDIA, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getAppTVMedia: () => {
    return API.get(API_ENDPOINTS.GET_APP_TV_MEDIA);
  },

  editAppTVMedia: (apptv_id, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_APP_TV_MEDIA + '/' + apptv_id, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteAppTVMedia: media_id => {
    return API.delete(API_ENDPOINTS.DELETE_APP_TV_MEDIA + '/' + media_id);
  },

  //NETIP

  getNetIP: () => {
    return API.get(API_ENDPOINTS.GET_SOURCEIP);
  },

  addNetIP: (netip) => {
    return API.post(API_ENDPOINTS.POST_SOURCEIP, {
      netip: netip,
    });
  },

  editNetIP: (netip, id) => {
    return API.put(
      API_ENDPOINTS.PUT_SOURCEIP + '/' + id,
      {
        netip: netip,
      },
    );
  },

  deleteNetIP: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_SOURCEIP + '?id=' + id,
    );
  },


  //POPULAR TV

  getPopularTVCategory: () => {
    return API.get(API_ENDPOINTS.GET_POPULAR_TV_CATEGORY);
  },

  addPopularTVCategory: (name, position) => {
    return API.post(API_ENDPOINTS.ADD_POPULAR_TV_CATEGORY, {
      categoryname: name,
      position: position
    });
  },

  editPopularTVCategory: (name, position, enabled, category_id) => {
    return API.put(
      API_ENDPOINTS.EDIT_POPULAR_TV_CATEGORY + '?category_id=' + category_id,
      {
        categoryname: name,
        position: position,
        enabled: enabled,
      },
    );
  },

  deletePopularTVCategory: categoryid => {
    return API.delete(
      API_ENDPOINTS.DELETE_POPULAR_TV_CATEGORY + '?categoryid=' + categoryid,
    );
  },

  //PopularTV Providers

  addPopularTVProviders: formdata => {
    return API.post(API_ENDPOINTS.ADD_POPULAR_TV_PROVIDERS, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getPopularTVProviders: () => {
    return API.get(API_ENDPOINTS.GET_POPULAR_TV_PROVIDERS);
  },

  editPopularTVProviders: (id, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_POPULAR_TV_PROVIDERS + '/' + id, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deletePopularTVProviders: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_POPULAR_TV_PROVIDERS + '?provider_id=' + id,
    );
  },

  // App TV Media

  addPopularTVMedia: formdata => {
    return API.post(API_ENDPOINTS.ADD_POPULAR_TV_MEDIA, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  getPopularTVMedia: () => {
    return API.get(API_ENDPOINTS.GET_POPULAR_TV_MEDIA);
  },

  editPopularTVMedia: (populartv_id, formdata) => {
    return API.put(API_ENDPOINTS.EDIT_POPULAR_TV_MEDIA + '/' + populartv_id, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deletePopularTVMedia: media_id => {
    return API.delete(API_ENDPOINTS.DELETE_POPULAR_TV_MEDIA + '/' + media_id);
  },

  //CONTACT INFO

  getContactInfo: () => {
    return API.get(API_ENDPOINTS.GET_CONTACT_INFO);
  },

  addContactInfo: (contact_person_name, contact_person_number, contact_mail, customer_care_number) => {
    return API.post(API_ENDPOINTS.ADD_CONTACT_INFO, {
      contact_person_name: contact_person_name,
      contact_person_number: contact_person_number,
      contact_mail: contact_mail,
      customer_care_number: customer_care_number
    });
  },

  editContactInfo: (contact_person_name, contact_person_number, contact_mail, customer_care_number, id) => {
    return API.put(
      API_ENDPOINTS.EDIT_CONTACT_INFO + '/' + id,
      {
        contact_person_name: contact_person_name,
        contact_person_number: contact_person_number,
        contact_mail: contact_mail,
        customer_care_number: customer_care_number
      },
    );
  },

  deleteContactInfo: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_CONTACT_INFO + '?id=' + id,
    );
  },

  // customer user

  addCustomerUser: (
    username,
    password,
    email,
    name,
    phone,
    country,
    address,
    areaCode,
    company,
    website,
    mac,
    mobile,
    sessionLimit,
  ) => {
    return API.post(API_ENDPOINTS.ADD_CUS_USER, {
      username: username,
      email: email,
      password: password,
      name: name,
      phone: phone,
      country: country,
      address: address,
      areaCode: areaCode,
      company: company,
      website: website,
      macs: mac,
      mobile: mobile,
      sessionLimit: sessionLimit,
    });
  },

  getCustomerUser: () => {
    return API.get(API_ENDPOINTS.GET_CUS_USER);
  },

  getOnlineUser: () => {
    return API.get(API_ENDPOINTS.GET_ONLINE_USERS);
  },

  getTriggerList: () => {
    return API.get(API_ENDPOINTS.GET_TRIGGER_LIST);
  },

  postTriggerList: data => {
    return API.post(API_ENDPOINTS.POST_TRIGGER_LIST, data);
  },

  DeleteTriggerList: data => {
    return API.delete(API_ENDPOINTS.DELETE_TRIGGER_LIST + '?id=' + data);
  },

  getChannelViews: () => {
    return API.get(API_ENDPOINTS.GET_CHANNEL_VIEWS);
  },

  getDetailedChannelViews: id => {
    return API.get(API_ENDPOINTS.GET_DETAILED_CHANNEL_VIEWS + id);
  },

  getMailList: () => {
    return API.get(API_ENDPOINTS.GET_MAIL_LIST);
  },
  postMailList: data => {
    return API.post(API_ENDPOINTS.POST_MAIL_LIST, data);
  },

  editCustomerUser: (
    id,
    Name,
    Username,
    Password,
    Email,
    country,
    Company,
    Website,
    Phone,
    Address,
    mac,
    areaCode,
    mobileType,
    sessionLimit,
  ) => {
    return API.put(API_ENDPOINTS.EDIT_CUS_USER + '?userId=' + id, {
      username: Username,
      email: Email,
      password: Password,
      name: Name,
      phone: Phone,
      country: country,
      address: Address,
      company: Company,
      website: Website,
      macs: mac,
      areaCode: areaCode,
      mobile: mobileType,
      sessionLimit: sessionLimit,
    });
  },

  deleteCustomerUser: userId => {
    return API.delete(API_ENDPOINTS.DELETE_CUS_USER + '?userId=' + userId);
  },

  // user package

  addUserPackage: data => {
    return API.post(API_ENDPOINTS.ADD_USER_PACKAGE, data);
  },

  getUserPackage: () => {
    return API.get(API_ENDPOINTS.GET_USER_PACKAGE);
  },

  getUserPackageActivation: activationCode => {
    return API.get(
      API_ENDPOINTS.GET_USER_PACKAGE_ACTIVATION + '/' + activationCode,
    );
  },

  editUserPackage: (
    Period,
    startDate,
    enabled,
    userId,
    activationCode,
    packageId,
  ) => {
    return API.put(
      API_ENDPOINTS.EDIT_USER_PACKAGE + '?activationCode=' + activationCode,
      {
        period: Period,
        startDate: startDate,
        enabled: enabled,
        userId: userId,
        packageId: packageId,
      },
    );
  },

  deleteUserPackage: activationCode => {
    return API.delete(
      API_ENDPOINTS.DELETE_USER_PACKAGE + '?activationCode=' + activationCode,
    );
  },

  // Fingerprint

  getFingerprint: () => {
    return API.get(API_ENDPOINTS.GET_FINGERPRINT);
  },

  DeleteFingerprint: sno => {
    return API.delete(API_ENDPOINTS.DELETE_FINGERPRINT + '?sno=' + sno);
  },

  // Reports & Logs

  getPackagesWiseActive: () => {
    return axios.get(`${API_ENDPOINTS.GET_PACKAGE}?&export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },

  getPackagesWiseDeactive: () => {
    return axios.get(
      `${API_ENDPOINTS.GET_PACKAGE}?status=deactivated&export=xlsx`,
      {
        responseType: 'arraybuffer',
      },
    );
  },
  getHistoryPackagesWise: date => {
    return axios.get(
      `${API_ENDPOINTS.GET_HISTORICAL_PACKAGE}?date=${date}&export=xlsx`,
      {
        responseType: 'arraybuffer',
      },
    );
  },

  getSubscribers: status => {
    return axios.get(
      `${API_ENDPOINTS.GET_SUBSCRIBER}?status=${status}&export=xlsx`,
      {
        responseType: 'arraybuffer',
      },
    );
  },

  getDayWiseSubscribers: (date, status) => {
    return axios.get(
      `${API_ENDPOINTS.GET_SUBSCRIBER}?date=${date}&status=${status}&export=xlsx`,
      {
        responseType: 'arraybuffer',
      },
    );
  },

  getReportCount: (date, report) => {
    return axios.get(
      `${API_ENDPOINTS.GET_COUNT}?date=${date}&report=${report}&export=xlsx`,
      {
        responseType: 'arraybuffer',
      },
    );
  },

  getBlacklist: () => {
    return axios.get(`${API_ENDPOINTS.GET_BLACKLIST}?export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },

  getPackageComposition: () => {
    return axios.get(`${API_ENDPOINTS.GET_PACKAGE_COMPOSITION}?export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },

  getChannelLogs: () => {
    return axios.get(`${API_ENDPOINTS.GET_CHANNEL_LOGS}?export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },

  getActivityLogs: () => {
    return axios.get(`${API_ENDPOINTS.GET_ACTIVITY_LOGS}?export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },

  getPackageLogs: () => {
    return axios.get(`${API_ENDPOINTS.GET_PACKAGE_LOGS}?export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },

  getFingerprintLog: () => {
    return axios.get(`${API_ENDPOINTS.GET_FINGERPRINT_LOG}?export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },
  getChannelLog: () => {
    return axios.get(`${API_ENDPOINTS.GET_CHANNEL_LOG}?export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },
  getAllLog: () => {
    return axios.get(`${API_ENDPOINTS.GET_ALL_LOG}?export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },
  getMailLog: () => {
    return axios.get(`${API_ENDPOINTS.GET_MAIL_LOG}?export=xlsx`, {
      responseType: 'arraybuffer',
    });
  },
  getUserLog: userId => {
    let baseUrl;
    if (userId) {
      baseUrl = `${API_ENDPOINTS.GET_USER_LOG}?customerId=${userId}&export=xlsx`;
    } else {
      baseUrl = `${API_ENDPOINTS.GET_USER_LOG}?export=xlsx`;
    }

    return axios.get(baseUrl, {
      responseType: 'arraybuffer',
    });
  },

  getPackageActivationDeactivationLog: () => {
    return axios.get(
      `${API_ENDPOINTS.GET_PACKAGE_ACTIVATION_DEACTIVATION_LOG}?export=xlsx`,
      {
        responseType: 'arraybuffer',
      },
    );
  },

  // Reports & Logs end

  getTMDBSearch: query => {
    return API.get(
      `${EXTERNAL_API_ENDPOINTS.SEARCH_TMDB_MOVIES}?api_key=${TMDB_API_KEY}&language=en&query=${query}`,
    );
  },
  getTMDBMovieData: id => {
    return API.get(
      `${EXTERNAL_API_ENDPOINTS.GET_TMDB_MOVIE_DETAILS}/${id}?api_key=${TMDB_API_KEY}&language=en&append_to_response=credits`,
    );
  },

  // TV

  getTMDBTvSearch: query => {
    return API.get(
      `${EXTERNAL_API_ENDPOINTS.SEARCH_TMDB_TV}?api_key=${TMDB_API_KEY}&language=en&query=${query}`,
    );
  },
  getTMDBTVData: id => {
    return API.get(
      `${EXTERNAL_API_ENDPOINTS.GET_TMDB_TV_DETAILS}/${id}?api_key=${TMDB_API_KEY}&language=en&append_to_response=credits`,
    );
  },

  // USING ID
  getTMDBMovieId: id => {
    return API.get(
      `${EXTERNAL_API_ENDPOINTS.GET_TMDB_MOVIE_DETAILS_ID}/${id}?api_key=${TMDB_API_KEY}&language=en&append_to_response=credits`,
    );
  },

  getTMDBTvId: id => {
    return API.get(
      `${EXTERNAL_API_ENDPOINTS.GET_TMDB_TV_DETAILS_ID}/${id}?api_key=${TMDB_API_KEY}&language=en&append_to_response=credits`,
    );
  },

  setFlussonicStream: payload => {
    return axios.put(
      `${EXTERNAL_API_ENDPOINTS.FLUSONIC_STREAMS}${payload.name}`,
      payload,
      {
        headers: {
          Authorization: 'Basic YWRtaW46bWFuaTIzMDY=',
          'Content-Type': 'application/json',
        },
      },
    );
  },

  // editSodMedia: (sod_id, formdata) => {
  //   return API.put(API_ENDPOINTS.EDIT_SOD_MEDIA + '/' + sod_id, formdata, {
  //     [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
  //   });
  // },

  getResellers: () => {
    return API.get(API_ENDPOINTS.GET_RESELLERS);
  },
  getCustomerResellers: id => {
    return API.get(API_ENDPOINTS.GET_CUSTOMER_BY_RESELLER + id);
  },
  getFingerprintChannels: () => {
    return API.get(API_ENDPOINTS.GET_FINGERPRINT_CHANNEL);
  },

  //EPG

  addEPG: (name, channels, source, serverRecorder, timing) => {
    return API.post(API_ENDPOINTS.ADD_EPG, {
      name: name,
      channelId: channels,
      source: source,
      allowRecord: serverRecorder,
      timing: timing,
    });
  },

  editEPG: (name, channels, source, serverRecorder, timing) => {
    return API.put(API_ENDPOINTS.PUT_EPG + '/' + channels, {
      name: name,
      channelId: channels,
      source: source,
      allowRecord: serverRecorder,
      timing: timing,
    });
  },

  getEpgData: () => {
    return API.get(API_ENDPOINTS.GET_EPG);
  },
  getDetailedEpgData: id => {
    return API.get(`${API_ENDPOINTS.GET_EPG_PROGRAM}/${id}`);
  },

  deleteEPG: channel_id => {
    return API.delete(API_ENDPOINTS.DELETE_EPG + '/' + channel_id);
  },

  // Advertisement

  getAdvertisment: () => {
    return API.get(`${API_ENDPOINTS.GET_ADVERTISMENT}`);
  },

  addAdvertisment: formdata => {
    return API.post(API_ENDPOINTS.POST_ADVERTISMENT, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteAdvertisement: ids => {
    return API.delete(API_ENDPOINTS.DELETE_ADVERTISMENT + '/?adId=' + ids);
  },

  postFingerprint: (
    text,
    resellerId,
    userId,
    channelId,
    time,
    bg_color,
    font_color,
    font_size,
    font_text,
    x_axis,
    y_axis,
    fingerprint_type,
    forced,
    udid,
    areaCode,
    timeInterval,
    repeatTimes,
    visibility,
    backgroundTransperncy,
  ) => {
    return API.post(API_ENDPOINTS.POST_FINGERPRINT, {
      text: text,
      resellerId: resellerId,
      userId: userId,
      packageId: channelId,
      duration: time,
      bg_color: bg_color,
      font_color: font_color,
      font_size: font_size,
      font_family: font_text,
      x_axis: x_axis,
      y_axis: y_axis,
      fingerprint_type: fingerprint_type,
      forced: forced ? 1 : 0,
      udid: udid ? 1 : 0,
      areaCode,
      timeInterval,
      repeatTimes,
      visibility,
      backgroundTransperncy,
    });
  },
  getEzServerInputAdapter: () => {
    return API.get(API_ENDPOINTS.GET_EZ_SERVER_INPUT_ADAPTER);
  },

  addBulkVod: formdata => {
    return API.post(API_ENDPOINTS.POST_BULK_VOD, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  addBulkLivetv: formdata => {
    return API.post(API_ENDPOINTS.POST_BULK_LIVETV, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  addBulkOtt: formdata => {
    return API.post(API_ENDPOINTS.POST_BULK_OTT, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },
  addBulkMod: formdata => {
    return API.post(API_ENDPOINTS.POST_BULK_MOD, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },
  addBulkSod: formdata => {
    return API.post(API_ENDPOINTS.POST_BULK_SOD, formdata, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },
  getBulkVod: () => {
    return API.get(API_ENDPOINTS.GET_BULK_VOD);
  },

  getBulkMod: () => {
    return API.get(API_ENDPOINTS.GET_BULK_MOD);
  },

  getBulkLivetv: formdata => {
    return API.get(API_ENDPOINTS.GET_BULK_LIVETV);
  },

  getBulkOtt: () => {
    return API.get(API_ENDPOINTS.GET_BULK_OTT);
  },
};

export default apis;
