// import React from 'react';
// import {Form, InputNumber, Rate, Select} from "antd";
//
// function Detail({data}) {
//     const {name,quantity,price,discount,NSX,category,createdAt,updatedAt,count,color} = data;
//     const discountFunction = (price, percent) => {
//         const discount = (price * percent) / 100;
//         return price - discount;
//     };
//     return (
//         <div className='product-info'>
//             <h1>
//                 {name}
//                 {quantity === 0 ? "(Đã hết hàng)" : null}
//             </h1>
//             <div className='info-more'>
//                 <div className='rate'>
//                     <Rate defaultValue={3} />
//                     <h3>Có 3 đánh giá cho sản phẩm này</h3>
//                 </div>
//                 <div>
//                     <span className='label'>Mã sản phẩm: </span>
//                     {product._id}
//                 </div>
//                 <div>
//                     <span className='label'>Nhãn giày:</span>
//                     {category}
//                 </div>
//                 <div>
//                     <span className='label'>Nhà sản xuất: </span>
//                     {NSX}
//                 </div>
//                 <div>
//                     <span className='label'>Ngày có mặt trên shop: </span>
//                     {createdAt}
//                 </div>
//                 <div>
//                     <span className='label'>Lần cật nhật sản phẩm của shop: </span>
//                     {updatedAt}
//                 </div>
//                 <div>
//                     <span className='label'>Số lượng tồn trong kho: </span>
//                     {quantity}
//                 </div>
//                 <div>
//                     <span className='label'>Giá sản phẩm </span>
//                     <b style={{ color: "red" }}>
//                         {price?.toLocaleString("vi-VN")} VNĐ
//                     </b>
//                 </div>
//                 {discount > 0 ? (
//                     <div>
//                 <span className='label'>
//                   Giảm: {discount}% ({" "}
//                     <b style={{ color: "red", fontSize: 30 }}>
//                     {discountFunction(
//                         price,
//                         discount
//                     ).toLocaleString("vi-VN")}
//                         VNĐ)
//                   </b>
//                 </span>
//                     </div>
//                 ) : null}
//             </div>
//             <div className='delivery'>
//                 <h3>Miễn phí vận chuyển toàn quốc</h3>
//             </div>
//             <Form
//                 className={"buy-form"}
//                 layout={"horizontal"}
//                 onFinish={handleSubmit}
//                 labelCol={{ span: 4 }}
//             >
//                 <h1>Thông tin cần thiết</h1>
//                 <Form.Item
//                     label={"Số lượng"}
//                     name={"count"}
//                     rules={[
//                         { required: true, message: "Số lượng không được để trống!" },
//                     ]}
//                 >
//                     <InputNumber min={1} max={quantity} size={"large"} />
//                 </Form.Item>
//
//                 <Form.Item
//                     label={"Màu sắc"}
//                     name={"color"}
//                     rules={[
//                         { required: true, message: "Số lượng không được để trống!" },
//                     ]}
//                 >
//                     <Select defaultValue={""} size={"large"}>
//                         {color.map((item, index) => (
//                             <Option key={index} value={item}>
//                                 {item}
//                             </Option>
//                         ))}
//                     </Select>
//                 </Form.Item>
//                 <Form.Item
//                     label={"Size"}
//                     name={"size"}
//                     rules={[
//                         { required: true, message: "Số lượng không được để trống!" },
//                     ]}
//                 >
//                     <Select size={"large"}>
//                         {size?.map((item, index) => (
//                             <Option key={index} value={item}>
//                                 {item}
//                             </Option>
//                         ))}
//                     </Select>
//                 </Form.Item>
//                 <div className='submit-button'>
//                     <button type='submit'>Thêm vào giỏ hàng</button>
//                 </div>
//             </Form>
//         </div>
//     );
// }
//
// export default Detail;