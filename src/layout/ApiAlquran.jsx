// import komponent
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// Surah
export const getDataAlquranSurah = createAsyncThunk(
  "alquran/getDataAlquranSurah",
  async (datas) => {
    const response = await axios.get(`https://equran.id/api/v2/surat`);
    if (datas != null) {
      const dataFilter = response.data.data.filter((val) => {
        if (
          val.namaLatin &&
          typeof val.namaLatin === "string" &&
          val.namaLatin.toLowerCase().includes(datas.toLowerCase())
        ) {
          return true;
        }
      });

      return dataFilter;
    } else {
      return response.data.data;
    }
  }
);

export const getOneSurah = createAsyncThunk(
  "alquran/getOneSurah",
  async (id) => {
    const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
    return response.data.data;
  }
);

const dataSurahEntity = createEntityAdapter({
  selectId: (surah) => surah.nomor,
});

const dataSurah = createSlice({
  name: "alquran",
  initialState: dataSurahEntity.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(getDataAlquranSurah.fulfilled, (state, action) => {
        dataSurahEntity.setAll(state, action.payload);
      })
      .addCase(getOneSurah.fulfilled, (state, action) => {
        dataSurahEntity.setOne(state, action.payload);
      });
  },
});

// Juz
export const getDataAlquranJuz = createAsyncThunk(
  "juz/getDataAlquranJuz",
  async () => {
    const juzData = [];
    for (let id = 1; id <= 30; id++) {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/juz/${id}`
      );
      juzData.push(response.data.data);
    }
    return juzData;
  }
);
export const getDataJuzNumber = createAsyncThunk(
  "juz/getDataJuzNumber",
  async (id) => {
    const response = await axios.get(`https://api.alquran.cloud/v1/juz/${id}`);
    return response.data.data;
  }
);
const juzAdapter = createEntityAdapter({
  selectId: (juz) => juz.number,
});
const juzSlice = createSlice({
  name: "juz",
  initialState: juzAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(getDataAlquranJuz.fulfilled, (state, action) => {
        juzAdapter.setAll(state, action.payload);
      })
      .addCase(getDataJuzNumber.fulfilled, (state, action) => {
        juzAdapter.setOne(state, action.payload);
      });
  },
});

// Kisa nabi
export const getDataKisahNabiAll = createAsyncThunk(
  "kisah/getDataKisahNabiAll",
  async () => {
    const response = await axios.get(
      "https://islamic-api-zhirrr.vercel.app/api/kisahnabi"
    );
    return response.data;
  }
);

const dataKisahEntity = createEntityAdapter({
  selectId: (detail) => detail.name,
});

const kisahSlice = createSlice({
  name: "kisah",
  initialState: dataKisahEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getDataKisahNabiAll.fulfilled, (state, action) => {
      dataKisahEntity.setAll(state, action.payload);
    });
  },
});

// Kisah
export const kisahEntity = dataKisahEntity.getSelectors(
  (state) => state.kisahNabi
);
export const kisahNabiRosul = kisahSlice.reducer;

// Surah
export default dataSurah.reducer;
export const dataEntityAlquran = dataSurahEntity.getSelectors(
  (state) => state.alquran
);

// Juz
export const kirimDataJuz = juzAdapter.getSelectors((state) => state.juz);
export const dataJuz = juzSlice.reducer;
