// async: chờ cho đến khi data được phẩn hồi về thì thôi
export async function my_request(duongDan:string) {
    // Truy vấn đến duongDan
    // fetch(duongDan): Gửi một yêu cầu (request) đến đường dẫn để lấy dữ liệu.
    // await: Tạm dừng việc thực thi hàm cho đến khi yêu cầu hoàn tất và nhận được phản hồi (response).
    const response = await fetch(duongDan); // truy cập đường dẫn và lấy thông tin về

    // Nếu bị lỗi
    if(!response.ok){
        throw new Error(`Không thể truy cập ${duongDan}`);
    }

    // Lấy thành công
    // response.json(): Chuyển đổi phản hồi nhận được từ định dạng thô sang định dạng JSON (đối tượng JavaScript).
    // await: Đợi quá trình chuyển đổi dữ liệu hoàn tất.
    // const data = await response.json();
    const data = response.json();
    return data;

}

