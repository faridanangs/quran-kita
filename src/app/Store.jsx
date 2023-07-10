import { configureStore } from '@reduxjs/toolkit'
import dataSurah, { dataJuz, kisahNabiRosul } from '../layout/ApiAlquran'

const Store = configureStore({
    reducer: {
        alquran: dataSurah,
        juz: dataJuz,
        kisahNabi: kisahNabiRosul,
    }
})

export default Store