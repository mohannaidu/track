var base_url = "http://prestariang.akaunsaya.com:5000";
var url_multiple = base_url + "/vehicleLocationHistory?deviceid=TK2222";
var url_websocket = base_url + "/gs-guide-websocket";
var stompClient = null;
$("#rightside").hide();
connect();
function connect() {
    var socket = new SockJS(url_websocket);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        //setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/vehicleTracking', function (greeting) {

            var output = JSON.parse(greeting.body);
            showRealtimeMap(output);
        });
    });
}

function showRealtimeMap(message) {

    console.log("function showRealtimeMap(message) {");
    console.log(message);

        var Lat = message.geometry.coordinates[0];
        var Long = message.geometry.coordinates[1];

        console.log(Lat,Long);
        marker.setLngLat([
            parseFloat(Lat),
            parseFloat(Long)
        ]);

        map.flyTo({center: [
            parseFloat(Long),
            parseFloat(Long)
        ]});

        //requestAnimationFrame(showGreeting);


}

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFzc2FucHJlc3RhcmlhbmciLCJhIjoiY2psMXA4aWFiMWkxNDNwcXRidXJ4NGpwNCJ9.ZILPPxFgkleK1ica54v4fA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    //style: 'mapbox://styles/mapbox/basic-v9',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [101.6519444, 2.9094875], // starting position
    zoom: 15 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));
var marker = new mapboxgl.Marker();

function animateMarker(timestamp) {
    var radius = 20;

    // Update the data to a new position based on the animation timestamp. The
    // divisor in the expression `timestamp / 1000` controls the animation speed.
    marker.setLngLat([
        101.6519444,
        2.9094875
    ]);

    // Ensure it's added to the map. This is safe to call if it's already added.
    marker.addTo(map);

    // Request the next frame of the animation.
    //requestAnimationFrame(animateMarker);
}



// Start the animation.
requestAnimationFrame(animateMarker);


$("#mode").change(function(){
    var mode = $("#mode").val();
    console.log(mode)

    if(mode == 'replay'){
        $("#rightside").show();
        var count = 0;
        $.getJSON( url_multiple, function( data ) {
            var finalData = [];

            $.each( data, function( key, val ) {
                finalData.push(val);
            });

            var total_count = finalData.length;


            finalData.forEach((item,index) => {

                setTimeout(function(){
                    count++;

                    console.log(item.geometry.y);
                    console.log(item.geometry.x );

                    marker.setLngLat([
                        item.geometry.y,
                        item.geometry.x
                    ]);

                    map.flyTo({center: [
                            item.geometry.y,
                            item.geometry.x
                        ]});

                    var timeToShow = moment(item.properties.timestamp).format("D/M/Y hh:mm:ss");

                    $("#time").text(timeToShow);
                    $("#countdown").text(count + '/' + total_count);

                }, index * 1000);
            // https://stackoverflow.com/questions/37977602/settimeout-not-working-inside-foreach
        });


        });
    } else {
        $("#rightside").hide();
        connect();
    }
});