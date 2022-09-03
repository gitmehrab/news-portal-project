const loadNewsCatagory = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res =>res.json())
    .then(data=>displayNewsCatagory(data.data.news_category))
}
const displayNewsCatagory = items =>{
   // console.log(items)
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
    //console.log(category_id)
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res => res.json())
    .then(data => displayCatagoryId(data.data));
}


    
    const displayCatagoryId = idList =>{
       // console.log(idList)
        const idListDiv = document.getElementById('idList');
        idListDiv.innerHTML = ``; 
        const noFound = document.getElementById('no-found')
      
        if(idList.length === 0){
          noFound.classList.remove('d-none')
        }
        else{
          noFound.classList.add('d-none')
        }
       for(id of idList){
       // console.log(id)
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
                <p>${id.author.name}</p>
                <p>${id.author.published_date ? id.author.published_date : 'No Data found'}</p>
                </div>
                <div class="d-flex gap-2 justify-content-center">
                  <i class="fa-regular fa-eye mt-1"></i>
                  <p>${id.total_view}</p>
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
      //console.log(id)
       const url = `https://openapi.programming-hero.com/api/news/${id}` 
       console.log(url)
       fetch(url)
       .then(res => res.json())
       .then(data => detailDataDisplay(data.data))
    }

    const detailDataDisplay = (data) =>{
       // console.log(data)
        const detailDiv = document.getElementById('modal-container');
        detailDiv.innerHTML = ``;
        for(item of data){
           // console.log(item)
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

    detailDataLoad()


  //  loadCatagoryId()

  
loadNewsCatagory() 

 



