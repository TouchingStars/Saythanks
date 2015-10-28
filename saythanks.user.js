// ==UserScript==
// @name         saythanks
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       shuishui
// @grant        none
// @match        http*://hdwing.com/*
// @match        http*://totheglory.im/*
// @match        http*://www.nexushd.org/*
// @match        http*://chdbits.org/*
// @match        http*://pt.sjtu.edu.cn/*
// @match        http*://hdsky.me/*
// @match        http*://hdcity.leniter.org/*
// @match        http*://www.hdcity.org/*
// @match        http*://hdqueen.com/*
// @match        http*://hdtime.org/*
// @match        http*://www.seehd.co/*
// @match        http*://pt.gztown.net/*
// ==/UserScript==

//SET TIMEOUT BETWEEN TWO TORRENTS
var _TIMEOUT_=1000;
//SET TIMEOUT FOR NETWORK DELAY
var _BADNETWORKDELAY_=8000;
var _GOODNETWORKDELAY_=500;
var _NONETWORKDELAY_=1;
//SET POST DATA
var _THKPH_='/thanks.php',_TIDN_='id=';

var url_flag=-1,j=0,thankPath,idName_,url_string = new Array();
url_string[0]='hdwing.com';
url_string[1]='totheglory.im';
url_string[2]='hdcity.leniter.org';
url_string[3]='hdsky.me';
url_string[4]='http://chdbits.org';
url_string[5]='pt.sjtu.edu.cn';
//url_string[5]='tp.m-team.cc';
url_string[6]='www.nexushd.org';
url_string[7]=_THKPH_;

var url_delay  = new Array( _BADNETWORKDELAY_,_GOODNETWORKDELAY_,'', _BADNETWORKDELAY_);
var url_thxpath = new Array('','/ajaxThanks.php','/thanks');
var url_tid  = new Array('torrentid=','tid=');
//var url_thxpath = new Array('_ajax_thanks.php','/ajaxThanks.php');
//var url_tid  = new Array('type=2&torrentid=','tid=');
for(j=0;j<url_string.length;j++){
    url_string[j]=url_string[j].replace(/^https?:\/(\/)*/i,'');
    if (/^\/.*/.test(url_string[j])==false)url_string[j]='http://'+url_string[j];
    var _dParser = document.createElement('a');
    _dParser.href = url_string[j];
    url_string[j]=_dParser.hostname;
    if (url_thxpath[j]==null||url_thxpath[j]=='') {
        if(_dParser.pathname=='/'){
            url_thxpath[j]=_THKPH_;
        }else{
            url_thxpath[j]=_dParser.pathname+_dParser.search;
        }
    }
    if (url_tid[j]==null||url_tid[j]=='') url_tid[j]=_TIDN_;
    if (url_delay[j]==null||url_delay[j]==''||url_delay[j]<=0) url_delay[j]=_NONETWORKDELAY_;
    if (/^[^\/]+/.test(url_thxpath[j])) url_thxpath[j]='/'+url_thxpath[j];
}

setVarofURL_(location.host,'',1);
function $(e){if(typeof e=='string')e=document.getElementById(e);return e;}
function setVarofURL_(_yURL,_yVar,_yFlag){    
    var returnI,_notmyDef=true;      
    _yURL=_yURL.replace(/^https?:\/(\/)*/i,'');
    if (/^\/.*/.test(_yURL)==false)_yURL='http://'+_yURL;
    var _aParser = document.createElement('a');
    _aParser.setAttribute('href', _yURL); 
    var yURL=_aParser.hostname;
    var yURLPATH=_aParser.pathname+_aParser.search;
    if (/^[^\/]+/.test(yURLPATH))yURLPATH='/'+yURLPATH;
    var lURL=location.pathname+location.search;  //alert(yURLPATH);
    for(var lj=0;lj<url_string.length;lj++){
        if(yURL==url_string[lj]||yURL.replace(/^www\./i,'')==url_string[lj].replace(/^www\./i,'')){
            if(_yFlag==-1){ 
                returnI=['']
                if(lj==0){
                    if(/(<h2>.+<\/h2>)/i.test(_yVar)) {
                        returnI=[_yVar.match(/<h2>(.+)<\/h2>/i)[1]+'(^_^)'];
                    }else if(/(ID)/i.test(_yVar)) returnI=[_yVar.match(/.*ID.*/i)[0]+'(^_^)'];
                    //returnI=_yVar.match(/(<Code>.+<\/Code>)/i);
                    //if(returnI!=null&&returnI[0].replace(/(.*<Code>)|(<\/Code>)/gi,'')=='100'){returnI[0]='OK!';}else returnI[0]='';
                }else if(lj==1){
                    if(/.*{"error":.*/.test(_yVar)){
                        returnI=[_yVar.replace(/(.*{"error":)|(})|(")/gi,'')];
                        returnI[0]='错误,'+unescape(returnI[0].replace(/\\/gi,'%'))+'!（＞﹏＜）';
                    }else if(/.*{"node":".*/.test(_yVar)) returnI=['OK!!(^_^)'];
                }else{
                    returnI=['OK!(^_^)'];
                    if(_yVar!='')returnI=_yVar.match(/(You already said thanks!)|(Invalid torrent id!)/i); 
                }
            }else{ 
                thankPath=url_thxpath[lj]; idName_=url_tid[lj]; 
                if(thankPath=="") thankPath=_THKPH_;
                if(idName_=="") idName_=_TIDN_;
                if (_yFlag==1) {
                    if(lj==0){ 
                        if ($("sign_button")!=null&&$("sign_button").disabled == false&&$("sign_button").value=='签　到')setTimeout("document.getElementById('sign_button').click()",url_delay[lj]);
                        if (/^\/?details.php\?id=([0-9]+)/.test(lURL)&&$("thanksbutton").disabled == false)setTimeout("document.getElementById('thanksbutton').click()",url_delay[lj]);
                    }else if(lj==1){
                        if($("signed")!=null) setTimeout("document.getElementById('signed').click()",url_delay[lj]); 
                        if (/^\/?t\/([0-9]+)/.test(lURL)&&$("ajaxthanks").disabled == false)setTimeout("document.getElementById('ajaxthanks').click()",url_delay[lj]);
                    }else if(lj==2){
                        if(document.getElementById('bottomnav').childNodes[0].childNodes[1].innerText!="已签到") {setTimeout("document.getElementById('bottomnav').childNodes[0].childNodes[1].click()",url_delay[lj]);} 
                        if (/^\/?t-([0-9]+)/.test(lURL)&&$("saythanks").disabled == false)setTimeout("document.getElementById('saythanks').click()",url_delay[lj]);              
                    }else{
                        if(yURL=="hdqueen.com"&&($("yiqiandao")==null||$("yiqiandao").innerText!="[已签到]")) setTimeout("qiandao('qiandao')",url_delay[lj]); 
                        if(yURL=="hdtime.org"&&$("qiandao")!=null) setTimeout("qiandao()",url_delay[lj]); 
                        if (/^\/?details.php\?id=([0-9]+)/.test(lURL)&&$("saythanks").disabled == false)setTimeout("document.getElementById('saythanks').click()",url_delay[lj]);    
                    }
               }
               //if (_yFlag==2&&lj==0) thankPath= url_thxpath[lj]+"?Rnd="+((new Date()).valueOf());
            }
            _notmyDef=false;break;
        }
    }
    if(_yFlag==-1&&_notmyDef){ 
        returnI=['OK!'];
        if(_yVar!=='')returnI=_yVar.match(/(You already said thanks!)|(Invalid torrent id!)/i); 
    }else if(_notmyDef){ 
        thankPath=yURLPATH;
        if(thankPath=="/") thankPath=_THKPH_;
        if(idName_=="") idName_=_TIDN_;  
    }
    if(returnI==null||returnI[0]==='')returnI=["Error,Maybe It's an Invalid torrent id!（＞﹏＜）"];
    return returnI;
}

ajax_={};
ajax_.x=function(){
   try{return new ActiveXObject('Msxml2.XMLHTTP');}
      catch(e){try{return new ActiveXObject('Microsoft.XMLHTTP');}
		   catch(e2){return new XMLHttpRequest();}}};

ajax_.serialize=function(f){
   var g=function(n){return f.getElementsByTagName(n);};
   var nv=function(e){if(e.name)return encodeURIComponent(e.name)+'='+encodeURIComponent(e.value);else return '';};
   var i=collect(g('input'),function(i){if((i.type!='radio'&&i.type!='checkbox')||i.checked)return nv(i);});
   var s=collect(g('select'),nv);
   var t=collect(g('textarea'),nv);return i.concat(s).concat(t).join('&');};

ajax_.send=function(u,f,m,a){
    var x=ajax_.x();x.open(m,u,true);
    var tid=a.replace(/.+=/g,'');
    x.onreadystatechange=function(){
        if(x.readyState==4){
            var returnI=setVarofURL_(u,x.responseText,-1);
            var addI=document.createElement("li");
            addI.innerHTML='<span style="color:red;">'+tid+'</span>:'+returnI[0];
            $("li").appendChild(addI);
        }
    };
    if(m=='POST'){
        x.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    }
    //setTimeout("x.abort()",5000);
    x.send(a);
};

ajax_.get=function(url,func){ajax_.send(url,func,'GET')};
ajax_.gets=function(url){var x=ajax_.x();x.open('GET',url,false);x.send(null);return x.responseText};
ajax_.post=function(url,func,args){ajax_.send(url,func,'POST',args)};
ajax_.update=function(url,elm){var e=$(elm);var f=function(r){e.innerHTML=r};ajax_.get(url,f)};
ajax_.submit=function(url,elm,frm){var e=$(elm);var f=function(r){e.innerHTML=r};ajax_.post(url,f,ajax_.serialize(frm))};


var stid=null,edid=null,url_=null,postData_=null;

function saythanks_(){    
    stid=$("t1").value;edid=$("t2").value;url_=$("url").value;
    if(url_=="Double Click Me !")return;
    if(edid=='')edid=stid;
    if(/^-?\d+$/.test(stid)&&/^-?\d+$/.test(edid)){
        stid=parseInt(stid);edid=parseInt(edid);
        if(stid>edid){
            var t1=stid;stid=edid;edid=t1;
        }
        saythanks_takeyourtime();
    }else $("t1").value="输入错误！";
}

function saythanks_takeyourtime(){
    setVarofURL_(url_,'',2);
    postData_=idName_+stid;
    ajax_.post(thankPath,'',postData_);
    stid=stid+1;
    if(stid<=edid) setTimeout(saythanks_takeyourtime,_TIMEOUT_);
}

function dbClick_(){
    url_flag++;
    if(url_flag==url_string.length)url_flag=0; 
    //setVarofURL_(url_string[url_flag],'',0);
    $("url").value=url_string[url_flag]+url_thxpath[url_flag];
}

var adddiv0=document.createElement("div");
var adddiv1=document.createElement("div");
var adddiv2=document.createElement("div");
var _str1='<span>地&nbsp;&nbsp;&nbsp;址</span><input id=\"url\" type=\"text\" title=\"Double Click Me !\"></input><br>';
var _str2='<!--<span>你的ID</span><input id=\"id\" type=\"text\" value=\"暂时没用！\"></input><br>--><span>种子ID</span><input id=\"t1\" type=\"text\"></input>━━━━━<input id=\"t2\" type=\"text\"></input><br><br>';
var _str3='<button id=\"_thxBut\">saythanks</button><br><br><ul id=\"note\">';
var _str4='<li style=\"color:red;\">Make sure you are logged in the site.</li><li style=\"color:red;\">And you can\'t post data from this site to others.</li>';
var _str5='<li>If any problem, I don&apos;t care.</li>';
var _str6='</ul><ol id=\"li\"></ol><br><br><br>';
var _str7='<p>Powered&nbsp;By&nbsp;ShuiShui</p><p>Version&nbsp;2.1.0</p><p>Copyright&nbsp;&copy;&nbsp;2009&nbsp;-&nbsp;2015</p><p>版权所有 翻版不究</p><br>';

adddiv1.innerHTML=_str1+_str2+_str3+_str4+_str5+_str6;
adddiv2.innerHTML=_str7;
adddiv1.id='bd';
adddiv2.id='sign';
adddiv0.appendChild(adddiv1);
adddiv0.appendChild(adddiv2);
if(self == top){
    document.body.appendChild(adddiv0);
$("url").value=location.protocol+"//"+location.host+thankPath;
$("url").addEventListener("dblclick", dbClick_, false);
$("_thxBut").addEventListener("click",saythanks_, false);

adddiv0.style.cssText="margin:0;background-color:black;color:orange;line-height:2.0em;font-family:\"微软雅黑\",\"黑体\";"
$("bd").style.cssText="margin-left:30%;";
$("sign").style.cssText="text-align:center;line-height:0.5em;color:#8000ff;";
$("t1").style.cssText="margin-left:10px;margin-right:10px;padding-left:10px;color:red;width:100px;"
$("t2").style.cssText="margin-left:10px;margin-right:10px;padding-left:10px;color:red;width:100px;"
$("url").style.cssText="margin-left:10px;margin-right:10px;padding-left:10px;width:280px;"
}
