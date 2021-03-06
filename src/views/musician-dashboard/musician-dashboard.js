import React from 'react';
import {
  DashboardContent,
  DashboardNavigation,
  DashboardLayout,
} from 'src/components/common/dashbaord-layout';
import Sidebar, { SideNavItemDetail } from 'src/components/common/sidebar';
import { Navbar } from 'src/components/common';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import EventInvitations from './event-invitations';
import MyEventsPage from './my-applications';
import MusicianProfile from './musician-profile';
import CalendarPage from './calendar';
import PageRoleGuard from '../role-guard';
import { Roles } from 'src/components/common/guard';

const sidebarItems = [
  SideNavItemDetail('My Profile', '/musician/my-profile'),
  SideNavItemDetail('Calendar', '/musician/calendar'),
  // SideNavItemDetail("My Band", "/musician/my-band"),
  SideNavItemDetail('Event Invitations', '/musician/event-invitations'),
  SideNavItemDetail('Applied Events', '/musician/my-events'),
];

const MusicianDashboard = () => {
  // prefix path for dashboard
  const { url } = useRouteMatch();

  return (
    <div className='full-height'>
      <Navbar />
      <DashboardLayout>
        <DashboardNavigation>
          <Sidebar items={sidebarItems} />
        </DashboardNavigation>
        <DashboardContent>
          <Switch>
            <Route path={url + '/my-profile'}>
              <MusicianProfile />
            </Route>
            <Route path={url + '/calendar'}>
              <CalendarPage />
            </Route>
            <Route path={url + '/event-invitations'}>
              <EventInvitations />
            </Route>
            <Route path={url + '/my-events'}>
              <MyEventsPage />
            </Route>
            <Route path='/'>404 musician dashbaord</Route>
          </Switch>
        </DashboardContent>
      </DashboardLayout>
    </div>
  );
};

export default MusicianDashboard;
