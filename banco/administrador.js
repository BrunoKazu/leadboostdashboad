function habilitarEdicao() {
    const form = document.getElementById('myForm');
    const inputs = form.querySelectorAll('input');
    const editarButton = document.getElementById('editarButton');
    const salvarButton = document.getElementById('salvarButton');
    const cancelarButton = document.getElementById('cancelarButton');

    inputs.forEach(input => {
        input.removeAttribute('disabled');
    });

    editarButton.style.display = 'none';
    salvarButton.style.display = 'inline-block';
    cancelarButton.style.display = 'inline-block';
}

function salvarEdicao() {
    const form = document.getElementById('myForm');
    const inputs = form.querySelectorAll('input');
    const editarButton = document.getElementById('editarButton');
    const salvarButton = document.getElementById('salvarButton');
    const cancelarButton = document.getElementById('cancelarButton');

    inputs.forEach(input => {
        input.setAttribute('disabled', true);
    });

    editarButton.style.display = 'inline-block';
    salvarButton.style.display = 'none';
    cancelarButton.style.display = 'none';
}

function cancelarEdicao() {
    const form = document.getElementById('myForm');
    const inputs = form.querySelectorAll('input');
    const editarButton = document.getElementById('editarButton');
    const salvarButton = document.getElementById('salvarButton');
    const cancelarButton = document.getElementById('cancelarButton');

    inputs.forEach(input => {
        input.setAttribute('disabled', true);
    });

    editarButton.style.display = 'inline-block';
    salvarButton.style.display = 'none';
    cancelarButton.style.display = 'none';
}



<script src="../banco/administrador.js"></script>