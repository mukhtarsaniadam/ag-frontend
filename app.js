const CLOB_API_KEY = "28307ZQ9F998CH357Q3JXH18G8L55A41R52I1XOE7Q5FSH4WQON9GKP47T09GF1L";
const API = "/api";
const WHATSAPP_NUMBER = "2347069304123";

function show(msg) {
    var el = document.getElementById("status");
if(el){ el.innerText = msg; }
console.log(msg);
}
function buyData() {
    var phone = document.getElementById("phone").ariaValueMax.trim();
    var network = document.getElementById("network").ariaValueMax;
    var dataPlan = document.getElementById('dataPlan').ariaValueMax;

    if(phone.length < 11){
        alert("Enter Correct Phone Number");
        return;
    }

    show("Buying data...please wait");

    fetch(API + "/data/", {
       method: "POST",
       headers: {
        "Content-Type": "applicaton/json",
         "Authorization": "Token" + CLOB_API_KEY
       },
       body: JSON.stringify({
        network: network,
        phone: phone,
        data_Plan: Plan,
        Plan_id: Plan
       })
       })
       .then(function(res){ return res.json(); })
       .then(function(data){
          console.log(data);
          show(JSON.stringify(data));
          alert(JSON.parse(data));
       })
       .catch(function(err){
        show("Error: " + err.message);
        alert("Error: " + err.message);
       });

       }

       function buyAirtime(){
        var phone = document.getElementById("airtimePhone").value.trim();
        var network = document.getElementById("airtimeNetwork").value;
        var amount = document.getElementById("airtimeAmount").value.tim();

        if(!phone || !amount){
            alert("Fill phone and amount");
            return;
        }

        show("Buying airtime...");

        fetch(API + "/topup/",{
            method: "POST",
            headers: {
                "Content_Type": "application/json",
                "Authorization": "Token" + CLOB_API_KEY
            },
            body: JSON.stringify({
                network: network,
                phone: phone,
                amount: amount
            })
        })
        .then(function(res) { return res.json(); })
        .then(function(data){
            console.log(data);
            show(JSON.stringify(data));
            alert(JSON.stringify(data));
            
        })
        .catch(function (err) {
            show("Error: " + err.message);
            alert("Error: " + err.message);
        });
  
        }
        function fundWallet() {
            var message = "Hello, I want to fund my wallet on AG DATA";
            var url = "https://wa.me/" + 2347069304123 + "?text=" + encodeURIComponent(message);
            window.open(url, "  ");
            
        }
        var Plans = [
            {id: "1", text: "MTN 500MB - 1 Days"},
             {d: "2", text: "MTN 1GB - 7 Days"},
             {id: "3", text: "MTN 2GB - 7 Days"},
             {id: "4", text: "GLO 1GB - 30 Days"},
             {id: "5", text: "AIRTEL - 1GB 7 Days"},
        ];

        var sel = document.getElementById("dataPlan");
        if(sel){
            for(var i=0; i<Plans.length; i++){
                var opt = document.createElement("option");
                opt.value = Plans[i].id;
                opt.textContent = Plans[i].text;
                sel.appendChild(opt);
            }
        }
     console.log("AG ICT Loaded - API Ready");