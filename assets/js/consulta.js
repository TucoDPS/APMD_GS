document.addEventListener('DOMContentLoaded', function() {
    let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
    let viagensList = document.getElementById('viagensList');
    let deleteSelectedButton = document.getElementById('deleteSelected');

    function renderViagens(viagens) {
        viagensList.innerHTML = '';
        viagens.forEach((viagem, index) => {
            let li = document.createElement('li');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.index = index;

            let span = document.createElement('span');
            span.textContent = `${viagem.data} - ${viagem.local} - ${viagem.peso} kg`;

            let editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', function() {
                let newData = prompt('Nova Data:', viagem.data);
                let newLocal = prompt('Novo Local:', viagem.local);
                let newPeso = prompt('Novo Peso (kg):', viagem.peso);

                if (newData && newLocal && newPeso) {
                    viagens[index] = { data: newData, local: newLocal, peso: newPeso };
                    localStorage.setItem('viagens', JSON.stringify(viagens));
                    renderViagens(viagens);
                } else {
                    alert('Todos os campos devem ser preenchidos.');
                }
            });

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', function() {
                viagens.splice(index, 1);
                localStorage.setItem('viagens', JSON.stringify(viagens));
                renderViagens(viagens);
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            viagensList.appendChild(li);
        });
    }

    function updateDeleteButtonState() {
        let selected = viagensList.querySelectorAll('input[type="checkbox"]:checked').length;
        deleteSelectedButton.disabled = selected === 0;
    }

    deleteSelectedButton.addEventListener('click', function() {
        let selectedCheckboxes = viagensList.querySelectorAll('input[type="checkbox"]:checked');
        let indicesToDelete = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.dataset.index));
        viagens = viagens.filter((_, index) => !indicesToDelete.includes(index));
        localStorage.setItem('viagens', JSON.stringify(viagens));
        renderViagens(viagens);
    });

    viagensList.addEventListener('change', updateDeleteButtonState);

    document.getElementById('search').addEventListener('input', function(event) {
        let searchText = event.target.value.toLowerCase();
        let filteredViagens = viagens.filter(viagem =>
            viagem.data.includes(searchText) ||
            viagem.local.toLowerCase().includes(searchText) ||
            viagem.peso.toLowerCase().includes(searchText)
        );
        renderViagens(filteredViagens);
    });

    renderViagens(viagens);
});

