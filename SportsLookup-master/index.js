const express = require('express');
const app = express();
const sql = require('mssql');
const pHash = require('password-hash');

const config = {
    user: 'sportsCatalogUser',
    password: 'catalog159',
    server: 'golem.csse.rose-hulman.edu',
    database: 'sportsCatalog',
}

app.use(express.static('public'));
app.engine('.html', require('ejs').renderFile);

app.get('/list', function (req, res) {
    res.render('sportsList.html');
})
.get('/list/sports', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelect('[dbo].[SelectSports]'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.get('/home', function (req, res) {
    res.render('index.html');
})
.get('/', function (req, res) {
    res.render('logIn.html');
})
.get('/signup', function (req, res) {
    res.render('signUp.html');
})
.get('/team', function (req, res) {
    res.render('teamList.html')
})
.get('/player', function (req, res) {
    res.render('playerLookUp.html')
})
.get('/owner', function (req, res) {
    res.render('ownerLookUp.html')
})
.get('/stadium', function (req, res) {
    res.render('stadiumLookUp.html')
})
.get('/coachLU', function (req, res) {
    res.render('coachLookUP.html')
});


app.get('/list/team', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectName('[dbo].[SelectTeams]'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.post('/list/team/:newTN/:cap/:loc/:LN/:STN', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(teamListAdd('[dbo].[AddTeam]', req.params.newTN, req.params.cap, req.params.loc, req.params.LN, req.params.STN));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.put('/list/team/:newTN/:cap/:loc/:LN/:STN', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(updatTeamList('[dbo].[UpdateTeam]', req.params.newTN, req.params.cap, req.params.loc, req.params.LN, req.params.STN));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.delete('/list/team/:team/:league/', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(deleteTeam('[dbo].[DeleteTeam]', req.params.team, req.params.league));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});

app.get('/list/player', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectName('[dbo].[SelectPlayer]'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.post(`/list/player/:playerName/:teamName/:leagueName/:sal`, function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(appPerson ('[dbo].[AddPerson]', req.params.playerName, req.params.teamName, req.params.leagueName, 'player', req.params.sal));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.put('/list/player/:pName/:lgName/:oldTmName/:newTeamName/:newSalary', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(updatePerson('[dbo].[UpdatePerson]', req.params.pName, req.params.lgName, req.params.oldTmName, req.params.newTeamName, 'player', req.params.newSalary));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.delete('/list/player/:personName/:league/:team', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(deletePerson('[dbo].[DeletePerson]', req.params.personName, req.params.league, req.params.team, 'player'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});

app.get('/list/coach', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectName('[dbo].[SelectCoach]'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.post(`/list/coach/:playerName/:teamName/:leagueName/:sal`, function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(appPerson ('[dbo].[AddPerson]', req.params.playerName, req.params.teamName, req.params.leagueName, 'manager', req.params.sal));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.put('/list/coach/:pName/:lgName/:oldTmName/:newTeamName/:newSalary', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(updatePerson('[dbo].[UpdatePerson]', req.params.pName, req.params.lgName, req.params.oldTmName, req.params.newTeamName, 'manager', req.params.newSalary));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.delete('/list/coach/:personName/:league/:team', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(deletePerson('[dbo].[DeletePerson]', req.params.personName, req.params.league, req.params.team, 'manager'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});

app.get('/list/owner', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectName(`[dbo].[SelectOwner]`));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.post(`/list/owner/:playerName/:teamName/:leagueName/:sal`, function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(appPerson ('[dbo].[AddPerson]', req.params.playerName, req.params.teamName, req.params.leagueName, 'owner', req.params.sal));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.put('/list/owner/:pName/:lgName/:oldTmName/:newTeamName/:newSalary', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(updatePerson('[dbo].[UpdatePerson]', req.params.pName, req.params.lgName, req.params.oldTmName, req.params.newTeamName, 'owner', req.params.newSalary));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.delete('/list/owner/:personName/:league/:team', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(deletePerson('[dbo].[DeletePerson]', req.params.personName, req.params.league, req.params.team, 'owner'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});

app.get('/list/stadium', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectName(`[dbo].[SelectStadium]`));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    )
})
.post(`/list/stadium/:stadiumName/:cap/:loc/:ticketPrice`, function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(addStadium('[dbo].[AddStadium]', req.params.stadiumName, req.params.cap, req.params.loc, req.params.ticketPrice));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.put(`/list/stadium/:stadiumName/:cap/:ticketPrice`, function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(updateStadium('[dbo].[UpdateStadium]', req.params.stadiumName, req.params.cap, req.params.ticketPrice));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})
.delete('/list/stadium/:name', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(deleteStadium('[dbo].[DeleteStadium]', req.params.name));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});


app.get('/list/league', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectName(`[dbo].[SelectLeague]`));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
})

app.get('/list/filteredTeams/:league', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectfilterTeams(`[dbo].[FilterTeam]`, req.params.league));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});

app.get('/list/filterPlayer/:league/:team', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectFilterPerson(`[dbo].[FilterPerson]`, req.params.league, req.params.team, 'player'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});
app.get('/list/filterCoach/:league/:team', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectFilterPerson(`[dbo].[FilterPerson]`, req.params.league, req.params.team, 'manager'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});
app.get('/list/filterOwner/:league/:team', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectFilterPerson(`[dbo].[FilterPerson]`, req.params.league, req.params.team, 'owner'));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});
app.get('/list/filterStadium/:league/:team', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(dbSelectFilterStadium(`[dbo].[filterStadium]`, req.params.league, req.params.team));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});


app.get('/list/logIn/:user/:password', function(req, res){
    new Promise(
        function (resolve, reject){
            resolve(LogIN(`[dbo].[selectUserLogin]`, req.params.user));
        }
    ).then(
        function (fulfilled) {
            res.send(pHash.verify(req.params.password, fulfilled));
        }
    );
});


app.post('/list/signUp/:user/:password', function(req, res){
    const pass = pHash.generate(req.params.password);
    new Promise(
        function (resolve, reject){
           resolve(addUser(`[dbo].[signUpUser]`, req.params.user, pass));
        }
    ).then(
        function (fulfilled) {
            res.json(fulfilled);
        }
    );
});



async function LogIN(query, user) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', sql.NVarChar(50), user)
            .execute(query);

        let toShow = [];
        for(let x in result.recordset){
            toShow.push(result.recordset[x]);
        }
        sql.close();
        return(toShow[0].PasswordHash);
     } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function addUser(query, user, pass) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', sql.NVarChar(50), user)
            .input('hashKey', sql.NVarChar(200), pass)
            .execute(query);

        sql.close();
     } catch (err) {
        console.log(err);
        sql.close();
    }
}


function getRandomSalt(){

}
function getHash (Salt, password){

}

async function dbSelectFilterStadium(query, league, team, label) {
    console.log(query+" "+league+', '+team)
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('team', sql.NVarChar(50), team)
            .input('league', sql.NVarChar(50), league)
            .execute(query);
        let toShow = [];
        for(let x in result.recordset){
            toShow.push(result.recordset[x]);
        }
        sql.close();
        return(toShow);
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function dbSelectFilterPerson(query, league, team, label) {
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('league', sql.NVarChar(50), league)
            .input('team', sql.NVarChar(50), team)
            .input('label', sql.NVarChar(50), label)
            .execute(query);
        let toShow = [];
        for(let x in result.recordset){
            toShow.push(result.recordset[x]);
        }
        sql.close();
        return(toShow);
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function dbSelectfilterTeams(query, league) {
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('league', sql.NVarChar(50), league)
            .execute(query);
        let toShow = [];
        console.log(result);
        for(let x in result.recordset){
            toShow.push(result.recordset[x]);
        }
        sql.close();
        console.log(toShow)
        return(toShow);
    } catch (err) {
        console.log(err);
        sql.close();
    }
}


async function deleteTeam(query, team, league) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('TeamName', sql.NVarChar(50), team)
            .input('LeagueName', sql.NVarChar(50), league)
            .execute(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function deleteStadium(query, stadium) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('StadiumName', sql.NVarChar(50), stadium)
            .execute(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}


async function deletePerson(query, person, league, team, type) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('personName', sql.NVarChar(50), person)
            .input('leagueName', sql.NVarChar(50), league)
            .input('teamName', sql.NVarChar(50), team)
            .input('TypeofPerson', sql.NVarChar(50), type)
            .execute(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}



async function teamListAdd(query, tn, cap, loc, ln, sn) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('teamName', sql.NVarChar(50), tn)
            .input('capacity', sql.Int, cap)
            .input('location', sql.NVarChar(50), loc)
            .input('leagueName', sql.NVarChar(50), ln)
            .input('stadiumName', sql.NVarChar(50), sn)
            .execute(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function appPerson(query, pn, tn, ln, label, sal) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('personName', sql.NVarChar(50), pn)
            .input('teamName', sql.NVarChar(50), tn)
            .input('leagueName', sql.NVarChar(50), ln)
            .input('label', sql.NVarChar(50), label)
            .input('income', sql.Money, sal)
            .execute(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function addStadium(query, sn, cap, loc, tp) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('stadiumName', sql.NVarChar(50), sn)
            .input('capacity', sql.Int, cap)
            .input('location', sql.NVarChar(50), loc)
            .input('ticketpricing', sql.Money, tp)
            .execute(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}
async function updateStadium(query, sn, capacity, price) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('StadiumName', sql.NVarChar(50), sn)
            .input('NewCapacity', sql.Int, capacity)
            .input('NewTicketPrice', sql.Money, price)
            .execute(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function updatePerson(query, personName, leagueName, oldTeamName, newTeamName, label, sal) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('personName', sql.NVarChar(50), personName)
            .input('leagueName', sql.NVarChar(50), leagueName)
            .input('oldTeamName', sql.NVarChar(50), oldTeamName)
            .input('newTeamName', sql.VarChar(50), newTeamName)
            .input('TypeofPerson', sql.NVarChar(50), label)
            .input('newSalary', sql.Money, sal)
            .execute(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}




async function updatTeamList(query, tn, cap, loc, ln, sn) {
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('TeamName', sql.NVarChar(50), tn)
            .input('LeagueName', sql.NVarChar(50), ln)
            .input('NewCapacity', sql.Int, cap)
            .input('NewLocation', sql.VarChar(50), loc)
            .input('NewStadiumName', sql.VarChar(50), sn)
            .execute(query);
        let toShow = [];
        for(let x in result.recordset){
            toShow.push(result.recordset[x].Type);
        }
        sql.close();
        return(toShow);
    } catch (err) {
        console.log(err);
        sql.close();
    }
}



async function dbSelect(query) {
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request()
            .execute(query);
        let toShow = [];
        for(let x in result.recordset){
            toShow.push(result.recordset[x]);
        }
        sql.close();
        return(toShow);
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function dbSelectName(query) {
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request()
            .execute(query);
        let toShow = [];
        for(let x in result.recordset){
            toShow.push(result.recordset[x]);
        }
        sql.close();
        return(toShow);
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function dbSelectPerson(query) {
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request().query(query);
        let toShow = [];
        for(let x in result.recordset){
            toShow.push(result.recordset[x].Name);
        }
        sql.close();
        return(toShow);
    } catch (err) {
        console.log(err);
        sql.close();
    }
}



async function dbCreate(query) {
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request().query(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function dbDelete(query) {
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request().query(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }
}

async function dbUpdate(query) {
    try {
        sql.close();
        const pool = await sql.connect(config);
        const result = await pool.request().query(query);
        sql.close();
    } catch (err) {
        console.log(err);
        sql.close();
    }

}



app.listen(8080);
