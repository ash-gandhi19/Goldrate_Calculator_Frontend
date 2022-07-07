import { useEffect, useState } from "react";
import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Navbar from "./Navbar";

let inr = getSymbolFromCurrency("INR");

function Goldcalculator() {
  const [res, setres] = useState([]);
  const [city, setcity] = useState("");
  const [purity, setpurity] = useState("");
  const [gram, setgram] = useState();
  const [result, setresult] = useState();
  const [resstate, setresstate] = useState();
  const [respurity, setrespurity] = useState();
  const [resgram, setresgram] = useState();
  const [resval, setresval] = useState(0);
  const [data, setdata] = useState([]);
  const [days1, setdays1] = useState([]);

  let states = [];

  let getData = async () => {
    let response = await axios.get("https://goldrate-calculator.herokuapp.com/all/goldata");
    setres(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  ///
  res.map((elem) => {
    states.push(elem.state);
  });

  const handleChange = (event) => {
    setcity(event.target.value);
  };

  const handleChange1 = (event) => {
    setpurity(event.target.value);
  };

  const handleChange2 = (event) => {
    setgram(event.target.value);
  };

  let f;
  let s;
  let data24;
  let data22;
  let days;
  const handlesubmit = (event) => {
    event.preventDefault();
    res.filter((elem) => {
      if (elem.state === city) {
        f = elem.today[0];
        s = elem.today[1];
        data24 = elem.data24;
        data22 = elem.data22;
        days = elem.days;
      }
    });
    setdays1(days);
    setresstate(city);
    setrespurity(purity);
    setresgram(gram);

    if (purity == "24Carat") {
      setresval(f);
      let value = (f / 10) * gram;
      setresult(value);
      setdata(data24);
    } else {
      setresval(s);
      setdata(data22);
      setresult((s / 10) * gram);
    }
  };
  return (
    <div>
      <div style={{ overflow: "hidden" }}>
        <Navbar />
        <div className="heading_2">
          <h2 style={{ textAlign: "center" }}>Gold Rate Calculator</h2>
        </div>
        <div className="goldcalcform">
          <Box
            sx={{
              width: "80%",
              marginTop: "5%",
              paddingLeft: "10%",
              marginLeft: "10%",
              marginBottom: "5%",
            }}
          >
            <FormControl component="form" onSubmit={handlesubmit} required>
              <Stack direction="row" spacing={2}>
                <div className="selectcity">
                  <InputLabel id="demo-simple-select-label">city</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ width: "120px" }}
                    value={city}
                    label="city"
                    onChange={handleChange}
                    required
                  >
                    {states.map((elem) => (
                      <MenuItem value={elem}>{elem}</MenuItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <TextField
                    id="outlined-name"
                    label="Quantity(gram)"
                    value={gram}
                    onChange={handleChange2}
                    required
                  ></TextField>
                </div>

                <div>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Purity
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={purity}
                    onChange={handleChange1}
                    required
                  >
                    <FormControlLabel
                      value="24Carat"
                      control={<Radio />}
                      label="24Carat"
                    />
                    <FormControlLabel
                      value="22Carat"
                      control={<Radio />}
                      label="22Carat"
                    />
                  </RadioGroup>
                </div>

                <div>
                  <Button variant="outlined" type="submit">
                    Calculate Price
                  </Button>
                </div>
              </Stack>
            </FormControl>
          </Box>
        </div>
        {result ? (
          <div className="rescard">
            <Box>
              <Card
                style={{
                  backgroundColor: "#ad8a0f",
                  color: "white",
                  width: "60%",
                  marginLeft: "20%",
                  marginRight: "20%",
                }}
              >
                <CardContent>
                  <h3
                    style={{
                      fontFamily: "Yeseva One",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {respurity} Gold rate for {resgram} Grams in {resstate}{" "}
                  </h3>
                  <h2 className="cardcontent">
                    {inr}
                    {result}
                  </h2>
                </CardContent>
              </Card>
            </Box>
            <div className="heading_2">
              <h2 style={{ textAlign: "center" }}>
                {respurity} Gold Price In {resstate} Today
              </h2>
            </div>

            <div className="table">
              <Paper
                sx={{
                  width: "80%",
                  overflow: "hidden",
                  marginLeft: "10%",
                  border: "2px solid black",
                }}
              >
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Gram</TableCell>
                        <TableCell align="center">
                          {respurity} Gold Price
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow hover>
                        <TableCell align="center">1 Gram</TableCell>
                        <TableCell align="center">{resval / 10}</TableCell>
                      </TableRow>
                      <TableRow hover>
                        <TableCell align="center">8 Grams</TableCell>
                        <TableCell align="center">
                          {(resval / 10) * 8}
                        </TableCell>
                      </TableRow>
                      <TableRow hover>
                        <TableCell align="center">10 Grams</TableCell>
                        <TableCell align="center">{resval}</TableCell>
                      </TableRow>
                      <TableRow hover>
                        <TableCell align="center">100 Grams</TableCell>
                        <TableCell align="center">{resval * 10}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Goldcalculator;
