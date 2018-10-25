var app = new Vue({
    el: "#app",
    data: {
        members: [],
        seen: true,
        allMembers: [],
        showFullTable: true,
        showPartyTable: false,
        showStatesTable: false,
        partyArray: [],
        statesArray: [],
        newStatesArray: [],
        senate: "https://api.propublica.org/congress/v1/113/senate/members.json",
        house: "https://api.propublica.org/congress/v1/113/house/members.json",
    },
    created() {
        if (location.pathname == "/house-data.html") {
            this.dataTable(this.house);


        } else if (location.pathname == "/senate-data.html") {
            this.dataTable(this.senate);

        }
    },
    methods: {

        dataTable: function (link) {
            var fetchConfig =
                fetch(link, {
                    method: "GET",

                    headers: ({
                        "X-API-Key": '7YtBT0L3pw0Tqffy6BrgOq44kF4guyNotpUJppRr'
                    })

                })
                .then(function (response) {
                    return response.json();

                })
                .then(function (data) {
                    app.members = data.results["0"].members;
                    app.allMembers = app.members;
                    app.filterTableByState();
                    app.showPage();
                    app.myAlert();
                    
                })
                .catch(error => alert(error));
        },
        selectedState: function () {
            var allRows;
            app.showPage();
            app.myAlert();
            allRows = app.members;
            var stateSelected = document.getElementById("state-filter");
            app.newStatesArray = [];
            for (var i = 0; i < allRows.length; i++) {
                if (allRows[i].state == stateSelected.value || stateSelected.value == 'all') {
                    if (allRows[i].party == "R" && document.getElementById("republican").checked) {
                        app.newStatesArray.push(allRows[i]);
                    } else if (allRows[i].party == "D" && document.getElementById("democrat").checked) {
                        app.newStatesArray.push(allRows[i]);
                    } else if (allRows[i].party == "I" && document.getElementById("independent").checked) {
                        app.newStatesArray.push(allRows[i]);
                    } 
                }
            } 

            
            app.showStatesTable = true;
            app.showFullTable = false;
            app.showPartyTable = false;
        },
        showPage: function () {
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "block";
        },
        filterTableByState: function () {
            var allRows = app.allMembers;
            var myArray = [];
            for (var i = 0; i < allRows.length; i++) {
                myArray.push(allRows[i].state);
                app.statesArray = myArray.filter((element, index) => (myArray.indexOf(element) == index));
            }
            app.statesArray.sort()
        },
        myAlert: function(){
            if (document.getElementById("republican").checked==false && document.getElementById("democrat").checked==false && document.getElementById("independent").checked==false){
                app.seen=true;
            }else {
                app.seen=false;
            }
        },
    }
});



//Name Party	State	Seniority	% of votes
