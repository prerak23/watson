var express=require('express');
var router=express.Router();
var ConversationV1=require('watson-developer-cloud/conversation/v1')
router.post('/',function(req,res){


var conversation=new ConversationV1({
    "url": "https://gateway.watsonplatform.net/conversation/api",
    "username": "96b42eee-c1f2-46b4-8630-42a5c7980728",
    "password": "rIkjBxEtqOIr",
    version_date: '2018-02-16'
})
var userinput=req.body.input;
console.log(userinput);
var convoid=req.body.convoid;
var contextabc=req.body.context;

if(req.body.convoid==0)
{

conversation.message(
  {
    input: { text: userinput },
    workspace_id: '84b66435-810f-4039-b400-0a77322a3cf2',
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
      res.json(response.context);
    }
  }
);

}
else
 {

   contextabc=JSON.parse(contextabc);
   conversation.message(
     {
       input: { text: userinput },
       workspace_id: '84b66435-810f-4039-b400-0a77322a3cf2',
       context:contextabc
     },
     function(err, response) {
       if (err) {
         console.error(err);
       } else
       {
         console.log(JSON.stringify(response, null, 2));

          if(response.output.hasOwnProperty('context'))
          {
            if(response.output.context.hasOwnProperty('Maintopic'))
            {
              res.json(response.context+" "+response.output.context.Maintopic);
            }
            else if (response.output.context.hasOwnProperty('Location'))
            {
                res.json(response.context+" "+response.output.context.Location);
            }
            else if (response.output.context.hasOwnProperty('Date'))
            {
                res.json(response.context+" "+response.output.context.Date);

            }

          }
          else
          {
               res.json(response.context);
          }
       }
     }
   );


}

})

module.exports=router;
