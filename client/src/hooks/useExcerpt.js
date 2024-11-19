import { useState, useEffect } from "react";

const useExcerpt = (text, maxWords = 18) => {
  const [excerpt, setExcerpt] = useState("");

  useEffect(() => {
    const trimToWords = (str, numWords) => {
      if (!str) return "";
      const wordsArray = str.split(" ");
      if (wordsArray.length <= numWords) return str;
      return wordsArray.slice(0, numWords).join(" ") + "...";
    };

    setExcerpt(trimToWords(text, maxWords));
  }, [text, maxWords]);

  return excerpt;
};

export default useExcerpt;
