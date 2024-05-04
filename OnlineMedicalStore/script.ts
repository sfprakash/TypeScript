let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;

let CurrentUserId:string;
let CurrentMedicineId:string;
let CurrentloggedInUser:User;


class User{
    UserId:string;
    UserEmail:string;
    UserPassword:string;
    UserPhone:number;
    WalletBalance:number;

    constructor(paramUserEmail:string, paramUserPassword:string, paramUserPhone:number)
    {
        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();

        this.UserEmail = paramUserEmail;
        this.UserPassword = paramUserPassword;
        this.UserPhone = paramUserPhone;
        this.WalletBalance = 0;
    }

    rechargeWallet(paramAmount:number)
    {
        this.WalletBalance += paramAmount;
    }

    showBalance()
    {
        return this.WalletBalance;
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

enum OrderStatus { Ordered, Cancelled}

class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;
    MedicineName: string;
    MedicineCount: number;
    TotalPrice: number;
    OrderStatus: OrderStatus;

    constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number, paramTotalPrice: number, paramOrderStatus:OrderStatus) {
        OrderIdAutoIncrement++;

        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.TotalPrice = paramTotalPrice;
        this.OrderStatus = paramOrderStatus;
    }
}

let UserArrayList:Array<User> = new Array<User>();
UserArrayList.push(new User("Prakash@gmail.com","password",9361415123));

let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();
MedicineList.push(new MedicineInfo("Paracitamol",40,5,new Date("2024-06-30")));
MedicineList.push(new MedicineInfo("Calpol",10,5,new Date("2024-05-30")));
MedicineList.push(new MedicineInfo("Gelusil",3,40,new Date("2024-04-30")));
MedicineList.push(new MedicineInfo("Metrogel",5,50,new Date("2024-12-30")));
MedicineList.push(new MedicineInfo("Povidin Iodin",10,50,new Date("2024-10-30")));

let OrderList: Array<Order> = new Array<Order>();
OrderList.push(new Order("MD14","UI1001","Metrogel",3,150,OrderStatus.Ordered));


//to display pages
// let HomePage = document.getElementById("home-page") as HTMLDivElement;
// let NewUserPage = document.getElementById("new-user-page") as HTMLDivElement;
// let ExistingUserPage = document.getElementById("existing-user-page") as HTMLDivElement;
// let MedicinePage = document.getElementById("medicine-page") as HTMLDivElement;
// let MedicineInfoPage = document.getElementById("medicine-info") as HTMLDivElement;
// let PurchasePage = document.getElementById("purchase-block") as HTMLDivElement;
// let QuantityPage = document.getElementById("quantity-block") as HTMLDivElement;
// let CancelOrderPage = document.getElementById("cancel-order-block") as HTMLDivElement;
// let OrderHistoryPage = document.getElementById("order-history-block") as HTMLDivElement;
// let TopUpPage = document.getElementById("top-up-block") as HTMLDivElement;
// let ShowBalancePage = document.getElementById("show-balance-block") as HTMLDivElement;
//Display none function
// function display()
// {
//     HomePage.style.display="none";
//     NewUserPage.style.display="none";
//     ExistingUserPage.style.display="none";
//     MedicinePage.style.display="none";
//     MedicineInfoPage.style.display="none";
//     PurchasePage.style.display="none";
//     QuantityPage.style.display="none";
//     CancelOrderPage.style.display="none";
//     OrderHistoryPage.style.display="none";
//     TopUpPage.style.display="none";
//     ShowBalancePage.style.display="none";
// }




function homePage()
{
    let homePage = document.getElementById("home-page") as HTMLDivElement;

    homePage.style.display="block";
}

function newUser()
{
    let home = document.getElementById("home-page") as HTMLDivElement;
    let newUser = document.getElementById("new-user-page") as HTMLDivElement;

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
    medicinePage();
    return false
    // linkIn();
}

function existingUser()
{
    let home = document.getElementById("home-page") as HTMLDivElement;
    let existingUser = document.getElementById("existing-user-page") as HTMLDivElement;
    let newUserPage = document.getElementById("new-user-page") as HTMLDivElement;

    home.style.display="none";
    newUserPage.style.display="none";
    existingUser.style.display="block";

}

function linkIn()
{
    let newUser = document.getElementById("new-user-page") as HTMLDivElement;
    let existingUser = document.getElementById("existing-user-page") as HTMLDivElement;

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
                CurrentUserId = existingUserId;
                CurrentloggedInUser = UserArrayList[i];
                alert("logged-in");
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

    let homePage = document.getElementById("home-page") as HTMLDivElement;
    let existingUserPage = document.getElementById('existing-user-page') as HTMLDivElement;
    let medicinePage = document.getElementById('medicine-page') as HTMLDivElement;
    let greet = document.getElementById('greet') as HTMLLabelElement;

    homePage.style.display="none";
    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";
    return false;
    // greet.innerHTML = `<h3>Hello ${CurrentUserName}</h3>`;
}


function showMedicine(){
    
    let medicineInfoPage = document.getElementById("medicine-info") as HTMLDivElement;
    medicineInfoPage.style.display="block";

    let table = document.getElementById("dataTable") as HTMLTableElement;
    table.innerHTML="";
    // let medicineBtn = document.getElementById("medicine-btn") as HTMLButtonElement;
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"MedicineID"}</th><th>${"Medicine Name"}</th><th>${"Medicine Count"}</th><th>${"Medicine Price"}</th><th>${"Expiry Date"}</th>`;
    table.appendChild(heading);
    for(let i=0; i<MedicineList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${MedicineList[i].MedicineId}</td>
        <td>${MedicineList[i].MedicineName}</td>
        <td>${MedicineList[i].MedicineCount}</td>
        <td>${MedicineList[i].MedicinePrice}</td>
        <td>${MedicineList[i].MedicineExpiryDate.toLocaleDateString("en-GB")}</td>`;

        table.appendChild(row);
    }
    // medicineBtn.disabled=true;
}

function Purchase()
{
    let medicineInfoPage = document.getElementById("medicine-info") as HTMLDivElement;
    medicineInfoPage.style.display="none";
    let purchasePage = document.getElementById("purchase-block") as HTMLDivElement;
    purchasePage.style.display="block";

    let table = document.getElementById("purchase-table") as HTMLTableElement;
    table.innerHTML="";
    // let purchaseBtn = document.getElementById("purchase-btn") as HTMLButtonElement;
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"MedicineID"}</th><th>${"Medicine Name"}</th><th>${"Medicine Count"}</th><th>${"Medicine Price"}</th><th>${"Expiry Date"}</th><th></th>`;
    table.appendChild(heading);
    for(let i=0; i<MedicineList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${MedicineList[i].MedicineId}</td>
        <td>${MedicineList[i].MedicineName}</td>
        <td>${MedicineList[i].MedicineCount}</td>
        <td>${MedicineList[i].MedicinePrice}</td>
        <td>${MedicineList[i].MedicineExpiryDate.toLocaleDateString("en-GB")}</td>
        <td><button onclick="setGlobalMedicineId('${MedicineList[i].MedicineId}');">buy</button></td>`;

        table.appendChild(row);
    }
    // purchaseBtn.disabled=true;
}
function setGlobalMedicineId(MedicineId)
{
    CurrentMedicineId = MedicineId;
    let quantityBlock = document.getElementById("quantity-block") as HTMLDivElement;
    quantityBlock.style.display="block";
    
}
function getQuantity()
{
    let quantity:number = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
    buyMedicine(quantity);
}
function buyMedicine(quantity:number)
{
    for(let i=0; i<MedicineList.length; i++)
    {
        if(MedicineList[i].MedicineId == CurrentMedicineId)
        {
            MedicineList[i].MedicineCount -= quantity;
            let totalPrice = quantity * MedicineList[i].MedicinePrice;
            let newOrder: Order = new Order(MedicineList[i].MedicineId,CurrentUserId,MedicineList[i].MedicineName,quantity,totalPrice,OrderStatus.Ordered);
            OrderList.push(newOrder);
            alert("Ok");
        }
    }
}

function CancelOrder()
{
    let cancelOrderTable = document.getElementById("cancel-order") as HTMLTableElement;
    cancelOrderTable.innerHTML="";
    // let cancelOrderBtn = document.getElementById("cancel-order-btn") as HTMLButtonElement;

    let heading = document.createElement("tr");
    heading.innerHTML=`<th>Order ID</th>
    <th>User ID</th>
    <th>Medicine ID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>
    <th></th>`;
    cancelOrderTable.appendChild(heading);

    for(let i=0; i<OrderList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${OrderList[i].OrderId}</td>
        <td>${OrderList[i].UserId}</td>
        <td>${OrderList[i].MedicineId}</td>
        <td>${OrderList[i].MedicineName}</td>
        <td>${OrderList[i].MedicineCount}</td>
        <td>${OrderList[i].TotalPrice}</td>
        <td>${OrderList[i].OrderStatus}</td>
        <td><button onclick="OrderCancel('${OrderList[i].OrderId}')";>Cancel</button></td>`;

        cancelOrderTable.appendChild(row);
    }
    // cancelOrderBtn.disabled=true;

}

function OrderCancel(OrderId)
{
    for(let i=0; i<=OrderList.length; i++)
    {
        if(OrderList[i].OrderId == OrderId)
        {
            OrderList[i].OrderStatus = OrderStatus.Cancelled;
            alert("Order Cancelled Successfully");
            return;
        }
    }
}

function OrderHistory()
{   
    let orderHistoryTable = document.getElementById("order-history") as HTMLTableElement;
    orderHistoryTable.innerHTML="";
    // let orderHistoryBtn = document.getElementById("order-history-btn") as HTMLButtonElement;
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>Order ID</th>
    <th>User ID</th>
    <th>Medicine ID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>`;
    orderHistoryTable.appendChild(heading); 

    for(let i=0; i<OrderList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${OrderList[i].OrderId}</td>
        <td>${OrderList[i].UserId}</td>
        <td>${OrderList[i].MedicineId}</td>
        <td>${OrderList[i].MedicineName}</td>
        <td>${OrderList[i].MedicineCount}</td>
        <td>${OrderList[i].TotalPrice}</td>
        <td>${OrderList[i].OrderStatus}</td>`;

        orderHistoryTable.appendChild(row);
    }
    // orderHistoryBtn.disabled=true;

}

function TopUp()
{
    let topUpPage = document.getElementById("top-up-block") as HTMLDivElement;
    topUpPage.style.display="block";
}
function getAmount()
{
    let amount =parseInt((document.getElementById("top-up-amount") as HTMLInputElement).value);
    CurrentloggedInUser.rechargeWallet(amount);
    alert(`Recharge Successful - Balance : ${CurrentloggedInUser.showBalance()}` );
}

function ShowBalance()
{
    let showBalancePage = document.getElementById("show-balance-block") as HTMLDivElement;
    showBalancePage.style.display="block";

    let line = document.createElement("p");
    line.innerHTML=`Current Balance - ${CurrentloggedInUser.showBalance()}`;
    showBalancePage.appendChild(line);
}

