import React, { useEffect, useState } from "react";
import Button from "./Button";
import Card from "./Card";

const Body = () => {
  const [data, setData] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCardData, setCurrentCardData] = useState(null);

  // Fetch API response and store in state variable
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.betright.com.au/api/racing/todaysracing"
        );
        const json = await response.json();
        setButtons(Object.keys(json));
        setData(JSON.stringify(json));
        setCurrentCategory(Object.keys(json)[0]);

      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentCategory) {
      console.log(currentCategory);
      for ( const [key, value] of Object.entries(JSON.parse(data))) {
        if (key === currentCategory) {
          console.log(key, value);
          setCurrentCardData(Object.entries(value));
        }
      }

    }
  }, [currentCategory]);

  // Handle button click
  const handleClick = (e) => {
    console.log(e.target.value);
    setCurrentCategory(e.target.value);
  }

  return (
    <div>
      {buttons.map((button, index) => (
        <Button key={index} name={button} onClick={handleClick} />
      ))}
      {
        currentCardData && currentCardData.map((item, index) => {
          return (
            <Card
              key={index}
              data={item[1]}
            />
          )
        })
      }

    </div>
  );
};

export default Body;
