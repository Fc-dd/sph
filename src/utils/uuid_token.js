import { v4 as uuidv4 } from 'uuid'
export default ()=>{
  if(!localStorage.getItem('UUID')){
    localStorage.setItem('UUID',uuidv4())
  }
  return localStorage.getItem('UUID')
}