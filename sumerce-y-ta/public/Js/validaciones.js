// ID de formularios(los acabo de crear yo así que no hay problema de editarlos)= #form-crear #form-editar #form-login #form-register
// Id campos de creacion prod (ya estaban creados)= #name #description #photo #categories (En talla el id es id="<%= talla.size %>") (Tonalidad id="<%= tonalidad.color%>") #price
// ID campos de edicion prod (ya estaban creados)= #name #description #photo #categorieEdit id="<%= talla.size %>" id="<%= tonalidad.color%>" #price
// ID campos de login (los acabo de crear yo así que no hay problema de editarlos)= #user #passwordLogin
// ID campos de registro (ya estaban creados)= #name #phone #photo #region #comuna #email #emailConfirmation #password #passwordConfirmation 
window.addEventListener('load', function() {
   let formCrear = document.querySelector("#form-crear");
   let formEditar = document.querySelector("#form-editar");
   let formlogin = document.querySelector("#form-login");
   let formRegister = document.querySelector("#form-register");

// Validacion creacion  de productos   
   if(formCrear){
    formCrear.addEventListener("submit", (evento)=>{      
        let errors = []; 

        let name = document.querySelector("#name");
        if(name.value === ""){
         errors.push('El nombre no puede estar vacío');
        }
        let photo = document.querySelector("#photo");
        let validPhoto = [".jpeg", ".jpg", ".png"]; 
        if(photo.value === ""){
         errors.push('Tienes que subir una foto');
        }
        if(!validPhoto.includes(photo.value.substr(photo.value.length - 3)) && photo.value != ""){
            errors.push("Solo se permiten fotos en formato ${validExtentions.join(', ')}");
        }
        let categories = document.querySelector("#categories");
        if(categories.value==""){
            errors.push("Elegir categoria");
        }
        let price = document.querySelector("#price");
        if(price.value==""){
            errors.push("Ingrese Precio");
        }    
        if(errors.length > 0){
            evento.preventDefault();
            let ulerrors = document.querySelector("div.errors ul");
            for(let i = 0; i < errors.length; i++){
                ulerrors.innerHTML += "<li>" + errors[i] +"</li>"
            }
        }
        })
   }        
// Validacion edicion de productos 
   if(formEditar){
    formEditar.addEventListener("submit", (evento)=>{
        let errors = []; 

        let name = document.querySelector("#name");
        if(name.value === ""){
         errors.push('El nombre no puede estar vacío');
        }
        let photo = document.querySelector("#photo");
        let validPhoto = [".jpeg", ".jpg", ".png"]; 
        if(photo.value === ""){
         errors.push('Tienes que subir una foto');
        } else if(!validPhoto.includes(photo.value.substr(photo.value.length - 3))){
            errors.push("Solo se permiten fotos en formato ${validExtentions.join(', ')}");
        }
        let categories = document.querySelector("#categories");
        if(categories.value==""){
            errors.push("Elegir categoria");
        }
        let price = document.querySelector("#price");
        if(price.value==""){
            errors.push("Ingrese Precio");
        } 
        if(errors.length > 0){
            evento.preventDefault();
            let ulerrors = document.querySelector("div.errors ul");
            for(let i = 0; i < errors.length; i++){
                ulerrors.innerHTML += "<li>" + errors[i] +"</li>"
            }
        }
      })
   } 
//vallidaciones del login
   if(formlogin){
    formlogin.addEventListener("submit", (evento)=>{
        let errors = []; 

        let user = document.querySelector("#user");
        if(user.value === ""){
         errors.push('El usuario no puede estar vacío');
        }
        let passwordLogin = document.querySelector("#passwordLogin");
        if(passwordLogin.value === ""){
         errors.push('La contraseña no puede estar vacía');
        }
        if(errors.length > 0){
            evento.preventDefault();
            let ulerrors = document.querySelector("div.errors ul");
            for(let i = 0; i < errors.length; i++){
                ulerrors.innerHTML += "<li>" + errors[i] +"</li>"
            }
        }
    })
   }
// validaciones del registro
   if(formRegister){
    formRegister.addEventListener("submit", (evento)=>{
        let errors = []; 

        let name = document.querySelector("#name");
        if(name.value === ""){
         errors.push('El usuario no puede estar vacío');
        }
        if(name.value.length < 5){
         errors.push('El usuario debe tener mas de 5 carácteres')
        }
        let email = document.querySelector("#email");
        let regular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(email.value === ""){
         errors.push('El email no puede estar vacío');
        }
        if(email.value.length < 5){
         errors.push('El email debe tener mas de 5 carácteres')
        } else if (!regular.test(email.value)){
            errores.push('Formato de email no valido');
        }
        let emailConfirmation = document.querySelector("#emailConfirmation");
        if(emailConfirmation.value === ""){
         errors.push('Confirma tu email');
        }
        let password = document.querySelector("#password");
        if(password.value === ""){
         errors.push('La contraseña no puede estar vacía');
        }
        if(password.value.length < 4){
            errors.push('La contraseña debe tener mas de 4 carácteres');
           }
        let passwordConfirmation = document.querySelector("#passwordConfirmation");
        if(passwordConfirmation.value === ""){
            errors.push('Confirma tu contraseña');
           }
        if(errors.length > 0){
            evento.preventDefault();
            let ulerrors = document.querySelector("div.errors ul");
            for(let i = 0; i < errors.length; i++){
                ulerrors.innerHTML += "<li>" + errors[i] +"</li>"
            }
        }
        
    })
   } 
 
})
