import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import ProfileEditForm from '../common/ProfileEditForm';
import PasswordEditForm from '../common/PasswordEditForm';
export default function ProfileView() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            onChange={handleChange}
            aria-label="Profile tabs"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="General" value="1" />
            <Tab label="Security" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProfileEditForm />
        </TabPanel>
        <TabPanel value="2">
          <PasswordEditForm />
        </TabPanel>
      </TabContext>
    </Card>
  );
}
