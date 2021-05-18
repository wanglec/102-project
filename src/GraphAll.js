import { useState, useEffect, useRef, useMemo, React } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';


function GraphAll() {
    const [country, setCountry] = useState('None');

    const chinaInfec = [{'date': '20200122', 'count': 548},
    {'date': '20200129', 'count': 6087},
    {'date': '20200205', 'count': 27440},
    {'date': '20200212', 'count': 44759},
    {'date': '20200219', 'count': 74619},
    {'date': '20200226', 'count': 78166},
    {'date': '20200304', 'count': 80386},
    {'date': '20200311', 'count': 80921},
    {'date': '20200318', 'count': 81102},
    {'date': '20200325', 'count': 81661},
    {'date': '20200401', 'count': 82361},
    {'date': '20200408', 'count': 82809},
    {'date': '20200415', 'count': 83356},
    {'date': '20200422', 'count': 83868},
    {'date': '20200429', 'count': 83944},
    {'date': '20200506', 'count': 83970},
    {'date': '20200513', 'count': 84024},
    {'date': '20200520', 'count': 84063},
    {'date': '20200527', 'count': 84106},
    {'date': '20200603', 'count': 84160},
    {'date': '20200610', 'count': 84209},
    {'date': '20200617', 'count': 84458},
    {'date': '20200624', 'count': 84673},
    {'date': '20200701', 'count': 84816},
    {'date': '20200708', 'count': 84950},
    {'date': '20200715', 'count': 85246},
    {'date': '20200722', 'count': 85906},
    {'date': '20200729', 'count': 87213},
    {'date': '20200805', 'count': 88328},
    {'date': '20200812', 'count': 89045},
    {'date': '20200819', 'count': 89527},
    {'date': '20200826', 'count': 89784},
    {'date': '20200902', 'count': 89953},
    {'date': '20200909', 'count': 90100},
    {'date': '20200916', 'count': 90253},
    {'date': '20200923', 'count': 90409},
    {'date': '20200930', 'count': 90545},
    {'date': '20201007', 'count': 90687},
    {'date': '20201014', 'count': 90869},
    {'date': '20201021', 'count': 91044},
    {'date': '20201028', 'count': 91271},
    {'date': '20201104', 'count': 91509},
    {'date': '20201111', 'count': 91752},
    {'date': '20201118', 'count': 91906},
    {'date': '20201125', 'count': 92402},
    {'date': '20201202', 'count': 93113},
    {'date': '20201209', 'count': 93898},
    {'date': '20201216', 'count': 94626},
    {'date': '20201223', 'count': 95298},
    {'date': '20201230', 'count': 95876},
    {'date': '20210106', 'count': 96398},
    {'date': '20210113', 'count': 97275},
    {'date': '20210120', 'count': 98544},
    {'date': '20210127', 'count': 99655},
    {'date': '20210203', 'count': 100226},
    {'date': '20210210', 'count': 100494},
    {'date': '20210217', 'count': 100666},
    {'date': '20210224', 'count': 100832},
    {'date': '20210303', 'count': 101037},
    {'date': '20210310', 'count': 101194},
    {'date': '20210317', 'count': 101460},
    {'date': '20210324', 'count': 101603},
    {'date': '20210331', 'count': 101732},
    {'date': '20210407', 'count': 101953},
    {'date': '20210414', 'count': 102118},
    {'date': '20210421', 'count': 102300},
    {'date': '20210428', 'count': 102446},
    {'date': '20210505', 'count': 102571}];   

    const handleChange = (e) => {
        setCountry(e.target.value);
    };

    return (
    <div>
        <Typography variant="h5" >
            Here we want to elaborate the time series data of the top five countries with most vaccinations
        </Typography>
        <div>
            <InputLabel>select a country</InputLabel>
            <Select
            value={country}
            onChange={handleChange}
            >
            <MenuItem value={'China'}>China</MenuItem>
            <MenuItem value={'US'}>US</MenuItem>
            <MenuItem value={'India'}>India</MenuItem>
            </Select>
        </div>
        <LineChart width={1400} height={400} data={chinaInfec}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
                dataKey="date" 
                domain = {['auto', 'auto']} 
                tickFormatter = {(unixTime) => moment(unixTime).format('YYYYMMDD')} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#ff0000" />
        </LineChart>
    </div>
    )
}

export default GraphAll;