/**
 * file NhanVien.js tạo lớp Nhân viên
 */
function NhanVien(taiKhoanNV,tenNV,emailNV,passwordNV,ngayLam,luongCoBanNV,chucVu,gioLam){
    // property
    this.taiKhoanNV = taiKhoanNV ; 
    this.tenNV = tenNV ; 
    this.emailNV = emailNV ; 
    this.passwordNV = passwordNV ; 
    this.ngayLam = ngayLam ; 
    this.luongCoBanNV = luongCoBanNV ; 
    this.chucVu = chucVu ; 
    this.gioLam = gioLam ; 
    // method
    this.tinhTongLuong = function(){
        var chucVu = document.getElementById("chucvu") ; 
        if(chucVu.selectedIndex == 1) return this.luongCoBanNV*3 ; 
        else if(chucVu.selectedIndex == 2) return this.luongCoBanNV*2 ; 
        else return this.luongCoBanNV ; 
    }
    this.tongLuong = this.tinhTongLuong() ; 
    this.xepLoaiNV = function(){
        if(this.gioLam >= 192) return "Xuất sắc." ;
        else if(this.gioLam >= 176) return "Giỏi." ; 
        else if(this.gioLam >= 160) return "Khá." ; 
        else return "Trung bình." ; 
    }
    this.xepLoai = this.xepLoaiNV() ; 

}
