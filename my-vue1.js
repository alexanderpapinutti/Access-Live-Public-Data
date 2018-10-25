var app = new Vue({
    el: "#app",
    data: {
        members: [],
        arrayDemocrats: [],
        arrayIndependents: [],
        arrayRepublicans: [],
        sumDemocrats: 0,
        sumRepublicans: 0,
        sumIndependents: 0,
        numberDemocrats: 0,
        numberIndependents: 0,
        numberRepublicans: 0,
        avgDemocrats: 0,
        avgRepublicans: 0,
        avgIndependents: 0,
        senate: "https://api.propublica.org/congress/v1/113/senate/members.json",
        house: "https://api.propublica.org/congress/v1/113/house/members.json",
    },
    created() {
        if (location.pathname == "/house-loyalty-statistics.html") {
            this.dataTable(this.house);

        } else if (location.pathname == "/senate-loyalty-statistics.html") {
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
                    app.updateStatistics();
                })
                .catch(error => alert(error));
        },
        updateStatistics: function() {
            var allRows;
            allRows = app.members;
            for (var i = 0; i < allRows.length; i++) { // setting respective arrays
                if (allRows[i].party == "D") {
                    app.sumDemocrats += allRows[i].votes_with_party_pct; //finding sum of array
                    app.arrayDemocrats.push(allRows[i]);
                }
                if (allRows[i].party == "R") {
                    app.sumRepublicans += allRows[i].votes_with_party_pct;
                    app.arrayRepublicans.push(allRows[i]);
                }
                if (allRows[i].party == "I") {
                    app.sumIndependents += allRows[i].votes_with_party_pct;
                    app.arrayIndependents.push(allRows[i]);
                }else if (app.avgIndependents=NaN){
                    app.avgIndependents="";
                } 
            }
            
            
            
            app.avgIndependents = app.sumIndependents / app.arrayIndependents.length;
            app.avgDemocrats = app.sumDemocrats / app.arrayDemocrats.length; //Averages
            app.avgDemocrats= app.avgDemocrats.toFixed(2);
            app.avgRepublicans = app.sumRepublicans / app.arrayRepublicans.length;
            app.avgRepublicans = app.avgRepublicans.toFixed(2);
            app.numberIndependents = app.arrayIndependents.length;
            app.numberRepublicans = app.arrayRepublicans.length;
            app.numberDemocrats = app.arrayDemocrats.length;
            
            }
    }
})