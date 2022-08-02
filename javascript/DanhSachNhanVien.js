/**
 * Tạo và lưu trữ danh sách các object nhân viên
 */
function DanhSachNhanVien(){
    this.listNV = [] ; 
    // add nv
    this.themNV = function(objectNV){
        this.listNV.push(objectNV) ; 
    }
    // find nv
    this.timNV = function(taiKhoanNV){
        var index = -1 ; 
        this.listNV.map(function(objectNV , i){
            if(objectNV.taiKhoanNV === taiKhoanNV) index = i   ;
        })
        
         return index ; 
    }
    // update nv
    this.capNhatNV = function(objectNV , taiKhoanNV){
        var index = this.timNV(taiKhoanNV) ;
        console.log("index",index) ;  
        if(index > -1){
            this.listNV[index] = objectNV ; 
        }
    }
    // xoa nhan vien
    this.xoaNV = function(index){
        // var index = this.timNV(taiKhoanNV) ; 
        this.listNV.splice(index , 1) ; 
    }
}