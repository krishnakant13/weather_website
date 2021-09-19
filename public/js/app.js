console.log('From client side javascript')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
// response.json().then((data) => {
//     console.log(data)
// })

// })


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//messageOne.textContent = 'From js'


weatherform.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = search.value
   
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('/weather?location='+location).then((response) =>{
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = 'Current weather is '+data.current_weather+' Current temperature is '+data.current_temp
        }
     })

    })

})