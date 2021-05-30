//CREAR PRODUCTO
document.getElementById('button-create').addEventListener('click', function() {
    document.querySelector('.modal-create').style.display = 'flex';
});

document.querySelector('.close-create').addEventListener('click', function() {
    document.querySelector('.modal-create').style.display = 'none';
})
//EDITAR PRODUCTO
document.getElementById('button-edit').addEventListener('click', function() {
    document.querySelector('.modal-edit').style.display = 'flex';
});

document.querySelector('.close-edit').addEventListener('click', function() {
    document.querySelector('.modal-edit').style.display = 'none';
})

