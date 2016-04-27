
Parse.Cloud.afterSave("Emergency", function(request, response) {
  var queryIOS = new Parse.Query(Parse.Installation);
  queryIOS.equalTo('deviceType', 'ios');
  Parse.Push.send({
  where: queryIOS,
  data: {
    alert: "There is an emergency at " + request.object.get('latitude') + ", " + request.object.get('longitude'),
    title: "SmartSOS",
    badge: "Increment", 
    sound: "cheering.caf", 
    emergency: request.object
  }
}, {
  success: function() {
    // Push was successful
    console.log("Push send successful")
  },
  error: function(error) {
    // Handle error
    console.log("Send push fail " + error.message)
  }
});

});