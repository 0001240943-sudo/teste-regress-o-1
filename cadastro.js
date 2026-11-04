function validarCadastro(d) {
  const erros = [];
  if (d.nome.trim() === "") erros.push("Nome obrigatório");
  if (!d.email.includes("@") || !d.email.includes(".")) erros.push("E-mail inválido");
  if (d.senha.length < 6) erros.push("Senha deve ter no mínimo 6 caracteres");
  if (d.senha !== d.confirmar) erros.push("As senhas não conferem");
  if (d.cpf.replace(/\D/g, "").length !== 11) erros.push("CPF deve ter 11 números");
  if (d.endereco.trim() === "") erros.push("Endereço obrigatório");
  return erros;
}

function salvarCadastro(d) {
  const lista = JSON.parse(localStorage.getItem("cadastros") || "[]");
  lista.push({
    nome: d.nome,
    email: d.email,
    senha: d.senha,
    cpf: d.cpf,
    endereco: d.endereço
  });
  localStorage.setItem("cadastros", JSON.stringify(lista));
  return lista;
}

function baixarTxt(lista) {
  const blob = new Blob([JSON.stringify(lista, null, 2)], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cadastros.txt";
  a.click();
}

const form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
      confirmar: document.getElementById("confirmar").value,
      cpf: document.getElementById("cpf").value,
      endereco: document.getElementById("endereco").value
    };

    const erros = validarCadastro(dados);
    const mensagem = document.getElementById("mensagem");

    if (erros.length > 0) {
      mensagem.innerHTML = erros.join("<br>");
      return;
    }

    const lista = salvarCadastro(dados);
    baixarTxt(lista);
    mensagem.textContent = "Cadastro realizado com sucesso!";
    form.reset();
  });
}