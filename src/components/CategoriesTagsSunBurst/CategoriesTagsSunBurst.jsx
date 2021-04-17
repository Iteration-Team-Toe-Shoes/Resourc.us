import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SunBurstChart } from '../SunBurstChart';
import { getRandomNumberBetweenInclusive } from '../../utils';

const CategoriesTagsSunBurst = () => {
  const [sunBurstData, setSunBurstData] = useState({});

  const getCategoriesStats = async () => {
    try {
      const {data} = await axios.get("http://localhost:3000/categories/list");
      const obj = {
        name: "Categories & Tags",
        color: "hsl(57, 70%, 50%)",
        children: [],
      };
      const colorsPicked = [];
      data.forEach(({mentionCount, name, tags}) => {
        let currentParentColor = getRandomNumberBetweenInclusive(0, 360);
        while(colorsPicked.includes(currentParentColor)) {
          currentParentColor = getRandomNumberBetweenInclusive(0, 360);
        }
        colorsPicked.push(currentParentColor);
        obj.children.push({
          name,
          color: `hsl(${currentParentColor}, 70%, 50%)`,
          // loc: mentionCount,
          children: tags.map(tag => {
            const currentTagData = {
              name: tag.name,
              color: `hsl(${currentParentColor}, 70%, 50%)`, 
              loc: tag.mentionCount,
            };
            return currentTagData;
          })
        });
      });
      setSunBurstData(obj);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCategoriesStats();
  }, []);

  if (!sunBurstData) return null;

  return (
    <SunBurstChart 
      data={sunBurstData} 
    />
  );
};

export {CategoriesTagsSunBurst};