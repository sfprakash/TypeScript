var UserIdAutoIncrement = 1000;
var MedicineIdAutoIncrement = 10;
var CurrentUserId;
var User = /** @class */ (function () {
    function User(paramUserEmail, paramUserPassword, paramUserPhone) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.UserEmail = paramUserEmail;
        this.UserPassword = paramUserPassword;
        this.UserPhone = paramUserPhone;
    }
    return User;
}());
var MedicineInfo = /** @class */ (function () {
    function MedicineInfo(paramMedicineName, paramMedicineCount, paramMedicinePrice, paramMedicineExpiryDate) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = paramMedicineExpiryDate;
    }
    return MedicineInfo;
}());
var UserArrayList = new Array();
UserArrayList.push(new User("Prakash", "191101", 9361415123));
var MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracitamol", 40, 5, new Date("2024-06-30")));
MedicineList.push(new MedicineInfo("Calpol", 10, 5, new Date("2024-05-30")));
MedicineList.push(new MedicineInfo("Gelusil", 3, 40, new Date("2024-04-30")));
MedicineList.push(new MedicineInfo("Metrogel", 5, 50, new Date("2024-12-30")));
MedicineList.push(new MedicineInfo("Povidin Iodin", 10, 50, new Date("2024-10-30")));
function homePage() {
    var homePage = document.getElementById("homePage");
    homePage.style.display = "block";
}
function newUser() {
    var home = document.getElementById("homePage");
    var newUser = document.getElementById("newUserPage");
    home.style.display = "none";
    newUser.style.display = "block";
}
function SignUp() {
    var newUserEmail = document.getElementById("userEmail").value;
    var newUserPassword = document.getElementById("CFPassword").value;
    var newUserPhone = document.getElementById("userPhone").value;
    var newUser1 = new User(newUserEmail, newUserPassword, +newUserPhone);
    UserArrayList.push(newUser1);
    alert("User ID is " + newUser1.UserId);
    // existingUser();
    // linkIn();
}
function existingUser() {
    var home = document.getElementById("homePage");
    var existingUser = document.getElementById("existingUserPage");
    home.style.display = "none";
    existingUser.style.display = "block";
}
function linkIn() {
    var newUser = document.getElementById("newUserPage");
    var existingUser = document.getElementById("existingUserPage");
    newUser.style.display = "none";
    existingUser.style.display = "block";
}
function SignIn() {
    var noExistingUserIdChecker = true;
    var existingUserId = document.getElementById("existingUserId").value;
    var existingUserIDRegex = /^UI\d{4}$/;
    if (existingUserIDRegex.test(existingUserId)) {
        for (var i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].UserId == existingUserId) {
                noExistingUserIdChecker = false;
                medicinePage();
                return;
            }
        }
        if (noExistingUserIdChecker) {
            alert("Invalid UserID");
        }
    }
    else {
        alert("Invalid User ID");
    }
}
function medicinePage() {
    var existingUserPage = document.getElementById('existingUserPage');
    var medicinePage = document.getElementById('medicinePage');
    var greet = document.getElementById('greet');
    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";
    // greet.innerHTML = `<h3>Hello ${CurrentUserName}</h3>`;
}
function showMedicine() {
    var table = document.getElementById("dataTable");
    var medicineBtn = document.getElementById("medicine-btn");
    for (var i = 0; i < MedicineList.length; i++) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(MedicineList[i].MedicineId, "</td>\n        <td>").concat(MedicineList[i].MedicineName, "</td>\n        <td>").concat(MedicineList[i].MedicineCount, "</td>\n        <td>").concat(MedicineList[i].MedicinePrice, "</td>\n        <td>").concat(MedicineList[i].MedicineExpiryDate.toString(), "</td>");
        table.appendChild(row);
    }
    medicineBtn.disabled = true;
}
