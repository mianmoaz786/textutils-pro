import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
function App() {
  return (
    <>
     <Navbar title="Textutils" AboutText="About Us"/>
    <Textform TextHeading="Enter the Text to analyze"/>
    {/* <Navbar/> */}
    </>
  );
}

export default App;
