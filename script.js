document.getElementById("formJogador").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const nome = document.getElementById("nome").value;
    const partidas = parseInt(document.getElementById("partidas").value);
    const pontos = parseInt(document.getElementById("pontos").value);
    const media = (pontos / (partidas || 1)).toFixed(2);
  
    const tabela = document.getElementById("tabelaRanking").querySelector("tbody");
  
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
      <td>${nome}</td>
      <td>${partidas}</td>
      <td>${pontos}</td>
      <td>${media}</td>
    `;
  
    tabela.appendChild(novaLinha);
    ordenarRanking();
    document.getElementById("formJogador").reset();
  });
  
  function ordenarRanking() {
    const tabela = document.getElementById("tabelaRanking").querySelector("tbody");
    const linhas = Array.from(tabela.querySelectorAll("tr"));
  
    linhas.sort((a, b) => {
      const pontosA = parseInt(a.children[2].textContent);
      const pontosB = parseInt(b.children[2].textContent);
      return pontosB - pontosA;
    });
  
    linhas.forEach(linha => tabela.appendChild(linha));
  }
  