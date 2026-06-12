#include "Admin.h"
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
}
