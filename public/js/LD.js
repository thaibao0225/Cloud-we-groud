/*function hide(){
    document.getElementById("tat").style.display ="none";
    document.getElementById("vid").style.display ="none";
    document.getElementById("mo").style.display ="block";
}
function show(){
    document.getElementById("tat").style.display ="block";
    document.getElementById("vid").style.display ="block";
    document.getElementById("mo").style.display ="none";   
}*/





 



var KichThuoc = document.getElementsByClassName("slide")[0].clientWidth;
var ChuyenSlide = document.getElementsByClassName("chuyen_slide")[0];
var Img = ChuyenSlide.getElementsByTagName("img");
var Max = KichThuoc * Img.length - KichThuoc;

var Chuyen = 0;
function Next(){
	if(Chuyen < Max) Chuyen += KichThuoc;
	else Chuyen = 0;
	ChuyenSlide.style.marginLeft = '-' + Chuyen + 'px';
}

function Back(){
	if(Chuyen == 0) Chuyen = Max;
	else Chuyen -= KichThuoc;
	ChuyenSlide.style.marginLeft = '-' + Chuyen + 'px';
}

var time = 9000;//lập lại vô hạn
var Chuyen = -KichThuoc;
function changeImg(){
    setTimeout("changeImg()", time)
    if(Chuyen < Max) {Chuyen += KichThuoc;}
    else Chuyen = 0;
    ChuyenSlide.style.marginLeft = '-' + Chuyen + 'px';
}
window.onload = changeImg();

function showhide(){
    var click = document.getElementById("hide");
    if (click.style.display=="none"){
        click.style.display ="block";
    }else click.style.display ="none";
}
//===============Jquery===================//
$(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideToggle(300, callback);//300 là độ nhanh chậm của slide
    });
  });
window.i = 0;
function callback(){
    i++;
    console.log('Slide '+i+' times')
}

////////////////////////////////////////////////////////////
