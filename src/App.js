import React, { useState, useEffect } from 'react'
import './App.css'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import {
  makeStyles,
  TextField,
  Icon,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core'
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
  Umea: 1000021,
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

  const [licence, setLicence] = useState(5)
  const [cities, setCities] = useState([('Stockholm': 1000140)])
  const [exam, setExam] = useState(12)
  const [language, setLanguage] = useState(4)
  const [car, setCar] = useState(2)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [ssn, setSsn] = useState()

  const [responseData, setResponseData] = useState()

  // useEffect(() => {
  //   console.log(licence)
  //   console.log(cities)
  //   console.log(exam)
  //   console.log(language)
  //   console.log(car)
  //   console.log(date)
  //   console.log(ssn)
  // }, [licence, cities, exam, language, car, date, ssn])

  const searchTimes = async () => {
    try {
      let citiesId = []
      cities.map((city) => {
        citiesId.push(listOfCitiesAndId[city])
      })
      console.log(citiesId)
      const response = await ky
        .post(`https://make-trafikverket-great-again.herokuapp.com/tests/`, {
          json: {
            ssn,
            languageId: language,
            locationIds: citiesId,
            licenceId: licence,
            examinationTypeId: exam,
            startDate: date,
            dateThreshold: 30,
          },
        })
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
      <h1 style={{ color: '#E41A11' }}>Make Trafikverket Great Again!</h1>

      <FormControl className={classes.formControl} required>
        <InputLabel htmlFor="licence">Licence</InputLabel>
        <Select
          name="licence"
          labelId="licence"
          value={licence}
          onChange={(event) => setLicence(event.target.value)}
        >
          <MenuItem value={4}>A - Motorcycle</MenuItem>
          <MenuItem value={2}>A1 - Light motorcycle</MenuItem>
          <MenuItem value={24}>A2 - Motorcycle (Limited)</MenuItem>
          <MenuItem value={32}>ADR - Hazardous goods</MenuItem>
          <MenuItem value={1}>AM - Moped</MenuItem>
          <MenuItem value={33}>APV - Roadworks</MenuItem>
          <MenuItem value={5}>B - Car</MenuItem>
          <MenuItem value={23}>B96 - Car (Extended)</MenuItem>
          <MenuItem value={7}>BE - Car with heavy trailer</MenuItem>
          <MenuItem value={21}>Bus - Passenger transport</MenuItem>
          <MenuItem value={29}>
            Bus - Professional competence for passenger transport
          </MenuItem>
          <MenuItem value={8}>C - Heavy lorry</MenuItem>
          <MenuItem value={25}>C1 - Medium-weight lorry</MenuItem>
          <MenuItem value={26}>
            C1E - Medium-weight lorry with heavy trailer
          </MenuItem>
          <MenuItem value={9}>CE - Heavy lorry with heavy trailer</MenuItem>
          <MenuItem value={10}>D - Bus</MenuItem>
          <MenuItem value={27}>D1 - Bus (Limited)</MenuItem>
          <MenuItem value={28}>D1E - Bus with heavy trailer (Limited)</MenuItem>
          <MenuItem value={11}>DE - Bus with heavy trailer</MenuItem>
          <MenuItem value={22}>Lorry - Goods transport</MenuItem>
          <MenuItem value={30}>
            Goods - Professional competence for goods transport
          </MenuItem>
          <MenuItem value={31}>
            Train driver - Train driver certificate
          </MenuItem>
          <MenuItem value={13}>Taxi - Taxi driver licence</MenuItem>
          <MenuItem value={17}>
            Taxi - Professional competence for taxi driving
          </MenuItem>
          <MenuItem value={18}>Tractor - Tractor licence</MenuItem>
          <MenuItem value={34}>VVH - Winter roads maintenance</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} required>
        <InputLabel htmlFor="exam">Exam</InputLabel>
        <Select
          name="exam"
          id="exam"
          value={exam}
          onChange={(event) => setExam(event.target.value)}
        >
          <MenuItem value={3}>Theory</MenuItem>
          <MenuItem value={12}>Practical</MenuItem>
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

      {exam === 3 && (
        <FormControl className={classes.formControl} required>
          <InputLabel htmlFor="language">Language</InputLabel>
          <Select
            name="language"
            labelId="language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <MenuItem value={13}>Svenska</MenuItem>
            <MenuItem value={4}>Engelska</MenuItem>
            <MenuItem value={1}>Albanska</MenuItem>
            <MenuItem value={2}>Arabiska</MenuItem>
            <MenuItem value={14}>Bosniska</MenuItem>
            <MenuItem value={5}>Finska</MenuItem>
            <MenuItem value={6}>Franska</MenuItem>
            <MenuItem value={15}>Kroatiska</MenuItem>
            <MenuItem value={7}>Persiska</MenuItem>
            <MenuItem value={8}>Ryska</MenuItem>
            <MenuItem value={16}>Serbiska</MenuItem>
            <MenuItem value={128}>Somaliska</MenuItem>
            <MenuItem value={9}>Sorani</MenuItem>
            <MenuItem value={10}>Spanska</MenuItem>
            <MenuItem value={133}>Thailändska</MenuItem>
            <MenuItem value={11}>Turkiska</MenuItem>
            <MenuItem value={12}>Tyska</MenuItem>
          </Select>
        </FormControl>
      )}

      {exam === 12 && (
        <FormControl className={classes.formControl} required>
          <InputLabel htmlFor="car">Rent car</InputLabel>
          <Select
            name="car"
            id="car"
            value={car}
            onChange={(event) => setCar(event.target.value)}
          >
            <MenuItem value={1}>No</MenuItem>
            <MenuItem value={2}>Yes, manual</MenuItem>
            <MenuItem value={4}>Yes, automatic</MenuItem>
          </Select>
        </FormControl>
      )}

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

      <br></br>
      <br></br>
      <br></br>
      <Paper>
        {JSON.stringify(responseData)}
        {responseData &&
          responseData.map((availableOccasion) => (
            <Card>
              <CardContent>
                <h3>
                  {availableOccasion.locationName} - {availableOccasion.name}
                </h3>
                <p>Cost: {availableOccasion.cost}</p>
                <p>Date: {availableOccasion.duration.start}</p>
              </CardContent>
              <CardActions>
                <Button size="small">Book</Button>
              </CardActions>
            </Card>
          ))}
      </Paper>
    </div>
  )
}

export default App
