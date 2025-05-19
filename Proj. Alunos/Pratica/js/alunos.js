const apiUrl = 'http://leoproti.com.br:8004/alunos';
const alunoForm = document.getElementById('alunoForm');
const alunosBody = document.getElementById('alunosBody');

// Função para buscar e exibir os alunos
async function listarAlunos() {
    try {
        const response = await fetch(apiUrl);
        const alunos = await response.json();
        alunosBody.innerHTML = ''; // Limpa a tabela

        alunos.forEach(aluno => {
            const row = alunosBody.insertRow();
            row.insertCell().textContent = aluno.id;
            row.insertCell().textContent = aluno.nome;
            row.insertCell().textContent = aluno.matricula;
            row.insertCell().textContent = aluno.email;

            const actionsCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('btn', 'btn-sm', 'btn-warning', 'me-2');
            editButton.addEventListener('click', () => editarAluno(aluno.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
            deleteButton.addEventListener('click', () => excluirAluno(aluno.id));

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
        alert('Erro ao listar alunos.');
    }
}

// Função para cadastrar um novo aluno
async function cadastrarAluno(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const matricula = document.getElementById('matricula').value;
    const email = document.getElementById('email').value;

    const novoAluno = {
        nome: nome,
        matricula: matricula,
        email: email
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoAluno)
        });

        if (response.ok) {
            alunoForm.reset();
            listarAlunos(); // Atualiza a tabela após o cadastro
        } else {
            const errorData = await response.json();
            console.error('Erro ao cadastrar aluno:', errorData);
            alert('Erro ao cadastrar aluno.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        alert('Erro ao cadastrar aluno.');
    }
}

// Função para editar um aluno (será implementada posteriormente)
async function editarAluno(id) {
    const novoNome = prompt("Digite o novo nome:");
    if (novoNome !== null) {
        const novoEmail = prompt("Digite o novo email:");
        if (novoEmail !== null) {
            try {
                const response = await fetch(`${apiUrl}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome: novoNome, email: novoEmail })
                });

                if (response.ok) {
                    listarAlunos();
                } else {
                    const errorData = await response.json();
                    console.error('Erro ao editar aluno:', errorData);
                    alert('Erro ao editar aluno.');
                }
            } catch (error) {
                console.error('Erro ao editar aluno:', error);
                alert('Erro ao editar aluno.');
            }
        }
    }
}

// Função para excluir um aluno
async function excluirAluno(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                listarAlunos(); // Atualiza a tabela após a exclusão
            } else {
                const errorData = await response.json();
                console.error('Erro ao excluir aluno:', errorData);
                alert('Erro ao excluir aluno.');
            }
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
            alert('Erro ao excluir aluno.');
        }
    }
}

// Adiciona o listener para o formulário de cadastro
alunoForm.addEventListener('submit', cadastrarAluno);

// Carrega a lista de alunos ao carregar a página
listarAlunos();