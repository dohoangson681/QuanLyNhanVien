/**
 * file main.js thực hiện các chức năng tương tác trên UI
 */
// instance DanhSachNhanVien
var dsnv  = new DanhSachNhanVien() ; 
// getele
function getELE(id){
    return document.getElementById(id) ; 
}
getELE("btnThem").onclick = function(){
    getELE("header-title").innerHTML = "Log In" ; 
    resetFormInput(); 
    resetTB() ; 
}
// them nhan vien
function themNV(){
    var taiKhoanNV =getELE("tknv").value;
    var tenNV =getELE("name").value;
    var emailNV =getELE("email").value;
    var passwordNV =getELE("password").value; 
    var ngayLam =getELE("datepicker").value;
    var luongCoBanNV =getELE("luongCB").value;
    var chucVu =getELE("chucvu").value;
    var gioLam =getELE("gioLam").value;
    // check validation 
    var validation = new Validation() ; 
    var isValid = true ; 
    // checkEmpty taikhoanNV
    isValid &= validation.checkEmpty(taiKhoanNV , "tbTKNV" , "*Tài khoản nhân viên không được trống") && validation.checkTKNVExist(taiKhoanNV , "tbTKNV" , "*Tài khoản nhân viên đã tồn tại") && validation.checkLengthTK(taiKhoanNV , "tbTKNV" , "*Tài khoản nhân viên chỉ từ 6 đến 8 kí số"); 
    // checkEmpty tenNV
    isValid &= validation.checkEmpty(tenNV , "tbTen" , "*Tên nhân viên không được để trống") && validation.checkTenNV(tenNV , "tbTen" , "*Tên nhân viên chỉ chứa kí tự chữ") ; 
    // checkEmpty emailNV
    isValid &= validation.checkEmpty(emailNV , "tbEmail" , "*Email không được để trống") && validation.checkEmail(emailNV , "tbEmail" , "*Email không hợp lệ") ; 
    // checkEmpty passwordNV
    isValid &= validation.checkEmpty(passwordNV , "tbMatKhau" , "*Password không được để trống") && validation.checkPassword(passwordNV , "tbMatKhau" , "*Password phải chứa ít nhất 1 kí tự đặc biệt , 1 chữ hoa , 1 chữ thuong , dài từ 6 đến 10 kí tự") ; 
    // checkEmpty ngayLam
    isValid &= validation.checkEmpty(ngayLam , "tbNgay" , "*Ngày làm không được để trống") && validation.checkDate(ngayLam , "tbNgay" , "*Ngày làm không đúng định dạng(mm/dd/yy)")  ;
    // checkEmpty luongCoBan
    isValid &= validation.checkEmpty(luongCoBanNV , "tbLuongCB" , "*Lương cơ bản không được để trống") && validation.checkLuongCoBan(luongCoBanNV , "tbLuongCB" , "*Lương cơ bản không hợp lệ(từ 1tr tới 20tr)") ; 
    // checkEpty chức vụ
    isValid &= validation.checkChucVu("chucvu" , "tbChucVu" , "*Vui lòng chọn chức vụ.") ; 
    // checkEmpty giờ làm
    isValid &= validation.checkEmpty(gioLam , "tbGiolam" ,"*Giờ làm không được để trống" ) && validation.checkGioLam(gioLam , "tbGiolam" , "*Làm quá ít , đuổi việc !" , "*Làm quá nhiều , đuổi !!!"); 









    // if valid => add
    if(isValid){
        // them data-dismiss = "modal"
        getELE("btnThemNV").dataset.dismiss = "modal" ; 
        // tao instance cho NhanVien
        var nv = new NhanVien(taiKhoanNV,tenNV,emailNV,passwordNV,ngayLam,  luongCoBanNV,chucVu,gioLam) ; 
        // console.log(nv) ; 
        // push objectnv vao mang
        dsnv.themNV(nv) ; 
        // console.log(dsnv.listNV) ; 
        // show len UI
        showUI(dsnv.listNV) ; 
        // luu vao local
        setLocalStorage(dsnv.listNV) ; 
        resetFormInput() ; 
    }else{
        getELE("btnThemNV").dataset.dismiss = "" ; 
    }
    
    
}
getELE("btnThemNV").onclick = themNV ; 
// hien thi len UI
function showUI(arr) {
    var content = "" ; 
    arr.map(function(objectNV){
        content += `
            <tr>
                <td>${objectNV.taiKhoanNV}</td>
                <td>${objectNV.tenNV}</td>
                <td>${objectNV.emailNV}</td>
                <td>${objectNV.ngayLam}</td>
                <td>${objectNV.chucVu}</td>
                <td>${objectNV.tongLuong}</td>
                <td>${objectNV.xepLoai}</td>
                <td>
                    <button id="bntXem" class = "btn btn-primary w-50 mb-2" onclick="xemNV('${objectNV.taiKhoanNV}')" data-toggle="modal" data-target="#myModal" >Xem</button>
                    <button class = "btn btn-success w-50" onclick = "xoaNV('${objectNV.taiKhoanNV}')" >Xóa</button>
                </td>
            </tr>
        `;
    })
    getELE("tableDanhSach").innerHTML = content ; 

}
// set local storage
function setLocalStorage(arr) {
    localStorage.setItem("Danh sách nhân viên" , JSON.stringify(arr)) ; 
}
// get local
function getLocalStorage() {
    dsnv.listNV = localStorage.getItem("Danh sách nhân viên") ? JSON.parse(localStorage.getItem("Danh sách nhân viên")) : [] ; 
    showUI(dsnv.listNV) ; 
}
getLocalStorage() ; 
// xem nhn vien
function xemNV(taiKhoanNV) {
    resetTB() ; 
    var index = dsnv.timNV(taiKhoanNV) ; 
    if(index > -1){
        var foundNV = dsnv.listNV[index] ; 
        getELE("tknv").value = foundNV.taiKhoanNV;
        getELE("tknv").disabled = true ; 
        getELE("name").value = foundNV.tenNV;
        getELE("email").value = foundNV.emailNV;
        getELE("password").value = foundNV.passwordNV; 
        getELE("datepicker").value = foundNV.ngayLam;
        getELE("luongCB").value = foundNV.luongCoBanNV;
        getELE("chucvu").value = foundNV.chucVu;
        getELE("gioLam").value = foundNV.gioLam;

    }
     console.log(index) ; 
    getELE("header-title").innerHTML = "Thông tin nhân viên" ; 
}
// cap nhat nhan vien
function capNhatNV() {
    var taiKhoanNV =getELE("tknv").value;
    var tenNV =getELE("name").value;
    var emailNV =getELE("email").value;
    var passwordNV =getELE("password").value; 
    var ngayLam =getELE("datepicker").value;
    var luongCoBanNV =getELE("luongCB").value;
    var chucVu =getELE("chucvu").value;
    var gioLam =getELE("gioLam").value;
    //
    var nv = new NhanVien(taiKhoanNV,tenNV,emailNV,passwordNV,ngayLam,luongCoBanNV,chucVu,gioLam) ; 
    console.log("nv moi" , nv) ; 

    dsnv.capNhatNV(nv , taiKhoanNV) ; 
    showUI(dsnv.listNV) ; 
    setLocalStorage(dsnv.listNV) ; 
    resetFormInput() ; 
}
getELE("btnCapNhat").onclick = capNhatNV ; 
// xoa nhan vien
function xoaNV(taiKhoanNV) {
    var index = dsnv.timNV(taiKhoanNV) ; 
    if(index > -1){//tim thay
        dsnv.xoaNV(index) ; 
    }
    showUI(dsnv.listNV) ; 
    setLocalStorage(dsnv.listNV) ; 
}
// tim nhan vien
// chuyển từ tiếng việt không dấu sang có dấu
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
function timNV() {
    var searchArr = [] ; 
    var key1 = getELE("searchName").value ; 
    console.log(key1) ; 
    // chuyen key thanh chu in thuong ko dấu
    key1 = removeVietnameseTones(key1).toLowerCase() ; 
    dsnv.listNV.map(function(objectNV){
        var key2 = removeVietnameseTones(objectNV.xepLoai).toLowerCase() ;
        console.log(key2) ; 
        if(key2.indexOf(key1) > -1 ) searchArr.push(objectNV)  ; 
        
    })
    showUI(searchArr) ; 
}
getELE("searchName").onkeyup = timNV ; 
// reset form
function resetFormInput() {
    getELE("mainForm").reset() ; 
    getELE("tknv").disabled = false ; 
}
getELE("btnDong").onclick = resetFormInput ; 
// reset span
function resetTB() {
    getELE("tbTKNV").style.display = "none" ; 
    getELE("tbTKNV").innerHTML = "" ; 

    getELE("tbTen").style.display = "none" ; 
    getELE("tbTen").innerHTML = "" ; 

    getELE("tbEmail").style.display = "none" ; 
    getELE("tbEmail").innerHTML = "" ; 

    getELE("tbMatKhau").style.display = "none" ; 
    getELE("tbMatKhau").innerHTML = "" ; 

    getELE("tbNgay").style.display = "none" ; 
    getELE("tbNgay").innerHTML = "" ; 

    getELE("tbLuongCB").style.display = "none" ; 
    getELE("tbLuongCB").innerHTML = "" ; 

    getELE("tbChucVu").style.display = "none" ; 
    getELE("tbChucVu").innerHTML = "" ; 

    getELE("tbGiolam").style.display = "none" ; 
    getELE("tbGiolam").innerHTML = "" ; 

}




