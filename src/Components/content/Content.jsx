import { Route, Routes } from 'react-router-dom'
import {ListaTareas} from '../ListaPendiente/ListaTarea.jsx'

export const Content = () => {
  return (
    <div className='	max-width: 768px'>
        <Routes>
        <Route path='lista' element={<ListaTareas/>}/>
        </Routes>
    </div>
  )
}
