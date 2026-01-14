import api from '../../services/api'
import { useEffect, useState, useRef} from 'react'
import './style.css'


function Home() {
 
 const [produtos, setProdutos] = useState([])

 const inputTipo = useRef()
 const inputValor = useRef()
 const inputQuant = useRef()

 async function getProduto() {
  const produtosAPI = await api.get('/produtos')
  setProdutos(produtosAPI.data)
  console.log(produtos)
}

 async function addProduto(){
  await api.post('/produtos', {
    tipo: inputTipo.current.value,
    valor: inputValor.current.value,
    quant: inputQuant.current.value
  })

  getProduto()

 }

 async function deleteProduto(id){
  await api.delete(`/produtos/${id}`)
  getProduto()

 }

  useEffect(() => {
  getProduto()
}, [])

  return (
    <div className='container'>
      <img src="logo.jpeg" alt="Vitrine do Mar" className="logo" />
      <div>
        <form>
          <h1>Cadastro de Produtos</h1>
          <input tipo='tipo' type='text' placeholder='Tipo' ref={inputTipo}/>
          <input valor='valor' type='number' placeholder='Valor' ref={inputValor} />
          <input quantidade='quantidade' type='number' placeholder='Quantidade' ref={inputQuant} />
          <button type='button' onClick={addProduto}> Cadastrar </button>
        </form>
      </div>

      {produtos.map(prod => (
        <div key={prod.id} className='card'>
          <div>
            <p> Tipo: <span>{prod.tipo} </span> </p>
            <p> Valor: <span>R${prod.valor} </span></p>
            <p>Quantidade: <span>{prod.quant}</span> </p>
          </div>
          <button onClick={() => deleteProduto(prod.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
