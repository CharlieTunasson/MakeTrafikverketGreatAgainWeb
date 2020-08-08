import React, { useState } from 'react'
import './App.css'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles, TextField, Icon, Button, Paper } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import ky from 'ky'

const listOfCitiesAndId = {
  Alvsbyn: 1000088,
  Angelholm: 1000122,
  Bollnas: 1000121,
  Borlange: 1000324,
  Eskilstuna: 1000005,
  Fagersta: 1000039,
  Falun: 1000098,
  Farsta: 1000019,
  Gallivare: 1000090,
  Gavle: 1000118,
  Haparanda: 1000084,
  Harnosand: 1000057,
  Hudiksvall: 1000056,
  Jarfalla: 1000326,
  Jokkmokk: 1000091,
  Jonkoping: 1000074,
  Kalix: 1000085,
  Kalmar: 1000093,
  Karlshamn: 1000048,
  Karlskoga: 1000003,
  Karlskrona: 1000047,
  Koping: 1000040,
  Kristianstad: 1000046,
  Linkoping: 1000009,
  Ljungby: 1000028,
  Lulea: 1000082,
  Lund: 1000062,
  Malmo: 1000061,
  Motala: 1000011,
  Norrkoping: 1000329,
  Nykoping: 1000149,
  Orebro: 1000001,
  Ornskoldsvik: 1000106,
  Oskarshamn: 1000094,
  Ostersund: 1000112,
  Overtornea: 1000089,
  Pitea: 1000087,
  Skelleftea: 1000111,
  Skovde: 1000130,
  Sodertalje: 1000132,
  Sollentuna: 1000134,
  Stockholm: 1000140,
  Sundsvall: 1000105,
  Sunne: 1000036,
  Sveg: 1000117,
  Umeå: 1000021,
  Uppsala: 1000071,
  Vasteras: 1000038,
  Vastervik: 1000095,
  Vaxjo: 1000030,
  Vetlanda: 1000078,
  Vimmerby: 1000015,
  Visby: 1000097,
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

function App() {
  const classes = useStyles()

  const [language, setLanguage] = useState(4)
  const [cities, setCities] = useState([('Stockholm': 1000140)])
  const [exam, setExam] = useState('practical') //Theory
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [ssn, setSsn] = useState()

  const [responseData, setResponseData] = useState()

  const searchTimes = async () => {
    try {
      const response = await ky
        .get(
          `https://make-trafikverket-great-again.herokuapp.com/tests/${ssn}`
          // { mode: 'no-cors' }
        )
        .json()
      console.log(response)
      setResponseData(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Make Trafikverket Great Again!</h1>

      <FormControl className={classes.formControl} required>
        <InputLabel htmlFor="language">Choose language</InputLabel>
        <Select
          name="language"
          labelId="language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <MenuItem value="svenska">Svenska</MenuItem>
          <MenuItem value="4">Engelska</MenuItem>
          <MenuItem value="albanska">Albanska</MenuItem>
          <MenuItem value="arabiska">Arabiska</MenuItem>
          <MenuItem value="bosniska">Bosniska</MenuItem>
          <MenuItem value="finska">Finska</MenuItem>
          <MenuItem value="franska">Franska</MenuItem>
          <MenuItem value="kroatiska">Kroatiska</MenuItem>
          <MenuItem value="persiska">Persiska</MenuItem>
          <MenuItem value="ryska">Ryska</MenuItem>
          <MenuItem value="serbiska">Serbiska</MenuItem>
          <MenuItem value="somaliska">Somaliska</MenuItem>
          <MenuItem value="sorani">Sorani</MenuItem>
          <MenuItem value="spanska">Spanska</MenuItem>
          <MenuItem value="thailändska">Thailändska</MenuItem>
          <MenuItem value="turkiska">Turkiska</MenuItem>
          <MenuItem value="tyska">Tyska</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} required>
        <InputLabel htmlFor="cities">Cities</InputLabel>
        <Select
          name="cities"
          labelId="cities"
          multiple
          value={cities}
          onChange={(event) => setCities(event.target.value)}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
        >
          {Object.keys(listOfCitiesAndId).map((city) => (
            <MenuItem key={city} value={city}>
              <Checkbox checked={cities.indexOf(city) > -1} />
              <ListItemText primary={city} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} required>
        <InputLabel htmlFor="exam">Type of exam</InputLabel>
        <Select
          name="exam"
          id="exam"
          value={exam}
          onChange={(event) => setExam(event.target.value)}
        >
          <MenuItem value="theory">Theory</MenuItem>
          <MenuItem value="practical">Practical</MenuItem>
        </Select>
      </FormControl>

      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        required
        classes={{ root: classes.selectEmpty }}
      >
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          label="Date"
          value={date}
          onChange={(date) => setDate(date)}
          style={{ marginTop: '8px' }}
        />
      </MuiPickersUtilsProvider>

      <form className={classes.formControl} required>
        <TextField
          // value={ssn}
          onChange={(event) => setSsn(event.target.value)}
          label="Social security number"
          autoFocus
          error={
            ssn?.length < 10 ||
            // (ssn?.length > 0 &&
            //   ssn?.match('/^(19|20)?(d{6}(-|s)d{4}|(?!19|20)d{10})$/')) ||
            ssn?.length === 11 ||
            ssn?.length > 12
          }
          style={{ width: '100%' }}
        />
      </form>

      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
        style={{ width: '220px', marginTop: '16px' }}
        onClick={() => searchTimes()}
        size="large"
      >
        Search
      </Button>

      <Paper>{JSON.stringify(responseData)}</Paper>
    </div>
  )
}

export default App
