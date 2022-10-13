import './App.css';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//hooks
import { useLoadingUser } from './hooks/useLoadingUser';

//context
import { AuthProvider } from './context/AuthContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import  Search  from './pages/Search/Search';

//components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

function App() {

  const { user, loadingUser} = useLoadingUser()

  if(loadingUser){
    return <p>Carregando...</p>
  }
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
      <BrowserRouter>
      <NavBar/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/search' element={<Search />}/>
            <Route path='/posts/:id' element={<Post />}/>
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />}/>
            <Route path='/posts/edit/:id' element={ user ? <EditPost /> : <Navigate to='/login' />}/>
            <Route path='/posts/create' element={ user ? <CreatePost /> : <Navigate to='/login' />}/>
            <Route path='/dashboard' element={user ? <Dashboard />: <Navigate to='/login'/>}/>
          </Routes>
        </div>
      <Footer/>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
