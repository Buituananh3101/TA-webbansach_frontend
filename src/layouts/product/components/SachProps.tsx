    import React, { useEffect, useState } from "react";
    import SachModel from "../../../model/SachModel";
    import HinhAnhModel from "../../../model/HinhAnhModel";
    import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";

    interface SachPropsInterface{
        sach: SachModel;
    }

    const SachProps: React.FC<SachPropsInterface> = (props) => {

        const maSach:number= props.sach.maSach;
        const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
        const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
        const [baoLoi,setBaoLoi] = useState(null);

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
            },[] // Chỉ gọi một lần
        )


        if(dangTaiDuLieu){
            return(
                <div>  
                    <h1>Đang tải dữ liệu</h1>
                </div>
            )
        }

        if(baoLoi){
            return(
                <div>
                    <h1>Gặp lỗi: {baoLoi}</h1>
                </div>
            )
        }

        // console.log(danhSachAnh[0]);


        return (
            <div className="col-md-3 mt-2">
                <div className="card">
                    {
                        danhSachAnh[0] && danhSachAnh[0].duLieuAnh && <img
                        src={`${danhSachAnh[0].duLieuAnh}`}
                        className="card-img-top"
                        alt={props.sach.tenSach}
                        style={{ height: '200px' }}
                    />
                    }
                    

                    <div className="card-body">
                        <h5 className="card-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.sach.tenSach}</h5>
                        <p className="card-text" style={{ 
                            display: '-webkit-box', 
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: 'vertical', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            height: '3rem' // Adjust based on line-height to keep layout consistent
                        }}>
                            {props.sach.moTa}
                        </p>
                        <div className="price">
                            <span className="original-price">
                                <del>{props.sach.giaNiemYet}</del>
                            </span>
                            <span className="discounted-price">
                                <strong>{props.sach.giaBan}</strong>
                            </span>
                        </div>

                        <div className="row mt-2" role="group">
                            <div className="col-6">
                                <a href="#" className="btn btn-secondary btn-block">
                                    <i className="fas fa-heart"></i>
                                </a>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-danger btn-block">
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