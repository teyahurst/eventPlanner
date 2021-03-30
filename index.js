'use strict'

const clientId = 'KA22FBL5RDC4NGTQBXZ05JK4KAW3XM1B2WXWYYZLTLB3LZAU';
const clientSecret = 'KAHYEGCZLU0ZBD004NDG0XNGP3S13TSYNQ5B5GT1KXPAEYNO';



function getVenues(searchTerm, maxResults=25){
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20210328&near=${searchTerm}&intent=browse&radius=10000&limit=25&categoryId=4bf58dd8d48988d171941735`)
    .then(response => {
        return response.json();
    })
    .then(responseJson => displayResults(responseJson))
}

function getEventServices(searchTerm){
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20210328&near=${searchTerm}&intent=browse&radius=10000&limit=25&categoryId=5454152e498ef71e2b9132c6`)
    .then(response => {
        return response.json();
    })
    .then(responseJson => displayEventServicesResults(responseJson))
    
}




function displayResults(responseJson){
    console.log(responseJson);
    $('#venue-results-list').empty();
    let i = 0; 
    

    responseJson.response.venues.forEach(items => {
        
        $('#venue-results-list').append(`<div class="venueResults">
                                            <li>Name: ${items.name}</li><br>
                                            <li>Address: ${items.location.formattedAddress}</li><br>
                                         </div>`)
                                         getVenueDetails(venueId)
                                         
                                         
    })

   $('#results').removeClass('hidden');
   

}

function displayEventServicesResults(responseJson){
    console.log(responseJson)
    $('#event-services-results-list').empty();
    let i = 0;

    responseJson.response.venues.forEach(items => {
        $('#event-services-results-list').append(`<div class="eventResults">
                                                    <li>Name: ${items.name}</li><br>
                                                    <li>Address: ${items.location.formattedAddress}</li><br>
                                                  </div>`)
    })

    $('#results').removeClass('hidden');
}




function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();

        getVenues(searchTerm, maxResults);
        getEventServices(searchTerm);
       
    
    })
}

$(watchForm)




