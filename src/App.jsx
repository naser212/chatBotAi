import Front from './front';
import './index.css';
import Nav from './nav';
import Back from './back';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
    <Nav/>
      <Routes>
        <Route path='/back' element= {<Back/>}/>
        <Route path="/" index element={<Front/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
