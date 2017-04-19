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
        var eventJSON=[{"eventId":1,"name":"CET Night ","day":"Friday","time":"7:30 pm","venue":"Dhwani Stage","prize":0},{"eventId":4,"name":"Treasure Hunt ","day":"Sat/Sun","time":"All Day","venue":"Trivandrum","prize":15000},{"eventId":6,"name":"Film Festical ","day":"Saturday","time":"All Day","venue":"CGPU","prize":5000},{"eventId":7,"name":"Crime Scene ","day":"Saturday","time":"All Day","venue":"Campus","prize":4000},{"eventId":8,"name":"Dhwani Idol","day":"Saturday","time":"9:00 am","venue":"Cetaa Hall","prize":10000},{"eventId":9,"name":"Dance Off ","day":"saturday","time":"10:00 am","venue":"Walkway","prize":7000},{"eventId":10,"name":"mimicry","day":"saturday","time":"10:00 am","venue":"Seminar Hall","prize":3000},{"eventId":11,"name":"English Debate","day":"Saturday","time":"10:00 am","venue":"Seminar Hall","prize":3000},{"eventId":12,"name":"Mono Act","day":"Saturday","time":"12:00 pm","venue":"Seminar Hall","prize":4000},{"eventId":13,"name":"Jam","day":"Saturday","time":"1:00 pm","venue":"Seminar Hall","prize":5000},{"eventId":14,"name":"Duet","day":"Saturday","time":"2:00 pm","venue":"DJ hall","prize":10000},{"eventId":15,"name":"Unplugged","day":"Saturday","time":"2:00 pm","venue":"Golden Walkway","prize":15000},{"eventId":16,"name":"Collage ","day":"Saturday","time":"3:00 pm","venue":"Archi Corner","prize":3000},{"eventId":17,"name":"Face Painting","day":"Saturday","time":"4:00 pm","venue":"Archi Corner","prize":3000},{"eventId":18,"name":"Mime","day":"Saturday","time":"4:00 pm","venue":"DJ hall","prize":10000},{"eventId":19,"name":"Street play","day":"Saturday","time":"4:00 pm","venue":"Archi Corner","prize":10000},{"eventId":20,"name":"Choreo Night","day":"Saturday","time":"6:00 pm","venue":"Dhwani Stage","prize":60000},{"eventId":21,"name":"Fashion show","day":"Saturday","time":"8:00 pm","venue":"Dhwani Stage","prize":50000},{"eventId":22,"name":"Cricket","day":"Saturday","time":"Beforenoon","venue":"College Ground","prize":12000},{"eventId":23,"name":"Badminton","day":"Saturday","time":"Beforenoon","venue":"Indoor Stadium","prize":10000},{"eventId":24,"name":"Decibels","day":"Sunday","time":"9:00 am","venue":"Dhwani Stage","prize":70000},{"eventId":25,"name":"Mal Debate","day":"Sunday","time":"10:00 am","venue":"Golden Walkway","prize":7000},{"eventId":26,"name":"Western Solo","day":"Sunday","time":"12:00 pm","venue":"Cetaa Hall","prize":6000},{"eventId":27,"name":"Sketching","day":"Sunday","time":"3:00 pm","venue":"Archi Corner","prize":3000},{"eventId":28,"name":"Colouring","day":"Sunday","time":"4:00 pm","venue":"Archi Corner","prize":3000},{"eventId":29,"name":"Demo","day":"Sunday","time":"4:00 pm","venue":"DJ ","prize":20000},{"eventId":30,"name":"Dumb Charades ","day":"Sunday","time":"4:00 pm","venue":"Archi Corner","prize":3000},{"eventId":31,"name":"Persona","day":"Sunday","time":"6:00 pm","venue":"Dhwani Stage","prize":10000},{"eventId":32,"name":"Football","day":"Sunday","time":"Beforenoon","venue":"College Ground","prize":15000},{"eventId":33,"name":"Table tennis","day":"Sunday","time":"Beforenoon","venue":"Indoor Stadium","prize":10000},{"eventId":34,"name":"Chess","day":"Sunday","time":"Beforenoon","venue":"Golden Walkway","prize":25000},{"eventId":35,"name":"Volleyball","day":"Sunday","time":"Beforenoon","venue":"Central Ground","prize":10000}];
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
                // console.log(currentEvents[i].toString());
                var cb=document.getElementById(currentEvents[i].toString());
                // console.log(selectedEvents);
                var obj={id:currentEvents[i],
                    check:cb.checked
                };
                selectedEvents.push(obj);
            }
        });
        var eventNames="";
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
        for(var i=0;i<registeredEvents.length;i++)
        {
            var result = $.grep(eventJSON, function(e){ return e.eventId == registeredEvents[i]; });
            eventNames+=result[0].name+",";
        }
        var eventList=JSON.stringify(registeredEvents).slice(1,-1);
        $scope.data.events=eventList;
        $scope.data.eventNames=eventNames;
        $http.post('http://104.131.163.77:11000/register',$scope.data).success(function(req,res){
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
