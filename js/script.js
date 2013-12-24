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
var invoiceArray=[];
var itemcourntArray=[];
var tryit='false'
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
    //alert('ok')
    
	local_login();
    console.log('dreay')
    $.mobile.defaultTransition = 'none';
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    
}
};

function onBackKeyDown() {
    if ($.mobile.activePage[0].id=='homePage' ){
        // navigator.app.exitApp();
    }
    else if($.mobile.activePage[0].id=='loign'){
        navigator.app.exitApp();
    }
    else{
        history.back();
    }
}
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
    //createDatabase();
                    $.mobile.defaultPageTransition = "none"
                    $.mobile.defaultDialogTransition = 'none';
                    $.mobile.useFastClick = true;
                    $.mobile.touchOverflowEnabled = true;
		    
		    
		    $("#justretuncnfid").on("click", function(){
			if(tryit=='true'){
			     gotoReturnconfrm_local()
			}
			else{
			    gotoReturnconfrm()
			}
                      //console.log("Clicked");
                         });
		    
		      $("#gotoCreditmemoid").on("click", function(){
			if(tryit=='true'){
			     gotoCreditmemo_local()
			}
			else{
			    gotoCreditmemo()
			}
                      //console.log("Clicked");
                         });
		       $("#customerInvoReturnsid").on("click", function(){
			if(tryit=='true'){
			     customerInvoReturns_local()
			}
			else{
			    customerInvoReturns()
			}
                      //console.log("Clicked");
                         });
		    
		      $("#justRetuncnf_summitid").on("click", function(){
			if(tryit=='true'){
			     justRetuncnf_summit_local()
			}
			else{
			    justRetuncnf_summit()
			}
                      //console.log("Clicked");
                         });
                    });


function gotoHomepage(){
             if(tryit=='true'){
			    $.mobile.changePage('#loign')
			}
			else{
			   $.mobile.changePage('#homePage')
			}
    
}


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
var usr_name='';
var user_pwd='';
//---------------getcustomer ---------------------
function getCustomer(){
    //$.mobile.changePage('#Customers')
    
    
    var uname= window.localStorage.getItem("sale_repId");
    var pwd=window.localStorage.getItem("password");
    usr_name=uname;
    user_pwd=pwd;
    var uname1="'"+uname+"'";
    var pwd1="'"+pwd+"'";
    var Rem_me=$('#flip-1').val();
    
    var url2="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection?$filter=sales_rep_id eq "+uname1+" and password eq "+pwd1+" &$format=json"
    console.log()
    var url2="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS_SRV/CustomersCollection?$filter=SalesRepId eq 'demo' and Password eq 'demo123' &$format=json";
    $.mobile.showPageLoadingMsg();
    $.ajax({
           url: url2,
           dataType: 'json',
           success: function(data, status) {
           $.mobile.hidePageLoadingMsg();
           console.log(JSON.stringify(data))
           var res=eval(data);
           // alert(res.d.results[0].__metadata.uri)
          // window.localStorage.setItem('ldata',JSON.stringify(data))
           var html='';
	   // insertValue('Customerlist','jsondata','"'+res+'"');
           for(var i=0;i<res.d.results.length;i++){
           var data1=res.d.results[i]
           var c_id=data1.CustNum.toString();
           var adds=data1.Street+','+data1.City+','+data1.Country+','+data1.Telephone;
           var c_id2=c_id.toString();
           var searcdata=data1.CustName+c_id;
           html+='<li class="Cc_list" data-c_id='+c_id2+' data-cusname="'+data1.CustName+'"  data-adds="'+adds+'" onclick="CutomerInvoice(this)" style="none" add="'+searcdata+'"><div class="ui-block-a" ><a href="#" ><span>'+data1.CustNum+'</span></a>'
           html+='<strong>'+res.d.results[i].CustName+'</strong>'
           html+='<div class="Garfield_text">'+data1.Street+'<br /> '+data1.City+', '+data1.Country+'  '+data1.Telephone+'</div>'
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
    console.log('ldata------------------------------------------------')
    //console.log(window.localStorage.getItem('ldata'))
    console.log('ldata------------------------------------------------')
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
	    window.localStorage.setItem('invoice_detailsCollection',JSON.stringify(data))
           var res=eval(data);
           invoiceArray=[];
           itemcourntArray=[];
           if(res.d.results.length>0){
           /*
            alert(res.d.results[0].cust_name)
            
            alert(CustomerNameArray.length);
            alert(CustomerNameArray.indexOf(res.d.results[0].cust_name));
            */
           
           var html='';
           var c_idthml='Customer ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+res.d.results[0].cust_id;
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
           invoiceArray.push(data1.invoice_num);
           itemcourntArray.push(data1.item_count);
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
           var mon1=mon+1
           fuldate=det1+'/'+mon1+'/'+yr;
           //alert(data1.invoice_item)
           //  alert(parseInt(data1.invoice_item))
		   var sdata=data1.invoice_item+data1.item_name;
           html+='<li class="returnlist" add="'+sdata+'"> <div class="ui-block-a"><div class="Createtop"><span>'+data1.units+'</span></div>'
           html+='<strong>'+Number(data1.invoice_item)+'</strong><strong>'+data1.item_name+'</strong>'
           // html+='<strong>'+data1.invoice_item+'</strong><strong>'+Number(data1.quantity)+' items</strong>'
           // html+='<div id="poor_quality_text"><div id="textinput"><input type="Number" vlaue="3"/></div><div id="selecttextbox"><select name="" class="selecttext"></select></div></div></div>';
           html+='<div class="poor_quality_text4"><div id="textinput"><select name="" class="selecttext">'+ht+'</select></div><div class="selecttextbox"><select name="" class="selecttext">'+ht1+'</select></div></div></div></li>';
           }
           // alert(cid);
           //alert(cname);
           //var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Invoice #</h1>'+data1.invoice_number+'</div>'
           var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Invoice Date </h1>'+fuldate+'</div>'
	   
	    var hm='<div class="customer_boderright">'
			    hm+='<div class="Barnes_text" style="width:100% !important;"><h1>Customer ID</h1><span>'+cid+'</span></div>'
			    hm+='<div class="Barnes_text" style="width:100% !important;"><h1 style=" width:38% !important;">Customer name</h1>'+cname+'</div>'
			    hm+='</div>'
			    hm+='<div class="customer_boderright1">'
			    hm+='<div class="invoice_text" style="width:100% !important;"><h1>Returns order #</h1>'+data1.invoice_number+'</div>'
			    hm+='<div class="invoice_text" style="width:100% !important;"><h1>Invoice Date </h1>'+fuldate+'</div></div>'
			    hm+='</div>'
	   
           $('#invoice_detaila').html(html).trigger('create');
           $('#in_c_id').html(hm).trigger('create');
          // $('#in_c_name').html(html1)
           $.mobile.changePage('#returns_creen')
           },
           
           beforeSend: function(xhrObj){
           xhrObj.setRequestHeader('Authorization', make_base_auth(uname,pwd));
           
           },
           error:function(error){
           console.log(error);
           $.mobile.hidePageLoadingMsg();
           
           navigator.notification.alert( 'something went wrong', alertDismissed,  'AwardReturns', 'ok');
           
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
    
}

var just_mat_num=[];
var just_mat_Retq=[];
var just_mat_Res=[];
var just_mat_con=[];
var just_mat_desc=[];
var just_mat_price=[];

function justRe_cnf(){
    just_mat_num=[];
    just_mat_Retq=[];
    just_mat_Res=[];
    just_mat_con=[];
    just_mat_desc=[];
    just_mat_price=[];
    
    $(".Mat_optn select").each(function() {
                               //alert($(this).val());
                               var data=$(this).val();
                               if (data.indexOf('s---t') !=-1) {
                               var data1=data.split('s---t')
                               just_mat_num.push(data1[0]);
                               just_mat_desc.push(data1[1]);
                               just_mat_price.push(data1[2]);
                               }
                               else{
                               just_mat_num.push($(this).val())
                               just_mat_desc.push('');
                               just_mat_price.push('');
                               }
                               
                               
                               });
    $(".Mat_text input").each(function() {
                              if($(this).val()==''){
                              var velue=0;
                              }
                              else{
                              var velue=$(this).val()
                              }
                              just_mat_Retq.push(velue)
                              });
    $(".Mat_reson select").each(function() {
                                //alert($(this).val())
                                just_mat_Res.push($(this).val())
                                //alert(just_mat_Res.length)
                                });
    $(".Mat_cond select").each(function() {
                               just_mat_con.push($(this).val())
                               });
    var html='';
    for (var i=0;i<just_mat_con.length;i++) {
        html+='<li><div class="ui-block-a">'
        html+='<div class="Createtop"><span>EA</span></div>'
        html+='<div class="textinputtestext">'+just_mat_num[i]+'</div>'
        html+='<div class="textinputtestext">'+just_mat_Retq[i]+' items</div>'
        html+='<div class="textinputtestext">'+just_mat_Res[i]+'</div>'
        html+='<div class="textinputtestext">'+just_mat_con[i]+'</div></div></li>'
    }
    
    
    $('#just_retn_cfnlist').html(html)
	
	$('#just_cid_cnf').html(cus_id);
	$('#just_cname_cnf').html('<h1>Customer name</h1>'+cus_name);
	$('#Ret_pop_up').hide();
  $('#cnf_btn').show();

    $.mobile.changePage('#jsut_returns_creen_cnf');
    //$('#jsut_returns_creen_cnf').html()
}

function justRetuncnf_summit(){
    $.mobile.showPageLoadingMsg();
    
    var date1=new Date();
    var date0=date1.toISOString()
    var date2=date0.toString();
    var date3=  date2.substring( 0, date2.length-5);
    var date4=  date2.substring( 0, date2.length-14);
    //alert(date4)
    $('#memodate').html(date4);
	/*
     var just_mat_num=[];
     var just_mat_Retq=[];
     var just_mat_Res=[];
     var just_mat_con=[];
     */
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
   // for(var i=0;i<just_mat_num.length;i++){
        Rbody+='<d:OrdReason>'+just_mat_Res[0]+'</d:OrdReason>'
    //}
    Rbody+='<d:PartnNumb>'+cus_id+'</d:PartnNumb>'
    Rbody+='</m:properties>'
    Rbody+='</atom:content>'
    Rbody+='<atom:link '
    Rbody+='rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/SOItems" '
    Rbody+='type="application/atom+xml;type=feed" '
    Rbody+='title="SALESORDER.SOHeader_SOItems">'
    Rbody+='<m:inline>'
    Rbody+='<atom:feed>'
    //-----------------------------------------------
	for(var i=0;i<just_mat_num.length;i++){
          var j=i+1;
	    var j1=j+'0';
	   console.log(j1+'-----------')
        Rbody+='<atom:entry>'
        Rbody+='<atom:content type="application/xml">'
        Rbody+='<m:properties>'
        Rbody+='<d:ItmNumber>0000'+j1+'</d:ItmNumber>'
        Rbody+='<d:Material>'+just_mat_num[i]+'</d:Material>'//found
        Rbody+='<d:Plant>1000</d:Plant>'
        Rbody+='<d:StoreLoc>1000</d:StoreLoc>'
        Rbody+='<d:TargetQty>'+just_mat_Retq[i]+'</d:TargetQty>'//found
        Rbody+='<d:TargetQu>EA</d:TargetQu>'
        Rbody+='<d:ShortText>'+just_mat_desc[i]+'</d:ShortText>'//found
        Rbody+='<d:MatlGroup>50200000</d:MatlGroup>'
        Rbody+='<d:CondStNo>011</d:CondStNo>'
        Rbody+='<d:CondCount>01</d:CondCount>'
        Rbody+='<d:CondType>PR00</d:CondType>'
        Rbody+='<d:CondValue>'+just_mat_price[i]+'</d:CondValue>'
        Rbody+='<d:Currency>USD</d:Currency>'
        Rbody+='<d:ReqDate>'+date3+'</d:ReqDate>'
        Rbody+='<d:ReqQty>'+just_mat_Retq[i]+'</d:ReqQty>'
        Rbody+='</m:properties>'
        Rbody+='</atom:content>'
        Rbody+='</atom:entry>'
        
	}
	//console.log(just_mat_price)
    //-----------------------------------------------------------------------
    
    
    //--------------------------------------------------------------
    Rbody+='</atom:feed>'
    Rbody+='</m:inline>'
    Rbody+='</atom:link>'
    Rbody+='</atom:entry>'
    
    console.log(Rbody)
    
    
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
            
            
            
            var auth = make_base_auth(usr_name,user_pwd);
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
		   if(req1.responseText=='CSRF token validation failed'){
		    navigator.notification.alert('CSRF token error', alertDismissed, 'AwardReturns', 'ok' );
		   }
                    $.mobile.hidePageLoadingMsg();
                    
                    console.log("-----------here now--------------------------------------------------------");
                    console.log(req1.responseText);
                    xmlDoc = $.parseXML( req1.responseText ),
                    $xml = $( xmlDoc ),
                    $title = $xml.find( "OrderId" );
                    $ref = $xml.find( "RefDoc" );
                    // alert($ref.text())
                    var oid=$title.text()
                   //  gotoCReditMempage_jsut()
                    console.log("-----------here now----------------------------------------------------------");
                    if($title.text()  !=''){
                        $('#retunOrderid_memo').html('<h1 >Return Order</h1>'+$title.text()+'</div>')
                        $.mobile.changePage('#Credit_memo')
                        
                        gotoCReditMempage_jsut()
                    }
                    else{
                        alert('something went wrong');
                    }
                }
                
            }
            req1.send(Rbody);
            
        }
    }
    req.send();
    
    
}

var new_mat='';
function addnewRow(){
	var thml='';
    var option1='<option>DAMAGED IN TRANSIT</option><option>MATERIAL RUINED</option><option>POOR QUALITY</option><option>WRONG MATERIAL</option>'
	var option2='<option>GOODS IN DAMAGED CONDITION</option><option>GOODS RETURNED WITH LOSS IN WEIGHT</option><option>RETURNED WRONG ITEM</option>'
	thml+='<li><div class="ui-block-a"><div class="Createtop"><span>EA</span></div><div class="textinputtes_new Mat_optn"><select name="" class="selecttext">'+new_mat+'</select></div><div class="textinput_new Mat_text"><input type="Number" vlaue="3"/></div>'
	thml+='<div class="poor_quality_text"><div class="textinputtes Mat_reson"><select name="" class="selecttext">'+option1+'</select></div><div class="selecttextbox Mat_cond"><select name=""  class="selecttext">'+option2+'</select></div></div></div></li>'
	
	$('#invoice_just_re_html').append(thml).trigger('create');
}


 
var materialnumArray=[];
var materialDescArray=[];
var materialBarcodeArray=[];
var materialnum_desc=[];
var materialPriceArray=[];
function customerInvoReturns(){
	
        materialPriceArray=[];
        materialnumArray=[];
        materialDescArray=[];
        materialBarcodeArray=[];
        materialnum_desc=[];
    var uname= window.localStorage.getItem("sale_repId");
    var pwd=window.localStorage.getItem("password");
    var url="http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection";
    
    $.mobile.showPageLoadingMsg();
    $.ajax({
           url:url,
           dataType: 'json',
           success: function(data, status) {
           $.mobile.hidePageLoadingMsg();
           console.log(JSON.stringify(data))
           var res=eval(data);
           //alert('suc')
           var option1='<option>DAMAGED IN TRANSIT</option><option>MATERIAL RUINED</option><option>POOR QUALITY</option><option>WRONG MATERIAL</option>'
           var option2='<option>GOODS IN DAMAGED CONDITION</option><option>GOODS RETURNED WITH LOSS IN WEIGHT</option><option>RETURNED WRONG ITEM</option>'
           var thml='';
           var Mnum_option=''
           for(var i=0;i<res.d.results.length;i++){
           var data1=res.d.results[i]
           var opval=data1.MaterialNum+'s---t'+data1.MaterialDesc+'s---t'+data1.Price;
           Mnum_option+= '<option value="'+opval+'" data-va="'+data1.MaterialDesc+'">'+data1.MaterialNum+'</option>'
           materialnumArray.push(data1.MaterialNum);
           materialDescArray.push(data1.MaterialDesc);
           materialBarcodeArray.push(data1.Barcode.toString());
           materialnum_desc.push(opval);
           }
           new_mat=Mnum_option;
           thml+='<li><div class="ui-block-a"><div class="Createtop"><span>EA</span></div><div class="textinputtes_new Mat_optn"><select name=""  class="selecttext">'+Mnum_option+'</select></div><div class="textinput_new Mat_text"><input type="Number" vlaue="3"/></div>'
           thml+='<div class="poor_quality_text"><div class="textinputtes Mat_reson" ><select name="" class="selecttext">'+option1+'</select></div><div class="selecttextbox Mat_cond"><select name=""        class="selecttext">'+option2+'</select></div></div></div></li>'
           
           $('#just_cid').html(cus_id);
           $('#just_cname').html('<h1>Customer name</h1>'+cus_name);
           $('#invoice_just_re_html').html(thml).trigger('create')
           $.mobile.changePage('#jsut_returns_creen');
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
	
	
	
	/*
     
     
     
     selectedInvoice=[];
     //	invoiceArray=[];
     //var itemcourntArray=[]
     var thml='';
     var option1='<option>DAMAGED IN TRANSIT</option><option>MATERIAL RUINED</option><option>POOR QUALITY</option><option>WRONG MATERIAL</option>'
     var option2='<option>GOODS IN DAMAGED CONDITION</option><option>GOODS RETURNED WITH LOSS IN WEIGHT</option><option>RETURNED WRONG ITEM</option>'
     
	 
     for(var i=0;i<1;i++){
     // for(var i=0;i<invoiceArray.length;i++){
     
	 thml+='<li><div class="ui-block-a"><div class="Createtop"><span>EA</span></div><div class="textinputtes_new"><select name="" class="selecttext"></select></div><div class="textinput_new"><input type="Number" vlaue="3"/></div>'
     thml+='<div class="poor_quality_text"><div class="textinputtes"><select name="" class="selecttext">'+option1+'</select></div><div class="selecttextbox"><select name=""        class="selecttext">'+option2+'</select></div></div></div></li>'
     
     
     }
     $('#just_cid').html(cus_id);
     $('#just_cname').html('<h1>Customer name</h1>'+cus_name);
     $('#invoice_just_re_html').html(thml).trigger('create')
     
     
     // $.mobile.changePage('#jsut_returns_creen');
     //alert('ok1')
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
	   var mon1=mon+1;
           var det1 = dt.getDate();
           fuldate=det1+'/'+mon1+'/'+yr;
		   itemNumArray.push(data1.invoice_item)
		   priceArray.push(data1.price)
		   QuantityArray.push(data1.quantity)
		   materialArray.push(data1.material)
		   itemNameArray.push(data1.item_name)
		   serdata=data1.material+data1.item_name;
           html+='<li class="returnconfmlist" add="'+serdata+'"> <div class="ui-block-a"><div class="Createtop"><span>'+Number(data1.invoice_item)+'</span></div>'
           html+='<strong>'+data1.item_name+'</strong>';
           //   html+='<div class="Garfield_text"><h1>'+data1.material+'</h1><h2>'+data1.item_name+'</h2></div>';
           html+='<div class="Garfield_text"><h1>'+data1.material+'</h1><h2>'+Number(data1.quantity)+' items</h2></div>';
           html+='<div class="poor_quality_text5"><div id="textinput"><input type="Number" data-line_ndex='+i+' onkeyup="checkqutity(this)"/></div><div id="selecttextbox"><select name="" class="selecttext">'+ht+'</select></div></div></div>';
         
           }
           //<div class="Garfield_text"><h1>P500020</h1><h2>6 items</h2></div><div class="poor_quality_text"><span>3</span><h1>Poor Quality</h1></div></div>
           //alert(cname);
           var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Invoice #</h1>'+data1.invoice_number+'</div>'
           var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Invoice Date </h1>'+fuldate+'</div>'
	   var html7='<div class="Barnes_textts" style="width:100% !important;"><h1>Customer ID</h1><span>'+cid+'</span></div>'
	       html7+='<div class="Barnes_textts" style="width:100% !important;"><h1>Customer name</h1>'+cname+'</div>';
	       
	    var html8='<div class="Barnes_textts" style="width:100% !important;"><h1>Returns order #</h1>'+data1.invoice_number+'</div>'
	       html8 +='<div class="Barnes_textts" style="width:100% !important;"><h1>Invoice Date </h1>'+fuldate+'</div></div>';
           $('#invoice_detaila_return').html(html).trigger('create');
           //// alert('ok');
           $('#cusname_id').html(html7).trigger('create');
           $('#Reorder_date').html(html8).trigger('create');
	    $('#cusname_id_cnf').html(html7).trigger('create');
           $('#Reorder_date_cnf').html(html8).trigger('create');
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

 function opencnfpopup(){
  $('#Ret_pop_up').show();
  $('#cnf_btn').hide();
 }

function hidePopup(){
$('#Ret_pop_up').hide();
  $('#cnf_btn').show();
}

function  checkqutity(ev){
 
    var value=$(ev).val();
    var ques=Number(QuantityArray[$(ev).data('line_ndex')])
    if(value>ques){
	alert('Your have entered wrong quantity')
	$(ev).val('')
    }
    else{
	//alert('less')
    }
    
}

function showjustRetPopup(){
      $('#just_return_popup').show();
      $('#just_returncnf_btn').hide();
}
function canceljustret(){
     $('#just_return_popup').hide();
      $('#just_returncnf_btn').show();
}

function gotoConform(){
 $.mobile.showPageLoadingMsg();
	noofItem=[];
	R_Reason=[];
	$('input[type=Number]', '#invoice_detaila_return').each(function() {
                                                          
                                                            var val1=$(this).val();
                                                            if(val1==''){
                                                            var val2=0;
                                                            }
                                                            else{
                                                            var val2=parseInt(val1)
                                                            }
                                                            noofItem.push(val2)
                                                            
                                                            })
    
    if(noofItem.length==0){
        alert('please Enter no of item for return ')
    }
    else{
        $('select', '#invoice_detaila_return').each(function() {
                                                    // alert($(this).val())
                                                    //  var val1=$(this).val();
                                                    R_Reason.push($(this).val())
                                                    })
	    }
//
 var html='';
     for(var i=0;i<itemNumArray.length;i++){
         html+='<li><div class="ui-block-a"><div class="Createtop"><span>'+Number(itemNumArray[i])+'</span></div><strong>'+itemNameArray[i]+'</strong><div class="Garfield_text"><h1>'+materialArray[i]+'</h1><h2>'+Number(QuantityArray[i])+' items</h2></div><div           class="poor_quality_text"><span>'+noofItem[i]+'</span><h1>'+R_Reason[i]+'</h1></div></div></li>'
   }
 $('#confrm_listview').html(html);
 $('#Ret_pop_up').hide();
  $('#cnf_btn').show();
$.mobile.changePage('#Returns_confirmation_screen3')
}

function gotoCreditmemo() {
	 
    $.mobile.showPageLoadingMsg();
	noofItem=[];
	R_Reason=[];
	$('input[type=Number]', '#invoice_detaila_return').each(function() {
                                                          
                                                            var val1=$(this).val();
                                                            if(val1==''){
                                                            var val2=0;
                                                            }
                                                            else{
                                                            var val2=parseInt(val1)
                                                            }
                                                            noofItem.push(val2)
                                                            
                                                            })
    //    alert(noofItem.length)
    //alert(QuantityArray[0]);
    //alert(noofItem[0])
    
    
    
    
    if(noofItem.length==0){
        alert('please Enter no of item for return ')
    }
    else{
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
        
        var date1=new Date();
        var date0=date1.toISOString()
        var date2=date0.toString();
        var date3=  date2.substring( 0, date2.length-5);
        var date4=  date2.substring( 0, date2.length-14);
        //alert(date3)
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
        Rbody+='<d:PartnNumb>'+cus_id+'</d:PartnNumb>'
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
            Rbody+='<d:ReqDate>'+date3+'</d:ReqDate>'
            Rbody+='<d:ReqQty>'+noofItem[i]+'</d:ReqQty>'
            Rbody+='</m:properties>'
            Rbody+='</atom:content>'
            Rbody+='</atom:entry>'
            
        }
        //-----------------------end1-------------------------------
        Rbody+='</atom:feed>'
        Rbody+='</m:inline>'
        Rbody+='</atom:link>'
        Rbody+='</atom:entry>'
        
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
                
                
                var auth = make_base_auth(usr_name,user_pwd);
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
                        // alert(req1.responseText);
                        $.mobile.hidePageLoadingMsg();
                         if(req1.responseText=='CSRF token validation failed'){
		    navigator.notification.alert('CSRF token error', alertDismissed, 'AwardReturns', 'ok' );
		   }
                        console.log("-----------here now--------------------------------------------------------");
                        console.log(req1.responseText);
                        xmlDoc = $.parseXML( req1.responseText ),
                        $xml = $( xmlDoc ),
                        $title = $xml.find( "OrderId" );
                        $ref = $xml.find( "RefDoc" );
                        //alert($ref.text())
                        var oid=$title.text()
                        var res = oid.substring(oid.length-10,oid.length);
                        // alert(res);
                        $('#retunOrderid_memo').html('<h1 >Return Order</h1>'+res+'</div>')
                        $('#memo_refno').html($ref.text())
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
        
    }//end else
    
    
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
           var montheArray=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
           for(var i=0;i<res.d.results.length;i++){
           var data1=res.d.results[i]
           var str = data1.ReturnDate
	   if(str==null || str==''){
	     var yr=0
           var mon=0
           var det1 = 0
           var mon1=0
           var deate=det1+'/'+mon1+'/'+yr;
	   }
	   else{
	   console.log( data1.ReturnDate)
           var ress = str.slice(6,str.length-2);
           // alert(ress)
           var ress1=parseInt(ress)
           // alert(ress1)
           var dt=new Date(ress1);
           var yr=dt.getFullYear();
           var mon=dt.getMonth();
           var det1 = dt.getDate();
           var mon1=mon+1
           var deate=det1+'/'+mon1+'/'+yr;
	   }
           var c_name=data1.CustomerName;
           var c_re_order=data1.ReturnOrder;
           var c_invoice_no=data1.InvoiceNumber;
           var c_date=data1.ReturnDate;
           // alert(c_re_order)
           //  var monthdt=
           var serReport=c_invoice_no+c_name+c_re_order;
           html+='<li class="repostlist" add="'+serReport+'"><div class="ui-block-a" data-rid='+c_re_order+' data-date1='+deate+' data-cname="'+c_name+'"      onclick="getRetrunOrderDetails(this);"><a href="#"><div class="Createtop1"><span style="width:100% !important;">'+det1+'</span><h1>'+montheArray[mon]+'/'+yr+'</h1></div></a>'
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
           var i_num=Number(data1.ItemNumber);
           html+='<li class="re_detail_li" add="'+data1.ItemName+'"><div class="ui-block-a"><div class="Createtop"><span>'+i_num+'</span></div>'
           //html+='<strong>Air Tubs</strong>';
           html+='<div class="Garfield_text" style="border-right:none !important"><h1>'+data1.MaterialDesc+'</h1></div>';
		  html+='<div class="Garfield_text"><h1>'+data1.ItemName+'</h1></div>';
           html+='<div class="poor_quality_text"><span>'+Number(data1.ReturnQuantity)+'</span><h1>'+data1.ReturnReason+'</h1></div></div></li>';
           var ccid=data1.CustomerNumber
           }
           
           var c_idthml='<div class="Barnes_text"><h1>Customer ID</h1><span>'+ccid+'</span></div><div class="invoice_text"><h1>Return order #</h1>'+r_id+'</div>'
           var c_namehtml='<div class="Barnes_text"><h1>Customer name</h1>'+c_name+'</div><div class="invoice_text"><h1>Invoice date </h1>'+c_date+'</div>';
           /*  <div class="custo_text" id="returnDetailHead1"><div class="Barnes_text"><h1>Customer ID</h1><span>42</span></div><div class="invoice_text"><h1>Invoice #</h1> 90000090</div></div>
            <div class="custo_text1" id="returnDetailHead1"><div class="Barnes_text"><h1>Customer name</h1>Barnes Plumbing Co</div><div class="invoice_text"><h1>Date </h1>8/25/2013</div></div>*/
        var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Invoice Date </h1>'+c_date+'</div>'
	   
	    var hm='<div class="customer_boderright">'
			    hm+='<div class="Barnes_text" style="width:100% !important;"><h1>Customer ID</h1><span>'+ccid+'</span></div>'
			    hm+='<div class="Barnes_text" style="width:100% !important;"><h1 style=" width:38% !important;">Customer name</h1>'+c_name+'</div>'
			    hm+='</div>'
			    hm+='<div class="customer_boderright1">'
			    hm+='<div class="invoice_text" style="width:100% !important;"><h1>Returns order #</h1>'+r_id+'</div>'
			    hm+='<div class="invoice_text" style="width:100% !important;"><h1>Date </h1>'+c_date+'</div></div>'
			    hm+='</div>'
           $('#ret_list_head').html(hm).trigger('create');
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
function gotoCReditMempage_jsut(){
    
    var tott=0;
    var toalPriceArray1=[];
    for (var i=0;i<just_mat_price.length;i++) {
        tott=parseInt(just_mat_price[i])*parseInt(just_mat_Retq[i]);
        toalPriceArray1.push(tott)
    }
   
    var total2 = 0;
    $.each(toalPriceArray1,function() {
           total2 += this;
           });
   //alert(total2)
    //alert(just_mat_Res.length);
    var html='<div class="Overview_text">Document Overview</div>'
    html+='<div class="text1">Bill to Customer Address</div>'
    html+='<div class="text2"><h1>'+cus_id+'-'+cus_name+'</h1> <h2>'+caddress+'</h2></div>'
    html+='<div class="text3">Ship to Address</div>'
    html+='<div class="text4">'+caddress+'</div>'
	$('#cus_ship_add').html(html).trigger('create');
    var total=parseInt(priceArray[0])*parseInt(noofItem[0]);
    var thml1='';
    
      var thml1='';
		       
		        thml1+='<div class="Over_text_box">'
		          thml1+='<div class="memoheading">Item</div>'
			     thml1+='<div class="memoheading_dec">Description</div>'
			      thml1+='<div class="memoheading_dec1">Reason</div>'
			       thml1+='<div class="memoheading_dec">Returning</div>'
			       
				 thml1+='<div class="memoheading">UOM</div>'
				  thml1+='<div class="memoheading">Price</div>'
				   thml1+='<div class="memoheading">Total</div>'
				    thml1+='<div class="memoheading_tax">Tax</div>'
				      thml1+='</div>'
			for(var i=0;i<just_mat_Res.length;i++){
			     thml1+='<div class="memoheading_detail">'+just_mat_num[i]+'</div>'
			     thml1+='<div class="memoheading_dec_detail">'+just_mat_num[i]+'</div>'
			     thml1+='<div class="memoheading_dec_detail1_Reasontext">'+just_mat_Res[i]+'</div>'
			     thml1+='<div class="memoheading_dec_detail">'+just_mat_Retq[i]+'</div>'
			     
			      thml1+='<div class="memoheading_detail">Each</div>'
			       thml1+='<div class="memoheading_detail_text1">'+just_mat_price[i]+'</div>'
			        thml1+='<div class="memoheading_detail">$'+toalPriceArray1[i]+'</div>'
				thml1+='<div class="memoheading_tax_detail_text2">Non</div>'
				      thml1+='</div>'
			}
    
    
    /*
    thml1+='<div style="width: 100%"><div class="demo1">Item</div><div class="demo2">Description</div></div>'
    for(var i=0;i<just_mat_Res.length;i++){
        //alert(just_mat_price[i])
        thml1+='<div style="width: 100%"><div class="demo3">'+just_mat_num[i]+'</div><div class="demo4">'+just_mat_num[i]+'</div></div>'
    }
    thml1+='<div style="width: 100%"><div class="demo1">Returning</div><div class="demo2">Reason</div></div>'
    for(var i=0;i<just_mat_Res.length;i++){
        thml1+='<div style="width: 100%"><div class="demo3">'+just_mat_Retq[i]+'</div><div class="demo4">'+just_mat_Res[i]+'</div></div>'
    }
          thml1+='<div style="width: 100%"><div class="demo1">Quantity</div><div class="demo2">Returning</div></div>'
     
           for(var i=0;i<just_mat_Res.length;i++){
             thml1+='<div style="width: 100%"><div class="demo3">5</div><div class="demo4">'+just_mat_Retq[i]+'</div></div>'
           }
       
    thml1+='<div style="width: 100%"><div class="demo1">UOM</div><div class="demo2">Price</div></div>'
    for(var i=0;i<just_mat_Res.length;i++){
        thml1+='<div style="width: 100%"><div class="demo3">Each</div><div class="demo4">$'+just_mat_price[i]+'</div></div>'
    }
    thml1+='<div style="width: 100%"><div class="demo1">Total</div><div class="demo2">Tax</div></div>'
    for(var i=0;i<just_mat_Res.length;i++){
        thml1+='<div style="width: 100%"><div class="demo3">$'+toalPriceArray1[i]+'</div><div class="demo4">Nan</div></div>'
    }
    */
    var htm='Total: $'+total2;
    //alert(total2)
    $('#g_total').html(htm)
    $('#g_total1').html(htm)
         $('#memo_details').html(thml1).trigger('create');
                       
                       
                       }
     function gotoCReditMempage(){
	
    /*
     
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
     var invoiceArray=[];
     var itemcourntArray=[];
     */
                       var tott=0;
                       var toalPriceArray=[];
                       for (var i=0;i<priceArray.length;i++) {
                       tott=parseInt(priceArray[i])*parseInt(noofItem[i]);
                       toalPriceArray.push(tott)
                       }
                       var tott=0;
                       var total = 0;
                       $.each(toalPriceArray,function() {
                              total += this;
                              });
                       //alert(total)
                       $('#g_total').html('Total: $'+total)
		       $('#g_total1').html('Total: $'+total)
                       var date1=new Date();
                       var date0=date1.toISOString()
                       var date2=date0.toString();
                       var date3=  date2.substring( 0, date2.length-5);
                       var date4=  date2.substring( 0, date2.length-14);
                       //alert(date4)
                       $('#memodate').html(date4);
                       //alert(itemNumArray.length)
                       
                       var html='<div class="Overview_text">Document Overview</div>'
                       html+='<div class="text1">Bill to Customer Address</div>'
                       html+='<div class="text2"><h1>'+cus_id+'-'+cus_name+'</h1> <h2>'+caddress+'</h2></div>'
                       html+='<div class="text3">Ship to Address</div>'
                       html+='<div class="text4">'+caddress+'</div>'
                       $('#cus_ship_add').html(html).trigger('create');
                       var total=parseInt(priceArray[0])*parseInt(noofItem[0]);
                       var thml1='';
		       
		        thml1+='<div class="Over_text_box">'
		          thml1+='<div class="memoheading">Item</div>'
			     thml1+='<div class="memoheading_dec">Description</div>'
			      thml1+='<div class="memoheading_dec">Reason</div>'
			       thml1+='<div class="memoheading_dec">Returning</div>'
			        thml1+='<div class="memoheading">Quantity</div>'
				 thml1+='<div class="memoheading">UOM</div>'
				  thml1+='<div class="memoheading">Price</div>'
				   thml1+='<div class="memoheading">Total</div>'
				    thml1+='<div class="memoheading_tax">Tax</div>'
				      thml1+='</div>'
			for(var i=0;i<itemNameArray.length;i++){
			     thml1+='<div class="memoheading_detail">'+itemNumArray[i]+'</div>'
			     thml1+='<div class="memoheading_dec_detail">'+itemNameArray[i]+'</div>'
			     thml1+='<div class="memoheading_dec_detail_text3">'+R_Reason[i]+'</div>'
			     thml1+='<div class="memoheading_dec_detail">'+noofItem[i]+'</div>'
			      thml1+='<div class="memoheading_detail">'+QuantityArray[i]+'</div>'
			      thml1+='<div class="memoheading_detail_text4">Each</div>'
			       thml1+='<div class="memoheading_detail">'+priceArray[i]+'</div>'
			        thml1+='<div class="memoheading_detail_text4">$'+toalPriceArray[i]+'</div>'
				thml1+='<div class="memoheading_tax_detail">Non</div>'
				      thml1+='</div>'
			}
			
		   
		       
		       
              /*        thml1+='<div style="width: 100%"><div class="demo1">Item</div><div class="demo2">Description</div></div>'
                       for(var i=0;i<itemNameArray.length;i++){
                       thml1+='<div style="width: 100%"><div class="demo3">'+itemNumArray[i]+'</div><div class="demo4">'+itemNameArray[i]+'</div></div>'
                       }
                       thml1+='<div style="width: 100%"><div class="demo1">Quantity</div><div class="demo2">Reason</div></div>'
                       for(var i=0;i<itemNameArray.length;i++){
                       thml1+='<div style="width: 100%"><div class="demo3">'+QuantityArray[i]+'</div><div class="demo4">'+R_Reason[i]+'</div></div>'
                       }
                       thml1+='<div style="width: 100%"><div class="demo1">UOM</div><div class="demo2">Returning</div></div>'
                       
                       for(var i=0;i<itemNameArray.length;i++){
                       thml1+='<div style="width: 100%"><div class="demo3">Each</div><div class="demo4">'+noofItem[i]+'</div></div>'
                       }
                       
                       thml1+='<div style="width: 100%"><div class="demo1">Price</div><div class="demo2">Total</div></div>'
                       for(var i=0;i<itemNameArray.length;i++){
                       thml1+='<div style="width: 100%"><div class="demo3">'+priceArray[i]+'</div><div class="demo4">$'+toalPriceArray[i]+'</div></div>'
                       }
                       thml1+='<div style="width: 100%"><div class="demo11">Tax</div></div>'
                       for(var i=0;i<itemNameArray.length;i++){
                       thml1+='<div style="width: 100%"><div class="demo31">non</div></div>'
                       }
                       
                       */
                       $('#memo_details').html(thml1).trigger('create');
                       
                       }
                       var selectedInvoice=[];
                       function selectinvoice(evnt) {
                       //alert($(evnt).data('invoid'))
                       var invoid=$(evnt).data('invoid');
                       if (selectedInvoice.indexOf(invoid) ==-1) {
                       selectedInvoice.push(invoid)
                       $(evnt).addClass('dyanamicl');
                       
                       }
                       else{
                       selectedInvoice.splice(selectedInvoice.indexOf(invoid), 1);
                       $(evnt).removeClass('dyanamicl');
                       }
                       console.log(selectedInvoice)
                       //code
                       }
                       
                       function gotoHome() {
                       
                       //alert('ok');
                       $.mobile.changePage('home')
                       //code
                       }
                       
                       function gotoSettingpage() {
                       $.mobile.changePage('#settingpage')
                       
                       }
                       
                      
		       
		       
		       
		       
		       
		       
		       


function customerInvoReturns2(){
     tryit='true'
    var res = cus_data;
    var html='';
    for(var i=0;i<res.d.results.length;i++){
           var data1=res.d.results[i]
           var c_id=data1.cust_num.toString();
           var adds=data1.street+','+data1.city+','+data1.country+','+data1.telephone;
           var c_id2=c_id.toString();
           var searcdata=data1.cust_name+c_id;
           html+='<li class="Cc_list" style="none" add="'+searcdata+'"><div class="ui-block-a" ><a href="#" data-c_id='+c_id2+' data-cusname="'+data1.cust_name+'"  data-adds="'+adds+'" onclick="CutomerInvoice_local(this)"><span>'+data1.cust_num+'</span></a>'
           html+='<strong>'+res.d.results[i].cust_name+'</strong>'
           html+='<div class="Garfield_text">'+data1.street+'<br /> '+data1.city+', '+data1.country+'  '+data1.telephone+'</div>'
           html+='</div></li>'
           
           
           }

           $('#dynamic_customer').html(html).trigger('create');
           $.mobile.changePage('#Customers')
}


function CutomerInvoice_local(ev){
     caddress=$(ev).data('adds');
    cus_name=$(ev).data('cusname');
    cus_id=$(ev).data('c_id');
     var res = null
     
        switch (cus_id)
	       {
	       case '0000000092':
		 res = cus_invoice
		 break;
	       case '0000000093':
		 res = cus_invoice93
		 break;
	       case '0000000094':
		 res = cus_invoice94
		 break;
	       case '0000000095':
		 res = cus_invoice95
		 break;
	       case '0000000096':
		 res = cus_invoice96
		 break;
	        case '0000000097':
		 res = cus_invoice97
		 break;
	       case '0000000098':
		  res = cus_invoice98
		 break;
		 case '0000000099':
		  res = cus_invoice99
		 break;
	       }
    
     
     
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
           invoiceArray.push(data1.invoice_num);
           itemcourntArray.push(data1.item_count);
           html+='<div class="ui-block-a" ><div class="Createtop"><span>'+det1+'</span>'
           html+='<h1>'+dt_yr+'</h1></div><strong>'+parseInt(data1.invoice_amt)+'</strong>'
           html+='<div class="Garfield_text" data-invo_id="'+data1.invoice_num+'" data-cid="'+res.d.results[0].cust_id+'" data-cname="'+res.d.results[0].cust_name+'" data-icount="'+res.d.results[i].item_count+'" onclick="invoiceDetail_local(this)" ><h1>'+data1.invoice_num+'</h1><h2>'+data1.item_count+' items</h2></div></div>'
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
}
var local_invono='';
function invoiceDetail_local(ev){
   local_invono=$(ev).data('invo_id')
  //  alert($(ev).data('icount'))
    nitm=parseInt($(ev).data('icount'))
    console.log($(ev).data('icount'))
    var res=null
    switch (parseInt($(ev).data('icount')))
	       {
	       case 2:
		 res = cusno2
		 break;
	       case 3:
		 res = cusno
		 break;
	       case 4:
		 res = cusno4
		 break;
	       case 5:
		 res = cusno5
		 break;
	       case 6:
		 res = cusno6
		 break;
	        case '0000000097':
		 res = cus_invoice97
		 break;
	       case '0000000098':
		  res = cus_invoice98
		 break;
		 case '0000000099':
		  res = cus_invoice99
		 break;
	       }
    
      var html='';
           var fuldate='';
           //alert(res.d.results.length)
           var ht='<option>DAMAGED IN TRANSIT</option><option>MATERIAL RUINED</option><option>POOR QUALITY</option><option>WRONG MATERIAL</option>'
           var ht1='<option>GOODS IN DAMAGED CONDITION</option><option>GOODS RETURNED WITH LOSS IN WEIGHT</option><option>RETURNED WRONG ITEM</option>'
           for(var i=0;i<res.d.results.length;i++){
           var data1=res.d.results[i]
     
		   
           var str = res.d.results[i].billing_date;
           var ress = str.slice(6,str.length-2);
           var ress1=parseInt(ress)
           var dt=new Date(ress1);
           var yr=dt.getFullYear();
           var mon=dt.getMonth();
           var det1 = dt.getDate();
           var mon1=mon+1
           fuldate=det1+'/'+mon1+'/'+yr;
		   var sdata=data1.invoice_item+data1.item_name;
           html+='<li class="returnlist" add="'+sdata+'"> <div class="ui-block-a"><div class="Createtop"><span>'+data1.units+'</span></div>'
           html+='<strong>'+Number(data1.invoice_item)+'</strong><strong>'+data1.item_name+'</strong>'
           html+='<div class="poor_quality_text4"><div id="textinput"><select name="" class="selecttext">'+ht+'</select></div><div class="selecttextbox"><select name="" class="selecttext">'+ht1+'</select></div></div></div></li>';
           }
           var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Invoice #</h1>'+local_invono+'</div>'
           var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Date </h1>'+fuldate+'</div>'
           $('#invoice_detaila').html(html).trigger('create');
           $('#in_c_id').html(html6)
           $('#in_c_name').html(html1)
           $.mobile.changePage('#returns_creen')
    
}
var nitm=0
function gotoReturnconfrm_local(){
     itemNumArray=[];
    priceArray=[];
    QuantityArray=[];
    materialArray=[];
    itemNameArray=[];
    var res=invoice_return
     switch (nitm)
	       {
	       case 2:
		 res = invoice_return2
		 break;
	       case 3:
		 res = invoice_return
		 break;
	       case 4:
		 res = invoice_return4
		 break;
	       case 5:
		 res = invoice_return5
		 break;
	       case 6:
		 res = invoice_return6
		 break;
	        case '0000000097':
		 res = cus_invoice97
		 break;
	       case '0000000098':
		  res = cus_invoice98
		 break;
		 case '0000000099':
		  res = cus_invoice99
		 break;
	       }
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
           html+='<li class="returnconfmlist" add="'+serdata+'"> <div class="ui-block-a"><div class="Createtop"><span>'+Number(data1.invoice_item)+'</span></div>'
           html+='<strong>'+data1.item_name+'</strong>';
           //   html+='<div class="Garfield_text"><h1>'+data1.material+'</h1><h2>'+data1.item_name+'</h2></div>';
           html+='<div class="Garfield_text"><h1>'+data1.material+'</h1><h2>'+Number(data1.quantity)+' items</h2></div>';
           html+='<div class="poor_quality_text5"><div id="textinput"><input type="Number" data-line_ndex='+i+' onkeyup="checkqutity(this)"/></div><div id="selecttextbox"><select name="" class="selecttext">'+ht+'</select></div></div></div>';
         
           
           
           
           }
           //<div class="Garfield_text"><h1>P500020</h1><h2>6 items</h2></div><div class="poor_quality_text"><span>3</span><h1>Poor Quality</h1></div></div>
           //alert(cname);
           var html6='<div class="Barnes_text"><h1>Customer ID</h1>'+cid+'</div><div class="invoice_text"><h1>Invoice #</h1>'+local_invono+'</div>'
           var html1='<div class="Barnes_text"><h1>Customer name</h1>'+cname+'</div><div class="invoice_text"><h1>Date </h1>'+fuldate+'</div>'
           $('#invoice_detaila_return').html(html).trigger('create');
           //// alert('ok');
	   
           $('#in_c_id_retun').html(html6).trigger('create');
           $('#in_c_name_retun').html(html1).trigger('create');
	  $('#in_c_id_retun_cnf').html(html6).trigger('create');
           $('#in_c_name_retun_cnf').html(html1).trigger('create');
           $.mobile.changePage('#Returns_confirmation_screen2')
    
}
var headhtml='';
var headhtm1='';
function gotoCreditmemo_local(){
    	noofItem=[];
	R_Reason=[];
	$('input[type=Number]', '#invoice_detaila_return').each(function() {
                                                          
                                                            var val1=$(this).val();
                                                            if(val1==''){
                                                            var val2=0;
                                                            }
                                                            else{
                                                            var val2=parseInt(val1)
                                                            }
                                                            noofItem.push(val2)
                                                            
                                                            })
    //    alert(noofItem.length)
    //alert(QuantityArray[0]);
    //alert(noofItem[0])
    
    
    
    
    if(noofItem.length==0){
        alert('please Enter no of item for return ')
    }
    else{
        $('select', '#invoice_detaila_return').each(function() {
                                                    // alert($(this).val())
                                                    //  var val1=$(this).val();
                                                    R_Reason.push($(this).val())
                                                    })
        
        
        console.log(noofItem);
        console.log(R_Reason)
        var dt=new Date();
        var date1=new Date();
        var date0=date1.toISOString()
        var date2=date0.toString();
        var date3=  date2.substring( 0, date2.length-5);
        var date4=  date2.substring( 0, date2.length-14);
        //alert(date3)
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
        Rbody+='<d:PartnNumb>'+cus_id+'</d:PartnNumb>'
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
            Rbody+='<d:ReqDate>'+date3+'</d:ReqDate>'
            Rbody+='<d:ReqQty>'+noofItem[i]+'</d:ReqQty>'
            Rbody+='</m:properties>'
            Rbody+='</atom:content>'
            Rbody+='</atom:entry>'
            
        }
        //-----------------------end1-------------------------------
        Rbody+='</atom:feed>'
        Rbody+='</m:inline>'
        Rbody+='</atom:link>'
        Rbody+='</atom:entry>'
	 $('#retunOrderid_memo').html('<h1 >Return Order</h1>0090000229</div>')
                        $('#memo_refno').html('0090000229')
                        console.log("-----------here now----------------------------------------------------------");
                        $.mobile.changePage('#Credit_memo')
                        
                     gotoCReditMempage()
    }
}

function customerInvoReturns_local(){

        materialPriceArray=[];
        materialnumArray=[];
        materialDescArray=[];
        materialBarcodeArray=[];
        materialnum_desc=[];
  
    
 
           var res=just_return
           //alert('suc')
           var option1='<option>DAMAGED IN TRANSIT</option><option>MATERIAL RUINED</option><option>POOR QUALITY</option><option>WRONG MATERIAL</option>'
           var option2='<option>GOODS IN DAMAGED CONDITION</option><option>GOODS RETURNED WITH LOSS IN WEIGHT</option><option>RETURNED WRONG ITEM</option>'
           var thml='';
           var Mnum_option=''
           for(var i=0;i<res.d.results.length;i++){
           var data1=res.d.results[i]
           var opval=data1.MaterialNum+'s---t'+data1.MaterialDesc+'s---t'+data1.Price;
           Mnum_option+= '<option value="'+opval+'" data-va="'+data1.MaterialDesc+'">'+data1.MaterialNum+'</option>'
           materialnumArray.push(data1.MaterialNum);
           materialDescArray.push(data1.MaterialDesc);
           materialBarcodeArray.push(data1.Barcode.toString());
           materialnum_desc.push(opval);
           }
           new_mat=Mnum_option;
           thml+='<li><div class="ui-block-a"><div class="Createtop"><span>EA</span></div><div class="textinputtes_new Mat_optn"><select name=""  class="selecttext">'+Mnum_option+'</select></div><div class="textinput_new Mat_text"><input type="Number" vlaue="3"/></div>'
           thml+='<div class="poor_quality_text"><div class="textinputtes Mat_reson" ><select name="" class="selecttext">'+option1+'</select></div><div class="selecttextbox Mat_cond"><select name=""        class="selecttext">'+option2+'</select></div></div></div></li>'
           
           $('#just_cid').html(cus_id);
           $('#just_cname').html('<h1>Customer name</h1>'+cus_name);
           $('#invoice_just_re_html').html(thml).trigger('create')
           $.mobile.changePage('#jsut_returns_creen');
         
	
    
}


function justRetuncnf_summit_local(){
    var date1=new Date();
    var date0=date1.toISOString()
    var date2=date0.toString();
    var date3=  date2.substring( 0, date2.length-5);
    var date4=  date2.substring( 0, date2.length-14);
    $('#memodate').html(date4);
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
    Rbody+='<d:OrdReason>'+just_mat_Res[0]+'</d:OrdReason>'
    Rbody+='<d:PartnNumb>'+cus_id+'</d:PartnNumb>'
    Rbody+='</m:properties>'
    Rbody+='</atom:content>'
    Rbody+='<atom:link '
    Rbody+='rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/SOItems" '
    Rbody+='type="application/atom+xml;type=feed" '
    Rbody+='title="SALESORDER.SOHeader_SOItems">'
    Rbody+='<m:inline>'
    Rbody+='<atom:feed>'
    //-----------------------------------------------
	for(var i=0;i<just_mat_num.length;i++){
          var j=i+1;
	    var j1=j+'0';
	   console.log(j1+'-----------')
        Rbody+='<atom:entry>'
        Rbody+='<atom:content type="application/xml">'
        Rbody+='<m:properties>'
        Rbody+='<d:ItmNumber>0000'+j1+'</d:ItmNumber>'
        Rbody+='<d:Material>'+just_mat_num[i]+'</d:Material>'//found
        Rbody+='<d:Plant>1000</d:Plant>'
        Rbody+='<d:StoreLoc>1000</d:StoreLoc>'
        Rbody+='<d:TargetQty>'+just_mat_Retq[i]+'</d:TargetQty>'//found
        Rbody+='<d:TargetQu>EA</d:TargetQu>'
        Rbody+='<d:ShortText>'+just_mat_desc[i]+'</d:ShortText>'//found
        Rbody+='<d:MatlGroup>50200000</d:MatlGroup>'
        Rbody+='<d:CondStNo>011</d:CondStNo>'
        Rbody+='<d:CondCount>01</d:CondCount>'
        Rbody+='<d:CondType>PR00</d:CondType>'
        Rbody+='<d:CondValue>'+just_mat_price[i]+'</d:CondValue>'
        Rbody+='<d:Currency>USD</d:Currency>'
        Rbody+='<d:ReqDate>'+date3+'</d:ReqDate>'
        Rbody+='<d:ReqQty>'+just_mat_Retq[i]+'</d:ReqQty>'
        Rbody+='</m:properties>'
        Rbody+='</atom:content>'
        Rbody+='</atom:entry>'
        
	}
    Rbody+='</atom:feed>'
    Rbody+='</m:inline>'
    Rbody+='</atom:link>'
    Rbody+='</atom:entry>'
	$.mobile.changePage('#Credit_memo')
	
	gotoCReditMempage_jsut()
    
}

function trygetReports(){
     var res=returnPeports
           // alert(res.d.results[0].__metadata.uri)
           var html='';
           var montheArray=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
           for(var i=0;i<res.d.results.length;i++){
           var data1=res.d.results[i]
           var str = data1.ReturnDate
	   if(str==null || str==''){
	     var yr=0
           var mon=0
           var det1 = 0
           var mon1=0
           var deate=det1+'/'+mon1+'/'+yr;
	   }
	   else{
	   //console.log( data1.ReturnDate)
           var ress = str.slice(6,str.length-2);
           // alert(ress)
           var ress1=parseInt(ress)
           // alert(ress1)
           var dt=new Date(ress1);
           var yr=dt.getFullYear();
           var mon=dt.getMonth();
           var det1 = dt.getDate();
           var mon1=mon+1
           var deate=det1+'/'+mon1+'/'+yr;
	   }
           var c_name=data1.CustomerName;
           var c_re_order=data1.ReturnOrder;
           var c_invoice_no=data1.InvoiceNumber;
           var c_date=data1.ReturnDate;
           // alert(c_re_order)
           //  var monthdt=
           var serReport=c_invoice_no+c_name+c_re_order;
           html+='<li class="repostlist" add="'+serReport+'"><div class="ui-block-a" data-rid='+c_re_order+' data-date1='+deate+' data-cname="'+c_name+'"      onclick="getRetrunOrderDetails_local(this);"><a href="#"><div class="Createtop1"><span style="width:100% !important;">'+det1+'</span><h1>'+montheArray[mon]+'/'+yr+'</h1></div></a>'
           html+='<strong>'+c_name+'</strong>'
           html+='<div class="poor_quality_text1"><div class="textinputtes1">'+c_invoice_no+'</div><div class="selecttextbox1">'+c_re_order+'</div></div></div></li>'
           // html+='</div><div>';
           
           //textbox
           
           }
           // alert('ok')
           $('#Report_customer').html(html).trigger('create');
           $.mobile.changePage('#ReportsPage')
           //console.log(status)
}

function getRetrunOrderDetails_local(ev){
     var res=returnReportsDeatils
         var r_id=$(ev).data('rid');
	var c_name=$(ev).data('cname');
	var c_date=$(ev).data('date1');
           
           var html='';
           
           for(var i=0;i<res.d.results.length;i++){
           var data1=res.d.results[i]
           //alert(data1.item_count)
           var i_num=Number(data1.ItemNumber);
           html+='<li class="re_detail_li" add="'+data1.ItemName+'"><div class="ui-block-a"><div class="Createtop"><span>'+i_num+'</span></div>'
           //html+='<strong>Air Tubs</strong>';
           html+='<div class="Garfield_text"><h1>'+data1.ItemName+'</h1></div>';
           html+='<div class="poor_quality_text"><span>'+Number(data1.ReturnQuantity)+'</span><h1>'+data1.ReturnReason+'</h1></div></div></li>';
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
           
}
function trylogoff(){
    $.mobile.changePage('#loign')
}
function gotohomepage(){
    console.log(tryit)
    if(tryit=='true'){
			    $.mobile.changePage('#loign')
			}
			else{
			   $.mobile.changePage('#homePage')
			}
    
}
function trytohome(){
    console.log('okc')
    tryit='true'
     $.mobile.changePage('#tryhomePage')
}

function changePageonclik(page){
$.mobile.changePage('#'+page)

}

function gobackfromCustomer(){

           console.log('home')
	   
                        if(tryit=='true'){
			    $.mobile.changePage('#tryhomePage')
			}
			else{
			   $.mobile.changePage('#homePage')
			}
}

function backfromReport(){
                    if(tryit=='true'){
			    $.mobile.changePage('#tryhomePage')
			}
			else{
			   $.mobile.changePage('#homePage')
			}

}



var cid='0000000092'
var cname='Ferguson Heating and Cooling'
var just_return={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('AIRTUBS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"100.00","Barcode":"8906004863081","MaterialDesc":"Air tubs","MaterialNum":"AIRTUBS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('BABYSHOWER')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"150.00","Barcode":"","MaterialDesc":"Baby shower system","MaterialNum":"BABYSHOWER"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('BASIN%20SINKS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"80.00","Barcode":"8906004863234","MaterialDesc":"Basin sinks, glass","MaterialNum":"BASIN SINKS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('CABINETS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"120.00","Barcode":"8901764082406","MaterialDesc":"Cabinets for bathrooms","MaterialNum":"CABINETS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('CADDIES')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"30.00","Barcode":"8901764082405","MaterialDesc":"Caddies for showers","MaterialNum":"CADDIES"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('COOLERS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"500.00","Barcode":"8901764082407","MaterialDesc":"Office water coolers","MaterialNum":"COOLERS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('FAUCETS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"30.00","Barcode":"8901764082408","MaterialDesc":"Danze bathroom faucets","MaterialNum":"FAUCETS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('FOUNTAIN')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"150.00","Barcode":"8901764082409","MaterialDesc":"Wall-mounted drinking fountains","MaterialNum":"FOUNTAIN"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('KITCHENSINKS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"25.00","Barcode":"8901764082410","MaterialDesc":"Kitchen floor sinks","MaterialNum":"KITCHENSINKS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('MIRRORS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"150.00","Barcode":"8901764082411","MaterialDesc":"Mirrors","MaterialNum":"MIRRORS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500000')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"60.00","Barcode":"8901764082412","MaterialDesc":"Air tubs","MaterialNum":"P500000"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500001')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"150.00","Barcode":"8906033681051","MaterialDesc":"Baby shower system","MaterialNum":"P500001"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500002')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"120.00","Barcode":"8901764042706","MaterialDesc":"Basin sinks, glass","MaterialNum":"P500002"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500003')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"120.00","Barcode":"8901764082405","MaterialDesc":"Cabinets for bathrooms","MaterialNum":"P500003"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500004')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"30.00","Barcode":"8906004863578","MaterialDesc":"Caddies for showers","MaterialNum":"P500004"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500005')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"500.00","Barcode":"8906004863578","MaterialDesc":"Office water coolers","MaterialNum":"P500005"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500006')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"30.00","Barcode":"8906004863080","MaterialDesc":"Danze bathroom faucets","MaterialNum":"P500006"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500007')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"150.00","Barcode":"8906033682072","MaterialDesc":"Wall-mounted drinking fountains","MaterialNum":"P500007"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500008')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"25.00","Barcode":"8901764082405","MaterialDesc":"Kitchen floor sinks","MaterialNum":"P500008"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500009')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"150.00","Barcode":"890600486357","MaterialDesc":"Mirrors","MaterialNum":"P500009"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500010')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"40.00","Barcode":"8906004863081","MaterialDesc":"Access doors / panels index page","MaterialNum":"P500010"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500011')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"30.00","Barcode":"8906004863082","MaterialDesc":"Pipes","MaterialNum":"P500011"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500012')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"30.00","Barcode":"8906004863083","MaterialDesc":"ABS plastic fittings","MaterialNum":"P500012"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500013')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"250.00","Barcode":"8906004863084","MaterialDesc":"Cast iron effluent pumps","MaterialNum":"P500013"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500014')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"150.00","Barcode":"8906004863085","MaterialDesc":"Wall bar hand shower kits","MaterialNum":"P500014"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500015')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"60.00","Barcode":"8906004863086","MaterialDesc":"Hand showers for babies","MaterialNum":"P500015"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500016')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"200.00","Barcode":"8906004863087","MaterialDesc":"Steam Bathing","MaterialNum":"P500016"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500017')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"200.00","Barcode":"8906004863088","MaterialDesc":"Backup sump pumps","MaterialNum":"P500017"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500018')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"80.00","Barcode":"8906004863089","MaterialDesc":"Salmon electric towel warmer","MaterialNum":"P500018"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500019')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"250.00","Barcode":"8906004863088","MaterialDesc":"Large slipper tubs","MaterialNum":"P500019"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('P500020')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"10.00","Barcode":"8906004863089","MaterialDesc":"Water Heaters","MaterialNum":"P500020"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('PANELS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"40.00","Barcode":"8901764082413","MaterialDesc":"Access doors / panels index page","MaterialNum":"PANELS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('PIPES')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"30.00","Barcode":"8901764082414","MaterialDesc":"Index of pipe & tubing","MaterialNum":"PIPES"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('PLASTICFITTINGS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"30.00","Barcode":"8901764082416","MaterialDesc":"ABS plastic fittings","MaterialNum":"PLASTICFITTINGS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('PUMPS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"250.00","Barcode":"8901764082417","MaterialDesc":"Cast iron effluent pumps","MaterialNum":"PUMPS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('SHOWER%20KITS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"150.00","Barcode":"8901764082418","MaterialDesc":"Wall bar hand shower kits","MaterialNum":"SHOWER KITS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('SHOWERS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"60.00","Barcode":"8901764082419","MaterialDesc":"Hand showers for babies","MaterialNum":"SHOWERS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('STEAMBATHING')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"200.00","Barcode":"8901764082420","MaterialDesc":"Steam Bathing","MaterialNum":"STEAMBATHING"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('SUMP%20PUMPS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"200.00","Barcode":"8901764082422","MaterialDesc":"Backup sump pumps","MaterialNum":"SUMP PUMPS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('TOWEL%20WARMER')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"80.00","Barcode":"8901764023423","MaterialDesc":"Salmon electric towel warmer","MaterialNum":"TOWEL WARMER"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('TUBS')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"250.00","Barcode":"","MaterialDesc":"Large slipper tubs","MaterialNum":"TUBS"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RET_MATERIAL_INFO_SRV/MaterialCollection('WATERHEATER')","type":"RET_MATERIAL_INFO_SRV.MATERIAL"},"Price":"10.00","Barcode":"8901764082425","MaterialDesc":"Water Heaters","MaterialNum":"WATERHEATER"}]}} 
var invoice_return={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000229","item_name":"Basin sinks, glass","invoice_num":"","price":"110.00","invoice_item":"000010","quantity":"15.000","units":"EA","sold_to":"0000000092","material":"P500002","cost":"1650.00","billing_date":"/Date(1386633600000)/","net_value":"1650.00","sales_doc":"0000001128"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000229","item_name":"Water Heaters","invoice_num":"","price":"9.00","invoice_item":"000020","quantity":"25.000","units":"EA","sold_to":"0000000092","material":"P500020","cost":"225.00","billing_date":"/Date(1386633600000)/","net_value":"225.00","sales_doc":"0000001128"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000229","item_name":"Chardonnay","invoice_num":"","price":"30.00","invoice_item":"000030","quantity":"12.000","units":"EA","sold_to":"0000000092","material":"P500021","cost":"321.00","billing_date":"/Date(1386633600000)/","net_value":"360.00","sales_doc":"0000001128"}]}} 

var invoice_return2={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000226","item_name":"Baby shower system","invoice_num":"","price":"140.00","invoice_item":"000010","quantity":"14.000","units":"EA","sold_to":"0000000092","material":"P500001","cost":"1960.00","billing_date":"/Date(1386028800000)/","net_value":"1960.00","sales_doc":"0000001117"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000226","item_name":"Basin sinks, glass","invoice_num":"","price":"110.00","invoice_item":"000020","quantity":"16.000","units":"EA","sold_to":"0000000092","material":"P500002","cost":"1760.00","billing_date":"/Date(1386028800000)/","net_value":"1760.00","sales_doc":"0000001117"}]}} 

var invoice_return4={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000255","item_name":"Water Heaters","invoice_num":"","price":"9.00","invoice_item":"000010","quantity":"12.000","units":"EA","sold_to":"0000000093","material":"WATERHEATER","cost":"108.00","billing_date":"/Date(1386720000000)/","net_value":"108.00","sales_doc":"0000001166"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000255","item_name":"ABS plastic fittings","invoice_num":"","price":"28.00","invoice_item":"000020","quantity":"25.000","units":"EA","sold_to":"0000000093","material":"PLASTICFITTINGS","cost":"700.00","billing_date":"/Date(1386720000000)/","net_value":"700.00","sales_doc":"0000001166"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000255","item_name":"Salmon electric towel warmer","invoice_num":"","price":"75.00","invoice_item":"000030","quantity":"20.000","units":"EA","sold_to":"0000000093","material":"P500018","cost":"1500.00","billing_date":"/Date(1386720000000)/","net_value":"1500.00","sales_doc":"0000001166"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000255","item_name":"Cast iron effluent pumps","invoice_num":"","price":"250.00","invoice_item":"000040","quantity":"15.000","units":"EA","sold_to":"0000000093","material":"P500013","cost":"3450.00","billing_date":"/Date(1386720000000)/","net_value":"3750.00","sales_doc":"0000001166"}]}} 
var invoice_return5={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000191","item_name":"Pipes","invoice_num":"","price":"30.00","invoice_item":"000010","quantity":"5.000","units":"EA","sold_to":"0000000093","material":"P500011","cost":"140.00","billing_date":"/Date(1378944000000)/","net_value":"150.00","sales_doc":"0000000986"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000191","item_name":"ABS plastic fittings","invoice_num":"","price":"30.00","invoice_item":"000020","quantity":"6.000","units":"EA","sold_to":"0000000093","material":"P500012","cost":"168.00","billing_date":"/Date(1378944000000)/","net_value":"180.00","sales_doc":"0000000986"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000191","item_name":"Cast iron effluent pumps","invoice_num":"","price":"250.00","invoice_item":"000030","quantity":"7.000","units":"EA","sold_to":"0000000093","material":"P500013","cost":"1610.00","billing_date":"/Date(1378944000000)/","net_value":"1750.00","sales_doc":"0000000986"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000191","item_name":"Wall bar hand shower kits","invoice_num":"","price":"145.00","invoice_item":"000040","quantity":"8.000","units":"EA","sold_to":"0000000093","material":"P500014","cost":"1160.00","billing_date":"/Date(1378944000000)/","net_value":"1160.00","sales_doc":"0000000986"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000191","item_name":"Hand showers for babies","invoice_num":"","price":"50.00","invoice_item":"000050","quantity":"8.000","units":"EA","sold_to":"0000000093","material":"P500015","cost":"400.00","billing_date":"/Date(1378944000000)/","net_value":"400.00","sales_doc":"0000000986"}]}} 
var invoice_return6={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Baby shower system","invoice_num":"","price":"140.00","invoice_item":"000010","quantity":"5.000","units":"EA","sold_to":"0000000092","material":"P500001","cost":"700.00","billing_date":"/Date(1378944000000)/","net_value":"700.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Basin sinks, glass","invoice_num":"","price":"110.00","invoice_item":"000020","quantity":"10.000","units":"EA","sold_to":"0000000092","material":"P500002","cost":"1100.00","billing_date":"/Date(1378944000000)/","net_value":"1100.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Cabinets for bathrooms","invoice_num":"","price":"110.00","invoice_item":"000030","quantity":"15.000","units":"EA","sold_to":"0000000092","material":"P500003","cost":"1650.00","billing_date":"/Date(1378944000000)/","net_value":"1650.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Caddies for showers","invoice_num":"","price":"30.00","invoice_item":"000040","quantity":"20.000","units":"EA","sold_to":"0000000092","material":"P500004","cost":"600.00","billing_date":"/Date(1378944000000)/","net_value":"600.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Office water coolers","invoice_num":"","price":"500.00","invoice_item":"000050","quantity":"15.000","units":"EA","sold_to":"0000000092","material":"P500005","cost":"7500.00","billing_date":"/Date(1378944000000)/","net_value":"7500.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Danze bathroom faucets","invoice_num":"","price":"30.00","invoice_item":"000060","quantity":"12.000","units":"EA","sold_to":"0000000092","material":"P500006","cost":"336.00","billing_date":"/Date(1378944000000)/","net_value":"360.00","sales_doc":"0000000985"}]}} 
var cusno={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000229","item_name":"Basin sinks, glass","invoice_num":"","price":"110.00","invoice_item":"000010","quantity":"15.000","units":"EA","sold_to":"0000000092","material":"P500002","cost":"1650.00","billing_date":"/Date(1386633600000)/","net_value":"1650.00","sales_doc":"0000001128"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000229","item_name":"Water Heaters","invoice_num":"","price":"9.00","invoice_item":"000020","quantity":"25.000","units":"EA","sold_to":"0000000092","material":"P500020","cost":"225.00","billing_date":"/Date(1386633600000)/","net_value":"225.00","sales_doc":"0000001128"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000229","item_name":"Chardonnay","invoice_num":"","price":"30.00","invoice_item":"000030","quantity":"12.000","units":"EA","sold_to":"0000000092","material":"P500021","cost":"321.00","billing_date":"/Date(1386633600000)/","net_value":"360.00","sales_doc":"0000001128"}]}}
var cusno2={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000226","item_name":"Baby shower system","invoice_num":"","price":"140.00","invoice_item":"000010","quantity":"14.000","units":"EA","sold_to":"0000000092","material":"P500001","cost":"1960.00","billing_date":"/Date(1386028800000)/","net_value":"1960.00","sales_doc":"0000001117"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000226","item_name":"Basin sinks, glass","invoice_num":"","price":"110.00","invoice_item":"000020","quantity":"16.000","units":"EA","sold_to":"0000000092","material":"P500002","cost":"1760.00","billing_date":"/Date(1386028800000)/","net_value":"1760.00","sales_doc":"0000001117"}]}} 
var cusno6={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Baby shower system","invoice_num":"","price":"140.00","invoice_item":"000010","quantity":"5.000","units":"EA","sold_to":"0000000092","material":"P500001","cost":"700.00","billing_date":"/Date(1378944000000)/","net_value":"700.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Basin sinks, glass","invoice_num":"","price":"110.00","invoice_item":"000020","quantity":"10.000","units":"EA","sold_to":"0000000092","material":"P500002","cost":"1100.00","billing_date":"/Date(1378944000000)/","net_value":"1100.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Cabinets for bathrooms","invoice_num":"","price":"110.00","invoice_item":"000030","quantity":"15.000","units":"EA","sold_to":"0000000092","material":"P500003","cost":"1650.00","billing_date":"/Date(1378944000000)/","net_value":"1650.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Caddies for showers","invoice_num":"","price":"30.00","invoice_item":"000040","quantity":"20.000","units":"EA","sold_to":"0000000092","material":"P500004","cost":"600.00","billing_date":"/Date(1378944000000)/","net_value":"600.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Office water coolers","invoice_num":"","price":"500.00","invoice_item":"000050","quantity":"15.000","units":"EA","sold_to":"0000000092","material":"P500005","cost":"7500.00","billing_date":"/Date(1378944000000)/","net_value":"7500.00","sales_doc":"0000000985"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000190","item_name":"Danze bathroom faucets","invoice_num":"","price":"30.00","invoice_item":"000060","quantity":"12.000","units":"EA","sold_to":"0000000092","material":"P500006","cost":"336.00","billing_date":"/Date(1378944000000)/","net_value":"360.00","sales_doc":"0000000985"}]}}
var cusno4={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000233","item_name":"Water Heaters","invoice_num":"","price":"9.00","invoice_item":"000010","quantity":"12.000","units":"EA","sold_to":"0000000094","material":"WATERHEATER","cost":"108.00","billing_date":"/Date(1386633600000)/","net_value":"108.00","sales_doc":"0000001133"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000233","item_name":"Large slipper tubs","invoice_num":"","price":"245.00","invoice_item":"000020","quantity":"14.000","units":"EA","sold_to":"0000000094","material":"TUBS","cost":"3430.00","billing_date":"/Date(1386633600000)/","net_value":"3430.00","sales_doc":"0000001133"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000233","item_name":"Cast iron effluent pumps","invoice_num":"","price":"230.00","invoice_item":"000030","quantity":"22.000","units":"EA","sold_to":"0000000094","material":"PUMPS","cost":"5060.00","billing_date":"/Date(1386633600000)/","net_value":"5060.00","sales_doc":"0000001133"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000233","item_name":"ABS plastic fittings","invoice_num":"","price":"28.00","invoice_item":"000040","quantity":"25.000","units":"EA","sold_to":"0000000094","material":"PLASTICFITTINGS","cost":"700.00","billing_date":"/Date(1386633600000)/","net_value":"700.00","sales_doc":"0000001133"}]}} 
var cusno5={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000256","item_name":"Salmon electric towel warmer","invoice_num":"","price":"75.00","invoice_item":"000010","quantity":"5.000","units":"EA","sold_to":"0000000094","material":"P500018","cost":"375.00","billing_date":"/Date(1386720000000)/","net_value":"375.00","sales_doc":"0000001167"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000256","item_name":"Baby shower system","invoice_num":"","price":"140.00","invoice_item":"000020","quantity":"12.000","units":"EA","sold_to":"0000000094","material":"P500001","cost":"1680.00","billing_date":"/Date(1386720000000)/","net_value":"1680.00","sales_doc":"0000001167"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000256","item_name":"Basin sinks, glass","invoice_num":"","price":"110.00","invoice_item":"000030","quantity":"15.000","units":"EA","sold_to":"0000000094","material":"P500002","cost":"1650.00","billing_date":"/Date(1386720000000)/","net_value":"1650.00","sales_doc":"0000001167"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000256","item_name":"Cabinets for bathrooms","invoice_num":"","price":"110.00","invoice_item":"000040","quantity":"17.000","units":"EA","sold_to":"0000000094","material":"P500003","cost":"1870.00","billing_date":"/Date(1386720000000)/","net_value":"1870.00","sales_doc":"0000001167"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/POD_INVOICE_ITEMS/pod_invoice_iteCollection('')","type":"POD_INVOICE_ITEMS.pod_invoice_ite"},"invoice_number":"0090000256","item_name":"Office water coolers","invoice_num":"","price":"500.00","invoice_item":"000050","quantity":"22.000","units":"EA","sold_to":"0000000094","material":"P500005","cost":"11000.00","billing_date":"/Date(1386720000000)/","net_value":"11000.00","sales_doc":"0000001167"}]}} 

var cus_data={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection('0000000092')","type":"RETURNS_CUSTOMERS.returns_custome"},"state":"IL","country":"US","password":"","sales_rep_id":"","cust_name":"Ferguson Heating and Cooling","city":"Chicago","cust_num":"0000000092","street":"500 North Pulaski Road","telephone":"(773) 533-8000"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection('0000000093')","type":"RETURNS_CUSTOMERS.returns_custome"},"state":"IL","country":"US","password":"","sales_rep_id":"","cust_name":"Don Johns Inc","city":"Chicago","cust_num":"0000000093","street":"1320 West Lake Street","telephone":"(312) 666-2210"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection('0000000094')","type":"RETURNS_CUSTOMERS.returns_custome"},"state":"IL","country":"US","password":"","sales_rep_id":"","cust_name":"Naylor Pipe Co.","city":"Chicago","cust_num":"0000000094","street":"1230 East 92nd Street","telephone":"(773) 721-9400"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection('0000000095')","type":"RETURNS_CUSTOMERS.returns_custome"},"state":"IL","country":"US","password":"","sales_rep_id":"","cust_name":"Panther Industries","city":"Chicago","cust_num":"0000000095","street":"2412 West Ogden Avenue","telephone":"(312) 733-1195"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection('0000000096')","type":"RETURNS_CUSTOMERS.returns_custome"},"state":"IL","country":"US","password":"","sales_rep_id":"","cust_name":"Chicago Brass","city":"Chicago","cust_num":"0000000096","street":"220 West Kinzie Street","telephone":"(312) 245-0200"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection('0000000097')","type":"RETURNS_CUSTOMERS.returns_custome"},"state":"IL","country":"US","password":"","sales_rep_id":"","cust_name":"Water Saver Faucet Co","city":"Chicago","cust_num":"0000000097","street":"701 West Erie Street","telephone":"(312) 666-5500"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection('0000000098')","type":"RETURNS_CUSTOMERS.returns_custome"},"state":"IL","country":"US","password":"","sales_rep_id":"","cust_name":"Wagner & Sons","city":"Chicago","cust_num":"0000000098","street":"725 West 47th Street","telephone":"(773) 451-6767"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNS_CUSTOMERS/returns_customeCollection('0000000099')","type":"RETURNS_CUSTOMERS.returns_custome"},"state":"IL","country":"US","password":"","sales_rep_id":"","cust_name":"Action Plumbing & Sewer Inc","city":"Chicago","cust_num":"0000000099","street":"1837 West 35th Street","telephone":"(773) 376-6666"}]}}
var cus_invoice93={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000093')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000093","invoice_amt":"6058.00","cust_name":"Don Johns Inc","item_count":"   4","invoice_num":"0090000255"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000093')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000093","invoice_amt":"6058.00","cust_name":"Don Johns Inc","item_count":"   4","invoice_num":"0090000254"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000093')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000093","invoice_amt":"6905.00","cust_name":"Don Johns Inc","item_count":"   4","invoice_num":"0090000232"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000093')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000093","invoice_amt":"6110.00","cust_name":"Don Johns Inc","item_count":"   4","invoice_num":"0090000231"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000093')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000093","invoice_amt":"3880.00","cust_name":"Don Johns Inc","item_count":"   4","invoice_num":"0090000230"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000093')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1378944000000)/","cust_id":"0000000093","invoice_amt":"3640.00","cust_name":"Don Johns Inc","item_count":"   5","invoice_num":"0090000191"}]}} 
var cus_invoice94={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000094')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000094","invoice_amt":"16575.00","cust_name":"Naylor Pipe Co.","item_count":"   5","invoice_num":"0090000257"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000094')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000094","invoice_amt":"16575.00","cust_name":"Naylor Pipe Co.","item_count":"   5","invoice_num":"0090000256"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000094')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000094","invoice_amt":"4030.00","cust_name":"Naylor Pipe Co.","item_count":"   3","invoice_num":"0090000235"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000094')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000094","invoice_amt":"9298.00","cust_name":"Naylor Pipe Co.","item_count":"   4","invoice_num":"0090000234"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000094')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000094","invoice_amt":"9298.00","cust_name":"Naylor Pipe Co.","item_count":"   4","invoice_num":"0090000233"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000094')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1380240000000)/","cust_id":"0000000094","invoice_amt":"790.00","cust_name":"Naylor Pipe Co.","item_count":"   2","invoice_num":"0090000215"}]}} 
var cus_invoice95={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000095')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000095","invoice_amt":"7055.00","cust_name":"Panther Industries","item_count":"   5","invoice_num":"0090000259"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000095')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000095","invoice_amt":"7055.00","cust_name":"Panther Industries","item_count":"   5","invoice_num":"0090000258"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000095')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000095","invoice_amt":"7735.00","cust_name":"Panther Industries","item_count":"   4","invoice_num":"0090000239"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000095')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000095","invoice_amt":"4960.00","cust_name":"Panther Industries","item_count":"   3","invoice_num":"0090000238"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000095')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000095","invoice_amt":"4960.00","cust_name":"Panther Industries","item_count":"   3","invoice_num":"0090000237"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000095')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000095","invoice_amt":"6160.00","cust_name":"Panther Industries","item_count":"   4","invoice_num":"0090000236"}]}} 
var cus_invoice96={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000096')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000096","invoice_amt":"13500.00","cust_name":"Chicago Brass","item_count":"   4","invoice_num":"0090000261"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000096')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000096","invoice_amt":"5083.00","cust_name":"Chicago Brass","item_count":"   4","invoice_num":"0090000260"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000096')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000096","invoice_amt":"8595.00","cust_name":"Chicago Brass","item_count":"   5","invoice_num":"0090000243"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000096')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000096","invoice_amt":"8595.00","cust_name":"Chicago Brass","item_count":"   5","invoice_num":"0090000242"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000096')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000096","invoice_amt":"5560.00","cust_name":"Chicago Brass","item_count":"   4","invoice_num":"0090000241"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000096')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000096","invoice_amt":"7735.00","cust_name":"Chicago Brass","item_count":"   4","invoice_num":"0090000240"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000096')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1378944000000)/","cust_id":"0000000096","invoice_amt":"3322.00","cust_name":"Chicago Brass","item_count":"   7","invoice_num":"0090000192"}]}} 
var cus_invoice97={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000097')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000097","invoice_amt":"1995.00","cust_name":"Water Saver Faucet Co","item_count":"   4","invoice_num":"0090000263"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000097')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000097","invoice_amt":"1395.00","cust_name":"Water Saver Faucet Co","item_count":"   3","invoice_num":"0090000262"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000097')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000097","invoice_amt":"5354.00","cust_name":"Water Saver Faucet Co","item_count":"   5","invoice_num":"0090000247"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000097')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000097","invoice_amt":"6245.00","cust_name":"Water Saver Faucet Co","item_count":"   4","invoice_num":"0090000246"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000097')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000097","invoice_amt":"4370.00","cust_name":"Water Saver Faucet Co","item_count":"   3","invoice_num":"0090000245"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000097')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000097","invoice_amt":"4703.00","cust_name":"Water Saver Faucet Co","item_count":"   4","invoice_num":"0090000244"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000097')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1378944000000)/","cust_id":"0000000097","invoice_amt":"855.00","cust_name":"Water Saver Faucet Co","item_count":"   4","invoice_num":"0090000193"}]}} 
var cus_invoice98={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000098')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000098","invoice_amt":"11407.00","cust_name":"Wagner & Sons","item_count":"   5","invoice_num":"0090000265"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000098')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000098","invoice_amt":"10657.00","cust_name":"Wagner & Sons","item_count":"   4","invoice_num":"0090000264"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000098')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000098","invoice_amt":"5410.00","cust_name":"Wagner & Sons","item_count":"   4","invoice_num":"0090000253"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000098')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000098","invoice_amt":"5397.00","cust_name":"Wagner & Sons","item_count":"   5","invoice_num":"0090000249"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000098')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000098","invoice_amt":"5354.00","cust_name":"Wagner & Sons","item_count":"   5","invoice_num":"0090000248"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000098')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1380240000000)/","cust_id":"0000000098","invoice_amt":"410.00","cust_name":"Wagner & Sons","item_count":"   2","invoice_num":"0090000216"}]}} 
var cus_invoice99={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000099')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000099","invoice_amt":"3602.00","cust_name":"Action Plumbing & Sewer Inc","item_count":"   4","invoice_num":"0090000267"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000099')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386720000000)/","cust_id":"0000000099","invoice_amt":"4590.00","cust_name":"Action Plumbing & Sewer Inc","item_count":"   4","invoice_num":"0090000266"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000099')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000099","invoice_amt":"2125.00","cust_name":"Action Plumbing & Sewer Inc","item_count":"   4","invoice_num":"0090000252"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000099')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000099","invoice_amt":"2455.00","cust_name":"Action Plumbing & Sewer Inc","item_count":"   4","invoice_num":"0090000251"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000099')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000099","invoice_amt":"2480.00","cust_name":"Action Plumbing & Sewer Inc","item_count":"   4","invoice_num":"0090000250"}]}} 


var cus_invoice={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000092')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000092","invoice_amt":"2235.00","cust_name":"Ferguson Heating and Cooling","item_count":" 3","invoice_num":"0090000229"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000092')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386633600000)/","cust_id":"0000000092","invoice_amt":"2375.00","cust_name":"Ferguson Heating and Cooling","item_count":" 3","invoice_num":"0090000228"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000092')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1386028800000)/","cust_id":"0000000092","invoice_amt":"3720.00","cust_name":"Ferguson Heating and Cooling","item_count":" 2","invoice_num":"0090000226"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000092')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1385683200000)/","cust_id":"0000000092","invoice_amt":"4080.00","cust_name":"Ferguson Heating and Cooling","item_count":" 2","invoice_num":"0090000225"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000092')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1383696000000)/","cust_id":"0000000092","invoice_amt":"1194.00","cust_name":"Ferguson Heating and Cooling","item_count":" 2","invoice_num":"0090000224"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000092')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1380499200000)/","cust_id":"0000000092","invoice_amt":"4300.00","cust_name":"Ferguson Heating and Cooling","item_count":" 2","invoice_num":"0090000218"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/INVOICE_DETAILS/invoice_detailsCollection('0000000092')","type":"INVOICE_DETAILS.invoice_details"},"customer_num":"","invoice_date":"/Date(1378944000000)/","cust_id":"0000000092","invoice_amt":"11910.00","cust_name":"Ferguson Heating and Cooling","item_count":" 6","invoice_num":"0090000190"}]}}

var returnPeports={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000120","ReturnDate":"/Date(1379980800000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000121","ReturnDate":"/Date(1379980800000)/","CustomerName":"Don Johns Inc"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000122","ReturnDate":"/Date(1379980800000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000123","ReturnDate":"/Date(1379980800000)/","CustomerName":"Panther Industries"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000124","ReturnDate":"/Date(1379980800000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000125","ReturnDate":"/Date(1379980800000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000126","ReturnDate":"/Date(1379980800000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000127","ReturnDate":"/Date(1379980800000)/","CustomerName":"Action Plumbing & Sewer Inc"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000215","ReturnOrder":"0060000128","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000129","ReturnDate":"/Date(1380240000000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"","InvoiceNumber":"0090000190","ReturnOrder":"0060000130","ReturnDate":null,"CustomerName":""},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000131","ReturnDate":"/Date(1381104000000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000196","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000199","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000191","ReturnOrder":"0060000200","ReturnDate":"/Date(1378944000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000201","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000202","ReturnDate":"/Date(1385683200000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000203","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000204","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000205","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000207","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000208","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000209","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000216","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000217","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000218","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000221","ReturnDate":"/Date(1386028800000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000229","ReturnDate":"/Date(1386028800000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000230","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000226","ReturnOrder":"0060000232","ReturnDate":"/Date(1385683200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000226","ReturnOrder":"0060000233","ReturnDate":"/Date(1385683200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000226","ReturnOrder":"0060000234","ReturnDate":"/Date(1385683200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000235","ReturnDate":"/Date(1386028800000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000226","ReturnOrder":"0060000243","ReturnDate":"/Date(1385683200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000244","ReturnDate":"/Date(1386028800000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000225","ReturnOrder":"0060000245","ReturnDate":"/Date(1383696000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000250","ReturnDate":"/Date(1386028800000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000256","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000257","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000258","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000259","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000260","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000261","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000264","ReturnDate":"/Date(1386115200000)/","CustomerName":"Don Johns Inc"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000266","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000267","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000268","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000269","ReturnDate":"/Date(1386115200000)/","CustomerName":"Don Johns Inc"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000191","ReturnOrder":"0060000270","ReturnDate":"/Date(1378944000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000274","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000275","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000277","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000280","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000281","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000282","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000283","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000284","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000285","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000286","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000287","ReturnDate":"/Date(1386115200000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000288","ReturnDate":"/Date(1386115200000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000289","ReturnDate":"/Date(1386115200000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000193","ReturnOrder":"0060000290","ReturnDate":"/Date(1378944000000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000193","ReturnOrder":"0060000291","ReturnDate":"/Date(1378944000000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000292","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000293","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000294","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000295","ReturnDate":"/Date(1386115200000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000296","ReturnDate":"/Date(1386115200000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000297","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000226","ReturnOrder":"0060000298","ReturnDate":"/Date(1385683200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000299","ReturnDate":"/Date(1386115200000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000300","ReturnDate":"/Date(1386115200000)/","CustomerName":"Don Johns Inc"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000215","ReturnOrder":"0060000301","ReturnDate":"/Date(1378944000000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000215","ReturnOrder":"0060000302","ReturnDate":"/Date(1378944000000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000303","ReturnDate":"/Date(1386115200000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000304","ReturnDate":"/Date(1386115200000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000305","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000306","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000307","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000308","ReturnDate":"/Date(1386115200000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000309","ReturnDate":"/Date(1386115200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000310","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000311","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000312","ReturnDate":"/Date(1386115200000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000313","ReturnDate":"/Date(1386115200000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000218","ReturnOrder":"0060000314","ReturnDate":"/Date(1380240000000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000317","ReturnDate":"/Date(1386201600000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000318","ReturnDate":"/Date(1386201600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000319","ReturnDate":"/Date(1386201600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000320","ReturnDate":"/Date(1386201600000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000321","ReturnDate":"/Date(1386201600000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000322","ReturnDate":"/Date(1386201600000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000323","ReturnDate":"/Date(1386201600000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000324","ReturnDate":"/Date(1386201600000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000325","ReturnDate":"/Date(1386201600000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000326","ReturnDate":"/Date(1386201600000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000327","ReturnDate":"/Date(1386201600000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000328","ReturnDate":"/Date(1386201600000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000329","ReturnDate":"/Date(1386201600000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000330","ReturnDate":"/Date(1386201600000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000331","ReturnDate":"/Date(1386201600000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000332","ReturnDate":"/Date(1386201600000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000333","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000226","ReturnOrder":"0060000334","ReturnDate":"/Date(1385683200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000335","ReturnDate":"/Date(1386201600000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000336","ReturnDate":"/Date(1386201600000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000337","ReturnDate":"/Date(1386201600000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000226","ReturnOrder":"0060000338","ReturnDate":"/Date(1385683200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000339","ReturnDate":"/Date(1386288000000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000340","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000192","ReturnOrder":"0060000341","ReturnDate":"/Date(1378944000000)/","CustomerName":"Don Johns Inc"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000192","ReturnOrder":"0060000342","ReturnDate":"/Date(1378944000000)/","CustomerName":"Don Johns Inc"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000343","ReturnDate":"/Date(1386288000000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000191","ReturnOrder":"0060000344","ReturnDate":"/Date(1378944000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000191","ReturnOrder":"0060000345","ReturnDate":"/Date(1378944000000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000346","ReturnDate":"/Date(1386288000000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000347","ReturnDate":"/Date(1386288000000)/","CustomerName":"Don Johns Inc"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000348","ReturnDate":"/Date(1386288000000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000349","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000350","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000351","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000352","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000353","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000354","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000355","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000356","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000357","ReturnDate":"/Date(1386374400000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000359","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000360","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000361","ReturnDate":"/Date(1386374400000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000362","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000363","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000364","ReturnDate":"/Date(1386374400000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000365","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000366","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000367","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000368","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000369","ReturnDate":"/Date(1386374400000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000370","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000371","ReturnDate":"/Date(1386374400000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000372","ReturnDate":"/Date(1386374400000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000373","ReturnDate":"/Date(1386374400000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000374","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000375","ReturnDate":"/Date(1386374400000)/","CustomerName":"Don Johns Inc"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000376","ReturnDate":"/Date(1386374400000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000377","ReturnDate":"/Date(1386374400000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000378","ReturnDate":"/Date(1386374400000)/","CustomerName":"Water Saver Faucet Co"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000379","ReturnDate":"/Date(1386374400000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000380","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000381","ReturnDate":"/Date(1386374400000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000382","ReturnDate":"/Date(1386374400000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000383","ReturnDate":"/Date(1386374400000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000384","ReturnDate":"/Date(1386374400000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000385","ReturnDate":"/Date(1386547200000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000386","ReturnDate":"/Date(1386547200000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000387","ReturnDate":"/Date(1386547200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000226","ReturnOrder":"0060000388","ReturnDate":"/Date(1385683200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000389","ReturnDate":"/Date(1386547200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000218","ReturnOrder":"0060000390","ReturnDate":"/Date(1380499200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000391","ReturnDate":"/Date(1386547200000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000392","ReturnDate":"/Date(1386547200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000393","ReturnDate":"/Date(1386547200000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000394","ReturnDate":"/Date(1386547200000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000395","ReturnDate":"/Date(1386547200000)/","CustomerName":"Chicago Brass"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000396","ReturnDate":"/Date(1386547200000)/","CustomerName":"Wagner & Sons"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000216","ReturnOrder":"0060000397","ReturnDate":"/Date(1380153600000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000398","ReturnDate":"/Date(1386547200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000399","ReturnDate":"/Date(1386547200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000400","ReturnDate":"/Date(1386547200000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000401","ReturnDate":"/Date(1386547200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000402","ReturnDate":"/Date(1386547200000)/","CustomerName":"Ferguson Heating and Cooling"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"","ReturnOrder":"0060000403","ReturnDate":"/Date(1386547200000)/","CustomerName":"Naylor Pipe Co."},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_INFO_SRV/ReturnOrderCollection('DEMO')","type":"RETURNORDERS_INFO_SRV.Returnorder"},"Password":"","SalesRepId":"DEMO","InvoiceNumber":"0090000215","ReturnOrder":"0060000404","ReturnDate":"/Date(1378944000000)/","CustomerName":"Water Saver Faucet Co"}]}}
var returnReportsDeatils={"d":{"results":[{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_ITEMS_SRV/ReturnOrderItemCollection('60000122')","type":"RETURNORDERS_ITEMS_SRV.ReturnorderItems"},"ReturnReason":"001","ReturnordNumber":"60000122","ReturnQuantity":"20.000","ItemName":"P500001","ItemNumber":"000010","CustomerNumber":"0000000094","ReturnOrder":"","CustomerName":"Naylor Pipe Co.","InvoiceNumber":"","ReturnDate":"/Date(1379980800000)/"},{"__metadata":{"uri":"http://devvm.squeezemobility.com:8000/sap/opu/odata/SQUEEZE/RETURNORDERS_ITEMS_SRV/ReturnOrderItemCollection('60000122')","type":"RETURNORDERS_ITEMS_SRV.ReturnorderItems"},"ReturnReason":"001","ReturnordNumber":"60000122","ReturnQuantity":"15.000","ItemName":"P500002","ItemNumber":"000020","CustomerNumber":"0000000094","ReturnOrder":"","CustomerName":"Naylor Pipe Co.","InvoiceNumber":"","ReturnDate":"/Date(1379980800000)/"}]}}



function sendMail(){
var html='This is return demo';
  
 window.plugins.emailComposer.showEmailComposerWithCallback(null,"Return Menmo",html,["harisankar.behera@php2india.com"],[],[],true,["", ""]);
}


 function starBarScanning(){
                
                        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
   //alert(scanner)
   scanner.scan(
                                                          function (result) {
							    
                                                               if(result.text  !=''){
								   
                                                                   var index=materialBarcodeArray.indexOf(result.text.toString())
								   if(index !=-1){
                                                                   var new_mat1='<option value="'+materialnum_desc[index]+'" data-va="'+materialDescArray[index]+'">'+materialnumArray[index]+'</option>'
                                                                   var thml='';
                                                                   var option1='<option>DAMAGED IN TRANSIT</option><option>MATERIAL RUINED</option><option>POOR QUALITY</option><option>WRONG MATERIAL</option>'
                                                                   var option2='<option>GOODS IN DAMAGED CONDITION</option><option>GOODS RETURNED WITH LOSS IN WEIGHT</option><option>RETURNED WRONG ITEM</option>'
                                                                         thml+='<li><div class="ui-block-a"><div class="Createtop"><span>EA</span></div><div class="textinputtes_new Mat_optn"><select name="" class="selecttext">'+new_mat1+'</select></div><div class="textinput_new Mat_text"><input type="Number" vlaue="3"/></div>'
                                                                         thml+='<div class="poor_quality_text"><div class="textinputtes Mat_reson"><select name="" class="selecttext">'+option1+'</select></div><div class="selecttextbox Mat_cond"><select name=""  class="selecttext">'+option2+'</select></div></div></div></li>'
                                                                      $('#invoice_just_re_html').append(thml).trigger('create');
								   }
								   else{
								    alert('No matching data found')
								   }
                                                               }                                            
                                                          }, 
                                                          function (error) {
                                                          alert("Scanning failed: " + error);
                                                          }
                                                     );
                       }
							  
				
	   
	   
	   
	   
	   function invoiceScanning(){
	   
	      var scanner = cordova.require("cordova/plugin/BarcodeScanner");
   //alert(scanner)
   scanner.scan(
                                                          function (result) {
							    
                                                               if(result.text  !=''){
								   
                                                                 //itemNumArray
                                                               }                                            
                                                          }, 
                                                          function (error) {
                                                          alert("Scanning failed: " + error);
                                                          }
                                                     );
	   }