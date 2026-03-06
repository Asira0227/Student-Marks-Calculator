const subjectCountInput = document.getElementById("subjectCount")
const generateBtn = document.getElementById("generateBtn")
const form = document.getElementById("marksForm")
const calcBtn = document.getElementById("calculateBtn")
const resultSection = document.getElementById("resultSection")
const subjectTable = document.getElementById("subjectTable")
const countError = document.getElementById("countError")
const formError = document.getElementById("formError")
const recalcBtn = document.getElementById("recalculateBtn")
const resetBtn = document.getElementById("resetBtn")

const markRegex = /^(100|[1-9]?[0-9])$/
const subjectRegex = /^[A-Za-z][A-Za-z0-9 _-]*$/

generateBtn.onclick = () => {
countError.textContent = ""
form.innerHTML = ""

const count = Number(subjectCountInput.value)
if (count <= 0) {
countError.textContent = "Enter valid number of subjects"
return
}

for (let i = 1; i <= count; i++) {
form.innerHTML += `
<div>
<div class="grid md:grid-cols-2 gap-3">
<input placeholder="Subject Name" class="p-3 border rounded subject">
<input placeholder="0-100" class="p-3 border rounded marks">
</div>
<p class="text-red-500 text-sm error"></p>
</div>
`
}

calcBtn.classList.remove("hidden")
}

calcBtn.onclick = () => {
formError.textContent = ""
subjectTable.innerHTML = ""

const marks = document.querySelectorAll(".marks")
const subjects = document.querySelectorAll(".subject")
const errors = document.querySelectorAll(".error")

let total = 0

for (let i = 0; i < marks.length; i++) {

errors[i].textContent = ""
marks[i].classList.remove("border-red-500")
subjects[i].classList.remove("border-red-500")

if (!subjectRegex.test(subjects[i].value.trim())) {
errors[i].textContent = "Invalid subject name"
subjects[i].classList.add("border-red-500")
return
}

if (!markRegex.test(marks[i].value.trim())) {
errors[i].textContent = "Marks must be 0-100"
marks[i].classList.add("border-red-500")
return
}

total += Number(marks[i].value)

subjectTable.innerHTML += `
<tr class="border-b border-white/20">
<td class="p-3">${subjects[i].value}</td>
<td class="p-3">${marks[i].value}</td>
</tr>
`
}

const percent = (total / (marks.length * 100)) * 100

let grade = percent >= 90 ? "A+" :
percent >= 80 ? "A" :
percent >= 70 ? "B" :
percent >= 60 ? "C" :
percent >= 40 ? "D" : "F"

const status = percent >= 40 ? "PASS" : "FAIL"

document.getElementById("totalMarks").textContent = total
document.getElementById("percentage").textContent = percent.toFixed(2) + "%"
document.getElementById("grade").textContent = grade
document.getElementById("status").textContent = status

document.getElementById("status").className =
status === "PASS"
? "text-green-400 text-2xl font-bold"
: "text-red-500 text-2xl font-bold"

resultSection.classList.remove("hidden")
resultSection.scrollIntoView({ behavior: "smooth" })
}

recalcBtn.onclick = () => {
resultSection.classList.add("hidden")
form.scrollIntoView({ behavior: "smooth" })
}

resetBtn.onclick = () => {
subjectCountInput.value = ""
form.innerHTML = ""
calcBtn.classList.add("hidden")
resultSection.classList.add("hidden")
countError.textContent = ""
formError.textContent = ""
}

