import { httpService } from './http.service.js'


const STORAGE_KEY = 'pres'

export const presService = {
    query,
    getByTitle,
    remove,
    create
}
window.cs = presService

async function query() {
    return httpService.get(STORAGE_KEY)
}

async function getByTitle(presTitle) {
    return httpService.get(`pres/${presTitle}`)
}

async function remove(presTitle) {
    return httpService.delete(`pres/${presTitle}`)
}

async function create(pres) {

 await httpService.post('pres',pres)
    return pres
}