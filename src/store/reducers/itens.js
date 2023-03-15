import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itensService from "services/itens";
import { v4 as uuid } from 'uuid';

const initialState = [];

export const buscarItens = createAsyncThunk(
    'itens/buscar',
    itensService.buscar
)

const itensSlice = createSlice({
    name: 'itens',
    initialState,
    reducers: {
        mudarFavorito: (state, { payload }) => {
            state = state.map(item => {
                if(item.id === payload) item.favorito = !item.favorito
                return item
            })
        },
        cadastrarItem: (state, { payload }) => {
            state.push({...payload, id: uuid() })
        },
        alterarItem: (state, { payload }) => {
            const index = state.findIndex(item => item.id === payload.id)
            Object.assign(state[index], payload.item)
        },
        deletarItem: (state, { payload }) => {
            const index = state.findIndex(item => item.id === payload)
            state.splice(index, 1)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(
                buscarItens.fulfilled,
                (state, { payload }) => {
                    state.push(...payload)
                }
            )
            .addCase(
                buscarItens.pending,
                () => {
                    console.log('Carregando itens')
                }
            )
            .addCase(
                buscarItens.rejected,
                () => {
                    console.log('Falha ao carregar itens') 
                }
            )
    }
});

export const { 
    mudarFavorito, 
    cadastrarItem, 
    alterarItem, 
    deletarItem 
} = itensSlice.actions;

export default itensSlice.reducer;