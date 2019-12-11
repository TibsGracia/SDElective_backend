$(document).ready(function () {
  $(".portal").submit(function(e) {
    e.preventDefault();
    if ($("#pass").val() != "") {
      if ($("#pass").val() == "admin" ) {
        var auth = true;
        localStorage.setItem("auth", auth);
        window.location.href = "home.html";
      } else  {
        $(".incorrect").css({"display": "block"});
      }
    }
  })
  var show = false;

  $(document).click(function() {
    $(".accSettings").slideUp();
    show = false;
  })

  $("#pass").keydown(function() {
    $(".incorrect").css({"display": "none"});
  })

  $("#logout").click(function() {
    localStorage.removeItem("auth");
    window.location.href="tilt.html";
  })

  $(".icon").click(function(e) {
    e.stopPropagation()
    if (show) {
      $(".accSettings").slideUp();
      show = false;

    } else {
      $(".accSettings").slideDown();
      show = true;

    }
    
  })


  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
  client.on("connect", function () {

    console.log("Successfully connected");
    client.subscribe("tilt");
  })

  client.on("message", function (topic, payload) {
    console.log("recieved:\ntopic: " + topic + "\npayload: " + payload);
    var door = payload.toString().split("-")[1];
    var date = new Date();
    var openTime = date.getHours()+":"+ date.getMinutes()+":"+date.getMilliseconds()+"  -  "+ (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    var status = '<div class="rec"><i class="fas fa-door-open"></i><span>&nbsp;openned</span><p class="time">' + openTime+ '</p></div>';
    $('.'+door).prepend(status);
    var total = $("." + door +"t").text();
    $("." +door+"t").text(Number(total)+1);
    $(".latestOpened").html(door+" - "+openTime);
   
    $.ajax({
      url: 'http://localhost:3000/addRecord',
      data: {"name": door,"openTime": openTime},
      type: 'POST',
      jsonpCallback: 'callback', 
      success: function (data) {
          console.log('Success: '+openTime)
      },
      error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
          alert("Error in saving record!")
      },
  });
  })

})

function Time() {
  var date = new Date();
  var time = date.getHours()+":"+date.getMinutes();
  return time;
}