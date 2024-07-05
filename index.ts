#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.yellow ("***************************************"));
console.log(chalk.green("$$$$$$$$$$$$$$$ BANK_SYSTEM$$$$$$$$$$$"));
console.log(chalk.yellow ("***************************************"));


//Bank Account interface  (properties mention kerna)

interface BankAccount{
     accountNumber: number;
     balance: number;
     withdraw(amount: number): void       //methods           
     //void aik return type hy jo ye batata hy k apka jo function hy wo koi value retun nahi ker raha sir perform ker raha hy
     deposit(amount: number): void //methods
     checkBalance(): void

    }

    //Bank account Class
    //implement ka key word hamy ye batata hy k jitni bhi class ki requirment hain unko imlement ker do
    class BankAccount implements BankAccount {
        accountNumber: number;
        balance: number;
                          //constructor aik method hy jo k initialized ker raha hy class k object ko 
        constructor(accountNumber: number, balance: number){
            this.accountNumber=accountNumber;   //this. key word current objects ko represent kerta hy
            this.balance=balance;
        }//constructer k curley brases} ka bahi ham apnaagy ka kam kerain gy 
        
        //Debit money (user withdraw)
        withdraw(amount: number): void {                            //yaha this. clas k object ko refer kerta hy      
            if (this.balance>=amount){                              //ager user ziya amount nikal waye to kahy k your amount is not sufficient
                 this.balance-=amount;
                 console.log(chalk.yellow(`withdraw of $${amount} successful.Remaining balance`));//ye amount ko minus kery ga

            }else{ 
                console.log("insufficient balance.");
            }
                                                
        }
        //credit money
        deposit(amount: number): void {
            if(amount>100){
                amount -= 1;//ager user 100 $ sy ziyada deposit kerwy ga to 1 $ deposit hoga
            }this.balance+=amount;
            console.log(chalk.green(`Deposit of $${amount} sucessful.Remaining balance: $${this.balance}`));
        }
        //checkBalance
        checkBalance(): void {
            console.log(chalk.yellow(`current balance:$${this.balance}`));
        }
    } 
                  //ab ham class sy bahir a jyn gy or apny account creat kerain gain


///            creat custimer class
class Customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber:number;
    account:BankAccount;

    //creat cunstructor 
    constructor(firstName:string, lastName:string, gender:string, age:number, mobileNumber:number, account:BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age=age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

    //create bank account
    
    const accounts :  BankAccount[]=[
        new BankAccount(1001,500),     // 1     //new key word use ker k account creat kerain gy
        new BankAccount(1002,1000),    //2
        new BankAccount(1003,2000),     //3     //inko ham object kahty hain

    ]
    //create  cutomers

    const customers :Customer[] = [
        new Customer("Malahim","khan","Male",20,3132266677,accounts[0]), //ye malahim khan ka account no hy or iska index no 0 hy
        new Customer("Mudassir","khan","Male",22,3032266677,accounts[1]),   //inka account no 2 or balance 1000 hy
        new Customer("Abdul Hadi","khan","Male",24,33332266677,accounts[2]) //inka account no 3 hy or balance 2000 hy
                                                                            //elements ko seprat kerny k liye hamcomma lagain gy  
    ]
    // function to interact with bankaccount

   async function service(){
        do{                                        //ab tamam coding do k {} k under hogi ye do while loop hy
        const accountNumberInput   =  await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: " Enter your Account Number"

        })
        const customer= customers.find(customer => customer.account.accountNumber===accountNumberInput.accountNumber)
        if(customer){
            console.log(`welcome, ${customer.firstName} ${customer.lastName} !\n`);
            const answer =await inquirer.prompt([{
                name: "select",
                type:"list",
                message:"Select an option",
                choices:["deposit","withdraw","checkBalance","exit",]

        }]);
        //switchcase
        switch(answer.select){
            case "deposit":
                const depositAmount = await inquirer.prompt([{
                    name: "amount",
                    type:"number",
                    message:" Enter the Amount to deposit"
                }])
                customer.account.deposit(depositAmount.amount);
                break;

                
                    case "withdraw":
                        const withdrawAmount = await inquirer.prompt([{
                            name: "amount",
                            type:"number",
                            message:" Enter the Amount to withdraw"
                        }])
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
            
                            case "checkbalance":
                                
                                customer.account.checkBalance();
                                break;
                                case "exit":
                                    console.log(chalk.yellow("Exiting bank program"));
                                    console.log(chalk.yellow("Thank you for using our  bank services.Have a great day!"));
                                    return;


        }

        }else{
            console.log(chalk.green("invalid account number.please try again."));
        }
        
        }while(true);
    }
    service();



    





                