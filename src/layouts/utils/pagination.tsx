import React from "react";

interface PaginationInterface {
    trangHienTai: number;
    tongSoTrang: number;
    phanTrang: any;
}

export const Pagination: React.FC<PaginationInterface> = (props) => {

    const danhSachTrang: number[] = [];

    // SỬA Ở ĐÂY 1: Bỏ comment đoạn này. Nếu API chưa trả về dữ liệu (tongSoTrang = 0) thì ẩn phân trang. 
    // Nếu không ẩn, nút "Trang cuối" sẽ gọi phanTrang(0) và gây lỗi tìm kiếm.
    if (props.tongSoTrang === 0) {
        return null; 
    }

    if (props.trangHienTai === 1) {
        danhSachTrang.push(props.trangHienTai);
        if (props.tongSoTrang >= props.trangHienTai + 1) {
            danhSachTrang.push(props.trangHienTai + 1);
        }
        if (props.tongSoTrang >= props.trangHienTai + 2) {
            danhSachTrang.push(props.trangHienTai + 2);
        }
    } else if (props.trangHienTai > 1) {
        // trang -2
        if (props.trangHienTai >= 3) {
            danhSachTrang.push(props.trangHienTai - 2);
        }
        // trang -1
        if (props.trangHienTai >= 2) {
            danhSachTrang.push(props.trangHienTai - 1);
        }
        // ban than no
        danhSachTrang.push(props.trangHienTai);
        // trang + 1
        if (props.tongSoTrang >= props.trangHienTai + 1) {
            danhSachTrang.push(props.trangHienTai + 1);
        }
        // trang + 2
        if (props.tongSoTrang >= props.trangHienTai + 2) {
            danhSachTrang.push(props.trangHienTai + 2);
        }
    }

    return (
        <nav aria-label="...">
            <ul className="pagination justify-content-center">
                {/* Gọi theo kiểu finction lamda */}
                <li className="page-item" onClick={()=>props.phanTrang(1)}> 
                    <button className="page-link"  >Trang đầu</button>
                </li>
                    {
                        danhSachTrang.map(trang => (
                            // SỬA Ở ĐÂY 2: Đưa class "active" lên thẻ <li> thay vì thẻ <button>. 
                            // Trong Bootstrap, class active phải nằm ở page-item (thẻ li) thì nó mới highlight màu xanh (nổi bật trang hiện tại) đúng chuẩn.
                            <li className={"page-item " + (trang === props.trangHienTai ? "active" : "")} key={trang} onClick={()=>props.phanTrang(trang)}>
                                <button className="page-link">{trang}</button>
                            </li>
                        ))

                    }
                <li className="page-item" onClick={()=>props.phanTrang(props.tongSoTrang)}>
                    <button className="page-link"  >Trang cuối</button>
                </li>
            </ul>
        </nav>
    )
}