//This gets some news!
let db = require("../models");
let scrape = require("../scripts/scrape");

module.exports =
{
  scrapeHeadlines: function(req, res)
  {
    //Scrape the site chosen in ../scripts/scrape.js...
    return scrape()
      .then(function(articles)
      {
        //...then insert articles into the Mongo database.
        return db.Headline.create(articles);
      })
      .then(function(dbHeadline)
      {
        if (dbHeadline.length === 0)
        {
          res.json
          ({
            message: "No new articles for now.  Check back later!"
          });
        }
        else
        {
          //Otherwise, send back a count of how many new articles we got.
          res.json
          ({
            message: "Added " + dbHeadline.length + " new articles!"
          });
        }
      })
      .catch(function(err)
      {
        //This query won't insert articles with duplicate headlines, but it will trigger after inserting the others.
        res.json
        ({
          message: "Scrape complete!"
        });
      });
  }
};