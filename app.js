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
            var amountInput = prompt("Enter amount to fund (minimum 100)");
            if(!amountInput) return;

            var amount = parseInt(amountInput);
            if(isNaN(amount) || amount < 100) {
                alert("Minimum amount is 100");
                return;
            }

            try{
                var token = localStorage.getItem("token");
                if(!token) {
                    alert("Please login first");
                    return;
                }
                showLoader();
                var res = await fetch("https://ag-backend.vercel.app/api/wallet/fund",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({ amount: amount})
                });
                var data = await res.json();
                hideLoader();

                if(!res.ok) {
                    throw new Error(data.message || data.error || "funding failed");
                    
                }

                if(data.authorization_url || data.data?.authorization_url){
                    var url = data.authorization_url || data.data.authorization_url;
                    window.location.href = url;
                } else if(data.success){
                    alert("Wallet funded successifully! Amount: " + amount);
                    location.reload();
                } else {
                    throw new Error ("No payment URL received");
                } 
            
            } catch(err){
                hideLoader();
                alert("Error: " + err.message);
                console.error(err);
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