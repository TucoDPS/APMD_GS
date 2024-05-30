document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let data = document.getElementById('data').value;
    let local = document.getElementById('local').value;
    let peso = document.getElementById('peso').value;

    if (data && local && peso) {
        let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        viagens.push({ data, local, peso });
        localStorage.setItem('viagens', JSON.stringify(viagens));
        alert('Viagem cadastrada com sucesso!');
        document.getElementById('cadastroForm').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
