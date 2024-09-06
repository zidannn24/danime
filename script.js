const API_URL = 'https://api.jikan.moe/v4/anime'

// fetchData()
const resultSearch = document.querySelector('.result-search')
const detailTitle = document.getElementById('detail-title')

const titleSearch = document.getElementById('title-search')

if(document.body.id === 'index'){
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

    async function fetchData(title){
        try{
            const res = await fetch(`${API_URL}?q=${title}`)
            if(!res.ok){
                throw new Error('Gagal Fetching data')
            }
            const data = await res.json()
            const cardWrapper = document.querySelector('.card-wrapper')
            cardWrapper.innerHTML = ''
            const resultOf = document.querySelector('.result-of')
            resultOf.innerHTML = `Result Of '${title}'`
            data.data.forEach(anime=>{
    
                // console.log(anime.mal_id);
    
                const card = document.createElement('div')
                card.classList.add('card')
    
                const imgBox = document.createElement('div')
                imgBox.classList.add('img-box')
    
                const img = document.createElement('img')
                img.src = anime.images.webp.image_url
    
                const title = document.createElement('p')
                title.innerHTML = anime.title
    
                const details = document.createElement('a')
                details.href = 'details.html'
                details.textContent = 'Details'
                details.addEventListener('click', function(e){
                    // e.preventDefault()
                    localStorage.setItem('animeId', anime.mal_id);
                })
                
                cardWrapper.appendChild(card)
                card.append(imgBox, title, details)
                imgBox.appendChild(img)
            })
        }catch(error){
            console.error(error);
        }
    }

} else if(document.body.id === 'details'){
    const malId = localStorage.getItem('animeId')
    getId(malId)

    async function getId(id){
        try{
            const res = await fetch(`${API_URL}/${id}`)
            const data = await res.json()
            console.log(data.data.title);
            detailTitle.innerHTML = data.data.title
        }catch(error){
            console.error(error);
        }
    }
}

