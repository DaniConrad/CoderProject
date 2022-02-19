const form = document.getElementById('form')
const inputs = document.querySelectorAll('#form input, #form textarea');
const send = document.getElementById('formSend');


// ---- Para mensaje de faltan campos en el formulario. ----
function visible() {
	document.getElementById('formAlert').classList.remove ("special-hidden");
	document.getElementById('formAlert').classList.add ('visual');
}

function invisible() {
	document.getElementById('formAlert').classList.remove ("visual");
	document.getElementById('formAlert').classList.add ('special-hidden');
}

// Validación + alertas
const validarFormulario = (inputs) => {
	for (let i = 0; i < 3; i++) {
		if (inputs[i].value == 0) {
			visible();
			return;
		}if (i>=2) {
				invisible()
				Swal.fire({
					position: 'top',
					icon: 'success',
					title: '¡Mensaje enviado con éxito!',
					showConfirmButton: false,
					timer: 1000
				  })
				form.reset();
		}
	}
}

// ---Botón de enviar---
send.addEventListener('click', (e) => {
	e.preventDefault();
	validarFormulario(inputs);
	
})
