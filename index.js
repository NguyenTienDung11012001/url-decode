document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnPaste").addEventListener("click", pasteFromClipboard);
  document.getElementById("btnRemove").addEventListener("click", removeSpaces);
  document.getElementById("btnDecode").addEventListener("click", hexDecode);
  document.getElementById("btnFix").addEventListener("click", fixLink);
  document.getElementById("btnConvert").addEventListener("click", convertVietnamese);
  document.getElementById("btnClear").addEventListener("click", clearInput);
  document.getElementById("btnCopy").addEventListener("click", copyOutput);
});

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

function fixLink() {
    let input = document.getElementById('userInput').value;
    let fixedInput = input;

    // 1. Protocol fixes
    fixedInput = fixedInput.replace(/hxxps/gi, 'https')
                           .replace(/hxxp/gi, 'http')
                           .replace(/\[:\/\/\]|\[:\]\/\//gi, '://');

    // 2. Dot fixes (comprehensive)
    fixedInput = fixedInput.replace(/\[\.\]|\(\.\)|\[dot\]|\(dot\)|\{\.\}/gi, '.');

    // 3. At symbol fixes
    fixedInput = fixedInput.replace(/\[at\]|\(at\)/gi, '@');
    
    // 4. Slash fixes (replace backslashes with forward slashes)
    fixedInput = fixedInput.replace(/\\/g, '/');

    // 5. Decode URL-encoded characters (e.g., %2F -> /)
    try {
        fixedInput = decodeURIComponent(fixedInput);
    } catch (e) {
        console.error("Could not decode URI component: ", e);
        // If decoding fails, we can still proceed with the partially fixed string
    }

    // Update the textarea and the output
    document.getElementById('userInput').value = fixedInput;
    const output = document.getElementById('output');
    const isValidUrl = /^https?:\/\//i.test(fixedInput);

    if (isValidUrl) {
        output.innerHTML = `<a href="${fixedInput}" target="_blank">${fixedInput}</a>`;
    } else {
        output.innerHTML = `<span>${fixedInput}</span>`;
    }
}

function convertVietnamese() {
    let input = document.getElementById('userInput').value.trim();
    let output = document.getElementById('output');

    // Convert Vietnamese to non-accented
    let nonAccented = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, 'd').replace(/Đ/g, 'D');

    // Replace spaces with hyphens and convert to lowercase
    let slug = nonAccented.replace(/\s+/g, '-').toLowerCase();

    output.innerHTML = `<span>${slug}</span>`;
}

function copyOutput() {
    const output = document.getElementById('output');
    const textToCopy = output.innerText;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Đã sao chép kết quả vào clipboard!');
        }).catch(err => {
            console.error('Không thể sao chép:', err);
            alert('Sao chép thất bại!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            alert('Đã sao chép kết quả vào clipboard!');
        } catch (err) {
            console.error('Fallback: Không thể sao chép:', err);
            alert('Sao chép thất bại!');
        }
        document.body.removeChild(textArea);
    }
}