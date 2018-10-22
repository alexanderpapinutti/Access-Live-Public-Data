var checkBoxDemocrat = document.getElementById("democrat");
var checkBoxRepublican = document.getElementById("republican");
var checkBoxIndependent = document.getElementById("independent");
var dropDownStates = document.getElementById("state-filter");


function myFunction(members) {
    var table = document.getElementById("senate-data");
    table.innerHTML = "";
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    var header_row = document.createElement("tr");
    var header_column_name = document.createElement("th");
    var header_column_party = document.createElement("th");
    var header_column_state = document.createElement("th");
    var header_column_seniority = document.createElement("th");
    var header_column_votes = document.createElement("th")
    var name_header = document.createTextNode("Name ");
    var party_header = document.createTextNode("Party ");
    var state_header = document.createTextNode("State ");
    var seniority_header = document.createTextNode("Seniority ");
    var votes_header = document.createTextNode("% of votes");
    header_column_name.appendChild(name_header);
    header_column_party.appendChild(party_header);
    header_column_state.appendChild(state_header);
    header_column_seniority.appendChild(seniority_header);
    header_column_votes.appendChild(votes_header);
    header_row.appendChild(header_column_name);
    header_row.appendChild(header_column_party);
    header_row.appendChild(header_column_state);
    header_row.appendChild(header_column_seniority);
    header_row.appendChild(header_column_votes);
    thead.appendChild(header_row);
    table.appendChild(thead);

    for (var i = 0; i < members.length; i++) {

        var tr = document.createElement("tr");

        var td = document.createElement("td");
        var firstName = members[i].first_name;
        var tfirstName = document.createTextNode(firstName + " ");
        var links = members[i].url;
        var a = document.createElement("a");
        a.setAttribute("href", links);
        a.appendChild(tfirstName);
        var middleName = members[i].middle_name;
        if (middleName == null) {
            middleName = "";
        }
        var tmiddleName = document.createTextNode(middleName + " ")
        a.appendChild(tmiddleName);
        var lastName = members[i].last_name;
        var tlastName = document.createTextNode(lastName + " ");
        a.appendChild(tlastName);
        td.appendChild(a);
        var column_party = document.createElement("td");
        var party = members[i].party;
        var tparty = document.createTextNode(party);
        column_party.appendChild(tparty);
        var column_state = document.createElement("td");
        var state = members[i].state;
        var tstate = document.createTextNode(state + " ")
        column_state.appendChild(tstate);
        var column_seniority = document.createElement("td");
        var seniority = members[i].seniority;
        var tseniority = document.createTextNode(seniority + " ")
        column_seniority.appendChild(tseniority);
        var column_votes = document.createElement("td");
        var votes = members[i].votes_with_party_pct;
        var tvotes = document.createTextNode(votes + "%")
        column_votes.appendChild(tvotes);

        tr.appendChild(td);
        tr.appendChild(column_party);
        tr.appendChild(column_state);
        tr.appendChild(column_seniority);
        tr.appendChild(column_votes);
        tbody.appendChild(tr);

    }
    table.appendChild(tbody);

}


function filterTableByParty() {
    var allRows;
    allRows = data.results["0"].members;
    var partyArray = [];

    for (var i = 0; i < allRows.length; i++) {
        if (allRows[i].party == "R" && checkBoxRepublican.checked) {
            partyArray.push(allRows[i]);
        } else if (allRows[i].party == "D" && checkBoxDemocrat.checked) {
            partyArray.push(allRows[i]);
        } else if (allRows[i].party == "I" && checkBoxIndependent.checked) {
            partyArray.push(allRows[i]);
        }
    }
    
    
    
    return partyArray;
}

myFunction(data.results["0"].members);

checkBoxDemocrat.addEventListener("click", function () {
    myFunction(filterTableByParty());
});

checkBoxIndependent.addEventListener("click", function () {
    myFunction(filterTableByParty());
});

checkBoxRepublican.addEventListener("click", function () {
    myFunction(filterTableByParty());
});



function filterStates() {
    var allRows = data.results["0"].members;
    var myArray = [];
    for (var i = 0; i < allRows.length; i++) {
        myArray.push(allRows[i].state);
        var states = myArray.filter((element, index) => (myArray.indexOf(element) == index));

    }
    return states.sort();

}


function updateStateDropdown () {
    var myArray = filterStates();
    var newArray=[];
    var select = document.getElementById("state-filter");
    for (var i = 0; i < myArray.length; i++) {
        var option = document.createElement("option");
        var txt = document.createTextNode(myArray[i]);
        option.appendChild(txt);
        select.appendChild(option);
    }
}

updateStateDropdown();

function selectedState(){
    var allRows;
    allRows = data.results["0"].members;
    var stateSelected = document.getElementById("state-filter").value;
    var statesArray = [];
    for (var i=0; i<allRows.length; i++){
        
        if(allRows[i].state == stateSelected){
            statesArray.push(allRows[i]);
            
        }
    
    }
    return statesArray;
}

dropDownStates.addEventListener("change", function () {
    myFunction(selectedState());
});
