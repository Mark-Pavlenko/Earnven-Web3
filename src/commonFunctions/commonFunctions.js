import FastGweiGasIcon from '../assets/icons/fastGweiGasIcon.png';
import MiddleGweiGasIcon from '../assets/icons/middleGweiGasIcon.png';
import SlowGweiGasIcon from '../assets/icons/slowGweiGasIcon.png';

// function to get the number render with comma
export const numberWithCommas = (x) => {
  x = x && x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
  return x;
};

export const addIconsGasPrices = (
  array,
  fastIcon,
  middleIcon,
  slowIcon,
  fastIconNight,
  middleIconNight,
  slowIconNight,
  theme
) => {
  return [
    {
      ...array[0],
      icon: theme ? fastIcon : fastIconNight,
    },
    {
      ...array[1],
      icon: theme ? middleIcon : middleIconNight,
    },
    {
      ...array[2],
      icon: theme ? slowIcon : slowIconNight,
    },
  ];
};
