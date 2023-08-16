import React, { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTumblr } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const url =
  "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const palettes = [
  {
    name: "Pastel Pink",
    color: "#B56A8C",
  },
  {
    name: "Pastel Orange",
    color: "#C8884C",
  },
  {
    name: "Pastel Yellow",
    color: "#CBC56A",
  },
  {
    name: "Pastel Green",
    color: "#5C8C59",
  },
  {
    name: "Pastel Blue",
    color: "#598C99",
  },
  {
    name: "Pastel Purple",
    color: "#816A99",
  },
  {
    name: "Pastel Pink",
    color: "#A97285",
  },
];

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState([]);
  const [color, setColor] = useState("");
  const [tweetUrl, setTweetUrl] = useState("");
  const [tumblrUrl, setTumblrUrl] = useState("");

  useEffect(() => {
    async function getJsonFromUrl() {
      try {
        const response = await fetch(url);
        const quotesData = await response.json();

        setQuotes(quotesData.quotes);

        const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
        const colorIndex = Math.floor(Math.random() * palettes.length);

        setRandomQuote(quotesData.quotes[randomIndex]);
        setColor(palettes[colorIndex].color);
        setTweetUrl(
          "https://twitter.com/intent/tweet?&text=" +
            encodeURIComponent(
              '"' + quotesData.quotes[randomIndex].quote + '" - ' + quotesData.quotes[randomIndex].author
            )
        );
        setTumblrUrl(
          "https://www.tumblr.com/widgets/share/tool?canonicalUrl=&caption=" +
            encodeURIComponent(quotesData.quotes[randomIndex].author) +
            "&content=" +
            encodeURIComponent('"' + quotesData.quotes[randomIndex].quote)
        );

        //https://www.tumblr.com/widgets/share/tool?posttype=quote&caption=Helen%20Keller&content=When%20one%20door%20of%20happiness%20closes%2C%20another%20opens%2C%20but%20often%20we%20look%20so%20long%20at%20the%20closed%20door%20that%20we%20do%20not%20see%20the%20one%20that%20has%20been%20opened%20for%20us.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button
      } catch (error) {
        console.error("Error:", error);
      }
    }

    getJsonFromUrl();
  }, []);

  function setNewQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const colorIndex = Math.floor(Math.random() * palettes.length);
    setRandomQuote(quotes[randomIndex]);
    setColor(palettes[colorIndex].color);
    setTweetUrl(
      "https://twitter.com/intent/tweet?&text=" +
        encodeURIComponent(quotes[randomIndex].quote + " - " + quotes[randomIndex].author)
    );
    setTumblrUrl(
      "https://www.tumblr.com/widgets/share/tool?canonicalUrl=&caption=" +
        encodeURIComponent(quotes[randomIndex].author) +
        "&content=" +
        encodeURIComponent('"' + quotes[randomIndex].quote)
    );
  }

  return (
    <div className="wrapper" style={{ backgroundColor: color }}>
      <div id="quote-box" className="quote-box">
        {randomQuote ? (
          <>
            <p id="text" className="quote-text" style={{ color: color }}>
              {'" ' + randomQuote.quote + ' "'}
            </p>
            <p id="author" className="quote-author" style={{ color: color }}>
              {"- " + randomQuote.author || "Unknown Author"}
            </p>
          </>
        ) : (
          <h2>Loading...</h2>
        )}

        <div className="buttons">
          <a
            id="tweet-quote"
            className="twitter btn"
            style={{ backgroundColor: color }}
            title="Tweet this quote!"
            href={tweetUrl}
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </a>

          <a
            id="tumblr-quote"
            className="tumblr btn"
            style={{ backgroundColor: color }}
            title="Post this quote!"
            href={tumblrUrl}
            target="_blank"
          >
            <FontAwesomeIcon icon={faTumblr}></FontAwesomeIcon>
          </a>

          <a id="new-quote" className="new-quote btn" style={{ backgroundColor: color }} onClick={setNewQuote}>
            New Quote
          </a>
        </div>
      </div>
    </div>
  );
}
