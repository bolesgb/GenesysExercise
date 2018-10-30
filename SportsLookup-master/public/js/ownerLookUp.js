$(document).ready(function(){
    $("#addSubmit").click(function() {
        const coachName = $("#addOwner").val();
        const teamName = $("#teamName").val();
        const league = $("#LeagueName").val();
        const sal = $("#income").val();
        addOwner(coachName, teamName, league, sal);
    });

    $("#delSubmit").click(function() {
        const owner = $("#ownerToDelete").val();
        const team = $("#TeamToDelete").val();
        const league= $("#LeagueToDelete").val();

        delOwner(owner,team, league);

    });

    $("#upSubmit").click(function() {
        const ownName = $("#updateOwnerName").val();
        const league = $("#updateLeageName").val();
        const oldteam = $("#updateOldTeam").val();
        var newTeam = '';
        var sal = $("#updateNetWorth").val();
        
        if(newTeam==''){
            newTeam=newTeam+oldteam;
        }
        if(sal==''){
            sal=0;
        }


        updateOwner(ownName, league, oldteam, newTeam, sal);
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

        filterOwners(league, team);
     });

});

function loadPage() {
    $.ajax({
        url: 'http://sportslookup.csse.rose-hulman.edu:8080/list/owner',
        type: 'GET',
        dataType: 'JSON',
        success: (owners) => {
            displayData(owners);
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
                const league= $(`<option>${leagues[i].tName}</option>`);
                $('#sportDopDown').append(league);
            }
            $.ajax({
                url: 'http://sportslookup.csse.rose-hulman.edu:8080/list/team',
                type: 'GET',
                dataType: 'JSON',
                success: (teams) => {
                    for(let i in teams){
                        const team = $(`<option>${teams[i].Name}</option>`);
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

function addOwner(ownNa, teamName, leagueName, salary) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/owner/${ownNa}/${teamName}/${leagueName}/${salary}`,
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

function delOwner(owner, team, league) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/owner/${owner}/${league}/${team}`,
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

function updateOwner(ownName, leagName, oldTeam, newTeam, sal) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/owner/${ownName}/${leagName}/${oldTeam}/${newTeam}/${sal}`,
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
function filterOwners(league, team) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/filterOwner/${league}/${team}`,
        type: 'GET',
        dataType: 'JSON',
        success: (owners) => {
            displayData(owners);
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    });
}

function displayData(people){
    $('#toAdd').empty();
    for(let i in people){
        console.log(people)
        const person = $(`<button type="button" class="btn btn-primary btn-lg btn-block new" id="${i}">${people[i].PName}</button>`);
        $('#toAdd').append(person);
        $(`#${i}`).click(function() {
            
            alert(`The Owner is: ${people[i].PName}\nThe have a NeWorth of: $ ${people[i].NetWorth}\nThey own the ${people[i].TeamName} in the ${people[i].LeagueName}`);
         });
    }
}

loadPage();
