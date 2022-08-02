/**
 * Kiểm tra người dùng nhập vào đúng theo qui định hay chưa
 */
function Validation() {
    // checkEmpty
    this.checkEmpty = function(inputValue , idSpanTB , message){
        if(inputValue.trim() != ""){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ; 
            return true ; 
        }else{
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ; 
            return false ;
        }
    }
    // check taikhoanNV
    this.checkTKNVExist = function(taikhoanNV , idSpanTB , message){
        var check = dsnv.listNV.some(function(objectNV , index){
            if(objectNV.taiKhoanNV  === taikhoanNV.replaceAll(" ","")) return true ; 
        }) 
        console.log(check) ; 
         
        if(check){
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ; 
            return false ; 
        }else{
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ; 
            return true ;  ;
        }
        
    }
    // check length taikhoanNV
    this.checkLengthTK = function(inputValue , idSpanTB , message){
        var pattern = /^[0-9]{6,8}$/ ;  
        if(inputValue.match(pattern)){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ; 
            return true ; 
        }else{
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ; 
            return false ;
        }
        
    }
    // check tenNV
    this.checkTenNV = function(inputValue , idSpanTB , message){
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/ ; 
        console.log(inputValue.match(pattern)) ; 
        if(inputValue.match(pattern)){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ; 
            return true ; 
        }else{
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ; 
            return false ;
        }
    }
    // check email
    this.checkEmail = function(inputValue , idSpanTB , message){
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(inputValue.match(pattern)){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ; 
            return true ;
        }else{
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ; 
            return false ;
        }
    }
    // check password
    this.checkPassword = function(inputValue , idSpanTB , message){
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/ ; 
        if(inputValue.match(pattern)){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ; 
            return true ;
        }else{
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ; 
            return false ;
        }
    }
    // check date
    this.checkDate = function(inputValue , idSpanTB , message){
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/ ; 
        if(inputValue.match(pattern)){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ; 
            return true ;
        }else{
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ; 
            return false ;
        }
    }
    // check luongCoBan
    this.checkLuongCoBan = function(inputValue , idSpanTB , message){
        if(Number(inputValue) >= 1e6 && Number(inputValue) <= 20e6){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ; 
            return true ;
        }else{
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ; 
            return false ;
        }
    }
    // check gioLam
    this.checkGioLam = function(inputValue , idSpanTB , messageIt , messageNhieu){
        if(Number(inputValue) >= 80 && Number(inputValue) <= 200){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ; 
            return true ;
        }else if(Number(inputValue) < 80){
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = messageIt ; 
            return false ;
        }else{
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = messageNhieu ; 
            return false ;
        }
    }
    // check chucVuNV
    this.checkChucVu = function(idSelectChucVu , spanTBChucVu , message){
        var chucVu = getELE(idSelectChucVu) ; 
        if(chucVu.selectedIndex != 0 ){
            getELE(spanTBChucVu).style.display = "none" ; 
            getELE(spanTBChucVu).innerHTML = "" ;
            return true ; 
        }else{
            getELE(spanTBChucVu).style.display = "block" ; 
            getELE(spanTBChucVu).innerHTML = message ;
            return false ;
        }
    }
}