function displayContent() {
    // Lấy giá trị từ ô input
    let input = document.getElementById('userInput').value;
  
    // Loại bỏ tất cả khoảng trắng trong chuỗi
    input = input.replace(/\s+/g, '');
  
    // Hiển thị nội dung đã xử lý lên màn hình
    const output = document.getElementById('output');
    output.textContent = input;
  }
  
  function copyContent() {
    // Lấy nội dung đã hiển thị
    const output = document.getElementById('output').textContent;
  
    if (output) {
      // Tạo một phần tử tạm để copy nội dung
      const tempInput = document.createElement('textarea');
      tempInput.value = output;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
  
      // Hiển thị thông báo thành công
      alert('Nội dung đã được copy vào clipboard!');
    } else {
      alert('Không có nội dung để copy!');
    }
  }
  