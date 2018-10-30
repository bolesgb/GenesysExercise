$(document).ready(function(){
    $("#addSubmit").click(function() {
        const coachName = $("#addCoach").val();
        const teamName = $("#teamName").val();
        const league = $("#LeagueName").val();
        const sal = $("#income").val();
        
        addCoach(coachName, teamName, league, sal);
       
    });

    $("#delSubmit").click(function() {
        const coach = $("#CoachToDelete").val();
        const team = $("#TeamToDelete").val();
        const league= $("#LeagueToDelete").val();

        delCoach(coach,team, league);

    });

    $("#upSubmit").click(function() {
        const coachName = $("#updatCoachName").val();
        const league = $("#updateLeageName").val();
        const oldteam = $("#updateOldTeam").val();
        var newTeam = $("#updateTeamName").val();
        var sal = $("#updateNetWorth").val();
        
        if(newTeam==''){
            newTeam=newTeam+oldteam;
        }
        if(sal==''){
            sal=0;
        }

        
        updateCoach(coachName, league, oldteam, newTeam, sal);
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

        filterCoaches(league, team);
     });
});

function loadPage() {
    $.ajax({
        url: 'http://sportslookup.csse.rose-hulman.edu:8080/list/coach',
        type: 'GET',
        dataType: 'JSON',
        success: (coaches) => {
            displayData(coaches);
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

function addCoach(coachNa, teamName, leagueName, salary) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/coach/${coachNa}/${teamName}/${leagueName}/${salary}`,
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

function delCoach(coachName, team, league) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/coach/${coachName}/${league}/${team}`,
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

function updateCoach(coachName, leagName, oldTeam, newTeam, sal) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/coach/${coachName}/${leagName}/${oldTeam}/${newTeam}/${sal}`,
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

function filterCoaches(league, team) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/filterCoach/${league}/${team}`,
        type: 'GET',
        dataType: 'JSON',
        success: (coaches) => {
            displayData(coaches);
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
            
            alert(`The Coach is: ${people[i].PName}\nThe coach's salary: $ ${people[i].Salary}\nThey coach in the ${people[i].LeagueName} on the ${people[i].TeamName}`);
         });
    }
}

loadPage();
