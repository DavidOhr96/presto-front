import { httpService } from './http.service.js'


const STORAGE_KEY = 'slide'

export const slideService = {
query,
getById,
save,
remove
}
window.cs = slideService

async function query(){
    return httpService.get(STORAGE_KEY)
}

async function getById(slideId){
    return httpService.get(`slide/${slideId}`)
}

async function save(slide){
    let savedSlide
    if(slide._id){
        savedSlide=await httpService.put(`slide/${slide._id}`,slide)
    }else{
        savedSlide=await httpService.post('slide',slide)
    }
    return savedSlide
    }


    async function remove(slideId){
        return httpService.delete(`slide/${slideId}`)
    }