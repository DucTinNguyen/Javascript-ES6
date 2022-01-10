// Chức năng 1: Fecth data from database
let listQuestions = [];
const fetchQuestion = async () =>{
    try {
        const res = await axios({
            url:"https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/questions",
            method:"GET",
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
    
}
fetchQuestion();
//Chức năng 2:Hiển thị câu hỏi lên màn hình
const renderQuestion = () => {
    let htmlContent = "";
    for(let item of listQuestions) {
        htmlContent += item.render();
    }
    document.getElementById("questionsContainer").innerHTML = htmlContent;
}
//Chuyenr hóa data từ backend trả về
const mapData = (data = []) => {
   listQuestions =  data.map( (item) => {
        const {questionType,id,content,answers} = item;// Destructuring
        if(item.questionType ===1)
        {
            return new multipleChoice(questionType,id,content,answers);
        }
        else
        {
            return new fillBlank(questionType,id,content,answers);
        }
    } )
}
//Chức năng tính điểm khi bấm btn submit 
const submit = () => {
    let countCore = 0;
    // for(let item of listQuestions)
    // {
    //     if(item.checkExact())
    //     {
    //         countCore ++;
    //     }
    // }
    let incorrectArr = [];
    for(let i in listQuestions)
    {
        if(listQuestions[i].checkExact())
        {
            countCore ++;
        }
        else
        {
            incorrectArr.push(parseFloat(i)+1);
        }
    }
    alert(
        `Số câu đúng:${countCore} / ${listQuestions.length}
        Các câu sai: ${incorrectArr}
        `
        );
    
}
fetchQuestion().then((res) => {
    //code
    mapData(res);
    renderQuestion();
});