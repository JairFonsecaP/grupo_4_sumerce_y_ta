//CREAR PRODUCTO
/* document.getElementById('button-create').addEventListener('click', function() {
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
}) */
let abrir = false;
let hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', function() {
    if(hamburger.className.includes('fa-bars') ){
        document.querySelector('.sidebar').style.display = 'flex';
        hamburger.classList.remove("fa-bars");
        hamburger.classList.add("fa-times");
    } else{
        document.querySelector('.sidebar').style.display = 'none';
        hamburger.classList.remove("fa-times");
        hamburger.classList.add("fa-bars");
    }
});