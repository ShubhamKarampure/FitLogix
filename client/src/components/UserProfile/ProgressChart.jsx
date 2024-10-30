import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {  Box, Heading } from '@chakra-ui/react'

const ProgressChart = ({ progressData, orangeColor }) => (
  <Box borderWidth={1} borderRadius="lg" p={6}>
    <Heading as="h3" size="md" mb={4}>Progress</Heading>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={progressData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke={orangeColor} />
      </LineChart>
    </ResponsiveContainer>
  </Box>
)

export default ProgressChart
