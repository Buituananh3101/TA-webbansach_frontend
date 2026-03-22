import React, { useEffect, useState } from "react";
import SachModel from "../../../model/SachModel";
import HinhAnhModel from "../../../model/HinhAnhModel";
import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Link } from "react-router-dom";
import renderRating from "../../utils/SaoXepHang";
import DinhDangSo from "../../utils/DinhDangSo";

interface SachPropsInterface {
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {

    const maSach: number = props.sach.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        lay1AnhCuaMotSach(maSach).then(
            hinhAnhData => {
                setDanhSachAnh(hinhAnhData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message);
                setDangTaiDuLieu(false);
            }
        );
    }, [] // Chỉ gọi một lần
    )


    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        )
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        )
    }

    // console.log(danhSachAnh[0]);


    return (
        <div className="col-md-3 mt-2">
            <div className="card shadow-sm rounded-3 overflow-hidden">
                {/* link ma sach */}
                <Link to={`/sach/${props.sach.maSach}`}> 
                    <div style={{ height: '200px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', borderTopLeftRadius: 'calc(0.5rem - 1px)', borderTopRightRadius: 'calc(0.5rem - 1px)' }}>
                        {
                            danhSachAnh[0] && danhSachAnh[0].duLieuAnh ? (
                                <>
                                    {/* Lớp nền mờ phía sau */}
                                    <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url(${danhSachAnh[0].duLieuAnh})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px) brightness(0.7)', transform: 'scale(1.1)' }}></div>
                                    {/* Ảnh chính phía trước */}
                                    <img src={danhSachAnh[0].duLieuAnh} alt={props.sach.tenSach} style={{ height: '100%', position: 'relative', objectFit: 'contain' }} />
                                </>
                            ) : <i className="fas fa-image fa-3x text-muted"></i>
                        }
                    </div>
                </Link>

                <div className="card-body">
                    {/* link ma sach */}
                    <Link to={`/sach/${props.sach.maSach}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h5 className="card-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.sach.tenSach}</h5>

                        <p className="card-text" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', height: '3rem' }}>
                            {props.sach.moTa}
                        </p>
                    </Link>
                    <div className="price">
                        <span className="original-price">
                            <del className="me-2">{DinhDangSo(props.sach.giaNiemYet)}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{DinhDangSo(props.sach.giaBan)} đ</strong>
                        </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="rating">
                            {renderRating(props.sach.trungBinhXepHang ? props.sach.trungBinhXepHang : 0)}
                        </div>
                        <div className="actions">
                            <button className="btn btn-outline-secondary btn-sm me-1">
                                <i className="fas fa-heart"></i>
                            </button>
                            <button className="btn btn-danger btn-sm">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SachProps;   