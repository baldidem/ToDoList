const newTask = document.querySelector(".input-task");
const newTaskBtn = document.querySelector(".btn-task-add");
const taskList = document.querySelector(".task-list");


newTaskBtn.addEventListener("click",function(e) {
    let value = newTask.value;
    if (value.length > 0) {
        //Buraya yeni görev ekleme kodları gelecek.
        
        addNewTask(value);   
        saveLocalStorage(value); //jason dosyası. local storagete jason formatında tutuyo tarayıcı. 
        newTask.value = "";
        newTask.focus(); //yukarda klay yazalım diye value değişkenine atadık newTask valueyu.
        // LocalStorage'e görevlerin kaydedilmesini sağlayacak kodlar buraya gelecek.     
    } else {
        alert("Task description cannot be empty!");        
    }
} 
);

function saveLocalStorage(task) {
    let tasks = convertToArray(); 
    tasks.push(task); //push komutu dona ekliyor. boşsa zaten birinci olarak ekler. 
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function convertToArray() {
    let tasks;
    if (localStorage.getItem("tasks") == null) { //boşsa boş dizi oluştur
        tasks = [];
        
    } else {
    tasks = JSON.parse(localStorage.getItem("tasks")); //içinde kayıtlıysa bir şeyler onları al tut
    }
    return tasks; //boş ya da içi doldurulmuş diziyi döndür.
}

function getLocalStorage() {
    let tasks = convertToArray();
    tasks.forEach(function(task) {
        addNewTask(task); //döngü her döndğünde dizideki herbir elemana erişecek. her döndüğünde sıradaki elemanın adına task diyecek. sıradaki task addnewtaske yollanıyor. ikinci elemana geçip onun için oluşturup ekrana basacak. console/application/localstorage.       
    });
}

getLocalStorage();
 function removeFromLocalStorage(task) {
    let tasks = convertToArray();
    const indexDeletedTask = tasks.indexOf(task);
    // console.log(indexDeletedTask); //evde bunu çalıştır.
    tasks.splice(indexDeletedTask,1);
    localStorage.setItem("tasks",JSON.stringify(tasks)); //stringify diziyi jsona dönüştürüyor parseın tersi.
 }
function addNewTask(inputValue) {
    //task-item div'ini oluşturuyoruz. 
    //değişkenleri tırnak içinde yazmıyoruz.
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");


    //task-description li'sini oluşturuyoruz.
    const taskLi = document.createElement("li");
    taskLi.classList.add("task-description");
    taskLi.innerText = inputValue;
    taskDiv.appendChild(taskLi);

    //task-btn-ok butonunu oluşturuyoruz.
    const taskBtnOk = document.createElement("buton");
    taskBtnOk.classList.add("task-btn");
    taskBtnOk.classList.add("task-btn-ok");
    taskBtnOk.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    taskDiv.appendChild(taskBtnOk);

    //task-btn-del butonunu oluşturuyoruz.
    const taskBtnDel = document.createElement("buton");
    taskBtnDel.classList.add("task-btn");
    taskBtnDel.classList.add("task-btn-del");
    taskBtnDel.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    taskDiv.appendChild(taskBtnDel);

    taskList.appendChild(taskDiv);
//butonları ve li'yi dive attık. containera bi şey yapmadık. 
};


//alert her şeyi string bekler.
taskList.addEventListener("click", function(e) {
    const clickedElement = e.target;
    // console.log(clickedElement);
    if (clickedElement.classList.contains("task-btn-ok")) {
        // console.log(clickedElement.parentElement.classList);
        //toggle varsa kaldırıyor yoksa ekliyor.
        clickedElement.parentElement.classList.toggle("task-ok");  
        //toggledaki task-ok css iççinde. task-ok de bir class. o claası classliste uygula diyoruz yani.
        
    }
    if (clickedElement.classList.contains("task-btn-del")) {
        // const cvp = confirm("Silmek istediğine emin misin?");
        // if (cvp) {
        // clickedElement.parentElement.remove();
        // } ; //bu benim yaptığım.


        if(confirm("Are you sure to delete this task?")) {
            const deleteTask = clickedElement.parentElement.children[0].innerText;
            // console.log(deleteElement); //evde çalışırken bunu çalıştırıp bak.
            clickedElement.parentElement.remove();
            removeFromLocalStorage(deleteTask);
        };


    }

});








