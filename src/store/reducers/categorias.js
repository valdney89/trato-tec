import { createStandaloneToast } from '@chakra-ui/toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoriasService from 'services/categorias';

const { toast } = createStandaloneToast()

const initialState = [];

export const buscarCategorias = createAsyncThunk(
    'categorias/buscar',
    categoriasService.buscar
)

const categoriasSlice = createSlice({
    name: 'categorias',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(
                buscarCategorias.fulfilled,
                (state, { payload }) => {
                    toast({
                        title: 'Sucesso!',
                        description: 'Categorias carregadas com sucesso!',
                        duration: 2000,
                        isClosable: true,
                        status: 'success'
                    })
                    state.push(...payload)
                }
            )
            .addCase(
                buscarCategorias.pending,
                () => {
                    toast({
                        title: 'Carregando!',
                        description: 'Carregando Categorias',
                        duration: 2000,
                        isClosable: true,
                        status: 'loading'
                    })
                }
            )
            .addCase(
                buscarCategorias.rejected,
                () => {
                    toast({
                        title: 'Erro!',
                        description: 'Erro na busca de categorias!',
                        duration: 2000,
                        isClosable: true,
                        status: 'error'
                    })
                }
            )
    }
});

export default categoriasSlice.reducer;