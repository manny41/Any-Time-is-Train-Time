   // Initialize Firebase
    // This is the code we copied and pasted from our app page
    var config = {
        apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
        authDomain: "fir-click-counter-7cdb9.firebaseapp.com",
        databaseURL: "https://fir-click-counter-7cdb9.firebaseio.com",
        storageBucket: "fir-click-counter-7cdb9.appspot.com"
      };
  
      firebase.initializeApp(config);
      
      //Get a reference to the database service
      var database = firebase.database();
    
      //Variable to capture current time
      var currentTime = new moment().format('HH:mm');
      console.log(currentTime);

      //Adding a new train
      $('#addTrain').on('click', function(event){
        event.preventDefault();

        //Invokes getFormData function and stores it as an object in formValues
        var formValues = getFormData();
        //Invokes submitFormData and passes formValues as an argument
        submitFormData(formValues);
        //Clears the form after its values have been submitted
        clearForm();
      });

      //Get all values from the form
      function getFormData(){
        var formData = {};
        formData.name        = $('#trainName').val().trim();
        formData.destination = $('#destination').val().trim();
        formData.time        = $('#trainTime').val().trim();
        formData.frequency   = $('#frequency').val().trim();

        //Changes what is saved in firebase
        database.ref().push({
          train: formData.name,
          dest: formData.destination,
          time: formData.time,
          freq: formData.frequency,
        });

        return formData;

      }

      //Create Firebase event for adding train information to the database
      database.ref().on('child_added', function(childSnapshot){
        
        console.log(childSnapshot.val());

        var tName = childSnapshot.val().train;
        var tDest = childSnapshot.val().dest;
        var tTime = childSnapshot.val().time;
        var tFreq = childSnapshot.val().freq;

        var firstTrainTime = moment(tTime, 'hh:mm').subtract(1, 'years');
            console.log(firstTrainTime);
        var currentTime = moment();
            console.log('Current Time is: ' + moment(currentTime).format('hh:mm'));
        var timeDifference = moment().diff(moment(firstTrainTime, 'hh:mm'), 'minutes');
            console.log('Time Difference is: ' + timeDifference);
        var timeRemainder = timeDifference % tFreq;
            console.log(timeRemainder);
        var minsAway = tFreq - timeRemainder;
            console.log('Minutes Away: ' + minsAway);
        var nextArrival = moment().add(minsAway, 'minutes').format('hh:mm');
            console.log('Next Arrival: ' + moment(nextArrival).format('hh:mm'));

            console.log(tName);
            console.log(tDest);
            console.log(tTime);
            console.log(tFreq);
            console.log(minsAway);
            console.log(nextArrival);
        
        //Display Next Arrival and Minutes away on the train schedule table
        // $('tbody').append('<td>' + minsAway + '</td><td>' + nextArrival + '</td>');
      });
      // var arrival;
      // var minstoArrive;

      //Submit content from input fields in to the train scheduler table
      function submitFormData(fData){
        //Create table row elememt
        var tRow = $('<tr>');
        //Create table data elements and store input train info in them
        var tName = $('<td>').text(fData.name);
        var tDest = $('<td>').text(fData.destination);
        var tFreq = $('<td>').text(fData.frequency);
        var tTime = $('<td>').text(fData.time);
        // var minstoArrive = $('<td>').text(minsAway);
        // var arrival = $('<td>').text(nextArrival)

        //Add the <td> and its values to the tRow
        tRow.append(tName, tDest, tTime, tFreq);

        //Add the table row (tRow) to the body
        $('tbody').append(tRow);

      }

      //Clears the form
      function clearForm(){
        $('#trainName').val('');
        $('#destination').val('');
        $('#trainTime').val('');
        $('#frequency').val('');
      }
     