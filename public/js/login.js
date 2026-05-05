const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');
const btnSendLogin = document.getElementById('btn-send-login');
const btnSendRegister = document.getElementById('btn-send-register');

const inputDni= document.getElementById('input-dni');
const inputNombre= document.getElementById('input-nombre');
const inputNuevoEmail= document.getElementById('input-new-email');
const inputNuevoPassword= document.getElementById('input-new-psw');

const inputEmail= document.getElementById('input-email');
const inputPassword= document.getElementById('input-psw');

const contenedorRegistro = document.getElementById('register-container');
const contenedorLogin = document.getElementById('login-container');



document.addEventListener('DOMContentLoaded',  () => {
    contenedorLogin.style.display="none";
    contenedorRegistro.style.display="none";
});


btnRegister.addEventListener('click', () =>{
    contenedorRegistro.style.display="block";
    contenedorLogin.style.display="none";

})

btnLogin.addEventListener('click', () =>{
    contenedorRegistro.style.display="none";
    contenedorLogin.style.display="block";

})

btnSendLogin.addEventListener('click', async () =>{
    email = inputEmail.value.trim()
    password = inputPassword.value.trim()

    if (!email || !password){
        alert("Complete todos los campos.")
        return
    }
    try{
        login = {email,password}
        const res = await fetch('/api/auth/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(login)
        });

        const data = await res.json();

        if (!res.ok){
            alert(data.error || 'Error al iniciar sesión')
            return
        }
        //GUARDAR TOKEN
        localStorage.setItem('token',data.token)
        localStorage.setItem('usuario',JSON.stringify(data.usuario))
        window.location.href = '../index.html'
    }catch(error){
        console.error('Error en login: ', error)
        alert('Error en la conexón con el servidor')
    }
    
});

// ─── Registro ─────────────────────────────────────────────────────────
btnSendRegister.addEventListener('click', async () => {
    const dni      = inputDni.value.trim();
    const nombre   = inputNombre.value.trim();
    const email    = inputNuevoEmail.value.trim();
    const password = inputNuevoPassword.value.trim();

    if (!dni || !nombre || !email || !password) {
        alert('Completá todos los campos');
        return;
    }

    try {
        const res  = await fetch('/api/auth/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dni, nombre, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || 'Error al registrarse');
            return;
        }

        alert('Usuario registrado correctamente. Iniciá sesión.');
        // Mostrar login después del registro exitoso
        contenedorRegistro.style.display = 'none';
        contenedorLogin.style.display    = 'block';

    } catch (error) {
        console.error('Error en registro:', error);
        alert('Error de conexión con el servidor');
    }
});