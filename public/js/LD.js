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
var dsspmua = "";
    var giohang = {};

    function addGioHang(xID, xName, xPrice) {
        var hangthem = giohang[xID];

        console.log(hangthem);

        if (hangthem) {
            hangthem["soluong"] += 1
        } else {
            hangthem = { "ten" : xName, "gia" : xPrice, "soluong" : 1};
        }
        giohang[xID] = hangthem;

        console.log(hangthem);

    }

    function themvao(xID, xName, xPrice) {
        //alert(xID + "  " + xName);
        var x = document.getElementById("giohangTab");
        var ds = document.getElementById("dssp");

        /// ADD
        addGioHang(xID, xName, xPrice);

        /// show list
        var xkeys = Object.keys(giohang);
        var showlist = "";
        dsspmua = "";

        for(j=0; j<xkeys.length; j++)
        {
            dsspmua += xkeys[j] + "_" + giohang[ xkeys[j] ]["soluong"] + "_";
            showlist += "<tr> <td> " + "Loại Sản Phẩm:"
                + giohang[ xkeys[j] ]["ten"] + " </td> <td> "+"Số lượng:"
                + giohang[ xkeys[j] ]["soluong"] + " </td> <td> "+"Đơn giá:"+ 
                + giohang[ xkeys[j] ]["gia"]*giohang[ xkeys[j] ]["soluong"]+ " </td></tr>";
        };


        x.innerHTML = showlist;
        ds.value = dsspmua;
    }





 



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
