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

var MATERIAL = null;
var ROOM = null;

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
        $( ":jqmData(role='header')" ).toolbar({ defaults: true });
        $(document).on("pagecontainerchange",function(){   
            if($.mobile.activePage.attr("id") == "rooms"){
                console.log("rooms");
            }
            else if($.mobile.activePage.attr("id") == "materials"){
                    console.log("materials");
                    getAll();
            }
            else if($.mobile.activePage.attr("id") == "scan"){
                    console.log("scan");
                    $("#btn_Scan").click(startScan)
            }
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();

/*
 * opens scanner for QR-Codes
 * params : NO
 * return : NO
 */

function startScan(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
            sendMovement(result.text);
        }, 
        function (error) {
            alert("Scanning failed: " + error);
        }
   );
}


/*
 * 
 * params : 
 * return :
 */

function sendMovement(param){
    if(MATERIAL == null){
        MATERIAL = param;
        alert("Le matériel "+MATERIAL+" a bien été scanné.")
    }else{
        $.ajax('http://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            data: {
                id: 1,
                title: 'foo'+MATERIAL,
                body: 'bar'+param,
                userId: 1
            }
        }).then(function(data) {
            console.log(data);
        });
        MATERIAL = null;
    }
}

function getAll(){
    $.ajax('http://jsonplaceholder.typicode.com/posts', {
        method: 'GET'
    }).then(function(data) {
        console.log(data);
        var content = '<ul id="listv" style="text-transform:uppercase;" data-role="listview">';
        data.forEach(function(obj){
            content += '<li>'+obj+'</li>';
        });
        content+='</ul>';
        $("#materials_content").html(content);
        $("#listv").listview().listview("refresh");
    });
}


