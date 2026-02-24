let interviewList=[];
let rejectedList=[];

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


function calculateCount(){
    countTotal.innerText = allCardSection.children.length;
    tabCount.innerText = allCardSection.children.length;
    countInterview.innerText = interviewList.length;
    countRejected.innerText = rejectedList.length;
}
calculateCount();


// function toggleStyles(id){
//     allButton.classList.remove('btn-primary')
//     interviewButton.classList.remove('btn-primary')
//     rejectedButton.classList.remove('btn-primary')

//     allButton.classList.add('btn-outline')
//     interviewButton.classList.add('btn-outline')
//     rejectedButton.classList.add('btn-outline')

//     const activeBtn = document.getElementById(id);
//   activeBtn.classList.remove("btn-outline");
//   activeBtn.classList.add("btn-primary");

//   if (id=='all') {
//     allCardSection.classList.add('hidden');
//     filterSection.classList.remove('hidden');
//   }
// }

function toggleStyles(id){
    // reset button styles
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
    }
    else {
      allCardSection.classList.add('hidden');
      filterSection.classList.remove('hidden');
  
      if (id === 'interview') renderInterview();
      if (id === 'rejected') renderRejected(); // you’ll add this similarly
    }
  }


allCardSection.addEventListener('click',function(event){
    

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
        el: parentNode
    };


   const nameExist =  interviewList.find(item => item.el==parentNode)

   parentNode.querySelector('.Status').innerText = "INTERVIEW";
   cardInfo.status="INTERVIEW"



   if(!nameExist){
    interviewList.push(cardInfo)
   }

   calculateCount();
   renderInterview();

  //  rejectedList = rejectedList.filter(item => item.el !== parentNode);

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
          el: parentNode
      };
  
  
     const nameExist =  interviewList.find(item => item.el==parentNode)
  
     parentNode.querySelector('.Status').innerText = "INTERVIEW";
     cardInfo.status="REJECTED"
  
  
  
     if(!nameExist){
      rejectedList.push(cardInfo)
     }
  
     calculateCount();
     renderRejected()
  
    //  rejectedList = rejectedList.filter(item => item.el !== parentNode);
  
      }
 
})

function renderInterview(){
    filterSection.innerHTML = '';
  
    for(let interview of interviewList){
  
      let div = document.createElement('div');
      div.className = 'flex justify-between bg-white border border-[#e6edf6] rounded-lg p-6';
  
      div.innerHTML = ` 
        <div class="Left space-y-4">
          <div>
            <h2 class="Name text-2xl">${interview.name}</h2>
            <p class="Designation opacity-60">${interview.designation}</p>
          </div>
  
          <p class="Info opacity-60">${interview.info}</p>
  
          <div>
            <p class="Status btn border-none">${interview.status}</p>
            <p class="notes">${interview.notes}</p>
          </div>
  
          <div class="flex gap-4">
            <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
            <button class="Rejected-btn btn btn-outline btn-error">REJECTED</button>
          </div>
        </div>
  
        <div class="Right">
          <button class="btn btn-sm btn-circle border border-slate-200">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;
  
      filterSection.appendChild(div);
    }
  }

  function renderRejected(){
    filterSection.innerHTML = '';
  
    for(let reject of rejectedList){
  
      let div = document.createElement('div');
      div.className = 'flex justify-between bg-white border border-[#e6edf6] rounded-lg p-6';
  
      div.innerHTML = ` 
        <div class="Left space-y-4">
          <div>
            <h2 class="Name text-2xl">${reject.name}</h2>
            <p class="Designation opacity-60">${reject.designation}</p>
          </div>
  
          <p class="Info opacity-60">${reject.info}</p>
  
          <div>
            <p class="Status btn border-none">${reject.status}</p>
            <p class="notes">${reject.notes}</p>
          </div>
  
          <div class="flex gap-4">
            <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
            <button class="Rejected-btn btn btn-outline btn-error">REJECTED</button>
          </div>
        </div>
  
        <div class="Right">
          <button class="btn btn-sm btn-circle border border-slate-200">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;
  
      filterSection.appendChild(div);
    }
  }

// function renderInterview(){
//     filterSection.innerHTML = ''

//     for(let interview of interviewList){
        
//         let div = document.createElement('div');
//         div.className = 'flex justify-between bg-white border border-[#e6edf6] rounded-lg p-6';
//         div.innerHTML = ` 
//         <div class="Left space-y-4">
//                 <div>
//                     <h2 class="Name text-2xl">Mobile First Corp</h2>
//                     <p class="Designation opacity-60">React Native Developer</p>
//                 </div>
//                 <p class="Info opacity-60">Remote
//                     • 
//                    Full-time 
//                    •
//                     $130,000 - $175,000</p>
//                     <div>
//                         <p class="Status btn border-none">Not Applied</p>
//                         <p class="notes">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
//                     </div>

//                 <div class="flex gap-4">
//                     <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
//                     <button class="Rejected-btn btn btn-outline btn-error">REJECTED</button>
//                 </div>

//             </div>

//             <div class="Right">
//                 <button class="btn btn-sm btn-circle border border-slate-200"><i class="fa-regular fa-trash-can"></i></button>
//             </div>
//         `;

//             filterSection.appendChild(div);
//     }
// }




// // ========= DOM =========
// let countTotal = document.getElementById('count-total');
// let countInterview = document.getElementById('count-interview');
// let countRejected = document.getElementById('count-rejected');
// let tabCount = document.getElementById('tab-count');

// let allButton = document.getElementById('all');
// let interviewButton = document.getElementById('interview');
// let rejectedButton = document.getElementById('rejected');

// const allCardSection = document.getElementById('all-cards');
// const filterSection = document.getElementById('Filtered-Section');

// // ========= COUNT =========
// function calculateCount() {
//   const allCards = document.querySelectorAll('#all-cards > div');

//   let interview = 0;
//   let rejected = 0;

//   allCards.forEach(card => {
//     if (card.dataset.status === "interview") interview++;
//     if (card.dataset.status === "rejected") rejected++;
//   });

//   countTotal.innerText = allCards.length;
//   countInterview.innerText = interview;
//   countRejected.innerText = rejected;
// }

// // ========= BUTTON STYLE =========
// function toggleStyles(id) {
//   allButton.classList.remove('btn-primary');
//   interviewButton.classList.remove('btn-primary');
//   rejectedButton.classList.remove('btn-primary');

//   allButton.classList.add('btn-outline');
//   interviewButton.classList.add('btn-outline');
//   rejectedButton.classList.add('btn-outline');

//   const activeBtn = document.getElementById(id);
//   activeBtn.classList.remove('btn-outline');
//   activeBtn.classList.add('btn-primary');
// }

// // ========= CLICK ON CARD BUTTONS =========
// allCardSection.addEventListener('click', function (event) {

//   // Interview
//   if (event.target.classList.contains('interview-btn')) {
//     const parentNode = event.target.closest('[data-status]');
//     parentNode.dataset.status = "interview";
//     parentNode.querySelector('.Status').innerText = "Interview";
//     calculateCount();
//   }

//   // Rejected
//   if (event.target.classList.contains('Rejected-btn')) {
//     const parentNode = event.target.closest('[data-status]');
//     parentNode.dataset.status = "rejected";
//     parentNode.querySelector('.Status').innerText = "Rejected";
//     calculateCount();
//   }

// });

// // ========= SHOW TAB =========
// function showTab(tab) {
//   toggleStyles(tab);

//   const allCards = document.querySelectorAll('#all-cards > div');

//   if (tab === "all") {
//     allCardSection.classList.remove('hidden');
//     filterSection.classList.add('hidden');
//     tabCount.innerText = allCards.length;
//   } else {
//     allCardSection.classList.add('hidden');
//     filterSection.classList.remove('hidden');
//     filterSection.innerHTML = '';

//     let count = 0;

//     allCards.forEach(card => {
//       if (card.dataset.status === tab) {
//         const clone = card.cloneNode(true);
//         filterSection.appendChild(clone);
//         count++;
//       }
//     });

//     tabCount.innerText = count;
//   }

//   calculateCount();
// }

// // ========= INITIAL =========
// calculateCount();
// showTab('all');