// We said we would use Cheerio somewhere in this project.  Here it is!  Cheer(io)s!
// Axios just happens to be along for the ride.
let axios = require("axios");
let cheerio = require("cheerio");

//This function scrapes news from news.google.com.
let scrape = function()
{
  //Let's access that site and scrape that news!
  return axios.get("https://news.google.com/?hl=en-US&gl=US&ceid=US:en").then(function(res)
  {
    let $ = cheerio.load(res.data);
    
    //This blank array will store our articles' information.
    let articles = [];

    //Loop through all page elements with the h3 tag, the section holding the articles.
    $("h3").each(function(i, element)
    {
      //This statement scrapes the news article's headline.
      let head = $(this)
        .children("a")
        .text();

      //This statement scrapes the news article's URL.
      let url = $(this)
        .children("a")
        .attr("href");

      /*Since this project can be modified to display article summaries under the headlines and is setup assuming we have
        this summary variable, we keep the sum variable but set it equal to headline variable.*/
      let sum = head;

      // Google News doesn't show article summaries.  This is in contrast to certain other sites like the New York Times.
      // vv Sample code from NYT scraping. vv
      // let sum = $(this)
      //   .find("p")
      //   .text()
      //   .trim();

      //If we have an article's headline, summary, and URL, proceed.
      if(head && sum && url)
      {
        //This section uses regular expressions and the trim function to tidy our headlines and summaries.
        //We remove extra lines, extra spacing, extra tabs, etc. to increase to typographical cleanliness.
        let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        //Let's here and now initialize this dataToAdd object so it will fit neatly into our articles array.
        let dataToAdd =
        {
          headline: headNeat,
          summary: sumNeat,
          url: "https://news.google.com/" + url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

//By exporting this function, other files in this project can - and should - access it.
module.exports = scrape;