import React, { useState } from 'react';
import './App.css';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';


const listOfCitiesAndId = [
  { 'Örebro': 1000001 },
  { 'Karlskoga': 1000003 },
  { 'Eskilstuna': 1000005 },
  { 'linköping': 1000009 },
  { 'motala': 1000011 },
  { 'vimmerby': 1000015 },
  { 'umea': 1000021 },
  { 'farsta': 1000019 },
  { 'Stockholm City': 1000140 },
]

{/*
        case ljungby = 1000028
        case vaxjo = 1000030
        case sunne = 1000036
        case vasteras = 1000038
        case fagersta = 1000039
        case koping = 1000040
        case kristianstad = 1000046
        case karlskrona = 1000047
        case karlshamn = 1000048
        case hudiksvall = 1000056
        case harnosand = 1000057
        case malmo = 1000061
        case lund = 1000062
        case uppsala = 1000071
        case jonkoping = 1000074
        case vetlanda = 1000078
        case lulea = 1000082
        case haparanda = 1000084
        case kalix = 1000085
        case pitea = 1000087
        case alvsbyn = 1000088
        case overtornea = 1000089
        case gallivare = 1000090
        case jokkmokk = 1000091
        case kalmar = 1000093
        case oskarshamn = 1000094
        case vastervik = 1000095
        case visby = 1000097
        case falun = 1000098
        case sundsvall = 1000105
        case ornskoldsvik = 1000106
        case skelleftea = 1000111
        case ostersund = 1000112
        case gavle = 1000118
        case sveg = 1000117
        case bollnas = 1000121
        case angelholm = 1000122
        case skovde = 1000130
        case sodertalje = 1000132
        case sollentuna = 1000134
        case nykoping = 1000149
        case borlange = 1000324
        case jarfalla = 1000326
        case norrkoping = 1000329 */}

function App() {

  const [language, setLanguage] = useState(4)
  const [cities, setCities] = useState(listOfCitiesAndId[0])
  const [exam, setExam] = useState("Practical") //Theory
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  return (
    <div className="App">
      <h1>Make Trafikverket Great Again!</h1>

      <form>
        <label htmlFor="language">Choose language:</label>
        <br></br>
        <select name="language" id="language" value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="svenska">Svenska</option>
          <option value="4">Engelska</option>
          <option value="albanska">Albanska</option>
          <option value="arabiska">Arabiska</option>
          <option value="bosniska">Bosniska</option>
          <option value="finska">Finska</option>
          <option value="franska">Franska</option>
          <option value="kroatiska">Kroatiska</option>
          <option value="persiska">Persiska</option>
          <option value="ryska">Ryska</option>
          <option value="serbiska">Serbiska</option>
          <option value="somaliska">Somaliska</option>
          <option value="sorani">Sorani</option>
          <option value="spanska">Spanska</option>
          <option value="thailändska">Thailändska</option>
          <option value="turkiska">Turkiska</option>
          <option value="tyska">Tyska</option>
        </select>

        <br></br>
        <br></br>

        <label htmlFor="city">City:</label>
        <br></br>
        <input name="city" id="city" type="text" placeholder="Type city here" ></input>

        <InputLabel id="cities">Cities</InputLabel>
        <Select
          labelId="cities"
          id="cities"
          multiple
          value={cities}
          onChange={(event) => setCities(event.target.value)}
          input={<Input />}
          // renderValue={(selected) => selected.join(', ')}
        >
          {listOfCitiesAndId.forEach((city) => (
            <MenuItem key={city} value={city}>
              <Checkbox checked={listOfCitiesAndId.indexOf(city) > -1} />
              <ListItemText primary={city} />
            </MenuItem>
          ))}
        </Select>

        <br></br>
        <br></br>

        <label htmlFor="exam">Type of exam:</label>
        <br></br>
        <select name="exam" id="exam">
          <option value="theory">Theory</option>
          <option value="practical">Practical</option>
        </select>

        <br></br>
        <br></br>

        <label htmlFor="date">Date:</label>
        <br></br>
        <input name="date" id="date" type="date"></input>

        <br></br>
        <br></br>

        <label htmlFor="ssn">Social security number:</label>
        <br></br>
        <input name="ssn" id="ssn" type="text" pattern="/^(19|20)?(\d{6}(-|\s)\d{4}|(?!19|20)\d{10})$/"></input>
      </form>

    </div>
  );
}

export default App;
