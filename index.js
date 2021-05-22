//基本介面及 text 欄位事件
let input_task_name = document.getElementsByClassName("task_name")[0];

input_task_name.addEventListener("focus", function(){
  this.closest("div.task_add_block").classList.add("-on");
});

input_task_name.addEventListener("blur", function(){
  this.closest("div.task_add_block").classList.remove("-on");
});

let button_task_add = document.getElementsByClassName("task_add")[0];
let take_list = document.getElementsByClassName("task_list")[0];
let take_list_li;
let item_flex;
//left block
let left_block;
let btn_flex1;
let btn_up;
let btn_down;
//middle block
let middle_block;
let star_block;
let star;
let para;
//right block
let right_block;
let btn_flex2;
let btn_update;
let btn_delete;


function add(content){
  let item_id = Date.now();
  
  take_list_li = document.createElement("li");
  item_flex = document.createElement("div");
  take_list_li.setAttribute("data-id", item_id);

  //left block
  left_block = document.createElement("div");
  btn_flex1 = document.createElement("div");
  btn_up = document.createElement("button");
  btn_up.innerHTML = "往上";
  btn_up.setAttribute("type", "button");
  btn_down = document.createElement("button");
  btn_down.innerHTML = "往下";
  btn_down.setAttribute("type", "button");
  btn_flex1.appendChild(btn_up);
  btn_flex1.appendChild(btn_down);
  left_block.appendChild(btn_flex1);


 //middle block
  middle_block = document.createElement("div");
  star_block = document.createElement("div");

  for(let i = 0; i < 5; i++){
    star = document.createElement("span");
    star.setAttribute("data-star", i+1)
    star.innerHTML = "<i class="+'"fas fa-star"'+"></i>";
    star.className = "star";
    star_block.appendChild(star)
  }
  middle_block.appendChild(star_block);
  para = document.createElement("p");
  middle_block.appendChild(para);

  //right block
  right_block = document.createElement("div");
  btn_flex2 = document.createElement("div");
  btn_update = document.createElement("button");
  btn_update.innerHTML = "更新";
  btn_update.setAttribute("type", "button");
  btn_delete = document.createElement("button");
  btn_delete.innerHTML = "移除";
  btn_delete.setAttribute("type", "button");
  btn_flex2.appendChild(btn_update);
  btn_flex2.appendChild(btn_delete);
  right_block.appendChild(btn_flex2);

  item_flex.appendChild(left_block);
  item_flex.appendChild(middle_block);
  item_flex.appendChild(right_block);
  take_list_li.appendChild(item_flex);
  take_list.insertAdjacentElement("afterbegin", take_list_li);

  item_flex.className = "item_flex";
  left_block.className = "left_block";
  btn_flex1.className = "btn_flex";
  btn_flex2.className = "btn_flex";
  btn_up.className = "btn_up";
  btn_down.className = "btn_down";
  middle_block.className  = "middle_block";
  star_block.className = "star_block";

  para.className = "para";
  right_block.className = "right_block";
  btn_update.className = "btn_update";
  btn_delete.className = "btn_delete";

  para.innerHTML = content;

  //新增資料至 localStorage
  let task = {
    "item_id": item_id,
    "name": content, // 新增的待辦事項文字
    "star": 0 // 預設 0
  };
  let tasks = JSON.parse(localStorage.getItem("tasks"));
    if(tasks){ // 若存在
      tasks.unshift(task);
    }else{ // 若不存在
      tasks = [task];
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
//從 localStorage 取得資料
function get_tasks(){
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if(tasks){
    let list_html = "";
    tasks.forEach(function(item, i){

      take_list_li = document.createElement("li");
      item_flex = document.createElement("div");

      take_list_li.setAttribute("data-id", `${item.item_id}`);
      //left block
      left_block = document.createElement("div");
      btn_flex1 = document.createElement("div");
      btn_up = document.createElement("button");
      btn_up.innerHTML = "往上";
      btn_up.setAttribute("type", "button");
      btn_down = document.createElement("button");
      btn_down.innerHTML = "往下";
      btn_down.setAttribute("type", "button");
      btn_flex1.appendChild(btn_up);
      btn_flex1.appendChild(btn_down);
      left_block.appendChild(btn_flex1);


    //middle block
      middle_block = document.createElement("div");
      star_block = document.createElement("div");

      for(let i = 0; i < 5; i++){
        star = document.createElement("span");
        star.setAttribute("data-star", i+1)
        star.innerHTML = "<i class="+'"fas fa-star"'+"></i>";
        star.className = "star";
        star_block.appendChild(star)
      }
      middle_block.appendChild(star_block);
      para = document.createElement("p");
      middle_block.appendChild(para);

      //right block
      right_block = document.createElement("div");
      btn_flex2 = document.createElement("div");
      btn_update = document.createElement("button");
      btn_update.innerHTML = "更新";
      btn_update.setAttribute("type", "button");
      btn_delete = document.createElement("button");
      btn_delete.innerHTML = "移除";
      btn_delete.setAttribute("type", "button");
      btn_flex2.appendChild(btn_update);
      btn_flex2.appendChild(btn_delete);
      right_block.appendChild(btn_flex2);

      item_flex.appendChild(left_block);
      item_flex.appendChild(middle_block);
      item_flex.appendChild(right_block);
      take_list_li.appendChild(item_flex);
      take_list.insertAdjacentElement("afterbegin", take_list_li);

      item_flex.className = "item_flex";
      left_block.className = "left_block";
      btn_flex1.className = "btn_flex";
      btn_flex2.className = "btn_flex";
      btn_up.className = "btn_up";
      btn_down.className = "btn_down";
      middle_block.className  = "middle_block";
      star_block.className = "star_block";

      para.className = "para";
      right_block.className = "right_block";
      btn_update.className = "btn_update";
      btn_delete.className = "btn_delete";

      para.innerHTML = item.name;
    });

  }
}
//重整按鈕 觸發取得資料
document.addEventListener("DOMContentLoaded", function(){
  get_tasks();
});

/*新增按鈕觸發*/
button_task_add.onclick = function(){
  if(input_task_name.value == ""){
    alert("輸入東西啊!")
  }else{
    let addcontent = input_task_name.value.trim();
    add(addcontent);
    input_task_name.value = "";
  }
};

/*Enter按鈕觸發*/
input_task_name.addEventListener("keyup", function(e){
  if(e.which == 13){
    if(input_task_name.value == ""){
      alert("輸入東西啊!")
    }else{
      let addcontent = input_task_name.value.trim();
      add(addcontent);
      input_task_name.value = "";
    }
  }
});

/* 清空按紐*/
let btn_empty = document.getElementsByClassName("btn_empty")[0];
let li = take_list.getElementsByTagName("li");

btn_empty.addEventListener("click", function(){
  if(confirm("你確定要刪除嗎?")){
    for(let i = li.length; i > 0; i--){
      li[0].remove();
    };
    localStorage.clear();
  };
});


document.addEventListener("click", function(e){
  /*移除按鈕*/
  if(e.target.classList.contains("btn_delete")){ 
    let targetLi = e.target.parentNode.parentNode.parentNode.parentNode
    if (confirm("你確定要刪除嗎？")) {  
      targetLi.className = "fade_out";
      setTimeout(function(){
        targetLi.remove();
      }, 1000);

      // 取得待辦事項的 id
      let item_id = e.target.closest("li").getAttribute("data-id");
      // 從 localStorage 取得資料
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      // 準備用來放要存到 localStorage 裡的資料
      let updated_tasks = [];

      tasks.forEach(function(task, i){
        if(item_id != task.item_id){ // id 不相同的時候
          updated_tasks.push(task); // 將物件資料放至新的陣列中
        }
      });
      // 回存至 localStorage
      localStorage.setItem("tasks", JSON.stringify(updated_tasks));
    };
  }

  /*更新待辦事項*/
  if(e.target.classList.contains("btn_update")){
    //要判斷是否有已經有INPUT標籤
    let task_name_update;
    let taskNameUpdate;
    let updatePara ;
    if(!e.target.parentNode.parentNode.previousElementSibling.getElementsByTagName("input")[0]){
      task_name_update = document.createElement("input");
      task_name_update.setAttribute("type", "text");
      task_name_update.setAttribute("class", "task_name_update -none");
      task_name_update.setAttribute("placeholder", "更新待辦事項…");
      task_name_update.setAttribute("value", e.target.parentNode.parentNode.previousElementSibling.querySelector("p").innerHTML);
      e.target.parentNode.parentNode.previousElementSibling.appendChild(task_name_update);
      updatePara = e.target.parentNode.parentNode.parentNode.firstChild.nextSibling.lastChild.previousSibling;
        if(task_name_update.classList.contains("-none")){
          task_name_update.classList.remove("-none");
          updatePara.classList.add("-none");
        }
    }else{
      if(e.target.parentNode.parentNode.previousElementSibling.querySelector("input").getAttribute("class") == "task_name_update"){
        let inputValue = e.target.parentNode.parentNode.previousElementSibling.querySelector("input").value;//ask
        // let pValue = e.target.parentNode.parentNode.previousElementSibling.querySelector("p").innerHTML;//ask    
        let pValue = e.target.parentNode.parentNode.previousElementSibling.querySelector("p");
        // console.log(inputValue, pValue)
        pValue.innerHTML = inputValue
        e.target.parentNode.parentNode.previousElementSibling.querySelector("input").classList.add("-none");
        e.target.parentNode.parentNode.previousElementSibling.querySelector("p").classList.remove("-none");
        // 取得待辦事項的 id
        let item_id = e.target.closest("li").getAttribute("data-id");
        console.log(item_id)
        // 從 localStorage 取得資料
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        console.log(tasks)
        tasks.forEach(function(task, i){
          if(item_id == task.item_id){ // id 相同
            tasks[i].name = inputValue;
            console.log(tasks) // 資料更新
          }
        });
        // 回存至 localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }else{
        e.target.parentNode.parentNode.previousElementSibling.querySelector("input").classList.remove("-none");
        e.target.parentNode.parentNode.previousElementSibling.querySelector("p").classList.add("-none");       
      }
    }
  };
  
  //up and down (up)
  if(e.target.classList.contains("btn_up")){
    let li = e.target.parentNode.parentNode.parentNode.parentNode;
    let pre_li = li.previousElementSibling;
    let ul = li.parentNode
    let item_id = e.target.closest("li").getAttribute("data-id");
    if(pre_li){
      ul.insertBefore(li, pre_li);
    };
    items_sort(item_id, "up")
  };
  //up and down(down)
  if(e.target.classList.contains("btn_down")){
    let li = e.target.parentNode.parentNode.parentNode.parentNode;
    let next_li = li.nextElementSibling;
    let ul = li.parentNode;
    let item_id = e.target.closest("li").getAttribute("data-id");
    if(next_li){
      ul.insertBefore(next_li, li);
    };
    items_sort(item_id, "down")
  };

  //星號重要性
  if(e.target.closest("span")){
    let span_el = e.target.closest("span");
    let current_star = span_el.getAttribute("data-star");
    // console.log(current_star);
    if(span_el.classList.contains("star")){
      let star_span = span_el.closest("div.star_block").querySelectorAll("span");
      star_span.forEach(function(star_item, i){
        if(star_item.getAttribute("data-star") <= current_star){
          star_span[i].classList.add("-on");
        }else{
          star_span[i].classList.remove("-on");
        }
      })
      // 取得待辦事項的 id
      let item_id = span_el.closest("li").getAttribute("data-id");
      // 從 localStorage 取得資料
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.forEach(function(task, i){
        if(item_id == task.item_id){ // id 相同
          tasks[i].star = current_star; // 更新星號數
        }
      });
      // 回存至 localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
});

//更新 localStorage 中的排序
function items_sort(item_id, direction){

  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if(direction == "up"){ // 往上
    let current_li_index;
    let current_li_data;
    let before_li_data;

    tasks.forEach(function(task, i){
      if(item_id == task.item_id){
        current_li_index = i; // 取得點擊的那項 li 的索引值
        current_li_data = task; // 取得點擊到的那項 li 的資料
        before_li_data = tasks[i - 1]; // 取得點擊到的那項 li 的前一項資料
      }
    });
    tasks[current_li_index - 1] = current_li_data;
    tasks[current_li_index] = before_li_data;
  }

  if(direction == "down"){ // 往下
    let current_li_index;
    let current_li_data;
    let after_li_data;

    tasks.forEach(function(task, i){
      if(item_id == task.item_id){
        current_li_index = i; // 取得點擊的那項 li 的索引值
        current_li_data = task; // 取得點擊到的那項 li 的資料
        after_li_data = tasks[i + 1]; // 取得點擊到的那項 li 的下一項資料
      }
    });
    tasks[current_li_index] = after_li_data;
    tasks[current_li_index + 1] = current_li_data;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}