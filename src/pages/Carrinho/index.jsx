import Button from 'components/Button';
import Header from 'components/Header';
import Item from 'components/Item';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetarCarrinho } from 'store/reducers/carrinho';
import styles from './Carrinho.module.scss'

export default function Carrinho() {

    const { carrinhos, total } = useSelector(state => {
        let total = 0;
        const regExp = new RegExp(state.busca, 'i')
        const carrinhoReduce = state.carrinho.reduce((itens, itemNoCarrinho) => {
            const item = state.itens.find(item => item.id === itemNoCarrinho.id)
            
            total += (item.preco * itemNoCarrinho.quantidade)
            
            if(item.titulo.match(regExp)) {
                itens.push({
                    ...item,
                    quantidade: itemNoCarrinho.quantidade
                })
            }

            return itens
        }, [])

        return {
            carrinhos: carrinhoReduce,
            total: total
        };
    })

    const dispatch = useDispatch()

    return (
        <div>
            <Header
            titulo='Carrinho de compras'
            descricao='Confira produtos que você adicionou ao carrinho.'
        />
            <div className={styles.carrinho}>
                {
                    carrinhos.map(
                        item => <Item key={item.id} {...item} carrinho />
                    )
                }
                <div className={styles.total}>
                    <strong>
                    Resumo da compra
                    </strong>
                    <span>
                    Subtotal: <strong> R$ {total.toFixed(2)} </strong>
                    </span>
                </div>
                <Button
                    onClick={() => dispatch(resetarCarrinho())}
                >
                    Finalizar Compra
                </Button>
            </div>
        </div>
    )
}
