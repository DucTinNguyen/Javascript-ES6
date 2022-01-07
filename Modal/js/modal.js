const $ = document.querySelector.bind(document);

const btn = $(".modal__btn");
const modal = $(".modal");
const icon = $(".cancel");
const btnClose = $(".close");
btn.onclick = () => {
    modal.classList.add("active");
}
icon.onclick = () => {
    checkModal();
}
btnClose.onclick = () => {
    checkModal();
}
modal.onclick = (e) => {
    if(e.target == e.currentTarget)
        {
            checkModal();
        }
}
function checkModal()
{
    if(modal.classList.contains("active"))
    {
        modal.classList.remove("active");
    }
}