const loadNewsCatagory = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res =>res.json())
    .then(data=>displayNewsCatagory(data.data.news_category))
}
const displayNewsCatagory = items =>{
   // console.log(items)
    const listItem = document.getElementById('list-menu');
    
     for(const item of items){
      
        const createList = document.createElement('div');
        createList.innerHTML = `
        <button id="${item.category_id}" onclick="loadCatagoryId('${item.category_id}')"  class="bg-white border-0 text-secondary" > ${item.category_name}</button>
        `;
        listItem.appendChild(createList);
    } 
    
}

const loadCatagoryId = (category_id) =>{
    //console.log(category_id)
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res => res.json())
    .then(data => displayCatagoryId(data.data));
}


    
    const displayCatagoryId = idList =>{
        const idListDiv = document.getElementById('idList')
       for(id of idList){
        //console.log(id)
        const createIdDiv = document.createElement('div');
        createIdDiv.classList.add('d-flex','catagory', 'justify-content-between', 'border','my-4')
        createIdDiv.innerHTML = `
        <div class="col-4">
              <img class="img-fluid" style="height:100%; width:100%" src="${id.thumbnail_url}" alt="">
            </div>
            <div class="col-7">
              <h4>${id.title}</h4>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia modi ex sint necessitatibus alias nobis dignissimos obcaecati illo nesciunt doloribus, est blanditiis reiciendis quae pariatur praesentium quasi odit minima veritatis.</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="">
                <img class="img-fluid" style="height:50px" src="${id.author.img}" alt="">
                <p>${id.author.published_date}</p>
                </div>
                <div class="d-flex gap-2 justify-content-center">
                  <i class="fa-regular fa-eye mt-1"></i>
                  <p>${id.total_view}</p>
                </div>
                <i class="fa-solid fa-right-long"></i>
              </div>
            </div>
        `
        idListDiv.appendChild(createIdDiv)
       }
    }
    
    loadCatagoryId()


loadNewsCatagory() 
//onclick="loadCatagoryId('${item.category_name}')"
