import apiCall from "./api.js";
import dotenv from'dotenv'
dotenv.config()
const DictionaryAPI = process.env.DictionaryAPI


export default async function dictonary(search){
   try {
       console.log(search);
       const meaning = await apiCall({
           api:DictionaryAPI,
           path:search,
           method:'GET'
        })
        const d = `${meaning.map(({word,meanings})=>{return `Word: ${word} \n${meanings.map(x=>{return `\n\nPart of speech: ${x.partOfSpeech} \n${x.definitions.map(x=>{return `\n\nDefinition : ${x.definition} \nExample : ${x?.example || ""}`})} \n\nSynonyms: ${x?.synonyms || ""} \nAntonyms: ${x?.antonyms || ""}\n`})}`})}`
        return d
    } catch (error) {
     return '"Sorry pal, we couldnt find definitions for the word you were looking for."'
    }
}