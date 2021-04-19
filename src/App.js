import Globe from 'react-globe.gl';
import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import covidStats from './covidStats.json'
import world_population from './datasets/world_population.csv'
var cors = require('cors')

function App() {

  const World = () => {
  //   const globeEl = useRef();
  //   const N = 300;
  //   const gData = [...Array(N).keys()].map(() => ({
  //     lat: (Math.random() - 0.5) * 180,
  //     lng: (Math.random() - 0.5) * 360,
  //     size: Math.random() / 3,
  //     color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  //   }));
  //   console.log(gData)


  //   useEffect(() => {
  //     // Auto-rotate
  //     globeEl.current.controls().autoRotate = true;
  //     globeEl.current.controls().autoRotateSpeed = 0.1;
  //   }, []);

  // return (
  //   <Globe
  //     ref={globeEl}
  //     globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
  //     bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
  //     backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

  //     pointsData={gData}
  //     pointAltitude="size"
  //     pointColor="color"
  //   />
  // )
  // };

  const globeEl = useRef();
  const [popData, setPopData] = useState([]);

  useEffect(() => {
    // load data
    fetch('https://github.com/vasturiano/react-globe.gl/blob/master/example/datasets/world_population.csv')
      .then(res => res.text())
      .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
      .then(setPopData);
  }, []);

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.1;
  }, []);

  const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
    .domain([0, 1e7]);

  return <Globe
    ref={globeEl}
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

    hexBinPointsData={world_population}
    hexBinPointWeight="pop"
    hexAltitude={d => d.sumWeight * 6e-8}
    hexBinResolution={4}
    hexTopColor={d => weightColor(d.sumWeight)}
    hexSideColor={d => weightColor(d.sumWeight)}
    hexBinMerge={true}
    enablePointerInteraction={false}
  />;
  };

  return (
    <World />
  )
}

export default App;
