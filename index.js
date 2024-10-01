import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  try {
    const interval = req.body.interval;
    console.log("Interval received from form: ", interval);
    const result = await axios.get(API_URL, {
      params: {
        symbol: req.body.symbol,
        interval: interval,
        outputsize: "compact",
        apikey: "B3IF5GYLXEECO5T6",
      },
    });
    console.log(result.data);
    console.log(interval);
    console.log("Rendering chart.ejs with interval: ", interval);
    res.render("chart.ejs", { content: result.data, interval });
  } catch (error) {
    res.render("index.ejs", { content: error });
    console.log(error);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});