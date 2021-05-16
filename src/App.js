import Globe from 'react-globe.gl';
import { useState, useEffect, useRef, useMemo, React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as d3 from 'd3';
import LineChart from './LineChart';

const useStyles = makeStyles({
  paper: {
    width: '70px',
    height: '80px',
    background: 'blue',
  },
  title: {
    fontSize: 14,
  },
});

function App() {
  const classes = useStyles();
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
    />
  };

  const changePage = () => {
    if (page === 0) {
      setPage(1)
    } else {
      setPage(0)
    }
  }

  useEffect(() => {

  }, [page])

  return (
    <div>
      <Button onClick={changePage}>
        Change Page
      </Button>  
      {page === 0 ? <World /> : <LineChart />}
      
    </div>
  )
}

export default App;
