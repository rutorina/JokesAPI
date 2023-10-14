import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    let result;
    let jokes = new Array();
    let punches = new Array();
    for (let i = 0; i < 3; i++) {
      result = await axios.get("https://v2.jokeapi.dev/joke/Any");
      if (!jokes.includes(result.data.setup) && result.data.setup != undefined) {
        jokes.push(result.data.setup);
        punches.push(result.data.delivery)
        //i--;
      }
      else 
      i--;
      console.log(result.data.setup)
    }
    res.render("index.ejs", { joke: jokes, punch: punches}); // new Array("qwe", "asd", "qweqw")
  } catch (error) {
    res.render("index.ejs", { user: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => console.log(`JokeAPI app listening on port ${port}!`));
