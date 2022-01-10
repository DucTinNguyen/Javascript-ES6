class fillBlank extends Question
{
    constructor(type, id, content, answer) {
        super(type, id, content, answer);
    }
    render()
    {
        return `
        <div>
            <p class="lead font-italic" style="font-size: 30px;">
              Câu ${this.id}: ${this.content}
            </p>
           <input id="answer-${this.id}" type="text" class="form-control w-50" />
          </div>
        `
    }
    checkExact()
    {
        let value = document.getElementById(`answer-${this.id}`).value;
        value = value.toLowerCase();
        if(value === this.answers[0].content.toLowerCase())
        {
            return true;
        }
        return false;
    }
}
