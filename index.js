
const carga = document.querySelector('#buscador')
/* carga.addEventListener('change' , getAPI) */
carga.addEventListener('input', (e)=>{
  parametros.nombre = e.target.value  
  getAPI();
})

const parametros = {
    nombre: ""
}

function getAPI() {
    const {nombre} = parametros
    const url = `http://www.omdbapi.com/?apikey=6b4c0df3&s=${nombre}`
    //http://img.omdbapi.com/?apikey=[6b4c0df3]&
    //http://www.omdbapi.com/?apikey=[6b4c0df3]&
    
    fetch (url)
        .then((respuesta)=>{
            return respuesta.json();
        })
        .then((cargarCards)=>{
            imprimirImagenes(cargarCards.Search)
            console.log(cargarCards.Search);
        })
        .catch((error)=>{
            console.log(error);
        })
}

function imprimirImagenes(imp) {
    clear();
    imp.forEach(imagen => {
        
        const {Title , Poster , Year , imdbID} = imagen
        const body = document.querySelector('.cardsMain')
        const card = document.createElement('div')
        card.innerHTML = `
        <section>
            <div class="card" style="width: 24rem;">
                <img src="${Poster}" class="card-img-top" alt="..." width = "200px" height = "300px">
                <div class="card-body">
                    <h5 class="card-title">${Title}</h5>
                    <p class="card-text">${Year}</p>
                    <button id = "${imdbID}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Detalles</button>
                </div>
            </div>
        </section>
        `
        body.appendChild(card)
    });
    
    
}

function clear() {
    const m = document.querySelectorAll('section')
    for (let a = 0; a < m.length; a++) {
        m[a].remove();
        
    }
}


//modal

const details=document.querySelector('.cardsMain')
details.addEventListener('click',detail)

function detail(e) {
    const id=e.target.getAttribute('id')
    const url=`http://www.omdbapi.com/?apikey=ecb3c051&i=${id}`
    fetch(url)
        .then(result=>{
            return result.json()
        })
        .then(result=>{
            detailM(result);
        })
    
}
function detailM(e) {
    const mo=document.querySelector('.modal-body')
    const {Title,Year,Poster,Runtime,Genre,Director,Actors,Plot} = e
    document.querySelector('.modal-title').textContent=`${Title}`
    mo.innerHTML=`
    <section class="modal-movie">
            <div>
                <img class="imgModal" src="${Poster}" alt="">
            </div>
            <div class="datos">
                <p class= "text1" >Año:${Year}</p>
                <p class= "text1">Tiempo:${Runtime}</p>
                <p class= "text1">Genero:${Genre}</p>
                <p class= "text1">Director:${Director}</p>
                <p class= "text1">Actors:${Actors}</p>
                <p class= "text1">Detalle:${Plot}</p>
            </div>
    </section>
    `
}   