


const errorMessage = document.querySelector('.error-message')
const success = document.querySelector('.success')
document.querySelector('#communityClubForm').addEventListener('submit', (e)=>{
    e.preventDefault()
    let firstName = document.querySelector('#firstName').value
    let lastName = document.querySelector('#lastName')
    let email = document.querySelector('#email')
    let password = document.querySelector('#password')
    let cohortNumber = document.querySelector('#cohortNumber')


    axios.post('http://127.0.0.1:3000/api/v1/register', 
    {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        cohortNumber: cohortNumber.value
    })
    .then((response)=>{
        errorMessage.style.display = 'none'
        success.innerHTML = response.data.message
    })
    .catch((e)=>{
        success.style.display = ''
        errorMessage.innerHTML = e.response.data.error
    })
})