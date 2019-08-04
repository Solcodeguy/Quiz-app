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
    
questions:[
{title: "What year was Minecraft first released?",
 choices: [1989,2001,2009,2011],
 quesNum: 1,
 correctAns: 2009},
 

 {title: "In Super Mario Bros, what does Mario jump on to complete each level?",
 choices: ["a Flag Pole","His Glasses","a Mushroom","all of the above"],
 quesNum: 2,
 correctAns: "a Flag Pole"},

 {title: "What is the maximum amount of controllers supported by PS3?",
 choices: ["4","7","11","8"],
 quesNum: 3,
 correctAns: "7"},
    
 {title: "What does NES stand for?",
 choices: ["Ninja Extreme Service","New Entertainment Server","Nintendo Entertainment Systems","Now Eat Snakes"],
 quesNum: 4,
 correctAns: "Nintendo Entertainment Systems"},
    
 {title: "How Many Halo titles contain the main storyline?",
 choices: ["7","9","5","4"],
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
              $(".questionNumber").html(state.questions[state.currentQuestionIndex].quesNum + " out of 5");
              $("#nextQuestion").show();
              $(".feedback").show();

          }
          else {
              $(".feedback").text("That is the incorrect answer. The correct answer is" + " " +(state.questions[state.currentQuestionIndex].correctAns) );
              $("#submitUserGuess").hide();
            
              $(".answeredCorrectly").html(" You have answered " + state.correctAnswers + " correctly");
              $(".questionNumber").html("Question " + state.questions[state.currentQuestionIndex].quesNum + " out of 5");
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
    if (state.currentQuestionIndex < 5) {
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
       if (state.correctAnswers > 4){
           alert("You are a winner!")
       }
       else {
           alert ("Better Luck Next Time!")
       }
        $("#quiz-results").show();
       
       
        $("#startOver").on("click", function() {
            $("#start-quiz").show();
            $('.quiz-questions').hide();
            $("#nextQuestion").hide();
            $("#quiz-results").empty();
            state.currentQuestionIndex = 0
            $(".questionNumber").html(state.questions[state.currentQuestionIndex].quesNum + " out of 5");
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
