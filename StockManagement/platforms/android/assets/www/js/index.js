/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
$(function(){
    // On initialise le header
     $( ":jqmData(role='header')" ).toolbar({ defaults: true });
     $(document).on("pagecontainerchange",function(){	
                                 app.onDeviceReady();
                 });

     app.initalize();
});
 
 
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

        if($.mobile.activePage.attr("id") == "rooms"){
                console.log("rooms");
        }
        else if($.mobile.activePage.attr("id") == "materials"){
                console.log("materials");
        }
        else if($.mobile.activePage.attr("id") == "scan"){
                console.log("scan");
                $("#btn_Scan").click(startScan)
        }
        console.log('Received Event: ' + id +'on '+$.mobile.activePage.attr("id"));
    }
};

function startScan(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}