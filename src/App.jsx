
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import {Provider} from 'react-redux';
import store from './store/Store'
import Auth from './pages/Auth';
import SellerAuth from './pages/SellerAuth';
import SellerHome from './pages/SellerHome';

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/sellerHome' element={<SellerHome/>}></Route>
          <Route path='/seller' element={<SellerAuth/>}></Route>         
        </Routes>
      </BrowserRouter>   
    </Provider>
    </>
  )
}

export default App