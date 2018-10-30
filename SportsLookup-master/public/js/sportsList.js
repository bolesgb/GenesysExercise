function loadPage() {
    $.ajax({
        url: 'http://sportslookup.csse.rose-hulman.edu:8080/list/sports',
        type: 'GET',
        dataType: 'JSON',
        success: (sports) => {
            $('#toAdd').empty();
            console.log(sports)
            for(let i in sports){
                const sport = $(`<button type="button" class="btn btn-primary btn-lg btn-block new id="${i}" disabled>${sports[i].Type}</button>`);
                $('#toAdd').append(sport);
            }
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    })
}



loadPage();
