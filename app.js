/**
 * 
 * JS file for controllers and services and components and all that. 
 * 
 */

const app = angular.module('GitHubActivity', []);

app.controller('UsernameController', function ($scope, AppService) {
    $scope.addUser = function () {
        AppService.addNewUser($scope.username);
        console.log('worked');
    };
});


app.controller('UserActivityController', function ($scope, AppService) {

    $scope.ppl = AppService.getUsers();
    $scope.displayUser = function () {



        // AppService.addNewUser();
        // I want the UserActivityController section to display the username and the
        // relevant data whenever I click to add that User. call the showActivity function

    };
});

app.factory('AppService', function ($http) {

    const ppl = [];

    return {

        getUsers() {
            return ppl;
        },

        addNewUser(username) {

            let usr = { // make sure to be mindful of this object because you need a blank object when you are
                        // trying to fill in the DOM you need data stored somewhere, ideally in one place rather than
                name: username,
                repositories: null,
                photo: null,
            }

            ppl.push(usr);

            $http.get('https://api.github.com/users/' + username).then(function (response) {
                console.log(response.data);
                usr.repositories = response.data.public_repos;
                usr.photo = response.data.avatar_url; // I need this to load during the click event to avoid annoying error message
                
                // // ppl.push({
                //     name: username,
                //     repositories: response.data.public_repos,
                // });
            });

            $http.get('https://api.github.com/users/' + username + '/events').then(function (response) {
                console.log(response);
                for (let i = 0; i < response.data.length; i++) {
                    console.log(response.data[i].created_at);  
                }
            });
        },

        showActivity() {

        },
    };
});