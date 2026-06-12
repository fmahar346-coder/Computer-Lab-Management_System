#include "Dashboard.h"
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
}
