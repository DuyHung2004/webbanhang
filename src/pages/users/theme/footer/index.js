import { memo } from "react";
import "./style.scss"
import { Link } from "react-router-dom";

const Footer = ()=>{
    return <footer className="footer">
        <div className="container">
            <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="footer_about">
                    <h2 className="footer_about_phone">
                        Tổng Đài Miễn Phí
                    </h2>
                    <ul>
                        <li>
                            Tư vấn mua hàng <br/>
                            1234.5678
                        </li>
                        <li>
                            Hỗ trợ kỹ thuật <br/>
                            1234.7890
                        </li>
                        <li>
                            Góp ý, khiếu nại <br/>
                            0123.4567
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="footer_widget">
                <h2>Về Chúng Tôi</h2>
                    <ul>
                
                        <li>
                            <Link to="" >Giới thiệu</Link>
                        </li>
                        <li>
                            <Link to="" >Sản phẩm kinh doanh</Link>
                        </li>
                        <li>
                            <Link to="" >Danh sách ưu thích</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="" >Chính sách bảo hành</Link>
                        </li>
                        <li>
                            <Link to="" >Chính sách đổi trả</Link>
                        </li>
                        <li>
                            <Link to="" >Chính sách trả góp</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <div className="footer_widget">
                    <p>Đăng Ký Nhận Khuyến Mãi</p>
                    <form action="#">
                        <div>
                            <input type="text" placeholder="Nhập email của bạn"/>
                            <button type="submit" className="button-submit">Đăng ký</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </footer>
}

export default memo(Footer);