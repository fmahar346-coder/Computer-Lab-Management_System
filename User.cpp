#include "User.h"

User::User() {

    userID = 0;
    name = "";
    role = "";
}

void User::inputUser() {

    cout << "Enter User ID: ";
    cin >> userID;

    cin.ignore();

    cout << "Enter Name: ";
    getline(cin, name);

    cout << "Enter Role: ";
    getline(cin, role);
}

void User::displayUser() {

    cout << "\n===== USER DETAILS =====\n";

    cout << "User ID: " << userID << endl;
    cout << "Name: " << name << endl;
    cout << "Role: " << role << endl;
} 

