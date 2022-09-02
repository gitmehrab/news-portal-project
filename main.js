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
      //  console.log(item.category_name)
        const createList = document.createElement('div');
        
        
       // createList.classList.add('card')
        createList.innerHTML = `
        <a id="${item.category_id}" href="" class="text-decoration-none text-secondary" onclick="displayCatagoryId()"> ${item.category_name}</a>
        `;
        listItem.appendChild(createList);
    } 
    
}




loadNewsCatagory() 
