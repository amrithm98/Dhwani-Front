/** *************Angular controller JS*********************/
"use strict"; 
app.controller('ContactController', function ($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function() {
        $scope.submitted=true;
        $scope.submitButtonDisabled = true;
        // var eventArray=[1,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
        var currentEvents=[20,9,14,29,18,10,12,19,8,26,15,24,17,16,27,28,11,25,13,23,22,32,35,33,34]
        var selectedEvents=[];
        $(document).ready(function() {
            var sex=(document.getElementById("sex")).checked;
            var accomodation=(document.getElementById("accomodation")).checked;
            if(sex)
            {
                $scope.data.sex='FEMALE';
            }
            else
            {
                $scope.data.sex='MALE';
            }
            if(accomodation)
            {
                $scope.data.accomodation='YES';
            }
            else
            {
                $scope.data.accomodation='NO';
            }
            for(var i=0;i<currentEvents.length;i++)
            {
                console.log(currentEvents[i].toString());
                var cb=document.getElementById(currentEvents[i].toString());
                console.log(selectedEvents);
                var obj={id:currentEvents[i],
                    check:cb.checked
                };
                selectedEvents.push(obj);
            }
        });
        var registeredEvents=[];
        var events="";
        for(var i=0;i<selectedEvents.length;i++)
        {
            if(selectedEvents[i].check==true)
            {
                registeredEvents.push(selectedEvents[i].id);
                if(i!=selectedEvents.length-2)
                    events+=selectedEvents[i].id+",";
            }
        }
        var eventList=JSON.stringify(registeredEvents).slice(1,-1);
        $scope.data.events=eventList;
        $http.post('http://localhost:11000/register',$scope.data).success(function(req,res){
            if(req.Success)
            {
                alert('Registed Successfully');
            }
            else
            {
                alert('There was an error registering your form. Phone Number already registered.');
            }
        });   
    }
});
