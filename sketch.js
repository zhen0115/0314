let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 背景顏色6a8eae
  background("#6a8eae");
  
  // 創建輸入文字框
  input = createInput(); // 預設文字內容
  input.position(10, 10); // 設定文字框位置
  input.size(300, 80);  // 設定文字框大小
  input.input(updateText); // 當輸入文字框內容改變時，執行updateText函數
  
  // 創建滑桿
  slider = createSlider(12, 30, 32); // 最小值12，最大值30，初始值32
  slider.position(400, 10); // 設定滑桿位置
  slider.size(100); // 設定滑桿寬度
  
  // 創建按鈕
  button = createButton('跳動');
  button.position(680, 10); // 設定按鈕位置
  button.size(100, 50); // 設定按鈕大小
  button.style('font-size', '24px'); // 設定按鈕文字大小
  button.mousePressed(toggleBounce); // 當按鈕被按下時，執行toggleBounce函數
  
  // 創建下拉式選單
  dropdown = createSelect();
  dropdown.position(800, 10); // 設定下拉式選單位置
  dropdown.size(100); // 設定下拉式選單寬度
  dropdown.option('淡江大學', 'https://www.tku.edu.tw/');
  dropdown.option('教育科技學系', 'https://www.et.tku.edu.tw/');
  dropdown.changed(updateIframe); // 當選項改變時，執行updateIframe函數
  
  // 創建iframe
  iframe = createElement('iframe');
  iframe.position(10, 100); // 設定iframe位置
  iframe.size(windowWidth - 100, windowHeight - 210); // 設定iframe大小
}

let textContent = "教科系"; // 預設文字內容

function updateText() { // 當輸入文字框內容改變時，執行此函數
  textContent = this.value(); // 更新文字內容
}

function toggleBounce() {
  isBouncing = !isBouncing; // 切換跳動狀態
}

function updateIframe() {
  let url = dropdown.value();
  iframe.attribute('src', url); // 更新iframe的src屬性
}

function draw() {
  // 清除背景
  background("#6a8eae");
  
  // 設定文字屬性
  fill(255);
  let textSizeValue = slider.value(); // 根據滑桿值設定文字大小
  textSize(textSizeValue); // 設定文字大小
  textAlign(LEFT, TOP); // 設定文字對齊方式
  
  // 設定文字內容和間隔
  let textWithSpace = textContent.split("").join(" ");
  
  // 計算文字的總寬度
  let textWidthWithSpace = textWidth(textWithSpace);
  
  // 計算需要顯示的文字數量
  let repeatCountX = Math.ceil(windowWidth / textWidthWithSpace);
  let repeatCountY = Math.ceil((windowHeight - 100) / textAscent());
  
  // 在視窗中間重複顯示文字
  for (let y = 0; y < repeatCountY; y++) {
    let yOffset = isBouncing ? random(-3, 3) : 0; // 如果跳動狀態為true，則設置隨機偏移量
    for (let x = 0; x < repeatCountX; x++) {
      text(textWithSpace, x * textWidthWithSpace, 100 + y * textAscent() + yOffset);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 110); // 更新iframe大小
}