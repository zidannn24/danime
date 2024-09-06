const API_URL = 'https://api.jikan.moe/v4/anime'

const detailTitle = document.getElementById('detail-title')

const malId = localStorage.getItem('animeId')
    getId(malId)

    async function getId(id){
        try{
            const res = await fetch(`${API_URL}/${id}`)
            const data = await res.json()
            // console.log(data.data.title);
            // detailTitle.innerHTML = data.data.title
            const hero = document.getElementById('details-anime')
            hero.style.width = '100%'
            hero.style.height = '300px'
            hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.data.images.webp.large_image_url})`
            hero.style.backgroundSize = 'cover'
            hero.style.backgroundPosition = 'center'
            hero.style.backgroundRepeat = 'no-repeat'
            hero.style.display = 'flex'
            // hero.style.alignItems = 'center'
            hero.style.justifyContent = 'center'

            const image = document.createElement('img')
            image.src = data.data.images.webp.image_url
            image.style.width = '50%'
            image.style.maxWidth = '200px'
            image.style.position = 'absolute'
            image.style.top = '7rem'
            // image.style.margin = 'auto'
            // image.style.paddingTop = '2rem'

            hero.append(image)
        }catch(error){
            console.error(error);
        }
    }