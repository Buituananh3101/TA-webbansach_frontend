export async function my_request(duongDan:string) {
    const response = await fetch(duongDan);

    if(!response.ok){
        throw new Error(`Không thể truy cập ${duongDan}`);
    }

    const data = response.json();
    return data;
}
