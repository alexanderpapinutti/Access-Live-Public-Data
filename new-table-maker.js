var senateLeastAttendance = document.getElementById("senate-least-attendance-table");
var senateMostAttendance = document.getElementById("senate-most-attendance-table");
var houseLeastAttendance = document.getElementById("house-least-attendance-table");
var houseMostAttendance = document.getElementById("house-most-attendance-table");

var statistics;
statistics = {
    "numberDemocrats": "0",
    "numberRepublicans": "0",
    "numberIndependents": "0",
    "avgVotesDemocrats": 0,
    "avgVotesRepublicans": 0,
    "avgVotesIndependents": 0,
    "leastLoyalty": "0",
    "mostLoyalty": "0",
    "mostMissedVotes": "0",
    "leastMissedVotes": "0"
};

function updateStatistics() {
    var allRows;
    allRows=members;

    var numDemocrats = [];
    var numIndependents = [];
    var numRepublicans = [];

    var sumDemocrats = 0;
    var sumRepublicans = 0;
    var sumIndependents = 0;
    var totalDemocraticVotes = 0;
    var totalRepublicanVotes = 0;
    var avgDemocrats = 0;
    var avgRepublicans = 0;
    var avgIndependents = 0;
    


    for (var i = 0; i < allRows.length; i++) { // setting respective arrays
        if (allRows[i].party == "D") {
            sumDemocrats += allRows[i].votes_with_party_pct; //finding sum of array
            numDemocrats.push(allRows[i]);
        }
        if (allRows[i].party == "R") {
            sumRepublicans += allRows[i].votes_with_party_pct;
            numRepublicans.push(allRows[i]);
        }
        if (allRows[i].party == "I") {
            sumIndependents += allRows[i].votes_with_party_pct;
            numIndependents.push(allRows[i]);
        }
    }
    avgIndependents = sumIndependents / numIndependents.length;
    avgDemocrats = sumDemocrats / numDemocrats.length; //Averages
    avgRepublicans = sumRepublicans / numRepublicans.length;
    var newAvgIndependents = avgIndependents.toFixed(2);
    var newAvgDemocrats = avgDemocrats.toFixed(2);
    var newAvgRepublicans = avgRepublicans.toFixed(2);
    statistics.numberDemocrats = "" + numDemocrats.length; // setting statistics parameters
    statistics.numberRepublicans = "" + numRepublicans.length;
    statistics.numberIndependents = "" + numIndependents.length;
    statistics.avgVotesDemocrats = newAvgDemocrats + "%";
    statistics.avgVotesRepublicans = newAvgRepublicans + "%";
    statistics.avgVotesIndependents = newAvgIndependents + "%";
    statistics.mostLoyalty= sortTopTen("votes_with_party_pct")[0].votes_with_party_pct;
    statistics.leastLoyalty= sortBottomTen("votes_with_party_pct")[0].votes_with_party_pct;
    statistics.mostMissedVotes = sortTopTen("missed_votes_pct")[0].missed_votes_pct;
    statistics.leastMissedVotes = sortBottomTen("missed_votes_pct")[0].missed_votes_pct;
    
}


function glanceTableMaker(object) {
    var table = document.getElementById("senate-glance-table");
    
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    var header_row = document.createElement("tr");
    var header_party = document.createElement("th");
    var header_nMembers = document.createElement("th");
    var header_avgVotes = document.createElement("th");
    var txt_party = document.createTextNode("Party");
    var txt_nMembers = document.createTextNode("Number of Reps")
    var txt_avgVotes = document.createTextNode("% Voted with Party")
    header_party.appendChild(txt_party);
    header_nMembers.appendChild(txt_nMembers);
    header_avgVotes.appendChild(txt_avgVotes);
    header_row.appendChild(header_party);
    header_row.appendChild(header_nMembers);
    header_row.appendChild(header_avgVotes);
    tbody.appendChild(header_row);
    
    // republican row
    var tr_republican= document.createElement("tr");
    var td_party_republican = document.createElement("td");
    var republicans= document.createTextNode("Republicans");
    var republican_reps=object.numberRepublicans;
    var td_republican_reps = document.createElement("td");
    var txt_td_republican_reps = document.createTextNode(republican_reps);
    var votes_republican = object.avgVotesRepublicans;
    var td_votes_pct= document.createElement("td");
    var txt_td_votes_pct = document.createTextNode(votes_republican);
    td_party_republican.appendChild(republicans);
    td_republican_reps.appendChild(txt_td_republican_reps);
    td_votes_pct.appendChild(txt_td_votes_pct);
    tr_republican.appendChild(td_party_republican);
    tr_republican.appendChild(td_republican_reps);
    tr_republican.appendChild(td_votes_pct);
    
    //democratic row
    var tr_democratic= document.createElement("tr");
    var td_party_democratic = document.createElement("td");
    var democrats= document.createTextNode("Democrats");
    var democratic_reps=object.numberDemocrats;
    var td_democratic_reps = document.createElement("td");
    var txt_td_democratic_reps = document.createTextNode(democratic_reps);
    var votes_democrats = object.avgVotesDemocrats;
    var td_votes_pct_democrats= document.createElement("td");
    var txt_td_votes_pct_democrats = document.createTextNode(votes_democrats);
    td_party_democratic.appendChild(democrats);
    td_democratic_reps.appendChild(txt_td_democratic_reps);
    td_votes_pct_democrats.appendChild(txt_td_votes_pct_democrats);
    tr_democratic.appendChild(td_party_democratic);
    tr_democratic.appendChild(td_democratic_reps);
    tr_democratic.appendChild(td_votes_pct_democrats);
    
    //independents row
    var tr_independent = document.createElement("tr");
    var td_party_independent = document.createElement("td");
    var independents= document.createTextNode("Independent");
    var independents_reps= object.numberIndependents;
    var td_independent_reps= document.createElement("td");
    var txt_td_independent_reps= document.createTextNode(independents_reps);
    var votes_independent;
    
    if (object.avgVotesIndependents === "NaN%"){
        votes_independent=0;
    }else{
        votes_independent = object.avgVotesIndependents;
    }
    var td_votes_pct_independents= document.createElement("td");
    var txt_td_votes_pct_independents = document.createTextNode(votes_independent);
   
    td_party_independent.appendChild(independents);
    td_independent_reps.appendChild(txt_td_independent_reps);
    td_votes_pct_independents.appendChild(txt_td_votes_pct_independents);
    tr_independent.appendChild(td_party_independent);
    tr_independent.appendChild(td_independent_reps);
    tr_independent.appendChild(td_votes_pct_independents);
    
    
    
    
    
    tbody.appendChild(tr_republican);
    tbody.appendChild(tr_democratic);
    tbody.appendChild(tr_independent);
    table.appendChild(tbody);
}

function tenPercentArray(array,sortkey) {
    var empty = [];
    for (var i = 0; i < array.length; i++) {
        if (i < (array.length * 0.1)) {
            empty.push(array[i]);
        } else if (array[i-1][sortkey] == array[i][sortkey]) {
            empty.push(array[i]);
        } else {
            break;
        }
    }
    return empty;
}


function sortTopTen(sortkey) {
    var allRows;
    allRows=members;
    allRows.sort(function (a, b) {return b[sortkey] - a[sortkey]});
    return allRows;
}




function sortBottomTen(sortkey) {
    var allRows;
    allRows = members;
    allRows.sort(function (a, b) {return a[sortkey] - b[sortkey]});
    return allRows;
}





function tableMakerAttendance (array,id){
    var table = id;
   
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    var header_row = document.createElement("tr");
    var header_party = document.createElement("th");
    var header_nMembers = document.createElement("th");
    var header_avgVotes = document.createElement("th");
    var txt_party = document.createTextNode("Name");
    var txt_nMembers = document.createTextNode("Number of Votes Missed");
    var txt_avgVotes = document.createTextNode("% Missed");
    header_party.appendChild(txt_party);
    header_nMembers.appendChild(txt_nMembers);
    header_avgVotes.appendChild(txt_avgVotes);
    header_row.appendChild(header_party);
    header_row.appendChild(header_nMembers);
    header_row.appendChild(header_avgVotes);
    tbody.appendChild(header_row);
    
    for (var i=0; i<array.length; i++){
        var tr = document.createElement("tr");
        var td_name = document.createElement("td");
        var links = array[i].url;
        var a = document.createElement("a");
        a.setAttribute("href", links);
        var firstName= array[i].first_name;
        var middleName = array[i].middle_name;
        if (middleName == null){
            middleName="";
        }
        var lastName = array[i].last_name;
        var txt_firstName = document.createTextNode(firstName+" ");
        var txt_middleName = document.createTextNode(middleName+" ");
        var txt_lastName = document.createTextNode(lastName+ " ");
        a.appendChild(txt_firstName);
        a.appendChild(txt_middleName);
        a.appendChild(txt_lastName);
        td_name.appendChild(a);
        
        var td_nVotes = document.createElement("td")
        var nVotes = array[i].missed_votes;
        var txt_nVotes = document.createTextNode(nVotes);
        td_nVotes.appendChild(txt_nVotes);
        var td_partyVotes = document.createElement("td");
        var partyVotes = array[i].missed_votes_pct;
        var txt_partyVotes = document.createTextNode(partyVotes);
        td_partyVotes.appendChild(txt_partyVotes);
        tr.appendChild(td_name);
        tr.appendChild(td_nVotes);
        tr.appendChild(td_partyVotes);
        tbody.appendChild(tr);

        
    }
    
    table.appendChild(tbody);
}


function tableMakerLoyalty(array,id) {
    var table = id;
    
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    var header_row = document.createElement("tr");
    var header_party = document.createElement("th");
    var header_nMembers = document.createElement("th");
    var header_avgVotes = document.createElement("th");
    var txt_party = document.createTextNode("Name");
    var txt_nMembers = document.createTextNode("Number of Party Votes");
    var txt_avgVotes = document.createTextNode("% Party Votes");
    header_party.appendChild(txt_party);
    header_nMembers.appendChild(txt_nMembers);
    header_avgVotes.appendChild(txt_avgVotes);
    header_row.appendChild(header_party);
    header_row.appendChild(header_nMembers);
    header_row.appendChild(header_avgVotes);
    tbody.appendChild(header_row);
    
    for (var i=0; i<array.length; i++){
        var tr = document.createElement("tr");
        var td_name = document.createElement("td");
        var links = array[i].url;
        var a = document.createElement("a");
        a.setAttribute("href", links);
        var firstName= array[i].first_name;
        var middleName = array[i].middle_name;
        if (middleName == null){
            middleName="";
        }
        var lastName = array[i].last_name;
        var txt_firstName = document.createTextNode(firstName+" ");
        var txt_middleName = document.createTextNode(middleName+" ");
        var txt_lastName = document.createTextNode(lastName+ " ");
        a.appendChild(txt_firstName);
        a.appendChild(txt_middleName);
        a.appendChild(txt_lastName);
        td_name.appendChild(a);
        var td_nVotes = document.createElement("td")
        var nVotes = array[i].total_votes;
        var txt_nVotes = document.createTextNode(nVotes);
        td_nVotes.appendChild(txt_nVotes);
        var td_partyVotes = document.createElement("td");
        var partyVotes = array[i].votes_with_party_pct;
        var txt_partyVotes = document.createTextNode(partyVotes);
        td_partyVotes.appendChild(txt_partyVotes);
        tr.appendChild(td_name);
        tr.appendChild(td_nVotes);
        tr.appendChild(td_partyVotes);
        
        tbody.appendChild(tr);
        
    }
    table.appendChild(tbody);
}

function dataTable(link){
    var fetchConfig =
        fetch(link, {
            method: "GET",
            
			headers: ({
				"X-API-Key": '7YtBT0L3pw0Tqffy6BrgOq44kF4guyNotpUJppRr'
			}) 
			
        })
        .then(function(response) {
            return response.json();
            
        })
        .then(function(data){
            console.log(data);
            members = data.results["0"].members;
            console.log(members);
            let myBottomArrayLoyalty= tenPercentArray(sortBottomTen("votes_with_party_pct"),"votes_with_party_pct");
            let myTopArrayLoyalty= tenPercentArray(sortTopTen("votes_with_party_pct"),"votes_with_party_pct");
            let myBottomArrayAttendance = tenPercentArray(sortBottomTen("missed_votes_pct"),"missed_votes_pct");
            let myTopArrayAttendance = tenPercentArray(sortTopTen("missed_votes_pct"),"missed_votes_pct");
            let senateMostLoyalty = document.getElementById("senate-most-loyalty-table");
            let senateLeastLoyalty = document.getElementById("senate-least-loyalty-table");
            let houseMostLoyalty = document.getElementById("house-most-loyalty-table");
            let houseLeastLoyalty = document.getElementById("house-least-loyalty-table");
            let senateLeastAttendance = document.getElementById("senate-least-attendance-table");
            let senateMostAttendance = document.getElementById("senate-most-attendance-table");
            let houseLeastAttendance = document.getElementById("house-least-attendance-table");
            let houseMostAttendance = document.getElementById("house-most-attendance-table");
            

            if(location.pathname=="/house-loyalty-statistics.html"){
                updateStatistics();
                glanceTableMaker(statistics);
                tableMakerLoyalty(myBottomArrayLoyalty,houseLeastLoyalty);
                tableMakerLoyalty(myTopArrayLoyalty,houseMostLoyalty);
            }else if(location.pathname=="/senate-loyalty-statistics.html"){
                updateStatistics();
                glanceTableMaker(statistics);
                tableMakerLoyalty(myBottomArrayLoyalty,senateLeastLoyalty);
                tableMakerLoyalty(myTopArrayLoyalty,senateMostLoyalty);
            }else if(location.pathname=="/senate-attendance-statistics.html"){
                updateStatistics();
                glanceTableMaker(statistics);
                tableMakerAttendance(myBottomArrayAttendance,senateLeastAttendance);
                tableMakerAttendance(myTopArrayAttendance,senateMostAttendance);
            }else if(location.pathname=="/house-attendance-statistics.html"){
                updateStatistics();
                glanceTableMaker(statistics);
                tableMakerAttendance(myBottomArrayAttendance,houseLeastAttendance);
                tableMakerAttendance(myTopArrayAttendance,houseMostAttendance);
            }else{}
            
        })
        .catch(error => alert(error));
} 

if(location.pathname=="/house-loyalty-statistics.html" || "/house-attendance-statistics.html"){
    dataTable("https://api.propublica.org/congress/v1/113/house/members.json");
}else if(location.pathname=="/senate-loyalty-statistics.html" || "/senate-attendance-statistics.html"){
    dataTable("https://api.propublica.org/congress/v1/113/senate/members.json");
}else{}


