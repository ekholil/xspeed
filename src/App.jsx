import { Route, Routes } from 'react-router-dom'
import './App.css'
import Create from './Components/Create'
import Header from './Components/Header'
import List from './Components/List'
import Update from './Components/Update'

function App() {
 

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<List />}/>
        <Route path='/list' element={<List />}/>
        <Route path='/create' element={<Create />}/>
        <Route path='/update/:id' element={<Update />}/>
        
      </Routes>
    </div>
  )
}

export default App
