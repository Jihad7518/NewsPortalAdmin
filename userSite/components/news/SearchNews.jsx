'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import SimpleDetailsNewCard from './items/SimpleDetailsNewCard';
import { base_api_url } from '../../config/config';

const SearchNews = () => {
  const [news, setNews] = useState([]);
  const searchValue = useSearchParams();
  const value = searchValue.get('value');

  // Using useCallback to memoize the get_news function
  const get_news = useCallback(async () => {
    try {
      const res = await fetch(`${base_api_url}/api/search/news?value=${value}`);
      const { news } = await res.json();
      setNews(news);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }, [value]); // Add `value` as a dependency

  useEffect(() => {
    if (value) {
      get_news();
    }
  }, [value, get_news]); // Include `get_news` in the dependency array

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {news && news.length > 0 &&
        news.map((item) => (
          <SimpleDetailsNewCard
            key={item.id} // Ensure a unique `key` for each item
            news={item}
            type="details-news"
            height={200}
          />
        ))
      }
    </div>
  );
};

export default SearchNews;