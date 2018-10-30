$(document).ready(function(){
    $("#addSubmit").click(function() {
        const teamName = $("#addTeamName").val();
        const capacity = $("#addCapacity").val();
        const location = $("#addLocation").val();
        const league = $("#addLeague").val();
        const stadium = $("#addStadium").val();
        if(toAdd){
            addTeam(teamName, capacity, location, league, stadium);
        }
    });

    $("#delSubmit").click(function() {
        const team = $("#deleteTeam").val();
        const league= $("#deleteLeague").val();
        delTeam(team,league);
    });

    $("#upSubmit").click(function() {
        const teamName = $("#updateTeamName").val();
        var capacity = $("#updateCapacity").val();
        var location = $("#updateLocation").val();
        const league = $("#updateLeague").val();
        var stadium = $("#updateStadium").val();

        if(capacity==''){
            capacity='0'
        }
        if(stadium==''){
            stadium='any'
        }
        if(location==''){
            location='any'
        }
        

        
        upTeam(teamName, capacity, location, league, stadium);
        
    });

    $("#filterButton").click(function() {
       var league=$("#sportDopDown option:selected").text();

       if(league=='Select a League'){
           league='any';
       }

       if(league){
            filterTeams(league);
       }
    });
});

function loadPage() {
    $.ajax({
        url: 'http://sportslookup.csse.rose-hulman.edu:8080/list/team',
        type: 'GET',
        dataType: 'JSON',
        success: (teams) => {
            displayData(teams);
            dropDownLoader();
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    });
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
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    });
}

function addTeam(teamName, cap, loc, leagn, std) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/team/${teamName}/${cap}/${loc}/${leagn}/${std}`,
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

function delTeam(team, league) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/team/${team}/${league}`,
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

function upTeam(teamName, cap, loc, leagn, std) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/team/${teamName}/${cap}/${loc}/${leagn}/${std}`,
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

function filterTeams(league) {
    console.log(league)
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/filteredTeams/${league}`,
        type: 'GET',
        dataType: 'JSON',
        success: (teams) => {
            displayData(teams);
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    });
}





function displayData(teams){
    $('#toAdd').empty();
    for(let i in teams){
        const team = $(`<button type="button" class="btn btn-primary btn-lg btn-block new" id="${i}">${teams[i].tName}</button>`);
        $('#toAdd').append(team);
        $(`#${i}`).click(function() {     
            alert(`Information about the ${teams[i].tName}:\nThey are part of the ${teams[i].LeagueName}\nThey have a team capacity of ${teams[i].Capacity} players\nThey are located in: ${teams[i].Location}`);
        });
    }

}




loadPage();