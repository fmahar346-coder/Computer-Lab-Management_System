#ifndef USER_H
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

#endif 
