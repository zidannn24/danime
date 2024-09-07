const API_URL = 'https://api.jikan.moe/v4/anime'

const detailTitle = document.getElementById('detail-title')

const malId = sessionStorage.getItem('animeId')
    getId(malId)

    async function getId(id){
        try{
            const res = await fetch(`${API_URL}/${id}`)
            const data = await res.json()
            const detailsAnime = document.getElementById('details-anime')
            // hero.style.width = '100%'
            // hero.style.height = '300px'
            // hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.data.images.webp.large_image_url})`
            // hero.style.backgroundSize = 'cover'
            // hero.style.backgroundPosition = 'center'
            // hero.style.backgroundRepeat = 'no-repeat'
            // hero.style.display = 'flex'
            // // hero.style.alignItems = 'center'
            // hero.style.justifyContent = 'center'

            // const image = document.createElement('img')
            // image.src = data.data.images.webp.image_url
            // image.style.width = '50%'
            // image.style.maxWidth = '200px'
            // image.style.position = 'absolute'
            // image.style.top = '7rem'
            // image.style.paddingTop = '2rem'

            // hero.append(image)

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
            episodesDetails.innerHTML = `<span>Eposides</span>: ${data.data.episodes}`

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

            someDetails.append(titleDetails, scoreDetails, episodesDetails, statusDetails, airedDetails, typeDetails, durationDetails)
            detailsWrapper.append(imgDetail, someDetails, genreDetails)
            detailsAnime.appendChild(detailsWrapper)
        }catch(error){
            console.error(error);
        }
    }