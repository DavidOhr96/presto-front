import { httpService } from './http.service.js'


const STORAGE_KEY = 'pres'

export const presService = {
query,
getByTitle
}
window.cs = presService

async function query(){
    return httpService.get(STORAGE_KEY)
}

async function getByTitle(presTitle){
    return httpService.get(`pres/${presTitle}`)
}