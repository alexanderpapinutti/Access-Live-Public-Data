var app = new Vue({
    el: "#app",
    data: {
        members: [],
        show: true,
        partyArray: [],
        senate: "https://api.propublica.org/congress/v1/113/senate/members.json",
        house: "https://api.propublica.org/congress/v1/113/house/members.json",
    },
    created() {
        if (location.pathname == "/house-data.html") {
            this.dataTable(this.senate);
        } else if (location.pathname == "/senate-data.html") {
            this.dataTable(this.house);
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
                    
                    
                })
                .catch(error => alert(error));
        },
        updateStateDropdown: function () {
            var myArray = filterStates();
            var newArray = [];
            var select = document.getElementById("state-filter");
            for (var i = 0; i < myArray.length; i++) {
                var option = document.createElement("option");
                var txt = document.createTextNode(myArray[i]);
                option.appendChild(txt);
                select.appendChild(option);
            }
        },
        selectedState: function () {
            var allRows;
            allRows = this.members;
            var stateSelected = document.getElementById("state-filter").value;
            var statesArray = [];
            for (var i = 0; i < allRows.length; i++) {
                if (allRows[i].state == stateSelected) {
                    statesArray.push(allRows[i]);
                }

            }
            return statesArray;
        },
        filterTableByParty: function () {
            var allRows;
            allRows = app.members;

            app.partyArray = [];

            for (var i = 0; i < allRows.length; i++) {
                if (allRows[i].party == "R" && document.getElementById("republican").checked) {
                    app.partyArray.push(allRows[i]);
                } else if (allRows[i].party == "D" && document.getElementById("democrat").checked) {
                    app.partyArray.push(allRows[i]);
                } else if (allRows[i].party == "I" && document.getElementById("independent").checked) {
                    app.partyArray.push(allRows[i]);
                }
            }
            app.partyArray;
            if (app.partyArray.length > 0){
                app.show = !app.show;    
            }else if (app.partyArray=true){
                app.show = true;
            }else {
            }
            
        },

        filterStates: function () {
            var allRows = this.members;
            var myArray = [];
            for (var i = 0; i < allRows.length; i++) {
                myArray.push(allRows[i].state);

                app.states = myArray.filter((element, index) => (myArray.indexOf(element) == index));
            }

            return app.states.sort();
        }


    }
});



//Name Party	State	Seniority	% of votes
