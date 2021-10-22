
var courseApi = 'http://localhost:3000/api/questions'
function addQuestion(data, callback){
  var options = {
    method :'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data)
  };
  console.log(data);
  fetch(courseApi, options)
    .then( res => res.json())
    .then( data => console.log(data))
    .catch( err => console.log(err));
}
function addQ(){
  console.log('add');
    var content = document.getElementById('questionContent').value;
    var explanation = document.getElementById('questionExplaination').value;
    var answers = [
      {
        content : document.getElementById('answerAContent').value,
        isTrue: document.getElementById('isTrueCheckboxA').checked
      },
      {
        content : document.getElementById('answerBContent').value,
        isTrue: document.getElementById('isTrueCheckboxB').checked
      },
      {
        content : document.getElementById('answerCContent').value,
        isTrue: document.getElementById('isTrueCheckboxC').checked
      },
      {
        content : document.getElementById('answerDContent').value,
        isTrue: document.getElementById('isTrueCheckboxD').checked
      }
    ]
     
    var formData = {
      content,
      explanation,
      part : 1,
      answers:[
        {
          content: answers[0].content,
          isTrue: answers[0].isTrue
        },
        {
          content: answers[1].content,
          isTrue: answers[1].isTrue
        },
        {
          content: answers[2].content,
          isTrue: answers[2].isTrue
        },
        {
          content: answers[3].content,
          isTrue: answers[3].isTrue
        }
      ]
    }
    addQuestion(formData);
}