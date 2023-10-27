async function consultCep() {
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.erro) {
        document.getElementById('resultado').textContent = 'CEP não encontrado. Verifique o CEP digitado.';
      } else {
        document.getElementById('resultado').textContent = `Endereço:  ${data.localidade}, ${data.uf}`;
      }
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      document.getElementById('resultado').textContent = 'Ocorreu um erro ao consultar o CEP. Tente novamente mais tarde.';
    }
  }