const loadNewsCatagory = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res =>res.json())
    .then(data=>displayNewsCatagory(data.data.news_category))
    .catch(error=>console.log(error))
}
const displayNewsCatagory = (items) =>{ 
    const listItem = document.getElementById('list-menu'); 
     items.forEach(item=>{
       
        const createList = document.createElement('div');
        createList.innerHTML = `
        <button id="${item.category_id}" onclick="loadCatagoryId('${item.category_id}')"  class="bg-white border-0 text-secondary" > ${item.category_name}</button>
        `;
             listItem.appendChild(createList); 
    })
    
}
// data display by Clicked

const loadCatagoryId = (category_id) =>{
    ToggleLoader(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res => res.json())
    .then(data => displayCatagoryId(data.data))
    .catch(error=>console.log(error))
}


    
    const displayCatagoryId = (idList) =>{
       ToggleLoader(false);
        const idListDiv = document.getElementById('idList');
        idListDiv.innerHTML = ``; 
      
      
      const IdFound = document.getElementById('data-found');
      IdFound.innerHTML= `${idList.length} Found For This Catagory`;


      const filter = document.getElementById('filter');
      filter.innerHTML = `
      <nav class="navbar bg-light my-4">
      <div class="container-fluid">
        <div class="d-flex">
          <p>Short by view : </p>
          <button class="border-0 p-2">Defult <i class="fa-solid fa-caret-down"></i></button>
        </div>
        
        <div class="d-flex gap-2" role="search">
          
          <button class="btn bg-primary text-white" type="">Todays Pick</button>
          <button class="btn btn-outline-success" type="">Trending</button>
        </div>
      </div>
    </nav>
      `

        const noFound = document.getElementById('no-found')
       
        if(idList.length === 0){
          noFound.classList.remove('d-none')
        }
        else{
          noFound.classList.add('d-none')
        }

       for(id of idList){
        const createIdDiv = document.createElement('div');
        
        createIdDiv.classList.add('d-flex','catagory', 'justify-content-between', 'border','my-4')
        createIdDiv.innerHTML = `
        <div class="col-4">
              <img class="img-fluid" style="height:100%; width:100%" src="${id.thumbnail_url}" alt="">
            </div>
            <div class="col-7 d-flex flex-column gap-4 justify-content-center">
              <h4>${id.title}</h4>
              <p id="slice">${id.details.slice(0,200)}...</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="">
                <img class="img-fluid" style="height:50px" src="${id.author.img}" alt="">
                <p>${id.author.name ? id.author.name:'No data found'}</p>
                <p>${id.author.published_date ? id.author.published_date : 'No Data found'}</p>
                </div>
                <div class="d-flex gap-2 justify-content-center">
                  <i class="fa-regular fa-eye mt-1"></i>
                  <p>${id.total_view ? id.total_view : 'No data Found'}</p>
                </div>
                <button onclick="detailDataLoad('${id._id}')" class="bg-white border-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ><i" class="fa-solid fa-right-long "></i></button>
              </div>
            </div>
        `
        idListDiv.appendChild(createIdDiv)
        
       }
       
    }


    // news Detail data
    
    const detailDataLoad = (id)=>{
       const url = `https://openapi.programming-hero.com/api/news/${id}` 
       fetch(url)
       .then(res => res.json())
       .then(data => detailDataDisplay(data.data))
       .catch(error=>console.log(error))
    }

    const detailDataDisplay = (data) =>{
        const detailDiv = document.getElementById('modal-container');
        detailDiv.innerHTML = ``;
        for(item of data){
            const createDetailDiv = document.createElement('div');
            createDetailDiv.classList.add('id')
            createDetailDiv.innerHTML = `
            <div class="d-flex flex-column gap-3 align-items-center">
        <h6 class="fs-5">${item.title}</h6>
        <img style="" src="${item.thumbnail_url}"
        <p>${item.details.slice(0,150)}...</p>
    <div class="d-flex align-items-center">
        <div class="gap-2 col-6">
            <image class="col-3" style="" src="${item.author.img}"></image>
            <p>${item.author.name ? item.author.name : 'No data found' }</p>
            <p>${item.author.published_date}</p>
        </div>
        <div class="gap-2 d-flex">
            <i class="fa-regular fa-eye mt-1"></i>
            <p>${item.total_view ? item.total_view : 'No Data Found'}</p>
        </div>
    </div>
            `
            detailDiv.appendChild(createDetailDiv)

        }
        
    }

    // loader toggle
    const ToggleLoader = isLoading =>{
      const loadId = document.getElementById('loader');
      if(isLoading){
        loadId.classList.remove('d-none')
      }
      else{
        loadId.classList.add('d-none')
      }
    }


    function newWindow(){
      window.open("./question.html");
    }

   // detailDataLoad()


  

  
loadNewsCatagory() 

 



