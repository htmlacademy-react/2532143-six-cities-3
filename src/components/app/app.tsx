import { MainPage } from '../mainPage/mainPage';

type AppScreenProps = {
  offersCount: number;
}

function App({offersCount}: AppScreenProps) {
  return <MainPage offersCount = {offersCount}/>;
}

export default App;
