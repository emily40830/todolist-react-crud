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

- Tips1: 多一個 homepage 作為 網頁 loadable 的判斷
- Tips2: 一個 folder 內建議都有一個 index 稱為目錄索引
- Tips3: 可額外示範 pages 底下只有 page folder 的做法

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

7. feat: render dummy todo items

現在我們先產一批假資料，讓 collection 是有內容的
我們的 todo 資料包含三個欄位：id, title, 以及 是否完成
我們將資料帶入，注意在渲染列表的時候，為了讓瀏覽器可以正確識別每個 todoItem 是不同的元件
會額外帶入 key 的值，在這邊 key 我們可以用 todo.id 來呈現

8. styles: todo items
   現在畫面上看到的 todo item 跟其他文字都融合再一起了
   我們先來上樣式
   (設定一個 styled component wrapper，裡面的樣式斟酌說明)
   這邊我們也順便將會用到的素材放到 assets/images ， 再使用 index.js 輸出
   這邊可以讓我們在 todoitem 引入圖片的時候，不會隨著引用的圖片越多，讓上面的 import statement 有很多行

並且也將 toggle done 顯示出來
這邊我們會用到 clsx 這個套件，可以根據 目前資料的狀態顯示不同的 class name
我們這邊先帶入 isDone 顯示 todo 完成的樣子

9. feat: implement add todo
   基本的樣式我們完成後，現在要來實作新增 todo 的功能
   我們先為 todo input 加上樣式，這邊我們先將新增按鈕隱藏，讓輸入框有值的時候，再讓它顯示
   (show `StyledAddTodoActionContainer` 這段)

這邊我們會來帶大家看看，add to do input 與 todopage 的關係
(上投影片)

- 首先，todopage 會有一個 state 儲存當前輸入的值，同時我們將這個值帶給 Input
- 當使用者輸入文字時，會觸發 input 的 onChange 事件，因此我們也將這個 event 觸發時，要做的事定義好，在 page 命名為 handleInputChange
- 當我們確定輸入框有值時，就可以顯示 新增的 button ，同樣地我們使用 clsx 這個套件，用 inputValue 來決定是否要加上 active 這個 className
- 接下來輸入完代辦後，我們要將輸入的值儲存，這邊透過 button onClick 事件來觸發儲存的行為，在 page 層新增一個 handleAddTodo
- 這邊同樣透過 state 儲存 todos ，並帶入 collection ，在 handleAddTodo 中去更新 todos，這邊 id 的部分我們先給 一個 random number
  (到串 api 的 part 要記得 改成 帶入 callback function)

10. feat: implement keypress for add todo
    眼尖的同學應該會發現，我們的 todoinput 還有一個 props 沒有用到，也就是 onKeyPress
    由於我們只需要在點擊鍵盤的特定紐時才觸發行為，因此我們在 input 這層就可以決定何時要執行 父層帶給我們的 callback function
    這邊我們只需要監聽 Enter 點擊時，再去執行 onKeyPress

```
<input
    id="add-todo-input"
    type="text"
    ...
    onKeyPress={(e) => {
        if (e.key === 'Enter') {
            onKeyPress?.();
        }
    }}
    />
```

在 page 層，我們新增一 function handleKeyPress ，這邊做的事情與 handleAddTodo 相同

11. feat: implement toggle isDone

接下來我們來實作 mark done 的功能
(簡報講解元件之間的互動)

- 在 todoItem 的 icon 當他被點擊時，代表要更改 當前這筆 todo 的狀態
- 我們在 page 與 collection 都實作 handleToggleDone 的 function，觀察看看我們點擊其中一筆 todo item 時，父層元件是否會接收得到子層傳上來的 todo id
- 確定在 page 層可以抓得到傳上來的 page id 後，我們在 page 層更改 todos state
- 在 setTodos 的時候，我們傳入一個 callback function 來獲得前一次的資料狀態，透過此資料的回傳值更新 todo 狀態

(demo 功能)

接下來我們來實作 編輯功能，這邊已經列點好底下的規格

- double click item text 後，顯示編輯輸入框
- 在輸入框修改後 todo 後，點擊 enter 更新 todo 項目
- 在編輯輸入框修改後 todo 後，點擊 esc 放棄編輯後的結果

12. styles: implement todo item in editor mode

我們先來新增樣式的部分

1. 在這邊我們為 todo 新增一個 isEdit 的 property 來代表它是否為編輯模式，並且透過 double click 切換此狀態，這邊的邏輯跟 toggleDone 相同
2. 接著我們來為 editor mode 的 item 加上相應的 ui ，我們新增一個輸入框，讓他在切換成 editor mode 的時候出現，並將原本的文字隱藏，也將刪除按鈕隱藏

---

13. feat: implement update todo title at todo item

由規格中我們可以知道，在編輯模式的過程我們需要知道當前編輯的內容為何，這個時候我們可以使用 useRef 這個 hook
這個 hook 的使用如下

```
  const inputRef = useRef(null);

 <input
          ref={inputRef}
          className="task-item-body-input"
          defaultValue={todo.title}
        />

```

這樣就可以 透過 inputRef.value 來獲取 input 當前的值為何
目前為止，我們可以知道， item 會有 從父層 props 傳進來的初始值，以及保留在內部隨著使用者輸入的 input 值
確保可以獲得兩個值後，我們就可以針對使用者後續的操作來決定是否要更新內容，還是保留原本的狀態即可

- 點擊 enter: 更新 todo item 內容為 inputRef.current.value
- 點擊 esc: 跳出編輯模式，回到 item 原始的狀態

注意這邊我們在設定 input value 時，要用 defaultValue 這個 props 來指定初始狀態，否則編輯的時候，由於 value 已經被固定住，則會出現無法輸入的狀況
(demo)
到這邊我們可以發現，在 double click 後可以出現輸入框，但這時點擊鍵盤卻不會觸發任何事件，為什麼會這樣呢？
因為輸入框出現後，我們必須將焦點轉向它，才有辦法透過它 監聽到鍵盤點擊的事件

我們這裡透過 todo.isEdit 為 true 時，自動 focus 到輸入框吧！

```
 useEffect(() => {
    if (todo.isEdit && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [todo.isEdit]);

```

14. feat: implement update todo title at todo page and collection

接下來我們來加上 save 的功能吧！
注意在實作 handleSave 功能的時候，要把編輯的資料狀態也改成 isEdit: false

(補充說明 control vs uncontrolled 的寫法)
當不確定如何使用時，記住一個觀念：不要把 props 當成初始狀態

15. feat: implement delete
    (學生自己做)
