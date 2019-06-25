//This file handles the main page's initialization, button clicking, and article scraping/displaying/clearing.

/*This function sets a reference to the article container div which will hold all the dynamic content on this page
  and add event listeners to all dynamically-generated 'Save Article' and 'Scrape New Article' buttons.*/
$(document).ready(function()
{
  let articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);
  $(".clear").on("click", handleArticleClear);

  function initPage()
  {
    //Run an AJAX request for any unsaved headlines.
    $.get("/api/headlines?saved=false").then(function(data)
    {
      articleContainer.empty();

      //If we have at least 1 new headline, render all new headilnes to the page.
      if(data && data.length)
      {
        renderArticles(data);
      }

      //Otherwise, render to the page a message saying we have no new articles, and prompt the user to act.
      else
      {
        renderEmpty();
      }
    });
  }

  /*This function handles appending to the page HTML containing our article data.
    Function Input: An array of JSON containing all available articles in our database.*/
  function renderArticles(articles)
  {
    let articleCards = [];

    //We pass each article JSON object to the createCard function which returns a BootStrap card with our article data in it.
    for(let a = 0; a < articles.length; a++)
    {
      articleCards.push(createCard(articles[a]));
    }

    /*Once we have all of the HTML for the articles stored in our articleCards array, append these cards to the articleCards 
      container.*/
    articleContainer.append(articleCards);
  }

  /*This function takes a JSON object for an article and its headline and makes a jQuery element containing all of the
    formatted HTML for the article card.*/
  function createCard(article)
  {
    let card = $("<div class='card'>");
    let cardHeader = $("<div class='card-header'>").append
    (
      $("<h3>").append
      (
        $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
          .attr("href", article.url)
          .text(article.headline),
        $("<a class='btn btn-success save'>Save Article</a>")
      )
    );

    let cardBody = $("<div class='card-body'>").text(article.summary);

    card.append(cardHeader, cardBody);
    // We attach the article's id to the jQuery element
    // We will use this when trying to figure out which article the user wants to save
    card.data("_id", article._id);
    // We return the constructed card jQuery element
    return card;
  }

  /*This function shows a HTML message regarding having no new articles to show.
    This uses a joined array of HTML string data because it's likely easier to read or/and change than a concatenated string.*/
  function renderEmpty()
  {
    let emptyAlert =
    $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>We don't have any new articles.  Maybe that means no news is good news.</h4>",
        "</div>",
        "<div class='card'>",
        "<div class='card-header text-center'>",
        "<h3>What will you do?</h3>",
        "</div>",
        "<div class='card-body text-center'>",
        "<h4><a class='scrape-new'>Scrape s'more articles!</a></h4>",
        "<h4><a href='/saved'>Head to your saved articles!</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    //Let's append this empty alert to the page!
    articleContainer.append(emptyAlert);
  }

  /*This function triggers upon clicking the scrape button.  We remove the article from the main list and move it to the
    storage area.  When we rendered the article initially, we attached a javascript object containing the headline id
    to the element using the .data method.  Here, we retrieve that.*/
  function handleArticleSave()
  {
    let articleToSave = $(this)
      .parents(".card")
      .data();

    // Remove card from page
    $(this)
      .parents(".card")
      .remove();

    articleToSave.saved = true;
    
    //We use a patch method to update the articles in the database.
    $.ajax
    ({
      method: "PUT",
      url: "/api/headlines/" + articleToSave._id,
      data: articleToSave
    }).then(function(data)
    {  
      //If the data was saved successfully...
      if (data.saved)
      {
        //...run the initPage function again.  This will reload the entire article list.
        initPage();
      }
    });
  }

  //This function triggers upon clicking the scrape button.
  function handleArticleScrape()
  {
    $.get("/api/fetch").then(function(data)
    {
      /*If we scrape the chosen news site and compare the articles to those already in our
        already in our collection, re-render the articles on the page and notify the user
        how many unique articles we saved.*/
      initPage();
      bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
    });
  }

  //This function triggers upon clicking the Clear Articles! button and removes all fetched articles from the database.
  function handleArticleClear()
  {
    $.get("api/clear").then(function()
    {
      articleContainer.empty();
      initPage();
    });
  }
});