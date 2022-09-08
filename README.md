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
