import {valid} from './validation.js'
import { elements } from './main.js'


const buttonHandler = (state) => {
    elements.submitButton.addEventListener('click', async (e) => {
        e.preventDefault()
        const inputValue = elements.input.value
        const {success, errors} = await valid(inputValue)
        console.log(inputValue)
        state.response.success = success
        state.response.errors = errors
        if(state.response.errors === 'invalid'){
            elements.feedback.textContent = 'Ссылка должна быть валидной'
        }else{
            elements.feedback.textContent = ''
        }
        console.log(state)
    })
}

export {buttonHandler}