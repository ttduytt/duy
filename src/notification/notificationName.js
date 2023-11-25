module.exports= function hienThiThongBao(message) {
    const div = document.createElement('div');
    div.textContent = message;
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.backgroundColor = 'lightgray';
    div.style.padding = '20px';
    div.style.border = '2px solid black';
    div.style.zIndex = '1000';
    document.body.appendChild(div);
  }
  
