'use client'

import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, ControlPosition, Map} from '@vis.gl/react-google-maps';

import ControlPanel from './control-panel';
import {CustomMapControl} from './map-control';
import MapHandler from './map-handler';

const API_KEY = 'AIzaSyD2uraZOYpS1F15bbxD6qvqPAmkaXGAbsY'
  //globalThis.GOOGLE_MAPS_API_KEY ?? (process.env.GOOGLE_MAPS_API_KEY as string);

export type AutocompleteMode = {id: string; label: string};

const autocompleteModes: Array<AutocompleteMode> = [
  {id: 'classic', label: 'Google Autocomplete Widget'},
  {id: 'custom', label: 'Custom Build'},
  {id: 'custom-hybrid', label: 'Custom w/ Select Widget'}
];

const App = () => {
  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
    useState<AutocompleteMode>(autocompleteModes[0]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const [mapComponent, setMapComponent] = useState<JSX.Element>();

  useEffect( () => {
      setTimeout( () => {
        setMapComponent(<>
        <APIProvider apiKey={API_KEY}>
          <div className='w-screen h-screen'>

          <Map
            zoom={3}
            defaultCenter={{lat: 22.54992, lng: 0}}
            
          />
     </div>
        
          <ControlPanel
            autocompleteModes={autocompleteModes}
            selectedAutocompleteMode={selectedAutocompleteMode}
            onAutocompleteModeChange={setSelectedAutocompleteMode}
          /> 

        <CustomMapControl
            controlPosition={ControlPosition.LEFT}
            selectedAutocompleteMode={selectedAutocompleteMode}
            onPlaceSelect={setSelectedPlace}
          />
          
      <MapHandler place={selectedPlace} />

      </APIProvider>
    </>);

      }, 1000);
  }, []);

  return (
    <>

      {mapComponent}

      </>

  
  );
};


export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(<App />);
}

