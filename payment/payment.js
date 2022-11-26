var Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: 'rzp_test_rfWZ8FWRl6uuR0',
    key_secret: 'glmDoUk3beEqiWXiWrzuEG5J',
  });

  // API signature
// {razorpayInstance}.{resourceName}.{methodName}(resourceId [, params])

const makePayment=(req,res,next)=>{
var options={
    amount:req.body.amount,
    currency:"INR",
    receipt:"BILL",
    payment_capture:1
}

instance.orders.create(options,(err,order)=>{
    if(err){
        console.log(err);
        next(err);
    }
    if(order){
        console.log(order);
        res.json({Success:true,status:"Order created Successfully", value:order})
    }
})

// instance.payments.fetch(paymentId)

}

module.exports={makePayment}
module.exports.instance=instance;


    
  