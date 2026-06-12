#include "Student.h"

void Student::inputStudent() {

    inputUser();

    cout << "Enter Course: ";
    getline(cin, course);
}

void Student::displayUser()
{
    User::displayUser();

    cout << "Course: " << course << endl;
}
