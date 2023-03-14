import React, { useState } from 'react'
import styles from './Item.module.scss'
import {
    AiOutlineHeart,
    AiFillHeart,
    AiFillMinusCircle,
    AiFillPlusCircle,
    AiOutlineCheck,
    AiFillEdit,
    AiFillCloseCircle
} from 'react-icons/ai'
import { FaCartPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { alterarItem, deletarItem, mudarFavorito } from 'store/reducers/itens'
import { mudarCarrinho, mudarQuantidade } from 'store/reducers/carrinho'
import classNames from 'classnames'

const iconesProps = {
    size: 24,
    color: '#041833'
}

const qtdProps = {
    size: 32,
    color: '#1875E8'
}

export default function Item(props) {

    const {
        titulo,
        foto,
        preco,
        descricao,
        favorito,
        id,
        carrinho,
        quantidade
    } = props

    const dispatch = useDispatch()
    const estaNoCarrinho = useSelector(state => state.carrinho.some(item => item.id === id))
    const [modoEdicao, setModoEdicao] = useState(false)
    const [novoTitulo, setNovoTitulo] = useState(titulo)

    function handleFavorito() {
        dispatch(mudarFavorito(id))
    }

    function handleCarrinho() {
        dispatch(mudarCarrinho(id))
    }

    return (
        <div className={classNames(styles.item, {
           [styles.itemNoCarrinho]: carrinho 
        })}>
            <AiFillCloseCircle  
                {...iconesProps} 
                className={`${styles['item-acao']} ${styles['item-deletar']}`}
                onClick={() => dispatch(deletarItem(id))}
            />
            <div className={styles['item-imagem']}>
                <img src={foto} alt={titulo} />
            </div>
            <div className={styles['item-descricao']}>
                <div className={styles['item-titulo']}>
                    {
                        modoEdicao
                            ?   <input 
                                    type="text" 
                                    value={novoTitulo}
                                    onChange={event => setNovoTitulo(event.target.value)}
                                /> 
                            :   <h2>{titulo}</h2>
                    }
                    <p>{descricao}</p>
                </div>
                <div className={styles['item-info']}>
                    <div className={styles['item-preco']}>
                        R$ {preco.toFixed(2)}
                    </div>
                    <div className={styles['item-acoes']}>
                        {
                            favorito
                                ?   <AiFillHeart 
                                        {...iconesProps} 
                                        className={styles['item-acao']}
                                        onClick={handleFavorito} 
                                    />
                                :   <AiOutlineHeart 
                                        {...iconesProps}
                                        className={styles['item-acao']} 
                                        onClick={handleFavorito} 
                                    />
                        }
                        {
                            carrinho
                            ?   <div className={styles.quantidade}>
                                    Quantidade:
                                    <AiFillMinusCircle {...qtdProps} onClick={() => {
                                        if(quantidade >= 1) {
                                            dispatch(mudarQuantidade({ id, quantidade: -1 }))
                                        }
                                    }} />
                                    <span>{String(quantidade || 0).padStart(2, '0')}</span>
                                    <AiFillPlusCircle {...qtdProps} onClick={() => dispatch(mudarQuantidade({ id, quantidade: +1 }))} />
                                </div>
                            :   
                                <>
                                    <FaCartPlus 
                                        {...iconesProps}
                                        color={estaNoCarrinho ? '#1875E8' : iconesProps.color}
                                        className={styles['item-acao']} 
                                        onClick={handleCarrinho}
                                    />
                                    {
                                        modoEdicao 
                                            ?   <AiOutlineCheck
                                                    {...iconesProps}
                                                    className={styles['item-acao']} 
                                                    onClick={() => {
                                                        setModoEdicao(false)
                                                        dispatch(alterarItem({id, item:  { titulo: novoTitulo }}))
                                                    }}
                                                /> 
                                            :   <AiFillEdit 
                                                    {...iconesProps}
                                                    className={styles['item-acao']}
                                                    onClick={() => setModoEdicao(true)} 
                                                />
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
