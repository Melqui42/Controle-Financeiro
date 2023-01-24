import React from "react";

import { MdAttachMoney } from "react-icons/md";
import { BsArrowDownCircle, BsArrowUpCircle, BsTrash } from "react-icons/bs";

import "./App.scss";

function App() {
  const [valor, setValor] = React.useState("");
  const [descricao, setdescricao] = React.useState("");
  const [tipoDeTransferencia, setTipoDeTransferencia] = React.useState(false);

  const data = localStorage.getItem("listaFinanceira");

  const [listaFinanceira, setListaFinanceira] = React.useState(
    data ? JSON.parse(data) : []
  );

  function addItemFinanceiro() {
    const item = {
      id: listaFinanceira.length,
      valor: valor,
      descricao: descricao,
      tipoDeTransferencia: tipoDeTransferencia,
    };

    const newList = [...listaFinanceira, item];

    setListaFinanceira(newList);
    localStorage.setItem("listaFinanceira", JSON.stringify(newList));

    setValor("");
    setdescricao("");
  }

  function removerItemFinanceiro(id) {
    const remover = listaFinanceira.filter((item) => item.id !== id);
    setListaFinanceira(remover);

    localStorage.setItem("listaFinanceira", JSON.stringify(remover));
  }

  const [entradas, setEntradas] = React.useState(0);
  const [saidas, setSaidas] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const listaDeDespesas = listaFinanceira
      .filter((item) => !item.tipoDeTransferencia)
      .map((item) => Number(item.valor));

    const listaDeRenda = listaFinanceira
      .filter((item) => item.tipoDeTransferencia)
      .map((item) => Number(item.valor));

    const despesas = listaDeDespesas
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);

    const renda = listaDeRenda.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const total = Math.abs(renda - despesas).toFixed(2);

    setEntradas(renda);
    setSaidas(despesas);
    setTotal(`${Number(renda) < Number(despesas) ? "-" : ""}${total}`);
  }, [listaFinanceira]);

  return (
    <div className="App">
      <h1>
        Controle de Finanças(<span>React JS</span>)
      </h1>
      <div className="Container">
        <ul className="List">
          <li className="Item">
            <div className="Card">
              <div>
                <p>Entradas</p>
                <BsArrowUpCircle id="Positivo" />
              </div>
              <h2>R$ {entradas}</h2>
            </div>
          </li>
          <li className="Item">
            <div className="Card">
              <div>
                <p>Saídas</p>
                <BsArrowDownCircle id="Negativo" />
              </div>
              <h2>R$ {saidas}</h2>
            </div>
          </li>
          <li className="Item">
            <div className="Card">
              <div>
                <p>Total</p>
                <MdAttachMoney className="Icon" />
              </div>
              <h2>R$ {total}</h2>
            </div>
          </li>
        </ul>
        <div className="Panel">
          <div className="InputText">
            <label htmlFor="">
              Valor:
              <input
                type="number"
                name=""
                id=""
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Insira um valor"
              />
            </label>
            <label htmlFor="">
              Descrição:
              <input
                type="text"
                name=""
                id=""
                value={descricao}
                onChange={(e) => setdescricao(e.target.value)}
                placeholder="Insira uma descrição"
              />
            </label>
          </div>
          <div className="InputCheckbox">
            <label htmlFor="">
              <input
                type="radio"
                id=""
                name="group1"
                onChange={() => {
                  setTipoDeTransferencia(!tipoDeTransferencia);
                }}
              />
              Entrada
            </label>
            <label htmlFor="">
              <input
                type="radio"
                id=""
                defaultChecked
                name="group1"
                onChange={() => {
                  setTipoDeTransferencia(!tipoDeTransferencia);
                }}
              />
              Sáida
            </label>
          </div>
          <button onClick={addItemFinanceiro}>ADICIONAR</button>
        </div>
        <div className="Content">
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listaFinanceira?.map((obj) => {
                return (
                  <tr key={obj.id}>
                    <td>{obj.descricao}</td>
                    <td>{`R$ ${obj.valor}`}</td>
                    <td>
                      {!obj.tipoDeTransferencia ? (
                        <BsArrowDownCircle id="Negativo" />
                      ) : (
                        <BsArrowUpCircle id="Positivo" />
                      )}
                    </td>
                    <td>
                      <button onClick={() => removerItemFinanceiro(obj.id)}>
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
