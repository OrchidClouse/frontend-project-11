import * as Yup from 'yup'
import axios from 'axios'

const schema = Yup.object().shape({
    url:Yup.string().test('valid','invalid', async (value) =>{
      const response = await axios.get(`https://allorigins.hexlet.app/get?url=${value.trim()}`)
      return response.data.contents !== null
    })
  })
  export async function valid(data){
    try{
      await schema.validate({url: data})
      return {success: true,errors:[]}
    }catch(er){
        console.log()
      return {success: false,errors: er.errors}
    }
  }