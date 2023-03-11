import PaginaPadrao from "components/PaginaPadrao";
import Carrinho from "pages/Carrinho";
import Categoria from "pages/Categoria";
import Home from "pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PaginaPadrao />}>
                    <Route index element={<Home />}></Route>
                    <Route path='/categoria/:nomeCategoria' element={<Categoria />}></Route>
                    <Route path='carrinho' element={<Carrinho />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}