import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactList from './components/ContactList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<ContactList />} >
            {/* <Route path='company' element={<Company />} />
            <Route path='area' element={<Area />} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<Page404 />} />
          <Route path='posts' element={<Posts />}>
            <Route path=':postId' element={<Posts />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
