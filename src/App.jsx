import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './component/Home'
import Layout from './layout/Layout'
import Juz from './component/Juz'
import Surah from './component/Surah'
import KisahNabi from './component/KisahNabi'
import DetailSurah from './layout/detail-surah/DetailSurah'
import DetailJuz from './layout/detail-juz/DetailJuz'
import DetailKisah from './layout/detail-kisah/DetailKisah'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<Layout />}>
            <Route path='juz' element={<Juz />}/>
            <Route path='surah' element={<Surah />}/>
            <Route path='kisah' element={<KisahNabi />}/>
          </Route>
          <Route path='details/:id' element={<DetailSurah />}/>
          <Route path='detailj/:id' element={<DetailJuz />}/>
          <Route path='detailk/:id' element={<DetailKisah />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App