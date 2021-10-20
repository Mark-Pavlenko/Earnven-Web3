import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  fontColor: 'rgb(86, 90, 105)',
  connect: '#D50166',
  back: '#FDEAF1',
  inputBackground: '#F7F8FA',
  inputBorder: '',
  color: '#000',
  selectButtonBackground: '#E8016F',
  settings: 'rgb(237, 238, 242)',
  settingText: 'rgb(86, 90, 105)',
  importTokenBackground: '#edeef2',
  listTokensTabBackground: 'rgb(206, 208, 217)',
  activeTabBackground: '#f7f8fa',
};

export const darkTheme = {
  body: 'rgb(33, 36, 41)',
  fontColor: '#3EE046',
  connect: '#3EE046',
  containerShade: 'rgb(44, 47, 54)',
  swapContainer: 'rgb(25, 27, 31)',
  inputBorder: '#2C2F36',
  inputBackground: '#212429',
  option: 'rgb(44, 47, 54)',
  back: '#162f1f',
  color: '#fff',
  dark: '#000',
  selectButtonBackground: '#0c6300',
  coinDesc: '#199759',
  importTokenBackground: '#2c2f36',
  listTokensTabBackground: '#383838',
  activeTabBackground: '#191b1f',
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;
