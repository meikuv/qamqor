import React from 'react'
import { useUser } from '../../hooks/useUser'
import DefaultLayout from '../../components/layout/DefaultLayout'
import Header from './components/Header'
import Content from './components/Content'

const Profile = () => {
  const { user } = useUser()

  return (
    <DefaultLayout bgColor="bg-white">
      <Header user={user} />
      <Content />
    </DefaultLayout>
  )
}

export default Profile
