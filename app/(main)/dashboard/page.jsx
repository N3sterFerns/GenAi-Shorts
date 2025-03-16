"use client"
import React from 'react'
import VideoList from './_components/VideoList'

const Dashboard = () => {
  return (
    <div>
      <h2 className='text-2xl xl:text-5xl font-semibold opacity-80'>My Dreams</h2>
      <div>
        <VideoList/>
      </div>
    </div>
  )
}

export default Dashboard