





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  fe("https://ghibliapi.herokuapp.com/films",(rst)=>{
    fh['films'] = rst;
    document.querySelector("body").innerHTML="";
    document.querySelector("body").append(
      ce(header_structure()),
      ce(main_structure())
    );

    // fe("https://ghibliapi.herokuapp.com/people",(rst)=>{
    //   fh['people'] = rst;
    // })
  })

  
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);


////public function////////////////////////////
const fh = {};
function ce(obj){
  let rst = document.createElement(obj.tagname || "div");
  for(let x in obj) 
    switch(x){
      case "tagname": break;
      case "innerHTML":case "innerText":case "textContent": 
        rst[x] = obj[x]; 
      break;
      case "event_":
        for(let y in obj[x]) rst.addEventListener(y,obj[x][y],false);
      break;
      case "ch_": rst.append(...obj[x].map(el=>ce(el))); break;
      case "export_": fh[obj[x]]=rst; break;
      default: rst.setAttribute(x,obj[x]);
    }
  return rst;
}
async function fe(url,cb){
  try {
    const res = await fetch(url);
    switch(res.status)
    {
      case 200: cb(await res.json()); break;
      default : error_handling(`Url ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    error_handling(error);
  }
}
function error_handling(error){
  //
  alert(error);
}
//////public end//////////////////////////
//////event start//////////////////////////
function on_show_people_click(evt){
  function fill_people(){
    let current_movie_id = fh['films'][fh['movies_selector'].value].id;
    if(current_movie_id==undefined) {
      error_handling("select a movie first");
      return;
    };
    fh.people.forEach(el=>{
      if(el.films.some(sel=>sel.includes(current_movie_id)))
      {
        fh['people_list'].append(ce({tagname:"li",innerText:el.name}));
      }
    })
  }
  fh['people_list'].innerHTML = "No people on show.";
  if(fh['people']===undefined)
  {
    fe("https://ghibliapi.herokuapp.com/people",(rst)=>{
      fh['people'] = rst;
      fill_people();
    })
  }
  else
  {
    fill_people();
  }
  
  
  
}
function on_films_select_change(evt){
  fh['people_list'].innerHTML = "";
  if((fh["films"][evt.target.value]||{})["detail"]===undefined)
  {
    console.log(fh["films"][evt.target.value]);
  }
  let {title,release_date,description,image} = fh["films"][evt.target.value]||"";
  fh['description_img'].setAttribute("src",image||"");
  fh['description_title'].innerHTML = title||"";
  fh['description_release_years'].innerHTML = release_date||"";
  fh['description_description'].innerHTML = description||"";
}
function on_review_submit(evt){
  evt.preventDefault();
  if(fh['description_title'].innerText=="")
  {
    error_handling("Please select a movie first");
    return;
  }
  fh['reviews_list'].append(ce({tagname:"li",innerHTML:`<b>${fh['description_title'].innerText}.</b> ${evt.srcElement[0].value}`}));
  evt.srcElement[0].value = "";
}
function on_reset_review(evt){
  fh['reviews_list'].innerHTML = "";
}
//////event end//////////////////////////
//////structure function//////////////////////////
function header_structure(){
  return {
    tagname:"header",
    style:"overflow:hidden;",
    ch_:[
      {
        tagname:"img",
        src:"./images/ghibli-logo.png",
        alt:"Ghibli logo",
      },
      {
        tagname:"h1",
        innerText:"Ghibli Review App",
      }
    ]
  }
}
function main_structure(){
  return {
    tagname:"main",
    ch_:[
      {tagname:"section",
        ch_:[
          {tagname:"h2",innerText:"Select a movie",},
          {tagname:"select",
             ch_:[
              {tagname:"option",value:"",innerText:""},
              ...fh.films.map((el,idx)=>({tagname:"option",value:idx,innerText:el.title}))
            ],
             event_:{change:on_films_select_change},
             export_:"movies_selector",
          }
        ]
      },
      {tagname:"section",
        ch_:[
          {tagname:"h2",innerText:"Add a review",},
          {tagname:"form",event_:{"submit":on_review_submit},
            ch_:[
              {tagname:"label",for:"review",},
              {tagname:"input",type:"text",id:"review"},
              {tagname:"input",type:"submit",value:"Submit review"},
            ]
          }
        ]
      },
      {tagname:"section",
        ch_:[
          {tagname:"h2",innerText:"Movie details",},
          {tagname:"img",export_:"description_img",style:"width:100%;max-width:640px;margin:auto;",},
          {id:"display-info",
            ch_:[
              
              {tagname:"h3",export_:"description_title"},
              {tagname:"p",export_:"description_release_years"},
              {tagname:"p",export_:"description_description"},
            ]
          }
        ]
      },
      {tagname:"section",
        ch_:[
          {tagname:"h2",innerText:"People",},
          {tagname:"ol",export_:"people_list"},
          {tagname:"button",innerText:"Show People",id:"show-people",event_:{click:on_show_people_click}},
        ]
      },
      {tagname:"section",id:"reviews",
        ch_:[
          {tagname:"h2",innerText:"Reviews"},
          {tagname:"ul",export_:"reviews_list"},
          {tagname:"button",innerText:"Reset Reviews",id:"reset-reviews",event_:{"click":on_reset_review}},
        ]
      }
    ]
  }
}
//////structure function end//////////////////////////