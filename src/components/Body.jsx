import React, { useEffect, useState } from "react";
import Button from "./Button";
import Card from "./Card";

const Body = () => {
  const [data, setData] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCardData, setCurrentCardData] = useState(null);
  const [active, setActive] = useState(0);

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
      for ( const [key, value] of Object.entries(JSON.parse(data))) {
        if (key === currentCategory) {
          setCurrentCardData(Object.entries(value));
        }
      }

    }
  }, [currentCategory]);

  // Handle button click
  const handleClick = (e) => {
    setCurrentCategory(e.target.value);
    setActive(buttons.indexOf(e.target.value));
  }

  return (
    <div>
      {buttons.map((button, index) => (
        <Button key={index} name={button} onClick={handleClick} activeClass={active == index ? 'active' : ''} />
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
