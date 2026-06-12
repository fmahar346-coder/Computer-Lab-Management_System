#ifndef STUDENT_H
#define STUDENT_H

#include "User.h"

class Student : public User {

private:
    string course;

public:

    void inputStudent();

    void displayUser();
};

#endif
