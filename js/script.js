var side_url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/";

var cus_name='';
var cus_id='';
var caddress='';
var invoicid='';

var noofItem=[];
var R_Reason=[];
var itemNumArray=[];
var priceArray=[];
var QuantityArray=[];
var materialArray=[];
var itemNameArray=[];
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
                    $.mobile.defaultPageTransition = "none"
                    $.mobile.defaultDialogTransition = 'none';
                    $.mobile.useFastClick = true;
                    $.mobile.touchOverflowEnabled = true;
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
    //http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/SALESREP_VALIDATE/salesrep_validaCollection?$filter=sales_rep_id eq 'demo' and password eq 'demo123'
    var url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/SALESREP_VALIDATE/salesrep_validaCollection?$filter=sales_rep_id eq "+uname1+" and password eq "+pwd1+" &$format=json"
   // alert(url)
    
    $.mobile.showPageLoadingMsg();
    $.ajax({
           url: url,
           dataType: 'json',
           success: function(data, status) {
           $.mobile.hidePageLoadingMsg();
           console.log(JSON.stringify(data))
           console.log(status)
           var datas=eval(data);
           // if(data.length !=undefined){
           if(datas.d.results[0].valid=="Y"){
           // alert('sic')
           //alert(datas.d.results[0].valid)
           $.mobile.changePage('#homePage')
           if (Rem_me=='on') {
           window.localStorage.setItem("sale_repId_l",uname);
           window.localStorage.setItem("password_l",pwd);
           }
           window.localStorage.setItem("sale_repId",uname);
           window.localStorage.setItem("password",pwd);
           // getHeader();
           }
           
           else{
            navigator.notification.alert('Invalid Sales Rep ID or Passwrod', alertDismissed, 'AwardReturns', 'ok' );
            
            }
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

var cus_name='';
var cus_id='';
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
           var adds=data1.street+','+data1.city+','+data1.country+','+data1.telephone;
           var c_id2=c_id.toString();
           var searcdata=data1.cust_name+c_id;
           html+='<li class="Cc_list" style="none" add="'+searcdata+'"><div class="ui-block-a" ><a href="#" data-c_id='+c_id2+' data-cusname="'+data1.cust_name+'"  data-adds="'+adds+'" onclick="CutomerInvoice(this)"><span>'+data1.cust_num+'</span></a>'
           html+='<strong>'+res.d.results[i].cust_name+'</strong>'
           html+='<div class="Garfield_text">'+data1.street+'<br /> '+data1.city+', '+data1.country+'  '+data1.telephone+'</div>'
           html+='</div></li>'
           
           
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
    caddress=$(ev).data('adds');
    cus_name=$(ev).data('cusname');
    cus_id=$(ev).data('c_id');
    
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
    invoicid=$(ev).data('invo_id');
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
		   
           html+='<li class="returnlist" add="'+data1.invoice_item+'"> <div class="ui-block-a"><div class="Createtop"><span>'+data1.units+'</span></div>'
           html+='<strong>'+data1.invoice_item+'</strong><strong>'+parseInt(data1.quantity)+' items</strong>'
           // html+='<div id="poor_quality_text"><div id="textinput"><input type="text" vlaue="3"/></div><div id="selecttextbox"><select name="" class="selecttext"></select></div></div></div>';
           html+='<div class="poor_quality_text4"><div id="textinput"><select name="" class="selecttext">'+ht+'</select></div><div class="selecttextbox"><select name="" class="selecttext">'+ht1+'</select></div></div></div></li>';
           }
           // alert(cid);
           //alert(cname);
           var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Invoice #</h1>'+data1.invoice_number+'</div>'
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

function onjustRetConfirm(b){
    if(b==1){
        var Rbody='<?xml version="1.0" encoding="UTF-8"?>'
        Rbody+='<atom:entry '
        Rbody+='xmlns:atom="http://www.w3.org/2005/Atom" '
        Rbody+='xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" '
        Rbody+='xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">'
        Rbody+='<atom:content type="application/xml">'
        Rbody+='<m:properties>'
        Rbody+='<d:OrderId>0</d:OrderId>'
        Rbody+='<d:DocType>RE</d:DocType>'
        Rbody+='<d:SalesOrg>1000</d:SalesOrg>'
        Rbody+='<d:DistrChan>10</d:DistrChan>'
        Rbody+='<d:Division>10</d:Division>'
        Rbody+='<d:DateType>1</d:DateType>'
        Rbody+='<d:OrdReason>101</d:OrdReason>'
        Rbody+='<d:PartnNumb>0000000011</d:PartnNumb>'
        Rbody+='</m:properties>'
        Rbody+='</atom:content>'
        Rbody+='<atom:link '
        Rbody+='rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/SOItems" '
        Rbody+='type="application/atom+xml;type=feed" '
        Rbody+='title="SALESORDER.SOHeader_SOItems">'
        Rbody+='<m:inline>'
        Rbody+='<atom:feed>'
        //-----------------------------------------------
        Rbody+='<atom:entry>'
        Rbody+='<atom:content type="application/xml">'
        Rbody+='<m:properties>'
        Rbody+='<d:ItmNumber>000010</d:ItmNumber>'//fonund
        Rbody+='<d:Material>P500043</d:Material>'//fonund
        Rbody+='<d:Plant>1000</d:Plant>'
        Rbody+='<d:StoreLoc>1000</d:StoreLoc>'
        Rbody+='<d:TargetQty>5.000</d:TargetQty>'//fonund
        Rbody+='<d:TargetQu>EA</d:TargetQu>'
        Rbody+='<d:ShortText>Jack Daniels Whiskey</d:ShortText>'//fonund
        Rbody+='<d:MatlGroup>50200000</d:MatlGroup>'
        Rbody+='<d:CondStNo>011</d:CondStNo>'
        Rbody+='<d:CondCount>01</d:CondCount>'
        Rbody+='<d:CondType>PR00</d:CondType>'
        Rbody+='<d:CondValue>35.000</d:CondValue>'
        Rbody+='<d:Currency>USD</d:Currency>'
        Rbody+='<d:ReqDate>2013-11-26T00:00:00</d:ReqDate>'
        Rbody+='<d:ReqQty>25.000</d:ReqQty>'
        Rbody+='</m:properties>'
        Rbody+='</atom:content>'
        Rbody+='</atom:entry>'
        //-----------------------------------------------------------------------
        Rbody+='<atom:entry>'
        Rbody+='<atom:content type="application/xml">'
        Rbody+='<m:properties>'
        Rbody+='<d:ItmNumber>000020</d:ItmNumber>'
        Rbody+='<d:Material>P500042</d:Material>'
        Rbody+='<d:Plant>1000</d:Plant>'
        Rbody+='<d:StoreLoc>1000</d:StoreLoc>'
        Rbody+='<d:TargetQty>5.000</d:TargetQty>'
        Rbody+='<d:TargetQu>EA</d:TargetQu>'
        Rbody+='<d:ShortText>Wine</d:ShortText>'
        Rbody+='<d:MatlGroup>50200000</d:MatlGroup>'
        Rbody+='<d:CondStNo>011</d:CondStNo>'
        Rbody+='<d:CondCount>01</d:CondCount>'
        Rbody+='<d:CondType>PR00</d:CondType>'
        Rbody+='<d:CondValue>24.000</d:CondValue>'
        Rbody+='<d:Currency>USD</d:Currency>'
        Rbody+='<d:ReqDate>2013-11-26T00:00:00</d:ReqDate>'
        Rbody+='<d:ReqQty>15.000</d:ReqQty>'
        Rbody+='</m:properties>'
        Rbody+='</atom:content>'
        Rbody+='</atom:entry>'
        
        //--------------------------------------------------------------
        Rbody+='</atom:feed>'
        Rbody+='</m:inline>'
        Rbody+='</atom:link>'
        Rbody+='</atom:entry>'
        
         $.mobile.showPageLoadingMsg();
        var user= window.localStorage.getItem("sale_repId");
        var pwd=window.localStorage.getItem("password");
        var url = 'http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/JUST_RETURNS_MULTIPLE_SRV/SOHeaderCollection';
        var req=new XMLHttpRequest();
        req.open("GET", url,false);
        
        req.setRequestHeader('Authorization', make_base_auth(user,pwd));
        req.setRequestHeader('x-csrf-token', "Fetch");
        
        req.onreadystatechange=function()
        {
            if(req.readyState == 4 && (req.status==200 || req.status == 500))
            {
                CSRFTOKEN = req.getResponseHeader('x-csrf-token');
                console.log(CSRFTOKEN);
                var pdata='';
                
                
                var auth = make_base_auth('demo','demo123');
                var req1 = new XMLHttpRequest();
                
                
                
                req1.open("POST","http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/JUST_RETURNS_MULTIPLE_SRV/SOHeaderCollection",true);
                req1.setRequestHeader('Authorization', auth);
                req1.setRequestHeader("content-type", "application/xml");
                req1.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                req1.setRequestHeader("x-csrf-token", CSRFTOKEN);
                
                req1.onreadystatechange=function()
                {
                    
                    if (req1.readyState==4 )
                    {
                        //alert(req1.responseText);
                        $.mobile.hidePageLoadingMsg();
                        
                        console.log("-----------here now--------------------------------------------------------");
                        console.log(req1.responseText);
                        // var xml = request.responseText;
                        //  var users = xml.getElementsByTagName("feed");
                        // alert(users.length)
                        console.log("-----------here now----------------------------------------------------------");
                        $.mobile.changePage('#Credit_memo')
                        
                        gotoCReditMempage()
                    }
                    
                }
                req1.send(Rbody);
                /*
                 var url = 'http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/JUST_RETURNS_MULTIPLE_SRV/SOHeaderCollection';
                 $.ajax({ url: url,
                 type: 'POST',
                 data:xmlBody,
                 beforeSend: function(xhr) {
                 xhr.setRequestHeader('Authorization', make_base_auth('demo','demo123'));
                 xhr.setRequestHeader('X-CSRF-Token', CSRFTOKEN);
                 },
                 success: function(data,response) {
                 console.log(response);
                 
                 },error:function(e,response){
                 console.log(response);
                 }
                 });*/
            }
        }
        req.send();
        

    }
}

function customerInvoReturns(){
	
	//alert('ok');
    navigator.notification.confirm(
                                   'Are you sure Return?', // message
                                   onjustRetConfirm,            // callback to invoke with index of button pressed
                                   'AwardReturns',           // title
                                   ['Yes','No']         // buttonLabels
                                   );
      
    
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
    itemNumArray=[];
    priceArray=[];
    QuantityArray=[];
    materialArray=[];
    itemNameArray=[];
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
		   itemNumArray.push(data1.invoice_item)
		   priceArray.push(data1.price)
		   QuantityArray.push(data1.quantity)
		   materialArray.push(data1.material)
		   itemNameArray.push(data1.item_name)
		   serdata=data1.material+data1.item_name;
           html+='<li class="returnconfmlist" add="'+serdata+'"> <div class="ui-block-a"><div class="Createtop"><span>'+parseInt(data1.invoice_item)+'</span></div>'
           html+='<strong>'+data1.item_name+'</strong>';
           html+='<div class="Garfield_text"><h1>'+data1.material+'</h1><h2>'+parseInt(data1.quantity)+' items</h2></div>';
           html+='<div class="poor_quality_text5"><div id="textinput"><input type="text" /></div><div id="selecttextbox"><select name="" class="selecttext">'+ht+'</select></div></div></div>';
           //  html+='<div class="poor_quality_text"><input type="text" vlaue="3"/><select><option>ok</option><option>ok</option></select></div></div>';
           /*
            *<div class="ui-block-a"><div class="Createtop"><span>10</span></div><strong>Air Tubs</strong><div class="Garfield_text"><h1>P500020</h1><h2>6 items</h2></div><div class="poor_quality_text"><div id="textinput"><input type="text" vlaue="3"/></div><div id="selecttextbox"><select name="" class="selecttext"></select></div></div></div>
            *
            *
            */
           
           
           
           }
           //<div class="Garfield_text"><h1>P500020</h1><h2>6 items</h2></div><div class="poor_quality_text"><span>3</span><h1>Poor Quality</h1></div></div>
           //alert(cname);
           var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Invoice #</h1>'+data1.invoice_number+'</div>'
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
	console.log(itemNumArray)
     $.mobile.showPageLoadingMsg();
	noofItem=[];
	R_Reason=[];
	$('input[type=text]', '#invoice_detaila_return').each(function() {
                                                          //   alert($(this).val())
                                                          var val1=$(this).val();
                                                          noofItem.push(val1)
                                                          })
	$('select', '#invoice_detaila_return').each(function() {
                                                // alert($(this).val())
                                                //  var val1=$(this).val();
                                                R_Reason.push($(this).val())
                                                })
	
 
    console.log(noofItem);
    console.log(R_Reason)
    var dt=new Date();
    /*
     *var cus_name='';
     var cus_id='';
     var caddress='';
     var invoicid='';
     
     var noofItem=[];
     var R_Reason=[];
     var itemNumArray=[];
     var priceArray=[];
     *
     */
    //alert(itemNumArray[0])
    
    
    
    //http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/JUST_RETURNS_MULTIPLE_SRV/SOHeaderCollection
    var Rbody='<?xml version="1.0" encoding="UTF-8"?>'
    Rbody+='<atom:entry '
    Rbody+='xmlns:atom="http://www.w3.org/2005/Atom" '
    Rbody+='xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" '
    Rbody+='xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">'
    Rbody+='<atom:content type="application/xml">'
    Rbody+='<m:properties>'
    Rbody+='<d:OrderId>'+invoicid+'</d:OrderId>'
    Rbody+='<d:ItemNumber>000010</d:ItemNumber>'
    Rbody+='<d:DocType>RE</d:DocType>'
    Rbody+='<d:SalesOrg>1000</d:SalesOrg>'
    Rbody+='<d:DistrChan>10</d:DistrChan>'
    Rbody+='<d:Division>10</d:Division>'
    Rbody+='<d:RefDoc>'+invoicid+'</d:RefDoc>'
    Rbody+='<d:PartnNumb>0000000011</d:PartnNumb>'
    Rbody+='</m:properties>'
    Rbody+='</atom:content>'
    Rbody+='<atom:link '
    Rbody+='rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/SOItems" '
    Rbody+='type="application/atom+xml;type=feed" '
    Rbody+='title="SALESORDER.SOHeader_SOItems">'
    Rbody+='<m:inline>'
    Rbody+='<atom:feed>'
    //---------------------------------------------
    for(var i=0;i<itemNumArray.length;i++){
        
        Rbody+='<atom:entry>'
        Rbody+='<atom:content type="application/xml">'
        Rbody+='<m:properties>'
        Rbody+='<d:OrderId>'+invoicid+'</d:OrderId>'//found
        Rbody+='<d:ItemNumber>'+itemNumArray[i]+'</d:ItemNumber>'//found
        Rbody+='<d:TargetQty>'+QuantityArray[i]+'</d:TargetQty>'//found
        Rbody+='<d:ReqDate>2013-11-27T00:00:00</d:ReqDate>'
        Rbody+='<d:ReqQty>'+noofItem[i]+'</d:ReqQty>'
        Rbody+='</m:properties>'
        Rbody+='</atom:content>'
        Rbody+='</atom:entry>'
        
    }
    //-----------------------end1-------------------------------
    /*
     Rbody+='<atom:entry>'
     Rbody+='<atom:content type="application/xml">'
     Rbody+='<m:properties>'
     Rbody+='<d:OrderId>0090000140</d:OrderId>'
     Rbody+='<d:ItemNumber>000020</d:ItemNumber>'
     Rbody+='<d:TargetQty>5.000</d:TargetQty>'
     Rbody+='<d:ReqDate>2013-11-27T00:00:00</d:ReqDate>'
     Rbody+='<d:ReqQty>5.000</d:ReqQty>'
     Rbody+='</m:properties>'
     Rbody+='</atom:content>'
     Rbody+='</atom:entry>'
     */
    //-------------------------end2---------------------------------
    Rbody+='</atom:feed>'
    Rbody+='</m:inline>'
    Rbody+='</atom:link>'
    Rbody+='</atom:entry>'
    
    /*
     alert(invoicid);
     alert(itemNumArray[0])
     alert(QuantityArray[0])
     */
    //console.log(data1);
    var user= window.localStorage.getItem("sale_repId");
    var pwd=window.localStorage.getItem("password");
    var url = 'http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_RETURN_ORDER_SRV_0/SOHeaderCollection';
    var req=new XMLHttpRequest();
    req.open("GET", url,false);
    
    req.setRequestHeader('Authorization', make_base_auth(user,pwd));
    req.setRequestHeader('x-csrf-token', "Fetch");
    
    req.onreadystatechange=function()
    {
        if(req.readyState == 4 && (req.status==200 || req.status == 500))
        {
            CSRFTOKEN = req.getResponseHeader('x-csrf-token');
            console.log(CSRFTOKEN);
            var pdata='';
            
            
            var auth = make_base_auth('demo','demo123');
            var req1 = new XMLHttpRequest();
            
            
            
            req1.open("POST","http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_RETURN_ORDER_SRV_0/SOHeaderCollection",true);
            req1.setRequestHeader('Authorization', auth);
            req1.setRequestHeader("content-type", "application/xml");
            req1.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            req1.setRequestHeader("x-csrf-token", CSRFTOKEN);
			
            req1.onreadystatechange=function()
            {
                
                if (req1.readyState==4 )
                {
                    //alert(req1.responseText);
                     $.mobile.hidePageLoadingMsg();
                      
                    console.log("-----------here now--------------------------------------------------------");
                    console.log(req1.responseText);
                   // var xml = request.responseText;
                  //  var users = xml.getElementsByTagName("feed");
                   // alert(users.length)
                    console.log("-----------here now----------------------------------------------------------");
                     $.mobile.changePage('#Credit_memo')
                    
                    gotoCReditMempage()
                }
                
            }
            req1.send(Rbody);
            /*
             var url = 'http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/JUST_RETURNS_MULTIPLE_SRV/SOHeaderCollection';
             $.ajax({ url: url,
             type: 'POST',
             data:xmlBody,
             beforeSend: function(xhr) {
             xhr.setRequestHeader('Authorization', make_base_auth('demo','demo123'));
             xhr.setRequestHeader('X-CSRF-Token', CSRFTOKEN);
             },
             success: function(data,response) {
             console.log(response);
             
             },error:function(e,response){
             console.log(response);
             }
             });*/
        }
    }
    req.send();
    
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
           var serReport=c_invoice_no+c_name+c_re_order;
           html+='<li class="repostlist" add="'+serReport+'"><div class="ui-block-a" data-rid='+c_re_order+' data-date1='+deate+' data-cname="'+c_name+'"      onclick="getRetrunOrderDetails(this);"><a href="#"><span>'+det1+'</span></a>'
           html+='<strong>'+c_name+'</strong>'
           html+='<div class="poor_quality_text1"><div class="textinputtes1">'+c_invoice_no+'</div><div class="selecttextbox1">'+c_re_order+'</div></div></div></li>'
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
           html+='<li class="re_detail_li" add="'+data1.ItemName+'"><div class="ui-block-a"><div class="Createtop"><span>'+i_num+'</span></div>'
           //html+='<strong>Air Tubs</strong>';
           html+='<div class="Garfield_text"><h1>'+data1.ItemName+'</h1></div>';
           html+='<div class="poor_quality_text"><span>'+parseInt(data1.ReturnQuantity)+'</span><h1>'+data1.ReturnReason+'</h1></div></div></li>';
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


function serchReports(event){
    var key = $(event).val();
    var nkey=key.toLowerCase();
    searchReportFiles(nkey);
}

function SearchCuList(event) {
	//alert($(event).val())
	
	var key = $(event).val();
    var nkey=key.toLowerCase();
    searchFiles(nkey);
}

function serchReDetails(event) {
	var key = $(event).val();
    var nkey=key.toLowerCase();
    searchRepoDetailsFiles(nkey);
}

function Returnlistserch(event) {
    var key = $(event).val();
    var nkey=key.toLowerCase();
    searchRetunlistFiles(nkey);
}

function returnconform(event) {
    var key = $(event).val();
    var nkey=key.toLowerCase();
    searchRetunconfFiles(nkey);
}
/*
 * $('input[type=text]', '#Anwserid').each(function() {
 mulq=$(this).val();
 });
 *
 */

function searchFiles(keyword){
    
	if(keyword == ''){
        $('.Cc_list').show();
	}else{
		
		//alert('ddd')
		$('.Cc_list').each(function(){
                           var fname = $(this).attr('add');
                           // alert(fname)
                           var nfname=fname.toLowerCase();
                           var n=nfname.indexOf(""+keyword+"");
                           
                           if(n >=0){
                           
                           
                           $(this).show();
                           }else{
                           $(this).hide();
                           }
                           
                           });
        
	}
    
}


function searchReportFiles(keyword) {
	if(keyword == ''){
        $('.repostlist').show();
	}else{
		
		//alert('ddd')
		$('.repostlist').each(function(){
                              var fname = $(this).attr('add');
                              // alert(fname)
                              var nfname=fname.toLowerCase();
                              var n=nfname.indexOf(""+keyword+"");
                              
                              if(n >=0){
                              
                              
                              $(this).show();
                              }else{
                              $(this).hide();
                              }
                              
                              });
        
	}
    
}



function searchRepoDetailsFiles(keyword){
	if(keyword == ''){
        $('.re_detail_li').show();
	}else{
		
		//alert('ddd')
		$('.re_detail_li').each(function(){
                                var fname = $(this).attr('add');
                                // alert(fname)
                                var nfname=fname.toLowerCase();
                                var n=nfname.indexOf(""+keyword+"");
                                
                                if(n >=0){
                                
                                
                                $(this).show();
                                }else{
                                $(this).hide();
                                }
                                
                                });
        
	}
	
}

function searchRetunlistFiles(keyword) {
	if(keyword == ''){
        $('.returnlist').show();
	}else{
		
		//alert('ddd')
		$('.returnlist').each(function(){
                              var fname = $(this).attr('add');
                              // alert(fname)
                              var nfname=fname.toLowerCase();
                              var n=nfname.indexOf(""+keyword+"");
                              
                              if(n >=0){
                              
                              
                              $(this).show();
                              }else{
                              $(this).hide();
                              }
                              
                              });
        
	}
}


function searchRetunconfFiles(keyword) {
	//code
	if(keyword == ''){
        $('.returnconfmlist').show();
	}else{
		
		//alert('ddd')
		$('.returnconfmlist').each(function(){
                                   var fname = $(this).attr('add');
                                   // alert(fname)
                                   var nfname=fname.toLowerCase();
                                   var n=nfname.indexOf(""+keyword+"");
                                   
                                   if(n >=0){
                                   
                                   
                                   $(this).show();
                                   }else{
                                   $(this).hide();
                                   }
                                   
                                   });
        
	}
}

function gotoCReditMempage(){
/*
 *var cus_name='';
var cus_id='';
var caddress='';
 */


//alert(caddress)

    var html='<div class="Overview_text">Document Overview</div>'
        html+='<div class="text1">Bill to Customer Address</div>'
        html+='<div class="text2"><h1>'+cus_id+'-'+cus_name+'</h1> <h2>'+caddress+'</h2></div>'
        html+='<div class="text3">Ship to Address</div>'
        html+='<div class="text4">'+caddress+'</div>'
	$('#cus_ship_add').html(html).trigger('create');
    
    var thml1=''
    thml1+='<div class="text5" style="border-left:none;"><h1 style=" height:24px;" class="texth1"></h1> <h2 style=" height:20px; background:none; border-bottom:none" class="texth2"></h2></div>'
    thml1+='<div class="text5"><h1>Item</h1> <h2>It 78-343</h2></div>'
    thml1+='<div class="text5"><h1>Descrption</h1> <h2>Soft Paper t...</h2></div>'
    thml1+='<div class="text5"><h1>Reason</h1> <h2 style="background:#fff;">do not need</h2></div>'
    thml1+='<div class="text5"><h1>COOOOO1</h1> <h2>5</h2></div>'
    thml1+='<div class="text5"><h1>Returning</h1> <h2>3</h2></div>'
    thml1+='<div class="text5"><h1>Quantity</h1> <h2 style="background:#fff;">3</h2></div>'
    thml1+='<div class="text5"><h1>UOM</h1> <h2>Each</h2></div>'
    thml1+='<div class="text5"><h1>Price</h1> <h2 style="background:#fff;">$14,00</h2></div>'
    thml1+='<div class="text5"><h1>Total</h1> <h2>$14,00</h2></div>'
    thml1+='<div class="text6" style="border-right:none;"><h1>Tax</h1> <h2 style="background:#fff;">Non</h2></div>'
    thml1+='<div class="total_text">Total: $42,00</div>'

}

function gotoHome() {
	
	//alert('ok');
	$.mobile.changePage('home')
	//code
}