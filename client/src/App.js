import TopBar from './TopBar';
import Content from './Content';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ChatBot from './ChatBot';

const App = () => {
  return (
    <Router>
      <div className="App">
        <TopBar/>
        <ChatBot/>
        <Routes>
            <Route exact path= "/" element = {<Content category = "usa"/>}/>
            <Route exact path= "/technology" element = {<Content category = "technology"/>}/>
            <Route exact path= "/business" element = {<Content category = "business"/>}/>
            <Route exact path= "/politics" element = {<Content category = "politics"/> }/>

        </Routes>
         

      </div>
    </Router>
  );

}
export default App;
