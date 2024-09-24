/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import _ from 'lodash';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from 'styles/global-styles';
import Navbar from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import PrivateRoute from './components/PrivateRoutes';
import AdminUserManage from './pages/Admin/AdminUserManage/AdminUserManage';
import AddAppUpdates from './pages/Admin/AppUpdate/AddUpdates';
import AppUpdates from './pages/Admin/AppUpdate/ListUpdates';

import EditAdmin from './pages/Admin/EditAdmin/EditAdmin';
import EditUser from './pages/Admin/EditAdminUser/EditAdminUser';
import NewUser from './pages/Admin/NewUser/NewUser';
import SystemInformation from './pages/Admin/SystemInformation';
import Dashboard from './pages/Dashboard';
import Backup from './pages/Admin/DatabaseBackup/backup';
import WebUrl from './pages/Admin/WebUrl/AddEditWebUrl';
import ListWebUrl from './pages/Admin/WebUrl/ListWebUrl';
import AddFingerPrint from './pages/Fingerprint/AddFingerprint/AddFingerprint';
import Fingerprint from './pages/Fingerprint/Fingerprint/Fingerprint';
import Mail from './pages/Fingerprint/Mail';
import ComposeMail from './pages/Fingerprint/Mail/ComposeMail';
import AddChannelCategories from './pages/LiveStreams/AddChannelCategory/AddChannelCategories';
import AddChannelStreams from './pages/LiveStreams/AddChannelStream/AddChannelStreams';
import AddChannelPackage from './pages/LiveStreams/AddManagePackage/AddManagePackage';
import ChannelCategories from './pages/LiveStreams/Channelcategory/ChannelCategories';
import ChannelStreams from './pages/LiveStreams/ChannelStream/ChannelStreams';
import EditChannelCategories from './pages/LiveStreams/EditChannelCategory/EditChannelCategories';
import EditChannelPackage from './pages/LiveStreams/EditChannelPackage/EditChannelPackage';
import EditChannelStreams from './pages/LiveStreams/EditChannelStream/EditChannelStreams';
import AddEditEPG from './pages/LiveStreams/EPG/AddEditEPG';
import EPG from './pages/LiveStreams/EPG/EPG';
import ManagePackageStreams from './pages/LiveStreams/ManagePackage/ManagePackage';
import Login from './pages/Login';
import AddMODCategories from './pages/MediaOnDemand/AddModCategory/AddModCategories';
import AddMODMedia from './pages/MediaOnDemand/AddModMedia/AddModMedia';
import AddMODPackage from './pages/MediaOnDemand/AddModPackage/AddModPackage';
import EditMODCategories from './pages/MediaOnDemand/EditModCategory/EditModCategories';
import EditMODMedia from './pages/MediaOnDemand/EditModMedia/EditModMedia';
import EditMODPackage from './pages/MediaOnDemand/EditModPackage/EditModPackage';
import MODCategories from './pages/MediaOnDemand/ModCategory/ModCategories';
import DenseTable from './pages/MediaOnDemand/ModCategory/Table';
import MODManagePackage from './pages/MediaOnDemand/ModManagePackage/ModManagePackage';
import MODMedia from './pages/MediaOnDemand/ModMedia/ModMedia';
import AddEditOttCategory from './pages/Ott/Category/AddEditCategory';
// ott import
import OTTCategories from './pages/Ott/Category/ListCategory';
import AddEditOTTChannels from './pages/Ott/Channel/AddEditChannel';
import OTTChannels from './pages/Ott/Channel/ListChannel';
import OTTProviders from './pages/Ott/Providers/ListProviders';
import AddEditOTTProviders from './pages/Ott/Providers/AddOTTProviders'

// App Store
import AppStoreCategories from './pages/AppStore/Category/AppStoreListCategory';
import AddEditAppStoreCategories from './pages/AppStore/Category/AddEditAppStoreCategory';
import AppStoreUpload from './pages/AppStore/AppUpload/AppStoreUpload';
import ListAppUpload from './pages/AppStore/AppUpload/ListAppUpload';

import Logs from './pages/ReportsLogs/Log/Logs';
import Reports from './pages/ReportsLogs/Report/Reports';
import ReportTable from './pages/ReportsLogs/ReportTable';
import AddSODCategories from './pages/SeriosOnDemand/AddSodCategory/AddSodCategories';
import SODProviders from './pages/SeriosOnDemand/SODProviders/SODProviders';
import AddEditSODProviders from './pages/SeriosOnDemand/AddEditSODProviders/AddEditSODProviders';
import AddSODMedia from './pages/SeriosOnDemand/AddSodMedia/AddSodMedia';
import AddSODPackage from './pages/SeriosOnDemand/AddSodPackage/AddSodPackage';
import EditSODCategories from './pages/SeriosOnDemand/EditSodCategory/EditSodCategories';
import EditSODMedia from './pages/SeriosOnDemand/EditSodMedia/EditSodMedia';
import EditSODPackage from './pages/SeriosOnDemand/EditSodPackage/EditSodPackage';
import SODCategories from './pages/SeriosOnDemand/SodCategory/SodCategories';
import SODManagePackage from './pages/SeriosOnDemand/SodManagePackage/SodManagePackage';
import SODMedia from './pages/SeriosOnDemand/SodMedia/SodMedia';
import SODGenre from './pages/SeriosOnDemand/SodGenre/SodGenre';
import AddSODGenre from './pages/SeriosOnDemand/AddSodGenre/AddSodGenre';
import EditSODGenre from './pages/SeriosOnDemand/EditSodGenre/EditSodGenres';
import SODLanguage from './pages/SeriosOnDemand/SodLanguage/SODLanguage';
import AddSODLanguage from './pages/SeriosOnDemand/AddSodLanguage/AddSodLanguage';
import EditSODLanguage from './pages/SeriosOnDemand/EditSodLanguage/EditSodLanguage';
import DRMWaitList from './pages/Admin/DRMWhiteList/DRMWhitelist/DrmWaitlist';
import AddDRMWaitList from './pages/Admin/DRMWhiteList/AddDRMWhiteList/AddDrmWaitList';

import OnlineUsers from './pages/Statistics/OnlineUsers';
import Triggers from './pages/Statistics/Triggers';
import CreateTriggers from './pages/Statistics/Triggers/create-triggers';
import ChannelViews from './pages/Statistics/ChannelViews';
import UserPackageDetails from './pages/SubscriberManage/UserPackageDetails/UserPackageDetails';
import SubscriberUser from './pages/SubscriberManage/Users/Users';
import AddVODCategories from './pages/VideoOnDemand/AddVodCategory/AddVodCategories';
import VODProviders from './pages/VideoOnDemand/VODProviders/VODProviders';
import AddEditVODProviders from './pages/VideoOnDemand/AddEditVODProviders/AddEditVODProviders';
import AddVODMedia from './pages/VideoOnDemand/AddVodMedia/AddVodMedia';
import AddVODPackage from './pages/VideoOnDemand/AddVodPackage/AddVodPackage';
import EditVODCategories from './pages/VideoOnDemand/EditVodCategory/EditVodCategories';
import EditVODMedia from './pages/VideoOnDemand/EditVodMedia/EditVodMedia';
import EditVODPackage from './pages/VideoOnDemand/EditVodPackage/EditVodPackage';
import VODCategories from './pages/VideoOnDemand/VodCategory/VodCategories';
import VODManagePackage from './pages/VideoOnDemand/VodManagePackage/VodManagePackage';
import VODMedia from './pages/VideoOnDemand/VodMedia/VodMedia';
import VODLanguage from './pages/VideoOnDemand/VodLanguage/VodLanguage';
import AddVODLanguage from './pages/VideoOnDemand/AddVodLanguage/AddVodLanguage';
import EditVODLanguage from './pages/VideoOnDemand/EditVodLanguage/EditVodLanguage';
import VODGenre from './pages/VideoOnDemand/VodGenre/VodGenre';
import AddVODGenre from './pages/VideoOnDemand/AddVodGenre/AddVodGenre';
import EditVODGenre from './pages/VideoOnDemand/EditVodGenre/EditVodGenres';

import NewSubscriberUser from './pages/SubscriberManage/AddNewUser/AddNewUser';
import EditSubscriberUser from './pages/SubscriberManage/EditNewUser/EditNewUser';
import EditUserPackage from './pages/SubscriberManage/EditUserPackage/EditUserPackage';
import AssignPackage from './pages/SubscriberManage/AssignPackage/AssignPackage';
import ListAds from './pages/Advertisment/ListAds';
import AddEditAds from './pages/Advertisment/AddEditAds';
import Bulk from './pages/Bulk/Bulk';
import AddEditAppTVCategories from './pages/AppTV/AddEditAppTVCategory/AddEditAppTVCategories';
import AppTVCategories from './pages/AppTV/AppTVCategory/AppTVCategories';
import AppTVProviders from './pages/AppTV/AppTVProviders/AppTVProviders';
import AddEditAppTVProviders from './pages/AppTV/AddEditAppTVProviders/AddEditAppTVProviders';
import AppTVMedia from './pages/AppTV/AppTVMedia/AppTVMedia';
import AddEditAppTVMedia from './pages/AppTV/AddEditAppTVMedia/AddEditAppTVMedia';

import ViewTuneVersion from './pages/Admin/TuneVersion/ViewTuneVersion/viewTuneVersion';
import AddEditTuneVersion from './pages/Admin/TuneVersion/AddEditTuneVersion/AddEditTuneVersion';
//PopularTV

import PopularTVCategories from './pages/PopularTV/PopularTVCategory/PopularTVCategory';
import PopularTVProviders from './pages/PopularTV/PopularTVProvider/PopularTVProvider';
import PopularTVMedia from './pages/PopularTV/PopularTVMedia/PopularTVMedia';
import AddEditPopularTVCategories from './pages/PopularTV/AddEditPopularTVCategory/AddEditPopularTVCategory';
import AddEditPopularTVProviders from './pages/PopularTV/AddEditPopularTVProviders/AddEditPopularTVProviders';
import AddEditPopularTVMedia from './pages/PopularTV/AddEditPopularTVMedia/AddEditPopularTVMedia';

import AddEditUserEngineering from './pages/Admin/UserEngineering/AddEditUserEngineering/AddEditUserEngineering';
import ViewListUserEngineering from './pages/Admin/UserEngineering/ViewUserEngineering/viewUserEngineering';

import ChannelStatus from './pages/EZserver/ChannelStatus';
import EZserverData from './pages/EZserver/EZserverData/EZserverData';
import AddEditEZserverData from './pages/EZserver/EZserverData/AddEditEZserverData';

import ViewSystemUptime from './pages/EZserver/ViewSystemUptime/ViewSystemUptime';

import AddEditNetIP from './pages/Admin/NetIP/AddEditNetIP/AddEditNetIP';
import ViewNetIP from './pages/Admin/NetIP/ViewNetIP/ViewNetIP';

import ListEducationCategory from './pages/Educational/Category/ListEduCategory';
import AddEditEducationCategories from './pages/Educational/Category/AddEditEduCategory';

import ListEDUCATIONProviders from './pages/Educational/Providers/ListProviders';
import AddEditEDUCATIONProviders from './pages/Educational/Providers/AddEDUProviders';

import Language from './pages/Admin/Language/Language';

import ListEDUCATION from './pages/Educational/Education/ListEducation';
import AddEDUCATION from './pages/Educational/Education/AddEducation';
import EditEducation from './pages/Educational/Education/EditEducation';

import ListEducationBoard from './pages/Educational/Board/ListBoard';
import ListContactInfo from './pages/ReportsLogs/ContactInfo/ListContactInfo';
import AddEditEducationBoard from './pages/Educational/Board/AddEditEducationBoard';
import AddEditContactInfo from './pages/ReportsLogs/ContactInfo/AddEditContactInfo';
import AddTermsAndCondition from './pages/Admin/SystemInformation/AddTermsAndConditions';
// SMS-Users

import SmsUsers from './pages/SmsUser/SmsUser';
import SmsUserDashboard from './pages/SmsUser/Dashboard/SmsUserDashboard';
import ListDevotionalCategory from './pages/Devotional/DevotionalCategory/listDevotionalCategory';
import AddEditDevotionalCategories from './pages/Devotional/DevotionalCategory/AddEditDevotionalCategory';
import ListLocation from './pages/Devotional/Location/ListLocation';
import AddEditLocation from './pages/Devotional/Location/AddEditLocation';
import ListDevotionalProviders from './pages/Devotional/Providers/ListDevotionalProdivers';
import AddEditDevotionalProviders from './pages/Devotional/Providers/AddEditDevotionalProviders';
import ListReligious from './pages/Devotional/Religious/ListReligious';
import AddEditReligious from './pages/Devotional/Religious/AddEditReligious';
import ListDevotionals from './pages/Devotional/Devotionals/ListDevotionals';
import AddDevotionals from './pages/Devotional/Devotionals/AddDevotionals';
import EditDevotionals from './pages/Devotional/Devotionals/EditDevotionals';
import ListServerLogs from './pages/Admin/ServerLogs/ListServerLogs';
import ListAccessLogs from './pages/Admin/AccessLogs/AccessLogs';
import ListPartner from './pages/Admin/Partner/ListPartner';
import AddEditPartner from './pages/Admin/Partner/AddEditPartner/AddEditPartner';
import DevotionalBulkUpload from './pages/Devotional/DevotionalBulkUpload/DevotionalBulkUpload';
import ViewLandingChannels from './pages/LiveStreams/LandingChannels/ViewLandingChannels';
import AddEditLandingChannels from './pages/LiveStreams/LandingChannels/AddEditLandingChannels';
export function App() {
  const { i18n } = useTranslation();
  const isLoading = useSelector(state => _.get(state, 'session.isLoading'));
  let isSelfSigned = process.env.REACT_APP_SELF;

  return (
    <BrowserRouter basename="/admin">
      <Helmet
        titleTemplate="%s - SDS IPTV"
        defaultTitle="SDS IPTV"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="SDS IPTV admin panel" />
      </Helmet>
      <LoadingOverlay active={isLoading} spinner text="Loading ...">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route path="/login" component={Login} />


          {/* <PrivateRoute path="/das" component={Dashboard} /> */}
          <PrivateRoute path="/navbar" component={Navbar} />
          <PrivateRoute exact path="/" component={Dashboard} />

          <Route exact path="/smsuser" component={SmsUsers} />

          <PrivateRoute
            path="/SystemInformation"
            component={SystemInformation}
          />
          <PrivateRoute path="/AdminUsers" component={AdminUserManage} />
          <PrivateRoute path="/EditAdmin" component={EditAdmin} />
          <PrivateRoute path="/NewUser" component={NewUser} />
          <PrivateRoute path="/EditUser" component={EditUser} />
          <PrivateRoute path="/Backup" component={Backup} />
          <PrivateRoute path="/Subscribers" component={SubscriberUser} />
          <PrivateRoute path="/TermsAndConditions" component={AddTermsAndCondition} />
          {/* <PrivateRoute path="/GeneralSettings" component={GeneralSettings} />  */}

          <PrivateRoute path="/ChannelStatus" component={ChannelStatus} />
          <PrivateRoute path="/ServerLogs" component={ListServerLogs} />

          <PrivateRoute path="/ViewSystemUptime" component={ViewSystemUptime} />

          <PrivateRoute path="/AccessLogs" component={ListAccessLogs} />

          <PrivateRoute
            path="/DevotionalBulkUpload"
            component={DevotionalBulkUpload}
            pageMode="add"
          />

          <PrivateRoute
            path="/SourceIP"
            component={ViewNetIP}
          />
          <PrivateRoute
            path="/AddSourceIP"
            component={AddEditNetIP}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditSourceIP"
            component={AddEditNetIP}
            pageMode="edit"
          />

          <PrivateRoute
            path="/ChannelData"
            component={EZserverData}
          />
          <PrivateRoute
            path="/AddChannelData"
            component={AddEditEZserverData}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditChannelData"
            component={AddEditEZserverData}
            pageMode="edit"
          />

          <PrivateRoute
            path="/UserPackageDetails"
            component={UserPackageDetails}
          />

          <PrivateRoute
            path="/ChannelCategories"
            component={ChannelCategories}
          />
          <PrivateRoute
            path="/AddChannelCategories"
            component={AddChannelCategories}
          />
          <PrivateRoute
            path="/EditChannelCategories"
            component={EditChannelCategories}
          />
          <PrivateRoute path="/listweburl" component={ListWebUrl} />

          <PrivateRoute
            path="/Addweburl"
            component={WebUrl}
            pageMode="add"
          />
          <PrivateRoute
            path="/Editweburl"
            component={WebUrl}
            pageMode="edit"
          />
          <PrivateRoute path="/DRMWaitlist" component={DRMWaitList} />
          <PrivateRoute path="/AddDRMWaitlist" component={AddDRMWaitList} />
          {/* <PrivateRoute
            path="/EditSODCategories"
            component={EditSODCategories}
          /> */}
          <PrivateRoute path="/ChannelStreams" component={ChannelStreams} />
          <PrivateRoute
            path="/AddChannelStreams"
            component={AddChannelStreams}
          />
          <PrivateRoute
            path="/EditChannelStreams"
            component={EditChannelStreams}
          />
          <PrivateRoute
            path="/ManagePackageStreams"
            component={ManagePackageStreams}
          />
          <PrivateRoute
            path="/AddChannelPackage"
            component={AddChannelPackage}
          />
          <PrivateRoute
            path="/EditChannelPackage"
            component={EditChannelPackage}
          />

          {/* LANDING CHANNELS */}

          <PrivateRoute
            path="/LandingChannel"
            component={ViewLandingChannels}
          />
          <PrivateRoute
            path="/AddLandingChannels"
            component={AddEditLandingChannels}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditLandingChannels"
            component={AddEditLandingChannels}
            pageMode="edit"
          />

          <PrivateRoute path="/UserEngineerings" component={ViewListUserEngineering} />
          <PrivateRoute
            path="/AddUserEngineering"
            component={AddEditUserEngineering}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditUserEngineering"
            component={AddEditUserEngineering}
            pageMode="edit"
          />

          <PrivateRoute path="/viewTuneVersion" component={ViewTuneVersion} />
          <PrivateRoute
            path="/AddTuneVersion"
            component={AddEditTuneVersion}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditTuneVersion"
            component={AddEditTuneVersion}
            pageMode="edit"
          />

          <PrivateRoute path="/listContactInfo" component={ListContactInfo} />
          <PrivateRoute
            path="/AddContactInfo"
            component={AddEditContactInfo}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditContactInfo"
            component={AddEditContactInfo}
            pageMode="edit"
          />

          <PrivateRoute path="/EPG" component={EPG} />

          <PrivateRoute path="/AddEpg" component={AddEditEPG} pageMode="add" />

          <PrivateRoute
            path="/EditEpg"
            component={AddEditEPG}
            pageMode="edit"
          />

          <PrivateRoute path="/VODCategories" component={VODCategories} />
          <PrivateRoute path="/AddVODCategories" component={AddVODCategories} />
          <PrivateRoute
            path="/EditVODCategories"
            component={EditVODCategories}
          />

          <PrivateRoute path="/VODLanguage" component={VODLanguage} />
          <PrivateRoute path="/AddVODLanguage" component={AddVODLanguage} />
          <PrivateRoute
            path="/EditVODLanguage"
            component={EditVODLanguage}
          />

          <PrivateRoute path="/VODGenre" component={VODGenre} />
          <PrivateRoute path="/AddVODGenre" component={AddVODGenre} />
          <PrivateRoute
            path="/EditVODGenre"
            component={EditVODGenre}
          />

          <PrivateRoute path="/VODMedia" component={VODMedia} />
          <PrivateRoute path="/AddVODMedia" component={AddVODMedia} />
          <PrivateRoute path="/EditVODMedia" component={EditVODMedia} />
          <PrivateRoute path="/VODProviders" component={VODProviders} />
          <PrivateRoute
            path="/AddVODProviders"
            component={AddEditVODProviders}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditVODProviders"
            component={AddEditVODProviders}
            pageMode="edit"
          />
          <PrivateRoute path="/VODManagePackage" component={VODManagePackage} />
          <PrivateRoute path="/AddVODPackage" component={AddVODPackage} />
          <PrivateRoute path="/EditVODPackage" component={EditVODPackage} />

          <PrivateRoute path="/MODCategories" component={MODCategories} />
          <PrivateRoute path="/AddMODCategories" component={AddMODCategories} />
          <PrivateRoute
            path="/EditMODCategories"
            component={EditMODCategories}
          />
          <PrivateRoute path="/MODMedia" component={MODMedia} />
          <PrivateRoute path="/AddMODMedia" component={AddMODMedia} />
          <PrivateRoute path="/EditMODMedia" component={EditMODMedia} />
          <PrivateRoute path="/MODManagePackage" component={MODManagePackage} />
          <PrivateRoute path="/AddMODPackage" component={AddMODPackage} />
          <PrivateRoute path="/EditMODPackage" component={EditMODPackage} />

          <PrivateRoute path="/SODCategories" component={SODCategories} />
          <PrivateRoute path="/AddSODCategories" component={AddSODCategories} />
          <PrivateRoute
            path="/EditSODCategories"
            component={EditSODCategories}
          />

          <PrivateRoute path="/SODGenre" component={SODGenre} />
          <PrivateRoute path="/AddSODGenre" component={AddSODGenre} />
          <PrivateRoute
            path="/EditSODGenre"
            component={EditSODGenre}
          />

          <PrivateRoute path="/SODLanguage" component={SODLanguage} />
          <PrivateRoute path="/AddSODLanguage" component={AddSODLanguage} />
          <PrivateRoute
            path="/EditSODLanguage"
            component={EditSODLanguage}
          />

          <PrivateRoute path="/SODMedia" component={SODMedia} />
          <PrivateRoute path="/AddSODMedia" component={AddSODMedia} />
          <PrivateRoute path="/EditSODMedia" component={EditSODMedia} />
          <PrivateRoute path="/SODProviders" component={SODProviders} />
          <PrivateRoute
            path="/AddSODProviders"
            component={AddEditSODProviders}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditSODProviders"
            component={AddEditSODProviders}
            pageMode="edit"
          />
          <PrivateRoute path="/SODManagePackage" component={SODManagePackage} />
          <PrivateRoute path="/AddSODPackage" component={AddSODPackage} />
          <PrivateRoute path="/EditSODPackage" component={EditSODPackage} />

          {/* Education CATEGORY  */}

          <PrivateRoute path="/EDUCategory" component={ListEducationCategory} />
          <PrivateRoute
            path="/AddEDUCategory"
            component={AddEditEducationCategories}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditEDUCategory"
            component={AddEditEducationCategories}
            pageMode="edit"
          />

          {/* Education PROVIDER  */}

          <PrivateRoute path="/EDUProviders" component={ListEDUCATIONProviders} />
          <PrivateRoute
            path="/AddEDUProviders"
            component={AddEditEDUCATIONProviders}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditEDUProviders"
            component={AddEditEDUCATIONProviders}
            pageMode="edit"
          />

          {/* Education Board  */}

          <PrivateRoute path="/Board" component={ListEducationBoard} />

          <PrivateRoute
            path="/AddBoard"
            component={AddEditEducationBoard}
            pageMode="add"
          />

          <PrivateRoute
            path="/EditBoard"
            component={AddEditEducationBoard}
            pageMode="edit"
          />
          {/* Education  */}

          <PrivateRoute path="/Educations" component={ListEDUCATION} />
          <PrivateRoute
            path="/AddEducations"
            component={AddEDUCATION}
          />
          <PrivateRoute
            path="/EditEducations"
            component={EditEducation}
          />

          {/* Education PROVIDER  */}

          <PrivateRoute path="/ListPartner" component={ListPartner} />
          <PrivateRoute
            path="/AddPartner"
            component={AddEditPartner}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditPartner"
            component={AddEditPartner}
            pageMode="edit"
          />

          {/* Devotional CATEGORY  */}

          <PrivateRoute path="/DEVCategory" component={ListDevotionalCategory} />
          <PrivateRoute
            path="/AddDEVCategory"
            component={AddEditDevotionalCategories}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditDEVCategory"
            component={AddEditDevotionalCategories}
            pageMode="edit"
          />

          {/* Devotional Location  */}

          <PrivateRoute path="/Location" component={ListLocation} />
          <PrivateRoute
            path="/AddLocation"
            component={AddEditLocation}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditLocation"
            component={AddEditLocation}
            pageMode="edit"
          />

          {/* Devotional Religious  */}

          <PrivateRoute path="/Religious" component={ListReligious} />
          <PrivateRoute
            path="/AddReligious"
            component={AddEditReligious}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditReligious"
            component={AddEditReligious}
            pageMode="edit"
          />


          {/* Devotional PROVIDER  */}

          <PrivateRoute path="/DevotionalProviders" component={ListDevotionalProviders} />
          <PrivateRoute
            path="/AddDevotionalProviders"
            component={AddEditDevotionalProviders}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditDevotionalProviders"
            component={AddEditDevotionalProviders}
            pageMode="edit"
          />

          {/* DEVOTIONALS  */}

          <PrivateRoute path="/Devotional" component={ListDevotionals} />
          <PrivateRoute
            path="/AddDevotional"
            component={AddDevotionals}
          />
          <PrivateRoute
            path="/EditDevotional"
            component={EditDevotionals}
          />

          {/* LANGUAGE  */}

          <PrivateRoute path="/Language" component={Language} />

          {/* app updates  */}

          <PrivateRoute path="/AppUpdates" component={AppUpdates} />
          <PrivateRoute path="/AddAppUpdates" component={AddAppUpdates} />

          {/* ott  */}
          <PrivateRoute
            path="/AddOTTCategories"
            component={AddEditOttCategory}
            pageMode="add"
          />
          <PrivateRoute path="/OTTCategories" component={OTTCategories} />
          <PrivateRoute
            path="/EditOTTCategories"
            component={AddEditOttCategory}
            pageMode="edit"
          />

          <PrivateRoute
            path="/AddOTTChannels"
            component={AddEditOTTChannels}
            pageMode="add"
          />

          <PrivateRoute
            path="/EditOTTChannels"
            component={AddEditOTTChannels}
            pageMode="edit"
          />

          <PrivateRoute path="/OTTChannel" component={OTTChannels} />
          <PrivateRoute path="/OTTProviders" component={OTTProviders} />
          <PrivateRoute
            path="/AddOTTProviders"
            component={AddEditOTTProviders}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditOTTProviders"
            component={AddEditOTTProviders}
            pageMode="edit"
          />

          {/* App TV */}

          <PrivateRoute path="/AppTVCategories" component={AppTVCategories} />
          <PrivateRoute
            path="/AddAppTVCategories"
            component={AddEditAppTVCategories}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditAppTVCategories"
            component={AddEditAppTVCategories}
            pageMode="edit"
          />

          <PrivateRoute path="/AppTVProviders" component={AppTVProviders} />
          <PrivateRoute
            path="/AddAppTVProviders"
            component={AddEditAppTVProviders}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditAppTVProviders"
            component={AddEditAppTVProviders}
            pageMode="edit"
          />

          <PrivateRoute path="/AppTVMedia" component={AppTVMedia} />
          <PrivateRoute
            path="/AddAppTVMedia"
            component={AddEditAppTVMedia}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditAppTVMedia"
            component={AddEditAppTVMedia}
            pageMode="edit"
          />

          {/* POPULAR TV */}

          <PrivateRoute path="/PopularTVCategories" component={PopularTVCategories} />
          <PrivateRoute
            path="/AddPopularTVCategories"
            component={AddEditPopularTVCategories}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditPopularTVCategories"
            component={AddEditPopularTVCategories}
            pageMode="edit"
          />

          <PrivateRoute path="/PopularTVProviders" component={PopularTVProviders} />
          <PrivateRoute
            path="/AddPopularTVProviders"
            component={AddEditPopularTVProviders}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditPopularTVProviders"
            component={AddEditPopularTVProviders}
            pageMode="edit"
          />

          <PrivateRoute path="/PopularTVMedia" component={PopularTVMedia} />
          <PrivateRoute
            path="/AddPopularTVMedia"
            component={AddEditPopularTVMedia}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditPopularTVMedia"
            component={AddEditPopularTVMedia}
            pageMode="edit"
          />

          {/* APP STORE */}

          <PrivateRoute path="/AppStoreCategory" component={AppStoreCategories} />
          <PrivateRoute
            path="/AddAppStoreCategories"
            component={AddEditAppStoreCategories}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditAppStoreCategories"
            component={AddEditAppStoreCategories}
            pageMode="edit"
          />
          <PrivateRoute path="/ListAppStoreUpload" component={ListAppUpload} />
          <PrivateRoute
            path="/AddAppStoreUpload"
            component={AppStoreUpload}
            pageMode="add"
          />
          <PrivateRoute
            path="/EditAppStoreUpload"
            component={AppStoreUpload}
            pageMode="edit"
          />

          {/* advertisments  */}
          <PrivateRoute path="/Advertisments" component={ListAds} />

          <PrivateRoute
            path="/AddAdvertisments"
            component={AddEditAds}
            pageMode="add"
          />

          {/* bulk operations  */}
          <PrivateRoute path="/Bulk" component={Bulk} />

          {/* mail  */}
          <PrivateRoute path="/Fingerprint" component={Fingerprint} />
          <PrivateRoute path="/AddFingerPrint" component={AddFingerPrint} />
          <PrivateRoute path="/Mail" component={Mail} />
          <PrivateRoute path="/compose-mail" component={ComposeMail} />

          <PrivateRoute path="/Logs" component={Logs} />
          <PrivateRoute path="/Reports" component={Reports} />
          <PrivateRoute path="/ReportTable" component={ReportTable} />

          <PrivateRoute path="/Table" component={DenseTable} />

          <PrivateRoute path="/OnlineUsers" component={OnlineUsers} />
          <PrivateRoute path="/Triggers" component={Triggers} />
          <PrivateRoute path="/create-triggers" component={CreateTriggers} />
          <PrivateRoute path="/ChannelViews" component={ChannelViews} />

          {isSelfSigned === 'true' && (
            <>
              <PrivateRoute
                path="/NewSubscriberUser"
                component={NewSubscriberUser}
              />
              <PrivateRoute
                path="/EditSubscriberUser"
                component={EditSubscriberUser}
              />
              <PrivateRoute
                path="/EditUserPackage"
                component={EditUserPackage}
              />
              <PrivateRoute path="/AssignPackage" component={AssignPackage} />
            </>
          )}
          <Route path="/smsdashboard" component={SmsUserDashboard}></Route>
          <Route component={NotFoundPage} />
        </Switch>
      </LoadingOverlay>

      <GlobalStyle />
    </BrowserRouter>
  );
}
