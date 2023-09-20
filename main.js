const inputcpf = document.querySelector('#cpf')
const inputphonenumber = document.querySelector('#telefoneInput');

const form = document.getElementById("form")
const nome = document.getElementById("nomeInput")
const sobrenome = document.getElementById("SobrenomeInput")
const email = document.getElementById("emailInput")
const cpf = document.getElementById("cpf")
const dataNascimento = document.getElementById("dataNascimentoInput")
const endereco = document.getElementById("enderecoInput")
const telefone = document.getElementById("telefoneInput")
const profissao = document.getElementById("profissaoInput")
const senha = document.getElementById("senhaInput")
const confirmacaoSenha = document.getElementById("confirmaSenhaInput")

// add mask in inputs(telefone (phone number) and CPF (indentity document))
let responseStates=[]
inputcpf.addEventListener('keypress', ()=>{  
        let inputlength = inputcpf.value.length
          if (inputlength === 3 || inputlength === 7) {
          inputcpf.value += '.'           
          }else 
            if(inputlength ===11){
             inputcpf.value += '-'
            }
        
      })

inputphonenumber.addEventListener('keypress', ()=>{  
  let inputlengthtel = inputphonenumber.value.length
    if (inputlengthtel === 0) {
    inputphonenumber.value += '('           
    }if(inputlengthtel === 3){
        inputphonenumber.value += ')'
      }if (inputlengthtel === 4 || inputlengthtel === 5) {
        inputphonenumber.value += ' '
      }else if (inputlengthtel === 10) {
        inputphonenumber.value += '-'           
        }
  
})

// instalation on API: estados and cidades
const urlUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const estado = document.getElementById("estado")


window.addEventListener('load', async ()=>{
    const request = await fetch(urlUF)
    const response = await request.json()
    responseStates=response
    const options = document.createElement("optgroup")
    options.setAttribute('label', 'estados')
    response.forEach(function(estado){
      options.innerHTML += '<option>' +estado.nome+ '</option>'     
    })
    
    estado.append(options)
})


estado.addEventListener('change', async function(){
  let sigla=""
  for (let index = 0; index < responseStates.length; index++) {
    if(responseStates[index].nome==estado.value)
      sigla=responseStates[index].sigla
  }
  const urlCidade = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+sigla+'/municipios'
  const request = await fetch(urlCidade)
  const response = await request.json()
  const options = document.createElement("optgroup")
    options.setAttribute('label', 'cidades')
    response.forEach(function(cidade){
      options.innerHTML += '<option>' +cidade.nome+ '</option>'     
    })
    cidade.append(options)
})


form.addEventListener("submit", function (event) {
event.preventDefault();
const valid = checkInputs();
if(valid){
  salvarFormulario();
}else{
  alert("Formulário não enviado devido a campos não preenchidos ou preenchidos incorretamente.");
}

})

function checkInputs() {
  const nomeValue = nome.value;
  const sobrenomeValue = sobrenome.value;
  const emailValue = email.value;
  const cpfValue = cpf.value;
  const dataNascimentoValue = dataNascimento.value;
  const enderecoValue = endereco.value;
  const telefoneValue = telefone.value;
  const profissaoValue = profissao.value;
  const senhaValue = senha.value;
  const confirmacaoSenhaValue = confirmacaoSenha.value;

  if(nomeValue === ""){
    setErrorFor(nome, "O Nome é obrigatório.");
    return false;
  } else {
    setSuccessFor(nome);
    return true
  }
  if(sobrenomeValue === ""){
    setErrorFor(sobrenome, "O Sobrenome é obrigatório.");
    return false;
  } else {
    setSuccessFor(sobrenome);
    return true
  }
  if(cpfValue === ""){
    setErrorFor(cpf, "O CPF é obrigatório.");
    return false;
  } else if(cpfValue.length === 14) {
    setSuccessFor(cpf);
    return true
  }else{
    setErrorFor(cpf, "Campo CPF incompleto")
    return false;
  }
  if(dataNascimentoValue === ""){
    setErrorFor(dataNascimento, "A data de nascimento é obrigatório.");
    return false;
  } else {
    setSuccessFor(dataNascimento);
    return true
  }
  if(enderecoValue === ""){
    setErrorFor(endereco, "O endereço é obrigatório.");

    return false;
  } else {
    setSuccessFor(endereco);
    return true
  }
  if(telefoneValue === ""){
    setErrorFor(telefone, "O Telefone é obrigatório.");
    return false;
  } else {
    setSuccessFor(telefone);
    return true
  }
  if(profissaoValue === ""){
    setErrorFor(profissao, "A Profissão é obrigatório.");
    return false;
  } else {
    setSuccessFor(profissao);
    return true
  }
  if(senhaValue === ""){
    setErrorFor(senha, "A Senha é obrigatório.");
    return false;
  } else {
    setSuccessFor(senha);
    return true
  }
  if(confirmacaoSenhaValue === ""){
    setErrorFor(confirmacaoSenha, "A Confirmação de Senha é obrigatório.");
    return false;
  } else {
    setSuccessFor(confirmacaoSenha);
    return true
  }

}





function setErrorFor(input, message) {
  const campo = input.parentElement;
  const small = campo.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  campo.className = "campo error";
  
  
}

function setSuccessFor(input) {
  const campo = input.parentElement;

  // Adicionar a classe de sucesso
  campo.className = "campo success";
  check = new Boolean(true);
}


function salvarFormulario() {
  const formData = {
      nome: document.getElementById("nomeInput").value,
      sobrenome: document.getElementById("SobrenomeInput").value,
      email: document.getElementById("emailInput").value,
      cpf: document.getElementById("cpf").value,
      genero: document.getElementById("genero").value,
      dataNascimento: document.getElementById("dataNascimentoInput").value,
      endereco: document.getElementById("enderecoInput").value,
      telefone: document.getElementById("telefoneInput").value,
      profissao: document.getElementById("profissaoInput").value,
      informaçõesAdicionais: document.getElementById("informacaoAdicional").value,
      Estado: document.getElementById("estado").value,
      cidade: document.getElementById("cidade").value,
      senha: document.getElementById("senhaInput").value,
      confirmacaoDeSenha: document.getElementById("confirmaSenhaInput").value,
      // Adicione outros campos conforme necessário
  };

  // Armazena os dados no localStorage como uma string JSON
  
   localStorage.setItem('formularioData', JSON.stringify(formData));

   alert('Formulário salvo com sucesso no localStorage.');

  
  
}





























//document.getElementById("senhaForm").addEventListener("submit", function(event) {
   // var senha = document.getElementById("senhaInput").value;
    //var confirmacaoSenha = document.getElementById("confirmaSenhaInput").value;

   // var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{5,30}$/;

   // if (!regex.test(senha)) {
 //       document.getElementById("senhaErro").innerHTML = "A senha deve ter entre 5 e 30 caracteres e incluir pelo menos 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.";
 //       event.preventDefault(); // Impede o envio do formulário
  //  } else if (senha !== confirmacaoSenha) {
  //      document.getElementById("senhaErro").innerHTML = "As senhas não coincidem.";
 //       event.preventDefault(); // Impede o envio do formulário
 //   } else {
  //      document.getElementById("senhaErro").innerHTML = "";
  //  }
//});
    