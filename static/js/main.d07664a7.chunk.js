(this["webpackJsonpquarantine-pursuit"]=this["webpackJsonpquarantine-pursuit"]||[]).push([[0],{25:function(e,t,a){},41:function(e,t,a){e.exports=a.p+"static/media/logo.d89ed495.png"},45:function(e,t,a){e.exports=a(74)},74:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(38),s=a.n(o),i=(a(25),a(8)),c=a(9),l=a(11),u=a(10),m=a(12),d=a(2),h=a(20),p=a.n(h);a(50);p.a.initializeApp({apiKey:"AIzaSyBvJwO2yQSGErN9NBZQnldxiKSwQSt1mkc",authDomain:"quarantine-pursuit.firebaseapp.com",databaseURL:"https://quarantine-pursuit.firebaseio.com",projectId:"quarantine-pursuit",storageBucket:"quarantine-pursuit.appspot.com",messagingSenderId:"800505781023",appId:"1:800505781023:web:445c432c49eb4bf083ae2a"});var f=p.a,b=a(40),g=a(39),v=function(){return r.a.createElement("div",{className:"loading-container"},r.a.createElement(g.a,{icon:b.a,"aria-hidden":"true"}))},E=a(41),y=a.n(E),k=a(42),q=a(16),z=a.n(q),S=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).handleChange=function(t){e.setState(Object(k.a)({},t.target.name,t.target.value))},e.handleClick=function(t){t.preventDefault(),e.props.loadingHandler();var a={};z()({url:"https://opentdb.com/api.php",method:"GET",responseType:"JSON",params:{amount:e.state.amount,category:e.state.selectedCategory,difficulty:e.state.difficulty,token:e.state.token,type:"multiple",encode:"base64"}}).then((function(t){console.log(t),t.data.response_code>0?(alert("I'm sorry, there aren't enough questions available in that category. Try again with a lower number of questions or change categories. "),e.props.loadingFalse()):(a=t.data.results,e.props.callQuiz(a))}))},e.state={categories:[],isLoading:!0,selectedCategory:0,amount:1,difficulty:"easy",token:""},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;z()({url:"https://opentdb.com/api_category.php",method:"GET",responseType:"JSON"}).then((function(t){var a=t.data.trivia_categories;e.setState({categories:a,isLoading:!1})})).catch((function(){alert("I can't seem to connect to my database :'(, please come back later... I'll do better I swear")})),z()({url:"https://opentdb.com/api_token.php?command=request",method:"GET",responseType:"JSON"}).then((function(t){var a=t.data.token;e.setState({token:a}),console.log(e.state.token)}))}},{key:"render",value:function(){return r.a.createElement("form",{className:"centered"},r.a.createElement("div",{className:"inputPair"},r.a.createElement("label",{htmlFor:"selectedCategory"},"Choose a Category:"),r.a.createElement("select",{name:"selectedCategory",id:"categories",onChange:this.handleChange},this.state.categories.map((function(e,t){return r.a.createElement("option",{key:t,value:e.id},e.name)})))),r.a.createElement("div",{className:"inputPair"},r.a.createElement("label",{htmlFor:"amount"},"Number of Questions:"),r.a.createElement("p",null,this.state.amount),r.a.createElement("input",{type:"range",name:"amount",min:"1",max:"20",value:this.state.amount,onChange:this.handleChange})),r.a.createElement("button",{onClick:this.handleClick},"Generate Quiz"))}}]),a}(n.Component),w=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).handleClick=function(t){e.props.selectQuiz(t.target.name)},e.state={quizList:[]},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;f.database().ref().once("value",(function(t){var a=t.val(),n=Object.keys(a);e.setState({quizList:n})}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.state.quizList.map((function(t){return r.a.createElement("div",{key:t},r.a.createElement("button",{name:t,onClick:e.handleClick},t))})))}}]),a}(n.Component),C=a(44),Q=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).save=function(){var e=prompt("What would you like to name this quiz");n.setState({quizName:e}),f.database().ref().child(e).set(n.props.quiz)},n.state={quizName:""},n}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"centered"},r.a.createElement("h2",null,"Your Score is: ",this.props.score,"/",this.props.quiz.length),r.a.createElement(m.b,{to:"/"},r.a.createElement("button",{onClick:this.props.reset},"Home")),r.a.createElement("button",{onClick:this.save},"Save Quiz"))}}]),a}(n.Component),O=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleClick=function(e){var t=n.state.questionNumber;++t<n.props.quiz.length?(console.log(n.state.currentQuestion),n.setState({questionNumber:t,currentQuestion:n.props.quiz[t],shuffled:!1,answerFeedback:"The Correct Answer Was: ".concat(atob(n.state.currentQuestion.correct_answer))})):n.setState({showFinalScore:!0}),n.state.currentQuestion.correct_answer===e.target.name&&(n.correct(),console.log("ding"))},n.correct=function(){var e=n.state.score;e++,n.setState({score:e,answerFeedback:"Correct!"})},n.reset=function(){n.setState({questionNumber:0,score:0,showFinalScore:!1}),n.props.reset()},n.combineAndShuffle=function(){!function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*t),r=e[t];e[t]=e[a],e[a]=r}n.setState({question_list:e})}([].concat(Object(C.a)(n.state.currentQuestion.incorrect_answers),[n.state.currentQuestion.correct_answer]))},n.state={currentQuestion:n.props.quiz[0],questionNumber:0,score:0,showFinalScore:!1,question_list:[],shuffled:!1,answerFeedback:""},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.combineAndShuffle()}},{key:"componentDidUpdate",value:function(){!1===this.state.shuffled&&(this.combineAndShuffle(),this.setState({shuffled:!0}))}},{key:"render",value:function(){var e=this,t=this.state.question_list.map((function(t,a){return r.a.createElement("button",{className:"answerButtons",name:t,key:a,onClick:e.handleClick},atob(t))}));return r.a.createElement("div",null,this.state.showFinalScore?r.a.createElement(Q,{quiz:this.props.quiz,score:this.state.score,reset:this.reset}):r.a.createElement("div",{className:"centered"},"Correct!"==this.state.answerFeedback?r.a.createElement("h2",{className:"correct"},this.state.answerFeedback):r.a.createElement("h2",{className:"incorrect"},this.state.answerFeedback),r.a.createElement("h2",null,atob(this.state.currentQuestion.question)),t))}}]),a}(n.Component),j=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).callQuiz=function(t){e.setState({quiz:t,dataReady:!0,isLoading:!1}),console.log(e.state.quiz)},e.selectQuiz=function(t){f.database().ref(t).once("value",(function(t){var a=t.val();e.setState({quiz:a})})).then((function(){e.setState({dataReady:!0,isLoading:!1})}))},e.reset=function(){e.setState({activeQuizPath:"",quiz:[{question:"",correctAnswer:"",incorrect_answers:[]}],dataReady:!1}),console.log("reset")},e.loadingHandler=function(){e.setState({isLoading:!0})},e.loadingFalse=function(){e.setState({isLoading:!1})},e.state={activeQuizPath:"",quiz:[{question:"",correctAnswer:"",incorrect_answers:[]}],dataReady:!1,isLoading:!1},e}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement(m.a,{basename:"/quarantine-pursuit"},r.a.createElement("header",null,r.a.createElement("h1",{className:"sr-only"},"Qurantine Pursuit"),r.a.createElement("img",{src:y.a,alt:"Logo for Qurantine Pursuit"})),r.a.createElement("main",null,r.a.createElement(d.b,{exact:!0,path:"/"},r.a.createElement("button",null,r.a.createElement(m.b,{to:"/create"},"Create a Quiz!")),r.a.createElement("button",null,r.a.createElement(m.b,{to:"/select"},"Select an Existing Quiz!"))),r.a.createElement(d.b,{path:"/create"},r.a.createElement("div",{className:"loadingHelper"},this.state.isLoading?r.a.createElement(v,null):null,r.a.createElement(S,{callQuiz:this.callQuiz,loadingHandler:this.loadingHandler,loadingFalse:this.loadingFalse}))),r.a.createElement(d.b,{path:"/select"},r.a.createElement(w,{selectQuiz:this.selectQuiz})),this.state.dataReady?r.a.createElement(d.a,{to:"/play"}):r.a.createElement(d.a,{to:"/"}),r.a.createElement(d.b,{path:"/play"},r.a.createElement(O,{quiz:this.state.quiz,reset:this.reset}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[45,1,2]]]);
//# sourceMappingURL=main.d07664a7.chunk.js.map