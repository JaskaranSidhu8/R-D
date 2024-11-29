'use client';
import React, { useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import Home from './Home';
import { useState } from 'react';

const App = () => {

  const [home, setHome] = useState<JSX.Element>();

  useEffect(() => {
    setTimeout( () =>
      setHome( <Home />)
    , 1000) 
  });

  return (
  <APIProvider apiKey="AIzaSyDbtOz7Df5lEKdXeZQpamwHKt_tpfQGyLo">
   {home}
  </APIProvider>
  )
};

export default App;
