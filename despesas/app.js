class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == null || this[i] == '') {
                return false
            }
        }
        return true
    }

}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1;
    }

    gravar(dadosDespesa) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(dadosDespesa))
        localStorage.setItem('id', id)
    }
    recuperarRegistros() {
        let recId = localStorage.getItem('id')

        for (let i = 1; i <= recId; i++) {
            let meusDados = JSON.parse(localStorage.getItem(i))
            meusDados.id = i
            let listaDespesas = document.getElementById('corpoTabelaRetorno')
            listaDespesas.insertRow().innerHTML = (`<tr>
            <td>${meusDados.dia}/${meusDados.mes}/${meusDados.ano}</td>
            <td>${meusDados.tipo}</td>
            <td style="text-transform: capitalize">${meusDados.descricao}</td>
            <td>${meusDados.valor}</td>
            <td><button type="button" id="id_despesa_${meusDados.id}" class="btn btn-danger btn-sm" onclick="removerItem(${i})"><i class="fas fa-trash"></i></button></td>
        </tr>`)
        }
    }
     

    pesquisar(despesa) {
        let despesas = Array()

        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            despesas.push(despesa)
        }

        if(despesa.ano != ''){
            despesas = despesas.filter(d => d.ano == despesa.ano);
        }
        
        if(despesa.mes != ''){
            despesas = despesas.filter(d => d.mes == despesa.mes);
        }

        if(despesa.dia != ''){
            despesas = despesas.filter(d => d.dia == despesa.dia);
        }

        if(despesa.tipo != ''){
            despesas = despesas.filter(d => d.tipo == despesa.tipo);
        }

        if(despesa.descricao != ''){
            despesas = despesas.filter(d => d.descricao == despesa.descricao);
        }

        if(despesa.valor != ''){
            despesas = despesas.filter(d => d.valor == despesa.valor);
        }

        return despesas;
    }
    
    remover(idRemover){
        localStorage.removeItem(idRemover)
        id = localStorage.setItem('id', value--)
    }
}

let bd = new Bd()

function cadastrarDespesas() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )


    if (despesa.validarDados() === true) {
        bd.gravar(despesa);
        let titulo = 'Estes dados foram salvos'
        modal(titulo)

        document.getElementById('corpoModal').innerHTML = (`<p>Gasto adicionado</p>
        <table class="table table-sm">
            <thead>
            <tr>
                <th scope="col">Ano</th>
                <th scope="col">Mês</th>
                <th scope="col">Dia</th>
                <th scope="col">Tipo</th>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>${ano.value}</td>
                <td>${mes.value}</td>
                <td>${dia.value}</td>
                <td>${tipo.value}</td>
                <td style="text-transform: capitalize">${descricao.value}</td>
                <td>${valor.value}</td>
            </tr>
            </tbody>
        </table>
`)

    } else {
        let titulo = 'Estes dados não foram salvos'
        modal(titulo)
        document.getElementById('corpoModal').innerHTML = (`<h3>Adicione os valores corretamente</h3>
`)

    }
    
}

function limparDados() {
    for (let i in this) {
        this[i] = ''
    }
}

function modal(titulo) {
    this.retorno = titulo
    let modal = document.getElementById('exampleModalCenter').innerHTML = (`
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">${retorno}</h5>
        </div>
        <div class="modal-body" id="corpoModal">
            
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="limparDados()">Fechar</button>
        </div> 
      </div>
    </div>`)
    return modal
}

function carregarListaDespesas() {
    bd.recuperarRegistros()
}

function pesquisarDespesas() {
   let ano = document.getElementById('ano').value
   let mes = document.getElementById('mes').value
   let dia = document.getElementById('dia').value
   let tipo = document.getElementById('tipo').value
   let descricao = document.getElementById('descricao').value
   let valor = document.getElementById('valor').value
    
   let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

   let resultadoDespesas = bd.pesquisar(despesa)

    let id = resultadoDespesas.length
    despesa = document.getElementById('corpoTabelaRetorno')
    despesa.innerHTML = ''
        for (let i = 0; i <= id; i++) {
            resultadoDespesas[i].id = i
            despesa.insertRow().innerHTML = (`<tr>
            <td>${resultadoDespesas[i].dia}/${resultadoDespesas[i].mes}/${resultadoDespesas[i].ano}</td>
            <td>${resultadoDespesas[i].tipo}</td>
            <td style="text-transform: capitalize">${resultadoDespesas[i].descricao}</td>
            <td>${resultadoDespesas[i].valor}</td>
            <td><button type="button" id="id_despesa_${resultadoDespesas[i].id}" class="btn btn-danger btn-sm botao_remover" onclick="removerItem(${i})"><i class="fas fa-trash"></i></button></td>
        </tr>`)
    }   
}

function removerItem(valorId){
    location.reload('consulta.html')
    bd.remover(valorId)
}