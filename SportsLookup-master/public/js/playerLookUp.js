$(document).ready(function(){
    $("#addSubmit").click(function() {
        const playerName = $("#addPlayer").val();
        const teamName = $("#teamName").val();
        const league = $("#LeagueName").val();
        const sal = $("#income").val();
        
        addPlayer(playerName, teamName, league, sal);
    });

    $("#delSubmit").click(function() {
        const player = $("#playerToDelete").val();
        const team = $("#TeamToDelete").val();
        const league= $("#LeagueToDelete").val();

        delPlayer(player,team, league);

    });

    $("#upSubmit").click(function() {
        const playerName = $("#updatePlayerName").val();
        const league = $("#updateOldTeam").val();
        const oldteam = $("#updateTeamName").val();
        var newTeam = $("#updateTeamName").val();
        var sal = $("#updateNetWorth").val();
        
        if(newTeam==''){
            newTeam=newTeam+oldteam;
        }
        if(sal==''){
            sal=0;
        }

        
        updatePlayer(playerName, league, oldteam, newTeam, sal);
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

        filterPlayers(league, team);
     });


});

function loadPage() {
    $.ajax({
        url: 'http://sportslookup.csse.rose-hulman.edu:8080/list/player',
        type: 'GET',
        dataType: 'JSON',
        success: (players) => {
            displayData(players);
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



function addPlayer(playName, teamName, leagueName, salary) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/player/${playName}/${teamName}/${leagueName}/${salary}`,
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

function delPlayer(name, team, league) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/player/${name}/${league}/${team}`,
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

function updatePlayer(playerName, leagName, oldTeam, newTeam, sal) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/player/${playerName}/${leagName}/${oldTeam}/${newTeam}/${sal}`,
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

function filterPlayers(league, team) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/filterPlayer/${league}/${team}`,
        type: 'GET',
        dataType: 'JSON',
        success: (players) => {
            displayData(players);
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    });
}


function displayData(people){
    $('#toAdd').empty();
    for(let i in people){
        const person = $(`<button type="button" class="btn btn-primary btn-lg btn-block new" id="${i}">${people[i].PName}</button>`);
        $('#toAdd').append(person);
        $(`#${i}`).click(function() {
            
            alert(`The player's is: ${people[i].PName}\nThe player's salary: $ ${people[i].Salary}\nThey play in the ${people[i].LeagueName} on the ${people[i].TeamName}`);
         });
    }
}


loadPage();
