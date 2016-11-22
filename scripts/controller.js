'use strict';

(function() {
    angular.module('LiftOff')
        .controller('liftController', ['$scope', '$timeout', liftController]);

    function liftController($scope, $timeout) {
        $scope.today = function() {
            $scope.plan.start = new Date();
        };
        $scope.clear = function() {
            $scope.plan.start = null;
        };
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };
        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };
        $scope.toggleMin();
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
        $scope.disableTab = true;
        $scope.disableFirstTab = false;
        $scope.submit = function(plan) {
            if (plan.start > plan.end) {
                $scope.errorText = "Start Date should be lessthan End Date";
                $scope.errorMessage = true;
            } else {
                var restValue = 100 - plan.value;
                var pieData = [{
                    value: plan.value,
                    color: "pink"
                }, {
                    value: restValue,
                    color: "#ddd"
                }];
                var myPie = new Chart(document.getElementById("canvas").getContext("2d")).Doughnut(pieData, { percentageInnerCutout: 80 });
                var dd = plan.start.getDate();
                var mm = plan.start.getMonth() + 1; //January is 0!
                var yyyy = plan.start.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd
                }
                if (mm < 10) {
                    mm = '0' + mm
                }
                var dd1 = plan.end.getDate();
                var mm1 = plan.end.getMonth() + 1; //January is 0!
                var yyyy1 = plan.end.getFullYear();
                if (dd1 < 10) {
                    dd1 = '0' + dd1
                }
                if (mm1 < 10) {
                    mm1 = '0' + mm1
                }
                $scope.start_date = mm + '/' + dd + '/' + yyyy;
                $scope.end_date = mm1 + '/' + dd1 + '/' + yyyy1;
                $scope.disableTab = false;
                $scope.disableFirstTab = true;
                $scope.active = 1;
            }
            $scope.goback = function(plan) {
                $scope.disableTab = true;
                $scope.disableFirstTab = false;
                $scope.active = 0;
                plan.name = undefined;
                    plan.value = undefined;
                    plan.start = undefined;
                    plan.end = undefined;
            }
        }
    }
})();
