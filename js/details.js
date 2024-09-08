const API_URL = 'https://api.jikan.moe/v4/anime'

const detailTitle = document.getElementById('detail-title')
const detailsAnime = document.getElementById('details-anime')
const charsAnimeWrapper = document.createElement('div')
charsAnimeWrapper.classList.add('chars-and-va-wrapper')

const malId = sessionStorage.getItem('animeId')
getId(malId)

async function getId(id){
    try{
        const res = await fetch(`${API_URL}/${id}`)

        if(!res.ok){
            throw new Error('Gagal Fetching')
        }
        
        const data = await res.json()

        const btnBack = document.createElement('button')
        btnBack.textContent = 'Back'
        btnBack.classList.add('btn-back')

        const detailsWrapper = document.createElement('div')
        detailsWrapper.classList.add('details-wrapper')
            
        const imgDetail = document.createElement('img')
        imgDetail.src = `${data.data.images.webp.large_image_url}`
            
        const someDetails = document.createElement('div')
        someDetails.classList.add('some-details')

        const titleDetails = document.createElement('p')
        titleDetails.innerHTML = `<span>Title</span>: ${data.data.title}`

        const scoreDetails = document.createElement('p')
        scoreDetails.innerHTML = `<span>Score</span>: ${data.data.score}`

        const episodesDetails = document.createElement('p')
        episodesDetails.innerHTML = `<span>Episodes</span>: ${data.data.episodes}`

        const statusDetails = document.createElement('p')
        statusDetails.innerHTML = `<span>Status</span>: ${data.data.status}`

        const airedDetails = document.createElement('p')
        airedDetails.innerHTML = `<span>Aired</span>: ${data.data.aired.string}`

        const typeDetails = document.createElement('p')
        typeDetails.innerHTML = `<span>Type</span>: ${data.data.type}`

        const durationDetails = document.createElement('p')
        durationDetails.innerHTML = `<span>Duration</span>: ${data.data.duration}`

        const genreDetails = document.createElement('p')
        genreDetails.classList.add('genre-details')
        genreDetails.innerHTML = `<span>Genres</span>: ${data.data.genres.map(genreAnime => genreAnime.name).join(", ")}`

        const synopsisWrapper = document.createElement('div')
        synopsisWrapper.classList.add('synopsis-wrapper')
        
        const synopsis = document.createElement('p')
        synopsis.innerHTML = `<span>Synopsis</span>:`

        const synopsisDetails = document.createElement('p')
        synopsisDetails.innerHTML = `${data.data.synopsis}`

        const studiosDetails = document.createElement('p')
        studiosDetails.classList.add('studios-details')
        studiosDetails.innerHTML = `<span>Studios</span>: ${data.data.studios.map(studioAnime => studioAnime.name).join(", ")}`

        let con = null
        if (data.data.trailer.embed_url === null){
            const nullTrailer = document.createElement('h1')
            nullTrailer.classList.add('null-trailer')
            nullTrailer.innerHTML = 'This anime does not have a trailer'
            con = nullTrailer
        } else {
            const trailerAnime = document.createElement('iframe')
            trailerAnime.classList.add('trailer-anime')
            trailerAnime.src = `${data.data.trailer.embed_url}`
            con = trailerAnime
        }

        synopsisWrapper.append(synopsis, synopsisDetails)
        someDetails.append(titleDetails, scoreDetails, episodesDetails, statusDetails, airedDetails, typeDetails, durationDetails)
        detailsWrapper.append(imgDetail, someDetails, genreDetails, synopsisWrapper, studiosDetails, con, charsAnimeWrapper)
        detailsAnime.append(btnBack, detailsWrapper)
        
        charsAnime(data.data.mal_id)
    }catch(error){
        console.error(error);
    }
}

async function charsAnime(id){
    try{
        const res = await fetch(`${API_URL}/${id}/characters?limit=5`)

        if(!res.ok){
            throw new Error('Gagal Fetching')
        }

        const data = await res.json()
        data.data.forEach(data=>{

            const charsAndVaCard = document.createElement('div')
            charsAndVaCard.classList.add('chars-and-va-card')

            const nameAndRoleWrapper = document.createElement('div')
            nameAndRoleWrapper.classList.add('name-and-role-wrapper')

            const nameChar = document.createElement('p')
            nameChar.classList.add('name-char')
            nameChar.innerHTML = data.character.name

            const imgChar = document.createElement('img')
            imgChar.src = data.character.images.webp.image_url

            const roleChar = document.createElement('p')
            roleChar.classList.add('role-char')
            roleChar.innerHTML = data.role

            nameAndRoleWrapper.append(nameChar, roleChar)
            charsAndVaCard.append(imgChar, nameAndRoleWrapper)
            charsAnimeWrapper.append(charsAndVaCard)
            console.log(data);
        })
    }catch(error){
        console.error(error);
    }
}