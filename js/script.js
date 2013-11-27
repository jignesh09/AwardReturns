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
	local_login();
console.log('dreay')
$.mobile.defaultTransition = 'none';
}
};


function local_login() {
       var loc= window.localStorage.getItem("sale_repId_l");
           window.localStorage.getItem("password_l");
	   if (loc=='' || loc==null) {
		//code
	   }
	   else{
		 $.mobile.changePage('#homePage')
	   }
}

$( document ).ready(function() {
   console.log( "ready!" );
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
if (Rem_me=='on') {
	   window.localStorage.setItem("sale_repId_l",uname);
           window.localStorage.setItem("password_l",pwd);
}
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
                  // getHeader();
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
window.localStorage.setItem("sale_repId",'');
window.localStorage.setItem("password",'');
window.localStorage.setItem("sale_repId_l",'');
window.localStorage.setItem("password_l",'');
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
		/*
		alert(res.d.results[0].cust_name)
		
		alert(CustomerNameArray.length);
		alert(CustomerNameArray.indexOf(res.d.results[0].cust_name));
		*/
		
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

//getHeader();
//alert($(ev).data('invo_id'))
var cname=$(ev).data('cname');
var cid=$(ev).data('cid');
 in_cname=cname;
   in_cid=cid;
var uname= window.localStorage.getItem("sale_repId");
var pwd=window.localStorage.getItem("password");
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var id=$(ev).data('invo_id');
 in_id=id;
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
		 var fuldate='';
                //alert(res.d.results.length)
		var ht='<option>DAMAGED IN TRANSIT</option><option>MATERIAL RUINED</option><option>POOR QUALITY</option><option>WRONG MATERIAL</option>'
		var ht1='<option>GOODS IN DAMAGED CONDITION</option><option>GOODS RETURNED WITH LOSS IN WEIGHT</option><option>RETURNED WRONG ITEM</option>'
                 for(var i=0;i<res.d.results.length;i++){
                   var data1=res.d.results[i]
		 //  alert(data1.billing_date)
		   
		     var str = res.d.results[i].billing_date;
                    var ress = str.slice(6,str.length-2);
                    var ress1=parseInt(ress)
                     var dt=new Date(ress1);
                     var yr=dt.getFullYear();
                     var mon=dt.getMonth();
		     var det1 = dt.getDate();
		      fuldate=det1+'/'+mon+'/'+yr;
		   
                  html+=' <div class="ui-block-a"><div class="Createtop"><span>'+data1.units+'</span></div>'
                  html+='<strong>'+data1.invoice_item+'</strong><strong>'+parseInt(data1.quantity)+' items</strong>'
                 // html+='<div id="poor_quality_text"><div id="textinput"><input type="text" vlaue="3"/></div><div id="selecttextbox"><select name="" class="selecttext"></select></div></div></div>';
		 html+='<div class="poor_quality_text4"><div id="textinput"><select name="" class="selecttext">'+ht+'</select></div><div class="selecttextbox"><select name="" class="selecttext">'+ht1+'</select></div></div></div>';
                 }
           // alert(cid);
           //alert(cname);
             var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Returns order #</h1>'+data1.invoice_number+'</div>'
              var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Date </h1>'+fuldate+'</div>'
            $('#invoice_detaila').html(html).trigger('create');
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
var in_id='';
var in_cname='';
var in_cid='';
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
                  html+=' <div class="poor_quality_text4"><div class="textinputtes"><select name="" class="selecttext"></select></div><div class="selecttextbox"><select name="" class="selecttext"></select></div></div></div>'
                 }
		 html+='<div class="justret_button"><a href="#" onclick="gotoReturnconfrm()"><img src="images/Return_button.png" width="100%"></a></div>'
           // alert(cid);
           //alert(cname);
	   /*
	    *<div class="ui-block-a"><div class="Createtop"><span>EA</span></div><strong>1000078</strong><strong>5 items</strong>
	<div id="poor_quality_text"><div class="textinputtes"><select name="" class="selecttext"></select></div><div class="selecttextbox"><select name="" class="selecttext"></select></div>
	</div>
	
</div>
	    **/
	   
             var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Returns order #</h1>6000058</div>'
              var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Date </h1>7/16/2013</div>'
          //  $('#invoice_detaila').html(html)
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

function customerInvoReturns(){
	/*
	console.log('ok');
	var pdata='';
	    pdata +='<?xml version="1.0" encoding="utf-8"?>';
	    pdata +=' <entry ';
	    pdata +=' xml:base="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_RETURNS_SRV/InvoiceReturnCollection/"';
	    pdata +='xmlns="http://www.w3.org/2005/Atom"';
	    pdata +='xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"';
	    pdata +='xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices">';
	    pdata +='<id>http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_RETURNS_SRV/InvoiceReturnCollection/</id>';
	    pdata +='<title type="text">Post_ES</title>';
	    pdata +='<updated>2013-06-29T14:45:34Z</updated>';
	    pdata +='<category term="/SQUEEZE/INVOICE_RETURNS_SRV/squeeze/invoice_returns_srv"';
	    pdata +='scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme"/>';
	    pdata +='<link href="Post_ES" rel="self" title="/SQUEEZE/INVOICE_RETURNS_SRV"/>';
	    pdata +='<content type="application/atom+xml">';
	    pdata +='<m:properties>';
	    pdata +='<d:InvoiceNum>0090000149</d:InvoiceNum>';
	    pdata +='<d:ItemNum>000010</d:ItemNum>';
	    pdata +='<d:ItemQuantity>5.000</d:ItemQuantity>';
	    pdata +='</m:properties>';
	    pdata +='</content>';
	    pdata +='</entry>';
	    
	var uname= window.localStorage.getItem("sale_repId");
        var pwd=window.localStorage.getItem("password");
   var url='http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_RETURNS_SRV/InvoiceReturnCollection'
      $.ajax({ type: "POST",
                            url:url,
                            data: pdata, 
                            contentType: "application/xml",
                            dataType: "xml",
			    
                            cache: false,
			    //'X-CSRF-Token':'fetch',
			    beforeSend: function(xhrObj){
                        xhrObj.setRequestHeader('Authorization', make_base_auth(uname,pwd));
				xhrObj.setRequestHeader('X-CSRF-Token','fetch')
               
                            },
                            error: function(error) { alert("err data found.");
			       console.log(error);
			    },
                            success: function(xml) {
                                alert("it works");
                                alert($(xml).find("project")[0].attr("id"));
                            }
            });
            
            */
	
	/*
   var data='<?xml version="1.0" encoding="UTF-8"?>'

    data+='<atom:entry'


    data+='xmlns:atom="http://www.w3.org/2005/Atom"'

    data+='xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"'

    data+='xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">'

    data+='<atom:content type="application/xml">'

    data+='<m:properties>'

    data+='<d:OrderId>0</d:OrderId>'

    data+='<d:DocType>RE</d:DocType>'

    data+='<d:SalesOrg>1000</d:SalesOrg>'

    data+='<d:DistrChan>10</d:DistrChan>'

    data+='<d:Division>10</d:Division>'

    data+='<d:DateType>1</d:DateType>'

    data+='<d:OrdReason>101</d:OrdReason>'

    data+='<d:PartnNumb>0000000011</d:PartnNumb>'

    data+='</m:properties>'

    data+='</atom:content>'

    data+='<atom:link'

    data+='rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/SOItems"'

    data+='type="application/atom+xml;type=feed"'

    data+='title="SALESORDER.SOHeader_SOItems">'

    data+='<m:inline>'

    data+='<atom:feed>'

    data+='<atom:entry>'

    data+='<atom:content type="application/xml">'

    data+='<m:properties>'

    data+='<d:ItmNumber>000010</d:ItmNumber>'

    data+='<d:Material>P500043</d:Material>'

    data+='<d:Plant>1000</d:Plant>'

    data+='<d:StoreLoc>1000</d:StoreLoc>'

    data+='<d:TargetQty>5.000</d:TargetQty>'

    data+='<d:TargetQu>EA</d:TargetQu>'

    data+='<d:ShortText>Coke</d:ShortText>'

    data+='<d:MatlGroup>50200000</d:MatlGroup>'

    data+='<d:CondStNo>011</d:CondStNo>'

    data+='<d:CondCount>01</d:CondCount>'

    data+='<d:CondType>PR00</d:CondType>'

    data+='<d:CondValue>35.000</d:CondValue>'

    data+='<d:Currency>USD</d:Currency>'

    data+='<d:ReqDate>2013-11-26T00:00:00</d:ReqDate>'

    data+='<d:ReqQty>25.000</d:ReqQty>'

    data+='</m:properties>'

    data+='</atom:content>'

    data+='</atom:entry>'

    data+='<atom:entry>'

    data+='<atom:content type="application/xml">'

    data+='<m:properties>'

    data+='<d:ItmNumber>000020</d:ItmNumber>'

    data+='<d:Material>P500042</d:Material>'

    data+='<d:Plant>1000</d:Plant>'

    data+='<d:StoreLoc>1000</d:StoreLoc>'

    data+='<d:TargetQty>5.000</d:TargetQty>'

    data+='<d:TargetQu>EA</d:TargetQu>'

    data+='<d:ShortText>ThumsUp</d:ShortText>'

    data+='<d:MatlGroup>50200000</d:MatlGroup>'

    data+='<d:CondStNo>011</d:CondStNo>'

    data+='<d:CondCount>01</d:CondCount>'

    data+='<d:CondType>PR00</d:CondType>'

    data+='<d:CondValue>24.000</d:CondValue>'

    data+='<d:Currency>USD</d:Currency>'

    data+='<d:ReqDate>2013-11-26T00:00:00</d:ReqDate>'

   data+='<d:ReqQty>15.000</d:ReqQty>'

   data+='</m:properties>'

   data+='</atom:content>'

   data+='</atom:entry>'

   data+='</atom:feed>'

   data+='</m:inline>'

   data+='</atom:link>'

   data+='</atom:entry>'
   var uname= window.localStorage.getItem("sale_repId");
var pwd=window.localStorage.getItem("password");
   var url='http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/JUST_RETURNS_MULTIPLE_SRV/'
      $.ajax({ type: "POST",
                            url:url,
                            data: data, 
                            contentType: "application/xml",
                            dataType: "xml",
			    
                            cache: false,
			    'X-CSRF-Token':'fetch',
			    beforeSend: function(xhrObj){
                        xhrObj.setRequestHeader('Authorization', make_base_auth(uname,pwd));
				//xhrObj.setRequestHeader('X-CSRF-Token','fetch')
               
                            },
                            error: function(error) { alert("No data found.");
			       console.log(error);
			    },
                            success: function(xml) {
                                alert("it works");
                                alert($(xml).find("project")[0].attr("id"));
                            }
            });
            */
}

function customerInvoReturns11(){
	//alert('ok')
	//$.mobile.changePage("#In_ref_invoice");
	
	var uname= window.localStorage.getItem("sale_repId");
        var pwd=window.localStorage.getItem("password");
       /* var uname1="'"+uname+"'";
        var pwd1="'"+pwd+"'";
        var id=$(ev).data('invo_id');
        var id1="'"+id+"'";
        */
       var url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection&$format=json"
       $.mobile.showPageLoadingMsg();
$.ajax({
      url:url,
      dataType: 'json',
      success: function(data, status) {
             $.mobile.hidePageLoadingMsg();
             console.log(JSON.stringify(data))
             var res=eval(data);
             alert('suc')
                 var html='';
                //alert(res.d.results.length)
                 for(var i=0;i<res.d.results.length;i++){
                   var data1=res.d.results[i]
                 
                 }
           
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


function gotoReturnconfrm() {
	
	
	//$.mobile.changePage('#Returns_confirmation_screen2')
	
var cname=in_cname
var cid=in_cid
  
   
var uname= window.localStorage.getItem("sale_repId");
var pwd=window.localStorage.getItem("password");
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var id=in_id
    
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
		 var fuldate='';
                //alert(res.d.results.length)
		var ht='<option>DAMAGED IN TRANSIT</option><option>MATERIAL RUINED</option><option>POOR QUALITY</option><option>WRONG MATERIAL</option>'
                 for(var i=0;i<res.d.results.length;i++){
                   var data1=res.d.results[i]
		      var str = res.d.results[i].billing_date;
                    var ress = str.slice(6,str.length-2);
                    var ress1=parseInt(ress)
                     var dt=new Date(ress1);
                     var yr=dt.getFullYear();
                     var mon=dt.getMonth();
		     var det1 = dt.getDate();
		     fuldate=det1+'/'+mon+'/'+yr;
                  html+=' <div class="ui-block-a"><div class="Createtop"><span>'+data1.units+'</span></div>'
                  html+='<strong>'+data1.item_name+'</strong>';
		  html+='<div class="Garfield_text"><h1>'+data1.material+'</h1><h2>'+parseInt(data1.quantity)+' items</h2></div>';
		  html+='<div class="poor_quality_text4"><div id="textinput"><input type="text" vlaue="3"/></div><div id="selecttextbox"><select name="" class="selecttext">'+ht+'</select></div></div></div>';
		//  html+='<div class="poor_quality_text"><input type="text" vlaue="3"/><select><option>ok</option><option>ok</option></select></div></div>';
		/*
		 *<div class="ui-block-a"><div class="Createtop"><span>10</span></div><strong>Air Tubs</strong><div class="Garfield_text"><h1>P500020</h1><h2>6 items</h2></div><div class="poor_quality_text"><div id="textinput"><input type="text" vlaue="3"/></div><div id="selecttextbox"><select name="" class="selecttext"></select></div></div></div>
		 *
		 *
		 */
		
		
		
                 }
           //<div class="Garfield_text"><h1>P500020</h1><h2>6 items</h2></div><div class="poor_quality_text"><span>3</span><h1>Poor Quality</h1></div></div>
           //alert(cname);
             var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Returns order #</h1>'+data1.invoice_number+'</div>'
              var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Date </h1>'+fuldate+'</div>'
            $('#invoice_detaila_return').html(html).trigger('create');
	   //// alert('ok');
           $('#in_c_id_retun').html(html6).trigger('create');
           $('#in_c_name_retun').html(html1).trigger('create');
            $.mobile.changePage('#Returns_confirmation_screen2')
	        //alert('ok');
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


function gotoCreditmemo() {
	 $.mobile.changePage('#Credit_memo')
}

var ReturnOrderArray=[];
var InvoiceNumberArray=[];
var CustomerNameArray=[];
var ReturnDateArray=[];
function getHeader() {
	var uname= window.localStorage.getItem("sale_repId");
var pwd=window.localStorage.getItem("password");
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var Rem_me=$('#flip-1').val();

var url2="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection?$filter=SalesRepId eq "+uname1+" and Password eq "+pwd1+" &$format=json"

console.log(url2)
//alert(url2)
$.mobile.showPageLoadingMsg();
$.ajax({
      url: url2,
      dataType: 'json',
      success: function(data, status) {
             $.mobile.hidePageLoadingMsg();
	     console.log('--------------------------------------------')
             console.log(JSON.stringify(data))
	     	     console.log('--------------------------------------------')
             var res=eval(data);
	    // alert('suc')
            // alert(res.d.results[0].__metadata.uri)
             var html='';
             for(var i=0;i<res.d.results.length;i++){
                var data1=res.d.results[i];
		ReturnOrderArray.push(data1.ReturnOrder)
		InvoiceNumberArray.push(data1.InvoiceNumber)
		CustomerNameArray.push(data1.CustomerName)
		ReturnDateArray.push(data1.ReturnDate)
             
             }
            // alert('ok')
            
           
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

function getReports() {
	
	//  $.mobile.changePage('#ReportsPage')
	
var uname= window.localStorage.getItem("sale_repId");
var pwd=window.localStorage.getItem("password");
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var Rem_me=$('#flip-1').val();

var url2="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection?$filter=SalesRepId eq "+uname1+" and Password eq "+pwd1+" &$format=json"


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
	     var str = data1.ReturnDate
                    var ress = str.slice(6,str.length-2);
                    var ress1=parseInt(ress)
                     var dt=new Date(ress1);
                     var yr=dt.getFullYear();
                     var mon=dt.getMonth();
		     var det1 = dt.getDate();
		     var deate=det1+'/'+mon+'/'+yr;
          var c_name=data1.CustomerName;
	  var c_re_order=data1.ReturnOrder;
	  var c_invoice_no=data1.InvoiceNumber;
	  var c_date=data1.ReturnDate;
	 // alert(c_re_order)
             html+='<div class="ui-block-a" data-rid='+c_re_order+' data-date1='+deate+' data-cname="'+c_name+'"      onclick="getRetrunOrderDetails(this);"><a href="#"><span>'+det1+'</span></a>'
             html+='<strong>'+c_name+'</strong>'
             html+='<div class="poor_quality_text1"><div class="textinputtes1">'+c_invoice_no+'</div><div class="selecttextbox1">'+c_re_order+'</div></div></div>'
           // html+='</div><div>';
             
          //textbox
	
             }
            // alert('ok')
             $('#Report_customer').html(html).trigger('create');
             $.mobile.changePage('#ReportsPage')
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


function getRetrunOrderDetails(ev){
	var r_id=$(ev).data('rid');
	var c_name=$(ev).data('cname');
	var c_date=$(ev).data('date1');
	//var c_cid=$(ev).data('');
	//data-rid='+c_re_order+' data-date1='+deate+' data-cname="'+c_name+'"
	var uname= window.localStorage.getItem("sale_repId");
	var pwd=window.localStorage.getItem("password");
var uname1="'"+uname+"'";
var pwd1="'"+pwd+"'";
var id=$(ev).data('rid');
var id1="'"+id+"'";


var url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_ITEMS_SRV/ReturnOrderItemCollection?$filter=ReturnordNumber eq "+id1+" &$format=json"


$.mobile.showPageLoadingMsg();
$.ajax({
      url:url,
      dataType: 'json',
      success: function(data, status) {
             $.mobile.hidePageLoadingMsg();
             console.log(JSON.stringify(data))
             var res=eval(data);
              var res=eval(data);
	     // alert('suc');
           
                 var html='';
                
                 for(var i=0;i<res.d.results.length;i++){
                  var data1=res.d.results[i]
                  //alert(data1.item_count)
               var i_num=parseInt(data1.ItemNumber);
                 html+='<div class="ui-block-a"><div class="Createtop"><span>'+i_num+'</span></div>'
		 //html+='<strong>Air Tubs</strong>';
		 html+='<div class="Garfield_text"><h1>'+data1.ItemName+'</h1></div>';
		 html+='<div class="poor_quality_text"><span>'+parseInt(data1.ReturnQuantity)+'</span><h1>'+data1.ReturnReason+'</h1></div></div>';
                 var ccid=data1.CustomerNumber
                  }
		  
		  var c_idthml='<div class="Barnes_text"><h1>Customer ID</h1><span>'+ccid+'</span></div><div class="invoice_text"><h1>Return order #</h1>'+r_id+'</div>'
		  var c_namehtml='<div class="Barnes_text"><h1>Customer name</h1>'+c_name+'</div><div class="invoice_text"><h1>Invoice date </h1>'+c_date+'</div>';
		/*  <div class="custo_text" id="returnDetailHead1"><div class="Barnes_text"><h1>Customer ID</h1><span>42</span></div><div class="invoice_text"><h1>Invoice #</h1> 90000090</div></div>
		<div class="custo_text1" id="returnDetailHead1"><div class="Barnes_text"><h1>Customer name</h1>Barnes Plumbing Co</div><div class="invoice_text"><h1>Invoice date </h1>8/25/2013</div></div>*/
		  
                 $('#returnDetailHead').html(c_idthml).trigger('create');
                 $('#returnDetailHead1').html(c_namehtml).trigger('create');
                 $('#Return_Oid_detail').html(html).trigger('create');
                 $.mobile.changePage('#ReturnOrderDeatilpage')
                // alert('scu')
          
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