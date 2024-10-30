import React from 'react'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

const WorkoutHistory = () => (
  <Tabs>
    <TabList>
      <Tab>Recent</Tab>
      <Tab>Summary</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Type</Th>
              <Th>Duration</Th>
              <Th>Calories</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr><Td>Jun 15</Td><Td>Running</Td><Td>45 min</Td><Td>450</Td></Tr>
            <Tr><Td>Jun 14</Td><Td>Strength</Td><Td>60 min</Td><Td>320</Td></Tr>
          </Tbody>
        </Table>
      </TabPanel>
      <TabPanel>
        <Box>Total Workouts: 15</Box>
        <Box>Average Duration: 50 min</Box>
      </TabPanel>
    </TabPanels>
  </Tabs>
)

export default WorkoutHistory
