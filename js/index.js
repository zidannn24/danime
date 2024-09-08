const API_URL = 'https://api.jikan.moe/v4/anime'

const resultSearch = document.querySelector('.result-search')
const titleSearch = document.getElementById('title-search')
const cardWrapper = document.querySelector('.card-wrapper')
const header = document.querySelector('.header')

titleSearch.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        const inputValue = titleSearch.value.trim();
        if(inputValue === ''){
            alert('Input Tidak Valid')
        } else {
            fetchData(titleSearch.value)
        }
    }
})

const btnOnGoing = document.getElementById('btn-on-going')
btnOnGoing.addEventListener('click', function(){
    onGoing()
    header.innerHTML = ''
})
    
const btnTopAnime = document.getElementById('btn-top-anime')
btnTopAnime.addEventListener('click', function(){
    topAnime()
    header.innerHTML = ''
})

async function fetchData(title){
    try{
        const res = await fetch(`${API_URL}?q=${title}`)
        if(!res.ok){
            throw new Error('Gagal Fetching data')
        }
        const data = await res.json()

        header.innerHTML = ''
        cardWrapper.innerHTML = ''

        const resultText = document.createElement('h1')
        resultText.innerHTML = `Result Of '${title}'`

        header.append(resultText)
        data.data.forEach(anime=>{
            showData(anime)

            // console.log(anime.mal_id);

            // const card = document.createElement('div')
            // card.classList.add('card')

            // const imgBox = document.createElement('div')
            // imgBox.classList.add('img-box')

            // const img = document.createElement('img')
            // img.src = anime.images.webp.large_image_url

            // const title = document.createElement('p')
            // title.innerHTML = anime.title

            // const details = document.createElement('a')
            // details.href = 'details.html'
            // details.textContent = 'Details'
            // details.addEventListener('click', function(){
            //     sessionStorage.setItem('animeId', anime.mal_id);
            // })
            
            // cardWrapper.appendChild(card)
            // card.append(imgBox, title, details)
            // imgBox.appendChild(img)
        })
    }catch(error){
        console.error(error);
    }
}

function showData(anime){
    const card = document.createElement('div')
    card.classList.add('card')

    const imgBox = document.createElement('div')
    imgBox.classList.add('img-box')

    const img = document.createElement('img')
    img.src = anime.images.webp.large_image_url

    const title = document.createElement('p')
    title.innerHTML = anime.title

    const details = document.createElement('a')
    details.href = 'details.html'
    details.textContent = 'Details'
    details.addEventListener('click', function(){
        sessionStorage.setItem('animeId', anime.mal_id);
    })
            
    cardWrapper.appendChild(card)
    card.append(imgBox, title, details)
    imgBox.appendChild(img)
}

onGoing()
async function onGoing(){
    const res = await fetch('https://api.jikan.moe/v4/seasons/now')
    const data = await res.json()
    // console.log(data);
    
    cardWrapper.innerHTML = ''

    data.data.forEach(anime=>{
        showData(anime)
    })
}

async function topAnime(){
    const res = await fetch('https://api.jikan.moe/v4/top/anime')
    const data = await res.json()
    // console.log(data);
    
    cardWrapper.innerHTML = ''

    data.data.forEach(anime=>{
        showData(anime)
    })
}