# Todolist prepare

錄製前的步驟拆解

1. feat: init

使用 create-react-app 這個 腳手架建立專案後，要做的一些前置作業。
- 程式碼排版設定 （講師自己的習慣設置，同學可以參考
- 刪除不需要的檔案或 css 設定
- 界定清楚副檔名， return 到外部的內容是一個 react component 的話，副檔名一律用 jsx

2. feat: create folder structure

大致分好專案架構，用 gitkeep 讓 git 可以記錄到空的 folder
- components: 置放 react 元件
- pages: 放畫面元件
- assets: 靜態檔案，例如：icon, 圖片

3. feat: add router and pages

觀察專案結構，可以拆分成幾個頁面，並使用 react-router-dom 建立路由
- 新增 Login, SignUp, Todo, Home
- 安裝 react-router-dom
- 使用 BrowserRouter, Routes, Route 建立對應的路由

(Demo 一下目前的狀態，可以看到沒有被 browser router 包到的部分不會隨著路由改變)
* Tips1: 多一個 homepage 作為 網頁 loadable 的判斷
* Tips2: 一個 folder 內建議都有一個 index 稱為目錄索引
* Tips3: 可額外示範 pages 底下只有 page folder 的做法


4. styles: add global styles

設定專案全局的 css 樣式 在 app.css

5. feat: add components for todo page

一切與 api 相關的操作放在 page 
為了要讓 page 知道要刪減更新哪些元件
必須要監聽子元件的各種 event

依照設計稿，可以看出 todo page 的結構包含 上方一個 header, footer, 一個 輸入框還有 todo 列表
我們先就目前的結構新增元件
接著，我們來思考這些元件會需要哪些 props，這時候保持一個觀念，在設計這些元件時必須賦予其複用性
例如以 header 來說，我希望這個元件保有它的樣式，但標題與右方的名字是可以隨著資料的代換做調整
因此我將 username 的部分由 props 帶入; 
footer 的部分會列出 目前有多少筆 todo item 因此也將這個數值定成 props
Input 的部分我們會將當前輸入的值帶入，也會需要監聽數值的變化(onChange)，以及鍵盤的事件(onKeyPress)，還有新增 todo (onAddTodo)
接下來我們將這些元件放到 page 做組裝
- TodoCollection：將 todos data 透過 map render 出每筆 TodoItem
- TodoPage: 引入所有檔案後組裝
這時候 我們的 todo page 已經有完整的架構了

6. feat: implement header and footer

接下來，我們要來實作 header 與 footer，我們先安裝 styled-component 以及 node-sass 這個 package 
為 header 與 footer 加上樣式與細節
