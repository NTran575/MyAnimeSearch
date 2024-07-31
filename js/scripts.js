//target
const form=document.querySelector("#new-task-form");
const input=document.querySelector("#new-task-input");
const list_el=document.querySelector("#results");
//let results_list = document.querySelector("#results-list")

const url_search_part = "https://api.jikan.moe/v4/anime?q=";


form.addEventListener('submit', (e) => {
    e.preventDefault();
    list_el.replaceChildren();

    const task = input.value;

    if(!task){
        alert("Please enter anything");
        return;
    }

    const search_url = url_search_part+ task;
    console.log(search_url);
    
    
    fetchAnime(search_url);
    
    
});

async function fetchAnime(url){
    try {
        let response = await fetch(url);
        let data =await response.json();
        for(let i=0; i< data.data.length; i++){
            //title
            let title = data.data[i].title;
            console.log(title);
            //poster
            let poster = data.data[i].images.jpg.large_image_url;
            console.log(poster);
            displayAnime(title, poster);
        }
        
    }catch (error){
        console.log("There was an error!", error)
    }
}

function displayAnime(title, image){
    const img = document.createElement("img");
    img.src = image;
    img.height = 310;
    img.width = 220;
    img.setAttribute('draggable', false);

    const texttitle = document.createElement("p");
    texttitle.innerHTML = title;


    const div_animewithTitle = document.createElement("div");
    div_animewithTitle.appendChild(img);
    div_animewithTitle.appendChild(texttitle);

    document.getElementById("results").appendChild(div_animewithTitle);
}


