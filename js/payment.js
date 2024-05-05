$(document).ready(function() {
    //retrieve value from sessionStorage
    var paymentAmt = sessionStorage.getItem("totalCost");

    //set value in html element
    $("#amt-value").html("$" + paymentAmt);

    paypal.Buttons(
        {
            style: {
                layout: "vertical",
                color: "gold"
                
            },

            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                        value: paymentAmt,
                        }
                    }]
                });
            },

            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert(details.payer.name.given_name
                        + " has been scammed");
                        window.location.replace("index.html");
                });
            }
        }
    ).render("#paypal-btn");
        

    
    // $("#pay-btn").click(function() {
    //     //send email using mail to protocol
    //     var mailtoString = "mailto:your@email.com"    +
    //                        "?subject=Make%20Payment"  +
    //                        "&body=Paid%"              +
    //                        amount;

    //     window.location.href = mailtoString;
    // })
});

