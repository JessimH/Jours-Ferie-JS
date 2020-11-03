'use strict'

//___________Global
const divResponse = document.querySelector('.reponse')
const response = document.querySelector('.reponse-text')
const pasGrave = document.querySelector('.pas-grave')
const compteur = document.querySelector('.compteur')
const listJours = document.querySelector('.list-jours')
const nbrDay = document.querySelector('.nombre-jours')
const popup = document.querySelector('.popup')
const flou = document.querySelector('.flou')
const popupBtn = document.querySelector('.close-popup')
const btn = document.querySelector('.button-list-jour')
const ulListF = document.querySelector('.f-list')

// __________date d'aujourd'hui
let today = new Date();
let day = Number(today.getDate())
let mounth = today.getMonth() + 1;
let year = today.getFullYear();

//___________Url API modifié
const urlAPI = `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`

//fonctions

function dateDiff(date1, date2){
    let diff = {}                          
    let tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             
    diff.sec = tmp % 60;                    
 
    tmp = Math.floor((tmp-diff.sec)/60);    
    diff.min = tmp % 60;                    
 
    tmp = Math.floor((tmp-diff.min)/60);    
    diff.hour = tmp % 24;                  
     
    tmp = Math.floor((tmp-diff.hour)/24); 
    diff.day = tmp;
     
    return diff;
}

const closePopup = function(){
    while (ulListF.firstChild) {
        ulListF.removeChild(ulListF.lastChild);
    }
    popup.classList.add('hidden')
    flou.classList.add('hidden')

}
const openPopup = function(){
    popup.classList.remove('hidden')
    flou.classList.remove('hidden')
}

// if(day<10){
//     let currentDay = `${year}-${mounth}-0${day}`
//     console.log(currentDay)
// }else{
//     let currentDay = `${year}-${mounth}-${day}`
//     console.log(currentDay)
// }

// console.log(currentDay)

fetch(urlAPI).then((res)=>{
    res.json().then((dates)=> {
        console.log(dates)
        for (const [key, value] of Object.entries(dates)) {
            
            // console.log(Date.parse(key))
            // console.log(key)
            let currentDay = day < 10 ? `${year}-${mounth}-0${day}` : `${year}-${mounth}-${day}`
            // console.log(Date.parse(currentDay))
            // console.log('AUJ:', currentDay)
            if(Date.parse(currentDay) === Date.parse(key)){
                // console.log('*********MEME JOUR*******')
                divResponse.classList.toggle('ok')
                pasGrave.classList.toggle('hidden')
                break
            }else if (Date.parse(currentDay) < Date.parse(key)){
                // console.log('*********PAS LE MEME JOUR*******')
                // console.log('AUJ:', currentDay)
                // console.log(key,':',value)
                divResponse.classList.toggle('no')
                // console.log('PROCHAIN JOUR F',key)
                const dayBeforeF = dateDiff(Date.parse(currentDay), Date.parse(key))
                // console.log(dayBeforeF.day)
                nbrDay.textContent = dayBeforeF.day

                if(mounth < 4 || mounth > 10){
                    response.textContent = `Oui habilles toi... tu dois aller au taff, c'est pas férié...🥶`
                }else{
                    response.textContent = `Oui... Habilles toi... tu dois aller au taff, c'est pas férié...`
                }
                let li = document.createElement('li')
                li.innerHTML = `le : ${key} 👉 ${value} 🎉` 
                listJours.append(li)
                break
            }
        }

        btn.addEventListener('click', function(){
            for (const [key, value] of Object.entries(dates)) {
                let liF = document.createElement('li')
                liF.innerHTML = `${key} 👉 ${value} 🎉` 
                liF.classList.add = 'jourF'
                ulListF.append(liF)
            }
            openPopup()     
        })
    
        popupBtn.addEventListener('click', closePopup)
        
        flou.addEventListener('click', closePopup)
        
        document.addEventListener('keydown', function(e){
            if(e.key === 'Escape' && !popup.classList.contains('hidden')){
                    closePopup()
            }
        })
        
    });
})
