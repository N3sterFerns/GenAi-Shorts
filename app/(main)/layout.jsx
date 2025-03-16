"use client"
import React from 'react'
import DashboardProvider from './Provider'

const DashboardLayout = ({children}) => {
  return (
    <div>
        <DashboardProvider>
            {children}
        </DashboardProvider>
    </div>
  )
}

export default DashboardLayout