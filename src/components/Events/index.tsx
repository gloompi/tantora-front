import React, { FC } from 'react'
import MainScreen from '../Home/MainScreen'
import Search from '../Home/Search'
import Events from './events'

const Exhibitions: FC = () => (
  <div>
    <MainScreen />
    <Search />
    <Events />
  </div>
)

export default Exhibitions;