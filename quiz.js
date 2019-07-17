// render quiz app ??

$(document).ready(function(){
    $('.quiz-questions').hide();
    $("#nextQuestion").hide();
    $("#quiz-results").hide();
   
   
});


// when user clicks submit button new layout with all questions will show 



// store questions and answers

const state = {
  correctAnswers: 0,
  
 {title: "Which year was Minecraft released?",
 choices: [2001,1989,2009,2011],
 quesNum: 1,
 correctAns: 2009},
 

 {title: "`What Does Mario jumps on after completing a level?",
 choices: ["a Flag Pole","a Mushroom","His Glasses","a Bug"],
 quesNum: 2,
 correctAns: "a Flag Pole"},

 {title: "What is Maximum amount of controller supported by PS3?",
 choices: ["11","7","4","8"],
 quesNum: 3,
 correctAns: "7"},
    
 {title: "What does NES stand for?",
 choices: ["Ninjas Extreme System","New Entertainment Servers","None of the above","Nintendo Entertainment Systems"],
 quesNum: 4,
 correctAns: "Nintendo Entertainment Systems"},
    
 {title: "How Many Halo Title That Contains the main storyline?",
 choices: ["10","5","8","7"],
 quesNum: 5,
 correctAns: "5"},
  ],
feedback: '',
currentQuestionIndex: 0,
}

$("#start").on("click", function (){
    event.preventDefault();
    $("#start-quiz").hide();
    $(".quiz-questions").show();
    

    renderQuestion();

});
// will render Question
function renderQuestion(){
  
    let question= state.questions[state.currentQuestionIndex];

    $(".questionTitle").text(question.title);
    
    //clear out previous questions and answers
    $(".choices").html("");
    
    question.choices.forEach(function(choice) {
        $(".choices").append(`<div class="answer-one">
                                  <label>
                                  <input type="radio" name="radio" value="${choice}"/>
                                    <span>${choice}</span>
                                  </label>
                             </div>`);
    }); 
};

 // this will listen for when user selects answer and clicks submits  
$("#submitUserGuess").on("click",function() {
   
    let checkedAnswer=$('input[name=radio]:checked').val();
      if (checkedAnswer) {
          
          if (checkedAnswer == (state.questions[state.currentQuestionIndex].correctAns)){
              $(".feedback").text("That is the correct answer");
              $("#submitUserGuess").hide();
            
              state.correctAnswers++;
              $(".answeredCorrectly").html(" You have answered " + state.correctAnswers + " correctly");
              $(".questionNumber").html(state.questions[state.currentQuestionIndex].quesNum + " out of 10");
              $("#nextQuestion").show();
              $(".feedback").show();

          }
          else {
              $(".feedback").text("That is the incorrect answer. The correct answer is" + " " +(state.questions[state.currentQuestionIndex].correctAns) );
              $("#submitUserGuess").hide();
            
              $(".answeredCorrectly").html(" You have answered " + state.correctAnswers + " correctly");
              $(".questionNumber").html("Question " + state.questions[state.currentQuestionIndex].quesNum + " out of 10");
              $("#nextQuestion").show();
              $(".feedback").show();
          }
      }
    
    else {
        alert("Please Select An Answer");
    }
    
});

// user clicks next question and will bring up next series of Q and A

$("#nextQuestion").on("click", function() {
    $(".feedback").hide();
    $("#submitUserGuess").show();
    $("#nextQuestion").hide();
    state.currentQuestionIndex.length;
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex < 10) {
        renderQuestion();
}
   else {
    $('.quiz-questions').hide();
    $("#nextQuestion").hide();
         $("#quiz-results").append(`<div id="quiz-results">
                                    <h1> Quiz Results</h1>
                                    <h2> You Got </h2>
                                    ${state.correctAnswers}
                                    <h2> Correct! </h2>
                                    </div>`)
       if (state.correctAnswers > 7){
           alert("Winner Winner chicken-dinner!")
       }
       else {
           alert ("Maybe Next Time!")
       }
        $("#quiz-results").show();
       
       
        $("#startOver").on("click", function() {
            $("#start-quiz").show();
            $('.quiz-questions').hide();
            $("#nextQuestion").hide();
            $("#quiz-results").hide();
            state.currentQuestionIndex = 0
       });
        
               
                    

    }
}); 
    
     
// user will select answer from radio button 
//have event listener and update index property so it 

// if answer is correct details on answer will return



// if answer is wrong = it will tell user answer is wrong




// stats will be recorded based on how many questions user has gotten correct and what questions user is on



//user will submit to go to next questions


// on last question user can submit to finish quiz and will bring up new layout with quiz results



// results pages- user will see how well he or she did and have option to start over