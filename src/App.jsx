import Front from './front';
import ChatNew from './newBack';
import './index.css';
import Nav from './nav';
import Back from './back';
import Formm from './Form';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';


function App() {

  return (
    <>
    
    <Router>
    <Nav/>
    
      <Routes>
        <Route path='/back' element= {<ChatNew/>}/>
        
        <Route path="/" index element={<Front/>}/>

        <Route path='/Form' element= {<Formm/>}/>
        
      </Routes>
      
    </Router>
   
 
    </>
  )
}

export default App
