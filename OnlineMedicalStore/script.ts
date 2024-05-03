let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;

let CurrentUserId:string;


class User{
    UserId:string;
    UserEmail:string;
    UserPassword:string;
    UserPhone:number;

    constructor(paramUserEmail:string, paramUserPassword:string, paramUserPhone:number)
    {
        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();

        this.UserEmail = paramUserEmail;
        this.UserPassword = paramUserPassword;
        this.UserPhone = paramUserPhone;
    }
}

class MedicineInfo {

    MedicineId: string;
    MedicineName: string;
    MedicineCount: number;
    MedicinePrice: number;
    MedicineExpiryDate: Date;

    constructor(paramMedicineName: string, paramMedicineCount: number, paramMedicinePrice: number,paramMedicineExpiryDate:Date) {
        MedicineIdAutoIncrement++;

        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = paramMedicineExpiryDate;
    }

}

let UserArrayList:Array<User> = new Array<User>();
UserArrayList.push(new User("Prakash","191101",9361415123));

let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();
MedicineList.push(new MedicineInfo("Paracitamol",40,5,new Date("2024-06-30")));
MedicineList.push(new MedicineInfo("Calpol",10,5,new Date("2024-05-30")));
MedicineList.push(new MedicineInfo("Gelusil",3,40,new Date("2024-04-30")));
MedicineList.push(new MedicineInfo("Metrogel",5,50,new Date("2024-12-30")));
MedicineList.push(new MedicineInfo("Povidin Iodin",10,50,new Date("2024-10-30")));


function homePage()
{
    let homePage = document.getElementById("homePage") as HTMLDivElement;

    homePage.style.display="block";
}

function newUser()
{
    let home = document.getElementById("homePage") as HTMLDivElement;
    let newUser = document.getElementById("newUserPage") as HTMLDivElement;

    home.style.display="none";
    newUser.style.display="block";

}

function SignUp()
{
    let newUserEmail = (document.getElementById("userEmail") as HTMLInputElement).value;
    let newUserPassword = (document.getElementById("CFPassword")as HTMLInputElement).value;
    let newUserPhone = (document.getElementById("userPhone") as HTMLInputElement).value;
    let newUser1:User = new User(newUserEmail,newUserPassword,+newUserPhone);
    UserArrayList.push(newUser1);
    alert("User ID is " +newUser1.UserId);
    // existingUser();
    // linkIn();
}

function existingUser()
{
    let home = document.getElementById("homePage") as HTMLDivElement;
    let existingUser = document.getElementById("existingUserPage") as HTMLDivElement;

    home.style.display="none";
    existingUser.style.display="block";

}

function linkIn()
{
    let newUser = document.getElementById("newUserPage") as HTMLDivElement;
    let existingUser = document.getElementById("existingUserPage") as HTMLDivElement;

    newUser.style.display="none";
    existingUser.style.display="block";
}

function SignIn()
{
    let noExistingUserIdChecker:boolean = true;
    let existingUserId = (document.getElementById("existingUserId") as HTMLInputElement).value;
    let existingUserIDRegex = /^UI\d{4}$/;

    if(existingUserIDRegex.test(existingUserId))
    {
        for(let i=0; i<UserArrayList.length; i++)
        {
            if(UserArrayList[i].UserId == existingUserId)
            {
                noExistingUserIdChecker = false;
                medicinePage();
                return;
            }
        }
        if(noExistingUserIdChecker)
        {
            alert("Invalid UserID");
        }
    }
    else{
        alert("Invalid User ID");
    }
}

function medicinePage() {

    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    let medicinePage = document.getElementById('medicinePage') as HTMLDivElement;
    let greet = document.getElementById('greet') as HTMLLabelElement;

    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";

    // greet.innerHTML = `<h3>Hello ${CurrentUserName}</h3>`;
}


function showMedicine(){
    
    let table = document.getElementById("dataTable") as HTMLTableElement;
    let medicineBtn = document.getElementById("medicine-btn") as HTMLButtonElement;
    for(let i=0; i<MedicineList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${MedicineList[i].MedicineId}</td>
        <td>${MedicineList[i].MedicineName}</td>
        <td>${MedicineList[i].MedicineCount}</td>
        <td>${MedicineList[i].MedicinePrice}</td>
        <td>${MedicineList[i].MedicineExpiryDate.toString()}</td>`;

        table.appendChild(row);
    }
    medicineBtn.disabled=true;
}
