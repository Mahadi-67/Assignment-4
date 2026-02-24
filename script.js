let interviewList = [];
let rejectedList = [];

let currentTab = "all";

let countTotal= document.getElementById('count-total');
let countInterview= document.getElementById('count-interview');
let countRejected= document.getElementById('count-rejected');
let tabCount= document.getElementById('tab-count');


let allButton = document.getElementById('all');
let interviewButton = document.getElementById('interview');
let rejectedButton = document.getElementById('rejected');


const allCardSection = document.getElementById('all-cards');
const buttonSection =  document.getElementById('Button');
const filterSection = document.getElementById('Filtered-Section');

function statusColorClass(status) {
  if (status === "INTERVIEW") return "text-green-500";
  if (status === "REJECTED") return "text-red-500";
  return "text-gray-500";
}


function calculateCount(){
    countTotal.innerText = allCardSection.children.length;
    tabCount.innerText = allCardSection.children.length;
    countInterview.innerText = interviewList.length;
    countRejected.innerText = rejectedList.length;
}
calculateCount();

function toggleStyles(id){
    
    currentTab = id;

    [allButton, interviewButton, rejectedButton].forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline');
    });
  
    const activeBtn = document.getElementById(id);
    activeBtn.classList.remove("btn-outline");
    activeBtn.classList.add("btn-primary");
  
    // show/hide sections properly
    if (id === 'all') {
      allCardSection.classList.remove('hidden');
      filterSection.classList.add('hidden');
      tabCount.innerText = allCardSection.children.length;
    }
    else {
      allCardSection.classList.add('hidden');
      filterSection.classList.remove('hidden');
  
      if (id === 'interview') renderInterview();
      if (id === 'rejected') renderRejected(); 
    }
  }


allCardSection.addEventListener('click',function(event){
    

  // DELETE from ALL tab
  if (event.target.closest('.delete-btn')) {
    const parentNode = event.target.closest('[data-status]');
    const name = parentNode.querySelector('.Name').innerText;

    // remove from lists
    interviewList = interviewList.filter(item => item.name !== name);
    rejectedList = rejectedList.filter(item => item.name !== name);

    // remove from DOM
    parentNode.remove();

    calculateCount();
    return;
  }

    if(event.target.classList.contains('interview-btn')){
    const parentNode = event.target.closest('[data-status]');
    const name = parentNode.querySelector('.Name').innerText
    const designation = parentNode.querySelector('.Designation').innerText
    const info = parentNode.querySelector('.Info').innerText
    const status = parentNode.querySelector('.Status').innerText
    const notes = parentNode.querySelector('.notes').innerText

  
    const cardInfo={
        name,
        designation,
        info,
        status,
        notes,
    };


    const nameExist = interviewList.find(item => item.name == name)

   const statusEl = parentNode.querySelector('.Status');
   statusEl.innerText = "INTERVIEW";
   statusEl.classList.remove("text-green-500", "text-red-500");
   statusEl.classList.add("text-green-500");
   cardInfo.status="INTERVIEW"



   if(!nameExist){
    interviewList.push(cardInfo)
   }

   rejectedList = rejectedList.filter(item => item.name != cardInfo.name)

   calculateCount();
   if(currentTab === "interview") renderInterview();

  
    }

    else if(event.target.classList.contains('Rejected-btn')){
      const parentNode = event.target.closest('[data-status]');
      const name = parentNode.querySelector('.Name').innerText
      const designation = parentNode.querySelector('.Designation').innerText
      const info = parentNode.querySelector('.Info').innerText
      const status = parentNode.querySelector('.Status').innerText
      const notes = parentNode.querySelector('.notes').innerText
  
    
      const cardInfo={
          name,
          designation,
          info,
          status,
          notes,
      };
  
  
      const nameExist = rejectedList.find(item => item.name == name)
  
     const statusEl = parentNode.querySelector('.Status');
     statusEl.innerText = "REJECTED";
     statusEl.classList.remove("text-green-500", "text-red-500");
     statusEl.classList.add("text-red-500");
     cardInfo.status="REJECTED"
  
  
  
     if(!nameExist){
      rejectedList.push(cardInfo)
     }

     interviewList = interviewList.filter(item => item.name != cardInfo.name);

     calculateCount();
     if(currentTab === "rejected") renderRejected();
  
  
      }
 
});

filterSection.addEventListener('click', function(event){

   // DELETE from Interview/Rejected tab
   if (event.target.closest('.delete-btn')) {
    const parentNode = event.target.closest('[data-status]');
    const name = parentNode.querySelector('.Name').innerText;

    interviewList = interviewList.filter(item => item.name !== name);
    rejectedList = rejectedList.filter(item => item.name !== name);

    calculateCount();

    // Re-Render active tab
    if (currentTab === "interview") renderInterview();
    if (currentTab === "rejected") renderRejected();

    return;
  }

  const parentNode = event.target.closest('[data-status]');
  if(!parentNode) return;

  const isInterview = event.target.classList.contains('interview-btn');
  const isRejected = event.target.classList.contains('Rejected-btn');
  if(!isInterview && !isRejected) return;

  const name = parentNode.querySelector('.Name').innerText;
  const designation = parentNode.querySelector('.Designation').innerText;
  const info = parentNode.querySelector('.Info').innerText;
  const notes = parentNode.querySelector('.notes').innerText;

  const newStatus = isInterview ? "INTERVIEW" : "REJECTED";

  const statusEl = parentNode.querySelector('.Status');
  statusEl.innerText = newStatus;

  statusEl.classList.remove("text-green-500", "text-red-500", "text-gray-500");

  if (newStatus === "INTERVIEW") {
    statusEl.classList.add("text-green-500");
  } else {
    statusEl.classList.add("text-red-500");
  }

  // Remove from both lists first
  interviewList = interviewList.filter(item => item.name !== name);
  rejectedList = rejectedList.filter(item => item.name !== name);

  // Add to correct list
  const cardInfo = { name, designation, info, notes, status: newStatus };

  if(newStatus === "INTERVIEW"){
    interviewList.push(cardInfo);
  } else {
    rejectedList.push(cardInfo);
  }

  calculateCount();

  // Switch current tab
  toggleStyles(newStatus === "INTERVIEW" ? "interview" : "rejected");

});


function showEmptyState() {
  filterSection.innerHTML = `
    <div class="flex flex-col items-center justify-center bg-white border border-[#e6edf6] rounded-lg p-16 text-center min-h-[360px]">
      <img src="./jobs.png" class="w-20 mb-6" alt="empty" />
      <h2 class="text-2xl font-semibold text-blue-900 mb-2">No jobs available</h2>
      <p class="text-gray-500">Check back soon for new job opportunities</p>
    </div>
  `;
}




function renderInterview(){
    filterSection.innerHTML = '';

    if(interviewList.length === 0){
      showEmptyState();
      tabCount.innerText = 0;
      return;
    }
    tabCount.innerText = interviewList.length;
  
    for(let interview of interviewList){
  
      let div = document.createElement('div');
      div.className = 'flex justify-between bg-white border border-[#e6edf6] rounded-lg p-6';
      div.setAttribute("data-status", "none");
  
      div.innerHTML = ` 
        <div class="Left space-y-4">
          <div>
            <h2 class="Name text-2xl">${interview.name}</h2>
            <p class="Designation opacity-60">${interview.designation}</p>
          </div>
  
          <p class="Info opacity-60">${interview.info}</p>
  
          <div>
            <p class="Status btn border-none ${statusColorClass(interview.status)}">${interview.status}</p>
            <p class="notes">${interview.notes}</p>
          </div>
  
          <div class="flex gap-4">
            <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
            <button class="Rejected-btn btn btn-outline btn-error">REJECTED</button>
          </div>
        </div>
  
        <div class="Right">
          <button class="delete-btn btn btn-sm btn-circle border border-slate-200">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;
  
      filterSection.appendChild(div);
    }
  }

  function renderRejected(){
    filterSection.innerHTML = '';
  
    if(rejectedList.length === 0){
      showEmptyState();
      tabCount.innerText = 0;
      return;
    }
  
    tabCount.innerText = rejectedList.length;

    for(let reject of rejectedList){
  
      let div = document.createElement('div');
      div.className = 'flex justify-between bg-white border border-[#e6edf6] rounded-lg p-6';
      div.setAttribute("data-status", "none");
  
      div.innerHTML = ` 
        <div class="Left space-y-4">
          <div>
            <h2 class="Name text-2xl">${reject.name}</h2>
            <p class="Designation opacity-60">${reject.designation}</p>
          </div>
  
          <p class="Info opacity-60">${reject.info}</p>
  
          <div>
            <p class="Status btn border-none ${statusColorClass(reject.status)}">${reject.status}</p>
            <p class="notes">${reject.notes}</p>
          </div>
  
          <div class="flex gap-4">
            <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
            <button class="Rejected-btn btn btn-outline btn-error">REJECTED</button>
          </div>
        </div>
  
        <div class="Right">
          <button class="delete-btn btn btn-sm btn-circle border border-slate-200">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;
  
      filterSection.appendChild(div);
    }
  }
