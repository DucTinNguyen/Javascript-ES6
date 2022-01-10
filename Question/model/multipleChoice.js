class multipleChoice extends Question {
    constructor(type, id, content, answers){
        super(type,id,content,answers);
    }
    render() {
        let answerHTML = '';
        for(let item of this.answers)
        {
            answerHTML += `
            <div>
            <input value="${item.id}" class="answer-${this.id}" type="radio" name="answer-${this.id}"  />
            <label class="lead">${item.content}</label>
          </div>
            `
        }

        return `
        <div>
        <p class="lead font-italic" style="font-size: 30px;">
          Câu ${this.id}: ${this.content}
        </p>
        ${answerHTML}
      </div>
        `
    }
    checkExact()
    {
      let inputList =  document.getElementsByClassName(`answer-${this.id}`);
      let inputId;
      //tìm id 
      for(let input of inputList)
      {
        if(input.checked)
        {
          inputId = input.value;
        }
      }
      if(!inputId)
      {
        return false;
      }
      //duyệt tìm phần tử tương ứng tại id đó
      for(let answer of this.answers)
      {
        if(inputId === answer.id)
        {
          return answer.exact;
        }
      }
      return false;
    }
    
}
// const newQuestion = new multipleChoice(1,1,"Hôm nay là thứ mấy",[{content:"Thứ 2"},{content:"thứ 3"},{content:"thứ5"},{content:"thứ 6"}]);
// console.log(newQuestion.render());