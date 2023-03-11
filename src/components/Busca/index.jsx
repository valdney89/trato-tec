import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { mudarBusca, resetarBusca } from 'store/reducers/busca'
import styles from './Busca.module.scss'

export default function Busca() {

  const busca = useSelector(state => state.busca)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(resetarBusca())
  }, [location.pathname, dispatch])

  return (
    <div className={styles.busca}>
        <input
            type="text"
            placeholder="O que você procura?"
            className={styles.input}
            value={busca}
            onChange={event => dispatch(mudarBusca(event.target.value))}
        />
    </div>
  )
}
