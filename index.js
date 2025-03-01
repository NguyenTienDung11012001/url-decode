function removeSpaces() {
    // Lấy giá trị từ ô input
    let input = document.getElementById('userInput').value;

    // Loại bỏ tất cả khoảng trắng và dấu ngoặc ()
    input = input.replace(/[\s()]+/g, '');

    // Kiểm tra nếu là URL hợp lệ và tạo thẻ <a> có href
    const output = document.getElementById('output');
    const isValidUrl = /^https?:\/\//i.test(input); // Kiểm tra nếu input là một URL hợp lệ

    if (isValidUrl) {
        output.innerHTML = `<a href="${input}" target="_blank">${input}</a>`; // Gán href vào thẻ <a>
    } else {
        output.innerHTML = `<span>${input}</span>`; // Nếu không phải URL, chỉ hiển thị như text
    }
}

function hexDecode() {
    // Lấy giá trị từ ô input
    const input = document.getElementById('userInput').value;

    try {
        // Giải mã hex
        const decoded = input
            .replace(/\s+/g, '') // Loại bỏ khoảng trắng
            .match(/.{1,2}/g) // Chia thành các cặp 2 ký tự
            .map(byte => String.fromCharCode(parseInt(byte, 16))) // Chuyển từ hex sang ký tự
            .join(''); // Ghép thành chuỗi

        // Kiểm tra nếu là URL hợp lệ và tạo thẻ <a> có href
        const output = document.getElementById('output');
        const isValidUrl = /^https?:\/\//i.test(decoded); // Kiểm tra nếu decoded là một URL hợp lệ

        if (isValidUrl) {
            output.innerHTML = `<a href="${decoded}" target="_blank">${decoded}</a>`; // Gán href vào thẻ <a>
        } else {
            output.innerHTML = `<span>${decoded}</span>`; // Nếu không phải URL, chỉ hiển thị như text
        }
    } catch (error) {
        alert('Chuỗi hex không hợp lệ! Vui lòng kiểm tra lại.');
    }
}

function clearInput() {
    document.getElementById('userInput').value = ''; // Xóa nội dung ô input
    document.getElementById('output').innerHTML = 'Kết quả sẽ hiển thị ở đây'; // Xóa nội dung output
}

function pasteFromClipboard() {
    // Kiểm tra xem trình duyệt có hỗ trợ Clipboard API không
    if (!navigator.clipboard) {
        alert('Trình duyệt không hỗ trợ dán từ clipboard. Vui lòng dán thủ công bằng Ctrl+V hoặc nhấp chuột phải.');
        return;
    }

    // Sử dụng Clipboard API để đọc nội dung từ clipboard
    navigator.clipboard.readText()
        .then(text => {
            // Điền nội dung từ clipboard vào ô input
            document.getElementById('userInput').value = text;
        })
        .catch(err => {
            // Xử lý lỗi nếu quyền bị từ chối hoặc có vấn đề khác
            alert('Không thể truy cập clipboard. Vui lòng cấp quyền hoặc dán thủ công.');
            console.error('Lỗi khi dán từ clipboard:', err);
        });
}