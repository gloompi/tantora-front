import React, { FC } from 'react'
import MainScreen from '../@common/MainScreen';
import About from './about'

const image = require('../../assets/images/exhibition.jfif');


const Exhibition: FC = () => (
  <div>
    <MainScreen bgSrc={image} title="Exhibition Name" />
    <About />

  </div>
)

export default Exhibition;