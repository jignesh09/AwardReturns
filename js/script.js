var base_url = "http://192.168.1.41/php/healthgapdirect/webservice";
//var base_url = "http://esurancexchange.com/healthgapdirect/webservice";

// Check valid zipcode





function check_zipcodvalid() {
        if (!($('#vZipCode').val())) {
            $('#getQuotePopMsg').html('Please Enter Your Zip Code');
            $("#getQuotePop").popup();
            $("#getQuotePop").popup("open");
            return false;
        }else if (!($('#iInsuranceTypeId').val())) {
            $('#getQuotePopMsg').html('Please Select Plan');
            $("#getQuotePop").popup();
            $("#getQuotePop").popup("open");
            return false;
        }else{
            $.mobile.loading('show');
            var vZipCode = $('#vZipCode').val();
            var iInsuranceTypeId = $('#iInsuranceTypeId').val();
            var url = base_url + '?action=check_zipcode_valid';
            $.ajax({   
                url: url,
                async: false,
                type: "POST",
                data: "vZipCode="+vZipCode,
                //dataType: "html",
                success: function(data){
                    if(data == 1){				
                        createCookie('vZipCode',vZipCode,' ');
                        createCookie('iInsuranceTypeId',iInsuranceTypeId,' ');
                        //window.localStorage.setItem("vZipCode",$('#vZipCode').val());
                        //window.localStorage.setItem("vQuote",$('#vQuote').val());
                        $.mobile.changePage("#quotePage");
                    }else{
                        $('#getQuotePopMsg').html('You enter wrong zipcode');
                        $("#getQuotePop").popup();
                        $("#getQuotePop").popup("open");
                    }
                }
            });
            $.mobile.loading('hide');
            return false;   
        }
}

// Create all cookies here
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}








var app = {
    // Application Constructor
initialize: function () {
	this.bindEvents();
},
	
bindEvents: function () {
	document.addEventListener('deviceready', this.onDeviceReady, false);
},
	
onDeviceReady: function () {
	app.receivedEvent('deviceready');
},
	
receivedEvent: function (id) {
$.mobile.defaultTransition = 'none';
}
};




$( document ).ready(function() {
   //alert( "ready!" );
     $.mobile.defaultTransition = 'none';
});

function make_base_auth2(id) {
  var tok = id
  var hash = btoa(tok);
  return "Basic " + hash;
}


function make_base_auth1(user,password,id) {
  var tok = user + ':' + password +':'+ id;
  var hash = btoa(tok);
  return "Basic " + hash;
}


function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}
//------------------login--------------------------------------------------------
function Login(){
//alert('dasf')
var uname=$('#username').val();
var pwd=$('#password').val();
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var Rem_me=$('#flip-1').val();
//alert(Rem_me)
//var url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection?$filter=SalesRepId eq 'demo' and Password eq 'demo123' &$format=json"

var url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection?$filter=SalesRepId eq "+uname1+" and Password eq "+pwd1+" &$format=json"
//alert(url)

$.mobile.showPageLoadingMsg();
$.ajax({
      url: url,
      dataType: 'json',
      success: function(data, status) {
             $.mobile.hidePageLoadingMsg();
             console.log(JSON.stringify(data))
             console.log(status)
            // if(data.length !=undefined){
             if(status=="success"){
            // alert('sic')
                 $.mobile.changePage('#homePage')
                   window.localStorage.setItem("sale_repId",uname);
                   window.localStorage.setItem("password",pwd);
                   
              }
             // }
              /*else{
               navigator.notification.alert('Invalid Sales Rep ID or Passwrod', alertDismissed, 'AwardReturns', 'ok' );   
                                  
              }*/
            },
 
    beforeSend: function(xhrObj,SignIn){
                 xhrObj.setRequestHeader('Authorization', make_base_auth(uname,pwd)); 
             },
    error:function(error){
        console.log(error);
        $.mobile.hidePageLoadingMsg();
   //   alert('Invalid Sales Rep ID or Passwrod')
        navigator.notification.alert(
                                  'Invalid Sales Rep ID or Passwrod',  // message
                                    alertDismissed,         // callback
                                    'AwardReturns',            // title
                                     'ok'                  // buttonName
                                  );
        console.log(JSON.stringify(error))
     }
  });


}
function alertDismissed(){

}
//-----------------------------------------------------------------------------------

//---------------function for logout----------------------
function logoff(){

$.mobile.changePage('#loign')
}

//---------------logout end----------------------------------------
//---------------getcustomer ---------------------
function getCustomer(){
//$.mobile.changePage('#Customers')


var uname= window.localStorage.getItem("sale_repId");
var pwd=window.localStorage.getItem("password");
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var Rem_me=$('#flip-1').val();

var url2="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection?$filter=sales_rep_id eq "+uname1+" and password eq "+pwd1+" &$format=json"


$.mobile.showPageLoadingMsg();
$.ajax({
      url: url2,
      dataType: 'json',
      success: function(data, status) {
             $.mobile.hidePageLoadingMsg();
             console.log(JSON.stringify(data))
             var res=eval(data);
            // alert(res.d.results[0].__metadata.uri)
             var html='';
             for(var i=0;i<res.d.results.length;i++){
             var data1=res.d.results[i]
             var c_id=data1.cust_num.toString();
             var c_id2=c_id.toString();
             html+='<div class="ui-block-a"><a href="#" data-c_id='+c_id2+' onclick="CutomerInvoice(this)"><span>'+data1.cust_num+'</span></a>'
             html+='<strong>'+res.d.results[i].cust_name+'</strong>'
             html+='<div class="Garfield_text">'+data1.street+'<br /> '+data1.city+', '+data1.country+'  '+data1.telephone+'</div>'
             html+='</div>'
             
             
             }
            // alert('ok')
             $('#dynamic_customer').html(html).trigger('create');
             $.mobile.changePage('#Customers')
             console.log(status)
           
            },
 
    beforeSend: function(xhrObj,SignIn){
                 xhrObj.setRequestHeader('Authorization', make_base_auth(uname,pwd)); 
             },
    error:function(error){
        console.log(error);
        $.mobile.hidePageLoadingMsg();
   //   alert('Invalid Sales Rep ID or Passwrod')
        navigator.notification.alert(
                                  'some thing went wrong',  // message
                                    alertDismissed,         // callback
                                    'AwardReturns',            // title
                                     'ok'                  // buttonName
                                  );
        console.log(JSON.stringify(error))
     }
  });




}


//------------------------------- getting customer invoice-----------------------------------------------------
function CutomerInvoice(ev){
//alert($(ev).data('c_id'))

var uname= window.localStorage.getItem("sale_repId");
var pwd=window.localStorage.getItem("password");
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var id=$(ev).data('c_id');
var id1="'"+id+"'";


var url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection?$filter=customer_num eq "+id1+" &$format=json"


$.mobile.showPageLoadingMsg();
$.ajax({
      url:url,
      dataType: 'json',
      success: function(data, status) {
             $.mobile.hidePageLoadingMsg();
             console.log(JSON.stringify(data))
             var res=eval(data);
              var res=eval(data);
             if(res.d.results.length>0){
                 var html='';
                 var c_idthml='Customer ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+res.d.results[0].cust_id;
                 var c_namehtml='Customer name &nbsp;&nbsp;&nbsp;&nbsp;'+res.d.results[0].cust_name;
                 var str = res.d.results[0].invoice_date;
                var ress = str.slice(6,str.length-2);
                var ress1=parseInt(ress)
                 var dt=new Date(ress1);
                var montheArray=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
                 for(var i=0;i<res.d.results.length;i++){
                  var data1=res.d.results[i]
                  //alert(data1.item_count)
            
                    var str = res.d.results[i].invoice_date;
                    var ress = str.slice(6,str.length-2);
                    var ress1=parseInt(ress)
                     var dt=new Date(ress1);
                     var yr=dt.getFullYear();
                     var mon=dt.getMonth();
                     var a="/";
                     var dt_yr=montheArray[mon]+a+yr;
                  var det1 = dt.getDate();
                 // alert(dt_yr)
                  html+='<div class="ui-block-a" ><div class="Createtop"><span>'+det1+'</span>'
                  html+='<h1>'+dt_yr+'</h1></div><strong>'+parseInt(data1.invoice_amt)+'</strong>'
                  html+='<div class="Garfield_text" data-invo_id="'+data1.invoice_num+'" data-cid="'+res.d.results[0].cust_id+'" data-cname="'+res.d.results[0].cust_name+'" onclick="invoiceDetail(this)" ><h1>'+data1.invoice_num+'</h1><h2>'+data1.item_count+' items</h2></div></div>'
                  }
                 $('#invo_cusId').html(c_idthml).trigger('create');
                 $('#invo_cusName').html(c_namehtml).trigger('create');
                 $('#Cus_invo_details').html(html).trigger('create');
                 $.mobile.changePage('#Create_returns')
                // alert('scu')
             }//end if
            else{
            navigator.notification.alert( 'No Data Found',alertDismissed, 'AwardReturns','ok');
                                   
             }
            },
 
    beforeSend: function(xhrObj){
                 xhrObj.setRequestHeader('Authorization', make_base_auth(uname,pwd));
                //xhrObj.setRequestHeader('Authorization', make_base_auth2(id)); 
             },
    error:function(error){
        console.log(error);
        $.mobile.hidePageLoadingMsg();
   //   alert('Invalid Sales Rep ID or Passwrod')
        navigator.notification.alert(
                                  'some thing went wrong',  // message
                                    alertDismissed,         // callback
                                    'AwardReturns',            // title
                                     'ok'                  // buttonName
                                  );
        console.log(JSON.stringify(error))
     }
  });


}

//--------------------getting envoice details-----------------------------------------------------------------

function invoiceDetail(ev){

//alert($(ev).data('invo_id'))
var cname=$(ev).data('cname');
var cid=$(ev).data('cid');

var uname= window.localStorage.getItem("sale_repId");
var pwd=window.localStorage.getItem("password");
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var id=$(ev).data('invo_id');
var id1="'"+id+"'";


var url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection?$filter=invoice_num eq "+id1+" &$format=json"


$.mobile.showPageLoadingMsg();
$.ajax({
      url:url,
      dataType: 'json',
      success: function(data, status) {
             $.mobile.hidePageLoadingMsg();
             console.log(JSON.stringify(data))
             var res=eval(data);
             
                 var html='';
                //alert(res.d.results.length)
                 for(var i=0;i<res.d.results.length;i++){
                   var data1=res.d.results[i]
                  html+=' <div class="ui-block-a"><div class="Createtop"><span>'+data1.units+'</span></div>'
                  html+='<strong>'+data1.invoice_item+'</strong><strong>'+parseInt(data1.quantity)+' items</strong>'
                  html+=' <strong>Drop-down</strong><strong>Drop-down</strong></div>'
                 }
           // alert(cid);
           //alert(cname);
             var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Returns order #</h1>6000058</div>'
              var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Date </h1>7/16/2013</div>'
            $('#invoice_detaila').html(html)
           $('#in_c_id').html(html6)
           $('#in_c_name').html(html1)
            $.mobile.changePage('#returns_creen')
            },
 
    beforeSend: function(xhrObj){
                 xhrObj.setRequestHeader('Authorization', make_base_auth(uname,pwd));
               
             },
    error:function(error){
        console.log(error);
        $.mobile.hidePageLoadingMsg();

        navigator.notification.alert( 'some thing went wrong', alertDismissed,  'AwardReturns', 'ok');
                               
        console.log(JSON.stringify(error))
     }
  });



}



//--------------------getting envoice details-----------------------------------------------------------------

function invoiceDetail_total(ev){

//alert($(ev).data('invo_id'))
var cname=$(ev).data('cname');
var cid=$(ev).data('cid');

var uname= window.localStorage.getItem("sale_repId");
var pwd=window.localStorage.getItem("password");
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var id=$(ev).data('invo_id');
var id1="'"+id+"'";


var url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection?$filter=invoice_num eq "+id1+" &$format=json"


$.mobile.showPageLoadingMsg();
$.ajax({
      url:url,
      dataType: 'json',
      success: function(data, status) {
             $.mobile.hidePageLoadingMsg();
             console.log(JSON.stringify(data))
             var res=eval(data);
             
                 var html='';
                //alert(res.d.results.length)
                 for(var i=0;i<res.d.results.length;i++){
                   var data1=res.d.results[i]
                  html+=' <div class="ui-block-a"><div class="Createtop"><span>'+data1.units+'</span></div>'
                  html+='<strong>'+data1.invoice_item+'</strong><strong>'+parseInt(data1.quantity)+' items</strong>'
                  html+=' <strong>Drop-down</strong><strong>Drop-down</strong></div>'
                 }
           // alert(cid);
           //alert(cname);
             var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Returns order #</h1>6000058</div>'
              var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Date </h1>7/16/2013</div>'
            $('#invoice_detaila').html(html)
           $('#in_c_id').html(html6)
           $('#in_c_name').html(html1)
            $.mobile.changePage('#returns_creen')
            },
 
    beforeSend: function(xhrObj){
                 xhrObj.setRequestHeader('Authorization', make_base_auth(uname,pwd));
               
             },
    error:function(error){
        console.log(error);
        $.mobile.hidePageLoadingMsg();

        navigator.notification.alert( 'some thing went wrong', alertDismissed,  'AwardReturns', 'ok');
                               
        console.log(JSON.stringify(error))
     }
  });



}


