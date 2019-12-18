import React, { useState, useEffect } from 'react';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        const response = await fetch(
          'https://bridge.buddyweb.fr/api/citations/citations'
        );

        setQuotes(await response.json());
      } catch (err) {
        console.error(err);
      }
    };

    getQuotes();
  }, []);

  return (
    <ul>
      {quotes.map(quote => (
        <li key={quote.id}>{quote.citation}</li>
      ))}
    </ul>
  );
};

export default Quotes;
