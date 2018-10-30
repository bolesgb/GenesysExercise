$(document).ready(function(){
    $("#addSubmit").click(function() {
        const stadiumName = $("#addStadiumName").val();
        const stadCap = $("#addCapacity").val();
        const addLoc = $("#addLocation").val();
        const addTickPri = $("#addTicketPrice").val();
       
        if(stadiumName){
            addStadium(stadiumName, stadCap, addLoc, addTickPri);
        }

    });

    $("#delSubmit").click(function() {
        const stadium = $("#stadiumToDelte").val();
        delStadium(stadium);
    });

    $("#upSubmit").click(function() {
        const stadiumName = $("#updateStadiumName").val();
        const stadCap = $("#updateCapacity").val();
        const updTickPri = $("#updateTicketPrice").val();
       
        if(stadiumName){
            upStadium(stadiumName, stadCap, updTickPri);
        }
    });

    $("#filterButton").click(function() {
        var league=$("#sportDopDown option:selected").text();
        var team=$("#teamDropDown option:selected").text();

        if(team=='Select a Team'){
            team='all'
        }
        if(league=='Select a League'){
            league='all'
        }

        filterStadium(league, team);
     });
    
});

function loadPage() {
    $.ajax({
        url: 'http://sportslookup.csse.rose-hulman.edu:8080/list/stadium',
        type: 'GET',
        dataType: 'JSON',
        success: (stadiums) => {
            $('#toAdd').empty();
            displayData(stadiums);
            dropDownLoader();
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    })
}

function dropDownLoader() {
    $.ajax({
        url: 'http://sportslookup.csse.rose-hulman.edu:8080/list/league',
        type: 'GET',
        dataType: 'JSON',
        success: (leagues) => {
            for(let i in leagues){
                const league= $(`<option>${leagues[i].Name}</option>`);
                $('#sportDopDown').append(league);
            }
            $.ajax({
                url: 'http://sportslookup.csse.rose-hulman.edu:8080/list/team',
                type: 'GET',
                dataType: 'JSON',
                success: (teams) => {
                    for(let i in teams){
                        const team = $(`<option>${teams[i].tName}</option>`);
                        $('#teamDropDown').append(team);
                    }
                }, 
                error: (res, stat, err) => {
                    console.log(res, stat, err);
                }
            });
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    });
}

function addStadium(name, cap, loc, pric) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/stadium/${name}/${cap}/${loc}/${pric}`,
        type: 'POST',
        dataType: 'JSON',
        success: () => {
            loadPage();
        },
        error: (res, stat, err) => {
            console.log(err);
        }
    })
}

function delStadium(stadium) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/stadium/${stadium}`,
        type: 'DELETE',
        dataType: 'JSON',
        success: () => {
            loadPage();
        },
        error: (res, stat, err) => {
            console.log(err);
        }
    })
}

function upStadium(name, cap, pric) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/stadium/${name}/${cap}/${pric}`,
        type: 'PUT',
        dataType: 'JSON',
        success: () => {
            loadPage();
        },
        error: (res, stat, err) => {
            console.log(err);
        }
    })
}

function filterStadium(league, team) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/filterStadium/${league}/${team}`,
        type: 'GET',
        dataType: 'JSON',
        success: (stadiums) => {
            displayData(stadiums)
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    });
}


function displayData(stadiums){
    $('#toAdd').empty();
    for(let i in stadiums){
        console.log(stadiums)
        const stadium = $(`<button type="button" class="btn btn-primary btn-lg btn-block new" id="${i}">${stadiums[i].sName}</button>`);
        $('#toAdd').append(stadium);
        $(`#${i}`).click(function() {
            
            alert(`Welcome to ${stadiums[i].sName}\nThe Stadium is located in the state of ${stadiums[i].Location}\nIt has a capacity of ${stadiums[i].Capacity} people\nThe average ticket price of the stadium is $ ${stadiums[i].TicketPrice}`);
         });
    }
}


loadPage();
