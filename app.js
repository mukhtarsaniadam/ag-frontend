const CLOB_API_KEY = "28307ZQ9F998CH357Q3JXH18G8L55A41R52I1XOE7Q5FSH4WQON9GKP47T09GF1L";
const API = "/api";
const WHATSAPP_NUMBER = "2347069304123";

function show(msg) {
    var el = document.getElementById("status");
if(el){ el.innerText = msg; }
console.log(msg);
}
async function buyData() {
    var phoneEl = document.getElementById("phone");
    var networkEl = document.getElementById("network");
    var dataPlanEl = document.getElementById("dataPlan");


    var phone = phoneEl ? phoneEl.value : "";
    var network = networkEl ? networkEl.value : "";
    var dataPlan = dataPlanEl ? dataPlanEl.value : "";
    var plan = dataPlan;

    if(!phone || phone.length < 11){
        alert("Enter Correct phone Number");
        return;
    }

    show("Buying data...please wait");

    fetch('${process.env.NEXT_PUBLIC_API_URL}/api/data/buy',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            network: network,
            phone: phone,
            data_plan: plan
            

        })
    })
       
       .then(function(res){ return res.json(); })
       .then(function(data){
          console.log(data);
          if(data.success || data.status === "success" || data.message){
          show(data.message || "success: " + JSON.stringify(data));
          alert(data.message || "data purchase  initiate");
       } else {
       show("Response: " + JSON.stringify(data));
        alert(data.message || JSON.stringify(data));
       } 

      })
      .catch (function(err) {
        show("Error: " + err.message);
        alert("Error: " + err.message);
      })
    }

       function buyAirtime(){
        var phone = document.getElementById("airtimePhone").value.trim();
        var network = document.getElementById("airtimeNetwork").value;
        var amount = document.getElementById("airtimeAmount").value.trim();

        if(!phone || !amount){
            alert("Fill phone and amount");
            return;
        }

        show("Buying airtime...");

        fetch('${process.env.NEXT_PUBLIC_API_URL}/api/topup',{

        
            method: "POST",
            headers: {
                "Content_Type": "application/json",
                
            },
            body: JSON.stringify({
                network: network,
                phone: phone,
                amount: Number(amount)
            })
        })
        .then(res => res.json())
        .then(data => {
         if(data.success){
            show("success! " + data.message);
         } else {
            show ("Failed: " + (data.message || "error"));
            console.log(data);
         }
            
        })
        .catch(function (err) {
            show("Error: " + err.message);
            alert("Error: " + err.message);
        });
  
        }
        async function fundWallet() {
            var amount = prompt("Enter amount to fund");
            if(!amount) return;

            try{
                var token = localStorage.getItem("token");
                var res = await fetch("https://ag-backend.vercel.app/api/wallet/fund",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({ amount: Number(amount)})
                });
                var data = await res.json();
                if(data.authorization_url){
                    window.location.href = data.authorization_url;
                } else {
                    alert(data.message || "Failed to start payment");
                    console.log(data);
                }
            } catch(err){
                alert("Error: " + err.message);
            }
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