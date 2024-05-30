document.addEventListener('DOMContentLoaded', function() {
    let viagens = JSON.parse(localStorage.getItem('viagens')) || [];

    function calcularTotalViagens() {
        return viagens.length;
    }

    function calcularTotalPeso() {
        return viagens.reduce((total, viagem) => total + parseInt(viagem.peso), 0);
    }

    function calcularMediaPeso() {
        let totalViagens = calcularTotalViagens();
        let totalPeso = calcularTotalPeso();
        return totalViagens > 0 ? (totalPeso / totalViagens).toFixed(2) : 0;
    }

    function renderRelatorio() {
        let totalViagensElement = document.getElementById('totalViagens');
        let relatorioBody = document.getElementById('relatorioBody');
        let mediaPesoElement = document.getElementById('mediaPeso');

        totalViagensElement.textContent = `Total de Viagens: ${calcularTotalViagens()}`;

        relatorioBody.innerHTML = '';
        viagens.forEach(viagem => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${viagem.data}</td>
                <td>${viagem.local}</td>
                <td>${viagem.peso}</td>
            `;
            relatorioBody.appendChild(row);
        });

        mediaPesoElement.textContent = `Média de Peso por Viagem: ${calcularMediaPeso()} kg`;
    }

    renderRelatorio();
});
