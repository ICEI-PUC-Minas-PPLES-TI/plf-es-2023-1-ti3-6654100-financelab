const url = 'teste'

function validaLogin(){
  const email = document.getElementById('form2Example1')
  const senha = document.getElementById('form2Example2')
  const loginInvalido = document.getElementById('loginInvalido')

  if(url === email.value && url === senha.value){
    window.location.replace('home.html')  
  } else {
    loginInvalido.removeAttribute('style')
  }

  email.value = ''
  senha.value = ''
}

