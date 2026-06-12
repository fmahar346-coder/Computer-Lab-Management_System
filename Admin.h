#ifndef ADMIN_H
#define ADMIN_H

#include "User.h"

class Admin : public User {

private:
    string department;

public:

    void inputAdmin();

    void displayUser();
};

#endif
