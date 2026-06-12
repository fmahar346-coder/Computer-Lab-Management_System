#include "Login.h"
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
}
