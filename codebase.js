const codebase = {
    "main.cpp": String.raw`#include "Admin.h"
#include "Student.h"
#include "PC.h"
#include "Issue.h"
#include "Login.h"
#include "Session.h"
#include "Dashboard.h"
#include "Booking.h"
#include "Color.h"

int main() {

    int choice;

    Admin admin1;
    Student student1;
    PC pc1;
    Issue issue1;
    Login login1;
    Session session1;
    Dashboard dashboard1;
    Booking booking1;

    User* ptr;

    if(!login1.authenticate()) {

        system("pause");
        return 0;
    }

    session1.startSession();

    do {

        system("cls");

        setColor(11);

        cout << "\n";
        cout << "=========================================================\n";
        cout << "          COMPUTER LAB MANAGEMENT SYSTEM\n";
        cout << "=========================================================\n";

    setColor(14);
    
        cout << " 1.  Add Admin\n";
        cout << " 2.  Add Student\n";
        cout << "---------------------------------------------------------\n";
        cout << " 3.  Add PC\n";
        cout << " 4.  View All PCs\n";
        cout << " 5.  Search PC\n";
        cout << " 6.  Update PC\n";
        cout << " 7.  Delete PC\n";
        cout << "---------------------------------------------------------\n";
        cout << " 8.  Report Issue\n";
        cout << " 9.  View Issues\n";
        cout << "---------------------------------------------------------\n";
        cout << "10. Dashboard\n";
        cout << "11. Book PC\n";
        cout << "12. View Bookings\n";
        cout << "---------------------------------------------------------\n";
        cout << "13. Polymorphism Demo\n";
        cout << "14. About Project\n";
        cout << "15. Exit\n";
        cout << "=========================================================\n";
    setColor(7);    

        cout << "\nEnter Choice: ";
        cin >> choice;

        cin.ignore();

        switch(choice) {

        case 1:

            system("cls");

            cout << "\n========== ADD ADMIN ==========\n";

            admin1.inputAdmin();

            cout << "\n===== ADMIN DETAILS =====\n";

            admin1.displayUser();

            system("pause");

            break;

        case 2:

            system("cls");

            cout << "\n========== ADD STUDENT ==========\n";

            student1.inputStudent();

            cout << "\n===== STUDENT DETAILS =====\n";

            student1.displayUser();

            system("pause");

            break;

        case 3:

            system("cls");

            cout << "\n========== ADD PC ==========\n";

            pc1.inputPC();

            pc1.displayPC();

            pc1.savePCToFile();

            system("pause");

            break;

        case 4:

            system("cls");

            cout << "\n========== VIEW ALL PCs ==========\n";

            pc1.viewAllPCs();

            system("pause");

            break;

        case 5:

            system("cls");

            cout << "\n========== SEARCH PC ==========\n";

            pc1.searchPC();

            system("pause");

            break;

        case 6:

            system("cls");

            cout << "\n========== UPDATE PC ==========\n";

            pc1.updatePC();

            system("pause");

            break;

        case 7:

            system("cls");

            cout << "\n========== DELETE PC ==========\n";

            pc1.deletePC();

            system("pause");

            break;

        case 8:

            system("cls");

            cout << "\n========== REPORT ISSUE ==========\n";

            issue1.reportIssue();

            system("pause");

            break;

        case 9:

            system("cls");

            cout << "\n========== VIEW ISSUES ==========\n";

            issue1.viewIssues();

            system("pause");

            break;

        case 10:

            system("cls");

            dashboard1.displayDashboard();

            system("pause");

            break;

        case 11:

            system("cls");

            cout << "\n========== BOOK PC ==========\n";

            booking1.bookPC();

            system("pause");

            break;

        case 12:

            system("cls");

            cout << "\n========== VIEW BOOKINGS ==========\n";

            booking1.viewBookings();

            system("pause");

            break;
            
    case 13:

    system("cls");

    setColor(13);

    cout << "\n=====================================\n";
    cout << "         POLYMORPHISM DEMO\n";
    cout << "=====================================\n";

    setColor(7);

    cout << "\nADMIN OBJECT:\n";

    ptr = &admin1;
    ptr->displayUser();

    cout << "\n-------------------------------------\n";

    cout << "\nSTUDENT OBJECT:\n";

    ptr = &student1;
    ptr->displayUser();

    system("pause");

    break;
case 14:

    system("cls");

    setColor(11);

    cout << "\n=================================================\n";
    cout << "                ABOUT PROJECT\n";
    cout << "=================================================\n\n";

    cout << " Project Title:\n";
    cout << " Computer Lab Management System\n\n";

    cout << " Developed Using:\n";
    cout << " - C++ Programming Language\n";
    cout << " - Object Oriented Programming\n";
    cout << " - File Handling\n\n";

    cout << " OOP Concepts Implemented:\n";
    cout << " - Encapsulation\n";
    cout << " - Inheritance\n";
    cout << " - Polymorphism\n\n";

    cout << " System Modules:\n";
    cout << " - Login System\n";
    cout << " - Session Management\n";
    cout << " - Admin Management\n";
    cout << " - Student Management\n";
    cout << " - PC Management\n";
    cout << " - Issue Reporting\n";
    cout << " - Dashboard\n";
    cout << " - Booking System\n\n";

    cout << " Developed By:\n";
    cout << " Fahad Mahar And Sabreena Asad\n";

    cout << "\n=================================================\n";

    setColor(7);

    system("pause");

    break;
        case 15:

    setColor(12);

    session1.endSession();

    cout << "\nExiting Program...\n";

    setColor(7);

    break;

        default:

            cout << "\nInvalid Choice!\n";

            system("pause");
        }

    } while(choice != 15);

    return 0;
}`,
    "Admin.h": String.raw`#ifndef ADMIN_H
#define ADMIN_H

#include "User.h"

class Admin : public User {

private:
    string department;

public:

    void inputAdmin();

    void displayUser();
};

#endif`,
    "Admin.cpp": String.raw`#include "Admin.h"

void Admin::inputAdmin() {

    inputUser();

    cout << "Enter Department: ";
    getline(cin, department);
}

void Admin::displayUser()
{
    User::displayUser();

    cout << "Department: " << department << endl;
}`,
    "Student.h": String.raw`#ifndef STUDENT_H
#define STUDENT_H

#include "User.h"

class Student : public User {

private:
    string course;

public:

    void inputStudent();

    void displayUser();
};

#endif`,
    "Student.cpp": String.raw`#include "Student.h"

void Student::inputStudent() {

    inputUser();

    cout << "Enter Course: ";
    getline(cin, course);
}

void Student::displayUser()
{
    User::displayUser();

    cout << "Course: " << course << endl;
}`,
    "User.h": String.raw`#ifndef USER_H
#define USER_H

#include <iostream>
#include <string>

using namespace std;

class User {

protected:
    int userID;
    string name;
    string role;

public:

    User();

    void inputUser();

    virtual void displayUser();
};

#endif`,
    "User.cpp": String.raw`#include "User.h"

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
} `,
    "PC.h": String.raw`#ifndef PC_H
#define PC_H

#include <iostream>
#include <fstream>
#include <string>

using namespace std;

class PC {

private:

    int pcID;
    string status;

public:

    void inputPC();
    void displayPC();
    void savePCToFile();

    void viewAllPCs();
    void searchPC();

    void updatePC();
    void deletePC();
};

#endif`,
    "PC.cpp": String.raw`#include "PC.h"
#include <cstdio>

void PC::inputPC() {

    cout << "\nEnter PC ID: ";
    cin >> pcID;

    cin.ignore();

    cout << "Enter Status: ";
    getline(cin, status);
}

void PC::displayPC() {

    cout << "\n===== PC DETAILS =====\n";

    cout << "PC ID: " << pcID << endl;
    cout << "Status: " << status << endl;
}

void PC::savePCToFile() {

    ofstream file("pc_data.txt", ios::app);

    file << pcID << " " << status << endl;

    file.close();

    cout << "\nPC Data Saved Successfully!\n";
}

void PC::viewAllPCs() {

    ifstream file("pc_data.txt");

    int id;
    string stat;

    cout << "\n===== ALL PC RECORDS =====\n";

    while(file >> id >> stat) {

        cout << "PC ID: " << id << endl;
        cout << "Status: " << stat << endl;
        cout << "------------------" << endl;
    }

    file.close();
}

void PC::searchPC() {

    ifstream file("pc_data.txt");

    int searchID;
    int id;
    string stat;

    bool found = false;

    cout << "\nEnter PC ID to Search: ";
    cin >> searchID;

    while(file >> id >> stat) {

        if(id == searchID) {

            cout << "\nPC Found!" << endl;
            cout << "PC ID: " << id << endl;
            cout << "Status: " << stat << endl;

            found = true;
            break;
        }
    }

    if(!found) {

        cout << "\nPC Not Found!" << endl;
    }

    file.close();
}
void PC::updatePC() {

    int searchID;
    int id;

    string stat;

    bool found = false;

    cout << "\nEnter PC ID to Update: ";
    cin >> searchID;

    ifstream file("pc_data.txt");
    ofstream temp("temp.txt");

    while(file >> id >> stat) {

        if(id == searchID) {

            found = true;

            cout << "Enter New Status: ";

            cin.ignore();

            getline(cin, stat);

            temp << id << " " << stat << endl;

            cout << "\nPC Updated Successfully!\n";
        }

        else {

            temp << id << " " << stat << endl;
        }
    }

    file.close();
    temp.close();

    remove("pc_data.txt");
    rename("temp.txt", "pc_data.txt");

    if(!found) {

        cout << "\nPC Not Found!\n";
    }
}
void PC::deletePC() {

    int searchID;
    int id;

    string stat;

    bool found = false;

    cout << "\nEnter PC ID to Delete: ";
    cin >> searchID;

    ifstream file("pc_data.txt");
    ofstream temp("temp.txt");

    while(file >> id >> stat) {

        if(id == searchID) {

            found = true;

            cout << "\nPC Deleted Successfully!\n";
        }

        else {

            temp << id << " " << stat << endl;
        }
    }

    file.close();
    temp.close();

    remove("pc_data.txt");
    rename("temp.txt", "pc_data.txt");

    if(!found) {

        cout << "\nPC Not Found!\n";
    }
}`,
    "Booking.h": String.raw`#ifndef BOOKING_H
#define BOOKING_H

#include <iostream>
#include <fstream>
#include <string>

using namespace std;

class Booking {

private:

    int studentID;
    int pcID;

public:

    void bookPC();

    void viewBookings();
};

#endif`,
    "Booking.cpp": String.raw`#include "Booking.h"
#include "Color.h"

void Booking::bookPC() {

    setColor(14);

    cout << "\n========== BOOK PC ==========\n";

    setColor(7);

    cout << "\nEnter Student ID: ";
    cin >> studentID;

    cout << "Enter PC ID: ";
    cin >> pcID;

    ofstream file("booking.txt", ios::app);

    file << studentID << " "
         << pcID << endl;

    file.close();

    setColor(10);

    cout << "\nBooking Successful!\n";

    setColor(7);
}

void Booking::viewBookings() {

    ifstream file("booking.txt");

    int sid;
    int pid;

    setColor(11);

    cout << "\n===== BOOKINGS =====\n";

    setColor(7);

    while(file >> sid >> pid) {

        cout << "Student ID: "
             << sid
             << " -> PC ID: "
             << pid
             << endl;
    }

    file.close();
}`,
    "Issue.h": String.raw`#ifndef ISSUE_H
#define ISSUE_H

#include <iostream>
#include <fstream>
#include <string>

using namespace std;

class Issue {

private:
    int issueID;
    string description;

public:

    void reportIssue();

    void viewIssues();
};

#endif`,
    "Issue.cpp": String.raw`#include "Issue.h"
#include "Color.h"

void Issue::reportIssue() {

    setColor(14);

    cout << "\n========== REPORT ISSUE ==========\n";

    setColor(7);

    cout << "\nEnter Issue ID: ";
    cin >> issueID;

    cin.ignore();

    cout << "Enter Issue Description: ";
    getline(cin, description);

    ofstream file("issues.txt", ios::app);

    file << issueID << " "
         << description << endl;

    file.close();

    setColor(10);

    cout << "\nIssue Reported Successfully!\n";

    setColor(7);
}

void Issue::viewIssues() {

    ifstream file("issues.txt");

    int id;
    string desc;

    setColor(11);

    cout << "\n===== REPORTED ISSUES =====\n";

    setColor(7);

    while(file >> id) {

        getline(file, desc);

        cout << "Issue ID: " << id << endl;
        cout << "Description:" << desc << endl;
        cout << "----------------------\n";
    }

    file.close();
}`,
    "Dashboard.h": String.raw`#ifndef DASHBOARD_H
#define DASHBOARD_H

#include <iostream>

using namespace std;

class Dashboard {

public:

    void displayDashboard();
};

#endif`,
    "Dashboard.cpp": String.raw`#include "Dashboard.h"
#include "Color.h"

void Dashboard::displayDashboard() {

    setColor(11);

    cout << "\n";
    cout << "=================================================\n";
    cout << "         COMPUTER LAB DASHBOARD\n";
    cout << "=================================================\n\n";

    setColor(10);

    cout << " [OK] System Status      : Running Successfully\n";
    cout << " [OK] Login System       : Active\n";
    cout << " [OK] Session Manager    : Active\n";
    cout << " [OK] Admin Module       : Active\n";
    cout << " [OK] Student Module     : Active\n";
    cout << " [OK] PC Management      : Active\n";
    cout << " [OK] Issue Management   : Active\n";
    cout << " [OK] Booking System     : Active\n";
    cout << " [OK] File Handling      : Active\n";
    cout << " [OK] OOP Concepts       : Implemented\n";

    setColor(14);

    cout << "\n=================================================\n";

    cout << " Encapsulation  : YES\n";
    cout << " Inheritance    : YES\n";
    cout << " Polymorphism   : YES\n";

    cout << "=================================================\n";

    setColor(7);
}`,
    "Session.h": String.raw`#ifndef SESSION_H
#define SESSION_H

#include <iostream>
#include <fstream>

using namespace std;

class Session {

public:

    void startSession();
    void endSession();
};

#endif`,
    "Session.cpp": String.raw`#include "Session.h"
#include "Color.h"

void Session::startSession() {

    ofstream file("session.txt", ios::app);

    file << "Session Started" << endl;

    file.close();

    setColor(10);

    cout << "\nSession Started!\n";

    setColor(7);
}

void Session::endSession() {

    ofstream file("session.txt", ios::app);

    file << "Session Ended" << endl;

    file.close();

    setColor(12);

    cout << "\nSession Ended!\n";

    setColor(7);
}`,
    "Login.h": String.raw`#ifndef LOGIN_H
#define LOGIN_H

#include <iostream>
#include <string>

using namespace std;

class Login {

public:

    bool authenticate();
};

#endif`,
    "Login.cpp": String.raw`#include "Login.h"
#include "Color.h"

bool Login::authenticate() {

    string username;
    string password;

    setColor(11);

    cout << "\n";
    cout << "=================================================\n";
    cout << "      COMPUTER LAB MANAGEMENT SYSTEM\n";
    cout << "=================================================\n";

    setColor(14);

    cout << "\n=============== LOGIN ===============\n";

    setColor(7);

    cout << "\nUsername: ";
    getline(cin, username);

    cout << "Password: ";
    getline(cin, password);

    if(username == "Fahad Mahar" && password == "2006") {

        setColor(10);

        cout << "\n=====================================\n";
        cout << "       LOGIN SUCCESSFUL\n";
        cout << "=====================================\n";

        setColor(7);

        return true;
    }

    setColor(12);

    cout << "\n=====================================\n";
    cout << "     INVALID LOGIN CREDENTIALS\n";
    cout << "=====================================\n";

    setColor(7);

    return false;
}`,
    "Color.h": String.raw`#ifndef COLOR_H
#define COLOR_H

#include <windows.h>

inline void setColor(int color) {
    SetConsoleTextAttribute(
        GetStdHandle(STD_OUTPUT_HANDLE),
        color
    );
}

#endif`,
    "COMPUTERLABMANAGEMENTSYSTEM.dev": String.raw`[Project]
FileName=COMPUTERLABMANAGEMENTSYSTEM.dev
Name=COMPUTERLABMANAGEMENTSYSTEM
Type=1
Ver=2
ObjFiles=
Includes=
Libs=
PrivateResource=
ResourceIncludes=
MakeIncludes=
Compiler=
CppCompiler=
Linker=
IsCpp=1
Icon=
ExeOutput=
ObjectOutput=
LogOutput=
LogOutputEnabled=0
OverrideOutput=0
OverrideOutputName=
HostApplication=
UseCustomMakefile=0
CustomMakefile=
CommandLine=
Folders=
IncludeVersionInfo=0
SupportXPThemes=0
CompilerSet=0
CompilerSettings=0000000000000000000000000
UnitCount=20

[VersionInfo]
Major=1
Minor=0
Release=0
Build=0
LanguageID=1033
CharsetID=1252
CompanyName=
FileVersion=
FileDescription=Developed using the Dev-C++ IDE
InternalName=
LegalCopyright=
LegalTrademarks=
OriginalFilename=
ProductName=
ProductVersion=
AutoIncBuildNr=0
SyncProduct=1

[Unit1]
FileName=Admin.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit2]
FileName=Admin.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit3]
FileName=Booking.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit4]
FileName=Booking.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit5]
FileName=Dashboard.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit6]
FileName=Dashboard.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit7]
FileName=Issue.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit8]
FileName=Issue.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit9]
FileName=Login.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit10]
FileName=Login.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit11]
FileName=main.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit12]
FileName=PC.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit13]
FileName=PC.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit14]
FileName=Session.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit15]
FileName=Session.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit16]
FileName=Student.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit17]
FileName=Student.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit18]
FileName=User.cpp
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit19]
FileName=User.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=

[Unit20]
FileName=Color.h
CompileCpp=1
Folder=
Compile=1
Link=1
Priority=1000
OverrideBuildCmd=0
BuildCmd=
`
};
