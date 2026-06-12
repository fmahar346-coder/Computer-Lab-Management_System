#include "Admin.h"

void Admin::inputAdmin() {

    inputUser();

    cout << "Enter Department: ";
    getline(cin, department);
}

void Admin::displayUser()
{
    User::displayUser();

    cout << "Department: " << department << endl;
}

