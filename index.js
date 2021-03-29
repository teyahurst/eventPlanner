'use strict'

const clientId = 'KA22FBL5RDC4NGTQBXZ05JK4KAW3XM1B2WXWYYZLTLB3LZAU';
const clientSecret = 'S2EJ0ZD3C5VFONTBD1D2LZZGQK1GSYBET2W5VS1AGFTF2PXN';
const yelpApiKey = "lg1NLNB29VKto-ZUTDRqMXfJ-XMOUwjBWbvXh3q9o2nqmv5cHwPoKwitBJjFZZsYWIJEcDG4ryiWGMUCwv7jl5En0xv13Ch6KYmsO77d78s7Q1sg986zXKk0V45VYHYx"

function getVenues(searchTerm, maxResults=25){
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20210328&near=${searchTerm}&intent=browse&radius=10000&limit=25&categoryId=4bf58dd8d48988d171941735`)
    .then(response => {
        return response.json();
    })
    .then(responseJson => displayResults(responseJson))
}

function getCatering(searchTerm, maxResults=25){
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?inputtype=textquery&input=restaurant&key=AIzaSyC0iSgTMmUwvN-bER98CgCnmpEnjMTsugc&place_id=ChIJ0bGIwKBMTIYRG_sUSMt0RHI&fields=photos,formatted_address,name&types=catering`)
    .then(response => {
        return response.json();
    })
    .then(responseJson => displayCateringResults(responseJson))
}



function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    let i = 0; 
    

    responseJson.response.venues.forEach(items => {
        let icon = responseJson.response.venues[0].categories[0].icon
        $('#results-list').append(`<li>Name: ${items.name}</li><br>
                                   <li>Address: ${items.location.formattedAddress}</li><br>`)
    })
   $('#results').removeClass('hidden');
}

function displayCateringResults(responseJson){
    console.log(responseJson);

}



function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();

        getVenues(searchTerm, maxResults);
        getCatering(searchTerm, maxResults);
    
    
    })
}

$(watchForm)




