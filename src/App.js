import Globe from 'react-globe.gl';
import { useState, useEffect, useMemo, React } from 'react';
import { Box, Button } from '@material-ui/core'
import * as d3 from 'd3';
import GraphAll from './GraphAll';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function App() {
  const vac_data = [{country: 'China', total_vaccine: 366910000},
    {country: 'USA', total_vaccine: 266596486.0},
    {country: 'India', total_vaccine: 178361846},
    {country: 'UK', total_vaccine: 54797640},
    {country: 'Brazil', total_vaccine: 50308106},
    {country: 'Germany', total_vaccine: 38646171},
    {country: 'France', total_vaccine: 27455748},
    {country: 'Italy', total_vaccine: 25948925},
    {country: 'Turkey', total_vaccine: 25402277},
    {country: 'Russia', total_vaccine: 22782931}];
  
  const infection_data = [{country: 'USA', infection: 32557444},
    {country: 'India', infection: 21077410},
    {country: 'Brazil', infection: 14930183},
    {country: 'France', infection: 5767541},
    {country: 'Turkey', infection: 4955594},
    {country: 'Russia', infection: 4792354},
    {country: 'UK', infection: 4441644},
    {country: 'Italy', infection: 4070400},
    {country: 'Spain', infection: 3551262},
    {country: 'Germany', infection: 3484755}];

  const [page, setPage] = useState(0);

  const World = () => {
    const [countries, setCountries] = useState({ features: []});
    const [hoverD, setHoverD] = useState();

    useEffect(() => {
      // load data
      fetch('./covid.geojson').then(res => res.json()).then(setCountries);
    }, []);

    const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

    // GDP per capita (avoiding countries with small pop)
    const getVal = feat => feat.properties.infection / Math.max(1e5, feat.properties.POP_EST);

    const maxVal = useMemo(
      () => Math.max(...countries.features.map(getVal)),
      [countries]
    );
    colorScale.domain([0, maxVal]);

    return <Globe
      width={750}
      height={750}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      lineHoverPrecision={0}

      polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
      polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
      polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={({ properties: d }) =>
        `<Button>
          <b >${d.COUNTRY} (${d.ISO_A2}):</b> <br />
          <i style="color:red;">infection count: ${d.infection}</i><br/>
          <i style="color:blue;">vaccine count: ${d.total_vaccinations}</i><br/>
          <i>Population: ${d.POP_EST}</i>
        </Button>`
      }
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
      // onPolygonClick={({ properties: d }) => {console.log(d.COUNTRY)}}
    />
  };

  const changePage = () => {
    if (page === 0) {
      setPage(1);
    } else {
      setPage(0);
    }
  }

  useEffect(() => {

  }, [page])

  return (
    <div>
      <Button onClick={changePage} style={{background: 'steelblue'}}>
        Switch
      </Button>
      {page === 0 ?
      <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <Box width='50vh'>
          <h3>Top 10 of infection</h3>
          <BarChart width={400} height={300} data={infection_data} layout='vertical'>
              <YAxis type="category" dataKey="country" fontSize='10'/>
              <XAxis type="number"/>
              <Tooltip />
              <Legend />
              <Bar dataKey="infection" fill="#ff0000" />
          </BarChart>
          <h3>Top 10 of vaccination</h3>
          <BarChart width={500} height={300} data={vac_data} layout='vertical'>
              <YAxis type="category" dataKey="country" fontSize='10'/>
              <XAxis type="number"/>
              <Tooltip />
              <Legend />
              <Bar dataKey="total_vaccine" fill="#8884d8" />
          </BarChart>
        </Box>
        <World /> 
      </Box>
      : <GraphAll />}
    </div>
  )
}

export default App;
