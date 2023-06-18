



document.getElementById("search-form").addEventListener('keyup' , function(){
    var url = getUrl();
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get',url,true);
    xhrRequest.send();    
    xhrRequest.onload = function(){
        var data = JSON.parse(xhrRequest.responseText);
        display(data);  
    }
});


// getting the data from the api
function getUrl(){
    
    
    var searchQuery = document.getElementById('search-string').value;
    
    
    console.log(searchQuery);
    
    
    document.getElementById('querySection').innerHTML = 'You have searched for : '+ searchQuery;

    //if the search querry is empty
    if(!searchQuery){
        //console.log('empty name ');
        return "http://gateway.marvel.com/v1/public/comics?&ts=1686991220817&apikey=56a072c9b6f8f0834bae39e6c286d2eb&hash=d792ef4ac928667f41cababae88bc84a"
    }
    //if keyup is fired .. 
    else{
        return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&ts=1686991220817&apikey=56a072c9b6f8f0834bae39e6c286d2eb&hash=d792ef4ac928667f41cababae88bc84a`
    }
}



let canvas = document.getElementById('canvas');


let searchHero = document.getElementById('search-string').value;




function display(data){
    var superHeroList = document.getElementById('superhero-list');
    superHeroList.innerHTML = "";
    var results = data.data.results;

    
    console.log(results);
    if(!results){
        
        
        document.getElementById('search-character').value = "";
        window.alert("No super hero found!");
    }else{
        
        
        for(let result of results){
            var templateCanvas = canvas.content.cloneNode(true);

            
            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + result.name;
            templateCanvas.getElementById("id").innerHTML = '<b> ID: </b> ' + result.id ;
            templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>'+ result.comics.available ;
            templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>'+ result.series.available ;
            templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>'+ result.stories.available ;
            
            
            templateCanvas.getElementById('view-detail').addEventListener('click', function(){
                localStorage.setItem('id', result.id);
                window.location.assign('./details.html');
            });
           
            
            templateCanvas.getElementById('fav').addEventListener('click', function(){
                var index = localStorage.length;
                var data = JSON.stringify(result);
                localStorage.setItem(result.id,data);
                alert("Aded to favourites!");
            });
            superHeroList.appendChild(templateCanvas);
        }
    }
};

